const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');
const inputLine = document.querySelector('.input-line');

// I am super proud of these banners, they are subject to change but i like the style
const desktopBanner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░        ░░        ░░        ░
▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓▓      ▓▓▓  ▓▓▓   ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓  ▓▓▓▓
█  ████  ██  ████  ██  ████  ████████  ██  ████  █████  █████  ███████████  ████
██      ████      ███       ████      ████      ███        ██  ███████████  ████
                                                                                © 2026
`;
// also i need a different one for mobile because it breaks and looks ugly if i use one that big on a small screen
const mobileBanner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.


░█▀▀░█▀█░█▀▄░█▀▀░█▀▀░▀█▀░█▀▀░▀█▀
░█░█░█░█░█░█░▀▀█░█░█░░█░░█▀▀░░█░
░▀▀▀░▀▀▀░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀░░░░▀░© 2026
`;

const data = {
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Linux systems, Server Management, and Automotive Engineering.",
    
    contact: "Connect with me via:<br><br>" +
             "1. <span class='cmd-link glow' onclick=\"runCmd('linkedin')\">LinkedIn</span> (Godsgift Ifeanyi)<br>" +
             "2. <span class='cmd-link glow' onclick=\"runCmd('email')\">Email</span> (giftifeanyi2018@gmail.com)<br>" +
             "3. <span class='cmd-link glow' onclick=\"runCmd('github')\">GitHub</span> (IfeanYiGodsgift)",
    
    projects: `
    Loading source code repositories... <br><br>
    
    <span class="glow">1. SNIPPET VAULT</span><br>
    <span class="subtle">Status: Live | Type: Web Application</span><br>
    A robust, full-stack personal code management tool designed to centralize and organize frequently used code blocks.<br>
    Type <span class="cmd-link" onclick="runCmd('open 1')">'open 1'</span> to view details.<br><br>
    
    <span class="glow">2. KOPYKAT</span><br>
    <span class="subtle">Status: Beta | Type: Cross-Platform App</span><br>
    A local network clipboard manager that syncs text between desktop and mobile instantly without the cloud.<br>
    Type <span class="cmd-link" onclick="runCmd('open 2')">'open 2'</span> to view details.<br><br>
    `,

    // PROJECT 1: SNIPPET VAULT
    project_1: `
        <br>
        <span>PROJECT: SNIPPET_VAULT(1)</span><br>
        ----------------------------------------<br>
        <span class="subtle">THE PROBLEM:</span><br>
        As a developer's codebase grows, valuable logic often gets buried in old repositories. I built Snippet Vault to solve "Code Fragmentation"—eliminating time wasted searching for specific utility functions.<br><br>
        
        <span class="subtle">THE SOLUTION:</span><br>
        * <span class="glow">Dynamic CRUD:</span> Create, Read, Update, Delete in real-time.<br>
        * <span class="glow">Intelligent Organization:</span> Multi-level tagging for Python, JS, C++, etc.<br>
        * <span class="glow">Search Engine:</span> Instant full-text search to locate logic instantly.<br><br>
        
        <span class="subtle">TECH STACK:</span><br>
        React.js, Node.js (Express), MongoDB Atlas, Vercel.<br><br>
        
        <span class="subtle">LINKS:</span><br>
        <a href="https://github.com/IfeanYiGodsgift/Snippet_Vault" target="_blank">[GitHub Repo]</a> &nbsp; <a href="https://snippet-vault-frontend.vercel.app/" target="_blank">[Live Site]</a><br><br>
        
        <span class="subtle">EVIDENCE:</span><br>
        <img src="snippet_vault.png" class="terminal-img"><br>
        <span class="subtle">[End of File]</span>
    `,

    // PROJECT 2: KOPYKAT
    project_2: `
        <br>
        <span>PROJECT: KOPYKAT(1)</span><br>
        ----------------------------------------<br>
        <span class="subtle">THE PROBLEM:</span><br>
        Moving text between a computer and phone is friction-heavy. I needed a solution that works instantly over a local network without requiring an internet connection or cloud login.<br><br>
        
        <span class="subtle">THE SOLUTION:</span><br>
        KopyKat turns your computer into a local clipboard server. It allows any device on the WiFi to push/pull text instantly.<br>
        * <span class="glow">Zero-Config:</span> Uses QR codes to pair devices.<br>
        * <span class="glow">Privacy-First:</span> Data never leaves your Local Area Network.<br><br>
        
        <span class="subtle">TECH STACK:</span><br>
        Electron, Node.js, Express, WebSockets.<br><br>
        
        <span class="subtle">DOWNLOAD INSTALLER:</span><br>
        Select your platform to download the app:<br>
        1. <span class="cmd-link glow" onclick="runCmd('download windows')">[Windows .exe]</span><br>
        2. <span class="cmd-link glow" onclick="runCmd('download linux')">[Linux .deb]</span><br><br>
        
        <span class="subtle">EVIDENCE:</span><br>
        <img src="kopykat.png" class="terminal-img"><br>
        <span class="subtle">[End of File]</span>
    `
    // Planned to use either group work or rextrack for project 3 but those dont have picture evidence so i have to use these 2.
};

const helpOptions = [
    { cmd: "about", desc: "Who am I?" },
    { cmd: "projects", desc: "View my code" },
    { cmd: "contact", desc: "Hire me" },
    { cmd: "banner", desc: "Reprint header" },
    { cmd: "help", desc: "Run help"},
    { cmd: "clear", desc: "Wipe screen" }
];

let commandHistory = [];
let historyIndex = -1;

// Boot Sequence
window.onload = function() {
    input.disabled = true;
    inputLine.style.display = 'none';

    printToScreen("Initialising kernel...");
    
    setTimeout(function() {
        printToScreen("Loading user profile: GODSGIFT...");
    }, 600);

    setTimeout(function() {
        printToScreen("Mounting file systems...");
    }, 1200);

    setTimeout(function() {
        output.innerHTML = ""; 
        printBanner();
        printToScreen("Welcome to my interactive web terminal.");
        printToScreen("For a list of available commands, type or click on <span class='cmd-link glow' onclick=\"runCmd('help')\">'help'</span>.");
        
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2000);
};

// Main Logic

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
        case 'download windows':
            printToScreen("<span class='glow'>INITIATING DOWNLOAD...</span>");
            printToScreen("INSTRUCTION: Double click the .exe to install. Allow any unsigned driver warnings (Self-Signed Certificate).");
            // Links directly to the file in root
            window.location.href = "kopykat_setup.exe";
            break;
        case 'download linux':
            printToScreen("<span class='glow'>INITIATING DOWNLOAD...</span>");
            printToScreen("INSTRUCTION: Open terminal in download folder and run: <br><span class='subtle'>sudo dpkg -i kopykat_linux.deb</span>");
            window.location.href = "kopykat_linux.deb";
            break;
        case 'banner':
            printBanner();
            break;
        case 'clear':
            output.innerHTML = "";
            break;
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

        //Easster eggs
        case 'sudo':
            printToScreen("<span class='glow'>PERMISSION DENIED:</span> You are not an administrator. Nice try.");
            break;
        case 'matrix':
            printToScreen("Wake up, Neo... (The matrix effect is loading...)");
            break;
        case 'ls':
            printToScreen("index.html  style.css  script.js  kopykat_setup.exe  kopykat_linux.deb");
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
    for (let i = 0; i < helpOptions.length; i = i + 1) {
        let item = helpOptions[i];
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
    if (window.innerWidth < 768) {
        pre.innerText = mobileBanner;
    } else {
        pre.innerText = desktopBanner;
    }
    output.appendChild(pre);
}

function runCmd(cmd) {
    input.value = cmd;
    typeDisplay.textContent = cmd;
    handleEnter(); 
    input.blur();  
}

// Keyboard handling functions to make it feel like a real terminal 

function handleEnter() {
    let command = input.value.toLowerCase().trim();
    if (command !== "") {
        commandHistory.push(command);
        historyIndex = commandHistory.length; 
    }
    printToScreen(`<span class="prompt">guest@God'sGift-pc:~$</span> ${command}`);//im still wondering if guest or visitor is better ill stick with guest for now
    processCommand(command);
    input.value = "";
    typeDisplay.textContent = "";
    window.scrollTo(0, document.body.scrollHeight);
}

function handleArrowUp() {
    if (historyIndex > 0) {
        historyIndex = historyIndex - 1; 
        input.value = commandHistory[historyIndex];
        typeDisplay.textContent = input.value;
    }
}

function handleArrowDown() {
    if (historyIndex < commandHistory.length - 1) {
        historyIndex = historyIndex + 1; 
        input.value = commandHistory[historyIndex];
        typeDisplay.textContent = input.value;
    } else {
        historyIndex = commandHistory.length;
        input.value = "";
        typeDisplay.textContent = "";
    }
}

// Event listeners 

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        handleEnter();
    } 
    else if (e.key === "ArrowUp") {
        e.preventDefault(); 
        handleArrowUp();
    } 
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleArrowDown();
    }
});

input.addEventListener("input", function() {
    typeDisplay.textContent = input.value;
    window.scrollTo(0, document.body.scrollHeight);
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.cmd-link')) {
        return; 
    }
    if (e.target.tagName === 'BUTTON') {
        return; 
    }
    input.focus();
});