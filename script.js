// --- DOM ELEMENTS ---
const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');
const inputLine = document.querySelector('.input-line');

// --- TERMINAL HISTORY STORAGE ---
let commandHistory = []; // Stores the commands
let historyIndex = -1;   // Tracks your position in the history

// --- DATA STORAGE ---
const bannerText = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░        ░░        ░░        ░
▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓▓      ▓▓▓  ▓▓▓   ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓  ▓▓▓▓
█  ████  ██  ████  ██  ████  ████████  ██  ████  █████  █████  ███████████  ████
██      ████      ███       ████      ████      ███        ██  ███████████  ████
                                                                                © 2026
`;

const data = {
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Zorin OS, Automotive Engineering.",
    contact: "Email: your-email@example.com<br>GitHub: github.com/IfeanYiGodsgift",
    projects: "Loading projects... <br><br> 1. Honda Accord OBD-II Reader <br> 2. Wellness App API <br> <br> Type <span class='glow'>'open 1'</span> to read the Honda Project documentation.",
    project_1: `
        <br>
        <span>HONDA_OBD_TOOL(1)</span>   User Manual<br>
        ----------------------------------------<br>
        <span class="subtle">DESCRIPTION:</span><br>
        A Python utility to read ECU data via OBD-II protocol. My 2006 Honda Accord was suffering from intermittent low oil pressure warnings, so I built this to read raw sensor data in real-time.<br><br>
        <span class="subtle">FEATURES:</span><br>
        * Real-time RPM and Oil Pressure monitoring<br>
        * Fault code (DTC) clearing<br>
        * CSV logging for historical analysis<br><br>
        <span class="subtle">TECH STACK:</span><br>
        Python, Pandas, Raspberry Pi, ELM327 Interface<br><br>
        <span class="subtle">STATUS:</span><br>
        [PLACEHOLDER] - Prototype complete.<br>
    `
};

const helpOptions = [
    { cmd: "about", desc: "Who is Ifeanyi?" },
    { cmd: "projects", desc: "View my coding portfolio" },
    { cmd: "contact", desc: "Get in touch" },
    { cmd: "banner", desc: "Display the header art" },
    { cmd: "clear", desc: "Clear the terminal" }
];

// --- BOOT SEQUENCE ---
window.onload = function() {
    bootTerminal();
};

function bootTerminal() {
    input.disabled = true;
    inputLine.style.display = 'none'; 

    printToScreen("Initialising kernel...");
    
    setTimeout(function() {
        printToScreen("Loading user profile: IfeanYiGodsgift...");
    }, 800);

    setTimeout(function() {
        printToScreen("Mounting file systems...");
    }, 1500);

    setTimeout(function() {
        output.innerHTML = "";
        printBanner();
        printToScreen("Welcome to my interactive web terminal.");
        printToScreen("For a list of available commands, type <span class='cmd glow'>'help'</span>.");
        
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2200);
}

// --- MAIN LOGIC ---

// 1. Listen for Keystrokes (Enter, ArrowUp, ArrowDown)
input.addEventListener("keydown", function(e) {
    
    // CASE 1: ENTER KEY (Execute Command)
    if (e.key === "Enter") {
        let command = input.value.toLowerCase().trim();
        
        // Save to History (if not empty)
        if (command !== "") {
            commandHistory.push(command);
            historyIndex = commandHistory.length; // Reset index to the end
        }

        printToScreen(`<span class="prompt">guest@God'sGift-pc:~$</span> ${command}`);
        processCommand(command);

        input.value = "";
        typeDisplay.textContent = "";
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    // CASE 2: ARROW UP (Go Back in History)
    else if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--; // Move index back
            input.value = commandHistory[historyIndex];
            typeDisplay.textContent = input.value; // Update visual mirror
            
            // Move cursor to end of line (optional specific browser fix)
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        }
        e.preventDefault(); // Stop default cursor behavior
    }
    
    // CASE 3: ARROW DOWN (Go Forward in History)
    else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++; // Move index forward
            input.value = commandHistory[historyIndex];
            typeDisplay.textContent = input.value;
        } else {
            // We are at the bottom, clear the input
            historyIndex = commandHistory.length;
            input.value = "";
            typeDisplay.textContent = "";
        }
        e.preventDefault();
    }
});

// 2. Mirror Typing (Sync Hidden Input to Visible Span)
input.addEventListener("input", function() {
    // This simple line usually fixes 99% of sync issues
    typeDisplay.textContent = input.value;
    
    // Mobile Chrome fix: Scroll to bottom while typing
    window.scrollTo(0, document.body.scrollHeight);
});

// 3. Keep Focus
document.addEventListener('click', function() {
    input.focus();
});

// --- FUNCTIONS ---

function processCommand(cmd) {
    switch (cmd) {
        case 'help':
            generateHelpMenu();
            break;
        case 'about':
            printToScreen(data.about);
            break;
        case 'contact':
            printToScreen(data.contact);
            break;
        case 'projects':
            printToScreen(data.projects);
            break;
        case 'open 1':
            printToScreen(data.project_1);
            break;
        case 'banner':
            printBanner();
            break;
        case 'clear':
            output.innerHTML = "";
            break;
        case '':
            break;
        default:
            printToScreen(`Command not found: ${cmd}. Type <span class="glow">'help'</span>.`);
            break;
    }
}

function generateHelpMenu() {
    let menuHTML = "";
    for (let i = 0; i < helpOptions.length; i++) {
        let item = helpOptions[i];
        menuHTML += `<span class="glow">${item.cmd}</span> <span class="subtle">- ${item.desc}</span><br><br>`;
    }
    printToScreen(menuHTML);
}

function printToScreen(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
}

function printBanner() {
    const pre = document.createElement("div");
    pre.className = "ascii-art";
    pre.innerText = bannerText;
    output.appendChild(pre);
}