<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

header('Content-Type: image/png');
$img2 = imagecreatefrompng('http://dev-dai.dupreeweb.co.uk/sites/dev-dai.dupreeweb.co.uk/modules/dcr/images/Tip_Spacer.png');
$img1 = imagecreatefrompng('http://dev-dai.dupreeweb.co.uk//sites/dev-dai.dupreeweb.co.uk/modules/dcr/images/rod//guides/type 1(50mm)/preview/front/A_Tip_Section_1.png');

$x1 = imagesx($img1);
$y1 = imagesy($img1);
$x2 = imagesx($img2);
$y2 = imagesy($img2);

imagecopyresampled(
    $img1, $img2,
    0, 0, 0, 0,
    $x1, $y1,
    $x2, $y2);

imagepng($img1, 'merged.png', 0);