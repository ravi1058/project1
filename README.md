# Ravi Kumar - Cyber Security & Full Stack Developer Portfolio

A modern, responsive, high-performance portfolio website created with **pure HTML5, CSS3, and Vanilla JavaScript** (Zero external dependencies or frameworks).

Built specifically for **Ravi Kumar**, B.Tech CSE (Cyber Security) student, hackathon competitor, and developer proficient in **C, Python, HTML, CSS, SQL, and Cyber Security fundamentals**.

---

## 🌟 Highlights & Key Features

1. **Futuristic Cyber Security Theme**:
   - Sleek deep-navy & void-black palette with electric cyan, neon emerald, and purple accents.
   - Dynamic canvas particle constellation simulating a cyber defense grid & neural mesh (reacts to mouse movement).
   - Glassmorphism surfaces, subtle glow borders, and fluid keyframe animations.

2. **Sections Included**:
   - **Hero Section**: Dynamic typewriter headline, live security status badges, fast statistics counter, and an interactive Cyber HUD telemetry panel.
   - **About Section**: Comprehensive background covering Ravi's B.Tech CSE Cyber Security focus, low-level programming knowledge, and core engineering philosophy.
   - **Skills Section**: Filterable categories (`All`, `Programming Languages`, `Cyber Security`, `Web Development`, `Databases & Tools`) with progress bars and proficiency details.
   - **Experience Timeline**: Career milestones covering cyber security training, college tech club leadership, and independent security research.
   - **Hackathons Showcase**: Dedicated spotlight for 24-36 hour hackathon sprints (Smart India Hackathon, CyberStrike, HackCode) detailing problem statements, architectures, and awards.
   - **Projects Portfolio**: Filterable project cards (`SentinX Vulnerability Scanner`, `SecureAuth Zero-Trust Portal`, `CryptoKey File Encryptor`, `PacketLens Traffic Sniffer`, `SQLi Defense Lab`, `DevFolio Pro`) with interactive popup modal for deep architectural inspection.
   - **Honors & Achievements**: Hackathon trophies, CTF platform completions, and security certifications.
   - **Interactive CyberSec Terminal**: A fully functional browser CLI emulator where visitors can type commands (`help`, `whoami`, `skills`, `projects`, `hackathons`, `scan`, `audit`, `matrix`, `contact`, `clear`) or click quick chips.
   - **Contact Details & Secure Form**: Glassmorphism contact form with client-side validation, toast notifications, direct email with a one-click copy button, and social links.

---

## 🚀 How to Run Locally

Because this project is built entirely with native **HTML5, CSS3, and JavaScript**, you have multiple quick ways to run it:

### Method 1: Direct File Opening (No Installation Needed)
1. Navigate to the project directory: `d:\anti\Project_01`
2. Simply double-click on `index.html` (or right-click -> Open With -> Google Chrome / Edge / Firefox).
3. The portfolio will run completely offline with full animations, particle effects, and terminal features!

### Method 2: Local HTTP Server with Python (Recommended)
If you have Python installed, open your terminal / PowerShell in `d:\anti\Project_01` and run:
```bash
python -m http.server 8000
```
Then open your browser and visit:
[http://localhost:8000](http://localhost:8000)

### Method 3: VS Code Live Server
1. Open the `d:\anti\Project_01` folder in VS Code.
2. Right-click on `index.html` and click **"Open with Live Server"**.

---

## 📁 Project Structure

```
d:\anti\Project_01\
├── index.html            # Main semantic HTML structure & sections
├── css/
│   ├── style.css         # Modern design system, responsive layout, glassmorphism
│   └── animations.css    # Keyframes, neon glow, radar sweeps, reveal effects
├── js/
│   ├── main.js           # Core UI logic, Typewriter, Modals, Filtering & Form validation
│   ├── particles.js      # Zero-dependency interactive canvas cyber mesh
│   └── terminal.js       # Interactive CyberSec Terminal CLI
└── README.md             # Documentation and usage guide
```

---

## 🛡️ Customization Guide

- **Change Email / Social Links**: Open `index.html` and search for `ravikumar.cybersec@gmail.com` or `social-links-bar` to replace with your personal accounts.
- **Add More Projects**: Open `index.html` in the `#projects` section and add a new `.project-card` block, or update the `projectData` object inside `js/main.js` to customize the detail modal.
- **Add Terminal Commands**: Open `js/terminal.js` and add any custom command and response inside the `COMMANDS` object.

