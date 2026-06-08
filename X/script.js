document.addEventListener('DOMContentLoaded', () => {
    // Auto-resize textarea
    const textarea = document.querySelector('.compose-right textarea');
    const postBtn = document.querySelector('.compose-actions .post-btn');

    if (textarea && postBtn) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            
            if (this.value.trim().length > 0) {
                postBtn.removeAttribute('disabled');
            } else {
                postBtn.setAttribute('disabled', 'true');
            }
        });
    }

    // Tabs switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});
