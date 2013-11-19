<?php
	$disallowedDirs = [
		".",
		".."
	];

	$dirArray = [];
	if ($handle = opendir('.')) {
		$i = 0;
	    while (false !== ($entry = readdir($handle))) {
	        if (is_dir($entry) && !in_array($entry, $disallowedDirs)) {
	            $dirArray[$i] = array(
	            	"color" => "",
	            	"size" => "",
	            	"folderName" => $entry
	            	);
	            $i++;
	        }
	    }
	    closedir($handle);
	}

	/* Read JSON */
	$json_file = "start_config.json";
?>

<script type="text/javascript">
	var phpJSON = <?php print_r(json_encode($dirArray)); ?>;
</script>