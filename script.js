const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');

// Your ASCII Art
const banner = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

 ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓███████▓▒░░▒▓██████▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓████████▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
░▒▓█▓▒▒▓███▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒▒▓███▓▒░▒▓█▓▒░▒▓██████▓▒░    ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
 ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░ © 2026                                                                                                       
`;

const welcomeText = `
Welcome to my interactive web terminal.
For a list of available commands, type <span class="cmd">'help'</span>.
`;

const commands = {
    help: "Available commands: <br> - about<br> - projects<br> - contact<br> - clear",
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Zorin OS, Automotive Engineering.",
    contact: "Email: your-email@example.com<br>GitHub: github.com/IfeanYiGodsgift",
    projects: "Loading projects... <br> 1. Honda Accord OBD-II Reader <br> 2. Wellness App API <br> <br> Type 'open 1' to see details for the Honda Project."
};

// 1. Boot Sequence Logic
window.onload = function() {
    const inputLine = document.querySelector('.input-line');
    
    // Hide input during boot
    input.disabled = true;
    inputLine.style.display = 'none';
    
    printLine("Initialising kernel...");
    setTimeout(() => printLine("Loading user profile: IfeanYiGodsgift..."), 800);
    setTimeout(() => printLine("Mounting file systems..."), 1500);
    
    setTimeout(() => {
        output.innerHTML = ""; // Wipe screen
        
        // Render ASCII Art
        const pre = document.createElement("div");
        pre.className = "ascii-art";
        pre.innerText = banner;
        output.appendChild(pre);
        
        // Render Welcome Text
        printLine(welcomeText);
        
        // Reveal Input
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2200);
};

function printLine(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

// 2. Mirror Logic: Sync Hidden Input to Visible Span
input.addEventListener("input", function() {
    typeDisplay.textContent = input.value;
});

// 3. Command Logic
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = input.value.toLowerCase().trim();
        
        // Print the command line to history
        printLine(`<span class="prompt">guest@God'sGift-pc:~$</span> ${cmd}`);
        
        // Clear inputs
        input.value = ""; 
        typeDisplay.textContent = "";
        
        if (commands[cmd]) {
            printLine(commands[cmd]);
        } else if (cmd === 'clear') {
            output.innerHTML = ""; 
        } else if (cmd === 'open 1') {
            window.location.href = "project.html"; 
        } else {
            printLine(`Command not found: ${cmd}. Type 'help'.`);
        }
        
        // Keep focus
        input.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// Mobile Button Logic
function runCmd(cmd) {
    input.value = cmd;
    typeDisplay.textContent = cmd; // Update visual
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
}