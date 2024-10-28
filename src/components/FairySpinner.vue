<template>
    <div class="fairy-spinner">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Ring -->
            <circle
                class="spinner-ring"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                stroke-width="2"
            />

            <!-- Fairy -->
            <g class="fairy">
                <!-- Wings -->
                <g class="wings">
                    <path
                        class="wing left-wing"
                        d="M40 40 Q20 30 30 10 Q50 20 40 40"
                        fill="#E6E6FA"
                        stroke="#B0C4DE"
                        stroke-width="0.5"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="d"
                            values="
                                M40 40 Q20 30 30 10 Q50 20 40 40;
                                M40 40 Q15 35 30 10 Q50 20 40 40;
                                M40 40 Q20 30 30 10 Q50 20 40 40"
                            dur="0.5s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <path
                        class="wing right-wing"
                        d="M60 40 Q80 30 70 10 Q50 20 60 40"
                        fill="#E6E6FA"
                        stroke="#B0C4DE"
                        stroke-width="0.5"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="d"
                            values="
                                M60 40 Q80 30 70 10 Q50 20 60 40;
                                M60 40 Q85 35 70 10 Q50 20 60 40;
                                M60 40 Q80 30 70 10 Q50 20 60 40"
                            dur="0.5s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>

                <!-- Body -->
                <circle cx="50" cy="45" r="5" fill="#FFE4B5" />
                <path
                    d="M50 35 Q60 40 55 60 Q40 80 35 60 Q45 45 50 35"
                    fill="#7FFFD4"
                />

                <!-- Pixie Dust -->
                <g class="pixie-dust">
                    <circle cx="45" cy="60" r="1" fill="#FFD700">
                        <animate
                            attributeName="cy"
                            values="60;55;60"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="1;0;1"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="55" cy="58" r="1" fill="#FFD700">
                        <animate
                            attributeName="cy"
                            values="58;53;58"
                            dur="1.2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="1;0;1"
                            dur="1.2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </g>

            <!-- Gradient Definition -->
            <defs>
                <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        style="stop-color: #ff6b6b; stop-opacity: 1"
                    />
                    <stop
                        offset="50%"
                        style="stop-color: #ff9f9f; stop-opacity: 1"
                    />
                    <stop
                        offset="100%"
                        style="stop-color: #ff6b6b; stop-opacity: 1"
                    />
                    <animate
                        attributeName="x1"
                        values="0%;100%;0%"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="x2"
                        values="100%;0%;100%"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<style src="../styles/fairy-spinner.css"></style>
