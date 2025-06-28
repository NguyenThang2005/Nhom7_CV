// Hiệu ứng chuyển tiếp màn hình welcome
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const tunnelEffect = document.getElementById('tunnelEffect');
    const letgoBtn = document.getElementById('letgoBtn');
    const mainContent = document.getElementById('main-content');
    
    // Xử lý sự kiện khi click vào nút "Let's Go"
    letgoBtn.addEventListener('click', function() {
        this.classList.add('clicked');
        
        // Kích hoạt hiệu ứng đường hầm bằng cách thêm class 'active'
        tunnelEffect.classList.add('active');
        
        // Sau khi đường hầm mở rộng, bắt đầu hiệu ứng zoom out
        setTimeout(() => {
            welcomeScreen.classList.add('zoom-out');
            
            // Ẩn màn hình chào và hiển thị nội dung chính sau khi hiệu ứng hoàn tất
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                mainContent.style.display = 'block';
                initMainContent();
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    animateMainContent();
                }, 100);
            }, 1200);
        }, 300);
    });
    
    // Hàm tạo hiệu ứng cho nội dung chính
    function animateMainContent() {
        // Làm nổi bật phần slideshow đầu tiên
        document.querySelector('.hero-slideshow').style.transform = 'scale(1)';
        document.querySelector('.hero-slideshow').style.opacity = '1';
        
        // Hiệu ứng xuất hiện tuần tự cho các section
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 300 * (index + 1)); // Mỗi section xuất hiện cách nhau 0.3s
        });
    }
    
    // Hàm khởi tạo hiệu ứng cho nội dung chính
    function initMainContent() {
        // Sử dụng jQuery để tạo hiệu ứng
        $(document).ready(function() {
            // Cuộn mượt khi click vào các liên kết neo
            $('a[href^="#"]').on('click', function(event) {
                var target = $(this.hash);
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - $('header').outerHeight() 
                    }, 800, function() {
                        // Thêm hiệu ứng xuất hiện sau khi cuộn
                        $(target).addClass('show');
                    });
                }
            });

            // Hiệu ứng fade-in khi cuộn trang
            $(window).on('scroll', function() {
                $('.section').each(function() {
                    var sectionTop = $(this).offset().top;
                    var windowBottom = $(window).scrollTop() + $(window).height();

                    // Nếu section hiển thị trong viewport
                    if (windowBottom > sectionTop + 100) { 
                        $(this).css({
                            'opacity': 1,
                            'transform': 'translateY(0) translateZ(0) rotateX(0)'
                        }).addClass('show');
                    }
                });
            }).scroll(); // Kích hoạt ngay khi trang load
        });

        // Slideshow ảnh tự động
        const listImage = document.querySelector('.list-images');
        const imgs = document.querySelectorAll('.list-images img');
        const length = imgs.length;
        let current = 0;
        
        // Tự động chuyển ảnh mỗi 3 giây
        setInterval(() => {
            if(current == length - 1){
                // Quay lại ảnh đầu tiên nếu đang ở ảnh cuối
                current = 0;
                let width = imgs[0].offsetWidth;
                listImage.style.transform = `translateX(0px)`;
            } else {
                // Chuyển đến ảnh tiếp theo
                current++;
                let width = imgs[0].offsetWidth;
                listImage.style.transform = `translateX(${width * -1 * current}px)`;
            }
        }, 3000);
    }
});

// Nút quay lại đầu trang
const backToTopBtn = document.getElementById('backToTop');

// Hiển thị nút khi cuộn xuống 300px
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Xử lý sự kiện click nút quay lại đầu trang
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Cuộn mượt
    });
});

// Hiệu ứng hạt particle
var container = document.getElementById('particles-js');
var bordersArray = ['50%', '0']; // Các kiểu bo góc
var blursArray = ['0', '5px']; // Các mức độ làm mờ
var colorsArray = ['#FF6B6B', '#FF66D9', '#4472CA']; // Màu sắc
var width = document.documentElement.clientWidth; // Chiều rộng viewport
var height = document.documentElement.clientHeight; // Chiều cao viewport
var count = 150; // Số lượng hạt

// Tạo các hạt particle ngẫu nhiên
function createElementRandom() {
    for (var i = 0; i < count; i++) {
        // Các giá trị ngẫu nhiên cho mỗi hạt
        var randomLeft = Math.floor(Math.random() * width);
        var randomTop = Math.floor(Math.random() * height);
        var color = Math.floor(Math.random() * 3);
        var border = Math.floor(Math.random() * 2);
        var blur = Math.floor(Math.random() * 2);
        var widthElement = Math.floor(Math.random() * 5) + 5;
        var timeAnimation = Math.floor(Math.random() * 8) + 5;

        // Tạo phần tử div cho mỗi hạt
        var div = document.createElement("div");
        div.style.backgroundColor = colorsArray[color];
        div.style.position = 'absolute';
        div.style.width = widthElement + 'px';
        div.style.height = widthElement + 'px';
        div.style.marginLeft = randomLeft + 'px';
        div.style.marginTop = randomTop + 'px';
        div.style.borderRadius = bordersArray[border];
        div.style.filter = 'blur(' + blursArray[blur] + ')';
        div.style.animation = 'move ' + timeAnimation + 's ease-in infinite';

        // Thêm hạt vào container
        container.appendChild(div);
    }
}

// Gọi hàm tạo hạt
createElementRandom();


// Modal xem ảnh
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

// Trong file script.js, thay thế hàm openModal hiện tại bằng:
function openModal(element) {
    const imgSrc = element.getAttribute('data-image');
    const hobbyType = imgSrc.split('/')[1].split('.')[0]; // Lấy tên hobby từ tên file ảnh
    
    // Hiển thị ảnh chính
    modalImg.src = imgSrc;
    
    // Tạo các ảnh bổ sung dựa trên hobby type
    const additionalImagesContainer = document.querySelector('.additional-images');
    additionalImagesContainer.innerHTML = '';
    
    // Tạo 3 ảnh bổ sung (giả sử bạn có các ảnh đặt tên theo quy tắc hobbyType1.jpg, hobbyType2.jpg,...)
    for (let i = 1; i <= 3; i++) {
        const img = document.createElement('img');
        img.src = `img/${hobbyType}${i}.jpg`; // Giả sử ảnh có tên như sport1.jpg, sport2.jpg,...
        img.alt = `Hobby image ${i}`;
        img.onclick = function() {
            modalImg.src = this.src; // Cho phép click vào ảnh nhỏ để xem lớn
        };
        additionalImagesContainer.appendChild(img);
    }
    
    modal.classList.add('show');
    event.stopPropagation();
}

closeModal.onclick = function() {
    modal.classList.remove('show');
}

// Đóng modal khi click bên ngoài ảnh
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}


// Thêm hiệu ứng load thanh progress
function animateProgressBars() {
    document.querySelectorAll('.progress-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Gọi hàm này khi section skills hiển thị
function animateMainContent() {
    // ... các code hiện có ...
    animateProgressBars();
}


function openModal(element) {
    const imgSrc = element.getAttribute('data-image');
    const hobbyType = imgSrc.split('/')[1].split('.')[0];
    
    // Hiển thị ảnh chính
    modalImg.src = imgSrc;
    
    // Tạo các ảnh bổ sung
    const additionalImagesContainer = document.querySelector('.additional-images');
    additionalImagesContainer.innerHTML = '';
    
    // Tạo mảng các ảnh liên quan (bao gồm cả ảnh hiện tại)
    const relatedImages = [
        `img/${hobbyType}.jpg`,
        `img/${hobbyType}1.jpg`,
        `img/${hobbyType}2.jpg`,
        `img/${hobbyType}3.jpg`
    ].filter(img => img !== imgSrc); // Loại bỏ ảnh hiện tại
    
    // Thêm ảnh hiện tại vào đầu mảng
    relatedImages.unshift(imgSrc);
    
    // Hiển thị tất cả ảnh
    relatedImages.forEach((imgPath, index) => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = `Hobby image ${index + 1}`;
        img.dataset.originalIndex = index; // Lưu vị trí ban đầu
        img.onclick = function() {
            // Hoán đổi ảnh khi click
            const tempSrc = modalImg.src;
            modalImg.src = this.src;

            
            // Cập nhật vị trí trong mảng
            const clickedIndex = parseInt(this.dataset.originalIndex);
            relatedImages[clickedIndex] = modalImg.src;
            relatedImages[0] = this.src;
        };
        additionalImagesContainer.appendChild(img);
    });
    
    modal.classList.add('show');
    event.stopPropagation();
}