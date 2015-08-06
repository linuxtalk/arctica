<?php

/*

Vebra XML API Integration With PHP Example

Author: Joe Harvey

Last Modified: 20-10-2011



READ ME:

- Please enter your login credentials and Data Feed ID below

- The following functions will attempt to connect to the given URL using a token stored in a session value

- If no session value exisits then it will request one.

- Returned tokens are written to a text file along with their approximate start and expire times for your reference

- Returned headers and returned XML (on success) are also written to txt files

- All of these files are saved to the parent folder where you run this script from. You must ensure that folder has Write permissions!

- Should you loose you session token (by clearing cookies and/or closing the browser) you can enter the token manualy from the tokens.txt file

*/



if (!isset($_SESSION))session_start();

global $username,$password,$datafeedID,$request;

//Define Your Unique Variable Here:

$username = "MOOLETAPIUK82";

$password = "H8*njRpL53";

$datafeedID = "MOOAPI";

$request = "http://webservices.vebra.com/export/$datafeedID/v1/branch";



//Function to authenticate self to API and return/store the Token

function getToken($url) {


	//Re-define username and password variable scope so they can be used within the function

	global $username, $password;

	

	//Overwiting the response headers from each attempt in this file (for information only)

	
	$file = "headers.txt";

	$fh = fopen($file, "w");

	

	//Start curl session

	$ch = curl_init($url);

	//Define Basic HTTP Authentication method

	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

	//Provide Username and Password Details
    echo "$username:$password";
	curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");

	//Show headers in returned data but not body as we are only using this curl session to aquire and store the token

	curl_setopt($ch, CURLOPT_HEADER, 1); 

	curl_setopt($ch, CURLOPT_NOBODY, 1); 

	//write the output (returned headers) to file

	curl_setopt($ch, CURLOPT_FILE, $fh);

	//execute curl session

	curl_exec($ch);

	// close curl session

	curl_close($ch); 

	//close headers.txt file

	fclose($fh); 



	//read each line of the returned headers back into an array

	$headers = file('headers.txt', FILE_SKIP_EMPTY_LINES);

	

	//for each line of the array explode the line by ':' (Seperating the header name from its value)

	foreach ($headers as $headerLine) {



		$line = explode(':', $headerLine);

		$header = $line[0];

		$value = trim($line[1]);

		

		//If the request is successful and we are returned a token

		if($header == "Token") {

				//save token start and expire time (roughly)

				$tokenStart = time(); 

				$tokenExpire = $tokenStart + 60*60; 

				//save the token in a session variable (base 64 encoded)

				$_SESSION['token'] = base64_encode($value); 

				

				//For now write this new token, its start and expiry datetime into a .txt (appending not overwriting - this is for reference in case you loose your session data)

				$file = "tokens.txt";

				$fh = fopen($file, "a+");

				//write the line in

				$newLine = "'".$_SESSION['token']."','".date('d/m/Y H:i:s', $tokenStart)."','".date('d/m/Y H:i:s', $tokenExpire)."'"."\n";

				fwrite($fh, $newLine);

				//Close file

				fclose($fh);

			}

			

	}

	

	//If we have been given a token request XML from the API authenticating using the token

	if (!empty($_SESSION['token'])) {
        
		connect($url);

	} else {
       
		//If we have not been given a new token its because we already have a live token which has not expired yet (check the tokens.txt file)

		echo '<br />There is still an active Token, you must wait for this token to expire before a new one can be requested!<br />';

	}

}



//Function to connect to the API authenticating ourself with the token we have been given

function connect($url) {

	//If token is not set skip to else condition to request a new token 

	if(!empty($_SESSION['token'])) {


		//Set a new file name and create a new file handle for our returned XML

		$file = "test.xml";

		$fh = fopen($file, "w");

		

		//Initiate a new curl session

		$ch = curl_init($url);

		//Don't require header this time as curl_getinfo will tell us if we get HTTP 200 or 401

		curl_setopt($ch, CURLOPT_HEADER, 0); 

		//Provide Token in header

		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.$_SESSION['token']));

		//Write returned XML to file

		curl_setopt($ch, CURLOPT_FILE, $fh);

		//Execute the curl session

		curl_exec($ch);

		

		//Store the curl session info/returned headers into the $info array

		$info = curl_getinfo($ch);

		

		//Check if we have been authorised or not

		if($info['http_code'] == '401') {

			getToken($url);

			echo 'Token Failed - getToken() has been run!<br />';

		} elseif ($info['http_code'] == '200') {

			echo 'Token Worked - Success';

		}

		

		//Close the curl session

		curl_close($ch);

		//Close the open file handle

		fclose($fh);
		
		$xml=simplexml_load_file("test.xml");

 
		#echo $xml->branch->branchid;

		

	} else {

	

		//Run the getToken function above if we are not authenticated

		getToken($url);

		

	}

	

}



//Connect to the API using connect() function above

#connect($request);
