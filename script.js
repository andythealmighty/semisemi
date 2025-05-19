// DOM 요소 선택
const header = document.querySelector('header');
const progressBar = document.querySelector('.progress-bar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');
const contactForm = document.getElementById('contactForm');

// 페이지 로드 시 페이드인 효과
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // 부드러운 페이드인 효과를 위한 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.8s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // 초기 애니메이션 효과
    initAnimations();
    
    // 테스티모니얼 슬라이더 초기화
    initTestimonialSlider();
    
    // 숫자 카운터 초기화
    initNumberCounters();
});

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    // 헤더 스타일 변경
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // 스크롤 진행 표시줄 업데이트
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
    
    // 스크롤 애니메이션 확인
    checkScrollAnimations();
});

// 모바일 메뉴 토글
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // 햄버거 메뉴 애니메이션
    burger.children[0].classList.toggle('rotate-down');
    burger.children[1].classList.toggle('fade-out');
    burger.children[2].classList.toggle('rotate-up');
    
    // 네비게이션 링크 애니메이션
    navLinksLi.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // 메뉴 오픈 시 스크롤 방지
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// 네비게이션 링크 클릭 시 모바일 메뉴 닫기
navLinksLi.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            // 햄버거 메뉴 아이콘 초기화
            burger.children[0].classList.remove('rotate-down');
            burger.children[1].classList.remove('fade-out');
            burger.children[2].classList.remove('rotate-up');
            
            // 링크 애니메이션 초기화
            navLinksLi.forEach(link => {
                link.style.animation = '';
            });
            
            // 스크롤 허용
            document.body.style.overflow = 'auto';
        }
    });
});

// 문의 양식 제출 처리
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 양식 데이터 가져오기
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value;
        
        // 간단한 유효성 검사
        if (!name || !email || !message) {
            showNotification('모든 필수 필드를 채워주세요.', 'warning');
            return;
        }
        
        // 이메일 형식 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('유효한 이메일 주소를 입력해주세요.', 'warning');
            return;
        }
        
        // 여기에 실제 양식 제출 로직 추가 (서버에 데이터 전송)
        // 예: fetch API를 사용하여 백엔드로 데이터 전송
        
        // 성공 메시지 표시
        showNotification('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
        
        // 양식 초기화
        contactForm.reset();
    });
}

// 알림 표시 함수
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 12px;
            background: var(--light);
            box-shadow: var(--box-shadow-lg);
            z-index: 1100;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            max-width: 350px;
            border-left: 5px solid;
        }
        
        .notification.info {
            border-left-color: var(--primary);
        }
        
        .notification.success {
            border-left-color: var(--success);
        }
        
        .notification.warning {
            border-left-color: var(--warning);
        }
        
        .notification.error {
            border-left-color: var(--danger);
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 20px;
            color: var(--gray);
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: var(--dark);
        }
        
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // 문서에 알림 추가
    document.body.appendChild(notification);
    
    // 알림 표시 애니메이션
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 닫기 버튼 이벤트
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // 자동 제거 타이머
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// 애니메이션 초기화
function initAnimations() {
    // 스크롤 시 요소 애니메이션을 위한 옵저버 설정
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 애니메이션 요소 선택
    const fadeInElements = document.querySelectorAll('.tech-card, .process-step, .project-card, .section-header, .contact-form, .contact-info, .about-content, .value-card, .tech-comparison, .speed-content, .cta-content');
    
    // 관찰자(Observer) 생성
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 요소에 애니메이션 클래스 추가 및 관찰 시작
    fadeInElements.forEach(element => {
        element.classList.add('fade-element');
        fadeInObserver.observe(element);
    });
    
    // 스크롤 탑 버튼 추가
    addScrollTopButton();
}

// 스크롤에 따른 애니메이션 체크
function checkScrollAnimations() {
    // 필요한 추가 스크롤 기반 애니메이션을 여기에 추가
}

// 스크롤 탑 버튼
function addScrollTopButton() {
    // 버튼 요소 생성
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopButton.classList.add('scroll-top-btn');
    scrollTopButton.style.display = 'none';
    
    // 문서에 버튼 추가
    document.body.appendChild(scrollTopButton);
    
    // 버튼 클릭 이벤트
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 스크롤 위치에 따른 버튼 표시/숨김
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            if (scrollTopButton.style.display === 'none') {
                scrollTopButton.style.display = 'flex';
                setTimeout(() => {
                    scrollTopButton.style.opacity = '1';
                    scrollTopButton.style.transform = 'translateY(0)';
                }, 10);
            }
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    scrollTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
}

// 테스티모니얼 슬라이더 (만약 사이트에 추가한다면)
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const items = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.control-prev');
        const nextBtn = document.querySelector('.control-next');
        
        let currentIndex = 0;
        const itemCount = items.length;
        
        // 슬라이더 업데이트 함수
        function updateSlider() {
            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // 도트 활성화 상태 업데이트
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // 초기 상태 설정
        updateSlider();
        
        // 이벤트 리스너 설정
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % itemCount;
                updateSlider();
            });
        }
        
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
            });
        }
        
        // 자동 슬라이드 설정
        setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateSlider();
        }, 5000);
    }
}

// 숫자 카운팅 애니메이션
function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count') || counter.innerText.replace(/\D/g, ''));
                    let count = 0;
                    const duration = 2000; // 2초
                    const step = Math.ceil(target / (duration / 16)); // 60fps에 맞춰 계산
                    
                    const updateCount = () => {
                        count += step;
                        if (count >= target) {
                            counter.innerText = counter.hasAttribute('data-count') ? target : counter.innerText;
                            return;
                        }
                        
                        counter.innerText = count;
                        requestAnimationFrame(updateCount);
                    };
                    
                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// 이미지 지연 로딩
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

// 페이지 로드 완료 시 로딩 완료 표시
window.addEventListener('load', () => {
    // 지연 로딩 초기화
    initLazyLoading();
    
    // 로딩 완료 상태로 설정
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 500);
});