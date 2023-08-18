<?php

$json = file_get_contents('data.json');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
echo $json;