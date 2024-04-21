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

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index] && navLinks[index].classList.add('active');
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
});

document.addEventListener("DOMContentLoaded", function() {
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
});
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('#main-nav a');
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active-link');
        }
    });
});

async function fetchWeather(lat, lon) {
    const apiKey = 'e8f8498df5f067ba1e99807aa9e9b8dd';
    const url = `https://home.openweathermap.org/api_keys`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.main.temp + '°C, ' + data.weather[0].description;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    const weatherGP = await fetchWeather(42.4711, -123.3414);
    document.getElementById('weatherGP').innerText = weatherGP;

    const weatherVW = await fetchWeather(45.6680, -122.5401);
    document.getElementById('weatherVW').innerText = weatherVW;
});






