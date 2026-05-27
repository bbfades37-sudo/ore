
class CKGameGSAPHero {
            constructor(options = {}) {
                this.settings = {
                    selector: '.ck_game_gsap_hero',
                    gsapCDN: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
                    textCDN: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js',
                    typingSpeed: 0.04, 
                    lineDelay: 0.4,    
                    typingStartDelay: 0.5,
                    enableCursor: true,
                    enableParticles: true,
                    enableMagneticButtons: true,
                    viewportThreshold: 0.35,
                    cursorGradient: 'linear-gradient(45deg, #ff007f, #7928ca, #00dfd8, #ff007f)',
                    ...options
                };

                this.instances = document.querySelectorAll(this.settings.selector);
                if (this.instances.length === 0) {
                    console.warn('CKGameGSAPHero: No elements match selector', this.settings.selector);
                    return;
                }

                this.boundListeners = new Map(); 
                this._tickerFunction = null;    
                this.particleThrottle = false;  
                this.globalCursorInitialized = false;

                this.init();
            }

            async init() {
                this.injectGlobalStyles(); 
                await this.loadGSAP();
                
                this.glow = document.querySelector('.ck_game_gsap_cursor_glow');

                this.instances.forEach(root => {
                    this.prepareTitles(root);
                    this.createObserver(root);
                });
            }

            injectGlobalStyles() {
                if (document.getElementById('ck-gsap-hero-runtime-styles')) return;
                
                const style = document.createElement('style');
                style.id = 'ck-gsap-hero-runtime-styles';
                style.innerHTML = `
                    @keyframes ckMovingGradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `;
                document.head.appendChild(style);
            }

            loadGSAP() {
                return new Promise((resolve, reject) => {
                    if (window.gsap && window.gsap.plugins.text) return resolve();

                    const loadScript = (src) => {
                        return new Promise((res, rej) => {
                            const existing = document.querySelector(`script[src="${src}"]`);
                            if (existing) {
                                existing.addEventListener('load', res);
                                return;
                            }
                            const script = document.createElement('script');
                            script.src = src;
                            script.onload = res;
                            script.onerror = rej;
                            document.head.appendChild(script);
                        });
                    };

                    loadScript(this.settings.gsapCDN)
                        .then(() => loadScript(this.settings.textCDN))
                        .then(() => {
                            gsap.registerPlugin(TextPlugin);
                            resolve();
                        })
                        .catch(reject);
                });
            }

            prepareTitles(root) {
                const titles = root.querySelectorAll('.ck_game_gsap_hero_title, .ck_game_gsap_hero_subtitle');
                titles.forEach(title => {
                    const text = title.innerText;
                    title.innerHTML = '';
                    const fragment = document.createDocumentFragment();
                    text.split('').forEach(letter => {
                        const span = document.createElement('span');
                        span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
                        span.style.display = 'inline-block';
                        fragment.appendChild(span);
                    });
                    title.appendChild(fragment);
                });
            }

            createObserver(root) {
                const observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !root.dataset.hasStarted) {
                                root.dataset.hasStarted = "true";
                                this.startInstanceAnimations(root);
                                observer.disconnect();
                            }
                        });
                    },
                    { threshold: this.settings.viewportThreshold }
                );
                observer.observe(root);
            }

            startInstanceAnimations(root) {
                this.createInstanceTimeline(root);
                
                if (this.settings.enableMagneticButtons) this.initMagneticButtons(root);
                
                if (this.settings.enableCursor && !this.globalCursorInitialized) {
                    this.initGlobalCursor();
                }
                if (this.settings.enableCursor) {
                    this.initInstanceCursorHover(root);
                }
            }

            createInstanceTimeline(root) {
                const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
                
                const topline = root.querySelector('.ck_game_gsap_hero_topline');
                const titles = root.querySelectorAll('.ck_game_gsap_hero_title, .ck_game_gsap_hero_subtitle');
                const desc = root.querySelector('.ck_game_gsap_hero_desc');
                const buttons = root.querySelectorAll('.ck_game_gsap_btn');
                const imageWrap = root.querySelector('.ck_game_gsap_hero_image_wrap');

                if (topline) {
                    timeline.to(topline, { opacity: 1, y: 0, duration: 1 });
                }

                titles.forEach(title => {
                    timeline.fromTo(title.children, 
                        {
                            opacity: 0,
                            y: () => gsap.utils.random(-120, 120),
                            x: () => gsap.utils.random(-120, 120),
                            rotate: () => gsap.utils.random(-90, 90),
                            scale: 0
                        },
                        {
                            opacity: 1, y: 0, x: 0, rotate: 0, scale: 1,
                            duration: 1.4, stagger: 0.03, ease: 'expo.out'
                        },
                        '-=0.6'
                    );
                });

                if (desc) {
                    const childElements = desc.children;
                    let typingLines = [];
                    
                    if (childElements.length > 0) {
                        typingLines = Array.from(childElements).map(el => el.innerText.trim());
                    } else if (desc.innerText.trim() !== '') {
                        typingLines = [desc.innerText.trim()];
                    }

                    if (typingLines.length > 0) {
                        timeline.add(this.buildTypingTimeline(desc, typingLines), `-=${this.settings.typingStartDelay}`);
                    }
                }

                if (buttons.length > 0) {
                    timeline.to(buttons, { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1 }, '-=0.2');
                }

                if (imageWrap) {
                    timeline.fromTo(imageWrap,
                        { opacity: 0, scale: 0.8, rotate: 6, y: 40 },
                        { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1.6, ease: 'expo.out' },
                        '-=1'
                    );
                }

                root.activeTimeline = timeline;
            }

            buildTypingTimeline(descElement, lines) {
                descElement.innerHTML = ''; 
                const typingTl = gsap.timeline();

                // Shared cursor instance
                const cursorSpan = document.createElement('span');
                cursorSpan.style.display = 'inline-block';
                cursorSpan.style.width = '3.5px';       // Adjusted here to be significantly slimmer
                cursorSpan.style.height = '1.25em';      // Explicit height matching textual font size
                cursorSpan.style.marginLeft = '4px';    // Balanced micro spacing
                cursorSpan.style.backgroundImage = this.settings.cursorGradient;
                cursorSpan.style.backgroundSize = '300% 300%';
                cursorSpan.style.animation = 'ckMovingGradient 4s ease infinite';
                cursorSpan.style.borderRadius = '1px';
                cursorSpan.style.verticalAlign = 'middle';

                const blinkTween = gsap.fromTo(cursorSpan, { opacity: 0.2 }, { opacity: 1, duration: 0.4, repeat: -1, yoyo: true, ease: 'power1.inOut' });

                lines.forEach((lineText, index) => {
                    const row = document.createElement('div');
                    row.style.display = 'block';
                    
                    const textSpan = document.createElement('span');
                    row.appendChild(textSpan);
                    descElement.appendChild(row);

                    typingTl.to({}, {
                        duration: 0.01,
                        onStart: () => {
                            row.appendChild(cursorSpan);
                        }
                    });

                    typingTl.to(textSpan, {
                        text: { value: lineText },
                        duration: lineText.length * this.settings.typingSpeed,
                        ease: 'none'
                    });

                    if (index < lines.length - 1) {
                        typingTl.to({}, { 
                            duration: this.settings.lineDelay,
                            onStart: () => {
                                cursorSpan.remove();
                            }
                        });
                    } else {
                        typingTl.to({}, { duration: 0.5 });
                    }
                });

                return typingTl;
            }

            initMagneticButtons(root) {
                const buttons = root.querySelectorAll('.ck_game_gsap_btn');
                buttons.forEach(btn => {
                    const onMouseMove = (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        gsap.to(btn, { x: x * 0.18, y: y * 0.18, duration: 0.35 });
                    };
                    const onMouseLeave = () => {
                        gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
                    };

                    btn.addEventListener('mousemove', onMouseMove);
                    btn.addEventListener('mouseleave', onMouseLeave);
                    this.boundListeners.set(btn, { mousemove: onMouseMove, mouseleave: onMouseLeave });
                });
            }

            initGlobalCursor() {
                if (!this.glow) return;
                this.globalCursorInitialized = true;

                this.mouseX = window.innerWidth / 2;
                this.mouseY = window.innerHeight / 2;
                this.currentX = this.mouseX;
                this.currentY = this.mouseY;

                const onDocMouseMove = (e) => {
                    this.mouseX = e.clientX;
                    this.mouseY = e.clientY;

                    if (this.settings.enableParticles && !this.particleThrottle) {
                        this.createParticle(e.clientX, e.clientY);
                        this.particleThrottle = true;
                        setTimeout(() => this.particleThrottle = false, 50); 
                    }
                };

                document.addEventListener('mousemove', onDocMouseMove);
                this.boundListeners.set(document, { mousemove: onDocMouseMove });

                this._tickerFunction = () => {
                    this.currentX += (this.mouseX - this.currentX) * 0.18;
                    this.currentY += (this.mouseY - this.currentY) * 0.18;
                    gsap.set(this.glow, { x: this.currentX, y: this.currentY });
                };

                gsap.ticker.add(this._tickerFunction);
            }

            initInstanceCursorHover(root) {
                if (!this.glow) return;
                root.querySelectorAll('a, .ck_game_gsap_btn').forEach(el => {
                    const onMouseEnter = () => gsap.to(this.glow, { scale: 2.3, duration: 0.35 });
                    const onMouseLeave = () => gsap.to(this.glow, { scale: 1, duration: 0.35 });

                    el.addEventListener('mouseenter', onMouseEnter);
                    el.addEventListener('mouseleave', onMouseLeave);
                    this.boundListeners.set(el, { mouseenter: onMouseEnter, mouseleave: onMouseLeave });
                });
            }

            createParticle(x, y) {
                const particle = document.createElement('div');
                particle.className = 'ck_game_gsap_cursor_particle';
                
                particle.style.position = 'fixed';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.backgroundColor = 'rgba(99, 102, 241, 0.6)';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '99999';
                
                document.body.appendChild(particle);

                gsap.set(particle, { x: x - 4, y: y - 4, scale: gsap.utils.random(0.6, 1.4) });
                gsap.to(particle, {
                    x: x + gsap.utils.random(-40, 40),
                    y: y + gsap.utils.random(-40, 40),
                    opacity: 0, scale: 0, duration: 1, ease: 'power3.out',
                    onComplete: () => particle.remove()
                });
            }

            destroy() {
                this.instances.forEach(root => {
                    if (root.activeTimeline) root.activeTimeline.kill();
                });
                if (this._tickerFunction) gsap.ticker.remove(this._tickerFunction);

                this.boundListeners.forEach((events, target) => {
                    for (const [event, fn] of Object.entries(events)) {
                        target.removeEventListener(event, fn);
                    }
                });
                this.boundListeners.clear();
                console.log(`All CKGameGSAPHero instances dropped cleanly.`);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new CKGameGSAPHero();
        });
