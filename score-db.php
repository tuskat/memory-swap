<?php

//local
//$db = mysqli_connect('localhost', 'root', '','memory_score'); 

$db = mysqli_connect('localhost', 'cedrefji_score', '0ak[s^*Z3$xy','cedrefji_memory_score');

$entry = array(
    "name" => "",
    "mail"   => "",
    "score"   => 0,
    "step" => 0);


if ($_SERVER["REQUEST_METHOD"]=="GET") 
	{
		while (list($key, $val) = each($_GET))
		{
			  
			  $tmp[$key] = $val;  
			  if ($key == "name" ) 
			  {
				 $entry['name'] = $tmp[$key];  	 
			  }
			  if ($key == 'mail')
		 	  {
		 	  	$entry['mail'] = $tmp[$key];	
		 	  }
		 	  if ($key == 'score')
		 	  {
		 	  	$entry['score'] = $tmp[$key];
		 	  }
		 	  if ($key == 'step')
		 	  {
		 	  	$entry['step'] = $tmp[$key];
		 	  }
	 	  			  
		}


if ($entry['name'] != "")
{
	$sql = "INSERT INTO score (name, gamescore, step , mail)
	VALUES ('".$entry['name']."', '".$entry['score']."', '".$entry['step']."' , '".$entry['mail']."')";

	if ($db->query($sql) === FALSE) 
	{
     echo "Error: " . $sql . "<br>" . $db->error;
	}

}

}

mysqli_close($db); 


include("score.html");
?>