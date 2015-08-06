<?php
/*
This requires a Twitter app to be set up:
http://www.tech-faq.com/send-tweets-to-your-twitter-account-via-php.html
*/

function make_bitly_url( $url , $login , $key , $version = '2.0.1')
{
	$parse_url = parse_url($url);
	if( empty($parse_url['scheme']) ) return FALSE;
	
	$api_url = 'http://api.bit.ly/shorten?version='. $version .'&longUrl='.
		urlencode($url) .'&login='. $login .'&apiKey='. $key;
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL, $api_url);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);  
	$content = curl_exec($ch);  
	curl_close($ch);  
	
	preg_match('`"shortUrl":[[:space:]]*"(http[^"]+)"`', $content, $m);
	if( !isset($m[1]) ) return FALSE;
	
	return $m[1];
}

function variable_get($variable) {
	$sql = "select value from variable where name='".$variable."'";
	$result = db_query($sql);
	$row = $result->fetch_assoc();
	$value_array = explode(":",$row["value"]);
	if ($value_array[0]=="s"){
		$value = str_replace("\"","",$value_array[2]);
		$value = str_replace(";","",$value);
	} else {
		$value=$value_array[1];
		$value = str_replace(";","",$value);
	}
	
	return $value;
}

function db_query($sql){
	global $mysqli;
	$result = $mysqli->query($sql);
	return $result;
}

function db_row($sql){
	$result = db_query($sql);
	return $result->fetch_assoc();
}

function dup_tweet($tweetMessage) {
    global $tweet;
	$tweetMessage = substr($tweetMessage,0,140);
	$tweet->post('statuses/update', array('status' => $tweetMessage));
}

// Get database details
require_once("../../../../default/settings.php");
$DB_NAME = $databases["default"]["default"]["database"];
$DB_HOST = $databases["default"]["default"]["host"];
$DB_USER = $databases["default"]["default"]["username"];
$DB_PASS = $databases["default"]["default"]["password"];

global $mysqli;
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
// Set keys
require_once('twitteroauth.php');
$consumerKey = variable_get("dup_twitter_api_key");
$consumerSecret = variable_get("dup_twitter_api_secret");
$accessToken = variable_get("dup_twitter_access_token");
$accessTokenSecret = variable_get("dup_twitter_access_token_secret");
//Set up twitter
$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);

//get info to be tweeted
$sql = "select * from node_type where disabled=0";
$result = $mysqli->query($sql);
while($row = $result->fetch_assoc()) {
	$fieldname = "dup_".$row["type"];
	$value = variable_get($fieldname);
	if ($value=="1"){
		$sql = "select * from node where type='".$row["type"]."' and status=1 and changed > UNIX_TIMESTAMP(DATE(NOW()-INTERVAL 1 HOUR))";
		$result = db_query($sql);
		while($row = $result->fetch_assoc()) {
			
			$nid=$row["nid"];
		
			if ($row["created"] == $row["changed"]) $message = "New: ";
			else $message = "Update: ";
			
			$url = variable_get('dup_twitter_url');
			$url_row = db_row("select alias from url_alias where source='node/".$nid."'");
			$url = "http://".$url."/".$url_row["alias"];
			$url = make_bitly_url($url, "linuxtalk", "R_ad2d40bdfb9742369199551fd4256a3f");
			
			$len = 140 - strlen($message) - strlen($url) - 1;
			
			$text = $row["title"];
			
			$text = substr($text,0,$len);
			
			$message .= $text. " " .$url; #. " " . $text;
			
			dup_tweet($message);
			sleep(10);
		}
	}
}

unset($tweet);
$mysqli->close();
unset($mysqli);


