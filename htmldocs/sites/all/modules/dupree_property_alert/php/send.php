<?php

require_once('PHPMailer/class.phpmailer.php');

$team_email = "info@upp-property.co.uk";
$team_name = "The UPP Team";

$mail = new PHPMailer();

$mail->IsSMTP(); 
$mail->SMTPAuth   = true;       
$mail->Host       = "server.dupreecreative.com"; 
$mail->Port       = 25;                  
$mail->Username   = "mark.bain"; 
$mail->Password   = "brU3ecA7";  

$mail->SetFrom($team_email, $team_name);
$mail->AddReplyTo($team_email, $team_name);
$mail->Subject    = "Request to register for property alerts";
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!";

$body = "<ul>";
foreach ($_POST as $key => $value){
	$body .= "<li>{$key} = {$value}\r\n";
}
$body .= "</ul>";

$mail->MsgHTML($body);

$mail->AddAddress($team_email, $team_name);
$mail->AddAddress($_POST["pa_email"], $_POST["pa_fname"]." ".$_POST["pa_lname"]);



if(!$mail->Send()) {
	echo "Mailer Error: " . $mail->ErrorInfo;
} else {
	echo "A confirmation message has been sent to your email account";
}
    
