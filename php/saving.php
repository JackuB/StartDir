<?php
	if(isset($_POST["save_json"])) {
		json_decode($_POST["save_json"]);
 		if(json_last_error() == JSON_ERROR_NONE) {
			file_put_contents($json_file, $_POST["save_json"]);
			die("Saved");
 		} else {
 			die("Invalid JSON");
 		}
	}


?>