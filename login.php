<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="/Misc/processes.js" defer> sessionStorage.setItem('user_type', data.type);</script>
</head>
<body>
<h2>Login</h2>
<form id="loginForm">
    <label>Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label>Password:</label><br>
    <input type="password" id="password" name="password"><br><br>
    <button type="submit">Login</button>
</form>
<p>Don't have an account? <a href="register.php">Register here</a></p>
</body>
</html>
