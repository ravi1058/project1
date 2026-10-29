/**
 * Interactive CyberSec Terminal Component
 * Handles CLI commands, interactive execution, and simulated security tools
 */

(function () {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const cmdChips = document.querySelectorAll('.cmd-chip');

    if (!terminalOutput || !terminalInput) return;

    const commandHistory = [];
    let historyIndex = -1;

    const COMMANDS = {
        help: `
<span class="highlight">AVAILABLE COMMANDS:</span>
  <span class="cmd-echo">whoami</span>       - Display professional identity & cybersecurity profile
  <span class="cmd-echo">skills</span>       - List technical proficiencies (Languages, Web, Security)
  <span class="cmd-echo">projects</span>     - Display featured cybersecurity & full-stack projects
  <span class="cmd-echo">hackathons</span>   - View hackathon participations, achievements & tracks
  <span class="cmd-echo">scan</span>         - Run automated local network reconnaissance simulation
  <span class="cmd-echo">audit</span>        - Perform OWASP web security baseline check
  <span class="cmd-echo">contact</span>      - Retrieve direct contact channels & social links
  <span class="cmd-echo">matrix</span>       - Trigger cyber matrix digital stream
  <span class="cmd-echo">clear</span>        - Clear terminal console buffer
        `,
        whoami: `
<span class="highlight">[IDENTITY VERIFIED]</span>
  <strong>Name:</strong> Ravi Kumar
  <strong>Degree:</strong> B.Tech in Computer Science and Engineering (Cyber Security)
  <strong>Role:</strong> Full Stack Developer & Cybersecurity Researcher
  <strong>Focus Areas:</strong> Web Application Security, Network Scanning, Cryptography, Defensive Programming
  <strong>Motto:</strong> "Building resilient software: Secure by design, intuitive by nature."
        `,
        skills: `
<span class="highlight">[TECHNICAL ARSENAL]</span>
  <strong>Programming:</strong> C (Pointers, Memory, Data Structures), Python (Automation, Sockets, Scapy), SQL (Queries, RDBMS)
  <strong>Web Development:</strong> HTML5 (Semantic, SEO), CSS3 (Flex/Grid, Animations), JavaScript (ES6+, DOM, Asynchronous)
  <strong>Cyber Security:</strong> OWASP Top 10 (SQLi, XSS, CSRF), Port Scanning, Wireshark, Cryptography Basics, Linux Hardening
  <strong>Database & Tools:</strong> MySQL, Git & GitHub, Linux/Bash, VS Code, Burp Suite Basics
        `,
        projects: `
<span class="highlight">[FEATURED PROJECTS]</span>
  1. <span class="cmd-echo">SentinX</span> - Python Automated Network Scanner & Recon Tool
  2. <span class="cmd-echo">SecureAuth Portal</span> - Zero-Trust Role-Based Authentication System
  3. <span class="cmd-echo">CryptoKey</span> - High-Performance File Encryptor (AES-256 / SHA-256)
  4. <span class="cmd-echo">PacketLens</span> - Real-time Network Traffic Analyzer & Sniffer
  5. <span class="cmd-echo">DevFolio Pro</span> - Modern Cyber-Themed Portfolio Architecture
  <em>Tip: Scroll to the Projects section to test demo links!</em>
        `,
        hackathons: `
<span class="highlight">[HACKATHON TRACK RECORD]</span>
  🏆 <strong>Smart India Hackathon (SIH)</strong> - SentinelShield (Automated Phishing Defense) [Finalist]
  🥈 <strong>CyberStrike 36-Hr Hackathon</strong> - PacketLens Intrusion Alert [2nd Place / Best Cyber Defense Tool]
  ⚡ <strong>HackCode Sprint</strong> - SecureAuth Portal [Best Security & UI Architecture]
  🚀 <strong>CodeCraft Regional Sprint</strong> - CryptoVault Encrypted Storage [Top Innovation Award]
        `,
        audit: `
<span class="highlight">[INITIATING OWASP TOP 10 SECURITY AUDIT...]</span>
  [+] Scanning for SQL Injection vectors............ <span class="success">[PASS - Parameterized Queries]</span>
  [+] Checking Cross-Site Scripting (XSS).......... <span class="success">[PASS - Input Sanitized & Escaped]</span>
  [+] Checking Cross-Site Request Forgery (CSRF)... <span class="success">[PASS - Token Enforced]</span>
  [+] Validating Content Security Policy (CSP)..... <span class="success">[PASS - Modern Directives]</span>
  [+] Transport Layer Security (HTTPS/SSL)......... <span class="success">[PASS - TLS 1.3 Active]</span>
  <span class="success">[AUDIT COMPLETE] System Health: 100% SECURE. Zero critical vulnerabilities found.</span>
        `,
        scan: `
<span class="warning">[STARTING SYN RECON SCAN TARGET: 127.0.0.1...]</span>
  PORT 22/tcp   [SSH]      - OPEN | Protocol 2.0 (Host keys hardened)
  PORT 80/tcp   [HTTP]     - REDIRECT -> PORT 443
  PORT 443/tcp  [HTTPS]    - OPEN | TLS 1.3 (Ravi Kumar Web Engine)
  PORT 3306/tcp [MySQL]    - FILTERED | Localhost binding only
  PORT 8080/tcp [API-GATE] - OPEN | Protected by rate-limiter
  <span class="success">[SCAN FINISHED] 3 open, 1 filtered ports in 0.42s.</span>
        `,
        matrix: `
<span class="success">01000011 01011001 01000010 01000101 01010010 00100000 01010011 01000101 01000011</span>
<span class="highlight">01010101 01010010 01001001 01010100 01011001 00100000 01000010 01011001 00100000</span>
<span class="success">01000100 01000101 01010011 01001001 01000111 01001110 00100001 00100001 00100001</span>
<span class="cmd-echo">>>> "Knowledge is the greatest firewall." - Ravi Kumar</span>
        `,
        contact: `
<span class="highlight">[CONTACT ENDPOINTS]</span>
  📧 <strong>Email:</strong> ravikumar.cybersec@gmail.com
  💼 <strong>LinkedIn:</strong> linkedin.com/in/ravi-kumar-cybersec
  🐙 <strong>GitHub:</strong> github.com/ravikumar-cyber
  📍 <strong>Location:</strong> India
  ⚡ <strong>Availability:</strong> Open for Cyber Security Internships & Full Stack Roles!
        `
    };

    function printLine(content, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = content;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        printLine(`<span class="terminal-prompt">ravi@cybersec:~$</span> ${escapeHtml(rawCmd)}`, 'cmd-echo');

        if (!cmd) return;

        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            printLine('<span class="highlight">Console cleared. Type "help" to display available commands.</span>', 'info');
            return;
        }

        if (COMMANDS[cmd]) {
            printLine(COMMANDS[cmd].trim());
        } else {
            printLine(`Command not found: "${escapeHtml(rawCmd)}". Type <span class="highlight">help</span> for a list of valid commands.`, 'error');
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Input key listener
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = terminalInput.value;
            terminalInput.value = '';
            executeCommand(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    // Quick Command Chips
    cmdChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
            }
        });
    });
})();

