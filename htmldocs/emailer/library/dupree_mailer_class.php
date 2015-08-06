<?php

require_once('PHPMailer/class.phpmailer.php');

class Dupree_Mailer extends PHPMailer {
	function _constructor(){
		$this->IsSMTP(); 
		$this->SMTPAuth   = true;  
		$this->SMTPSecure = "tls";     
		$this->Host       = "server.dupreecreative.com"; 
		$this->Port       = 25;                  
		$this->Username   = "mark.bain"; 
		$this->Password   = "brU3ecA7"; 
		
		$this->AltBody    = "To view the message, please use an HTML compatible email viewer!";
		
		$this->SMTPDebug  = 1; 
	}
	
	function compile_body_from_post () {
		$body = "<ul>";
		foreach ($_POST as $key => $value){
			$body .= "<li>{$key} = {$value}\r\n";
		}
		$body .= "</ul>";
		$this->MsgHTML($body);
	}
	
	function send_form_email () {
		if(!$this->Send()) {
			echo "Mailer Error: " . $this->ErrorInfo;
		} else {
			echo "A confirmation message has been sent to your email account";
		}
	}
}


