document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const slider = document.getElementById("slider");

  toggleBtn.addEventListener("click", () => {
    slider.classList.toggle("show");
    
    if (slider.classList.contains("show")) {
      toggleBtn.textContent = "Hide Clones";
    } else {
      toggleBtn.textContent = "View Clones";
    }
  });
});