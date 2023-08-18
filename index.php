<?php

$json = file_get_contents('data.json');
if($json) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo 'Error: data.json not found';
}