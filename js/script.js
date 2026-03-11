// favicon
document.head.insertAdjacentHTML('beforeend', '<link rel="icon" type="image/png" href="css/img/lampico.png">');


// navbar
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  nav.classList.toggle('active');
  hamburger.classList.toggle('active'); // this triggers the animation
}



// Optional: Prevent body scroll when menu is open
document.body.classList.toggle('menu-open');



// preview image achievements.html 
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Close when clicking outside the image
window.onclick = function (event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal) {
        closeModal();
    }
}

// handling blur efect 

// Fade in page on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => {
        document.body.classList.add("page-loaded");
    });
});


// typewriter

document.addEventListener('DOMContentLoaded', function () {
    const typewriterElement = document.getElementById('typewriter');
    const typeSound = document.getElementById('typeSound');

    const texts = [
        "Hello, I'm Ashik!",
        "Glad You're Here",
        "Enjoy Your Day!"
        

    ];

    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 1500;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex > 0) {
                setTimeout(typeEffect, erasingSpeed);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeEffect, typingSpeed);
            }

        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            playSound();
            charIndex++;

            if (charIndex < currentText.length) {
                setTimeout(typeEffect, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenTexts);
            }
        }
    }

    function playSound() {
        if (typeSound && typeSound.play) {
            typeSound.currentTime = 0;
            typeSound.play().catch(() => { });
        }
    }

    typeEffect();
});



// charts
window.onload = function () {
    // ===== Astro Budget Chart =====
    const ctxBudget = document.getElementById('astroBudgetChart').getContext('2d');
    new Chart(ctxBudget, {
        type: 'bar',
        data: {
            labels: ['Bangladesh', 'India', 'USA', 'China'],
            datasets: [{
                label: 'Budget ($ Million USD)',
                data: [250, 400, 25000, 12000],
                backgroundColor: ['green', 'orange', 'cyan', 'blue']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.formattedValue + 'M';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value + 'M';
                        }
                    }
                }
            }
        }
    });

    // ===== Astronomy Tech Chart =====
    const ctxAstro = document.getElementById('astroChart').getContext('2d');
    new Chart(ctxAstro, {
        type: 'bar',
        data: {
            labels: ['1971', '1981', '1991', '2001', '2011', '2021'],
            datasets: [{
                label: '% of Astronomy Tech',
                data: [5, 12, 18, 25, 32, 38],
                backgroundColor: '#4a6baf',
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });
};

// cursor
 const cursor = document.querySelector('.cursor');

        let mouseX = 0, mouseY = 0;     
        let cursorX = 0, cursorY = 0;   


        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });


        function animate() {

            cursorX += (mouseX - cursorX) * 0.2; 
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animate);
        }

        animate();


        const buttons = document.querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                cursor.style.width = '35px';
                cursor.style.height = '35px';
            });
            btn.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
            });
        });
        
        
        
        
        
        
        