// ===== DATA =====
  const donors = [
    {
      name: 'Roktim',
      blood: 'B+',
      phone: '01690150201',
      available: true
    },
    {
      name: 'Roki',
      blood: 'B+',
      phone: '01879063378',
      available: false
    },
    {
      name: 'Arman',
      blood: 'A+',
      phone: '01857786242',
      available: true
    }
  ];

  // ===== RENDER DONORS =====
  const grid = document.getElementById('donorsGrid');
  donors.forEach((d, idx) => {
    const initials = d.name.substring(0, 2).toUpperCase();
    const card = document.createElement('div');
    card.className = 'donor-card' + (d.available ? '' : ' unavailable');
    card.innerHTML = `
      <div class="card-top">
        <div class="blood-group">${d.blood}</div>
        <div class="donor-avatar">${initials}</div>
        <div class="donor-name">${d.name}</div>
        <div class="status-badge ${d.available ? 'status-available' : 'status-unavailable'}">
          <span class="status-dot"></span>
          ${d.available ? 'Available' : 'Unavailable'}
        </div>
      </div>
      <div class="card-body">
        <div class="info-row">
          <div class="info-label"><i class="fas fa-tint"></i> Blood Group</div>
          <div class="info-value">${d.blood}</div>
        </div>
        <div class="info-row">
          <div class="info-label"><i class="fas fa-phone"></i> Phone</div>
          <div class="info-value hidden">Hidden</div>
        </div>
        <div class="info-row">
          <div class="info-label"><i class="fas fa-check-circle"></i> Status</div>
          <div class="info-value" style="color: ${d.available ? 'var(--success)' : 'var(--danger)'}">${d.available ? 'Available' : 'Unavailable'}</div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-info" ${d.available ? '' : 'disabled'} onclick="openModal(${idx})">
          <i class="fas fa-info-circle"></i> ${d.available ? 'View Info' : 'Unavailable'}
        </button>
        <button class="btn btn-whatsapp" onclick="sendWhatsApp(${idx})">
          <i class="fab fa-whatsapp"></i> Message
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // ===== MODAL =====
  function openModal(idx) {
    const d = donors[idx];
    if (!d.available) return;
    document.getElementById('modalAvatar').textContent = d.name.substring(0, 2).toUpperCase();
    document.getElementById('modalName').textContent = d.name;
    document.getElementById('modalBlood').textContent = 'Blood Group: ' + d.blood;
    document.getElementById('modalPhone').textContent = d.phone;
    document.getElementById('modalBlood2').textContent = d.blood;
    document.getElementById('modalStatus').textContent = d.available ? 'Available' : 'Unavailable';
    document.getElementById('modalStatus').style.color = d.available ? 'var(--success)' : 'var(--danger)';
    document.getElementById('modalCallBtn').onclick = () => {
      window.location.href = 'tel:+880' + d.phone.substring(1);
    };
    document.getElementById('modalWaBtn').onclick = () => sendWhatsApp(idx);
    document.getElementById('modalOverlay').classList.add('active');
  }
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
  }
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') closeModal();
  });

  // ===== WHATSAPP =====
  function sendWhatsApp(idx) {
    const d = donors[idx];
    const message = encodeURIComponent('Are You Available for blood donation?');
    const phone = '880' + d.phone.substring(1);
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
    showToast(`Opening WhatsApp chat with ${d.name}...`);
  }

  // ===== TOAST =====
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ===== MOBILE MENU =====
  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
  }

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start);
      }
    }, 16);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(document.getElementById('donorCount'), 3);
        animateCounter(document.getElementById('livesSaved'), 12);
        animateCounter(document.getElementById('bloodUnits'), 25);
        statsObserver.disconnect();
      }
    });
  });
  statsObserver.observe(document.querySelector('.hero-stats'));

  // ===== NAVBAR SCROLL =====
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  // ===== LOGIN GATE =====
  function checkLogin() {
    const id = prompt("Enter ID:");
    const inputPassword = prompt("Enter Password:");
    const password = "123456";
    let yes = false;
    const s = "022251000510";
    for (let i = 1170; i < 1210; i++) {
      if (id === (s + i) && inputPassword === password) {
        yes = true;
        break;
      }
    }
    if (yes) {
      document.body.classList.remove('locked');
      document.getElementById('siteContent').classList.add('revealed');
    } else {
      document.documentElement.innerHTML = '';
      document.write(`
        <div class="denied-screen" style="position:fixed;inset:0;background:radial-gradient(ellipse at 50% 30%,#2a0508 0%,#12020a 60%,#000 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:24px;font-family:sans-serif;">
          <i class="fas fa-ban" style="font-size:4rem;color:#ef4444;margin-bottom:20px;"></i>
          <h1 style="color:white;font-size:2rem;font-weight:800;">Access Denied</h1>
          <p style="color:rgba(255,255,255,0.6);margin-top:10px;">Invalid ID or password. Please contact the club admin for access.</p>
        </div>
      `);
      document.close();
    }
  }

  // ===== INTRO SEQUENCE: drop falls, then trigger login =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      const overlay = document.getElementById('introOverlay');
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.remove();
        checkLogin();
      }, 800);
    }, 2600);
  });