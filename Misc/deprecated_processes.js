import 'https://cdn.jsdelivr.net/npm/core-js-bundle/minified.js';

document.addEventListener('DOMContentLoaded', function() {


  // Register
  const regForm = document.querySelector('#regForm');
  if (regForm) {
    regForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username === '' || password === '') {
        Swal.fire('Error', 'Please fill all fields', 'error');
        return;
      }

      try {
        const res = await fetch('Misc/handleforms.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'register',
            username,
            password
          })
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire('Success', data.message, 'success');
          regForm.reset();
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }


  // Login
  // =======================
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username === '' || password === '') {
        Swal.fire('Error', 'Please fill all fields', 'error');
        return;
      }

      try {
        const res = await fetch('Misc/handleforms.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'login',
            username,
            password
          })
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire('Success', data.message, 'success').then(() => {
             sessionStorage.setItem('userType', data.type);
            if (data.type === 1) {
              window.location.href = '/Customer/index.php';
            } else if (data.type === 2 || data.type === 3) {
              window.location.href = '/Shared Admin Pages/index.php';
            } else {
              Swal.fire('Error', 'Unknown user type', 'error');
            }
          });
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }


  // Logout
  
  const logoutBtn = document.querySelector('#logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function() {
      try {
        const res = await fetch('../Misc/handleforms.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logout' })
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire('Logged out', data.message, 'success').then(() => {
            window.location.href = '/login.php';
          });
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }


  // Add Product
  
  const addProductForm = document.querySelector('#addProductForm');
  if (addProductForm) {
    addProductForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(addProductForm);
      formData.append('action', 'addProduct');

      try {
        const res = await fetch('../Misc/handleforms.php', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire('Success', data.message, 'success');
          addProductForm.reset();
          loadProducts();
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  
  // Products
 
  const productList = document.querySelector('#productList');
  async function loadProducts() {
    const userType = sessionStorage.getItem('userType'); 
    if (!productList) return;

    try {
      const res = await fetch('../Misc/handleforms.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_products' })
      });

      const data = await res.json();

      if (data.success && data.products.length > 0) {
        productList.innerHTML = '';

        data.products.forEach(p => {
          const div = document.createElement('div');
          div.classList.add('border', 'p-2', 'mb-2');
          div.innerHTML = `
                <img src="../uploads/${p.image}" width="100"><br>
                <strong>${p.name}</strong><br>
                Price: ₱${p.price}<br><br>
                <small>Added by: ${p.added_by || 'Unknown'}</small><br><br>

                ${userType == 1 ? `
                    <button class="add-to-cart-btn btn btn-sm btn-success" 
                        data-id="${p.id}" 
                        data-name="${p.name}" 
                        data-price="${p.price}">
                        Add to Cart
                    </button>
                ` : userType == 2 || userType == 3 ? `
                    <button class="edit-btn btn btn-sm btn-primary" data-id="${p.id}">Edit</button>
                    <button class="delete-btn btn btn-sm btn-danger" data-id="${p.id}">Delete</button>
                ` : ''}
                `;
                productList.appendChild(div);
        });

        // Delete product
        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', async e => {
            const id = e.target.dataset.id;
            const confirmDelete = await Swal.fire({
              title: 'Are you sure?',
              text: 'This product will be deleted permanently.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!'
            });

            if (confirmDelete.isConfirmed) {
              const res = await fetch('../Misc/handleforms.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'deleteProduct', id })
              });
              const result = await res.json();
              Swal.fire(result.success ? 'Deleted!' : 'Error', result.message, result.success ? 'success' : 'error');
              if (result.success) loadProducts();
            }
          });
        });

        // Edit product
        document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', async e => {
            const id = e.target.dataset.id;
            const name = prompt('Enter new product name:');
            const price = prompt('Enter new price:');
            if (!name || !price) return;

            const res = await fetch('../Misc/handleforms.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'editProduct', id, name, price })
            });

            const result = await res.json();
            Swal.fire(result.success ? 'Updated!' : 'Error', result.message, result.success ? 'success' : 'error');
            if (result.success) loadProducts();
          });
        });

          document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.dataset.id;
          const name = e.target.dataset.name;
          const price = parseFloat(e.target.dataset.price);

          // Just call your existing window.addToCart() function
          if (window.addToCart) {
            window.addToCart(id, name, price);
            Swal.fire('Added!', `${name} added to your cart.`, 'success');
          } else {
            console.warn('addToCart() not found — are you on the customer page?');
          }
        });
      });
      } else {
        productList.innerHTML = '<p>No products available.</p>';
      }

    } catch (err) {
      console.error(err);
      productList.innerHTML = '<p>Error loading products.</p>';
    }
  }

  loadProducts();

//cart
if (window.location.pathname.toLowerCase().includes('/customer/')) {

  let cart = [];

  // Make sure products load
  loadProducts();
  loadTransactions();

  // Global addToCart function (used by menu buttons)
  window.addToCart = function(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
  };

  function updateCart() {
    const cartEl = document.getElementById('cart');
    cartEl.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          ${item.name} x${item.quantity}
        </div>
        <div>₱${item.price * item.quantity}</div>
      `;
      cartEl.appendChild(li);
      total += item.price * item.quantity;
    });

    document.getElementById('total').textContent = total;
  }

  // Payment button
  document.getElementById('order-btn')?.addEventListener('click', async () => {
    const money = parseFloat(document.getElementById('money').value);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) return Swal.fire('Empty', 'Your cart is empty.', 'warning');
    if (isNaN(money) || money <= 0) return Swal.fire('Invalid', 'Please enter a valid amount.', 'error');
    if (money < total) return Swal.fire('Insufficient', 'You don’t have enough money.', 'error');

    try {
      const res = await fetch('../Misc/handleforms.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'place_order',
          money,
          product_list: cart.map(c => c.id).join(',')
        })
      });

      const data = await res.json();
      Swal.fire(data.success ? 'Success' : 'Error', data.message, data.success ? 'success' : 'error');

      if (data.success) {
        cart = [];
        updateCart();
        loadTransactions();
        document.getElementById('money').value = '';
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong placing your order.', 'error');
    }
  });

  // Load transactions
  async function loadTransactions() {
    try {
      const res = await fetch('../Misc/handleforms.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_orders' })
      });

      const data = await res.json();
      const container = document.getElementById('transactions');
      container.innerHTML = '';

      if (data.success && data.orders.length > 0) {
        data.orders.forEach(o => {
          const div = document.createElement('div');
          div.classList.add('border', 'rounded', 'p-2', 'mb-2');
          div.innerHTML = `
            <p class="mb-1"><strong>Order #${o.id}</strong></p>
            <p class="mb-1">Amount: ₱${o.money}</p>
            <p class="mb-0">Status: ${o.status}</p>
          `;
          container.appendChild(div);
        });
      } else {
        container.innerHTML = '<p>No transactions found.</p>';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('transactions').innerHTML = '<p>Error loading transactions.</p>';
    }
  }
}


  
  // Admin 

  async function loadAdminUsers() {
    const container = document.getElementById('adminUsers');
    if (!container) return;

    try {
      const res = await fetch('../Misc/handleforms.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_admin_users' })
      });

      const data = await res.json();

      if (!data.success || data.users.length === 0) {
        container.innerHTML = '<p>No admin users found.</p>';
        return;
      }

      container.innerHTML = '';
      data.users.forEach(u => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.padding = '10px';
        div.style.margin = '5px';
        div.innerHTML = `
          <p><strong>${u.username}</strong></p>
          <label>
            Suspension:
            <select data-id="${u.id}" class="suspend-select">
              <option value="0" ${u.suspension == 0 ? 'selected' : ''}>Active</option>
              <option value="1" ${u.suspension == 1 ? 'selected' : ''}>Suspended</option>
            </select>
          </label>
        `;
        container.appendChild(div);
      });

      document.querySelectorAll('.suspend-select').forEach(sel => {
        sel.addEventListener('change', async e => {
          const userId = e.target.dataset.id;
          const suspension = e.target.value;

          const confirm = await Swal.fire({
            title: 'Confirm',
            text: `Are you sure you want to ${suspension == 1 ? 'suspend' : 'activate'} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
          });

          if (!confirm.isConfirmed) {
            e.target.value = suspension == 1 ? '0' : '1'; // revert
            return;
          }

          const res = await fetch('../Misc/handleforms.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'update_user_suspension',
              id: userId,
              suspension
            })
          });

          const result = await res.json();
          Swal.fire(result.success ? 'Success' : 'Error', result.message, result.success ? 'success' : 'error');
        });
      });

    } catch (err) {
      console.error(err);
      container.innerHTML = '<p>Error loading admin users.</p>';
    }
  }

  loadAdminUsers();

});
