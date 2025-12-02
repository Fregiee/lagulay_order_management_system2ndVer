<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: /login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="../Misc/processes.js" defer></script>
</head>
<body>
    <h2>Add products, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
    <h3>Add New Product</h3>

    <form id="addProductForm" enctype="multipart/form-data">
        <input type="text" id="productName" name="name" placeholder="Product Name" required><br>
        <input type="file" id="productImage" name="image" accept="image/*" required><br>
        <input type="text" id="productPrice" name="price" placeholder="Price" required><br>
        <button type="submit">Add Product</button>
    </form>
     <h3>Available Products</h3>
    <div id="productList"></div>
    <br><button id="logoutBtn">Logout</button>
</body>
</html>
