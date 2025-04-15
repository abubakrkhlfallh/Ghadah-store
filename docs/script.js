document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  
  if(query.length > 2) {
    // محاكاة نتائج بحث (استبدلها باتصال بقاعدة البيانات لاحقاً)
    const fakeResults = [
      "تيشيرت انمي",
      "تيشيرت اسود",
    ].filter(item => item.includes(query));
    
    // عرض النتائج
    resultsContainer.innerHTML = fakeResults.map(result => 
      `<a href="#" class="dropdown-item">${result}</a>`
    ).join('');
    
    resultsContainer.classList.remove('d-none');
  } else {
    resultsContainer.classList.add('d-none');
  }
});

// تخزين العربة
let cart = [];

// دالة إضافة منتج
function addToCart(productId, productName, price) {
  const existingItem = cart.find(item => item.id === productId);
  
  if(existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  updateCartUI();
}

// تحديث واجهة العربة
function updateCartUI() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  const cartTotalEl = document.getElementById('cartTotal');
  
  // تحديث العداد
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // عرض العناصر
  if(cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-cart fa-3x text-muted"></i>
        <p class="mt-3">عربة التسوق فارغة</p>
      </div>
    `;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center">
          <img src="product_${item.id}.jpg" width="60" class="rounded me-3">
          <div>
            <h6 class="mb-0">${item.name}</h6>
            <small class="text-muted">${item.price} ج.س</small>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-danger ms-3" onclick="removeItem(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
  
  // حساب المجموع
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalEl.textContent = `${total} ج.س`;
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
     window.location.href = `checkout.html?total=${calculateTotal()}`;
   });
   
// دوال المساعدة
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if(item) {
    item.quantity += change;
    if(item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    updateCartUI();
  }
}

function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// عند تحميل الصفحة
   if(localStorage.getItem('cart')) {
     cart = JSON.parse(localStorage.getItem('cart'));
     updateCartUI();
   }
   
   // عند تحديث العربة
   localStorage.setItem('cart', JSON.stringify(cart));

const cartItems = [];
const cartTotal = document.getElementById('cart-total');
const cartList = document.getElementById('cart-items');
const checkoutForm = document.getElementById('checkout-form');
const orderForm = document.getElementById('order-form');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.querySelector('h2').textContent;
        const price = 10,000; // سعر التيشيرت
        cartItems.push({ name, price });
        updateCart();
    });
});

document.getElementById('checkout').addEventListener('click', () => {
    checkoutForm.style.display = 'block';
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;
    // هنا يمكنك إضافة كود لإرسال الطلب إلى الخادم أو معالجته مباشرة
    alert('تم تأكيد طلبك!');
    cartItems.length = 0;
    updateCart();
    orderForm.reset();
    checkoutForm.style.display = 'none';
});

function updateCart() {
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} جنيه سوداني`;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
}

<body>
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

