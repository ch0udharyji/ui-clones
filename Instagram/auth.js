function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const btn = input.nextElementSibling;
    
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "Hide";
    } else {
        input.type = "password";
        btn.textContent = "Show";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        const loginBtn = document.getElementById('login-btn');
        
        // Enable/disable login button based on input
        const checkInputs = () => {
            if (usernameInput.value.length > 0 && passwordInput.value.length >= 6) {
                loginBtn.removeAttribute('disabled');
            } else {
                loginBtn.setAttribute('disabled', 'true');
            }
        };
        
        usernameInput.addEventListener('input', checkInputs);
        passwordInput.addEventListener('input', checkInputs);
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate authentication delay
            loginBtn.textContent = "Logging in...";
            loginBtn.style.opacity = "0.7";
            
            setTimeout(() => {
                // Redirect to main feed page
                window.location.href = "index.html";
            }, 1000);
        });
        
        // Initial check
        checkInputs();
    }
    
    // Signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const emailInput = document.getElementById('signup-email');
        const fullnameInput = document.getElementById('signup-fullname');
        const usernameInput = document.getElementById('signup-username');
        const passwordInput = document.getElementById('signup-password');
        const signupBtn = document.getElementById('signup-btn');
        
        const checkSignupInputs = () => {
            if (emailInput.value.length > 0 && 
                fullnameInput.value.length > 0 && 
                usernameInput.value.length > 0 && 
                passwordInput.value.length >= 6) {
                signupBtn.removeAttribute('disabled');
            } else {
                signupBtn.setAttribute('disabled', 'true');
            }
        };
        
        emailInput.addEventListener('input', checkSignupInputs);
        fullnameInput.addEventListener('input', checkSignupInputs);
        usernameInput.addEventListener('input', checkSignupInputs);
        passwordInput.addEventListener('input', checkSignupInputs);
        
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate signup delay
            signupBtn.textContent = "Signing up...";
            signupBtn.style.opacity = "0.7";
            
            setTimeout(() => {
                // Redirect to main feed page
                window.location.href = "index.html";
            }, 1000);
        });
        
        // Initial check
        checkSignupInputs();
    }
});
