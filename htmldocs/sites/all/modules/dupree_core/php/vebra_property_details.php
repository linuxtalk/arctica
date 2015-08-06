<?php

require_once("vebra_connect_class.php");
$vebra_connect = new Vebra_Connect();

$property_id = $_POST["propery_reference"];
echo $vebra_connect->full_html($property_id);