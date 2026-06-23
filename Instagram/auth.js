document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.auth-btn');
            btn.textContent = 'Logging in...';
            btn.disabled = true;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = signupForm.querySelector('.auth-btn');
            btn.textContent = 'Signing up...';
            btn.disabled = true;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
});
