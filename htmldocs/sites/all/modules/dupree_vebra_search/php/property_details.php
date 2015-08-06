<?php



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



$property_reference  = $_POST["propery_reference"];

$text .= process_dom("http://www.vebra.com/mooreslettings/property/${property_reference}","s-dtprop");


echo $text;
