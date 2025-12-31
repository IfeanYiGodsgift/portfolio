const output = document.getElementById('output');
const input = document.getElementById('cmd-input');

// 1. PASTE YOUR ASCII ART HERE BETWEEN THE BACKTICKS
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

// 2. The Boot Sequence Logic
window.onload = function() {
    // Disable input during boot
    input.disabled = true;
    
    // Step 1: Boot text
    printLine("Initialising kernel...");
    setTimeout(() => printLine("Loading user profile: IfeanYiGodsgift..."), 600);
    setTimeout(() => printLine("Mounting file systems..."), 1200);
    
    // Step 2: The Wipe & Banner Load
    setTimeout(() => {
        // Clear screen
        output.innerHTML = "";
        
        // Print ASCII Banner (using <pre> tag to keep format)
        const pre = document.createElement("div");
        pre.className = "ascii-art";
        pre.innerText = banner;
        output.appendChild(pre);
        
        // Print Welcome Text
        printLine(welcomeText);
        
        // Enable input
        input.disabled = false;
        input.focus();
    }, 2200); // Happens 2.2 seconds after load
};

function printLine(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = input.value.toLowerCase().trim();
        input.value = ""; 
        
        // Print the command the user typed
        printLine(`<span class="prompt">\nguest@ifeanyi-pc:~$</span> ${cmd}`);
        
        if (commands[cmd]) {
            printLine(commands[cmd]);
        } else if (cmd === 'clear') {
            // Restore the banner after clear? Or total clear?
            // "Total clear" is standard terminal behavior
            output.innerHTML = "";
        } else if (cmd === 'open 1') {
            window.location.href = "project.html"; 
        } else {
            printLine(`Command not found: ${cmd}. Type 'help'.`);
        }
    }
});

function runCmd(cmd) {
    input.value = cmd;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
}