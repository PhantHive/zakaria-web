let currentBackground = 1;
const totalBackgrounds = 2;
let isTap = false;
let startTouchTime = 0;
let startTouchPosition: null | number = null;
let endTouchPosition: null | number = null;
const swipeThreshold = window.innerWidth * 0.1;

function changeBackground(direction: number) {
    currentBackground =
        ((currentBackground - 1 + direction + totalBackgrounds) %
            totalBackgrounds) +
        1;

    const background = document.getElementById('background');
    if (background) {
        background.className = ''; // Remove all classes
        // if screen width is less than 800px, use phone backgrounds except if the phone is in landscape mode
        if (
            window.innerWidth <= 800 &&
            window.innerWidth < window.innerHeight
        ) {
            background.classList.add(`phone-0${currentBackground}`);
        } else {
            background.classList.add(`background-0${currentBackground}`);
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
        changeBackground(Math.sign(swipeDistance));
    }
}

export function initBackgroundTransition() {
    window.addEventListener('touchstart', handleSwipeStart);
    window.addEventListener('touchmove', handleSwipeMove);
    window.addEventListener('touchend', handleSwipeEnd);
    window.addEventListener('wheel', (event: WheelEvent) => {
        changeBackground(Math.sign(event.deltaY));
    });

    // Initialize the background
    const background = document.getElementById('background');
    if (background) {
        background.classList.add(
            window.innerWidth <= 800 && window.innerWidth < window.innerHeight
                ? 'phone-01'
                : 'background-01',
        );
    }
}
