// ============================================
// PRELOADER
// ============================================
function hidePreloader() {
    const pre = document.getElementById('preloader');
    if (pre) {
        pre.classList.add('hide');
        setTimeout(() => pre.style.display = 'none', 700);
    }
}
setTimeout(hidePreloader, 3500);

// ============================================
// THEME
// ============================================
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ============================================
// HEADER SCROLL
// ============================================
const header = document.getElementById('header');
let lastSc = 0;
window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    if (header) {
        if (sc > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        if (sc > lastSc && sc > 250) header.classList.add('hidden');
        else header.classList.remove('hidden');
    }
    lastSc = sc < 0 ? 0 : sc;
}, { passive: true });

// ============================================
// BURGER
// ============================================
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
if (burger && mobileNav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
}

// ============================================
// COUNTERS
// ============================================
const counters = document.querySelectorAll('.hcs-num');
if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = +el.dataset.target;
                let c = 0;
                const step = target / (1500 / 16);
                const t = setInterval(() => {
                    c += step;
                    if (c >= target) {
                        el.textContent = target;
                        clearInterval(t);
                    } else {
                        el.textContent = Math.floor(c);
                    }
                }, 16);
                cObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
}

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    }, { passive: true });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// LANGUAGE SELECTOR
// ============================================
const translations = {
    uz: {
        school_name: "Umumta'lim Maktabi",
        nav_home: "Bosh sahifa",
        nav_director: "Maktab Administratsiyasi",
        nav_parents: "Ota-onalar",
        nav_location: "Joylashuv",
        nav_contact: "Bog'lanish",
        nav_reviews: "Sharhlar",
        nav_admission: "Qabul",
        hero_knowledge: "Bilim va",
        hero_spirituality: "Ma'naviyat",
        hero_center: "Markazi",
        hero_description: "Zamonaviy ta'lim, kuchli jamoa va yorqin kelajak uchun eng yaxshi maktab",
        stats_students: "O'quvchi",
        stats_teachers: "O'qituvchi",
        stats_years: "Yil tajriba",
        dir_name: "Boymurzayev Qahramon Zoyirovich",
        dir_page_title: "Maktab",
        dir_page_title_blue: "Direktori",
        dir_page_desc: "Maktabimiz rahbari haqida to'liq ma'lumot",
        dir_position: "Maktab Direktori",
        dir_edu_level: "Oliy",
        dir_edu_label: "Ma'lumot",
        dir_honor_level: "Faxriy",
        dir_honor_label: "O'qituvchi",
        dir_quote: "Aziz o'quvchilar, ota-onalar va hurmatli mehmonlar! Maktabimiz — bu nafaqat bilim olish maskani, balki kelajak avlodning ma'naviy va intellektual shakllanadigan muqaddas dargohidir. Har bir o'quvchimiz — bizning faxrimiz va kelajagimiz. Biz bilan birgalikda buyuk istiqbollarni yaratamiz!",
        dir_quote_author: "— Boymurzayev Q.Z., Maktab Direktori",
        dir_card1_title: "Ta'lim yo'nalishi",
        dir_card1_desc: "Umumta'lim va chuqurlashtirilgan fanlar bo'yicha kompleks ta'lim berish",
        dir_card2_title: "Hamkorlik",
        dir_card2_desc: "Ota-onalar, o'qituvchilar va o'quvchilar bilan yaqin hamkorlik",
        dir_card3_title: "Maqsad",
        dir_card3_desc: "Har bir o'quvchining iste'dodini ochish va rivojlantirish",
        dir_card4_title: "Yutuqlar",
        dir_card4_desc: "Respublika olimpiadalarida muntazam g'alaba qozonish",
        dir_years_active: "Yil faoliyat",
        dir_olympiad: "Olimpiada",
        parents_page_title: "Hurmatli",
        parents_page_desc: "Siz maktabimizning muhim va ajralmas qismidasiz",
        parents_intro: "Hurmatli ota-onalar! Farzandingizning muvaffaqiyati — bu bizning umumiy maqsadimiz. Maktabimiz siz bilan yaqin hamkorlikda ishlashga doimo tayyor. Quyida huquq va majburiyatlaringiz bilan tanishing.",
        parents_rights_title: "Ota-onalar huquqlari",
        rights_1_title: "Ma'lumot olish huquqi",
        rights_1_desc: "Farzandingiz ta'limi, baholari va maktab faoliyati haqida to'liq ma'lumot olish",
        rights_2_title: "Uchrashish huquqi",
        rights_2_desc: "O'qituvchilar va maktab rahbariyati bilan istalgan vaqtda uchrashish va maslahat olish",
        rights_3_title: "Ishtirok etish huquqi",
        rights_3_desc: "Maktab hayoti, tadbirlari va ota-onalar kengashida faol ishtirok etish",
        rights_4_title: "Taklif kiritish huquqi",
        rights_4_desc: "Ta'lim sifati va maktab faoliyati bo'yicha taklif va mulohazalar bildirish",
        rights_5_title: "Kengashga saylanish",
        rights_5_desc: "Ota-onalar kengashiga saylanish va maktab boshqaruvida qatnashish",
        rights_6_title: "Psixologik yordam",
        rights_6_desc: "Bolaning psixologik holati haqida xabardor bo'lish va yordam so'rash",
        parents_duties_title: "Ota-onalar majburiyatlari",
        duties_1_title: "Muntazam qatnashish",
        duties_1_desc: "Farzandingizning maktabga har kuni o'z vaqtida kelishini ta'minlash",
        duties_2_title: "Uy vazifasi nazorati",
        duties_2_desc: "Dars tayyorlashda yordam berish va nazorat qilish",
        duties_3_title: "Tadbirlarda qatnashish",
        duties_3_desc: "Maktab tadbirlari va ota-onalar yig'ilishlarida faol qatnashish",
        duties_4_title: "Hamkorlik",
        duties_4_desc: "O'qituvchilar va maktab rahbariyati bilan samarali hamkorlikda ishlash",
        duties_5_title: "Sog'liq va gigiyena",
        duties_5_desc: "Farzandingizning sog'lig'i, ozoda kiyinishi va gigiyenasini ta'minlash",
        duties_6_title: "Intizom",
        duties_6_desc: "Maktab qoidalari va tartibiga rioya etishni farzandingizga o'rgatish",
        parents_cta_title: "Savollaringiz bormi?",
        parents_cta_desc: "Biz bilan bog'laning, har qanday savolingizga javob berishga tayyormiz",
        loc_page_title: "Maktab",
        loc_page_title_blue: "Joylashuvi",
        loc_page_desc: "Bizni topish oson — quyida barcha ma'lumotlar",
        loc_address_label: "To'liq manzil",
        loc_address: "Toshkent shahri, Yashnabod tumani, 153-umumta'lim maktabi",
        loc_hours_label: "Ish vaqti",
        loc_hours: "Dushanba – Shanba: 8:00 – 18:00",
        loc_phone_label: "Telefon",
        loc_students_label: "O'quvchilar soni",
        loc_students_count: "1200+ o'quvchi",
        loc_open_maps: "Google Maps'da ochish",
        loc_map_badge: "📍 153-maktab joylashuvi",
        loc_view_map: "Xaritada ko'rish →",
        contact_page_title: "Biz bilan",
        contact_page_title_blue: "Bog'laning",
        contact_page_desc: "Istalgan savolingiz bo'lsa, biz doim aloqadamiz",
        contact_phone_label: "Telefon raqam",
        contact_email_label: "Email manzil",
        contact_address_label: "Manzil",
        contact_address_val: "Toshkent, Yashnabod, 153-maktab",
        contact_hours_label: "Ish vaqti",
        contact_hours_val: "Dush – Shan: 8:00 – 18:00",
        contact_copy_hint: "Bosib nusxa oling",
        contact_map_hint: "Xaritada ochish",
        contact_map_btn: "Xarita",
        contact_call: "Qo'ng'iroq",
        contact_write: "Yozish",
        contact_open_now: "🟢 Hozir ochiq",
        contact_open_status: "Ochiq",
        contact_form_title: "Xabar yuborish",
        contact_form_desc: "Savolingizni yozing, tez orada javob beramiz",
        contact_form_name: "Ismingiz",
        contact_form_name_ph: "Ismingizni kiriting",
        contact_form_phone: "Telefon",
        contact_form_subject: "Mavzu",
        contact_form_subject_ph: "Savol mavzusi",
        contact_form_message: "Xabar",
        contact_form_message_ph: "Savolingizni yozing...",
        contact_form_send: "Yuborish",
        contact_toast: "✅ Nusxa olindi!",
        reviews_page_title: "Ota-onalar",
        reviews_page_title_blue: "Fikri",
        reviews_page_desc: "Bizning maktab haqida ota-onalarning fikrlari",
        reviews_total: "32 ta sharh",
        reviews_list_title: "Barcha sharhlar",
        reviews_form_title: "Sharh qoldiring",
        reviews_form_desc: "Fikringizni bizning bilan bo'lishing",
        reviews_form_name: "Ismingiz",
        reviews_form_name_ph: "To'liq ismingiz",
        reviews_form_class: "Sinf",
        reviews_form_class_ph: "Masalan: 5-A",
        reviews_form_rating: "Baho",
        reviews_form_text: "Sharh",
        reviews_form_text_ph: "Maktab haqida fikringiz...",
        reviews_form_submit: "Yuborish",
        admission_page_title: "Onlayn",
        admission_page_title_blue: "Ro'yxatdan o'tish",
        admission_page_desc: "Maktabga yozilish uchun formani to'ldiring",
        admission_req_title: "Qabul talablari",
        admission_req_1: "Bolaning tug'ilganlik guvohnomasi",
        admission_req_2: "Ota-ona pasporti nusxasi",
        admission_req_3: "3x4 o'lchamda 6 dona fotosurat",
        admission_req_4: "Tibbiy ma'lumotnoma (Form 026/у)",
        admission_req_5: "Profilaktik emlashlar kartasi",
        admission_dates_title: "Qabul muddatlari",
        admission_date_1_title: "1-sinf",
        admission_date_1_text: "1-aprel — 31-avgust",
        admission_date_2_title: "2-11 sinflar",
        admission_date_2_text: "Yil davomida",
        admission_note_title: "Eslatma",
        admission_note_text: "Onlayn ro'yxatdan o'tganingizdan so'ng, biz siz bilan 24 soat ichida bog'lanamiz va keyingi qadamlar haqida ma'lumot beramiz.",
        admission_registered_title: "Ro'yxatdan o'tganlar",
        admission_view_list: "Ro'yxatni ko'rish",
        admission_form_title: "Ro'yxatdan o'tish",
        admission_form_desc: "Quyidagi ma'lumotlarni to'ldiring",
        admission_form_student: "O'quvchi ma'lumotlari",
        admission_form_firstname: "Ism",
        admission_form_firstname_ph: "Ism",
        admission_form_lastname: "Familiya",
        admission_form_lastname_ph: "Familiya",
        admission_form_birthdate: "Tug'ilgan sana",
        admission_form_class: "Sinf",
        admission_form_class_select: "Tanlang",
        admission_form_parent: "Ota-ona ma'lumotlari",
        admission_form_parent_firstname: "Ism",
        admission_form_parent_firstname_ph: "Ota/Ona ismi",
        admission_form_parent_lastname: "Familiya",
        admission_form_parent_lastname_ph: "Ota/Ona familiyasi",
        admission_form_phone: "Telefon",
        admission_form_email: "Email",
        admission_form_email_ph: "example@mail.com",
        admission_form_comment: "Qo'shimcha ma'lumot",
        admission_form_comment_ph: "Qo'shimcha ma'lumot...",
        // Yangiliklar sahifasi
news_page_title: "Yangiliklar va E'lonlar",
news_page_desc: "Maktabimiz hayotidagi eng so'nggi voqealar, muhim e'lonlar va tadbirlar bilan tanishing.",
news_ann_title: "E'lonlar",
news_latest_title: "So'nggi Yangiliklar",
news_loading: "Yangiliklar yuklanmoqda...",
ann_tag_urgent: "Muhim",
ann_tag_meeting: "Majlis",
ann_tag_info: "Ma'lumot",
ann_1_title: "Kuzgi ta'til boshlanishi haqida",
ann_1_desc: "Barcha o'quvchilar va ota-onalar diqqatiga! 4-noyabrdan boshlab barcha sinf o'quvchilari uchun kuzgi ta'til boshlanadi. Darslar 11-noyabrdan davom etadi.",
ann_2_title: "Umummaktab ota-onalar majlisi",
ann_2_desc: "Joriy yilning 25-oktabr kuni soat 14:00 da 1-chorak yakunlariga bag'ishlangan ota-onalar majlisi bo'lib o'tadi.",
ann_3_title: "Olimpiada bosqichi",
ann_3_desc: "Maktab bosqichida o'tkaziladigan fan olimpiadalari 20-oktabr kunidan boshlanadi.",
nav_news: "Yangiliklar",
        admission_form_submit: "Ro'yxatdan o'tish",
        admission_list_title: "Ro'yxatdan o'tganlar ro'yxati",
        footer_rights: "Barcha huquqlar himoyalangan",
        cookie_title: "Cookie fayllaridan foydalanish",
        cookie_desc: "Biz saytdan foydalanishingizni yaxshilash uchun cookie fayllaridan foydalanamiz. Davom etish orqali siz bunga rozilik bildirasiz.",
        cookie_accept: "Qabul qilaman",
        cookie_decline: "Rad etish",
        // ✅ Добавлены новые ключи
        user_reg_title: "Xush kelibsiz!",
        user_reg_subtitle: "Biz siz haqida bilishni xohlaymiz",
        user_reg_firstname: "Ismingiz",
        user_reg_lastname: "Familiyangiz",
        user_reg_birthyear: "Tug'ilgan yili",
        user_reg_select: "Tanlang",
        user_reg_submit: "Davom etish",
        user_reg_note: "Sizning ma'lumotlaringiz faqat siz uchun saqlanadi"
    },

    ru: {
        school_name: "Общеобразовательная школа",
        nav_home: "Главная",
        nav_director: "Администрация школы",
        nav_parents: "Родители",
        nav_location: "Расположение",
        nav_contact: "Контакты",
        nav_reviews: "Отзывы",
        nav_admission: "Прием",
        hero_knowledge: "Центр",
        hero_spirituality: "Знаний и",
        hero_center: "Духовности",
        hero_description: "Лучшая школа для современного образования, сильной команды и светлого будущего",
        stats_students: "Учеников",
        stats_teachers: "Учителей",
        stats_years: "Лет опыта",
        dir_name: "Боймурзаев Кахрамон Зоирович",
        dir_page_title: "Директор",
        dir_page_title_blue: "Школы",
        dir_page_desc: "Полная информация о руководителе нашей школы",
        dir_position: "Директор школы",
        dir_edu_level: "Высшее",
        dir_edu_label: "Образование",
        dir_honor_level: "Почётный",
        dir_honor_label: "Учитель",
        dir_quote: "Дорогие ученики, родители и уважаемые гости! Наша школа — это не просто место получения знаний, но и священный очаг, где формируется духовный и интеллектуальный облик будущего поколения. Каждый наш ученик — наша гордость и наше будущее. Вместе с нами создадим великое будущее!",
        dir_quote_author: "— Боймурзаев К.З., Директор школы",
        dir_card1_title: "Направление обучения",
        dir_card1_desc: "Комплексное обучение по общеобразовательным и углублённым предметам",
        dir_card2_title: "Сотрудничество",
        dir_card2_desc: "Тесное сотрудничество с родителями, учителями и учениками",
        dir_card3_title: "Цель",
        dir_card3_desc: "Раскрытие и развитие таланта каждого ученика",
        dir_card4_title: "Достижения",
        dir_card4_desc: "Регулярные победы на республиканских олимпиадах",
        dir_years_active: "Лет работы",
        dir_olympiad: "Олимпиад",
        parents_page_title: "Уважаемые",
        parents_page_desc: "Вы являетесь важной и неотъемлемой частью нашей школы",
        parents_intro: "Уважаемые родители! Успех вашего ребёнка — это наша общая цель. Наша школа всегда готова работать в тесном сотрудничестве с вами. Ознакомьтесь с вашими правами и обязанностями.",
        parents_rights_title: "Права родителей",
        rights_1_title: "Право на информацию",
        rights_1_desc: "Получение полной информации об обучении, оценках и деятельности школы",
        rights_2_title: "Право на встречу",
        rights_2_desc: "Встреча с учителями и руководством школы в любое время и получение консультации",
        rights_3_title: "Право на участие",
        rights_3_desc: "Активное участие в жизни школы, мероприятиях и родительском совете",
        rights_4_title: "Право на предложения",
        rights_4_desc: "Высказывание предложений и замечаний по качеству образования и деятельности школы",
        rights_5_title: "Избрание в совет",
        rights_5_desc: "Избрание в родительский совет и участие в управлении школой",
        rights_6_title: "Психологическая помощь",
        rights_6_desc: "Информирование о психологическом состоянии ребёнка и запрос помощи",
        parents_duties_title: "Обязанности родителей",
        duties_1_title: "Регулярное посещение",
        duties_1_desc: "Обеспечение ежедневного своевременного посещения школы вашим ребёнком",
        duties_2_title: "Контроль домашних заданий",
        duties_2_desc: "Помощь в подготовке уроков и контроль их выполнения",
        duties_3_title: "Участие в мероприятиях",
        duties_3_desc: "Активное участие в школьных мероприятиях и родительских собраниях",
        duties_4_title: "Сотрудничество",
        duties_4_desc: "Эффективное сотрудничество с учителями и руководством школы",
        duties_5_title: "Здоровье и гигиена",
        duties_5_desc: "Обеспечение здоровья, опрятного внешнего вида и гигиены вашего ребёнка",
        duties_6_title: "Дисциплина",
        duties_6_desc: "Обучение вашего ребёнка соблюдению школьных правил и порядка",
        parents_cta_title: "Есть вопросы?",
        parents_cta_desc: "Свяжитесь с нами, мы готовы ответить на любой ваш вопрос",
        loc_page_title: "Расположение",
        loc_page_title_blue: "Школы",
        loc_page_desc: "Нас легко найти — вся информация ниже",
        loc_address_label: "Полный адрес",
        loc_address: "г. Ташкент, Яшнабадский район, 153-я общеобразовательная школа",
        loc_hours_label: "Рабочее время",
        loc_hours: "Понедельник – Суббота: 8:00 – 18:00",
        loc_phone_label: "Телефон",
        loc_students_label: "Количество учеников",
        loc_students_count: "1200+ учеников",
        loc_open_maps: "Открыть в Google Maps",
        loc_map_badge: "📍 Расположение 153-школы",
        loc_view_map: "Смотреть на карте →",
        contact_page_title: "Свяжитесь",
        contact_page_title_blue: "с нами",
        contact_page_desc: "Если у вас есть вопросы, мы всегда на связи",
        contact_phone_label: "Номер телефона",
        contact_email_label: "Email адрес",
        contact_address_label: "Адрес",
        contact_address_val: "Ташкент, Яшнабадский район, школа №153",
        contact_hours_label: "Рабочее время",
        contact_hours_val: "Пн – Сб: 8:00 – 18:00",
        contact_copy_hint: "Нажмите чтобы скопировать",
        contact_map_hint: "Открыть на карте",
        contact_map_btn: "Карта",
        contact_call: "Позвонить",
        contact_write: "Написать",
        contact_open_now: "🟢 Сейчас открыто",
        contact_open_status: "Открыто",
        contact_form_title: "Отправить сообщение",
        contact_form_desc: "Напишите ваш вопрос, мы ответим в ближайшее время",
        contact_form_name: "Ваше имя",
        contact_form_name_ph: "Введите ваше имя",
        contact_form_phone: "Телефон",
        contact_form_subject: "Тема",
        contact_form_subject_ph: "Тема вопроса",
        contact_form_message: "Сообщение",
        contact_form_message_ph: "Напишите ваш вопрос...",
        contact_form_send: "Отправить",
        contact_toast: "✅ Скопировано!",
        reviews_page_title: "Отзывы",
        reviews_page_title_blue: "Родителей",
        reviews_page_desc: "Мнения родителей о нашей школе",
        reviews_total: "32 отзыва",
        reviews_list_title: "Все отзывы",
        reviews_form_title: "Оставить отзыв",
        reviews_form_desc: "Поделитесь своим мнением с нами",
        reviews_form_name: "Ваше имя",
        reviews_form_name_ph: "Полное имя",
        reviews_form_class: "Класс",
        reviews_form_class_ph: "Например: 5-А",
        reviews_form_rating: "Оценка",
        reviews_form_text: "Отзыв",
        reviews_form_text_ph: "Ваше мнение о школе...",
        reviews_form_submit: "Отправить",
        admission_page_title: "Онлайн",
        admission_page_title_blue: "Регистрация",
        admission_page_desc: "Заполните форму для записи в школу",
        admission_req_title: "Требования для приема",
        admission_req_1: "Свидетельство о рождении ребенка",
        admission_req_2: "Копия паспорта родителя",
        admission_req_3: "6 фотографий размером 3x4",
        admission_req_4: "Медицинская справка (Форма 026/у)",
        admission_req_5: "Карта профилактических прививок",
        admission_dates_title: "Сроки приема",
        admission_date_1_title: "1 класс",
        admission_date_1_text: "1 апреля — 31 августа",
        admission_date_2_title: "2-11 классы",
        admission_date_2_text: "В течение года",
        admission_note_title: "Примечание",
        admission_note_text: "После онлайн-регистрации мы свяжемся с вами в течение 24 часов и сообщим о следующих шагах.",
        admission_registered_title: "Зарегистрировавшиеся",
        admission_view_list: "Посмотреть список",
        admission_form_title: "Регистрация",
        admission_form_desc: "Заполните следующую информацию",
        admission_form_student: "Данные ученика",
        admission_form_firstname: "Имя",
        admission_form_firstname_ph: "Имя",
        admission_form_lastname: "Фамилия",
        admission_form_lastname_ph: "Фамилия",
        admission_form_birthdate: "Дата рождения",
        admission_form_class: "Класс",
        admission_form_class_select: "Выберите",
        admission_form_parent: "Данные родителя",
        admission_form_parent_firstname: "Имя",
        admission_form_parent_firstname_ph: "Имя родителя",
        admission_form_parent_lastname: "Фамилия",
        admission_form_parent_lastname_ph: "Фамилия родителя",
        admission_form_phone: "Телефон",
        admission_form_email: "Email",
        admission_form_email_ph: "example@mail.com",
        admission_form_comment: "Дополнительная информация",
        admission_form_comment_ph: "Дополнительная информация...",
        admission_form_submit: "Зарегистрироваться",
        admission_list_title: "Список зарегистрировавшихся",
        footer_rights: "Все права защищены",
        cookie_title: "Использование файлов Cookie",
        cookie_desc: "Мы используем файлы cookie для улучшения вашего опыта. Продолжая, вы соглашаетесь с этим.",
        cookie_accept: "Принять",
        cookie_decline: "Отклонить",
        news_page_title: "Новости и Объявления",
news_page_desc: "Ознакомьтесь с последними событиями, важными объявлениями и мероприятиями нашей школы.",
news_ann_title: "Объявления",
news_latest_title: "Последние Новости",
news_loading: "Загрузка новостей...",
ann_tag_urgent: "Важно",
ann_tag_meeting: "Собрание",
ann_tag_info: "Информация",
ann_1_title: "Начало осенних каникул",
ann_1_desc: "Уважаемые ученики и родители! С 4 ноября начинаются осенние каникулы. Занятия возобновятся с 11 ноября.",
ann_2_title: "Общешкольное родительское собрание",
ann_2_desc: "25 октября в 14:00 состоится родительское собрание по итогам 1-й четверти.",
ann_3_title: "Этап олимпиады",
ann_3_desc: "Школьный этап предметных олимпиад начинается с 20 октября.",
nav_news: "Новости",
        // ✅ Добавлены новые ключи
        user_reg_title: "Добро пожаловать!",
        user_reg_subtitle: "Мы хотим о вас узнать",
        user_reg_firstname: "Ваше имя",
        user_reg_lastname: "Ваша фамилия",
        user_reg_birthyear: "Год рождения",
        user_reg_select: "Выберите",
        user_reg_submit: "Продолжить",
        user_reg_note: "Ваши данные сохраняются только для вас"
    },

    en: {
        school_name: "General Education School",
        nav_home: "Home",
        news_page_title: "News and Announcements",
news_page_desc: "Get acquainted with the latest events, important announcements and events of our school.",
news_ann_title: "Announcements",
news_latest_title: "Latest News",
news_loading: "Loading news...",
ann_tag_urgent: "Important",
ann_tag_meeting: "Meeting",
ann_tag_info: "Information",
ann_1_title: "Start of Autumn Holidays",
ann_1_desc: "Attention all students and parents! Autumn holidays begin from November 4th. Classes will resume from November 11th.",
ann_2_title: "All-School Parent Meeting",
ann_2_desc: "On October 25 at 14:00, a parent meeting dedicated to the results of the 1st quarter will be held.",
ann_3_title: "Olympiad Stage",
ann_3_desc: "The school stage of subject olympiads begins from October 20th.",
nav_news: "News",
        nav_director: "School Administration",
        nav_parents: "Parents",
        nav_location: "Location",
        nav_contact: "Contact",
        nav_reviews: "Reviews",
        nav_admission: "Admission",
        hero_knowledge: "Center of",
        hero_spirituality: "Knowledge and",
        hero_center: "Spirituality",
        hero_description: "The best school for modern education, strong team and bright future",
        stats_students: "Students",
        stats_teachers: "Teachers",
        stats_years: "Years of Experience",
        dir_name: "Boymurzayev Qahramon Zoyirovich",
        dir_page_title: "School",
        dir_page_title_blue: "Director",
        dir_page_desc: "Full information about our school principal",
        dir_position: "School Director",
        dir_edu_level: "Higher",
        dir_edu_label: "Education",
        dir_honor_level: "Honorary",
        dir_honor_label: "Teacher",
        dir_quote: "Dear students, parents and respected guests! Our school is not just a place of learning, but a sacred place where the spiritual and intellectual character of the next generation is formed. Every student is our pride and our future. Together we will create a great future!",
        dir_quote_author: "— Boymurzayev Q.Z., School Director",
        dir_card1_title: "Education Direction",
        dir_card1_desc: "Comprehensive education in general and advanced subjects",
        dir_card2_title: "Cooperation",
        dir_card2_desc: "Close cooperation with parents, teachers and students",
        dir_card3_title: "Goal",
        dir_card3_desc: "Discovering and developing the talent of each student",
        dir_card4_title: "Achievements",
        dir_card4_desc: "Regular victories at republican olympiads",
        dir_years_active: "Years of Work",
        dir_olympiad: "Olympiads",
        parents_page_title: "Dear",
        parents_page_desc: "You are an important and integral part of our school",
        parents_intro: "Dear parents! Your child's success is our common goal. Our school is always ready to work in close cooperation with you. Please familiarize yourself with your rights and responsibilities.",
        parents_rights_title: "Parents Rights",
        rights_1_title: "Right to Information",
        rights_1_desc: "Receiving full information about your child's education, grades and school activities",
        rights_2_title: "Right to Meet",
        rights_2_desc: "Meeting with teachers and school administration at any time and receiving consultation",
        rights_3_title: "Right to Participate",
        rights_3_desc: "Active participation in school life, events and parent council",
        rights_4_title: "Right to Suggest",
        rights_4_desc: "Expressing suggestions and comments on the quality of education and school activities",
        rights_5_title: "Election to Council",
        rights_5_desc: "Being elected to the parent council and participating in school management",
        rights_6_title: "Psychological Support",
        rights_6_desc: "Being informed about the child's psychological state and requesting help",
        parents_duties_title: "Parents Responsibilities",
        duties_1_title: "Regular Attendance",
        duties_1_desc: "Ensuring your child attends school on time every day",
        duties_2_title: "Homework Supervision",
        duties_2_desc: "Helping with lesson preparation and supervising homework",
        duties_3_title: "Participation in Events",
        duties_3_desc: "Active participation in school events and parent meetings",
        duties_4_title: "Cooperation",
        duties_4_desc: "Effective cooperation with teachers and school administration",
        duties_5_title: "Health and Hygiene",
        duties_5_desc: "Ensuring your child's health, neat appearance and hygiene",
        duties_6_title: "Discipline",
        duties_6_desc: "Teaching your child to follow school rules and regulations",
        parents_cta_title: "Have Questions?",
        parents_cta_desc: "Contact us, we are ready to answer any of your questions",
        loc_page_title: "School",
        loc_page_title_blue: "Location",
        loc_page_desc: "Easy to find us — all information below",
        loc_address_label: "Full Address",
        loc_address: "Tashkent city, Yashnabad district, School No. 153",
        loc_hours_label: "Working Hours",
        loc_hours: "Monday – Saturday: 8:00 – 18:00",
        loc_phone_label: "Phone",
        loc_students_label: "Number of Students",
        loc_students_count: "1200+ students",
        loc_open_maps: "Open in Google Maps",
        loc_map_badge: "📍 School 153 Location",
        loc_view_map: "View on Map →",
        contact_page_title: "Contact",
        contact_page_title_blue: "Us",
        contact_page_desc: "If you have any questions, we are always in touch",
        contact_phone_label: "Phone Number",
        contact_email_label: "Email Address",
        contact_address_label: "Address",
        contact_address_val: "Tashkent, Yashnabad district, School No.153",
        contact_hours_label: "Working Hours",
        contact_hours_val: "Mon – Sat: 8:00 – 18:00",
        contact_copy_hint: "Click to copy",
        contact_map_hint: "Open on map",
        contact_map_btn: "Map",
        contact_call: "Call",
        contact_write: "Write",
        contact_open_now: "🟢 Open now",
        contact_open_status: "Open",
        contact_form_title: "Send Message",
        contact_form_desc: "Write your question, we will reply soon",
        contact_form_name: "Your Name",
        contact_form_name_ph: "Enter your name",
        contact_form_phone: "Phone",
        contact_form_subject: "Subject",
        contact_form_subject_ph: "Question subject",
        contact_form_message: "Message",
        contact_form_message_ph: "Write your question...",
        contact_form_send: "Send",
        contact_toast: "✅ Copied!",
        reviews_page_title: "Parents",
        reviews_page_title_blue: "Reviews",
        reviews_page_desc: "What parents say about our school",
        reviews_total: "32 reviews",
        reviews_list_title: "All reviews",
        reviews_form_title: "Leave a review",
        reviews_form_desc: "Share your opinion with us",
        reviews_form_name: "Your name",
        reviews_form_name_ph: "Full name",
        reviews_form_class: "Class",
        reviews_form_class_ph: "Example: 5-A",
        reviews_form_rating: "Rating",
        reviews_form_text: "Review",
        reviews_form_text_ph: "Your opinion about the school...",
        reviews_form_submit: "Submit",
        admission_page_title: "Online",
        admission_page_title_blue: "Registration",
        admission_page_desc: "Fill out the form to enroll in school",
        admission_req_title: "Admission Requirements",
        admission_req_1: "Child's birth certificate",
        admission_req_2: "Copy of parent's passport",
        admission_req_3: "6 photos 3x4 size",
        admission_req_4: "Medical certificate (Form 026/у)",
        admission_req_5: "Vaccination card",
        admission_dates_title: "Admission Dates",
        admission_date_1_title: "1st Grade",
        admission_date_1_text: "April 1 — August 31",
        admission_date_2_title: "Grades 2-11",
        admission_date_2_text: "Throughout the year",
        admission_note_title: "Note",
        admission_note_text: "After online registration, we will contact you within 24 hours and inform you about the next steps.",
        admission_registered_title: "Registered",
        admission_view_list: "View list",
        admission_form_title: "Registration",
        admission_form_desc: "Fill in the following information",
        admission_form_student: "Student Information",
        admission_form_firstname: "First Name",
        admission_form_firstname_ph: "First Name",
        admission_form_lastname: "Last Name",
        admission_form_lastname_ph: "Last Name",
        admission_form_birthdate: "Date of Birth",
        admission_form_class: "Grade",
        admission_form_class_select: "Select",
        admission_form_parent: "Parent Information",
        admission_form_parent_firstname: "First Name",
        admission_form_parent_firstname_ph: "Parent's first name",
        admission_form_parent_lastname: "Last Name",
        admission_form_parent_lastname_ph: "Parent's last name",
        admission_form_phone: "Phone",
        admission_form_email: "Email",
        admission_form_email_ph: "example@mail.com",
        admission_form_comment: "Additional Information",
        admission_form_comment_ph: "Additional information...",
        admission_form_submit: "Register",
        admission_list_title: "List of Registered",
        footer_rights: "All rights reserved",
        cookie_title: "Cookie Usage",
        cookie_desc: "We use cookies to improve your experience. By continuing, you agree to this.",
        cookie_accept: "Accept",
        cookie_decline: "Decline",
        // ✅ Добавлены новые ключи
        user_reg_title: "Welcome!",
        user_reg_subtitle: "We'd like to know you",
        user_reg_firstname: "Your Name",
        user_reg_lastname: "Your Last Name",
        user_reg_birthyear: "Year of Birth",
        user_reg_select: "Select",
        user_reg_submit: "Continue",
        user_reg_note: "Your information is stored only for you"
    }
// ✅ Убрана лишняя точка с запятой — объект закрывается правильно
};

// ============================================
// LANG SELECTOR LOGIC
// ============================================
const langBtn = document.getElementById('langBtn');
const langSelector = document.getElementById('langSelector');
const currentLangSpan = document.getElementById('currentLang');

let currentLang = localStorage.getItem('language') || 'uz';

if (currentLangSpan) {
    currentLangSpan.textContent = currentLang.toUpperCase();
}

if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        langSelector.classList.remove('open');
    });

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            currentLang = lang;
            currentLangSpan.textContent = lang.toUpperCase();
            localStorage.setItem('language', lang);
            applyTranslations(lang);
            langSelector.classList.remove('open');
        });
    });
}

function applyTranslations(lang) {
    const trans = translations[lang];
    if (!trans) return;

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (trans[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = trans[key];
            } else {
                el.textContent = trans[key];
            }
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.dataset.translatePlaceholder;
        if (trans[key]) {
            el.placeholder = trans[key];
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
});

// ============================================
// COOKIE CONSENT
// ============================================
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookie = document.getElementById('acceptCookie');
const declineCookie = document.getElementById('declineCookie');
const cookieAccepted = localStorage.getItem('cookieConsent');

if (!cookieAccepted && cookieConsent) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
        document.body.classList.add('cookie-visible');
    }, 1500);
}

if (acceptCookie) {
    acceptCookie.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        document.body.classList.remove('cookie-visible');
    });
}

if (declineCookie) {
    declineCookie.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        document.body.classList.remove('cookie-visible');
    });
}

// ============================================
// HERO PARALLAX
// ============================================
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg) {
        heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.2}px)`;
    }
}, { passive: true });

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ============================================
// CONTACT PAGE - COPY TEXT
// ============================================
function copyText(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        if (toast) {
            const trans = translations[currentLang];
            toast.textContent = trans.contact_toast || '✅ Nusxa olindi!';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
        if (element) {
            element.classList.add('copied');
            setTimeout(() => element.classList.remove('copied'), 300);
        }
    });
}

// ============================================
// CONTACT PAGE - FORM SUBMIT
// ============================================
function submitForm(e) {
    e.preventDefault();
    alert('Xabaringiz yuborildi! Tez orada javob beramiz.');
    e.target.reset();
}