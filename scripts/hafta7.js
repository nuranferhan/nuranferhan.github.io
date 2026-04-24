const form = document.getElementById("registrationForm");
const alertArea = document.getElementById("alertArea");
const resultArea = document.getElementById("resultArea");

// Tema Değiştirme [cite: 151, 158]
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
});

// Form Gönderme ve Özet [cite: 175, 180]
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ad = document.getElementById("firstName").value;
    const soyad = document.getElementById("lastName").value;
    const atolye = document.getElementById("workshop").value;
    const kvkk = document.getElementById("kvkk").checked;

    if (!ad || !soyad || !atolye || !kvkk) {
        alertArea.innerHTML = `<div class="alert alert-danger">Lütfen tüm zorunlu alanları doldurun!</div>`; [cite: 177]
        return;
    }

    resultArea.innerHTML = `
        <div class="result-summary-card p-4 border border-primary rounded shadow">
            <h4>Başvuru Özeti [cite: 168]</h4>
            <p><strong>Ad Soyad:</strong> ${ad} ${soyad}</p>
            <p><strong>Atölye:</strong> ${atolye}</p>
            <p><strong>Tarih:</strong> ${new Date().toLocaleString()}</p>
        </div>`; [cite: 171]
    
    alertArea.innerHTML = `<div class="alert alert-success">Başvurunuz başarıyla alındı!</div>`; [cite: 179]
    form.reset();
});
