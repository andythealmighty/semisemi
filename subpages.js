document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // 스크롤 진행 표시
    window.onscroll = function() {
        const scrollProgress = document.getElementById('progressBar');
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
        
        // 헤더 스크롤 시 스타일 변경
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
    
    // FAQ 아코디언 기능
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            question.addEventListener('click', () => {
                // 현재 활성화된 FAQ 닫기
                const activeItem = document.querySelector('.faq-item.active');
                if (activeItem && activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer').style.maxHeight = '0';
                    activeItem.querySelector('.faq-icon').innerHTML = '<i class="fas fa-plus"></i>';
                }
                
                // 현재 항목 토글
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.innerHTML = '<i class="fas fa-minus"></i>';
                } else {
                    answer.style.maxHeight = '0';
                    icon.innerHTML = '<i class="fas fa-plus"></i>';
                }
            });
        });
    }
    
    // 필터 버튼 클릭 이벤트
    const filterButtons = document.querySelectorAll('.filter-btn, .blog-filter, .position-filter');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 활성화된 필터 버튼 변경
                const activeButton = document.querySelector('.filter-btn.active, .blog-filter.active, .position-filter.active');
                if (activeButton) {
                    activeButton.classList.remove('active');
                }
                this.classList.add('active');
                
                // 실제 필터링 로직은 여기에 추가
                const filterValue = this.textContent.trim();
                console.log('필터 적용:', filterValue);
                
                // 실제 구현에서는 해당 카테고리 항목만 표시하도록 처리
                // 예: document.querySelectorAll('.item').forEach(item => {...});
            });
        });
    }
    
    // 문의 양식 제출 이벤트
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value;
            
            // 폼 검증
            if (!name || !email || !message) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
            }
            
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 실제로는 서버로 데이터를 전송하는 코드가 필요합니다
            console.log('문의 제출:', { name, email, inquiryType, message });
            
            // 성공 메시지 표시
            alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
            
            // 폼 초기화
            contactForm.reset();
        });
    }
    
    // 구독 양식 이벤트
    const subscriptionForm = document.querySelector('.subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 실제로는 서버로 데이터를 전송하는 코드가 필요합니다
            console.log('구독 신청:', email);
            
            // 성공 메시지 표시
            alert('구독이 완료되었습니다. 감사합니다!');
            
            // 폼 초기화
            this.reset();
        });
    }
});