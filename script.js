const output = document.getElementById('output');
const input = document.getElementById('cmd-input');

// The "Database" of text to display
const commands = {
    help: "Available commands: <br> - about<br> - projects<br> - contact<br> - clear",
    about: "I am a backend developer and CS student at Pan-Atlantic University.<br>Focus: Backend Systems, Zorin OS, Automotive Engineering.",
    contact: "Email: your-email@example.com<br>GitHub: github.com/IfeanYiGodsgift",
    projects: "Loading projects... <br> 1. Honda Accord OBD-II Reader <br> 2. Wellness App API <br> <br> Type 'open 1' to see details for the Honda Project."
};

// 1. Boot Sequence (The "Cool Factor")
window.onload = function() {
    printLine("Initialising kernel...");
    setTimeout(() => printLine("Loading user profile: IfeanYiGodsgift..."), 500);
    setTimeout(() => printLine("System ready. Type 'help' for commands."), 1200);
};

function printLine(text) {
    output.innerHTML += `<div>${text}</div>`;
    window.scrollTo(0, document.body.scrollHeight);
}

// 2. Handle Input
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = input.value.toLowerCase().trim();
        input.value = ""; // Clear input
        
        printLine(`<span class="prompt">guest@ifeanyi-pc:~$</span> ${cmd}`);
        
        if (commands[cmd]) {
            printLine(commands[cmd]);
        } else if (cmd === 'clear') {
            output.innerHTML = "";
        } else if (cmd === 'open 1') {
            // This satisfies the "Dedicated Project Page" requirement 
            window.location.href = "project.html"; 
        } else {
            printLine(`Command not found: ${cmd}. Type 'help'.`);
        }
    }
});

// 3. Mobile Button Handler
function runCmd(cmd) {
    input.value = cmd;
    // Trigger the enter key event manually
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    input.dispatchEvent(event);
}