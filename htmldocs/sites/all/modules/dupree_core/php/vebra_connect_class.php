<?php

class Vebra_Connect {
	private $username;
	private $password;
	private $datafeedID;
	
	private $dir;
	private $property_dir;
	private $header_file;
	private $tokens_file;
	private $branch_xml;
	private $property_list_xml;
	
	
	private $branch_url;
	
	function __construct(){
	
		if (function_exists("variable_get")){
			$this->username = variable_get('dup_vebra_username');
			$this->password = variable_get('dup_vebra_password');
			$this->datafeedID = variable_get('dup_vebra_datafeed_id');
		}
		
		$this->dir = "vebra";
		if (!is_dir($this->dir))mkdir($this->dir);
		$this->property_dir = $this->dir."/property";
		if (!is_dir($this->property_dir))mkdir($this->property_dir);
		
		$this->header_file = $this->dir."/headers.txt";
		$this->tokens_file =  $this->dir."/tokens.txt";
		$this->branch_xml = $this->dir."/branch.xml";
		$this->property_list_xml = $this->dir."/property_list.xml";
		
		
		$this->branch_url = "http://webservices.vebra.com/export/".$this->datafeedID."/v1/branch";
	}
	
	private function getToken($url, $file) {
		$fh = fopen($this->header_file, "w");
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.":".$this->password);
		curl_setopt($ch, CURLOPT_HEADER, 1); 
		curl_setopt($ch, CURLOPT_NOBODY, 1); 
		curl_setopt($ch, CURLOPT_FILE, $fh);
		curl_exec($ch);
		curl_close($ch); 
		fclose($fh); 
		
		$headers = file($this->header_file, FILE_SKIP_EMPTY_LINES);
		foreach ($headers as $headerLine) {
			$line = explode(':', $headerLine);
			$header = $line[0];
			$value = trim($line[1]);

			if($header == "Token") {
				$tokenStart = time(); 
				$tokenExpire = $tokenStart + 60*60; 
				$_SESSION['token'] = base64_encode($value); 

				$fh = fopen($this->tokens_file, "a+");
				$newLine = "'".$_SESSION['token']."','".date('d/m/Y H:i:s', $tokenStart)."','".date('d/m/Y H:i:s', $tokenExpire)."'"."\n";
				fwrite($fh, $newLine);
				fclose($fh);
			}
		}

		if (!empty($_SESSION['token'])) {
			$this->connect($url, $file);
		} else {
			echo '<br />There is still an active Token, you must wait for this token to expire before a new one can be requested!<br />';
		}
	}
	
	private function connect($url, $file) {
		if(!empty($_SESSION['token'])) {
			$fh = fopen($file, "w");
			$ch = curl_init($url);
			curl_setopt($ch, CURLOPT_HEADER, 0); 
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.$_SESSION['token']));
			curl_setopt($ch, CURLOPT_FILE, $fh);
			curl_exec($ch);
			$info = curl_getinfo($ch);
			/*
			if($info['http_code'] == '401') {
				$this->getToken($url,$file);
				echo 'Token Failed - getToken() has been run!<br />';

			} elseif ($info['http_code'] == '200') {

				echo 'Token Worked - Success';
			}
			*/
			curl_close($ch);
			fclose($fh);
		
		} else {
				$this->getToken($url, $file);
		}
	}
	
	private function get_branch_xml(){
		$file=$this->branch_xml;
		if (!file_exists($file)) {
			$request = $this->branch_url;
			$this->connect($request, $file);
		}
		$xml=simplexml_load_file($file);
		return $xml;
	}
	
	private function get_branch(){
		$xml = $this->get_branch_xml();
		return $xml->branch->branchid;
	}
	private function get_branch_url(){
		$xml = $this->get_branch_xml();
		return $xml->branch->url;
	}
	
	private function get_property_list_xml(){
	    $file = $this->property_list_xml;
		if (!file_exists($file)){
			$request=$this->get_branch_url()."/property";
			echo $request;
			$this->connect($request, $file);
		}
		$xml=simplexml_load_file($file);
		return $xml;
	}
	private function get_properties_xml(){
		$fi = new FilesystemIterator($this->property_dir, FilesystemIterator::SKIP_DOTS);
		if (iterator_count($fi)==0){
			$xml=$this->get_property_list_xml();
			foreach ($xml as $property){
				$file=$this->property_dir."/".basename($property->url).".xml";
				$this->connect($property->url, $file);
			}
		}
	}
	
	function html(){
		$html = "";
		$list_xml=simplexml_load_file($this->property_list_xml);
		foreach ($list_xml as $p) {
			$file = $this->property_dir."/".$p->prop_id.".xml";
			$xml = simplexml_load_file($file);
			$html .= "<div class=verba_property>";
			$html .= "<div class=address>".$xml->address->display."</div>";
			$html .= "<div class=photo><img src=\"".$xml->files->file[0]->url."\"></div>";
			$html .= "<div class=price><span class=gbp>&pound;</span><span class=number>".$xml->price."</span><span class=qualifier> pcm</span></div>";
			$html .= "<div class=bedrooms><span>Bedrooms: </span><span class=number>".$xml->bedrooms."</span></div>";
			$html .= "<div class=available>Available: ".$xml->available."</div>";
			$html .= "<div class=property_type><span class=title>Property type:</span><span class=text>".$xml->type."</span></div>";
			$html .= "<div class=description>".substr($xml->description,0,144)." <a href=\"/property/".$p->prop_id."\" class=more>More...</a></div>";
			$html .= "</div>";
		}
		return $html;
	}
	
	function full_html($id){
		$file = $_SERVER["DOCUMENT_ROOT"]."/".$this->property_dir."/".$id.".xml";
		$xml = simplexml_load_file($file);
		$html .= "<div class=verba_property_details>";
		$html .= "<div class=address>".$xml->address->display."</div>";
		$html .= "<div class=main_photo><img src=\"".$xml->files->file[0]->url."\"></div>";
		
		$html .= "<div class=sub_photo>";
		for($i=1;$i<count($xml->files->file);$i++){
			$html .= "<img src=\"".$xml->files->file[$i]->url."\">";
		}
		$html .= "</div>";
		
		
		
		$html .= "<div class=price><span class=gbp>&pound;</span><span class=number>".$xml->price."</span><span class=qualifier> pcm</span></div>";
		$html .= "<div class=bedrooms><span>Bedrooms: </span><span class=number>".$xml->bedrooms."</span></div>";
		$html .= "<div class=available>Available: ".$xml->available."</div>";
		$html .= "<div class=property_type><span class=title>Property type:</span><span class=text>".$xml->type."</span></div>";
		$html .= "<div class=description>".$xml->description."</div>";
		
		$html .= "<div class=vebra_google_map>";
		global $lat;
		global $lng;
		$lat = $xml->latitude;
		$lng = $xml->longitude;
		ob_start();
		include $_SERVER["DOCUMENT_ROOT"]."/sites/all/modules/dupree_core/html/vebra_google_map.html";
		$html .= ob_get_contents();
		ob_end_clean();
		$html .= "</div>";
		
		$html .= "</div>";
		
		return $html;
	}
}