document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            navToggle.classList.toggle('is-active');
        });
    }
});
