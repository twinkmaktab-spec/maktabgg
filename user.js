console.log('user.js loaded (Firebase Auth)');

// ============================================
// FIREBASE CONFIG (твой)
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyBnOAkbWKdUsuL0ozEkfM4Qib3WmEn1ao4",
  authDomain: "maktab153.firebaseapp.com",
  projectId: "maktab153",
  storageBucket: "maktab153.firebasestorage.app",
  messagingSenderId: "1069148593527",
  appId: "1:1069148593527:web:e281eb3828bfdccddf5572",
  measurementId: "G-7DE92QBRJP"
};

let auth = null;
let currentUser = null;
let mode = "login"; // login | signup

// ============================================
// MODAL HELPERS (используем твой #userRegModal + .show)
// ============================================
function ensureAuthModal() {
  let modal = document.getElementById("userRegModal");

  // Если на странице нет модалки — создадим такую же (под твои CSS)
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "userRegModal";
    modal.className = "modal-overlay";
    modal.innerHTML = `<div class="modal-reg-content"></div>`;
    document.body.appendChild(modal);
  }

  // гарантируем контент
  let content = modal.querySelector(".modal-reg-content");
  if (!content) {
    content = document.createElement("div");
    content.className = "modal-reg-content";
    modal.appendChild(content);
  }

  // заменяем содержимое на Email/Password UI
  content.innerHTML = `
    <div class="modal-reg-header">
      <h2 id="authTitle">Kirish</h2>
      <p id="authSubtitle">Email va parol orqali</p>
    </div>

    <div style="display:flex; gap:10px; margin-bottom:18px;">
      <button type="button" class="btn-primary" id="tabLogin" style="flex:1;justify-content:center;">Kirish</button>
      <button type="button" class="btn-primary" id="tabSignup" style="flex:1;justify-content:center; opacity:.7;">Ro'yxatdan o'tish</button>
    </div>

    <div id="authMsg" style="display:none; padding:10px 12px; border-radius:10px; margin-bottom:12px; font-size:14px; font-weight:600;"></div>

    <form id="authForm">
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="authEmail" placeholder="example@mail.com" required>
      </div>

      <div class="form-group">
        <label>Parol</label>
        <input type="password" id="authPass" placeholder="min 6 belgidan" required>
      </div>

      <button type="submit" class="btn-primary" style="width:100%; justify-content:center;">
        Davom etish
      </button>
    </form>

    <p class="modal-reg-note" style="margin-top:14px;">
      Email allaqachon ro'yxatdan o'tgan bo'lsa, qayta ro'yxatdan o'tkazilmaydi.
    </p>
  `;

  // запретим закрывать модалку кликом по фону (по желанию)
  // modal.addEventListener("click", (e) => { if (e.target === modal) e.stopPropagation(); });

  return modal;
}

function openAuthModal() {
  const modal = ensureAuthModal();
  modal.classList.add("show");
}

function closeAuthModal() {
  const modal = document.getElementById("userRegModal");
  if (modal) modal.classList.remove("show");
}

function showAuthMsg(text, ok = false) {
  const el = document.getElementById("authMsg");
  if (!el) return;
  el.style.display = "block";
  el.textContent = text;
  el.style.background = ok ? "rgba(46,125,50,0.1)" : "rgba(211,47,47,0.1)";
  el.style.border = ok ? "1px solid rgba(46,125,50,0.2)" : "1px solid rgba(211,47,47,0.2)";
  el.style.color = ok ? "#2e7d32" : "#d32f2f";
}

function clearAuthMsg() {
  const el = document.getElementById("authMsg");
  if (!el) return;
  el.style.display = "none";
  el.textContent = "";
}

// ============================================
// USER UI (верхняя карточка)
// ============================================
function updateUserUI(user) {
  const userInfo = document.getElementById("userInfo");
  if (!userInfo) return;

  const email = user?.email || "";
  const letter = (email || "?").charAt(0).toUpperCase();

  userInfo.innerHTML = `
    <div class="user-card">
      <div class="user-avatar">${letter}</div>
      <div class="user-details">
        <strong>${email}</strong>
        <small>Online</small>
      </div>
      <button type="button" class="user-logout" onclick="logoutUser()" title="Chiqish">✕</button>
    </div>
  `;
}

// logout должен быть глобальным (используется onclick)
window.logoutUser = async function logoutUser() {
  try {
    if (!auth) return;
    const mod = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
    await mod.signOut(auth);
    location.reload();
  } catch (e) {
    console.error("logout error:", e);
  }
};

// ============================================
// INIT FIREBASE AUTH
// ============================================
async function initFirebaseAuth() {
  // Firebase auth НЕ работает на file:// (нужно открыть через сайт/хостинг)
  if (location.protocol === "file:") {
    console.warn("Firebase Auth не работает на file://. Открой через хостинг или localhost.");
    // Можно оставить твой старый localStorage режим, но ты просил именно email.
  }

  const appMod = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
  const authMod = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");

  const app = appMod.initializeApp(firebaseConfig);
  auth = authMod.getAuth(app);

  // Подписка на состояние
  authMod.onAuthStateChanged(auth, (user) => {
    currentUser = user || null;
    if (currentUser) {
      closeAuthModal();
      updateUserUI(currentUser);
      console.log("Logged in:", currentUser.email);
    } else {
      openAuthModal();
    }
  });

  // Подключаем UI обработчики (после того как модалка создана)
  wireAuthUI(authMod);
}

function setMode(nextMode) {
  mode = nextMode;
  clearAuthMsg();

  const title = document.getElementById("authTitle");
  const sub = document.getElementById("authSubtitle");
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");

  if (title) title.textContent = (mode === "login") ? "Kirish" : "Ro'yxatdan o'tish";
  if (sub) sub.textContent = (mode === "login") ? "Email va parol orqali" : "Yangi аккаунт yaratish";

  if (tabLogin && tabSignup) {
    tabLogin.style.opacity = (mode === "login") ? "1" : "0.7";
    tabSignup.style.opacity = (mode === "signup") ? "1" : "0.7";
  }
}

function wireAuthUI(authMod) {
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const form = document.getElementById("authForm");

  if (!tabLogin || !tabSignup || !form) return;

  tabLogin.addEventListener("click", () => setMode("login"));
  tabSignup.addEventListener("click", () => setMode("signup"));
  setMode("login");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearAuthMsg();

    const email = document.getElementById("authEmail")?.value?.trim();
    const pass = document.getElementById("authPass")?.value;

    if (!email || !pass) {
      showAuthMsg("❌ Email va parolni kiriting!");
      return;
    }

    try {
      if (mode === "signup") {
        // РЕГИСТРАЦИЯ
        await authMod.createUserWithEmailAndPassword(auth, email, pass);
        showAuthMsg("✅ Ro'yxatdan o'tdingiz!", true);
      } else {
        // ВХОД
        await authMod.signInWithEmailAndPassword(auth, email, pass);
      }
    } catch (err) {
      // Главная логика: запретить регистрацию на уже существующий email
      if (err.code === "auth/email-already-in-use") {
        showAuthMsg("❌ Bu email allaqachon ro'yxatdan o'tgan. 'Kirish' bo'limidan foydalaning.");
        setMode("login");
      } else if (err.code === "auth/wrong-password") {
        showAuthMsg("❌ Parol xato.");
      } else if (err.code === "auth/user-not-found") {
        showAuthMsg("❌ Bu email ro'yxatdan o'tmagan. Avval ro'yxatdan o'ting.");
        setMode("signup");
      } else if (err.code === "auth/weak-password") {
        showAuthMsg("❌ Parol juda qisqa. Kamida 6 ta belgi bo'lishi kerak.");
      } else if (err.code === "auth/invalid-email") {
        showAuthMsg("❌ Email noto'g'ri.");
      } else {
        showAuthMsg("❌ Xatolik: " + err.message);
      }
    }
  });
}

// ============================================
// START
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initFirebaseAuth().catch((e) => {
    console.error("Firebase init error:", e);
    // если упало — покажем хоть какое-то сообщение
    openAuthModal();
    showAuthMsg("❌ Firebase ulanmadi. Console'ni tekshiring.");
  });
});
