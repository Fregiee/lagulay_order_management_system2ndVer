<!DOCTYPE html>
<?php  
error_reporting(E_ALL);
ini_set('display_errors', 1);


?>

<html>
<head>
    <title>Register</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="/Misc/processes.js" defer></script>
</head>
<body>
<h2>Register</h2>
<form id="regForm">
    <label>Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label>Password:</label><br>
    <input type="password" id="password" name="password"><br><br>
    <button type="submit">Register</button>
</form>
<p>Already have an account? <a href="login.php">Login here</a></p>
</body>
</html>
