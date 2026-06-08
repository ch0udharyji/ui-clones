document.addEventListener("DOMContentLoaded", () => {
  const goUpBtn = document.getElementById("goUpBtn");

  if (goUpBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        goUpBtn.classList.add("visible");
      } else {
        goUpBtn.classList.remove("visible");
      }
    });

    goUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
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