// DOM Elements
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');
const themeText = themeToggleBtn.querySelector('span');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const animationSpeedSelect = document.getElementById('animation-speed');
const animationStyleSelect = document.getElementById('animation-style');

// User Preferences Object
const userPreferences = {
    theme: 'light',
    animationSpeed: 'medium',
    animationStyle: 'fade'
};

// Load preferences from localStorage
function loadPreferences() {
    const savedPreferences = localStorage.getItem('animationPreferences');
    
    if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        
        // Update userPreferences object with saved values
        Object.assign(userPreferences, parsedPreferences);
        
        // Apply saved theme
        if (userPreferences.theme === 'dark') {
            enableDarkTheme();
        } else {
            enableLightTheme();
        }
        
        // Apply saved animation speed
        body.classList.remove('speed-slow', 'speed-medium', 'speed-fast');
        body.classList.add(`speed-${userPreferences.animationSpeed}`);
        animationSpeedSelect.value = userPreferences.animationSpeed;
        
        // Apply saved animation style
        animationStyleSelect.value = userPreferences.animationStyle;
    }
}

// Save preferences to localStorage
function savePreferences() {
    localStorage.setItem('animationPreferences', JSON.stringify(userPreferences));
}

// Theme Toggle Functions
function enableDarkTheme() {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeText.textContent = 'Light Mode';
    userPreferences.theme = 'dark';
}

function enableLightTheme() {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeText.textContent = 'Dark Mode';
    userPreferences.theme = 'light';
}

// Animation Functions
function triggerAnimation(element, animationClass) {
    // Remove animation class if it exists
    element.classList.remove(animationClass);
    
    // Force reflow to restart animation
    void element.offsetWidth;
    
    // Add animation class
    element.classList.add(animationClass);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 1000);
}

// Apply animation style based on user preference
function applyAnimationStyle(element) {
    const style = userPreferences.animationStyle;
    
    // Remove existing animation classes
    element.classList.remove('bounce-animation', 'fade-animation', 'slide-animation');
    
    // Apply selected animation style
    switch (style) {
        case 'bounce':
            triggerAnimation(element, 'bounce');
            break;
        case 'fade':
            triggerAnimation(element, 'pulse');
            break;
        case 'slide':
            triggerAnimation(element, 'shake');
            break;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load saved preferences
    loadPreferences();
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            enableDarkTheme();
        } else {
            enableLightTheme();
        }
        savePreferences();
    });
    
    // Card click animations
    card2.addEventListener('click', () => {
        triggerAnimation(card2, 'clicked');
    });
    
    // Button animations
    button1.addEventListener('click', () => {
        triggerAnimation(button1, 'animate');
    });
    
    button2.addEventListener('click', () => {
        triggerAnimation(button2, 'animate');
    });
    
    button3.addEventListener('click', () => {
        triggerAnimation(button3, 'animate');
    });
    
    // Animation speed preference
    animationSpeedSelect.addEventListener('change', (e) => {
        const speed = e.target.value;
        body.classList.remove('speed-slow', 'speed-medium', 'speed-fast');
        body.classList.add(`speed-${speed}`);
        userPreferences.animationSpeed = speed;
        savePreferences();
    });
    
    // Animation style preference
    animationStyleSelect.addEventListener('change', (e) => {
        userPreferences.animationStyle = e.target.value;
        savePreferences();
    });
});

// Display localStorage data in console for debugging
function displayStoredPreferences() {
    const savedPreferences = localStorage.getItem('animationPreferences');
    if (savedPreferences) {
        console.log('Stored Preferences:', JSON.parse(savedPreferences));
    } else {
        console.log('No preferences stored yet.');
    }
}

// Call this function to check stored data
displayStoredPreferences();
