



// Efecto de Cursor Personalizado
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});




// Efecto de Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




// Animación al Scrollear
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});









// Modal y Formulario
const form = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const successModal = document.getElementById('success-modal');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mostrar modal de carga
    modal.classList.add('active');
    
    // Simular envío (en producción, esto es automático con Formspree)
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Esperar 3 segundos (solo para demostración)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        if (response.ok) {
            // Ocultar modal de carga y mostrar éxito
            modal.classList.remove('active');
            successModal.classList.add('active');
            form.reset();
            showConfetti();
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        modal.classList.remove('active');
        alert('Error al enviar: ' + error.message);
    }
});

function closeSuccessModal() {
    successModal.classList.remove('active');
}

// Efecto de Confeti
function showConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6e45e2', '#88d3ce', '#ff7e5f']
    });
}

// Validación en Tiempo Real
form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.style.borderColor = '#2ecc71';
        } else {
            input.style.borderColor = '#e74c3c';
        }
    });
});