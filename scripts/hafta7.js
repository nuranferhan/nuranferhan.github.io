'use strict';

const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const heroThemeBtn= document.getElementById('heroThemeBtn');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');

function syncThemeUI() {
  const dark = html.getAttribute('data-theme') === 'dark';

  // Navbar butonu
  if (themeIcon)  themeIcon.className  = dark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  if (themeLabel) themeLabel.textContent = dark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç';

  // Hero butonu
  if (heroThemeBtn) {
    heroThemeBtn.innerHTML = dark
      ? '<i class="bi bi-sun me-2"></i>Açık Temaya Geç'
      : '<i class="bi bi-palette me-2"></i>Koyu Temaya Geç';
  }
}

function toggleTheme() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('wplab-theme', isDark ? 'light' : 'dark');
  syncThemeUI();
}

// Kayıtlı temayı uygula
(function initTheme() {
  const saved = localStorage.getItem('wplab-theme');
  // Varsayılan her zaman açık tema; yalnızca kullanıcı koyu seçtiyse uygula
  html.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
  syncThemeUI();
})();

if (themeToggle)  themeToggle.addEventListener('click', toggleTheme);
if (heroThemeBtn) heroThemeBtn.addEventListener('click', toggleTheme);

const form       = document.getElementById('applicationForm');
const resultArea = document.getElementById('resultArea');
const resetBtn   = document.getElementById('resetBtn');

/** Eski uyarı varsa kaldırır. */
function clearAlert() {
  const old = form.querySelector('.alert-validation');
  if (old) old.remove();
}

/** Uyarı mesajı gösterir. */
function showAlert(msg) {
  clearAlert();
  const div = document.createElement('div');
  div.className = 'alert alert-warning alert-validation d-flex align-items-center gap-2 mt-4';
  div.innerHTML = `<i class="bi bi-exclamation-triangle-fill flex-shrink-0"></i><span>${msg}</span>`;
  form.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/** Başarı özetini DOM'a yazar. */
function renderSummary(data) {
  const rows = [
    { key: 'Ad Soyad',           val: data.fullName },
    { key: 'E-posta',            val: data.email },
    { key: 'Bölüm',              val: data.department },
    { key: 'Sınıf',              val: data.classYear },
    { key: 'Oturum',             val: data.session },
    { key: 'Katılım Türü',       val: data.attendanceType },
    { key: 'Mesaj',              val: data.message || '—' },
  ];

  const rowsHTML = rows.map(r => `
    <div class="result-row">
      <span class="result-key">${r.key}</span>
      <span class="result-val">${escapeHtml(r.val)}</span>
    </div>`).join('');

  resultArea.className = 'result-success';
  resultArea.innerHTML = `
    <div class="d-flex align-items-center gap-2 mb-3">
      <i class="bi bi-check-circle-fill text-success fs-5"></i>
      <span class="result-success-title">Başvuru Özeti</span>
    </div>
    ${rowsHTML}
    <p class="mt-3 mb-0 text-muted" style="font-size:.8rem;">
      <i class="bi bi-clock me-1"></i>Oluşturulma: ${new Date().toLocaleString('tr-TR')}
    </p>`;

  resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearAlert();

  const fullName       = document.getElementById('fullName').value.trim();
  const email          = document.getElementById('email').value.trim();
  const department     = document.getElementById('department').value.trim();
  const classYear      = document.getElementById('classYear').value;
  const session        = document.getElementById('session').value;
  const attendanceType = document.getElementById('attendanceType').value;
  const message        = document.getElementById('message').value.trim();
  const consent        = document.getElementById('consent').checked;

  if (!fullName) {
    showAlert('Lütfen <strong>Ad Soyad</strong> alanını doldurun.');
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert('Lütfen geçerli bir <strong>e-posta adresi</strong> girin.');
    return;
  }
  if (!department) {
    showAlert('Lütfen <strong>Bölüm</strong> alanını doldurun.');
    return;
  }
  if (!classYear) {
    showAlert('Lütfen <strong>Sınıf</strong> seçin.');
    return;
  }
  if (!session) {
    showAlert('Lütfen katılmak istediğiniz <strong>oturumu</strong> seçin.');
    return;
  }
  if (!attendanceType) {
    showAlert('Lütfen <strong>katılım türünü</strong> seçin.');
    return;
  }
  if (!consent) {
    showAlert('Devam etmek için <strong>onay kutusunu</strong> işaretleyin.');
    return;
  }

  renderSummary({ fullName, email, department, classYear, session, attendanceType, message });
});

resetBtn.addEventListener('click', function () {
  form.reset();
  clearAlert();

  resultArea.className = 'result-placeholder rounded-4 p-4 text-center';
  resultArea.innerHTML = `
    <i class="bi bi-hourglass-split result-icon"></i>
    <p class="mb-0">Henüz başvuru özeti oluşturulmadı. Formu doldurun, sonuç burada görünecek.</p>`;
});
