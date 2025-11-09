// 계정 설정 액션을 처리하는 함수
function handleAccountAction(action) {
    if (action === 'logout') {
        alert('로그아웃 중...');
        goToPage('splash'); // 예시: 로그아웃 시 스플래시 페이지로 이동
    } else {
        alert(`${action} 관리 페이지로 이동합니다. (미구현)`);
    }
}

// 🌟 새 함수: 알고리즘 정화 서비스를 위한 외부 URL로 리디렉션 🌟
function redirectToCleaningService() {
    // 💡 실제 외부 정화 도구 또는 가이드 URL로 대체하세요
    const externalUrl = 'https://www.example.com/algorithmic-cleaning-guide'; 
    
    // 외부 URL을 새 브라우저 탭/창에서 엽니다
    window.open(externalUrl, '_blank'); 

    // 선택 사항: 리디렉션 전 사용자에게 즉각적인 피드백 제공
    const button = document.getElementById('clean-button');
    const originalText = button.textContent;
    button.textContent = '외부 서비스 열기 중...';
    
    // 잠시 후 버튼 텍스트를 원래대로 재설정
    setTimeout(() => {
        button.textContent = originalText;
    }, 1500); 
}

// 🌟 새 함수: 알림 종 아이콘의 읽지 않은 알림 개수 업데이트 🌟
function updateNotificationCount(count) {
    const ids = ['unread-notification-count', 'unread-notification-count-2', 'unread-notification-count-3'];
    
    ids.forEach(id => {
        const countElement = document.getElementById(id);
        if (countElement) {
            countElement.textContent = count > 99 ? '99+' : count;
            // 개수가 0보다 클 경우에만 표시
            countElement.style.display = count > 0 ? 'flex' : 'none'; 
        }
    });
}

// 페이지 이동을 처리하는 함수 (예시를 위해 단순화)
function goToPage(pageId) {
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.querySelector(`[data-page="${pageId}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 하단 탐색 표시줄의 활성화 상태 처리
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-nav-target') === pageId) {
            item.classList.add('active');
        }
    });

    // 🌟 핵심 수정: 비디오 재생 화면이 아닐 경우 편향도 표시기 숨기기 🌟
    if (pageId === 'video-content') {
        // 'video-content' 페이지일 경우 openVideoPage에서 활성화함
    } else {
        // 그 외 모든 페이지로 이동할 경우 비활성화
        toggleBiasIndicator(false);
    }
    
    // 알림 로직: 알림 목록으로 이동할 경우 모두 읽음 처리 (개수 0으로 설정)
    if (pageId === 'notification-list') {
        updateNotificationCount(0);
    }
}

// 편향도 비율 표시기의 가시성을 토글하는 함수
function toggleBiasIndicator(show) {
    const indicator = document.getElementById('bias-indicator');
    if (indicator) {
        // 'show'가 true이면 'flex' (표시), false이면 'none' (숨김)으로 설정
        indicator.style.display = show ? 'flex' : 'none';
    }
}

// 🌟 핵심 수정: thumbnailUrl 인수를 받아 video-player-image에 적용 🌟
// 비디오 페이지로 이동하는 함수 (비디오 분석이 시작된다고 가정)
function openVideoPage(videoUrl, biasScore, thumbnailUrl) {
    // 1. 비디오 분석이 시작된다고 가정: 편향도 표시기 표시 
    toggleBiasIndicator(true); 

    // 2. 받은 편향도 점수를 왼쪽 상단 박스에 표시 
    const biasPercentageElement = document.getElementById('bias-percentage');
    if (biasPercentageElement) {
        biasPercentageElement.textContent = biasScore;
    }
    
    // 🌟 3. 비디오 플레이어 이미지 업데이트 (썸네일을 플레이어 화면에 표시) 🌟
    const videoImageElement = document.getElementById('video-player-image');
    if (videoImageElement && thumbnailUrl) {
        videoImageElement.src = thumbnailUrl;
    }
    
    // 4. 실제 페이지 전환
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

// 초기화 시 편향도 표시기 숨기기 (기본 상태)
toggleBiasIndicator(false); 

// 🌟 초기화: 읽지 않은 알림 개수 설정 🌟
updateNotificationCount(3);