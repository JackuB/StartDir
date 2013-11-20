<?php

	$json_file = "start_config.json";

	if(isset($_POST["save_json"])) {
		$saved = json_decode($_POST["save_json"]);
		file_put_contents($json_file, $saved);
		echo "Saved";
		die;
	}

	$disallowedDirs = [
		".",
		"..",
		".git"
	];

	$dirArray = [];
	if ($handle = opendir('.')) {
		$i = 0;
	    while (false !== ($entry = readdir($handle))) {
	        if (is_dir($entry) && !in_array($entry, $disallowedDirs)) {
	            $dirArray[$i] = array(
	            	"hidden" => false,
	            	"folderName" => $entry
	            	);
	            $i++;
	        }
	    }
	    closedir($handle);
	}

	/* Read JSON */
	$loaded_json = file_get_contents($json_file);

	/* Intersect JSON and computed array */
	$returnedArray = array_intersect_key($dirArray, json_decode($loaded_json, true));
?>

<script type="text/javascript">
	var phpJSON = <?php print_r(json_encode($returnedArray)); ?>;
</script>