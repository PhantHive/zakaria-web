import { useInkSplash } from './inkSplash';

const { createInkSplash } = useInkSplash();

// Variable to keep track of the current background
let currentBackground = 1;
// Total number of background images
const totalBackgrounds = 2;
// Touch event state variables
let isTap = false;
let startTouchTime = 0;
let startTouchPosition: null | number = null;
let endTouchPosition: null | number = null;
const swipeThreshold = window.innerWidth * 0.1; // Adjust the swipe threshold

function changeBackground(direction: number) {
    console.log('changeBackground');
    if (direction > 0) {
        currentBackground = (currentBackground % totalBackgrounds) + 1;
    } else {
        currentBackground =
            ((currentBackground - 2 + totalBackgrounds) % totalBackgrounds) + 1;
    }

    const colors = ['#ff4e50', '#fc913a', '#f9d62e', '#8bc34a', '#00bcd4', '#7e57c2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Create growing circle color transition
    createInkSplash(window.innerWidth / 2, window.innerHeight / 2, randomColor);

    const background = document.getElementById('background');
    if (background) {
        // Remove all existing background classes
        background.classList.remove(
            'background-01',
            'background-02',
            'phone-01',
            'phone-02',
        );
        // Add new background class based on the current background and device type
        if (window.innerWidth <= 800) {
            // Mobile device
            background.classList.add(currentBackground === 1 ? 'phone-01' : 'phone-02');
        } else {
            // Desktop device
            background.classList.add(currentBackground === 1 ? 'background-01' : 'background-02');
        }
    }
}

function handleSwipeStart(event: TouchEvent) {
    isTap = true;
    startTouchTime = event.timeStamp;
    startTouchPosition = event.touches[0].clientX;
}

function handleSwipeMove(event: TouchEvent) {
    if (isTap) {
        isTap = false;
    }
    endTouchPosition = event.touches[0].clientX;
}

function handleSwipeEnd(event: TouchEvent) {
    if (isTap) {
        return;
    }
    const swipeDistance = (endTouchPosition ?? 0) - (startTouchPosition ?? 0);
    const swipeTime = event.timeStamp - startTouchTime;
    if (Math.abs(swipeDistance) >= swipeThreshold && swipeTime < 1000) {
        // It's a valid swipe
        changeBackground(Math.sign(swipeDistance));
    }
}

export function initBackgroundTransition() {
    // Listen for touch events for mobile devices
    window.addEventListener('touchstart', handleSwipeStart);
    window.addEventListener('touchmove', handleSwipeMove);
    window.addEventListener('touchend', handleSwipeEnd);
    // Listen for wheel event
    window.addEventListener('wheel', (event: WheelEvent) => {
        let direction = Math.sign(event.deltaY);
        changeBackground(direction);
    });
}