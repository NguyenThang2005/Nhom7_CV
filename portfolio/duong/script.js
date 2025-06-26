// script.js
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contactForm');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Nút back to top
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Form liên hệ
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Tin nhắn đã được gửi! Cảm ơn bạn đã liên hệ. (Thực tế không gửi, chỉ là demo)');
            contactForm.reset();
        });
    }

    // Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress');
    if (progressBars.length > 0) {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.setProperty('--progress', `${percent}%`);
            bar.classList.add('animate');
        });
    }

    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Chuyển Light Mode' : 'Chuyển Dark Mode';
            // Lưu trạng thái dark mode vào localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.removeItem('darkMode');
            }
        });

        // Áp dụng dark mode từ localStorage khi tải trang
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = 'Chuyển Light Mode';
        }
    }

    // Smooth Scroll for Navigation (cập nhật để chuyển trang thay vì cuộn)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });

    // Fade-in khi cuộn
    function checkFadeIn() {
        const sections = document.querySelectorAll('section');
        if (sections.length > 0) {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (sectionTop < windowHeight - 50) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        }
    }

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn);

    // Loading Animation
    window.addEventListener('load', () => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    });

    // Particle Animation
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1;
                this.speedY = (Math.random() - 0.5) * 1;
                this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particlesArray = [];
        const numberOfParticles = 100;

        function init() {
            particlesArray.length = 0; // Xóa mảng cũ
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }
                connectParticles();
                requestAnimationFrame(animate);
            }
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }

    // Modal Functions (chỉ áp dụng khi có modal)
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    if (modal && modalContent) {
        function openModal(projectId) {
            modal.style.display = 'block';
            let content = '';
            if (projectId === 'project1') {
                content = `
                    <h3>Ứng dụng Quản lý Giặt ủi</h3>
                    <p><em>Tháng 2/2025 - 4/2025</em></p>
                    <p>Phát triển ứng dụng web bằng React và Firebase. Vai trò: Backend Developer.</p>
                    <p><a href="https://github.com/hoThanhThien/LT_JAVA_010412213603.git" target="_blank">Xem mã nguồn</a></p>
                `;
            } else if (projectId === 'project2') {
                content = `
                    <h3>Trò chơi 2D đơn giản</h3>
                    <p><em>Tháng 3/2024 - Tháng 5/2024</em></p>
                    <p>Xây dựng trò chơi 2D bằng Pygame, tích hợp âm thanh và hiệu ứng.</p>
                    <p><a href="https://github.com/yourusername/project2" target="_blank">Xem mã nguồn</a></p>
                `;
            }
            modalContent.innerHTML = content;
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', () => {
                const projectId = item.getAttribute('onclick')?.match(/'([^']+)'/)[1];
                if (projectId) openModal(projectId);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        window.onclick = (event) => {
            if (event.target === modal) {
                closeModal();
            }
        };
    }
});