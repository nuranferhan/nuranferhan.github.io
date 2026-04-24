const form = document.getElementById("registrationForm");
const alertArea = document.getElementById("alertArea");
const resultArea = document.getElementById("resultArea");
const themeBtn = document.getElementById("themeBtn");
const heroDarkBtn = document.getElementById("heroDarkBtn");

// Tema Değiştirme Fonksiyonu
const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    document.getElementById("themeLabel").textContent = next === "dark" ? "Açık Tema" : "Koyu Tema";
    const icon = document.getElementById("themeIcon");
    icon.className = next === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
};

if(themeBtn) themeBtn.addEventListener("click", toggleTheme);
if(heroDarkBtn) heroDarkBtn.addEventListener("click", toggleTheme);

// Form ve Özet Üretme
if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const ad = document.getElementById("firstName").value.trim();
        const soyad = document.getElementById("lastName").value.trim();
        const atolye = document.getElementById("workshop").value;
        const kvkk = document.getElementById("kvkk").checked;

        if (!ad || !soyad || !atolye || !kvkk) {
            alertArea.innerHTML = `<div class="alert alert-danger shadow-sm">Lütfen tüm zorunlu alanları (Ad, Soyad, Atölye ve KVKK) doldurun!</div>`;
            return;
        }

        resultArea.innerHTML = `
            <div class="result-summary-card shadow-sm border-start border-4 border-success">
                <h4 class="mb-3 text-success"><i class="bi bi-check-circle-fill"></i> Başvuru Özeti</h4>
                <p class="mb-1"><strong>Ad Soyad:</strong> ${ad} ${soyad}</p>
                <p class="mb-1"><strong>Seçilen Atölye:</strong> ${atolye}</p>
                <p class="mb-0 text-muted small"><strong>Kayıt Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>
            </div>`;
        
        alertArea.innerHTML = `<div class="alert alert-success shadow-sm">Başvurunuz başarıyla sisteme kaydedildi!</div>`;
        form.reset();
        
        // Özet alanına yumuşak geçiş yap
        resultArea.scrollIntoView({ behavior: 'smooth' });
    });
}
