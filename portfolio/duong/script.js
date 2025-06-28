document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contactForm');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Ẩn loading ngay khi DOM load xong
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }

    // Back to Top
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Form Liên Hệ
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
        });
    }

    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Chuyển Light Mode' : 'Chuyển Dark Mode';
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });

        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = 'Chuyển Light Mode';
        }
    }

    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });

        // Đánh dấu trang hiện tại
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Keyboard Navigation for Menu
    let currentFocus = -1;

if (navLinks.length > 0) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();

            // Di chuyển focus
            if (e.key === 'ArrowLeft' && currentFocus > 0) {
                currentFocus--;
            } else if (e.key === 'ArrowRight' && currentFocus < navLinks.length - 1) {
                currentFocus++;
            } else if (currentFocus === -1) {
                currentFocus = 0; // Nếu chưa chọn gì, chọn phần tử đầu
            }

            navLinks.forEach((link, index) => {
                link.classList.remove('focus');
                if (index === currentFocus) {
                    link.classList.add('focus');
                    link.focus();
                }
            });

        } else if (e.key === 'Enter' && currentFocus >= 0) {
            e.preventDefault();
            const href = navLinks[currentFocus].getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }
    });

        // Reset focus khi click chuột
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                currentFocus = -1;
                navLinks.forEach(l => l.classList.remove('focus'));
            });
        });
    }

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
            particlesArray.length = 0;
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
                    <p>Phát triển ứng dụng web để đặt lịch dịch vụ giặt ủi lấy tại nơi giao tận tay bằng React và Firebase. Lập trình bằng ngôn ngữ JAVA chạy bằng Spring boot. Vai trò: Backend Developer (30%).</p>
                    <p><a href="https://github.com/hoThanhThien/LT_JAVA_010412213603.git" target="_blank">Xem mã nguồn</a></p>
                `;
            } else if (projectId === 'project2') {
                content = `
                    <h3>Portfolio cá nhân</h3>
                    <p><em>Tháng 5/2025 - Hiện tại</em></p>
                    <p>Xây dựng một portfolio cá nhân chạy bằng HTML, CSS, JavaScript. Giới thiệu bản thân để nộp bài giữa kì môn Lập trình web.</p>
                    <p><a href="https://github.com/NguyenThang2005/Nhom7_CV" target="_blank">Xem mã nguồn</a></p>
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

    // Thêm chức năng hiển thị hình ảnh khi bấm vào timeline-item
    const timelineItems = document.querySelectorAll('.timeline-item');
    const previewContainer = document.createElement('div');
    previewContainer.id = 'image-preview';
    previewContainer.style.position = 'fixed';
    previewContainer.style.top = '50%';
    previewContainer.style.left = '50%';
    previewContainer.style.transform = 'translate(-50%, -50%)';
    previewContainer.style.maxWidth = '60%';
    previewContainer.style.zIndex = '9999';
    previewContainer.style.display = 'none';
    previewContainer.style.background = '#fff';
    previewContainer.style.border = '4px solid #e74c3c';
    previewContainer.style.borderRadius = '10px';
    previewContainer.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    document.body.appendChild(previewContainer);

    const previewImage = document.createElement('img');
    previewImage.style.width = '100%';
    previewImage.style.height = 'auto';
    previewImage.style.display = 'block';
    previewContainer.appendChild(previewImage);

    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            previewImage.src = `img/timeline${index + 1}.jpg`; // ảnh tương ứng timeline1.jpg, timeline2.jpg...
            previewContainer.style.display = 'block';
        });
    });

    document.addEventListener('click', (e) => {
        if (!previewContainer.contains(e.target) && !e.target.closest('.timeline-item')) {
            previewContainer.style.display = 'none';
        }
    });

    // Hiển thị ảnh lớn khi bấm vào từng mục học vấn
    const eduItems = document.querySelectorAll('.timeline-item');
    if (eduItems.length > 0) {
        eduItems.forEach((item, idx) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                previewImage.src = `images/edu_full${idx + 1}.jpg`; // ảnh lớn tương ứng
                previewContainer.style.display = 'block';
            });
        });
    }

    document.addEventListener('click', function (e) {
    const preview = document.getElementById('image-preview');
    if (!preview.contains(e.target) && !e.target.closest('.timeline-item')) {
        preview.style.display = 'none';
    }
    });
    
});
