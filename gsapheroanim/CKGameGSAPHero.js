class CKGameGSAPHero {
        constructor(options = {}) {
            this.settings = {
                root: '.ck_game_gsap_hero',
                gsapCDN: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
                textCDN: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js',
                playAtStart: false,
                typingLines: [
                    'We build premium systems.',
                    'We scale brands globally.',
                    'We engineer conversion.'
                ],
                typingSpeed: 0.04, 
                lineDelay: 0.4,    
                typingStartDelay: 0.5,
                enableCursor: true,
                enableParticles: true,
                enableMagneticButtons: true,
                viewportThreshold: 0.35,
                ...options
            };

            this.root = document.querySelector(this.settings.root);
            if (!this.root) {
                console.warn('CKGameGSAPHero: Root not found', this.settings.root);
                return;
            }

            this.hasStarted = false;
            this.boundListeners = new Map(); 
            this._tickerFunction = null;    
            this.particleThrottle = false;  

            this.init();
        }

        async init() {
            await this.loadGSAP();
            this.cacheDOM();
            this.prepareTitles();

            if (this.settings.playAtStart) {
                this.startAnimations();
            } else {
                this.createObserver();
            }
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

        cacheDOM() {
            this.titles = this.root.querySelectorAll('.ck_game_gsap_hero_title, .ck_game_gsap_hero_subtitle');
            this.topline = this.root.querySelector('.ck_game_gsap_hero_topline');
            this.desc = this.root.querySelector('.ck_game_gsap_hero_desc');
            this.buttons = this.root.querySelectorAll('.ck_game_gsap_btn');
            this.imageWrap = this.root.querySelector('.ck_game_gsap_hero_image_wrap');
            this.glow = document.querySelector('.ck_game_gsap_cursor_glow');
        }

        prepareTitles() {
            this.titles.forEach(title => {
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

        createObserver() {
            this.observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.hasStarted) {
                            this.hasStarted = true;
                            this.startAnimations();
                            this.observer.disconnect();
                        }
                    });
                },
                { threshold: this.settings.viewportThreshold }
            );
            this.observer.observe(this.root);
        }

        startAnimations() {
            this.createTimeline();
            if (this.settings.enableMagneticButtons) this.initMagneticButtons();
            if (this.settings.enableCursor) this.initCursor();
        }

        createTimeline() {
            this.tl = gsap.timeline({
                defaults: { ease: 'power4.out' }
            });

            if (this.topline) {
                this.tl.to(this.topline, { opacity: 1, y: 0, duration: 1 });
            }

            this.titles.forEach(title => {
                this.tl.fromTo(title.children, 
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

            if (this.desc && this.settings.typingLines.length > 0) {
                this.tl.add(this.buildTypingTimeline(), `-=${this.settings.typingStartDelay}`);
            }

            if (this.buttons.length > 0) {
                this.tl.to(this.buttons, { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1 }, '-=0.2');
            }

            if (this.imageWrap) {
                this.tl.fromTo(this.imageWrap,
                    { opacity: 0, scale: 0.8, rotate: 6, y: 40 },
                    { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1.6, ease: 'expo.out' },
                    '-=1'
                );
            }
        }

        buildTypingTimeline() {
            this.desc.innerHTML = ''; 

            const textContainer = document.createElement('span');
            const cursor = document.createElement('span');
            cursor.className = 'ck_game_gsap_typing_cursor';
            cursor.innerHTML = '│'; // Using a slightly solid box line for cleaner top-to-bottom color transitions
            cursor.style.display = 'inline-block';

            this.desc.appendChild(textContainer);
            this.desc.appendChild(cursor);

            const typingTl = gsap.timeline();

            let compiledText = '';

            this.settings.typingLines.forEach((line, index) => {
                const prefix = index > 0 ? '<br>' : '';
                compiledText += prefix + line;

                typingTl.to(textContainer, {
                    text: { value: compiledText },
                    duration: line.length * this.settings.typingSpeed,
                    ease: 'none'
                });

                if (index < this.settings.typingLines.length - 1) {
                    typingTl.to({}, { duration: this.settings.lineDelay });
                }
            });

            return typingTl;
        }

        initMagneticButtons() {
            this.buttons.forEach(btn => {
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

        initCursor() {
            if (!this.glow) return;

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
            this.initCursorHover();
        }

        createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'ck_game_gsap_cursor_particle';
            document.body.appendChild(particle);

            gsap.set(particle, { x: x, y: y, scale: gsap.utils.random(0.6, 1.4) });
            gsap.to(particle, {
                x: x + gsap.utils.random(-40, 40),
                y: y + gsap.utils.random(-40, 40),
                opacity: 0, scale: 0, duration: 1, ease: 'power3.out',
                onComplete: () => particle.remove()
            });
        }

        initCursorHover() {
            this.root.querySelectorAll('a, .ck_game_gsap_btn').forEach(el => {
                const onMouseEnter = () => gsap.to(this.glow, { scale: 2.3, duration: 0.35 });
                const onMouseLeave = () => gsap.to(this.glow, { scale: 1, duration: 0.35 });

                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
                this.boundListeners.set(el, { mouseenter: onMouseEnter, mouseleave: onMouseLeave });
            });
        }

        replay() { if (this.tl) this.tl.restart(); }
        pause() { if (this.tl) this.tl.pause(); }
        play() { if (this.tl) this.tl.play(); }

        destroy() {
            if (this.tl) this.tl.kill();
            if (this._tickerFunction) gsap.ticker.remove(this._tickerFunction);
            if (this.observer) this.observer.disconnect();

            this.boundListeners.forEach((events, target) => {
                for (const [event, fn] of Object.entries(events)) {
                    target.removeEventListener(event, fn);
                }
            });
            this.boundListeners.clear();
            console.log(`CKGameGSAPHero instance dropped cleanly.`);
        }
    }

