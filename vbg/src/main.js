function SwitchTheme() {
    if (localStorage.theme === 'dark' || ('theme' in localStorage)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function scroll(container, step, incr) {
    if(container) {
        let completed = 0;
        var slider = window.setInterval(() => {
            container.scrollLeft += step > 0 ? incr : -incr;
            completed += step > 0 ? incr : -incr;

            if(step > 0 && completed >= step) {
                completed = 0;
                window.clearInterval(slider);
            }

            if(step < 0 && completed <= step) {
                completed = 0;
                window.clearInterval(slider);
            }
        }, 50);
    }
}

// Lancement des scripts.
const SCROLLING_STEP = 500;
(() => {
    window.addEventListener('load', () => {
        SwitchTheme();

        // On va essayer de mettre en place les slides.
        try {
            const container = document.querySelector('#blog-suggestions');
            const [left, right] = [
                document.querySelectorAll('.l-blog-videos'),
                document.querySelectorAll('.r-blog-videos')
            ];
            const media = document.querySelector('.media');
            const incr = media ? media.clientWidth / 5 : 300;

            left.forEach(b => b.addEventListener('click', () => scroll(container, -SCROLLING_STEP, incr)));
            right.forEach(b => b.addEventListener('click', () => scroll(container, SCROLLING_STEP, incr)));
        } catch {}
    });

    try {
        document.querySelector('#dark-mode-toggler').addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            if(document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.removeItem('theme');
            }
        });
    } catch {}

    // Mise en place du bouton burger de navigation
    try {
        const burgerBtn = document.querySelector('#navbar-burger-btn');
        const mobileNav = document.querySelector('#mobile-nav');
        const navDrop = document.querySelector('#mobile-nav-backdrop');

        burgerBtn.addEventListener('click', () => mobileNav.classList.remove('hidden'));
        navDrop.addEventListener('click', () => mobileNav.classList.add('hidden'));
    } catch {}


})()