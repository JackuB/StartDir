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
	            $dirArray[] = array(
	            	"hidden" => false,
	            	"folderName" => $entry
	            	);
	            $i++;
	        }
	    }
	    closedir($handle);
	}
?>

<script type="text/javascript">
	var phpJSON = <?php print_r(json_encode($dirArray, true)); ?>;
</script>