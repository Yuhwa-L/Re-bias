// Function to handle page navigation (simplified for example)
function goToPage(pageId) {
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.querySelector(`.app-page[data-page="${pageId}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 네비게이션 버튼의 active 클래스 업데이트
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-nav-target') === pageId) {
            item.classList.add('active');
        }
    });

    // 🌟 동영상 페이지가 아닐 때 편향도 숨김 🌟
    if (pageId !== 'video-content') {
        toggleBiasIndicator(false);
    }
}

// 🌟 편향도 표시/숨김을 제어하는 핵심 함수 🌟
function toggleBiasIndicator(show) {
    const indicator = document.getElementById('bias-indicator');
    if (indicator) {
        // 'show'가 true이면 'flex'로 설정하여 보이게 함
        // 'show'가 false이면 'none'으로 설정하여 숨김
        indicator.style.display = show ? 'flex' : 'none';
    }
}

// 🌟 수정: 편향도 점수(biasScore) 인수를 추가하고 DOM에 값 적용 🌟
// 동영상 페이지로 이동하는 함수 (동영상 분석 실행 시)
function openVideoPage(videoUrl, biasScore) {
    // 1. 동영상 분석이 시작되는 상황 가정: 편향도 표시 
    toggleBiasIndicator(true); 

    // 🌟 2. 전달받은 편향도 점수를 왼쪽 상단 박스에 표시 🌟
    const biasPercentageElement = document.getElementById('bias-percentage');
    if (biasPercentageElement) {
        biasPercentageElement.textContent = biasScore;
    }
    
    // 3. 실제 페이지 전환
    goToPage('video-content');
}

// --- 기타 초기화 함수 ---
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

// 앱 초기화 시 실행 (현재 시간 표시)
updateTime();
setInterval(updateTime, 60000); // 1분마다 업데이트

// 앱 로드 시 편향도 박스를 기본으로 숨기기
document.addEventListener('DOMContentLoaded', () => {
    // 앱이 처음 로드될 때 편향도 표시기를 숨깁니다.
    toggleBiasIndicator(false);
});