<?php 
    ini_set('display_errors', false);
    set_exception_handler('ReturnError');

    $r = '';
    $url = (isset($_GET['url']) ? $_GET['url'] : null);

    if ($url) {
        $c = curl_init();
        curl_setopt_array($c, array(
            CURLOPT_URL => $url,
            CURLOPT_HEADER => false,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_RETURNTRANSFER => true
        ));
        $r = curl_exec($c);
        curl_close($c);
    }

    if($r) {
        echo $r;
    } else {
        ReturnError();
    }

    function ReturnError() {
        echo 'error';
    }
?>