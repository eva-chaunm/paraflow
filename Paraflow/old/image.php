<?php

$image = imagecreatetruecolor(400, 300);

// Allocate a color for the polygon
$col_poly = imagecolorallocate($image, 255, 255, 255);
$col_poly2 = imagecolorallocate($image, 200, 200, 200);

$red = imagecolorallocate($image, 255,0,0);
$blue = imagecolorallocate($image, 0,0,255);

// Draw the polygon
imagepolygon($image, array(
        0,   0,
        10, 50,
        100, 55,
		110, 30
    ),
    4,
    $col_poly);
imagepolygon($image, array(
		170, 0,
		75, 200,
		250, 190,
		190, 55,
		250, 30
	),
	5,
	$col_poly2);

imagefill($image, 10, 30, $red);
imagefill($image, 170, 55, $blue);

// Output the picture to the browser
header('Content-type: image/png');

imagepng($image);
imagedestroy($image);

?>
