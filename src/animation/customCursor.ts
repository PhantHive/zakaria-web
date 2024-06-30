export function initCustomCursor() {
    console.log('Initializing custom cursor');

    let cursor = document.querySelector('.custom-cursor') as HTMLElement;
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        console.log('Cursor element added to the DOM');
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Add click animation
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        console.log('Cursor clicking');
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        console.log('Cursor released');
    });
}