<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snack Ordering System</title>


  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">


  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script type="module" src="../Misc/processes.js"></script>

  <style>
    body {
      background-color: #f8f9fa;
    }
    .menu-section, .order-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      padding: 20px;
    }
    .card img {
      height: 150px;
      object-fit: cover;
    }
  </style>
</head>
<body class="p-3">

  <div class="d-flex justify-content-between align-items-center mb-3">
    <p class="h5 mb-0">Welcome Customer</p>
    <button id="logoutBtn" class="btn btn-outline-danger btn-sm">Logout</button>
  </div>

  <div class="container-fluid">
    <div class="row g-3">
      <!-- Menu Section -->
      <div class="col-md-8">
        <div class="menu-section p-3">
          <h4 class="mb-3">Menu</h4>

          <div id="productList" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
<!-- menu-->
          </div>
        </div>
      </div>

      <!-- Order Section -->
      <div class="col-md-4">
        <div class="order-section p-3">
          <h4 class="mb-3">Ordered Items</h4>
          <ul id="cart" class="list-group mb-3"></ul>

          <h5>Total: ₱<span id="total">0</span></h5>
          <input type="number" id="money" class="form-control mb-2" placeholder="Enter the amount here">
          <button id="order-btn" class="btn btn-success w-100">Pay!</button>
        </div>

        <div class="order-section p-3 mt-3">
          <h4>Your Transactions</h4>
          <div id="transactions"></div>
        </div>
      </div>
    </div>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
