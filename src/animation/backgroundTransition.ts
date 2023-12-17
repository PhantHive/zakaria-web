// Get the background element
const background = document.getElementById('background') as HTMLElement;

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
        if (currentBackground === 1) {
            background.classList.add('phone-01');
        } else {
            background.classList.add('phone-02');
        }
    } else {
        // Desktop device
        if (currentBackground === 1) {
            background.classList.add('background-01');
        } else {
            background.classList.add('background-02');
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
