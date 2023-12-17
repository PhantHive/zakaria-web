// Get the background element
const background = document.getElementById('background') as HTMLElement;

// Variable to keep track of the current background
let currentBackground = 1;

// Total number of background images
const totalBackgrounds = 2;

// Variables to keep track of the initial and final touch positions
let initialTouchPosition: null | number = null;
let finalTouchPosition: null | number = null;

function changeBackground(event: WheelEvent | TouchEvent) {
    console.log('changeBackground');
    // Check the direction of the scroll or swipe
    let direction: number = 0;
    if ('deltaY' in event) {
        direction = Math.sign(event.deltaY);
    } else {
        const touchEvent = event as TouchEvent;
        if (event.type === 'touchstart') {
            initialTouchPosition = touchEvent.touches[0].clientX;
        } else if (event.type === 'touchend') {
            if (initialTouchPosition === null) {
                // touchstart event was not fired before touchend event, return without changing the background
                return;
            }
            finalTouchPosition = touchEvent.changedTouches[0].clientX;
            const touchMoveDistance = finalTouchPosition - initialTouchPosition;
            if (Math.abs(touchMoveDistance) < window.innerWidth * 0.4) {
                return;
            }
            direction = Math.sign(touchMoveDistance);
            initialTouchPosition = null;
            finalTouchPosition = null;
        } else {
            return;
        }
    }

    // Update the current background based on the scroll or swipe direction
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

export function initBackgroundTransition() {
    // Listen for wheel event
    window.addEventListener('wheel', changeBackground);

    // Listen for touch events for mobile devices
    window.addEventListener('touchstart', changeBackground);
    window.addEventListener('touchend', changeBackground);
}
