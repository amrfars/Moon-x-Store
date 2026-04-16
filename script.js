// =========================================
// 1. تحديد العناصر
// =========================================
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const addButtons = document.querySelectorAll('.btn-add');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total-amount');
const btnClearCart = document.getElementById('btn-clear-cart');

// عناصر الفلتر والبحث والموبايل
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('search-input');
const mobileMenu = document.getElementById('mobile-menu');
const navElements = document.getElementById('nav-elements');

// عناصر النوافذ والمستخدم
const checkoutBtn = document.getElementById('btn-checkout');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutName = document.getElementById('checkout-name');
const authModal = document.getElementById('auth-modal');
const btnLoginOpen = document.getElementById('btn-login-open');
const btnRegisterOpen = document.getElementById('btn-register-open');
const closeModals = document.querySelectorAll('.close-modal');

const guestMenu = document.getElementById('guest-menu');
const userMenu = document.getElementById('user-menu');
const userGreeting = document.getElementById('user-greeting');
const btnLogout = document.getElementById('btn-logout');

const authTitle = document.getElementById('auth-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authSwitchLink = document.getElementById('auth-switch-link');
const authSwitchText = document.getElementById('auth-switch-text');
const nameGroup = document.getElementById('name-group');
const regNameInput = document.getElementById('reg-name');
const authEmailInput = document.getElementById('auth-email');

let cart = [];
let isLoginMode = true; 

// =========================================
// 2. إدارة البيانات (LocalStorage) - الجديد!
// =========================================

// جلب السلة من الذاكرة لو موجودة
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('moonx_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// حفظ السلة في الذاكرة
function saveCartToStorage() {
    localStorage.setItem('moonx_cart', JSON.stringify(cart));
}

// التحقق من تسجيل دخول المستخدم
function checkUserAuth() {
    const savedUser = localStorage.getItem('moonx_user');
    if (savedUser) {
        // لو مسجل دخول، نخفي زراير الدخول ونظهر اسمه
        guestMenu.style.display = 'none';
        userMenu.style.display = 'flex';
        userGreeting.innerText = `Hi, ${savedUser.split('@')[0]}`; // عرض الاسم أو أول جزء من الإيميل
        checkoutName.value = savedUser; // تعبئة الاسم تلقائياً في صفحة الدفع
    } else {
        // لو مش مسجل
        guestMenu.style.display = 'flex';
        userMenu.style.display = 'none';
        checkoutName.value = '';
    }
}

// تسجيل الخروج
btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('moonx_user');
    checkUserAuth();
    showToast("Logged out successfully.");
});

// =========================================
// 3. إدارة السلة وعرضها
// =========================================
function openCart() { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); navElements.classList.remove('active');}
function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); }

cartIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function renderCart() {
    cartItemsContainer.innerHTML = '';
    cartCountElement.innerText = cart.length;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartTotalElement.innerText = '0 EGP';
    } else {
        cart.forEach((item, index) => {
            totalPrice += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-price">${item.price} EGP</p>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${index})">&times;</button>
                </div>
            `;
        });
        cartTotalElement.innerText = `${totalPrice} EGP`;
    }
    // حفظ التحديثات في الذاكرة
    saveCartToStorage();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// زر تفريغ السلة بالكامل
btnClearCart.addEventListener('click', () => {
    cart = [];
    renderCart();
    showToast("Cart cleared!");
});

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// إضافة منتج للسلة
addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const id = card.dataset.id;
        const name = card.querySelector('h3').innerText;
        const price = parseInt(card.querySelector('.price').dataset.price);

        cart.push({ id, name, price });
        renderCart();
        showToast(`Added ${name} to cart!`);
    });
});

// =========================================
// 4. باقي الوظائف (بحث، فلتر، نوافذ)
// =========================================

// الموبايل منيو
mobileMenu.addEventListener('click', () => { navElements.classList.toggle('active'); });

// الفلترة
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.dataset.filter;
        productCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// البحث
searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    productCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// إغلاق النوافذ
closeModals.forEach(btn => {
    btn.addEventListener('click', (e) => { e.target.closest('.modal').classList.remove('open'); });
});

// الدفع
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        closeCart();
        checkoutModal.classList.add('open');
    } else { showToast("Cart is empty!"); }
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    checkoutModal.classList.remove('open');
    cart = []; 
    renderCart();
    showToast("Payment Successful! Codes sent to your email.");
});

// نظام الدخول والتسجيل
function setAuthMode(login) {
    isLoginMode = login;
    if (login) {
        authTitle.innerText = "Welcome Back";
        authSubmitBtn.innerText = "Login";
        authSwitchText.innerText = "Don't have an account?";
        authSwitchLink.innerText = "Sign Up";
        nameGroup.style.display = "none";
        regNameInput.removeAttribute('required');
    } else {
        authTitle.innerText = "Create Account";
        authSubmitBtn.innerText = "Register";
        authSwitchText.innerText = "Already have an account?";
        authSwitchLink.innerText = "Login";
        nameGroup.style.display = "block";
        regNameInput.setAttribute('required', 'true');
    }
}

btnLoginOpen.addEventListener('click', (e) => { e.preventDefault(); setAuthMode(true); authModal.classList.add('open'); navElements.classList.remove('active'); });
btnRegisterOpen.addEventListener('click', (e) => { e.preventDefault(); setAuthMode(false); authModal.classList.add('open'); navElements.classList.remove('active'); });

authSwitchLink.addEventListener('click', (e) => { e.preventDefault(); setAuthMode(!isLoginMode); });

document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // حفظ اسم المستخدم في الذاكرة
    let userName = isLoginMode ? authEmailInput.value : regNameInput.value;
    localStorage.setItem('moonx_user', userName);
    
    authModal.classList.remove('open');
    checkUserAuth(); // تحديث الهيدر
    
    const msg = isLoginMode ? "Logged in successfully!" : "Account created successfully!";
    showToast(msg);
});

// =========================================
// 5. التشغيل عند فتح الصفحة
// =========================================
loadCartFromStorage(); // نجيب السلة القديمة لو موجودة
checkUserAuth();       // نتأكد لو هو مسجل دخول قبل كده
renderCart();          // نعرض البيانات