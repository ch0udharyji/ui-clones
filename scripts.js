document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const slider = document.getElementById("slider");

  if (toggleBtn && slider) {
    toggleBtn.addEventListener("click", () => {
      slider.classList.toggle("show");
      
      if (slider.classList.contains("show")) {
        toggleBtn.textContent = "Hide Clones";
      } else {
        toggleBtn.textContent = "View Clones";
      }
    });
  }

  const cloneLinks = document.querySelectorAll('.x-go-btn, .instagram-go-btn');
  const loadingOverlay = document.getElementById('loading-overlay');

  if (cloneLinks.length > 0 && loadingOverlay) {
    cloneLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        
        loadingOverlay.classList.add('active');
        
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 2000);
      });
    });
  }
});