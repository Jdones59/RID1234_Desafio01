// script.js — carrossel da HERO + envio de formulário + mobile menu
document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Carrossel da HERO (fade) ---------------- */
  const slides = document.querySelectorAll('.hero-slide');
  let slideIndex = 0;
  let slideInterval = null;
  const SLIDE_INTERVAL_MS = 3800;

  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  if (slides.length > 0) {
    showSlide(slideIndex);
    slideInterval = setInterval(nextSlide, SLIDE_INTERVAL_MS);

    slides.forEach(s => {
      s.addEventListener('mouseenter', () => {
        if (slideInterval) clearInterval(slideInterval);
      });
      s.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL_MS);
      });
    });
  }

  /* ---------------- Envio do formulário da página (não modal) ---------------- */
  const form = document.getElementById('formContato');
  const status = document.getElementById('status');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      status.style.color = '#333';
      status.textContent = 'Enviando...';

      const action = form.action;
      const data = new FormData(form);

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          mode: 'cors'
        });

        if (res.ok) {
          status.style.color = 'green';
          status.textContent = 'Enviado com sucesso! Obrigado.';
          form.reset();
        } else {
          status.style.color = '#b34747';
          status.textContent = 'Falha ao enviar. Verifique a URL do SheetMonkey.';
        }
      } catch (err) {
        status.style.color = '#b34747';
        status.textContent = 'Erro de rede. Tente novamente.';
      }
    });
  }

  /* ---------------- Mobile menu ---------------- */
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      if (getComputedStyle(nav).display === 'none' || nav.style.display === 'none' || nav.classList.contains('open')) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '64px';
        nav.style.right = '20px';
        nav.style.background = '#fff';
        nav.style.padding = '10px';
        nav.style.boxShadow = '0 6px 18px rgba(16,16,16,0.08)';
        nav.classList.add('open');
      } else {
        nav.style.display = '';
        nav.classList.remove('open');
      }
    });
  }

});

/* ======== MODAL LEADS ======== */

const modal = document.getElementById('leadModal');
const closeModal = document.getElementById('closeModal');
const formLead = document.getElementById('formLead');
const statusLead = document.getElementById('statusLead');

// Botões que abrem o modal
const btnHero = document.querySelector('.hero .btn');
const btnContato = document.querySelector('#contato .btn');

// Abrir modal
function abrirModal() {
  modal.style.display = 'flex';
}

// Fechar modal
function fecharModal() {
  modal.style.display = 'none';
}

// Clique nos botões
btnHero.addEventListener('click', (e) => {
  e.preventDefault();
  abrirModal();
});

btnContato.addEventListener('click', (e) => {
  e.preventDefault();
  abrirModal();
});

// Botão X
closeModal.addEventListener('click', fecharModal);

// Fechar clicando fora
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

/* --- Envio do formulário do modal + redirecionamento WhatsApp --- */

formLead.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusLead.style.color = "#333";
  statusLead.textContent = "Enviando...";

  const data = new FormData(formLead);

  try {
    const res = await fetch(formLead.action, {
      method: "POST",
      body: data,
      mode: "cors"
    });

    if (res.ok) {
      statusLead.style.color = "green";
      statusLead.textContent = "Enviado com sucesso! Redirecionando...";

      formLead.reset();

      // REDIRECIONAMENTO PARA WHATSAPP APÓS 1.5s
      setTimeout(() => {
        window.location.href =
          "https://wa.me/5511999999999?text=Olá%2C+acabei+de+enviar+meus+dados.";
      }, 1500);

    } else {
      statusLead.style.color = "red";
      statusLead.textContent = "Erro ao enviar. Verifique o link.";
    }
  } catch (err) {
    statusLead.style.color = "red";
    statusLead.textContent = "Erro de rede.";
  }
});
