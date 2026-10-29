/**
 * Ravi Kumar - Master Portfolio JavaScript
 * Features: Typewriter, ScrollSpy, Filters, Project Modal, Form Validation, Clipboard & Sound/Visual FX
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Dynamic Hero Typing Effect
    // ==========================================
    const typingElement = document.getElementById('typing-text');
    const words = [
        "B.Tech CSE Cyber Security Specialist",
        "Full Stack Developer & Designer",
        "Hackathon Competitor & Builder",
        "Python & C Systems Programmer",
        "OWASP & Web Security Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeLoop() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 40;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 400; // Pause before next word
        }

        setTimeout(typeLoop, typingDelay);
    }
    typeLoop();

    // ==========================================
    // 2. Sticky Header & ScrollSpy
    // ==========================================
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Header backdrop
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Active navigation link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 3. Mobile Navigation Menu
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.getElementById('nav-links-menu');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            const isOpen = navLinksContainer.classList.contains('open');
            mobileMenuBtn.innerHTML = isOpen
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('open')) {
                    navLinksContainer.classList.remove('open');
                    mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
                }
            });
        });
    }

    // ==========================================
    // 4. Skills Tab Filtering
    // ==========================================
    const skillFilterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue || (filterValue === 'languages' && category.includes('lang'))) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ==========================================
    // 5. Project Filtering & Modal Details
    // ==========================================
    const projectFilterBtns = document.querySelectorAll('.projects-filter-nav .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // Project Details Data
    const projectData = {
        sentinx: {
            title: "SentinX - Vulnerability Scanner & Recon Tool",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
            category: "Cyber Security / Python Recon Tool",
            techStack: ["Python 3", "Sockets", "Nmap Integration", "Threading", "Argparse", "JSON Reports"],
            overview: "SentinX is a modular multi-threaded network scanner and reconnaissance framework built from scratch in Python. It detects open ports, extracts software banners, identifies potential service misconfigurations, and creates structured security reports.",
            features: [
                "Multi-threaded SYN/TCP connect port scanning (scans 1000 ports in under 3 seconds)",
                "Service version detection and OS fingerprinting",
                "Automated banner grabber to identify outdated Apache/Nginx or SSH daemon versions",
                "Exportable HTML and JSON reconnaissance audit reports"
            ],
            securityTakeaway: "Demonstrated raw socket programming, network protocol handling, and threat surface mapping."
        },
        secureauth: {
            title: "SecureAuth - Zero-Trust Role-Based Portal",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
            category: "Full Stack Web Security Application",
            techStack: ["HTML5", "CSS3 Glassmorphism", "JavaScript (ES6)", "SQL (MySQL)", "bcrypt", "JWT"],
            overview: "A hardened web application featuring military-grade defense against the OWASP Top 10 web vulnerabilities. Includes role-based access control (RBAC), multi-factor authentication mockup, and real-time login audit trails.",
            features: [
                "Defense against SQL Injection using parameterized queries and strictly typed prepared statements",
                "Context-aware output encoding mitigating Cross-Site Scripting (XSS)",
                "Secure HTTP-Only session tokens with anti-CSRF protections",
                "Real-time visual administrative dashboard with security alert logs"
            ],
            securityTakeaway: "Engineered secure-by-design web patterns without relying on monolithic insecure defaults."
        },
        cryptokey: {
            title: "CryptoKey - Cryptographic File Encryptor",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`,
            category: "Systems & Cryptography / C & Python",
            techStack: ["C Language", "Python", "AES-256", "SHA-256 Checksums", "File I/O"],
            overview: "A lightweight cryptographic utility written in C for high-speed file encryption/decryption, coupled with a Python GUI wrapper. Provides confidentiality and integrity verification for sensitive files.",
            features: [
                "AES-256 symmetric cipher with secure key derivation function (PBKDF2)",
                "SHA-256 cryptographic hashing to verify tamper-proof file integrity before decryption",
                "Zero-memory wipe: overwrites sensitive encryption keys in RAM immediately after use in C",
                "CLI batch processing mode for rapid folder encryption"
            ],
            securityTakeaway: "Deepened understanding of low-level memory safety in C, pointer manipulation, and crypto primitives."
        },
        packetlens: {
            title: "PacketLens - Real-time Network Traffic Sniffer",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
            category: "Network Security & Diagnostics",
            techStack: ["Python", "Scapy", "Raw Sockets", "Matplotlib / ChartJS", "Packet Dissection"],
            overview: "A real-time network packet analyzer that captures live network frames, dissects Ethernet, IP, TCP/UDP headers, and flags suspicious activity like port scans or unusual DNS queries.",
            features: [
                "Live capture and protocol breakdown (Ethernet, IPv4, TCP, UDP, ICMP, DNS)",
                "Anomaly detection: triggers immediate alerts upon detecting SYN flood or ARP poisoning patterns",
                "Filter engine supporting BPF (Berkeley Packet Filter) syntax",
                "Generates PCAP files compatible with Wireshark for deep forensic analysis"
            ],
            securityTakeaway: "Hands-on mastery over OSI model layers, packet structure, and packet forging defense."
        },
        sqliplayground: {
            title: "SQLi Defense Lab & Vulnerability Sandbox",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
            category: "Educational Security Lab / SQL & Web",
            techStack: ["SQL (MySQL)", "HTML5", "CSS3", "JavaScript", "Security Payloads"],
            overview: "An interactive educational web sandbox demonstrating classic vs blind SQL Injection vulnerabilities alongside side-by-side secure remediation code blocks.",
            features: [
                "Interactive query simulator illustrating how raw input concatenation breaks query logic",
                "Side-by-side interactive comparison: Vulnerable SQL vs Secure Parameterized Statements",
                "Cheat sheets covering Union-based, Error-based, and Time-based SQLi payloads",
                "Clear explanations on DB user permission reduction & least-privilege principles"
            ],
            securityTakeaway: "Strengthened database defense strategies and secure query construction methods."
        },
        devfoliopro: {
            title: "DevFolio Pro - High Performance Cyber Portfolio",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
            category: "Modern UI/UX & Frontend Architecture",
            techStack: ["HTML5", "CSS3 Variables", "Vanilla JavaScript", "Canvas API", "Zero Dependencies"],
            overview: "A lightning-fast, accessible, and responsive developer portfolio featuring an interactive cybersecurity terminal, particle constellation, and modern glassmorphic UI.",
            features: [
                "100% pure vanilla HTML/CSS/JS without heavy external framework overhead",
                "Interactive terminal emulator with custom CLI commands and cheat codes",
                "Full responsiveness across 4K displays down to ultra-compact mobile phones",
                "Accessible semantic HTML with ARIA roles and keyboard navigability"
            ],
            securityTakeaway: "Zero dependency footprint minimizes software supply chain risks and maximizes performance."
        }
    };

    // Modal elements
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-dynamic-content');

    document.querySelectorAll('.open-project-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && modalBody) {
                modalBody.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(0, 240, 255, 0.1); border: 1px solid var(--neon-cyan); color: var(--neon-cyan); display: flex; align-items: center; justify-content: center;">
                            ${data.icon}
                        </div>
                        <div>
                            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-green); text-transform: uppercase;">${data.category}</span>
                            <h2 style="font-size: 1.5rem; margin-top: 2px;">${data.title}</h2>
                        </div>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
                        ${data.techStack.map(t => `<span class="tag-pill" style="color: var(--neon-cyan); border-color: rgba(0,240,255,0.2);">${t}</span>`).join('')}
                    </div>

                    <h4 style="font-size: 1.05rem; margin-bottom: 8px; color: var(--text-primary);">System Overview</h4>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">${data.overview}</p>

                    <h4 style="font-size: 1.05rem; margin-bottom: 12px; color: var(--text-primary);">Key Architectural Features</h4>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                        ${data.features.map(f => `
                            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; color: var(--text-secondary);">
                                <span style="color: var(--neon-green); font-weight: bold;">✔</span>
                                <span>${f}</span>
                            </li>
                        `).join('')}
                    </ul>

                    <div style="background: rgba(0, 255, 157, 0.06); border: 1px solid rgba(0, 255, 157, 0.25); padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 28px;">
                        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-green); font-weight: bold; display: block; margin-bottom: 4px;">SECURITY & ARCHITECTURE TAKEAWAY:</span>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">${data.securityTakeaway}</p>
                    </div>

                    <div style="display: flex; gap: 14px; justify-content: flex-end;">
                        <button class="btn btn-secondary btn-sm" id="modal-inner-close">Close Details</button>
                    </div>
                `;

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';

                document.getElementById('modal-inner-close').addEventListener('click', closeModal);
            }
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // ==========================================
    // 6. Copy Email to Clipboard
    // ==========================================
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "ravikumar.cybersec@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = "Copied! ✓";
                copyEmailBtn.style.background = "var(--neon-green)";
                copyEmailBtn.style.color = "#050811";

                setTimeout(() => {
                    copyEmailBtn.textContent = originalText;
                    copyEmailBtn.style.background = "";
                    copyEmailBtn.style.color = "";
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy email: ", err);
            });
        });
    }

    // ==========================================
    // 7. Interactive Contact Form & Toast Notice
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast-notice');
    const toastMsg = document.getElementById('toast-message');

    function showToast(message, isError = false) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.style.borderColor = isError ? 'var(--neon-red)' : 'var(--neon-green)';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const submitBtn = document.getElementById('contact-submit-btn');

            if (!name || !email || !message) {
                showToast("Please fill in all required fields.", true);
                return;
            }

            // Simple email validation regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showToast("Please provide a valid email address.", true);
                return;
            }

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Encrypting & Sending...</span>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                contactForm.reset();
                showToast(`Thank you, ${name}! Your transmission has been securely received.`);
            }, 1200);
        });
    }

    // ==========================================
    // 8. Theme Switcher (Dark / Cyberpunk Light)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', targetTheme);

            themeToggleBtn.innerHTML = targetTheme === 'light'
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        });
    }

    // ==========================================
    // 9. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ==========================================
    // 10. Real-time Status & Year in Footer
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

