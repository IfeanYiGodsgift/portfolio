const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const typeDisplay = document.getElementById('type-display');

// ASCII Art (Stored in a function so we can reuse it for the 'banner' command)
const bannerText = `
IfeanYiGodsgift (IG) Not A Corporation. All rights reserved.

░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░        ░░        ░░        ░
▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓▓      ▓▓▓  ▓▓▓   ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓▓▓  ▓▓▓▓
█  ████  ██  ████  ██  ████  ████████  ██  ████  █████  █████  ███████████  ████
██      ████      ███       ████      ████      ███        ██  ███████████  ████
                                                                                © 2026                                                                                                       
`;

// 1. Updated Welcome Text with GLOW effect
const welcomeText = `
Welcome to my interactive web terminal.
For a list of available commands, type <span class="cmd glow">'help'</span>.
`;

// 2. Updated Commands with Spacing, Glow, and Descriptions
const commands = {
    help: `
    <span class="glow">about</span> <span class="subtle">- Who is Ifeanyi?</span><br><br>
    <span class="glow">projects</span> <span class="subtle">- View my coding portfolio</span><br><br>
    <span class="glow">contact</span> <span class="subtle">- Get in touch</span><br><br>
    <span class="glow">banner</span> <span class="subtle">- Display the header art</span><br><br>
    <span class="glow">clear</span> <span class="subtle">- Clear the terminal</span>
    `,
    
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Zorin OS, Automotive Engineering.",
    
    contact: "Email: your-email@example.com<br>GitHub: github.com/IfeanYiGodsgift",
    
    projects: "Loading projects... <br><br> 1. Honda Accord OBD-II Reader <br> 2. Wellness App API <br> <br> Type <span>'open 1'</span> to read the Honda Project documentation.",
    
    // 3. The Project Details (Inline, no new page)
    "open 1": `
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
    [PLACEHOLDER] - Prototype complete.
    <br>
    `
};

// Boot Sequence
window.onload = function() {
    const inputLine = document.querySelector('.input-line');
    input.disabled = true;
    inputLine.style.display = 'none';
    
    printLine("Initialising kernel...");
    setTimeout(() => printLine("Loading user profile: IfeanYiGodsgift..."), 800);
    setTimeout(() => printLine("Mounting file systems..."), 1500);
    
    setTimeout(() => {
        output.innerHTML = ""; 
        printBanner(); // Call the helper function
        printLine(welcomeText);
        inputLine.style.display = 'flex';
        input.disabled = false;
        input.focus();
    }, 2200);
};

// Helper to print Banner
function printBanner() {
    const pre = document.createElement("div");
    pre.className = "ascii-art";
    pre.innerText = bannerText;
    output.appendChild(pre);
}

function printLine(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

// Input Logic
input.addEventListener("input", function() {
    typeDisplay.textContent = input.value;
});

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = input.value.toLowerCase().trim();
        
        printLine(`<span class="prompt">guest@God'sGift-pc:~$</span> ${cmd}`);
        
        input.value = ""; 
        typeDisplay.textContent = "";
        
        if (commands[cmd]) {
            printLine(commands[cmd]);
        } 
        else if (cmd === 'clear') {
            output.innerHTML = ""; 
        } 
        // 4. New 'banner' command logic
        else if (cmd === 'banner') {
            printBanner();
        }
        else {
            printLine(`Command not found: ${cmd}. Type <span class="glow">'help'</span>.`);
        }
        
        input.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// Focus anywhere to type
document.addEventListener('click', function() {
    input.focus();
});