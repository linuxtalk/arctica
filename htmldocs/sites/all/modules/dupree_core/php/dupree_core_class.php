<?php

class Dupree_Core {
	public $DUPREE_CORE;
	
	function __construct() {	
       $this->DUPREE_CORE =  drupal_get_path("module", "dupree_core");
	}

	public function block ($name,$text) {
		$block = array(
			'message' => array(
				'#prefix' => '<div class='.$name.'>',
				'#type' => 'markup',
				'#markup' => $text,
				'#suffix' => '</div>',
    		),
		);
		return $block;
	}
	
	public function query ($sql) {
		$query = db_query($sql);
		return $query->fetchAssoc();
	}
	
	public function get_header_text() {
		$sql = "select field_header_contact_details_value from field_data_field_header_contact_details";
		$result = $this->query($sql);
		return $result["field_header_contact_details_value"];
	}
	
	public function get_footer_html(){
		$sql = "select body_value from field_data_body where bundle = 'website_footer'";
		$result = $this->query($sql);
		return $result["body_value"];
	}
	
	public function get_ob_data($file) {
		ob_start();
		include $file;
		$text = ob_get_contents();
		ob_end_clean();
		
		return $text;
	}
}