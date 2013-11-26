<?php

	$disallowedDirs = array(
		".",
		"..",
		".git"
	);

	$dirArray = array();
	if ($handle = opendir('.')) {
		$i = 0;
	    while (false !== ($entry = readdir($handle))) {
	        if (is_dir($entry) && !in_array($entry, $disallowedDirs)) {
	            $dirArray[$i] = array(
	            	"hidden" => false,
	            	"folderName" => $entry,
	            	"customFolderName" => $entry
	            	);
	            $i++;
	        }
	    }
	    closedir($handle);
	}

	if(file_exists($json_file)) {
		/* Read JSON */
		$loaded_json = file_get_contents($json_file);

		/* Intersect JSON and computed array */
		$returnedArray = array_intersect_key(json_decode($loaded_json, true), $dirArray);
	} else {
		file_put_contents($json_file, json_encode($dirArray));
		$returnedArray = $dirArray;
	}
?>

<script type="text/javascript">
	var phpJSON = <?php print_r(json_encode($returnedArray)); ?>;
</script>