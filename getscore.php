<?php
// get the q parameter from URL



//local
//$db = mysqli_connect('localhost', 'root', '','memory_score'); 

$db = mysqli_connect('localhost', 'cedrefji_score', '0ak[s^*Z3$xy','cedrefji_memory_score');


 

$sql = 'SELECT * FROM score ORDER BY gamescore ASC'; 

$req = mysqli_query($db, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error()); 


$rows = [];
while($data = $req->fetch_assoc())
    { 
        $rows[] = $data;
    } 

echo json_encode($rows);

mysqli_close($db); 



?>