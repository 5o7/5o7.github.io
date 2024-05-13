<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    // Create or append to the CSV file
    $file = fopen("data.csv", "a");
    fputcsv($file, array($name, $email, $phone));
    fclose($file);

    // Redirect to the display page
    header("Location: display.php");
    exit();
}
?>