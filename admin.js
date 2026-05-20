// ============================================
// FIREBASE CONFIG
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKx7zRNir0h_FALQHdWRM52k-wQNMVAMY",
  authDomain: "maktab153-e06c3.firebaseapp.com",
  projectId: "maktab153-e06c3",
  storageBucket: "maktab153-e06c3.firebasestorage.app",
  messagingSenderId: "1049279491067",
  appId: "1:1049279491067:web:6d697feb4bc0b645ed795e",
  measurementId: "G-BZK9KFKD92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ============================================
// ⚠️ PAROLNI SHU YERDA O'ZGARTIRING ⚠️
// ============================================
const ADMIN_PASSWORD = "153153";

// ============================================
// STATE
// ============================================
let isAdmin     = false;
let enteredPass = "";
let allNews     = [];

// ============================================
// FIREBASE FUNCTIONS
// ============================================

// Rasm uploadlash
async function uploadImage(file) {
    try {
        const timestamp = Date.now();
        const fileName = `news/${timestamp}_${file.name}`;
        const storageRef = ref(storage, fileName);
        
        const uploadTask = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        return downloadURL;
    } catch (error) {
        console.error("Rasm uploadda xato:", error);
        throw error;
    }
}

// Yangiliklar o'qish
async function loadNewsFromFirebase() {
    try {
        const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        allNews = [];
        querySnapshot.forEach((doc) => {
            allNews.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        renderNews();
    } catch (error) {
        console.error("Yangiliklar o'qishda xato:", error);
    }
}

// Yangilik qo'shish
async function saveNewsToFirebase(newsItem) {
    try {
        await addDoc(collection(db, "news"), {
            ...newsItem,
            createdAt: new Date()
        });
        console.log("✅ Yangilik saqlandi!");
        await loadNewsFromFirebase();
    } catch (error) {
        console.error("Yangilik saqlanishda xato:", error);
        throw error;
    }
}

// Yangilikni o'chirish
async function deleteNewsFromFirebase(newsId) {
    try {
        await deleteDoc(doc(db, "news", newsId));
        console.log("✅ Yangilik o'chirildi!");
        await loadNewsFromFirebase();
    } catch (error) {
        console.error("O'chirishda xato:", error);
        throw error;
    }
}

// ============================================
// SECRET ENTRY: Logo 3 marta
// ============================================
let tapCount = 0;
let tapTimer = null;
document.getElementById('logoWrap').addEventListener('click', function(e) {
    e.preventDefault();
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => tapCount = 0, 3000);
    if (tapCount >= 3) {
        tapCount = 0;
        openModal();
    }
});

// ============================================
// MODAL OPEN / CLOSE
// ============================================
function openModal() {
    document.getElementById('adminModal').classList.add('show');
    if (isAdmin) {
        showPostScreen();
    } else {
        showPassScreen();
    }
}
function closeModal() {
    document.getElementById('adminModal').classList.remove('show');
}

document.getElementById('adminFab').addEventListener('click', openModal);
document.getElementById('adminModalClose').addEventListener('click', closeModal);
document.getElementById('adminModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ============================================
// SHOW SCREENS
// ============================================
function showPassScreen() {
    document.getElementById('passScreen').style.display = 'block';
    document.getElementById('postScreen').style.display = 'none';
    resetDots();
    enteredPass = "";
}
function showPostScreen() {
    document.getElementById('passScreen').style.display = 'none';
    document.getElementById('postScreen').style.display = 'block';
}

// ============================================
// NUMPAD
// ============================================
function resetDots() {
    [0,1,2,3,4,5].forEach(i => {
        document.getElementById('d'+i).classList.remove('filled');
    });
    document.getElementById('passError').classList.remove('show');
}
function updateDots() {
    [0,1,2,3,4,5].forEach(i => {
        const dot = document.getElementById('d'+i);
        if (i < enteredPass.length) dot.classList.add('filled');
        else dot.classList.remove('filled');
    });
}

document.querySelectorAll('.pass-key').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const n = this.dataset.n;

        if (n === 'del') {
            enteredPass = enteredPass.slice(0, -1);
            updateDots();
            return;
        }
        if (n === 'ok') {
            checkPassword();
            return;
        }
        if (enteredPass.length >= 6) return;
        enteredPass += n;
        updateDots();
        if (enteredPass.length === 6) {
            setTimeout(checkPassword, 200);
        }
    });
});

function checkPassword() {
    if (enteredPass === ADMIN_PASSWORD) {
        isAdmin = true;
        document.body.classList.add('admin-mode');
        document.getElementById('adminFab').style.display = 'flex';
        showPostScreen();
        loadNewsFromFirebase();
    } else {
        const err = document.getElementById('passError');
        err.textContent = '❌ Parol noto\'g\'ri! (Неверный пароль)';
        err.classList.add('show');
        enteredPass = "";
        setTimeout(resetDots, 1000);
    }
}

// ============================================
// EXIT ADMIN
// ============================================
document.getElementById('exitAdminBtn').addEventListener('click', function() {
    isAdmin = false;
    document.body.classList.remove('admin-mode');
    document.getElementById('adminFab').style.display = 'none';
    closeModal();
    loadNewsFromFirebase();
});

// ============================================
// IMAGE PREVIEW
// ============================================
document.getElementById('imgUploadWrap').addEventListener('click', function() {
    document.getElementById('imgInput').click();
});
document.getElementById('imgInput').addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    // Show progress animation
    const bar = document.getElementById('uploadBar');
    const fill = document.getElementById('uploadBarFill');
    bar.style.display = 'block';
    let w = 0;
    const iv = setInterval(function() {
        w += 5;
        fill.style.width = w + '%';
        if (w >= 100) clearInterval(iv);
    }, 30);

    const reader = new FileReader();
    reader.onload = function(ev) {
        const prev = document.getElementById('imgPreview');
        prev.src = ev.target.result;
        prev.style.display = 'block';
        setTimeout(function() { bar.style.display = 'none'; fill.style.width = '0%'; }, 700);
    };
    reader.readAsDataURL(file);
});

// ============================================
// LANG TABS
// ============================================
document.querySelectorAll('.lang-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.lang-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.lang-panel').forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

// ============================================
// PUBLISH NEWS
// ============================================
document.getElementById('postForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const imgFile = document.getElementById('imgInput').files[0];
    const tUz = document.getElementById('tUz').value.trim();
    const xUz = document.getElementById('xUz').value.trim();
    const tRu = document.getElementById('tRu').value.trim();
    const xRu = document.getElementById('xRu').value.trim();
    const tEn = document.getElementById('tEn').value.trim();
    const xEn = document.getElementById('xEn').value.trim();

    const suc = document.getElementById('postSuc');
    const err = document.getElementById('postErr');
    suc.classList.remove('show');
    err.classList.remove('show');

    if (!imgFile) {
        err.textContent = '❌ Rasm tanlang!';
        err.classList.add('show');
        return;
    }
    if (!tUz || !xUz) {
        err.textContent = '❌ O\'zbek tilida sarlavha va matnni kiriting!';
        err.classList.add('show');
        return;
    }

    const btn = document.getElementById('pubBtn');
    btn.disabled = true;
    btn.textContent = 'Yuklanmoqda...';

    try {
        // Rasm uploadlash
        const imageUrl = await uploadImage(imgFile);

        // Build date strings
        const now = new Date();
        const mUz = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
        const mRu = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        const mEn = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = now.getDate();
        const y = now.getFullYear();
        const mo = now.getMonth();

        const newsItem = {
            imageUrl: imageUrl,
            dateStrings: {
                uz: d + " " + mUz[mo] + ", " + y,
                ru: d + " " + mRu[mo] + " " + y,
                en: mEn[mo] + " " + d + ", " + y
            },
            uz: { title: tUz, text: xUz },
            ru: { title: tRu || tUz, text: xRu || xUz },
            en: { title: tEn || tUz, text: xEn || xUz }
        };

        // Firebase'ga saqlash
        await saveNewsToFirebase(newsItem);

        suc.textContent = '✅ Yangilik muvaffaqiyatli nashr etildi!';
        suc.classList.add('show');

        // Reset form
        document.getElementById('postForm').reset();
        document.getElementById('imgPreview').style.display = 'none';
        document.getElementById('imgPreview').src = '';
        document.getElementById('imgInput').value = '';

        btn.disabled = false;
        btn.textContent = '🚀 Nashr qilish';

        setTimeout(function() {
            suc.classList.remove('show');
            closeModal();
        }, 1800);

    } catch (error) {
        err.textContent = '❌ Xato: ' + error.message;
        err.classList.add('show');
        btn.disabled = false;
        btn.textContent = '🚀 Nashr qilish';
    }
});

// ============================================
// RENDER NEWS
// ============================================
function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    const lang = localStorage.getItem('language') || 'uz';

    if (allNews.length === 0) {
        grid.innerHTML = '<div class="news-empty"><span class="empty-icon">📰</span><p>Hozircha yangiliklar yo\'q</p></div>';
        return;
    }

    grid.innerHTML = '';
    allNews.forEach(function(item) {
        const title   = (item[lang] && item[lang].title) ? item[lang].title : item.uz.title;
        const text    = (item[lang] && item[lang].text)  ? item[lang].text  : item.uz.text;
        const dateStr = (item.dateStrings && item.dateStrings[lang]) ? item.dateStrings[lang] : '';

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML =
            '<button class="news-del-btn" title="O\'chirish">🗑️</button>' +
            '<div class="news-image"><img src="' + item.imageUrl + '" alt="' + title + '" loading="lazy"></div>' +
            '<div class="news-content">' +
                '<div class="news-meta"><span>📅 ' + dateStr + '</span></div>' +
                '<h3>' + title + '</h3>' +
                '<p>' + text + '</p>' +
            '</div>';

        // Delete
        card.querySelector('.news-del-btn').addEventListener('click', async function() {
            if (!confirm('Bu yangilikni o\'chirish?')) return;
            await deleteNewsFromFirebase(item.id);
        });

        grid.appendChild(card);
    });
}

// ============================================
// RE-RENDER ON LANG CHANGE
// ============================================
document.querySelectorAll('.lang-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
        setTimeout(renderNews, 150);
    });
});

// ============================================
// INIT
// ============================================
loadNewsFromFirebase();