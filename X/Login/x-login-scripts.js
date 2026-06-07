document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const closeBtn = document.getElementById("closeBtn");

  const identifierInput = document.getElementById("identifier");
  const nextBtn = document.getElementById("nextBtn");

  const displayIdentifier = document.getElementById("displayIdentifier");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const togglePassword = document.getElementById("togglePassword");

  nextBtn.disabled = true;
  loginBtn.disabled = true;

  identifierInput.addEventListener("input", () => {
    nextBtn.disabled = identifierInput.value.trim() === "";
  });

  passwordInput.addEventListener("input", () => {
    loginBtn.disabled = passwordInput.value.trim() === "";
  });

  nextBtn.addEventListener("click", () => {
    if (identifierInput.value.trim() !== "") {
      displayIdentifier.value = identifierInput.value;

      step1.style.display = "none";
      step2.style.display = "flex";
      closeBtn.style.visibility = "visible";

      setTimeout(() => {
        passwordInput.focus();
      }, 100);
    }
  });

  loginBtn.addEventListener("click", () => {
    if (passwordInput.value.trim() !== "") {
      const originalText = loginBtn.textContent;
      loginBtn.textContent = "Logging in...";
      loginBtn.disabled = true;

      setTimeout(() => {
        window.location.href = "../Home/x-home.html";
      }, 1500);
    }
  });

  closeBtn.addEventListener("click", () => {
    step2.style.display = "none";
    step1.style.display = "flex";
    closeBtn.style.visibility = "hidden";
    passwordInput.value = "";
    loginBtn.disabled = true;
  });

  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const svg = togglePassword.querySelector("svg");
    if (type === "text") {
      svg.setAttribute("fill", "#1d9bf0");
    } else {
      svg.setAttribute("fill", "#71767b");
    }
  });
});
