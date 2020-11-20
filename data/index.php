<?php
    sleep(mt_rand(30, 60));

    $fd = fopen(__DIR__."/updating.txt", "a+");
    $data = date("d.m.Y H:i:s").PHP_EOL;
    fwrite($fd, $data);
    fclose($fd);

    $data1 = file_get_contents("https://covid19.who.int/WHO-COVID-19-global-data.csv");
    $data2 = file_get_contents("https://api.quarantine.country/api/v1/summary/latest");
    
    $fd = fopen("/var/www/maksim/data/www/predictvirus/archive.csv", "w+");
    fwrite($fd, $data1);
    fclose($fd);

    $fd = fopen("/var/www/maksim/data/www/predictvirus/data.json", "w+");
    fwrite($fd, $data2);
    fclose($fd);
    
?>