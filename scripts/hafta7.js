/**
 * hafta7.js
 * Web Programlama Dersi — Hafta 7 Laboratuvarı
 *
 * İçerik:
 *  1. Tema değiştirme (Light / Dark)
 *  2. Form doğrulama ve başvuru özeti üretme
 */

/* ══════════════════════════════════════════
   1. TEMA DEĞİŞTİRME
   ══════════════════════════════════════════ */

const htmlEl    = document.documentElement;
const themeBtn  = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const heroDarkBtn = document.getElementById("heroDarkBtn");

/**
 * Mevcut temayı döndürür.
 * @returns {"light"|"dark"}
 */
function getCurrentTheme() {
    return htmlEl.getAttribute("data-theme") || "light";
}

/**
 * Temayı günceller ve buton içeriğini senkronize eder.
 * @param {"light"|"dark"} theme
 */
function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);

    if (theme === "dark") {
        themeIcon.className  = "bi bi-sun-fill";
        themeLabel.textContent = "Açık Tema";
        if (heroDarkBtn) {
            heroDarkBtn.innerHTML = '<i class="bi bi-sun me-2"></i>Açık Temaya Geç';
        }
    } else {
        themeIcon.className  = "bi bi-moon-stars-fill";
        themeLabel.textContent = "Koyu Tema";
        if (heroDarkBtn) {
            heroDarkBtn.innerHTML = '<i class="bi bi-moon me-2"></i>Koyu Temaya Geç';
        }
    }

    // Tercihi localStorage'a kaydet
    try {
        localStorage.setItem("hafta7-theme", theme);
    } catch (_) {}
}

/** Temayı değiştirme (toggle) */
function toggleTheme() {
    const newTheme = getCurrentTheme() === "light" ? "dark" : "light";
    applyTheme(newTheme);
}

// Sayfa yüklenince kaydedilen temayı uygula
(function initTheme() {
    let saved = "light";
    try { saved = localStorage.getItem("hafta7-theme") || "light"; } catch (_) {}
    applyTheme(saved);
})();

// Navbar butonuna tıklama
themeBtn.addEventListener("click", toggleTheme);

// Hero bölümündeki "Koyu Temaya Geç" butonu
if (heroDarkBtn) {
    heroDarkBtn.addEventListener("click", toggleTheme);
}

/* ══════════════════════════════════════════
   2. FORM — DOĞRULAMA ve ÖZET ÜRETME
   ══════════════════════════════════════════ */

const form        = document.getElementById("registrationForm");
const alertArea   = document.getElementById("alertArea");
const resultArea  = document.getElementById("resultArea");

/**
 * Uyarı veya bilgi mesajı gösterir.
 * @param {"danger"|"success"|"warning"} type
 * @param {string} message
 */
function showAlert(type, message) {
    const iconMap = {
        danger:  "bi-exclamation-triangle-fill",
        success: "bi-check-circle-fill",
        warning: "bi-info-circle-fill",
    };

    alertArea.innerHTML = `
        <div class="alert alert-${type} alert-dismissible d-flex align-items-center gap-2" role="alert">
            <i class="bi ${iconMap[type] || "bi-info-circle-fill"}"></i>
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Kapat"></button>
        </div>
    `;

    // Uyarı alanına kaydır
    alertArea.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * Başvuru özetini #resultArea içine yerleştirir.
 * @param {{ad: string, soyad: string, email: string, atolye: string, seviye: string, mesaj: string}} data
 */
function renderSummary(data) {
    const now = new Date().toLocaleString("tr-TR", {
        day: "2-digit", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    const mesajSatiri = data.mesaj
        ? `<div class="result-field">
               <span class="field-label">Beklentiler</span>
               <span class="field-value">${escapeHtml(data.mesaj)}</span>
           </div>`
        : "";

    resultArea.innerHTML = `
        <div class="result-summary-card">
            <div class="result-title">
                <i class="bi bi-patch-check-fill"></i>
                Başvuru Özeti
            </div>

            <div class="result-field">
                <span class="field-label">Ad Soyad</span>
                <span class="field-value">${escapeHtml(data.ad)} ${escapeHtml(data.soyad)}</span>
            </div>
            <div class="result-field">
                <span class="field-label">E-posta</span>
                <span class="field-value">${escapeHtml(data.email)}</span>
            </div>
            <div class="result-field">
                <span class="field-label">Atölye</span>
                <span class="field-value">${escapeHtml(data.atolye)}</span>
            </div>
            <div class="result-field">
                <span class="field-label">Seviye</span>
                <span class="field-value">${escapeHtml(data.seviye)}</span>
            </div>
            ${mesajSatiri}
            <div class="result-field">
                <span class="field-label">Başvuru Tarihi</span>
                <span class="field-value">${now}</span>
            </div>
        </div>
    `;

    resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * XSS koruması için HTML karakterlerini kaçırır.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Form submit olayı
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Sayfa yenilenmesini engelle

    // Alan değerlerini oku
    const ad      = document.getElementById("firstName").value.trim();
    const soyad   = document.getElementById("lastName").value.trim();
    const email   = document.getElementById("email").value.trim();
    const atolye  = document.getElementById("workshop").value;
    const mesaj   = document.getElementById("message").value.trim();
    const kvkk    = document.getElementById("kvkk").checked;

    // Seçili radio butonu
    const seviyeEl = document.querySelector('input[name="level"]:checked');
    const seviye   = seviyeEl ? seviyeEl.value : "";

    /* ─── Doğrulama ─────────────────────── */
    const eksikler = [];

    if (!ad)     eksikler.push("Ad");
    if (!soyad)  eksikler.push("Soyad");
    if (!email)  eksikler.push("E-posta");
    if (!atolye) eksikler.push("Atölye Seçimi");
    if (!seviye) eksikler.push("Deneyim Seviyesi");
    if (!kvkk)   eksikler.push("KVKK Onayı");

    if (eksikler.length > 0) {
        showAlert("danger", `Lütfen şu alanları doldurun: <strong>${eksikler.join(", ")}</strong>`);
        return;
    }

    // Basit e-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert("warning", "Lütfen geçerli bir <strong>e-posta adresi</strong> girin.");
        return;
    }

    /* ─── Başarılı ──────────────────────── */
    showAlert("success", "Başvurunuz başarıyla alındı! Aşağıda başvuru özetinizi görebilirsiniz.");
    renderSummary({ ad, soyad, email, atolye, seviye, mesaj });

    // Formu sıfırla
    form.reset();
});
