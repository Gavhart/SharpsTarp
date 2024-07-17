document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of anchorLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    }
    

    // Dynamic navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active-link'));
        navLinks[index] && navLinks[index].classList.add('active-link');
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    // Add entry animations on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('enter');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.animate-on-scroll').forEach((section) => {
        section.classList.add('before-enter');
        observer.observe(section);
    });

    // Display the popup after 30 seconds
    setTimeout(function() {
        var popup = document.getElementById("contactPopup");
        if (popup) popup.style.display = "block";
        
        // Display the close button 10 seconds after the popup shows
        setTimeout(function() {
            var closeButton = document.querySelector(".close-btn");
            if (closeButton) closeButton.style.display = "block";
        }, 8000); 
    }, 15000); 

    // Close button functionality
    var closeButton = document.querySelector(".close-btn");
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            var popup = document.getElementById("contactPopup");
            if (popup) popup.style.display = "none";
        });
    }

    // Highlight the current page link in the navigation
    function highlightCurrentPage() {
        const navLinks = document.querySelectorAll('#main-nav a');
        const currentPath = window.location.pathname;

        function normalizePath(path) {
            return path.endsWith('/') ? path.slice(0, -1) : path;
        }

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (normalizePath(link.getAttribute('href')) === normalizePath(currentPath)) {
                link.classList.add('active-link');
            }
        });
    }
    highlightCurrentPage();
    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.onclick = function() {
            document.body.removeChild(this);
        };
    
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.maxHeight = '80%'; // Limit the image height to 80% of the viewport
        img.style.maxWidth = '90%'; // Limit the image width to 90% of the viewport
    
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
    }
    document.addEventListener('DOMContentLoaded', function () {
        const faqItems = document.querySelectorAll('.faq-item');
    
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                // Toggle 'expanded' class to show or hide the answer
                const wasExpanded = item.classList.contains('expanded');
                // Collapse all answers
                faqItems.forEach(i => i.classList.remove('expanded'));
                if (!wasExpanded) {
                    item.classList.add('expanded');
                }
            });
        });
    });
    
    
});