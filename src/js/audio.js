const soundPaths = {
    pongpaddle: "./src/PongSounds/pongpaddle.mp3",
    pongwall: "./src/PongSounds/pongwall.mp3",
    pongpoint: "./src/PongSounds/pongpoint.mp3", // Used for scoring
    pongstart: "./src/PongSounds/pongstart.mp3",
};

const audioCache = {};

// NEW: Global flag to track if audio playback is permitted
let audioUnlocked = false;

/**
 * Initializes and loads the audio files into memory.
 */
export function initializeAudio() {
    console.log("Initializing audio assets...");
    for (const key in soundPaths) {
        if (soundPaths.hasOwnProperty(key)) {
            // Use HTML5 Audio element to load and play sounds
            const audio = new Audio(soundPaths[key]);
            audio.preload = 'auto'; // Start loading immediately
            audio.volume = 0.5; // Set default volume
            audioCache[key] = audio;

            // Optional: Listen for errors to debug WAV format issues
            audio.onerror = (e) => {
                console.error(`Error loading audio file: ${key}. Check path and WAV encoding.`, e);
            };
        }
    }
}

/**
 * Plays a specific sound effect from the cache.
 * @param {string} soundName - The key of the sound to play (e.g., 'pongpaddle').
 */
export function playSound(soundName) {
    // Only attempt to play if audio is unlocked
    if (!audioUnlocked) {
        // If the game tries to play a sound before interaction, warn the developer
        console.warn("Audio locked. Please click the page to enable sound.");
        return;
    }

    const audio = audioCache[soundName];
    if (audio) {
        // Reset the audio time to 0 to allow the sound to be played again quickly
        audio.currentTime = 0;
        audio.play().catch(e => {
            // Catch and report errors, but the main lock is handled by the check above
            if (e.name !== 'NotAllowedError') {
                console.error(`Error playing ${soundName}:`, e);
            }
        });
    } else {
        console.warn(`Sound '${soundName}' not found in cache.`);
    }
}

/**
 * Attempts to unlock the browser's audio context using the pongstart sound file.
 * This is the most reliable method, as it links the user interaction directly
 * to a known audio resource.
 */
export function unlockAudio() {
    if (audioUnlocked) return;

    const startAudio = audioCache['pongstart'];

    if (!startAudio) {
        console.error("pongstart audio not found in cache during unlock attempt.");
        return;
    }

    // Attempt to play the actual start sound.
    startAudio.currentTime = 0;
    startAudio.play().then(() => {
        // Success: Audio context is now unlocked and the start sound is played.
        audioUnlocked = true;
        console.log("Audio playback successfully unlocked.");

        // Remove listeners to prevent unnecessary calls
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);

    }).catch(e => {
        // Failure: Playback is still disallowed (usually 'NotAllowedError')
        console.warn("Audio unlock still blocked. Please click or tap the screen again.", e);
        // We keep the listeners active, hoping the next interaction will succeed.
    });
}
