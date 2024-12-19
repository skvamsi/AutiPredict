<?php
   if(isset($_POST['id'])) {
		$id = $_POST['id'];
		if($id == 1){
			$result = exec('model1.py'); 
		}
		else if($id == 2) {
			$result = exec('model2.py'); 
		}
		else if($id == 3) {
			$result = exec('model3.py'); 
		}
		else if($id == 4) {
			$result = exec('model4.py'); 
		}
		else {
			echo "sorry..model not executing..";
		}
    }
?>
