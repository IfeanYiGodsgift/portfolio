// --- 1. DOM ELEMENTS (The parts of the HTML we need) ---
const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');
const inputLine = document.querySelector('.input-line');

// --- 2. DATA (The content) ---
const desktopBanner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░        ░░        ░░        ░
▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓▓      ▓▓▓  ▓▓▓   ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓  ▓▓▓▓
█  ████  ██  ████  ██  ████  ████████  ██  ████  █████  █████  ███████████  ████
██      ████      ███       ████      ████      ███        ██  ███████████  ████
                                                                                © 2026
`;

const mobileBanner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.


░█▀▀░█▀█░█▀▄░█▀▀░█▀▀░▀█▀░█▀▀░▀█▀
░█░█░█░█░█░█░▀▀█░█░█░░█░░█▀▀░░█░
░▀▀▀░▀▀▀░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀░░░░▀░© 2026
`;

const data = {
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Zorin OS, Automotive Engineering.",
    
    // UPDATED: Now uses clickable commands instead of just text
    contact: "Connect with me via:<br><br>" +
             "1. <span class='cmd-link glow' onclick=\"runCmd('linkedin')\">LinkedIn</span> (Godsgift Ifeanyi)<br>" +
             "2. <span class='cmd-link glow' onclick=\"runCmd('email')\">Email</span> (giftifeanyi2018@gmail.com)<br>" +
             "3. <span class='cmd-link glow' onclick=\"runCmd('github')\">GitHub</span> (IfeanYiGodsgift)",
    
    projects: `
    Loading source code repositories... <br><br>
    
    <span class="glow">1. HONDA OBD-II DIAGNOSTIC TOOL</span><br>
    <span class="subtle">Language: Python | Hardware: Raspberry Pi</span><br>
    A custom hardware/software solution to diagnose oil pressure issues on a 2006 Honda Accord.<br>
    Type <span class="cmd-link" onclick="runCmd('open 1')">'open 1'</span> to view details.<br><br>
    
    <span class="glow">2. UNIVERSITY GROUP BACKEND API</span><br>
    <span class="subtle">Language: Node.js | Focus: CI/CD & Auth</span><br>
    Backend architecture for a class project, featuring automated CI pipelines and secure staff authentication.<br>
    Type <span class="cmd-link" onclick="runCmd('open 2')">'open 2'</span> to view details.
    `,

    project_1: `
        <br>
        <span>PROJECT: HONDA_OBD_TOOL(1)</span><br>
        ----------------------------------------<br>
        <span class="subtle">PROBLEM:</span><br>
        My 2006 Honda Accord had intermittent low oil pressure. Commercial scanners were expensive and didn't log historical data.<br><br>
        <span class="subtle">SOLUTION:</span><br>
        Built a Python script running on a Raspberry Pi that interfaces with the ECU via an ELM327 adapter.<br><br>
        <span class="subtle">KEY FEATURES:</span><br>
        * Live reading of Oil Pressure & RPM sensors.<br>
        * Automated CSV logging for trend analysis.<br>
        * Custom error code implementation.<br><br>
        <span class="subtle">EVIDENCE:</span><br>
        <img src="https://placehold.co/600x400/000000/00ff00?text=Scan+of+Engine+Data" class="terminal-img"><br>
        <span class="subtle">[End of File]</span>
    `,

    project_2: `
        <br>
        <span>PROJECT: GROUP_CI_PIPELINE(1)</span><br>
        ----------------------------------------<br>
        <span class="subtle">ROLE:</span> Backend Developer<br><br>
        <span class="subtle">DESCRIPTION:</span><br>
        Designed the backend logic for a staff management system. My primary focus was automating deployment and securing user access.<br><br>
        <span class="subtle">TECHNICAL WINS:</span><br>
        * Built a GitHub Actions CI pipeline to run tests on every push.<br>
        * Implemented JWT Authentication for secure staff login.<br>
        * Optimized database queries for speed.<br><br>
        <span class="subtle">EVIDENCE:</span><br>
        <img src="https://placehold.co/600x400/000000/00ff00?text=CI+Pipeline+Log" class="terminal-img"><br>
        <span class="subtle">[End of File]</span>
    `
};

const helpOptions = [
    { cmd: "about", desc: "Who am I?" },
    { cmd: "projects", desc: "View my code" },
    { cmd: "contact", desc: "Hire me" },
    { cmd: "banner", desc: "Reprint header" },
    { cmd: "help", desc: "Run help"},
    { cmd: "clear", desc: "Wipe screen" }
];

// Variables to remember history
let commandHistory = [];
let historyIndex = -1;

// --- 3. BOOT SEQUENCE (Runs when page loads) ---
window.onload = function() {
    // 1. Hide the input while booting
    input.disabled = true;
    inputLine.style.display = 'none';

    // 2. Print boot messages with delays
    printToScreen("Initialising kernel...");
    
    setTimeout(function() {
        printToScreen("Loading user profile: GODSGIFT...");
    }, 600);

    setTimeout(function() {
        printToScreen("Mounting file systems...");
    }, 1200);

    // 3. Clear screen and show terminal
    setTimeout(function() {
        output.innerHTML = ""; // Clear screen
        printBanner();
        printToScreen("Welcome to my interactive web terminal.");
        printToScreen("For a list of available commands, type or click on <span class='cmd-link glow' onclick=\"runCmd('help')\">'help'</span>.");
        
        // Show input line and focus it
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2000);
};

// --- 4. MAIN LOGIC FUNCTIONS ---

// This function decides what to do based on the command
function processCommand(cmd) {
    // SWITCH STATEMENT: A simple way to check multiple values
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
        case 'open 2':
            printToScreen(data.project_2);
            break;
        case 'banner':
            printBanner();
            break;
        case 'clear':
            output.innerHTML = "";
            break;
        
        // --- NEW CONTACT COMMANDS ---
        case 'linkedin':
            printToScreen("Opening LinkedIn profile...");
            window.open("https://www.linkedin.com/in/godsgift-ifeanyi-094803299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank");
            break;
        case 'email':
            printToScreen("Opening mail client...");
            window.location.href = "mailto:giftifeanyi2018@gmail.com";
            break;
        case 'github':
            printToScreen("Opening GitHub profile...");
            window.open("https://github.com/IfeanYiGodsgift", "_blank");
            break;

        // --- EASTER EGGS ---
        case 'sudo':
            printToScreen("<span class='glow'>PERMISSION DENIED:</span> You are not an administrator. Nice try.");
            break;
        case 'matrix':
            printToScreen("Wake up, Neo... (The matrix effect is loading...)");
            break;
        case 'ls':
            printToScreen("index.html  style.css  script.js  secret_plans.txt");
            break;
        case 'cat secret_plans.txt':
            printToScreen("Plans: 1. Graduate. 2. Build Hypercar. 3. Rule the world.");
            break;
        case '':
            // Do nothing if empty
            break;
        default:
            printToScreen(`Command not found: ${cmd}. Type <span class="glow">'help'</span>.`);
            break;
    }
}

// This function creates the help menu using a Loop
function generateHelpMenu() {
    let menuHTML = "<br>";
    
    // FOR LOOP: Go through every item in the helpOptions list
    for (let i = 0; i < helpOptions.length; i = i + 1) {
        let item = helpOptions[i];
        // Add each item to the HTML string
        menuHTML += `<span class="cmd-link glow" onclick="runCmd('${item.cmd}')">${item.cmd}</span> <span class="subtle">- ${item.desc}</span><br><br>`;
    }
    
    printToScreen(menuHTML);
}

// This function adds text to the screen
function printToScreen(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
    // Scroll to the bottom
    window.scrollTo(0, document.body.scrollHeight);
}

// This function prints the ASCII art
function printBanner() {
    const pre = document.createElement("div");
    pre.className = "ascii-art";
    
    // CONDITION: Check screen width
    if (window.innerWidth < 768) {
        pre.innerText = mobileBanner;
    } else {
        pre.innerText = desktopBanner;
    }
    
    output.appendChild(pre);
}

// This function is called when a user clicks a link
function runCmd(cmd) {
    input.value = cmd;
    typeDisplay.textContent = cmd;
    handleEnter(); // Run the command directly
    input.blur();  // Hide keyboard on mobile
}

// --- 5. KEYBOARD HANDLING FUNCTIONS ---

function handleEnter() {
    // Get the value and clean it up (lowercase, remove spaces)
    let command = input.value.toLowerCase().trim();
    
    // Only save if it's not empty
    if (command !== "") {
        commandHistory.push(command);
        historyIndex = commandHistory.length; // Reset index to end
    }
    
    // Print what the user typed
    printToScreen(`<span class="prompt">guest@God'sGift-pc:~$</span> ${command}`);
    
    // Run the logic
    processCommand(command);
    
    // Clear inputs
    input.value = "";
    typeDisplay.textContent = "";
    window.scrollTo(0, document.body.scrollHeight);
}

function handleArrowUp() {
    // Only go back if we are not at the start
    if (historyIndex > 0) {
        historyIndex = historyIndex - 1; // Go back one
        input.value = commandHistory[historyIndex];
        typeDisplay.textContent = input.value;
    }
}

function handleArrowDown() {
    // Only go forward if we are not at the end
    if (historyIndex < commandHistory.length - 1) {
        historyIndex = historyIndex + 1; // Go forward one
        input.value = commandHistory[historyIndex];
        typeDisplay.textContent = input.value;
    } else {
        // If we are at the end, clear the line
        historyIndex = commandHistory.length;
        input.value = "";
        typeDisplay.textContent = "";
    }
}

// --- 6. EVENT LISTENERS (Waiting for user actions) ---

// Listen for key presses
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        handleEnter();
    } 
    else if (e.key === "ArrowUp") {
        e.preventDefault(); // Stop cursor from moving to start
        handleArrowUp();
    } 
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleArrowDown();
    }
});

// Sync the hidden input with the visible text
input.addEventListener("input", function() {
    typeDisplay.textContent = input.value;
    window.scrollTo(0, document.body.scrollHeight);
});

// Handle clicks on the background (Focus input unless clicking a link)
document.addEventListener('click', function(e) {
    // 1. Check if clicked on a Command Link
    if (e.target.closest('.cmd-link')) {
        return; // Do nothing
    }

    // 2. Check if clicked on a Button
    if (e.target.tagName === 'BUTTON') {
        return; // Do nothing
    }

    // 3. Otherwise, focus the input
    input.focus();
});