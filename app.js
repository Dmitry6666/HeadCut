        /* КУРСОР */
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        if (window.matchMedia('(hover: hover)').matches) {
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = mouseX - 6 + 'px';
                cursor.style.top = mouseY - 6 + 'px';
            });

            function animateFollower() {
                followerX += (mouseX - followerX) * 0.15;
                followerY += (mouseY - followerY) * 0.15;
                follower.style.left = followerX - 20 + 'px';
                follower.style.top = followerY - 20 + 'px';
                requestAnimationFrame(animateFollower);
            }
            animateFollower();

            const hoverTargets = document.querySelectorAll('a, button, .service-row, .bento-item, .team-card, input, select, textarea');
            hoverTargets.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        }

        /* HEADER SCROLL */
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        /* REVEAL */
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));

        /* BENTO SPOTLIGHT */
        document.querySelectorAll('.bento-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                item.style.setProperty('--x', x + '%');
                item.style.setProperty('--y', y + '%');
            });
        });

        /* ФОРМА */
        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Заявка отправлена!';
            btn.style.background = 'var(--accent)';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                e.target.reset();
            }, 2500);
        });

        /* ПЛАВНЫЙ СКРОЛЛ */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });

                /* ============ ФИКС КУРСОРА НА КАРТЕ ============ */
        const mapWrapper = document.querySelector('.map-wrapper');
        if (mapWrapper) {
            mapWrapper.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-on-map');
            });
            mapWrapper.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-on-map');
            });
        }
