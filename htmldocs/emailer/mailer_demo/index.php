<?php
/*
C:\Users\Mark\AppData\Local\Temp\scp24398\mnt\ebs_files\dev-dai.dupreeweb.co.uk\modules\dcr\mailer_demo\index.php
*/
#error_reporting(E_ALL);
#ini_set('display_errors', '1');
require_once('../library/dupree_mailer_class.php');


$mail = new Dupree_Mailer();
                    
$mail->SetFrom("linuxtalk@hotmail.com");
$mail->AddAddress("mark.bain@dupreecreative.com");
$mail->AddAddress("linuxtalk@hotmail.com");

$mail->Subject = "DCR Comfirmation";

$message = "<h2>DCR Confirmation</h2><p>Hello! This is an automated email message.<p>";
$mail->MsgHTML($message);

$response="";
if(!$mail->Send()) {
			$response =  "Mailer Error: " . $mail->ErrorInfo;
		} else {
			$response = "A confirmation message has been sent to your email account ".$mail->ErrorInfo;
		}
echo $response;

?>