// Function to handle account setting actions
function handleAccountAction(action) {
    if (action === 'logout') {
        alert('Logging out...');
        goToPage('splash'); // Example: Go back to splash page on logout
    } else {
        alert(`Navigating to ${action} management page. (Not implemented)`);
    }
}

// 🌟 NEW FUNCTION: Redirects to an external URL for algorithm cleaning 🌟
function redirectToCleaningService() {
    // 💡 Replace this with the actual URL of the external cleaning tool or guide
    const externalUrl = 'https://www.example.com/algorithmic-cleaning-guide'; 
    
    // Open the external URL in a new browser tab/window
    // Note: In a real mobile app environment (like Cordova/React Native), '_system' opens the external browser. 
    // In a desktop browser, it typically opens a new tab.
    window.open(externalUrl, '_blank'); 

    // Optional: Provide instant feedback to the user before redirection
    const button = document.getElementById('clean-button');
    const originalText = button.textContent;
    button.textContent = 'Opening External Service...';
    
    // Reset button text after a brief moment
    setTimeout(() => {
        button.textContent = originalText;
    }, 1500); 
}

// 🌟 NEW FUNCTION: Updates the unread notification count on the bell icon 🌟
function updateNotificationCount(count) {
    const ids = ['unread-notification-count', 'unread-notification-count-2', 'unread-notification-count-3'];
    
    ids.forEach(id => {
        const countElement = document.getElementById(id);
        if (countElement) {
            countElement.textContent = count > 99 ? '99+' : count;
            // Display only if the count is greater than 0
            countElement.style.display = count > 0 ? 'flex' : 'none'; 
        }
    });
}

// Function to handle page navigation (simplified for example)
function goToPage(pageId) {
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.querySelector(`[data-page="${pageId}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Handle bottom navigation active state
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-nav-target') === pageId) {
            item.classList.add('active');
        }
    });

    // 🌟 Notification logic: If navigating to the notification list, mark all as read (set count to 0) 🌟
    if (pageId === 'notification-list') {
        updateNotificationCount(0);
        // You would typically also update the display of the items inside the notification list here
    }
}

// Function to toggle the visibility of the bias percentage indicator
function toggleBiasIndicator(show) {
    const indicator = document.getElementById('bias-indicator');
    if (indicator) {
        // Set to 'flex' (show) if 'show' is true, or 'none' (hide) if false
        indicator.style.display = show ? 'flex' : 'none';
    }
}

// 🌟 Update: Added biasScore argument and apply value to the DOM 🌟
// Function to navigate to the video page (assuming video analysis starts)
function openVideoPage(videoUrl, biasScore) {
    // 1. Assume video analysis is starting: show the bias indicator 
    toggleBiasIndicator(true); 

    // 🌟 2. Display the received bias score in the top-left box 🌟
    const biasPercentageElement = document.getElementById('bias-percentage');
    if (biasPercentageElement) {
        biasPercentageElement.textContent = biasScore;
    }
    
    // 3. Actual page transition
    goToPage('video-content');
}

// --- Other Initialization Functions ---
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

// Run on app initialization (display current time)
updateTime();
setInterval(updateTime, 60000); // Update every 1 minute

// Hide bias indicator on initialization (default state)
toggleBiasIndicator(false); 

// 🌟 Initialization: Set initial unread notification count 🌟
updateNotificationCount(3);