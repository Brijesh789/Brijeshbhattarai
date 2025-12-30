// Smooth scrolling (optional enhancement)
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Modal logic
document.querySelectorAll('.modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.modal).style.display = 'flex';
  });
});

document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

window.onclick = function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
};
