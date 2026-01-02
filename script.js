// --- DOM ELEMENTS ---
const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');
const inputLine = document.querySelector('.input-line');

// --- ASSETS (Banners) ---
const desktopBanner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░        ░░        ░░        ░
▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓▓      ▓▓▓  ▓▓▓   ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓  ▓▓▓▓
█  ████  ██  ████  ██  ████  ████████  ██  ████  █████  █████  ███████████  ████
██      ████      ███       ████      ████      ███        ██  ███████████  ████
                                                                                © 2026
`;

// A smaller banner that fits on mobile screens
const mobileBanner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░        ░░        ░░        ░
▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓▓      ▓▓▓  ▓▓▓   ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓  ▓▓▓▓
█  ████  ██  ████  ██  ████  ████████  ██  ████  █████  █████  ███████████  ████
██      ████      ███       ████      ████      ███        ██  ███████████  ████
                                                                                © 2026
`;

// --- DATA STORE (Real Projects + Images) ---
const data = {
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Zorin OS, Automotive Engineering.",
    
    contact: "Email: your-email@example.com<br>GitHub: github.com/IfeanYiGodsgift<br>LinkedIn: linkedin.com/in/ifeanyi",
    
    // The Main Projects List
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

    // Project 1 Details (Honda)
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

    // Project 2 Details (Backend)
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
    { cmd: "clear", desc: "Wipe screen" }
];

// --- HISTORY LOGIC ---
let commandHistory = [];
let historyIndex = -1;

// --- BOOT SEQUENCE ---
window.onload = function() {
    input.disabled = true;
    inputLine.style.display = 'none';

    printToScreen("Initialising kernel...");
    setTimeout(() => printToScreen("Loading user profile: IfeanYiGodsgift..."), 600);
    setTimeout(() => printToScreen("Mounting file systems..."), 1200);

    setTimeout(() => {
        output.innerHTML = "";
        printBanner(); // Now smart enough to pick mobile vs desktop
        printToScreen("Welcome to my interactive web terminal.");
        printToScreen("For a list of available commands, type <span class='cmd glow'>'help'</span>.");
        
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2000);
};

// --- MAIN FUNCTIONS ---

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
        case 'open 2':
            printToScreen(data.project_2);
            break;
        case 'banner':
            printBanner();
            break;
        case 'clear':
            output.innerHTML = "";
            break;
        
        // --- EASTER EGGS ---
        case 'sudo':
            printToScreen("<span class='glow'>PERMISSION DENIED:</span> You are not an administrator. Nice try.");
            break;
        case 'matrix':
            printToScreen("Wake up, Neo... (The matrix effect is loading...)");
            // You can add a real effect here later if we have time
            break;
        case 'ls':
            printToScreen("index.html  style.css  script.js  secret_plans.txt");
            break;
        case 'cat secret_plans.txt':
            printToScreen("Plans: 1. Graduate. 2. Build Hypercar. 3. Rule the world.");
            break;
            
        case '':
            break;
        default:
            printToScreen(`Command not found: ${cmd}. Type <span class="glow">'help'</span>.`);
            break;
    }
}

function generateHelpMenu() {
    let menuHTML = "<br>";
    for (let i = 0; i < helpOptions.length; i++) {
        let item = helpOptions[i];
        // MADE CLICKABLE for Mobile Users!
        menuHTML += `<span class="cmd-link glow" onclick="runCmd('${item.cmd}')">${item.cmd}</span> <span class="subtle">- ${item.desc}</span><br><br>`;
    }
    printToScreen(menuHTML);
}

function printToScreen(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

function printBanner() {
    const pre = document.createElement("div");
    pre.className = "ascii-art";
    // Check screen width to decide which banner to show
    if (window.innerWidth < 768) {
        pre.innerText = mobileBanner;
    } else {
        pre.innerText = desktopBanner;
    }
    output.appendChild(pre);
}

// Mobile/Click Helper
function runCmd(cmd) {
    input.value = cmd;
    typeDisplay.textContent = cmd;
    // Trigger Enter
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
}

// Input Event Listeners
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let command = input.value.toLowerCase().trim();
        if (command !== "") {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
        printToScreen(`<span class="prompt">guest@God'sGift-pc:~$</span> ${command}`);
        processCommand(command);
        input.value = "";
        typeDisplay.textContent = "";
        window.scrollTo(0, document.body.scrollHeight);
    } else if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
            typeDisplay.textContent = input.value;
        }
        e.preventDefault();
    } else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
            typeDisplay.textContent = input.value;
        } else {
            historyIndex = commandHistory.length;
            input.value = "";
            typeDisplay.textContent = "";
        }
        e.preventDefault();
    }
});

input.addEventListener("input", function() {
    typeDisplay.textContent = input.value;
    window.scrollTo(0, document.body.scrollHeight);
});

document.addEventListener('click', function() {
    input.focus();
});