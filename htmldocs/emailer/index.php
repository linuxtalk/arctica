<?php
/* 
C:\Users\Mark\AppData\Local\Temp\scp23004\www\demo.dupreeweb.co.uk\emailer\index.php
*/
require_once('library/dupree_mailer_class.php');

$to = $_REQUEST["to"];
$from = $_REQUEST["from"];
$subject = urldecode($_REQUEST["subject"]);
$message = urldecode($_REQUEST["message"]);

$mail = new Dupree_Mailer();
$mail->SetFrom($from);
$mail->AddAddress($to);
$mail->Subject = $subject;
$mail->MsgHTML($message);

$response="";
if(!$mail->Send()) {
			$response =  "Mailer Error: " . $mail->ErrorInfo;
		} else {
			$response = "A confirmation message has been sent to your email account ".$mail->ErrorInfo;
		}
echo $response;
