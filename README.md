[index.html](https://github.com/user-attachments/files/26796994/index.html)
# Moon-x-Store[script.js](https://github.com/user-attachments/files/26796995/script.js)[style.css](https://github.com/user-attachments/files/26796999/style.css)
/* =========================================
   1. الإعدادات الأساسية ومتغيرات الألوان
   ========================================= */
:root {
    --primary-color: #ff4655; /* أحمر فالورانت */
    --primary-hover: #d43b47;
    --bg-dark: #111111;
    --card-bg: #1f1f1f;
    --card-hover-border: #333333;
    --text-light: #ffffff;
    --text-gray: #b3b3b3;
    --success-green: #4caf50;
    
    /* متغيرات للأنيميشن */
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

/* تنظيف وتوحيد التنسيق */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Cairo', sans-serif;
    scroll-behavior: smooth; /* تحريك ناعم عند التنقل في الصفحة */
}

body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    line-height: 1.6;
    overflow-x: hidden; /* لمنع التمرير الأفقي غير المرغوب فيه */
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

h1, h2, h3 {
    font-weight: 700;
}

/* =========================================
   2. الأنيميشن الأساسية (Keyframes)
   ========================================= */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 70, 85, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(255, 70, 85, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 70, 85, 0); }
}

@keyframes cartPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

/* كلاسات لتطبيق الأنيميشن في HTML */
.animate-fade-in {
    opacity: 0;
    animation: fadeInUp 0.8s var(--ease-out) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

/* =========================================
   3. الهيدر والتنقل
   ========================================= */
header {
    background-color: rgba(31, 31, 31, 0.95); /* شفافية بسيطة */
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid var(--primary-color);
    backdrop-filter: blur(5px); /* تأثير ضبابي */
}

header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 28px;
    font-weight: bold;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 25px;
}

.nav-links a {
    color: var(--text-light);
    text-decoration: none;
    transition: color 0.3s;
    font-size: 1.1rem;
}

.nav-links a:hover {
    color: var(--primary-color);
}

/* أفعال المستخدم والسلة */
.user-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.btn-login, .btn-register {
    text-decoration: none;
    padding: 8px 18px;
    border-radius: 5px;
    font-weight: 600;
    transition: 0.3s ease;
}

.btn-login {
    color: var(--text-light);
}

.btn-login:hover {
    color: var(--primary-color);
}

.btn-register {
    background-color: var(--primary-color);
    color: var(--text-light);
}

.btn-register:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
}

/* أيقونة السلة المحسنة */
.cart-icon {
    position: relative;
    font-size: 22px;
    background: #2a2a2a;
    padding: 8px 18px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.3s;
    display: flex;
    align-items: center;
}

.cart-icon:hover {
    background: #333333;
}

#cart-count {
    color: var(--primary-color);
    font-weight: bold;
    margin-left: 8px;
    background: white;
    padding: 0px 7px;
    border-radius: 50%;
    font-size: 0.9rem;
}

/* كلاس الأنيميشن للسلة */
.cart-pop-animation {
    animation: cartPop 0.3s ease-out;
}

/* =========================================
   4. القائمة الجانبية للسلة (Sidebar) - مُحسنة
   ========================================= */
.cart-sidebar {
    position: fixed;
    top: 0;
    right: -400px; /* مخفية */
    width: 380px;
    height: 100vh;
    background-color: var(--card-bg);
    border-left: 2px solid var(--primary-color);
    box-shadow: -10px 0 30px rgba(0,0,0,0.8);
    z-index: 1000;
    transition: right 0.5s var(--ease-out);
    padding: 25px;
    display: flex;
    flex-direction: column;
}

.cart-sidebar.open {
    right: 0;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 15px;
    margin-bottom: 20px;
}

.close-btn {
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 35px;
    cursor: pointer;
    transition: color 0.3s;
}

.close-btn:hover {
    color: var(--primary-color);
}

/* حاوية المنتجات الديناميكية */
.cart-items-container {
    flex-grow: 1;
    overflow-y: auto; /* تمرير عمودي إذا زادت المنتجات */
    padding-right: 10px;
}

/* ستايل المنتج الواحد داخل السلة */
.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
    animation: fadeInUp 0.3s ease;
}

.item-details {
    flex-grow: 1;
    margin-left: 15px;
}

.item-name {
    font-weight: 600;
}

.item-price {
    color: var(--primary-color);
    font-weight: bold;
}

.btn-remove {
    background: none;
    border: none;
    color: var(--text-gray);
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 10px;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.empty-msg {
    text-align: center;
    color: var(--text-gray);
    margin-top: 50px;
}

/* فوتر السلة */
.cart-footer {
    margin-top: auto;
    border-top: 1px solid #333;
    padding-top: 20px;
}

.total-price {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 20px;
}

#cart-total-amount {
    color: var(--primary-color);
}

.btn-checkout {
    width: 100%;
    background-color: var(--primary-color);
    color: white;
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.btn-checkout:hover {
    background-color: var(--primary-hover);
}

/* الخلفية المظلمة عند فتح السلة */
.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    display: none; /* مخفية */
    backdrop-filter: blur(3px);
}

.cart-overlay.open {
    display: block;
}

/* =========================================
   5. واجهة الموقع (Hero Section) - مُحسنة
   ========================================= */
.hero {
    text-align: center;
    padding: 150px 20px;
    background: linear-gradient(to bottom, rgba(31, 31, 31, 0.9), rgba(17, 17, 17, 1)), 
                url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover;
}

.hero h1 {
    font-size: 4rem;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.hero p {
    color: var(--text-gray);
    font-size: 1.4rem;
    margin-bottom: 40px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

/* =========================================
   6. الأزرار العامة
   ========================================= */
.btn-main {
    background-color: var(--primary-color);
    color: white;
    padding: 15px 35px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s ease;
    display: inline-block;
}

.btn-main:hover {
    background-color: var(--primary-hover);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 70, 85, 0.2);
}

/* =========================================
   7. قسم المنتجات والبطاقات - مُحسن
   ========================================= */
#products {
    padding: 80px 20px;
}

.section-title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* كروت أعرض قليلاً */
    gap: 30px;
}

.product-card {
    background-color: var(--card-bg);
    padding: 25px;
    border-radius: 12px;
    text-align: left; /* تغيير الاتجاه لليسار ليتناسب مع اللغة الإنجليزية */
    transition: 0.4s var(--ease-out);
    border: 1px solid #2a2a2a;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: var(--primary-color);
    box-shadow: 0 15px 30px rgba(0,0,0,0.5);
}

/* حاوية الصورة مع حماية لعدم التمدد */
.card-img-container {
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    background-color: #2a2a2a; /* خلفية مؤقتة */
    border-radius: 8px;
    overflow: hidden;
}

.product-card img {
    max-width: 80%;
    max-height: 80%;
    transition: 0.5s ease;
}

.product-card:hover img {
    transform: scale(1.1); /* زوم خفيف للصورة عند الوقوف على الكارت */
}

.product-card h3 {
    font-size: 1.3rem;
    margin-bottom: 5px;
}

.product-card .category {
    color: var(--text-gray);
    font-size: 0.9rem;
    margin-bottom: 15px;
}

.card-footer {
    margin-top: auto; /* دفع الفوتر لأسفل */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-card .price {
    color: var(--primary-color);
    font-size: 1.6rem;
    font-weight: 700;
}

.btn-add {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    padding: 8px 20px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.btn-add:hover {
    background-color: var(--primary-color);
    color: white;
}

/* =========================================
   8. قسم المميزات (الجديد)
   ========================================= */
.features-section {
    padding: 80px 20px;
    background-color: #1a1a1a;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    text-align: center;
}

.feature-item {
    padding: 30px;
    background: var(--card-bg);
    border-radius: 10px;
}

.feat-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    display: block;
}

.feature-item h3 {
    margin-bottom: 10px;
    color: var(--text-light);
}

.feature-item p {
    color: var(--text-gray);
}

/* =========================================
   9. الفوتر
   ========================================= */
footer {
    text-align: center;
    padding: 40px;
    background-color: #0d0d0d;
    color: var(--text-gray);
    border-top: 1px solid #333;
}

.dev-credit {
    font-size: 0.8rem;
    margin-top: 10px;
}
:root {
    --primary-color: #ff4655; 
    --primary-hover: #d43b47;
    --bg-dark: #111111;
    --card-bg: #1f1f1f;
    --text-light: #ffffff;
    --text-gray: #b3b3b3;
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Cairo', sans-serif;
    scroll-behavior: smooth;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    line-height: 1.6;
    overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

/* ======== الهيدر وشريط البحث ======== */
header {
    background-color: rgba(31, 31, 31, 0.95);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid var(--primary-color);
    backdrop-filter: blur(5px);
}

header nav { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 28px; font-weight: bold; color: var(--primary-color); text-transform: uppercase; }

.search-bar {
    display: flex;
    background: #2a2a2a;
    border-radius: 20px;
    padding: 5px 15px;
    width: 300px;
}
.search-bar input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
}
.search-bar button {
    background: none; border: none; cursor: pointer; font-size: 1.2rem;
}

.user-actions { display: flex; align-items: center; gap: 15px; }
.btn-login { color: var(--text-light); text-decoration: none; font-weight: 600; }
.btn-login:hover { color: var(--primary-color); }
.btn-register { background-color: var(--primary-color); color: var(--text-light); padding: 8px 18px; border-radius: 5px; text-decoration: none; font-weight: 600; }

/* ======== السلة ======== */
.cart-icon { position: relative; font-size: 22px; background: #2a2a2a; padding: 8px 18px; border-radius: 20px; cursor: pointer; display: flex; align-items: center; }
#cart-count { color: var(--primary-color); font-weight: bold; margin-left: 8px; background: white; padding: 0px 7px; border-radius: 50%; font-size: 0.9rem; }
.cart-sidebar { position: fixed; top: 0; right: -400px; width: 380px; height: 100vh; background-color: var(--card-bg); border-left: 2px solid var(--primary-color); box-shadow: -10px 0 30px rgba(0,0,0,0.8); z-index: 1000; transition: right 0.5s var(--ease-out); padding: 25px; display: flex; flex-direction: column; }
.cart-sidebar.open { right: 0; }
.cart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
.close-btn { background: none; border: none; color: var(--text-light); font-size: 35px; cursor: pointer; }
.cart-items-container { flex-grow: 1; overflow-y: auto; padding-right: 10px; }
.cart-item { display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; margin-bottom: 15px; }
.item-price { color: var(--primary-color); font-weight: bold; }
.btn-remove { background: none; border: none; color: var(--text-gray); font-size: 1.2rem; cursor: pointer; margin-left: 10px; }
.cart-footer { margin-top: auto; border-top: 1px solid #333; padding-top: 20px; }
.total-price { display: flex; justify-content: space-between; font-size: 1.4rem; font-weight: 700; margin-bottom: 20px; }
#cart-total-amount { color: var(--primary-color); }
.btn-checkout { width: 100%; background-color: var(--primary-color); color: white; padding: 15px; border: none; border-radius: 5px; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
.cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 999; display: none; backdrop-filter: blur(3px); }
.cart-overlay.open { display: block; }

/* ======== الفلتر والمنتجات ======== */
.hero { text-align: center; padding: 150px 20px; background: linear-gradient(to bottom, rgba(31, 31, 31, 0.9), rgba(17, 17, 17, 1)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover; }
.hero h1 { font-size: 4rem; margin-bottom: 15px; text-transform: uppercase; }
.btn-main { background-color: var(--primary-color); color: white; padding: 15px 35px; border: none; border-radius: 5px; font-size: 1.1rem; font-weight: bold; cursor: pointer; text-decoration: none; display: inline-block; }
#products { padding: 80px 20px; }
.section-title { text-align: center; margin-bottom: 30px; font-size: 2.5rem; text-transform: uppercase; }

.filters { display: flex; justify-content: center; gap: 15px; margin-bottom: 40px; }
.filter-btn { background: #2a2a2a; border: none; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer; transition: 0.3s; font-weight: bold; }
.filter-btn.active, .filter-btn:hover { background: var(--primary-color); }

.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.product-card { background-color: var(--card-bg); padding: 25px; border-radius: 12px; border: 1px solid #2a2a2a; display: flex; flex-direction: column; transition: 0.3s; }
.product-card:hover { transform: translateY(-10px); border-color: var(--primary-color); }
.card-img-container { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; background-color: #2a2a2a; border-radius: 8px; }
.product-card img { max-width: 80%; max-height: 80%; }
.product-card h3 { font-size: 1.3rem; margin-bottom: 5px; }
.product-card .category { color: var(--text-gray); font-size: 0.9rem; margin-bottom: 15px; }
.card-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
.price { color: var(--primary-color); font-size: 1.6rem; font-weight: 700; }
.btn-add { background: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 8px 20px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-add:hover { background: var(--primary-color); color: white; }

/* ======== نافذة الدفع (Checkout Modal) ======== */
.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; justify-content: center; align-items: center; backdrop-filter: blur(5px); }
.modal.open { display: flex; }
.modal-content { background: var(--card-bg); padding: 40px; border-radius: 10px; width: 400px; max-width: 90%; position: relative; border-top: 3px solid var(--primary-color); }
.close-modal { position: absolute; top: 15px; right: 20px; font-size: 30px; cursor: pointer; color: var(--text-gray); }
.close-modal:hover { color: var(--primary-color); }
.modal-content h2 { margin-bottom: 20px; text-align: center; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; color: var(--text-gray); }
.form-group input, .form-group select { width: 100%; padding: 10px; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 5px; outline: none; }
.form-group input:focus, .form-group select:focus { border-color: var(--primary-color); }

/* ======== الإشعارات (Toasts) ======== */
.toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 3000; display: flex; flex-direction: column; gap: 10px; }
.toast { background: #4caf50; color: white; padding: 15px 25px; border-radius: 5px; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.5); transform: translateX(120%); transition: transform 0.3s ease; }
.toast.show { transform: translateX(0); }

footer { text-align: center; padding: 40px; background-color: #0d0d0d; border-top: 1px solid #333; margin-top: 50px;}
:root {
    --primary-color: #ff4655; 
    --primary-hover: #d43b47;
    --bg-dark: #111111;
    --card-bg: #1f1f1f;
    --text-light: #ffffff;
    --text-gray: #b3b3b3;
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Cairo', sans-serif; scroll-behavior: smooth; }
body { background-color: var(--bg-dark); color: var(--text-light); line-height: 1.6; overflow-x: hidden; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

/* ======== الهيدر والموبايل ======== */
header { background-color: rgba(31, 31, 31, 0.95); padding: 15px 0; position: sticky; top: 0; z-index: 100; border-bottom: 2px solid var(--primary-color); backdrop-filter: blur(5px); }
header nav { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
.logo { font-size: 28px; font-weight: bold; color: var(--primary-color); text-transform: uppercase; }

.nav-elements { display: flex; align-items: center; gap: 20px; width: auto; }
.search-bar { display: flex; background: #2a2a2a; border-radius: 20px; padding: 5px 15px; width: 300px; }
.search-bar input { background: none; border: none; color: white; outline: none; width: 100%; }
.search-bar button { background: none; border: none; cursor: pointer; font-size: 1.2rem; }

.user-actions { display: flex; align-items: center; gap: 15px; }
.btn-login { color: var(--text-light); text-decoration: none; font-weight: 600; }
.btn-login:hover { color: var(--primary-color); }
.btn-register { background-color: var(--primary-color); color: var(--text-light); padding: 8px 18px; border-radius: 5px; text-decoration: none; font-weight: 600; transition: 0.3s; }
.btn-register:hover { background-color: var(--primary-hover); }

/* زرار الموبايل */
.menu-toggle { display: none; flex-direction: column; cursor: pointer; gap: 5px; }
.menu-toggle .bar { width: 25px; height: 3px; background-color: white; transition: 0.3s; }

/* ======== السلة ======== */
.cart-icon { position: relative; font-size: 22px; background: #2a2a2a; padding: 8px 18px; border-radius: 20px; cursor: pointer; display: flex; align-items: center; }
#cart-count { color: var(--primary-color); font-weight: bold; margin-left: 8px; background: white; padding: 0px 7px; border-radius: 50%; font-size: 0.9rem; }
.cart-sidebar { position: fixed; top: 0; right: -400px; width: 380px; height: 100vh; background-color: var(--card-bg); border-left: 2px solid var(--primary-color); box-shadow: -10px 0 30px rgba(0,0,0,0.8); z-index: 1000; transition: right 0.5s var(--ease-out); padding: 25px; display: flex; flex-direction: column; }
.cart-sidebar.open { right: 0; }
.cart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
.close-btn { background: none; border: none; color: var(--text-light); font-size: 35px; cursor: pointer; }
.cart-items-container { flex-grow: 1; overflow-y: auto; padding-right: 10px; }
.cart-item { display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; margin-bottom: 15px; }
.item-price { color: var(--primary-color); font-weight: bold; }
.btn-remove { background: none; border: none; color: var(--text-gray); font-size: 1.2rem; cursor: pointer; margin-left: 10px; }
.cart-footer { margin-top: auto; border-top: 1px solid #333; padding-top: 20px; }
.total-price { display: flex; justify-content: space-between; font-size: 1.4rem; font-weight: 700; margin-bottom: 20px; }
#cart-total-amount { color: var(--primary-color); }
.btn-checkout { width: 100%; background-color: var(--primary-color); color: white; padding: 15px; border: none; border-radius: 5px; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
.cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 999; display: none; backdrop-filter: blur(3px); }
.cart-overlay.open { display: block; }

/* ======== الفلتر والمنتجات ======== */
.hero { text-align: center; padding: 150px 20px; background: linear-gradient(to bottom, rgba(31, 31, 31, 0.9), rgba(17, 17, 17, 1)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover; }
.hero h1 { font-size: 4rem; margin-bottom: 15px; text-transform: uppercase; }
.btn-main { background-color: var(--primary-color); color: white; padding: 15px 35px; border: none; border-radius: 5px; font-size: 1.1rem; font-weight: bold; cursor: pointer; text-decoration: none; display: inline-block; transition: 0.3s; }
.btn-main:hover { background-color: var(--primary-hover); transform: translateY(-3px); }
#products { padding: 80px 20px; }
.section-title { text-align: center; margin-bottom: 30px; font-size: 2.5rem; text-transform: uppercase; }
.filters { display: flex; justify-content: center; gap: 15px; margin-bottom: 40px; flex-wrap: wrap; }
.filter-btn { background: #2a2a2a; border: none; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer; transition: 0.3s; font-weight: bold; }
.filter-btn.active, .filter-btn:hover { background: var(--primary-color); }
.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.product-card { background-color: var(--card-bg); padding: 25px; border-radius: 12px; border: 1px solid #2a2a2a; display: flex; flex-direction: column; transition: 0.3s; }
.product-card:hover { transform: translateY(-10px); border-color: var(--primary-color); }
.card-img-container { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; background-color: #2a2a2a; border-radius: 8px; overflow: hidden;}
.product-card img { max-width: 80%; max-height: 80%; transition: 0.5s; }
.product-card:hover img { transform: scale(1.1); }
.product-card h3 { font-size: 1.3rem; margin-bottom: 5px; }
.product-card .category { color: var(--text-gray); font-size: 0.9rem; margin-bottom: 15px; }
.card-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
.price { color: var(--primary-color); font-size: 1.6rem; font-weight: 700; }
.btn-add { background: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 8px 20px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-add:hover { background: var(--primary-color); color: white; }

/* ======== قسم الآراء ======== */
.testimonials-section { padding: 60px 20px; background-color: #161616; border-top: 1px solid #2a2a2a; }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.testimonial-card { background: var(--card-bg); padding: 30px; border-radius: 10px; border-left: 4px solid var(--primary-color); }
.stars { color: #FFD700; margin-bottom: 15px; }
.testimonial-card p { font-style: italic; margin-bottom: 15px; color: var(--text-gray); }
.testimonial-card h4 { color: white; }

/* ======== النوافذ المنبثقة (Modals) ======== */
.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; justify-content: center; align-items: center; backdrop-filter: blur(5px); }
.modal.open { display: flex; animation: fadeIn 0.3s; }
.modal-content { background: var(--card-bg); padding: 40px; border-radius: 10px; width: 400px; max-width: 90%; position: relative; border-top: 3px solid var(--primary-color); }
.close-modal { position: absolute; top: 15px; right: 20px; font-size: 30px; cursor: pointer; color: var(--text-gray); transition: 0.3s;}
.close-modal:hover { color: var(--primary-color); }
.modal-content h2 { margin-bottom: 20px; text-align: center; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; color: var(--text-gray); }
.form-group input, .form-group select { width: 100%; padding: 12px; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 5px; outline: none; transition: 0.3s;}
.form-group input:focus, .form-group select:focus { border-color: var(--primary-color); }
.auth-switch { text-align: center; margin-top: 20px; color: var(--text-gray); font-size: 0.9rem; }
.auth-switch a { color: var(--primary-color); text-decoration: none; font-weight: bold; }

/* ======== الإشعارات ======== */
.toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 3000; display: flex; flex-direction: column; gap: 10px; }
.toast { background: #4caf50; color: white; padding: 15px 25px; border-radius: 5px; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.5); transform: translateX(120%); transition: transform 0.3s ease; }
.toast.show { transform: translateX(0); }

footer { text-align: center; padding: 30px; background-color: #0d0d0d; border-top: 1px solid #333; }

@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

/* ======== شاشات الموبايل (Responsive) ======== */
@media (max-width: 768px) {
    .menu-toggle { display: flex; }
    .nav-elements { display: none; width: 100%; flex-direction: column; position: absolute; top: 100%; left: 0; background: var(--card-bg); padding: 20px; border-bottom: 2px solid var(--primary-color); }
    .nav-elements.active { display: flex; }
    .search-bar { width: 100%; margin-bottom: 15px; }
    .user-actions { width: 100%; justify-content: space-between; }
    .hero h1 { font-size: 2.5rem; }
    .cart-sidebar { width: 300px; right: -300px; }
    .products-grid { grid-template-columns: 1fr; }
}
:root {
    --primary-color: #ff4655; 
    --primary-hover: #d43b47;
    --bg-dark: #111111;
    --card-bg: #1f1f1f;
    --text-light: #ffffff;
    --text-gray: #b3b3b3;
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Cairo', sans-serif; scroll-behavior: smooth; }
body { background-color: var(--bg-dark); color: var(--text-light); line-height: 1.6; overflow-x: hidden; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

/* الهيدر */
header { background-color: rgba(31, 31, 31, 0.95); padding: 15px 0; position: sticky; top: 0; z-index: 100; border-bottom: 2px solid var(--primary-color); backdrop-filter: blur(5px); }
header nav { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
.logo { font-size: 28px; font-weight: bold; color: var(--primary-color); text-transform: uppercase; }

.nav-elements { display: flex; align-items: center; gap: 20px; width: auto; }
.search-bar { display: flex; background: #2a2a2a; border-radius: 20px; padding: 5px 15px; width: 300px; }
.search-bar input { background: none; border: none; color: white; outline: none; width: 100%; }
.search-bar button { background: none; border: none; cursor: pointer; font-size: 1.2rem; }

.user-actions { display: flex; align-items: center; gap: 15px; }
.auth-buttons { display: flex; align-items: center; gap: 15px; }
.btn-login { color: var(--text-light); text-decoration: none; font-weight: 600; }
.btn-login:hover { color: var(--primary-color); }
.btn-register { background-color: var(--primary-color); color: var(--text-light); padding: 8px 18px; border-radius: 5px; text-decoration: none; font-weight: 600; transition: 0.3s; }
.btn-register:hover { background-color: var(--primary-hover); }
.user-greeting { color: var(--primary-color); font-weight: bold; margin-right: 10px; }

.menu-toggle { display: none; flex-direction: column; cursor: pointer; gap: 5px; }
.menu-toggle .bar { width: 25px; height: 3px; background-color: white; transition: 0.3s; }

/* السلة */
.cart-icon { position: relative; font-size: 22px; background: #2a2a2a; padding: 8px 18px; border-radius: 20px; cursor: pointer; display: flex; align-items: center; }
#cart-count { color: var(--primary-color); font-weight: bold; margin-left: 8px; background: white; padding: 0px 7px; border-radius: 50%; font-size: 0.9rem; }
.cart-sidebar { position: fixed; top: 0; right: -400px; width: 380px; height: 100vh; background-color: var(--card-bg); border-left: 2px solid var(--primary-color); box-shadow: -10px 0 30px rgba(0,0,0,0.8); z-index: 1000; transition: right 0.5s var(--ease-out); padding: 25px; display: flex; flex-direction: column; }
.cart-sidebar.open { right: 0; }
.cart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
.close-btn { background: none; border: none; color: var(--text-light); font-size: 35px; cursor: pointer; }
.cart-items-container { flex-grow: 1; overflow-y: auto; padding-right: 10px; }
.cart-item { display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px; margin-bottom: 15px; }
.item-price { color: var(--primary-color); font-weight: bold; }
.btn-remove { background: none; border: none; color: var(--text-gray); font-size: 1.2rem; cursor: pointer; margin-left: 10px; }
.cart-footer { margin-top: auto; border-top: 1px solid #333; padding-top: 20px; }
.total-price { display: flex; justify-content: space-between; font-size: 1.4rem; font-weight: 700; margin-bottom: 20px; }
#cart-total-amount { color: var(--primary-color); }
.btn-checkout { width: 100%; background-color: var(--primary-color); color: white; padding: 15px; border: none; border-radius: 5px; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
.btn-clear-cart { width: 100%; background-color: transparent; color: var(--text-gray); padding: 10px; border: 1px solid #333; border-radius: 5px; font-size: 1rem; cursor: pointer; transition: 0.3s; }
.btn-clear-cart:hover { background-color: #333; color: white; }
.cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 999; display: none; backdrop-filter: blur(3px); }
.cart-overlay.open { display: block; }

/* الفلتر والمنتجات */
.hero { text-align: center; padding: 150px 20px; background: linear-gradient(to bottom, rgba(31, 31, 31, 0.9), rgba(17, 17, 17, 1)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover; }
.hero h1 { font-size: 4rem; margin-bottom: 15px; text-transform: uppercase; }
.btn-main { background-color: var(--primary-color); color: white; padding: 15px 35px; border: none; border-radius: 5px; font-size: 1.1rem; font-weight: bold; cursor: pointer; text-decoration: none; display: inline-block; transition: 0.3s; }
.btn-main:hover { background-color: var(--primary-hover); transform: translateY(-3px); }
#products { padding: 80px 20px; }
.section-title { text-align: center; margin-bottom: 30px; font-size: 2.5rem; text-transform: uppercase; }
.filters { display: flex; justify-content: center; gap: 15px; margin-bottom: 40px; flex-wrap: wrap; }
.filter-btn { background: #2a2a2a; border: none; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer; transition: 0.3s; font-weight: bold; }
.filter-btn.active, .filter-btn:hover { background: var(--primary-color); }
.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.product-card { background-color: var(--card-bg); padding: 25px; border-radius: 12px; border: 1px solid #2a2a2a; display: flex; flex-direction: column; transition: 0.3s; }
.product-card:hover { transform: translateY(-10px); border-color: var(--primary-color); }
.card-img-container { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; background-color: #2a2a2a; border-radius: 8px; overflow: hidden;}
.product-card img { max-width: 80%; max-height: 80%; transition: 0.5s; }
.product-card:hover img { transform: scale(1.1); }
.product-card h3 { font-size: 1.3rem; margin-bottom: 5px; }
.product-card .category { color: var(--text-gray); font-size: 0.9rem; margin-bottom: 15px; }
.card-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
.price { color: var(--primary-color); font-size: 1.6rem; font-weight: 700; }
.btn-add { background: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 8px 20px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-add:hover { background: var(--primary-color); color: white; }

/* الآراء و النوافذ */
.testimonials-section { padding: 60px 20px; background-color: #161616; border-top: 1px solid #2a2a2a; }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.testimonial-card { background: var(--card-bg); padding: 30px; border-radius: 10px; border-left: 4px solid var(--primary-color); }
.stars { color: #FFD700; margin-bottom: 15px; }
.testimonial-card p { font-style: italic; margin-bottom: 15px; color: var(--text-gray); }

.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; justify-content: center; align-items: center; backdrop-filter: blur(5px); }
.modal.open { display: flex; animation: fadeIn 0.3s; }
.modal-content { background: var(--card-bg); padding: 40px; border-radius: 10px; width: 400px; max-width: 90%; position: relative; border-top: 3px solid var(--primary-color); }
.close-modal { position: absolute; top: 15px; right: 20px; font-size: 30px; cursor: pointer; color: var(--text-gray); transition: 0.3s;}
.close-modal:hover { color: var(--primary-color); }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; color: var(--text-gray); }
.form-group input, .form-group select { width: 100%; padding: 12px; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 5px; outline: none; transition: 0.3s;}
.form-group input:focus, .form-group select:focus { border-color: var(--primary-color); }
.auth-switch { text-align: center; margin-top: 20px; color: var(--text-gray); font-size: 0.9rem; }
.auth-switch a { color: var(--primary-color); text-decoration: none; font-weight: bold; }

/* الإشعارات */
.toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 3000; display: flex; flex-direction: column; gap: 10px; }
.toast { background: #4caf50; color: white; padding: 15px 25px; border-radius: 5px; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.5); transform: translateX(120%); transition: transform 0.3s ease; }
.toast.show { transform: translateX(0); }

footer { text-align: center; padding: 30px; background-color: #0d0d0d; border-top: 1px solid #333; }

@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

/* شاشات الموبايل */
@media (max-width: 768px) {
    .menu-toggle { display: flex; }
    .nav-elements { display: none; width: 100%; flex-direction: column; position: absolute; top: 100%; left: 0; background: var(--card-bg); padding: 20px; border-bottom: 2px solid var(--primary-color); }
    .nav-elements.active { display: flex; }
    .search-bar { width: 100%; margin-bottom: 15px; }
    .user-actions { width: 100%; justify-content: space-between; }
    .hero h1 { font-size: 2.5rem; }
    .cart-sidebar { width: 300px; right: -300px; }
    .products-grid { grid-template-columns: 1fr; }
}
