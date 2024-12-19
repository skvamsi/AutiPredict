<?php
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $scriptPath = "";
    
    switch ($id) {
        case 1:
            $scriptPath = 'moos.py';
            break;
        case 2:
            $scriptPath = 'moss2.py';
            break;
        case 3:
            $scriptPath = 'moss3.py';
            break;
        case 4:
            $scriptPath = 'moss4.py';
            break;
        default:
            echo "Sorry, model not found.";
            exit();
    }
    
    // Run the Python script and capture output
    $result = exec($scriptPath);
    echo $result;
}
?>