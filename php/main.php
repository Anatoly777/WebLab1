<?php
session_start();

if (!isset($_SESSION['requests']) || !is_array($_SESSION['requests'])) {
    $_SESSION['requests'] = [];
}

function validateX($inp)
{
    if (!isset($inp)) return false;

    $X_MIN = -5;
    $X_MAX = 5;

    $x_num = str_replace(",", ".", $inp);
    return is_numeric($x_num) && $X_MIN < $x_num && $x_num < $X_MAX && strlen($inp) <= 15;
}

function validateY($inp)
{
    return isset($inp) && is_numeric($inp) && $inp >= -2 && $inp <=2 && $inp * 2 == intval($inp * 2); // protection from changing value attr
}

function validateR($inp)
{
    return isset($inp) && is_numeric($inp) &&  $inp >= 1 && $inp <=5 && $inp * 2 == intval($inp * 2); // protection from changing value attr
}

function validateTimezone($inp)
{
    return isset($inp) && is_numeric($inp) && abs($inp) <= 24 * 60;
}

function isSquareHit($x, $y, $r)
{
    return ($x <= 0 && $y >= 0 && $x >= -$r/2 && $y <= $r);
}

function isTriangleHit($x, $y, $r)
{
    $hypotenuse = -$x + $r/2;
    return ($x >= 0 && $y >= 0 && $y <= $hypotenuse);

}

function isCircleHit($x, $y, $r)
{
    $isInsideCircle = pow($x, 2) + pow($y, 2) < pow($r/2, 2);
    return ($x <= 0 && $y <= 0 && $isInsideCircle);
}

function isBlueAreaHit($x, $y, $r)
{
    return isCircleHit($x, $y, $r) || isTriangleHit($x, $y, $r) || isSquareHit($x, $y, $r);
}


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$res = array();

$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST['r'];
$timezone = $_POST['timezone'];



$isValid = validateR($r) && validateX($x) && validateY($y) && validateTimezone($timezone);
$isBlueAreaHit = NULL;
$userTime = NULL;
$timePassed = NULL;
if ($isValid) {
    $isBlueAreaHit = isBlueAreaHit($x, $y, $r);
    $userTime = @date('H:i:s', time() - $timezone * 60);
    $timePassed = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 4);
}

array_push($res, array(
    "isValid" => $isValid,
    "isBlueAreaHit" => $isBlueAreaHit,
    "userTime" => $userTime,
    "execTime" => $timePassed,
    "x" => $x,
    "y" => $y,
    "r" => $r
));

if ($isValid) {
    array_unshift($_SESSION['requests'], [
        "isBlueAreaHit" => $isBlueAreaHit,
        "userTime" => $userTime,
        "execTime" => $timePassed,
        "x" => $x,
        "y" => $y,
        "r" => $r,
    ]);
}

function getHTMLrow()
{
    $rowInstance = current($_SESSION['requests']);
    $htmlInstance = ($rowInstance["isBlueAreaHit"] ? '<tr class="hit-yes">' : '<tr class="hit-no">');
    $htmlInstance .= '<td>' . $rowInstance["x"] . '</td>';
    $htmlInstance .= '<td>' . $rowInstance["y"] . '</td>';
    $htmlInstance .= '<td>' . $rowInstance["r"] . '</td>';
    $htmlInstance .= '<td>' . $rowInstance["userTime"] . '</td>';
    $htmlInstance .= '<td>' . $rowInstance["execTime"] . '</td>';
    $htmlInstance .= '<td>' . ($rowInstance["isBlueAreaHit"] ? '<img src="img/tick.png" alt="Да" class="yes-no-marker">' : '<img src="img/cross.png" alt="Нет" class="yes-no-marker">') . '</td>';
    $htmlInstance .= '</tr>';

    return $htmlInstance;
}

echo getHTMLrow();