/*
  إعدادات المتجر:
  1) غيّر STORE_NAME لاسم متجرك.
  2) غيّر WHATSAPP_NUMBER لرقمك مع كود الدولة، أرقام فقط.
     مثال مصر: 201XXXXXXXXX (بدون + أو مسافات).
  3) عدّل المنتجات والأسعار والصور في مصفوفة products بالأسفل.
*/
const STORE_NAME = "لمسة جمال";
const WHATSAPP_NUMBER = "201XXXXXXXXX"; // استبدل الرقم برقم واتساب المتجر الحقيقي

const products = [
  { id: 1, name: "سيروم ترطيب وإشراقة البشرة", category: "العناية بالبشرة", price: 320, oldPrice: 390, badge: "الأكثر طلبًا", rating: "★★★★★", image: "images/all-products/product-01.jpg" },
  { id: 2, name: "كريم مرطب يومي", category: "العناية بالبشرة", price: 250, oldPrice: null, badge: "اختيار مميز", rating: "★★★★★", image: "images/all-products/product-02.jpg" },
  { id: 3, name: "أحمر شفاه بلون وردي", category: "المكياج", price: 180, oldPrice: 220, badge: "عرض خاص", rating: "★★★★☆", image: "images/all-products/product-03.jpg" },
  { id: 4, name: "ماسكارا لتحديد الرموش", category: "المكياج", price: 210, oldPrice: null, badge: "", rating: "★★★★★", image: "images/all-products/product-04.jpg" },
  { id: 5, name: "عطر ناعم للاستخدام اليومي", category: "العطور", price: 450, oldPrice: 520, badge: "خصم", rating: "★★★★★", image: "images/all-products/product-05.jpg" },
  { id: 6, name: "زيت عناية وتغذية الشعر", category: "العناية بالشعر", price: 275, oldPrice: null, badge: "", rating: "★★★★☆", image: "images/all-products/product-06.jpg" },
  { id: 7, name: "غسول لطيف للوجه", category: "العناية بالبشرة", price: 195, oldPrice: null, badge: "", rating: "★★★★★", image: "images/all-products/product-07.jpg" },
  { id: 8, name: "باليت ظلال عيون", category: "المكياج", price: 360, oldPrice: 420, badge: "عرض خاص", rating: "★★★★☆", image: "images/all-products/product-08.jpg" }

  ,{ id: 9, name: "غسول سيرافي للبشرة الدهنية", category: "العناية بالبشرة", price: 450, oldPrice: null, badge: "جديد", rating: "★★★★★", image: "images/all-products/product-09.jpg" }
  ,{ id: 10, name: "واقي شمس للبشرة", category: "العناية بالبشرة", price: 550, oldPrice: 650, badge: "خصم 15%", rating: "★★★★★", image: "images/all-products/product-10.jpg" }
  ,{ id: 11, name: "كريم أساس ميبلين", category: "المكياج", price: 280, oldPrice: 320, badge: "عرض خاص", rating: "★★★★☆", image: "images/all-products/product-11.jpg" }
  ,{ id: 12, name: "ملمع شفاه وردي", category: "المكياج", price: 220, oldPrice: null, badge: "جديد", rating: "★★★★★", image: "images/all-products/product-12.jpg" }
  ,{ id: 13, name: "عطر شانيل ناعم", category: "العطور", price: 1050, oldPrice: 1200, badge: "خصم 13%", rating: "★★★★★", image: "images/all-products/product-13.jpg" }
  ,{ id: 14, name: "عطر مس ديور", category: "العطور", price: 1850, oldPrice: null, badge: "جديد", rating: "★★★★★", image: "images/all-products/product-14.jpg" }
  ,{ id: 15, name: "شامبو للشعر الجاف", category: "العناية بالشعر", price: 190, oldPrice: 220, badge: "عرض خاص", rating: "★★★★☆", image: "images/all-products/product-15.jpg" }
  ,{ id: 16, name: "زيت أرجان للشعر", category: "العناية بالشعر", price: 550, oldPrice: null, badge: "جديد", rating: "★★★★★", image: "images/all-products/product-16.jpg" }

];

const money = value => `${Number(value).toLocaleString("ar-EG")} جنيه`;
let cart = loadCart();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("beautyStoreCart") || "[]");
    return Array.isArray(saved) ? saved.filter(item => products.some(p => p.id === item.id) && Number(item.qty) > 0) : [];
  } catch { return []; }
}
function saveCart() {
  localStorage.setItem("beautyStoreCart", JSON.stringify(cart));
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function renderProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;
  let filtered = products.filter(p =>
    (category === "الكل" || p.category === category) &&
    (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
  );
  if (sort === "low") filtered.sort((a,b) => a.price - b.price);
  if (sort === "high") filtered.sort((a,b) => b.price - a.price);
  const grid = document.getElementById("productGrid");
  document.getElementById("emptyState").hidden = filtered.length !== 0;

  // شريط العروض يظهر مرة واحدة قبل شبكة المنتجات.
  if (!document.getElementById("ljPromoBanner")) {
    grid.insertAdjacentHTML("beforebegin", `
      <section class="lj-promo-banner" id="ljPromoBanner" aria-label="عروض المتجر">
        <div class="lj-promo-copy">
          <span class="lj-promo-kicker">عروض لمسة جمال</span>
          <h2>جمالك يستاهل الدلع 💗</h2>
          <p>اكتشفي المنتجات المختارة بأسعار مميزة — اختاري عرضك وأضيفيه للسلة.</p>
        </div>
        <div class="lj-promo-chip">خصومات على منتجات مختارة</div>
      </section>
    `);
  }

  grid.innerHTML = filtered.map(p => {
    const discount = p.oldPrice && p.oldPrice > p.price
      ? Math.round((1 - p.price / p.oldPrice) * 100)
      : 0;
    return `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='https://placehold.co/600x600/fff0f5/b83265?text=Beauty+Product'">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        ${discount ? `<span class="lj-discount-tag">-${discount.toLocaleString("ar-EG")}%</span>` : ""}
        <button class="favorite" data-favorite="${p.id}" aria-label="إضافة ${p.name} للمفضلة">♡</button>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="product-bottom"><span class="price">${money(p.price)} ${p.oldPrice && p.oldPrice > p.price ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}</span><span class="rating">${p.rating}</span></div>
        <button class="add-button" data-add="${p.id}">＋ أضيفي إلى السلة</button>
      </div>
    </article>
  `;
  }).join("");
}
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  showToast("اتضاف المنتج للسلة بنجاح 💗");
}
function changeQty(id, amount) {
  const item = cart.find(row => row.id === id);
  if (!item) return;
  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter(row => row.id !== id);
  saveCart();
  renderCart();
}
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}
function cartTotal() {
  return cart.reduce((sum, item) => {
    const p = products.find(product => product.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count.toLocaleString("ar-EG");
  const itemsEl = document.getElementById("cartItems");
  itemsEl.innerHTML = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    if (!p) return "";
    return `<div class="cart-row">
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/120x120/fff0f5/b83265?text=Beauty'">
      <div><h3>${p.name}</h3><div class="cart-price">${money(p.price)}</div>
      <div class="qty-control"><button data-qty="${p.id}" data-change="-1" aria-label="تقليل الكمية">−</button><span>${item.qty.toLocaleString("ar-EG")}</span><button data-qty="${p.id}" data-change="1" aria-label="زيادة الكمية">＋</button></div></div>
      <button class="remove-item" data-remove="${p.id}" aria-label="حذف المنتج">×</button>
    </div>`;
  }).join("");
  const empty = cart.length === 0;
  document.getElementById("cartEmpty").hidden = !empty;
  document.getElementById("cartFooter").hidden = empty;
  document.getElementById("cartTotal").textContent = money(cartTotal());
}
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("drawerBackdrop").classList.add("show");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("drawerBackdrop").classList.remove("show");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
}
function buildOrderMessage(customer = null) {
  const lines = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return p ? `• ${p.name} — الكمية: ${item.qty} — ${money(p.price * item.qty)}` : "";
  }).filter(Boolean);
  let message = `مرحبًا ${STORE_NAME}، أريد تأكيد الطلب:\n\n${lines.join("\n")}\n\nإجمالي المنتجات: ${money(cartTotal())}`;
  if (customer) {
    message += `\n\nبيانات العميل:\nالاسم: ${customer.name}\nرقم الموبايل: ${customer.phone}\nالعنوان: ${customer.address}`;
    if (customer.notes) message += `\nملاحظات: ${customer.notes}`;
  }
  message += "\n\nمن فضلكم أكدوا توافر المنتجات وتكلفة الشحن.";
  return message;
}
function sendToWhatsApp(customer = null) {
  if (!cart.length) {
    showToast("ضيفي منتج واحد على الأقل للسلة الأول");
    return;
  }
  if (WHATSAPP_NUMBER === "201XXXXXXXXX") {
    showToast("قبل استقبال الطلبات، غيّري رقم واتساب في ملف script.js");
    // نسمح بفتح واتساب للاختبار، مع تنبيه واضح أن الرقم تجريبي.
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(customer))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if (add) addToCart(Number(add.dataset.add));
  const qty = event.target.closest("[data-qty]");
  if (qty) changeQty(Number(qty.dataset.qty), Number(qty.dataset.change));
  const remove = event.target.closest("[data-remove]");
  if (remove) removeItem(Number(remove.dataset.remove));
  const category = event.target.closest("[data-category]");
  if (category) {
    document.getElementById("categoryFilter").value = category.dataset.category;
    renderProducts();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  }
  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    favorite.textContent = favorite.textContent === "♡" ? "♥" : "♡";
    showToast(favorite.textContent === "♥" ? "اتضاف للمفضلة 💗" : "اتشال من المفضلة");
  }
});
document.getElementById("searchInput").addEventListener("input", renderProducts);
document.getElementById("categoryFilter").addEventListener("change", renderProducts);
document.getElementById("sortFilter").addEventListener("change", renderProducts);
document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("drawerBackdrop").addEventListener("click", closeCart);
document.getElementById("continueShopping").addEventListener("click", closeCart);
document.getElementById("whatsappButton").addEventListener("click", () => sendToWhatsApp());
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) return showToast("السلة فاضية");
  document.getElementById("checkoutDialog").showModal();
});

document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  
const customer = {
  name: String(form.get("customerName") || "").trim(),
  phone: String(form.get("phone") || "").trim(),
  address: String(form.get("address") || "").trim(),
  notes: String(form.get("notes") || "").trim(),
  payment: ({
    visa: "Visa",
    mastercard: "Mastercard",
    applepay: "Apple Pay",
    instapay: "InstaPay",
    bank: "تحويل بنكي",
    mada: "مدى"
  })[form.get("paymentMethod")] || ""
};


  if (!customer.name || !customer.phone || !customer.address) {
    showToast("من فضلك املئي الاسم والموبايل والعنوان");
    return;
  }

  if (!customer.payment) {
    showToast("من فضلك اختاري طريقة الدفع");
    return;
  }

  document.getElementById("checkoutDialog").close();
  sendToWhatsApp(customer);
});


document.getElementById("contactWhatsApp").addEventListener("click", event => {
  event.preventDefault();

  const phone = WHATSAPP_NUMBER;

  if (!phone) {
    showToast("تأكد من رقم واتساب المتجر في script.js");
    return;
  }

  const message = encodeURIComponent("مرحبًا، أريد الاستفسار عن منتجات المتجر.");
  const whatsappURL = `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappURL, "_blank");
});

document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open")));
document.getElementById("storeName").textContent = STORE_NAME;
document.getElementById("footerStoreName").textContent = STORE_NAME;
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
