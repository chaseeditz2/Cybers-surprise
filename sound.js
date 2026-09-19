```javascript
/* =========================================================
   THE FINAL ACT
   Cyberwall Birthday Experience
   sounds.js
   ========================================================= */

(() => {
    "use strict";

    let audioContext = null;
    let masterGain = null;
    let ambientGain = null;
    let soundEnabled = false;
    let thunderTimer = null;
    let rainSource = null;
    let rainFilter = null;
    let droneOscillator = null;
    let droneGain = null;

    const SOUND_TEXT_ON = "SOUND: ON";
    const SOUND_TEXT_OFF = "SOUND: OFF";

    function getSoundButton() {
        return document.getElementById("sound-button");
    }

    function ensureAudio() {
        if (audioContext) return true;

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            console.warn("Web Audio API is not supported.");
            return false;
        }

        audioContext = new AudioContextClass();

        masterGain = audioContext.createGain();
        masterGain.gain.value = 0.55;
        masterGain.connect(audioContext.destination);

        ambientGain = audioContext.createGain();
        ambientGain.gain.value = 0.18;
        ambientGain.connect(masterGain);

        return true;
    }

    async function resumeAudio() {
        if (!ensureAudio()) return false;

        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }

        return true;
    }

    function createNoiseBuffer(duration = 2) {
        const sampleRate = audioContext.sampleRate;
        const length = Math.floor(sampleRate * duration);

        const buffer = audioContext.createBuffer(
            1,
            length,
            sampleRate
        );

        const data = buffer.getChannelData(0);

        for (let i = 0; i < length; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }

    function startRain() {
        if (!audioContext || rainSource) return;

        const noiseBuffer = createNoiseBuffer(3);

        rainSource = audioContext.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;

        rainFilter = audioContext.createBiquadFilter();
        rainFilter.type = "lowpass";
        rainFilter.frequency.value = 4200;
        rainFilter.Q.value = 0.4;

        const rainHighpass = audioContext.createBiquadFilter();
        rainHighpass.type = "highpass";
        rainHighpass.frequency.value = 650;
        rainHighpass.Q.value = 0.2;

        const rainVolume = audioContext.createGain();
        rainVolume.gain.value = 0.075;

        rainSource
            .connect(rainHighpass)
            .connect(rainFilter)
            .connect(rainVolume)
            .connect(ambientGain);

        rainSource.start();
    }

    function startTheaterDrone() {
        if (!audioContext || droneOscillator) return;

        droneOscillator = audioContext.createOscillator();
        droneGain = audioContext.createGain();

        droneOscillator.type = "sine";
        droneOscillator.frequency.value = 58;

        droneGain.gain.value = 0.035;

        droneOscillator
            .connect(droneGain)
            .connect(ambientGain);

        droneOscillator.start();
    }

    function startAmbience() {
        if (!soundEnabled) return;

        startRain();
        startTheaterDrone();
        scheduleThunder();
    }

    function stopAmbience() {
        if (thunderTimer) {
            clearTimeout(thunderTimer);
            thunderTimer = null;
        }

        if (rainSource) {
            try {
                rainSource.stop();
            } catch (_) {}

            rainSource.disconnect();
            rainSource = null;
        }

        if (droneOscillator) {
            try {
                droneOscillator.stop();
            } catch (_) {}

            droneOscillator.disconnect();
            droneOscillator = null;
        }

        if (droneGain) {
            droneGain.disconnect();
            droneGain = null;
        }

        rainFilter = null;
    }

    function playTone(
        frequency,
        duration = 0.12,
        type = "sine",
        volume = 0.08,
        delay = 0
    ) {
        if (!soundEnabled || !audioContext || !masterGain) return;

        const startTime = audioContext.currentTime + delay;

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(
            frequency,
            startTime
        );

        gain.gain.setValueAtTime(0.0001, startTime);

        gain.gain.exponentialRampToValueAtTime(
            Math.max(volume, 0.001),
            startTime + 0.015
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            startTime + duration
        );

        oscillator.connect(gain);
        gain.connect(masterGain);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration + 0.03);
    }

    function playClick() {
        playTone(520, 0.07, "sine", 0.045);
    }

    function playClue() {
        playTone(660, 0.11, "sine", 0.055);
        playTone(880, 0.16, "sine", 0.04, 0.07);
    }

    function playPuzzleClick() {
        playTone(360, 0.08, "square", 0.035);
    }

    function playSuccess() {
        playTone(523.25, 0.16, "sine", 0.07);
        playTone(659.25, 0.16, "sine", 0.065, 0.12);
        playTone(783.99, 0.24, "sine", 0.07, 0.24);
        playTone(1046.5, 0.35, "sine", 0.055, 0.4);
    }

    function playWrong() {
        playTone(240, 0.18, "sawtooth", 0.05);
        playTone(180, 0.24, "sawtooth", 0.045, 0.12);
    }

    function playLetter() {
        playTone(392, 0.15, "sine", 0.05);
        playTone(523.25, 0.18, "sine", 0.055, 0.11);
        playTone(659.25, 0.25, "sine", 0.045, 0.24);
    }

    function playUnlock() {
        playTone(293.66, 0.15, "triangle", 0.055);
        playTone(369.99, 0.16, "triangle", 0.05, 0.11);
        playTone(440, 0.2, "triangle", 0.055, 0.22);
        playTone(587.33, 0.32, "triangle", 0.05, 0.38);
    }

    function playFinale() {
        const notes = [
            [392, 0],
            [440, 0.16],
            [523.25, 0.32],
            [659.25, 0.50],
            [783.99, 0.70],
            [659.25, 0.92],
            [783.99, 1.12],
            [1046.5, 1.38]
        ];

        notes.forEach(([frequency, delay], index) => {
            playTone(
                frequency,
                index === notes.length - 1 ? 0.65 : 0.24,
                "sine",
                0.065,
                delay
            );
        });
    }

    function playThunder() {
        if (!soundEnabled || !audioContext || !masterGain) return;

        const now = audioContext.currentTime;

        const thunderNoise = audioContext.createBufferSource();
        thunderNoise.buffer = createNoiseBuffer(2.5);

        const lowpass = audioContext.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 950;
        lowpass.Q.value = 0.5;

        const thunderGain = audioContext.createGain();

        thunderGain.gain.setValueAtTime(0.0001, now);

        thunderGain.gain.exponentialRampToValueAtTime(
            0.13,
            now + 0.12
        );

        thunderGain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 2.3
        );

        thunderNoise
            .connect(lowpass)
            .connect(thunderGain)
            .connect(masterGain);

        thunderNoise.start(now);
        thunderNoise.stop(now + 2.4);

        const rumble = audioContext.createOscillator();
        const rumbleGain = audioContext.createGain();

        rumble.type = "sine";
        rumble.frequency.setValueAtTime(48, now);
        rumble.frequency.exponentialRampToValueAtTime(
            30,
            now + 2
        );

        rumbleGain.gain.setValueAtTime(0.0001, now);

        rumbleGain.gain.exponentialRampToValueAtTime(
            0.08,
            now + 0.15
        );

        rumbleGain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 2.2
        );

        rumble
            .connect(rumbleGain)
            .connect(masterGain);

        rumble.start(now);
        rumble.stop(now + 2.3);

        flashLightning();
    }

    function scheduleThunder() {
        if (!soundEnabled) return;

        const delay =
            Math.floor(Math.random() * 18000) + 9000;

        thunderTimer = setTimeout(() => {
            if (soundEnabled) {
                playThunder();
                scheduleThunder();
            }
        }, delay);
    }

    function flashLightning() {
        const lightning = document.querySelector(".lightning");

        if (!lightning) return;

        lightning.style.opacity = "1";

        setTimeout(() => {
            lightning.style.opacity = "";
        }, 120);

        setTimeout(() => {
            lightning.style.opacity = "0.15";
        }, 180);

        setTimeout(() => {
            lightning.style.opacity = "";
        }, 280);
    }

    function updateButton() {
        const button = getSoundButton();

        if (!button) return;

        button.textContent = soundEnabled
            ? SOUND_TEXT_ON
            : SOUND_TEXT_OFF;

        button.setAttribute(
            "aria-pressed",
            String(soundEnabled)
        );

        button.title = soundEnabled
            ? "Turn sound off"
            : "Turn sound on";
    }

    async function toggleFinalActSound() {
        if (!soundEnabled) {
            const ready = await resumeAudio();

            if (!ready) return;

            soundEnabled = true;
            updateButton();

            startAmbience();
            playUnlock();

            return;
        }

        soundEnabled = false;
        updateButton();
        stopAmbience();
    }

    function observeFeedback() {
        const feedbackElements = document.querySelectorAll(
            ".puzzle-feedback"
        );

        feedbackElements.forEach((element) => {
            let previousText = element.textContent.trim();

            const observer = new MutationObserver(() => {
                const currentText =
                    element.textContent.trim();

                if (!currentText || currentText === previousText) {
                    return;
                }

                previousText = currentText;

                if (!soundEnabled) return;

                const lower = currentText.toLowerCase();

                if (
                    lower.includes("correct") ||
                    lower.includes("unlocked") ||
                    lower.includes("success") ||
                    lower.includes("opened")
                ) {
                    playSuccess();
                } else if (
                    lower.includes("wrong") ||
                    lower.includes("incorrect") ||
                    lower.includes("try again")
                ) {
                    playWrong();
                }
            });

            observer.observe(element, {
                childList: true,
                subtree: true,
                characterData: true
            });
        });
    }

    function setupSoundEvents() {
        document.addEventListener("click", (event) => {
            const target = event.target;

            if (!target) return;

            if (
                target.closest(".nav-button") ||
                target.closest("#enter-button") ||
                target.closest("#replay-button") ||
                target.closest("#close-clue") ||
                target.closest("#close-letter")
            ) {
                playClick();
            }

            if (target.closest(".interactable")) {
                playClue();
            }

            if (target.closest(".letter-card")) {
                playLetter();
            }

            if (target.closest(".solve-button")) {
                playPuzzleClick();
            }

            if (target.closest("#modal-done")) {
                playSuccess();
            }

            if (target.closest("#letter-done")) {
                playLetter();
            }
        });

        const finaleRoom = document.getElementById("room-finale");

        if (finaleRoom) {
            const observer = new MutationObserver(() => {
                if (
                    soundEnabled &&
                    finaleRoom.classList.contains("active")
                ) {
                    playFinale();
                }
            });

            observer.observe(finaleRoom, {
                attributes: true,
                attributeFilter: ["class"]
            });
        }
    }

    function initializeSounds() {
        updateButton();
        setupSoundEvents();
        observeFeedback();
    }

    window.toggleFinalActSound = toggleFinalActSound;

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeSounds,
            { once: true }
        );
    } else {
        initializeSounds();
    }
})();
```
