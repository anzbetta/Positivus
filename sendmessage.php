<?php
    $content = '';
    foreach ($_POST as $key => $value) {
        if ($value){
            $label = str_replace('_', ' ', $key);
            $content .= "<b>$label</b>: <i>$value</i>\n";
        }
    }
    
    if(trim($content)){
        $content = "<b>📩 Message from site:</b>\n\n" . $content;
    
        $botApiToken = 'token';
        $channelId ='id';
        $text = $content;
    
        $query = http_build_query([
            'chat_id' => $channelId,
            'text' => $text,
            'parse_mode' => 'HTML',
        ]);
        $url = "https://api.telegram.org/bot{$botApiToken}/sendMessage?{$query}";
        $response = file_get_contents($url);
    
        if ($response === false) {
            $error = error_get_last();
            echo 'Error: ' . $error['message'];
        }
    
        echo 'ok';
    }
?>
