document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (toggleButton) toggleButton.textContent = 'Light Mode';
        } else {
            body.classList.remove('dark-mode');
            if (toggleButton) toggleButton.textContent = 'Dark Mode';
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});


