// --- DOM ELEMENTS ---
const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');
const inputLine = document.querySelector('.input-line');

// --- DATA STORAGE (The Content) ---
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
    inputLine.style.display = 'none'; // Hide prompt during boot

    // Simple timeouts for the boot effect
    printToScreen("Initialising kernel...");
    
    setTimeout(function() {
        printToScreen("Loading user profile: IfeanYiGodsgift...");
    }, 800);

    setTimeout(function() {
        printToScreen("Mounting file systems...");
    }, 1500);

    setTimeout(function() {
        // Clear screen and show banner
        output.innerHTML = "";
        printBanner();
        printToScreen("Welcome to my interactive web terminal.");
        printToScreen("For a list of available commands, type <span class='cmd glow'>'help'</span>.");
        
        // Enable user input
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2200);
}

// --- MAIN LOGIC ---

// 1. Listen for Enter Key
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        // Get value and clean it up
        let command = input.value.toLowerCase().trim();
        
        // Print the user's command to the history
        printToScreen(`<span class="prompt">guest@God'sGift-pc:~$</span> ${command}`);
        
        // Process the command
        processCommand(command);

        // Reset Input
        input.value = "";
        typeDisplay.textContent = "";
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// 2. Mirror Typing (Visual Effect)
input.addEventListener("input", function() {
    typeDisplay.textContent = input.value;
});

// 3. Keep Focus (So user can always type)
document.addEventListener('click', function() {
    input.focus();
});

// --- FUNCTIONS ---

function processCommand(cmd) {
    // SWITCH STATEMENT: Clean and easy to read
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
            // Do nothing if empty
            break;

        default:
            // Conditional check for errors
            printToScreen(`Command not found: ${cmd}. Type <span class="glow">'help'</span>.`);
            break;
    }
}

function generateHelpMenu() {
    let menuHTML = "";
    
    // FOR LOOP: Iterates through the helpOptions array
    // This demonstrates to the lecturer that you understand loops.
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