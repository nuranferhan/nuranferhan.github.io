document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const htmlTag = document.documentElement;
    const regForm = document.getElementById('registrationForm');
    const alertBox = document.getElementById('alertBox');
    const resultArea = document.getElementById('resultArea');
    const summaryContent = document.getElementById('summaryContent');

    // 1. TEMA DEĞİŞTİRME FONKSİYONU
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlTag.setAttribute('data-theme', newTheme);
        
        // Bootstrap 5.3+ uyumluluğu için
        htmlTag.setAttribute('data-bs-theme', newTheme);

        if (newTheme === 'dark') {
            themeText.innerText = "Aydınlık Tema";
            themeToggle.innerHTML = `<i class="bi bi-sun-fill"></i> <span id="themeText">Aydınlık Tema</span>`;
        } else {
            themeText.innerText = "Koyu Tema";
            themeToggle.innerHTML = `<i class="bi bi-moon-stars-fill"></i> <span id="themeText">Koyu Tema</span>`;
        }
    });

    // 2. FORM VERİLERİNDEN ÖZET ÜRETME
    regForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Sayfa yenilenmesini engelle

        // Form Değerlerini Al
        const ad = document.getElementById("firstName").value.trim();
        const soyad = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const atolye = document.getElementById("workshop").value;
        const kvkk = document.getElementById("kvkk").checked;
        const seviyeEl = document.querySelector('input[name="level"]:checked');
        const seviye = seviyeEl ? seviyeEl.value : "";

        // Doğrulama
        let eksikler = [];
        if (!ad) eksikler.push("Ad");
        if (!soyad) eksikler.push("Soyad");
        if (!email) eksikler.push("E-posta");
        if (!atolye) eksikler.push("Atölye Seçimi");
        if (!seviye) eksikler.push("Deneyim Seviyesi");
        if (!kvkk) eksikler.push("KVKK Onayı");

        if (eksikler.length > 0) {
            alertBox.className = "alert alert-danger d-block";
            alertBox.innerHTML = `Lütfen şu alanları doldurun: <strong>${eksikler.join(", ")}</strong>`;
            resultArea.classList.add("d-none");
            return;
        }

        // Başarılı Durum
        alertBox.className = "alert alert-success d-block";
        alertBox.innerHTML = "Başvurunuz başarıyla alındı!";
        
        // Özet Oluştur
        summaryContent.innerHTML = `
            <p class="mb-1"><strong>Katılımcı:</strong> ${ad} ${soyad}</p>
            <p class="mb-1"><strong>E-posta:</strong> ${email}</p>
            <p class="mb-1"><strong>Atölye:</strong> ${atolye}</p>
            <p class="mb-0"><strong>Seviye:</strong> ${seviye}</p>
        `;
        
        resultArea.classList.remove("d-none");
        
        // Formu sıfırla (isteğe bağlı)
        // regForm.reset();
    });
});
