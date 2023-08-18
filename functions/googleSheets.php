<?php 

function getGoogleSheetsData($spreadsheetId, $range, $named = '') {
    // configure the Google Client
    $client = new \Google_Client();
    $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
    $client->setAccessType('offline');
    $client->setApplicationName("estimation@nosisvoe-translation.iam.gserviceaccount.com");
    $path = 'credentials.json';
    $client->setAuthConfig($path);

    // configure the Sheets Service
    $service = new \Google_Service_Sheets($client);
    $response = $service->spreadsheets_values->get($spreadsheetId, $range);
    $values = $response->getValues();


    if($named == 'left') {
        $named_values = [];
        foreach($values as $value) {
            if( !( ($value[0][0] == '#') || ($value[1][0] == '#')  ) ) {
                $named_values[$value[0]] = $value[1];
            }
        }
        return $named_values;
    }

    if($named == 'top') {
        $named_values = [];
        $value_heads = [];

        foreach($values[1] as $value_head) {
            $value_heads[] = $value_head;
        }

        foreach ( array_slice($values, 2) as $row_value_index => $row_value) {
            $sub_values = [];
            foreach($row_value as $value_index => $value) {
                $sub_values[$value_heads[$value_index]] = $value;
            }

            $named_values[$row_value_index] = $sub_values;
        }
        return $named_values;
    }

    return $values;
}