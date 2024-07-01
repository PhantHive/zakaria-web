import { useInkSplash } from './inkSplash.ts';
const { addSplash } = useInkSplash();

export function initLoadingScreen() {
  const messages = [
    "Hey, I am PhantHive",
    "Welcome to my fairy realm 🧚‍♀️",
    "I am loading things for you :)"
  ];

  let messageIndex = 0;
  let charIndex = 0;
  const typingSpeed = 100;
  const delayBetweenMessages = 1000;
  const minLoadingTime = 10000; // Minimum loading time of 7 seconds
  const startTime = Date.now();

  const textElement = document.getElementById("text") as HTMLElement;
  const cursorElement = document.getElementById("cursor") as HTMLElement;

  function type() {
    if (charIndex < messages[messageIndex].length) {
      textElement.textContent += messages[messageIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(() => {
        charIndex = 0;
        textElement.textContent = "";
        messageIndex = (messageIndex + 1) % messages.length;
        type();
      }, delayBetweenMessages);
    }
  }

  function hideLoadingScreen() {
    const elapsed = Date.now() - startTime;
    const remainingTime = minLoadingTime - elapsed;

    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen") as HTMLElement;
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 1000);
    }, Math.max(0, remainingTime));
  }

  function randomSplash() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    addSplash(x, y);
  }

  const splashInterval = minLoadingTime / 5;
  for (let i = 0; i < 5; i++) {
    setTimeout(randomSplash, i * splashInterval);
  }

  window.addEventListener("load", hideLoadingScreen);

  cursorElement.style.animation = "blink 0.7s infinite";
  type();
}