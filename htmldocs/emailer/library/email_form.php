<?php

require_once('dupree_mailer_class.php');
$mail = new Dupree_Mailer();

$team_email = $_POST["send_to"];
$team_name = $_POST["send_to_name"];;

$mail->SetFrom($team_email, $team_name);
$mail->AddReplyTo($team_email, $team_name);

$mail->AddAddress($team_email, $team_name);
$mail->AddAddress($_POST["email"], $_POST["name"]);

$mail->Subject = $_POST["subject"];

$mail->compile_body_from_post();

$mail->send_form_email();
    
