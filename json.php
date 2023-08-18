<?php

require_once 'vendor/autoload.php';
include_once 'functions/googleSheets.php';


$json_array = [
    'translations' => getGoogleSheetsData('1sd277Vpeed1ljpqrZV2issFAo3_qKiw-Kn1WRY-VwG8', 'translations!A:B', 'left'),
    'index_step' => getGoogleSheetsData('1sd277Vpeed1ljpqrZV2issFAo3_qKiw-Kn1WRY-VwG8', 'index_step!A:D', 'top'),
    'rooms_step' => getGoogleSheetsData('1sd277Vpeed1ljpqrZV2issFAo3_qKiw-Kn1WRY-VwG8', 'rooms_step!A:E', 'top'),
    'flooring_step' => getGoogleSheetsData('1sd277Vpeed1ljpqrZV2issFAo3_qKiw-Kn1WRY-VwG8', 'flooring_step!A:I', 'top'),
];

$json = json_encode($json_array);

if (file_put_contents("data.json", $json))
    echo "JSON file created successfully...";
else 
    echo "Oops! Error creating json file...";
