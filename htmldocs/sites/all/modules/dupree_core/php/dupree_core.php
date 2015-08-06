<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once("dupree_core_class.php");
require_once("dupree_core_admin.php");
require_once("vebra_connect_class.php");


global $dupree;
$dupree = new Dupree_Core ();

function dupree_header_block_view() {
	global $dupree;
	$text = $dupree->get_header_text();
	return $dupree->block("contact_details", $text);
}

function dupree_footer_block_view() {
	global $dupree;
	$text = $dupree->get_footer_html();
  	return $dupree->block("website_footer",$text);
}

function dupree_w3c_validation_block_view() {
	global $dupree;
	$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/w3c.html");
	return $dupree->block("dupree_w3c_validation_block",$text);
}


function dupree_google_maps_view() {
	if (variable_get('dup_gm_enabled')==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/google_map.html");
		return $dupree->block("dupree_google_maps",$text);
	} else return "";
}



function get_inner_html( $node ) { 
    $innerHTML= ''; 
    $children = $node->childNodes; 
    foreach ($children as $child) { 
        $innerHTML .= $child->ownerDocument->saveXML( $child ); 
    } 
    return $innerHTML; 
} 

function process_dom ($url, $id) {
	$doc = new DOMDocument();
	@$doc->loadHTMLFile($url);
	
	$element = $doc->getElementById($id);  
	return  get_inner_html($element);
}

/*
function dupree_vebra_search_view() {
	if (variable_get('dup_vebra_search_enabled')==1) {
		return dupree_vebra_search_view_show();
	}
}
*/

function dupree_vebra_search_view() {
	if (variable_get('dup_vebra_search_enabled')==1) {
		global $dupree;
		$text = "";
		$vebra_connect = new Vebra_Connect();
		if (variable_get('dup_vebra_search_collapsed',1)==1) {
			$text .= "<style>div.dupree_vebra_search{display: none;}</style>";
		}
		$text .= "<div id=prop_count></div>";
		$text .= $vebra_connect->html();
		return $dupree->block("dupree_vebra_search", $text);
	}
}

function dupree_vebra_filter_view() {
	if (variable_get('dup_vebra_search_enabled')==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/vebra_filter.html");
		return $dupree->block("dupree_vebra_filter", $text);
	}
}

function dupree_property_alert_view() {
	if (variable_get('dup_property_alert_enabled')==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/property_alert.html");
		return $dupree->block("dup_property_alert", $text);
	}
}

function dupree_valuation_request_view() {
	if (variable_get('dup_valuation_request_enabled')==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/valuation_request.html");
		return $dupree->block("dupree_valuation_request", $text);
	}
}

function dupree_contact_form_view() {
	if (variable_get('dup_contact_form_enabled')==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/dupree_contact_form.html");
		return $dupree->block("dupree_contact_form", $text);
	}
}

function dupree_location_block_view() {
	if (variable_get('dup_gm_show_location_block')==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/location.html");
		return $dupree->block("dupree_location_block", $text);
	}
}

function dupree_open_hours_block_view() {
	if (variable_get('dup_gm_show_open_hours',0)==1) {
		global $dupree;
		$text = $dupree->get_ob_data($dupree->DUPREE_CORE."/html/open_hours.html");
		return $dupree->block("dupree_open_hours_block", $text);
	}
}


