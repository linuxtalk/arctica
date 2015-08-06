<pre>
<?php
/*
C:\Users\Mark\AppData\Local\Temp\scp40775\www\demo.dupreeweb.co.uk\db\index.php
*/
error_reporting(E_ALL);
ini_set('display_errors', '1');


$doc = array(
    "name" => "MongoDB",
    "type" => "database",
    "count" => 1,
    "info" => (object)array( "x" => 203, "y" => 102),
    "versions" => array("0.9.7", "0.9.8", "0.9.9")
);


$connection = new MongoClient();
$db = $connection->test;

$collection = $db->products;
$cursor = $collection->find();

foreach ($cursor as $obj){
	echo $obj["name"]."<br>";
}

echo $cursor->count();

?>
</pre>