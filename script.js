```javascript
/* =========================================================
   THE FINAL ACT
   CYBERWALL BIRTHDAY ESCAPE ROOM
   MASTER GAME SCRIPT
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const STORAGE_KEY = "theFinalActCyberwallProgress";

const ROOM_ORDER = [
    "lobby",
    "stage",
    "weather",
    "loki",
    "letters1",
    "letters2",
    "finale"
];

const ACT_NAMES = {
    lobby: "ACT I — THE LOBBY",
    stage: "ACT II — THE STAGE",
    weather: "ACT III — THE STORM",
    loki: "ACT IV — LOKI",
    letters1: "THE LETTERS — I",
    letters2: "THE LETTERS — II",
    finale: "THE FINAL ACT"
};


/* =========================================================
   15 BIRTHDAY LETTERS
========================================================= */

const letters = [

    {
        name: "Advert",
        role: "Public Rep",
        body: `
            <p>Ich feiere unser joyeux anniversaire ভাই</p>
        `,
        signoff: "-Advert"
    },


    {
        name: "Chaseuu",
        role: "Co Owner",
        body: `
            <p>
                Happy Birthday Cyber! I hope you have a great birthday
                and I am grateful for the honor to run Escalation along
                with you and to be ur friend even if we haven't met yet.
            </p>
        `,
        signoff: "-Chaseuu"
    },


    {
        name: "Graysen",
        role: "Senior Moderator",
        body: `
            <p>
                Merry bday cyber boy
            </p>

            <p>
                (please let me out of the basement)
            </p>
        `,
        signoff: "- Graysen"
    },


    {
        name: "Raven",
        role: "Moderator",
        body: `
            <p>
                HAPPY BIRTHDAY CYBERWALL!!!
            </p>

            <p>
                I hope you have an absolutely amazing birthday
                and get to spend it doing something that makes you happy!
            </p>
        `,
        signoff: "-𝓡𝓪𝓿𝓮𝓷"
    },


    {
        name: "Chicken",
        role: "Escalation Member",
        body: `
            <p>
                HAPPY BIRTHDAY LIL CYBER
            </p>
        `,
        signoff: "- Chicken"
    },


    {
        name: "Zariuswx",
        role: "Escalation Member",
        body: `
            <p>
                Happy birthday Cyberwall I wish you a great birthday,
                I also hope you get to have the best birthday dinner.
            </p>
        `,
        signoff: "- Zariuswx"
    },


    {
        name: "Volcanic Ash",
        role: "Escalation Edit Comp Winner",
        body: `
            <p>
                Joyeux anniversaire Cyberwall!
            </p>

            <p>
                Je te souhaite une excellente journée remplie de joie,
                de bonheur et de beaux moments.
            </p>
        `,
        signoff: "- ashmaker"
    },


    {
        name: "Cyber",
        role: "Senior Developer",
        body: `
            <p>
                Happy Birthday Cyberwall!
            </p>

            <p>
                I hope you have an amazing birthday and get to enjoy
                the day with the people who mean the most to you.
            </p>

            <p>
                Thank you for everything you do for the community and
                for all the work you put into Escalation.
            </p>
        `,
        signoff: "- Cyber"
    },


    {
        name: "justanuser3",
        role: "Administator",
        body: `
            <p>
                Happy birthday Cyberwall!
            </p>

            <p>
                Hope you have an amazing birthday and an even better year.
                You deserve a great day after everything you've done
                for Escalation.
            </p>

            <p>
                Also, Bayern Munich better win for your birthday.
            </p>
        `,
        signoff: "- justanuser3"
    },


    {
        name: "KINGbananaMan3",
        role: "Head Developer",
        body: `
            <p>
                Happy birthday Cyberman sam,
                can i come to your party pretty please
            </p>
        `,
        signoff: "- KINGbananaMan3"
    },


    {
        name: "DADAMAN",
        role: "Special Member",
        body: `
            <p>
                HAPPY BIRTHDAY CYBERWALL!!!!!!!
            </p>

            <p>
                I HOPE YOU HAVE THE BEST BIRTHDAY EVER!!!
                YOU ARE AN ABSOLUTE LEGEND AND I HOPE YOU GET
                EVERYTHING YOU WANT!!!
            </p>

            <p>
                HAVE AN AMAZING DAY CYBER!!!
            </p>
        `,
        signoff: "- YOUR BFF DADAMAN"
    },


    {
        name: "Mystery Staff Member",
        role: "N/A — Is in Staff though",
        body: `
            <p>
                Dear mr cyberballs,
            </p>

            <p>
                Happy birthday! I hope you have an amazing day and
                get to spend it with the people you care about.
            </p>

            <p>
                You've done a lot for Escalation and the people around
                you, and I hope you know that it doesn't go unnoticed.
            </p>

            <p>
                Keep being the weird little storm nerd that you are,
                and don't let anyone take that away from you.
            </p>

            <p>
                There is only one question left...
            </p>
        `,
        signoff: "Figure it out Cyber"
    },


    {
        name: "Peachybabo",
        role: "Moderator",
        body: `
            <p>
                Happy Birthday Cyberwall!
            </p>

            <p>
                I hope you know how much the people around you
                appreciate everything you do. Escalation isn't just
                a game or a community — it's something you've helped
                turn into a place where people can create, meet others,
                and share something they genuinely enjoy.
            </p>

            <p>
                You've put time, effort, and heart into what you've
                built, and that means something.
            </p>

            <p>
                As Eleanor Roosevelt said:
                “The future belongs to those who believe in the beauty
                of their dreams.”
            </p>

            <p>
                Keep dreaming, keep creating, and keep building.
                Happy birthday!
            </p>
        `,
        signoff: "- Peachybabo"
    },


    {
        name: "KYB3RRX",
        role: "Senior Moderator",
        body: `
            <p>
                Happy birthday Cyberwall!
            </p>

            <p>
                I hope you have a wonderful birthday and get to enjoy
                the day with everyone who cares about you.
            </p>

            <p>
                Thank you for everything you've done for the community
                and for giving everyone a place to enjoy Escalation.
            </p>
        `,
        signoff: "-KYB3RRX"
    },


    {
        name: "Spyshark4",
        role: "Moderator",
        body: `
            <p>
                Happy birthday Cyberwall!
            </p>

            <p>
                I hope you have an amazing birthday and get plenty
                of opportunities to do what you love.
            </p>

            <p>
                Here's to another year of Escalation, storms,
                tornadoes, and probably way too many weather jokes.
            </p>

            <p>
                Have a great birthday!
            </p>
        `,
        signoff: "-Spyshark4"
    }

];


/* =========================================================
   GAME STATE
========================================================= */

let state = {
    unlocked: ["lobby"],
    completed: [],
    readLetters: []
};

let currentRoom = "lobby";

let toastTimer = null;


/* =========================================================
   DOM HELPERS
========================================================= */

function get(id) {
    return document.getElementById(id);
}

function query(selector) {
    return document.querySelector(selector);
}

function queryAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}


/* =========================================================
   STATE MANAGEMENT
========================================================= */

function loadState() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        const parsed = JSON.parse(saved);

        if (!parsed || typeof parsed !== "object") {
            return;
        }

        if (Array.isArray(parsed.unlocked)) {
            state.unlocked = parsed.unlocked;
        }

        if (Array.isArray(parsed.completed)) {
            state.completed = parsed.completed;
        }

        if (Array.isArray(parsed.readLetters)) {
            state.readLetters = parsed.readLetters;
        }

    } catch (error) {

        console.warn(
            "Could not load saved Final Act progress.",
            error
        );

    }
}


function saveState() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );

    } catch (error) {

        console.warn(
            "Could not save Final Act progress.",
            error
        );

    }
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast = get("toast");
    const toastMessage = get("toast-message");

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showOpening() {

    const opening = get("opening-screen");
    const game = get("game-screen");

    if (!opening || !game) {
        return;
    }

    game.classList.remove("active");
    opening.classList.add("active");
}


function showGame() {

    const opening = get("opening-screen");
    const game = get("game-screen");

    if (!opening || !game) {
        return;
    }

    opening.classList.remove("active");
    game.classList.add("active");

    showRoom(currentRoom);
}


/* =========================================================
   ROOM MANAGEMENT
========================================================= */

function showRoom(roomName) {

    if (!ROOM_ORDER.includes(roomName)) {
        return;
    }

    if (!state.unlocked.includes(roomName)) {

        showToast(
            "This part of the theater is still locked."
        );

        return;
    }

    currentRoom = roomName;

    queryAll(".room").forEach(room => {
        room.classList.remove("active");
    });

    const targetRoom = get(`room-${roomName}`);

    if (targetRoom) {
        targetRoom.classList.add("active");
    }

    updateNavigation();
    updateRoomHeader();
    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {

    queryAll(".nav-button").forEach(button => {

        const roomName = button.dataset.room;

        const unlocked =
            state.unlocked.includes(roomName);

        const active =
            roomName === currentRoom;

        button.disabled = !unlocked;

        button.classList.toggle(
            "locked",
            !unlocked
        );

        button.classList.toggle(
            "active",
            active
        );

        const lock = button.querySelector(".lock");

        if (lock) {
            lock.textContent = unlocked ? "" : "🔒";
        }

    });
}


/* =========================================================
   ROOM HEADER
========================================================= */

function updateRoomHeader() {

    const roomAct = get("room-act");

    if (!roomAct) {
        return;
    }

    roomAct.textContent =
        ACT_NAMES[currentRoom] || "THE FINAL ACT";
}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const progressText = get("progress-text");
    const progressBar = get("progress-bar");

    if (!progressText || !progressBar) {
        return;
    }

    const completedActs =
        state.completed.filter(room =>
            ["lobby", "stage", "weather", "loki"]
                .includes(room)
        ).length;

    const percentage =
        (completedActs / 4) * 100;

    progressText.textContent =
        `${completedActs} / 4 ACTS`;

    progressBar.style.width =
        `${percentage}%`;
}


/* =========================================================
   UNLOCKING
========================================================= */

function unlockRoom(roomName) {

    if (!ROOM_ORDER.includes(roomName)) {
        return;
    }

    if (!state.unlocked.includes(roomName)) {
        state.unlocked.push(roomName);
    }

    saveState();
    updateNavigation();

    showToast(
        `${ACT_NAMES[roomName]} has been unlocked.`
    );
}


function completeAct(roomName, nextRoom) {

    if (!state.completed.includes(roomName)) {

        state.completed.push(roomName);

    }

    if (nextRoom) {
        unlockRoom(nextRoom);
    }

    saveState();
    updateProgress();
}


/* =========================================================
   CLUES
========================================================= */

const clues = {

    radio: {
        title: "THE RADIO",
        text: `
            The radio is almost completely silent.

            <br><br>

            Then, through the static, one word comes through:

            <br><br>

            <strong>OPEN.</strong>

            <br><br>

            The signal disappears.
        `
    },


    poster: {
        title: "THE POSTER",
        text: `
            An old theater poster reads:

            <br><br>

            <em>
                "Every story begins when the curtain opens."
            </em>

            <br><br>

            Someone has circled the word
            <strong>OPEN</strong>.
        `
    },


    symbol: {
        title: "THE SYMBOL",
        text: `
            Beneath the strange symbol are three tiny letters:

            <br><br>

            <strong>O — P — E — N</strong>

            <br><br>

            Whatever this theater is hiding,
            it wants you to begin.
        `
    }

};


/* =========================================================
   CLUE MODAL
========================================================= */

function openClue(clueName) {

    const clue = clues[clueName];

    if (!clue) {
        return;
    }

    const modal = get("clue-modal");
    const title = get("modal-title");
    const text = get("modal-text");

    if (!modal || !title || !text) {
        return;
    }

    title.textContent = clue.title;
    text.innerHTML = clue.text;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}


function closeClue() {

    const modal = get("clue-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}


/* =========================================================
   LETTER MODAL
========================================================= */

function openLetter(index) {

    const letter = letters[index];

    if (!letter) {
        return;
    }

    const modal = get("letter-modal");
    const name = get("letter-name");
    const body = get("letter-body");
    const signoff = get("letter-signoff");

    if (!modal || !name || !body || !signoff) {
        return;
    }

    name.textContent = letter.name;

    body.innerHTML = letter.body;

    signoff.textContent = letter.signoff;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    if (!state.readLetters.includes(index)) {

        state.readLetters.push(index);

        saveState();

        renderLetters();
        checkLetterCompletion();
    }
}


function closeLetter() {

    const modal = get("letter-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}


/* =========================================================
   LETTER RENDERING
========================================================= */

function createLetterCard(letter, index) {

    const card = document.createElement("button");

    card.type = "button";

    card.className = "letter-card";

    card.dataset.letterIndex = String(index);

    if (state.readLetters.includes(index)) {
        card.classList.add("read");
    }

    card.innerHTML = `
        <span>
            <span class="envelope">✉</span>

            <strong>
                ${escapeHTML(letter.name)}
            </strong>

            <small>
                ${escapeHTML(letter.role)}
            </small>
        </span>

        <small>
            OPEN MESSAGE →
        </small>
    `;

    return card;
}


function renderLetters() {

    const firstGrid = get("letters-grid-1");
    const secondGrid = get("letters-grid-2");

    if (!firstGrid || !secondGrid) {
        return;
    }

    firstGrid.innerHTML = "";
    secondGrid.innerHTML = "";

    letters.forEach((letter, index) => {

        const card =
            createLetterCard(letter, index);

        if (index < 8) {

            firstGrid.appendChild(card);

        } else {

            secondGrid.appendChild(card);

        }

    });
}


/* =========================================================
   LETTER COMPLETION
========================================================= */

function checkLetterCompletion() {

    if (state.readLetters.length < letters.length) {
        return;
    }

    unlockRoom("finale");

    showToast(
        "Every letter has been read. The final act awaits."
    );
}


/* =========================================================
   PUZZLES
========================================================= */

const puzzleAnswers = {

    lobby: [
        "open",
        "opened"
    ],

    stage: [
        "green"
    ],

    weather: [
        "314",
        "3-1-4",
        "3 1 4"
    ],

    loki: [
        "illusion",
        "a lie",
        "lie",
        "deception"
    ]

};


function normalizeAnswer(value) {

    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


function solvePuzzle(puzzleName) {

    const input = get(`answer-${puzzleName}`);
    const feedback = get(`feedback-${puzzleName}`);

    if (!input || !feedback) {
        return;
    }

    const answer =
        normalizeAnswer(input.value);

    const accepted =
        puzzleAnswers[puzzleName] || [];

    const correct =
        accepted.includes(answer);

    const panel =
        input.closest(".puzzle-panel");

    if (!answer) {

        feedback.textContent =
            "Enter an answer first.";

        feedback.classList.add("error");

        return;
    }


    if (!correct) {

        feedback.textContent =
            "That doesn't seem to open the lock.";

        feedback.classList.add("error");

        if (panel) {
            panel.classList.remove("success");
            panel.classList.add("error");

            setTimeout(() => {
                panel.classList.remove("error");
            }, 300);
        }

        return;
    }


    feedback.textContent =
        "LOCK OPENED.";

    feedback.classList.remove("error");

    if (panel) {
        panel.classList.add("success");
    }


    if (!state.completed.includes(puzzleName)) {

        state.completed.push(puzzleName);

    }


    const nextRoom = {

        lobby: "stage",
        stage: "weather",
        weather: "loki",
        loki: "letters1"

    }[puzzleName];


    if (nextRoom) {

        unlockRoom(nextRoom);

    }


    if (puzzleName === "loki") {

        unlockRoom("letters1");
        unlockRoom("letters2");

    }


    saveState();
    updateProgress();


    setTimeout(() => {

        if (nextRoom) {
            showRoom(nextRoom);
        }

    }, 700);
}


/* =========================================================
   ENTER THEATER
========================================================= */

function enterTheater() {

    showGame();

    showToast(
        "Welcome to The Final Act."
    );
}


/* =========================================================
   HOME
========================================================= */

function goHome() {

    showOpening();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   REPLAY
========================================================= */

function replayExperience() {

    const confirmed =
        window.confirm(
            "Replay The Final Act from the beginning?\n\nYour saved puzzle and letter progress will be erased."
        );

    if (!confirmed) {
        return;
    }

    state = {
        unlocked: ["lobby"],
        completed: [],
        readLetters: []
    };

    currentRoom = "lobby";

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.warn(
            "Could not clear saved progress.",
            error
        );
    }

    queryAll(".puzzle-feedback").forEach(feedback => {
        feedback.textContent = "";
        feedback.classList.remove("error");
    });

    queryAll(".puzzle-panel").forEach(panel => {
        panel.classList.remove("success", "error");
    });

    queryAll(".answer-area input").forEach(input => {
        input.value = "";
    });

    renderLetters();
    updateNavigation();
    updateProgress();

    showGame();
    showRoom("lobby");

    showToast(
        "The Final Act has been reset."
    );
}


/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

function setupKeyboard() {

    queryAll(".answer-area input").forEach(input => {

        input.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Enter") {
                    return;
                }

                const puzzle =
                    input.id.replace(
                        "answer-",
                        ""
                    );

                solvePuzzle(puzzle);
            }
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            closeClue();
            closeLetter();

        }
    );

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEvents() {


    /* ENTER */

    const enterButton =
        get("enter-button");

    if (enterButton) {

        enterButton.addEventListener(
            "click",
            enterTheater
        );

    }


    /* HOME */

    queryAll(".home-link").forEach(button => {

        button.addEventListener(
            "click",
            goHome
        );

    });


    /* REPLAY */

    const replayButton =
        get("replay-button");

    if (replayButton) {

        replayButton.addEventListener(
            "click",
            replayExperience
        );

    }


    /* NAVIGATION */

    queryAll(".nav-button").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const room =
                    button.dataset.room;

                if (room) {
                    showRoom(room);
                }

            }
        );

    });


    /* CLUES */

    queryAll(".interactable").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const clue =
                    button.dataset.clue;

                if (clue) {
                    openClue(clue);
                }

            }
        );

    });


    /* PUZZLES */

    queryAll(".solve-button").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const puzzle =
                    button.dataset.puzzle;

                if (puzzle) {
                    solvePuzzle(puzzle);
                }

            }
        );

    });


    /* LETTERS */

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(".letter-card");

            if (!card) {
                return;
            }

            const index =
                Number(card.dataset.letterIndex);

            if (Number.isInteger(index)) {
                openLetter(index);
            }

        }
    );


    /* CLUE CLOSE BUTTON */

    const closeClueButton =
        get("close-clue");

    if (closeClueButton) {

        closeClueButton.addEventListener(
            "click",
            closeClue
        );

    }


    const modalDone =
        get("modal-done");

    if (modalDone) {

        modalDone.addEventListener(
            "click",
            closeClue
        );

    }


    /* LETTER CLOSE BUTTON */

    const closeLetterButton =
        get("close-letter");

    if (closeLetterButton) {

        closeLetterButton.addEventListener(
            "click",
            closeLetter
        );

    }


    const letterDone =
        get("letter-done");

    if (letterDone) {

        letterDone.addEventListener(
            "click",
            closeLetter
        );

    }


    /* MODAL BACKDROPS */

    queryAll(
        "[data-close-modal]"
    ).forEach(backdrop => {

        backdrop.addEventListener(
            "click",
            () => {

                const modalType =
                    backdrop.dataset.closeModal;

                if (modalType === "clue") {
                    closeClue();
                }

                if (modalType === "letter") {
                    closeLetter();
                }

            }
        );

    });


    /* SOUND BUTTON */

    const soundButton =
        get("sound-button");

    if (soundButton) {

        soundButton.addEventListener(
            "click",
            () => {

                /*
                 * sounds.js takes over the actual sound system.
                 * This event exists only as a safe fallback.
                 */

                if (
                    typeof window.toggleFinalActSound ===
                    "function"
                ) {

                    window.toggleFinalActSound();

                }

            }
        );

    }

}


/* =========================================================
   INITIALIZATION
========================================================= */

function initialize() {

    loadState();

    /*
     * Always make sure the lobby exists.
     */

    if (!state.unlocked.includes("lobby")) {
        state.unlocked.unshift("lobby");
    }


    /*
     * If Loki was already solved, make sure both
     * letter rooms remain unlocked.
     */

    if (state.completed.includes("loki")) {

        if (!state.unlocked.includes("letters1")) {
            state.unlocked.push("letters1");
        }

        if (!state.unlocked.includes("letters2")) {
            state.unlocked.push("letters2");
        }

    }


    /*
     * If all letters were already read, keep finale unlocked.
     */

    if (state.readLetters.length >= letters.length) {

        if (!state.unlocked.includes("finale")) {
            state.unlocked.push("finale");
        }

    }


    saveState();

    renderLetters();

    updateNavigation();

    updateRoomHeader();

    updateProgress();

    setupEvents();

    setupKeyboard();

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initialize
    );

} else {

    initialize();

}
```
