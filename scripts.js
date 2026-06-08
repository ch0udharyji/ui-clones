document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    if (themeIcon) {
      if (themeName === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
  }

  const heading = document.querySelector(".heading-txt h1");
  const originalText = "UI Clones";
  
  if (heading && document.body.classList.contains("site-loading")) {
    heading.textContent = "";
    
    let i = 0;
    const typeInterval = setInterval(() => {
      heading.textContent += originalText.charAt(i);
      i++;
      if (i >= originalText.length) {
        clearInterval(typeInterval);
        
        setTimeout(() => {
          heading.style.borderRight = "none";
          document.body.classList.remove("site-loading");
        }, 400);
      }
    }, 150);
  }

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