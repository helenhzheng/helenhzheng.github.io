document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Dark Mode Toggle
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    
    // Default to dark theme if no preference is set, or use the preferred set
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    } else {
        // Preferred System Color Scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle icons
        if (newTheme === 'dark') {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    });

    // Scroll Fade-in Animations Using Intersection Observer
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 2rem';
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.boxShadow = 'none';
        }
    });

    // Email Button Copy to Clipboard
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('helen.zheng@bc.edu').then(() => {
                const originalText = emailBtn.textContent;
                emailBtn.textContent = 'Email Copied!';
                setTimeout(() => {
                    emailBtn.textContent = originalText;
                }, 2000);
            });
        });
    }
});
