/* 1. TEMA YÖNETİMİ */
const htmlEl = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const heroDarkBtn = document.getElementById("heroDarkBtn");

function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    
    if (themeIcon) themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    if (themeLabel) themeLabel.textContent = isDark ? "Açık Tema" : "Koyu Tema";
    if (heroDarkBtn) {
        heroDarkBtn.innerHTML = isDark ? '<i class="bi bi-sun me-2"></i>Açık Temaya Geç' : '<i class="bi bi-moon me-2"></i>Koyu Temaya Geç';
    }
    localStorage.setItem("hafta7-theme", theme);
}

function toggleTheme() {
    const newTheme = htmlEl.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(newTheme);
}

themeBtn?.addEventListener("click", toggleTheme);
heroDarkBtn?.addEventListener("click", toggleTheme);

// Sayfa yüklenince temayı hatırla
const savedTheme = localStorage.getItem("hafta7-theme") || "light";
applyTheme(savedTheme);

/* 2. FORM VE SONUÇ YÖNETİMİ */
const registrationForm = document.getElementById("registrationForm");
const resultArea = document.getElementById("resultArea");
const alertArea = document.getElementById("alertArea");

registrationForm?.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Değerleri al
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const workshop = document.getElementById("workshop").value;
    const level = document.querySelector('input[name="level"]:checked')?.value;
    const message = document.getElementById("message").value.trim();
    const kvkk = document.getElementById("kvkk").checked;

    // Basit Doğrulama
    if (!firstName || !lastName || !email || !workshop || !level || !kvkk) {
        alertArea.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i> 
                Lütfen zorunlu alanları doldurun ve KVKK onayını işaretleyin.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`;
        return;
    }

    // Başarı Mesajı
    alertArea.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i> Başvurunuz başarıyla alındı!
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;

    // Sonuç Alanını Güncelle
    resultArea.innerHTML = `
        <div class="result-summary-card">
            <div class="result-title"><i class="bi bi-person-badge"></i> Başvuru Özeti</div>
            <div class="result-field"><span class="field-label">Ad Soyad:</span><span class="field-value">${firstName} ${lastName}</span></div>
            <div class="result-field"><span class="field-label">E-Posta:</span><span class="field-value">${email}</span></div>
            <div class="result-field"><span class="field-label">Seçilen Atölye:</span><span class="field-value">${workshop}</span></div>
            <div class="result-field"><span class="field-label">Deneyim:</span><span class="field-value">${level}</span></div>
            <div class="result-field"><span class="field-label">Beklentiler:</span><span class="field-value">${message || 'Belirtilmedi'}</span></div>
        </div>`;
    
    // Formu temizle ve sonuç alanına kaydır
    registrationForm.reset();
    document.getElementById("result-section").scrollIntoView({ behavior: 'smooth' });
});
