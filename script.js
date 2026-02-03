// Enhanced Confetti animation with multiple shapes
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 150;
        const shapes = ['circle', 'square', 'triangle', 'heart'];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -10 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 10,
                vy: Math.random() * 6 + 2,
                size: Math.random() * 8 + 3,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.15,
                color: ['#FFD700', '#FFEB3B', '#FFA500', '#FFB84D', '#FFC857', '#FFFACD'][Math.floor(Math.random() * 6)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                alpha: 1
            });
        }
    }

    drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
        ctx.fill();
    }

    drawTriangle(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => p.y < this.canvas.height && p.alpha > 0);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // gravity
            p.vx *= 0.99; // air resistance
            p.rotation += p.rotationSpeed;
            p.alpha -= 0.003;

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;

            switch(p.shape) {
                case 'circle':
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
                case 'square':
                    this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    break;
                case 'triangle':
                    this.drawTriangle(this.ctx, 0, 0, p.size);
                    break;
                case 'heart':
                    this.drawHeart(this.ctx, 0, -p.size / 2, p.size);
                    break;
            }

            this.ctx.restore();
        });

        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    start() {
        this.particles = [];
        this.createParticles();
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize confetti
const canvas = document.getElementById('confetti');
const confetti = new Confetti(canvas);

// Background music
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

// Music toggle function
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        document.querySelector('.music-icon').textContent = '🔇';
    } else {
        bgMusic.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        isMusicPlaying = true;
        document.querySelector('.music-icon').textContent = '🎵';
    }
}

// Play music function
function playMusic() {
    bgMusic.play().catch(error => {
        console.log('Audio autoplay was prevented. User interaction may be required.');
    });
    isMusicPlaying = true;
}

// Create floating flowers in background
function createBackgroundHearts() {
    const container = document.getElementById('floatingHeartsBg');
    const flowerEmojis = ['🌸', '🌺', '🌹', '🌼', '🌻', '💐'];

    setInterval(() => {
        const flower = document.createElement('div');
        flower.className = 'hearts';
        flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.style.left = Math.random() * window.innerWidth + 'px';
        flower.style.bottom = '-50px';
        flower.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
        flower.style.opacity = Math.random() * 0.3 + 0.2;
        container.appendChild(flower);

        setTimeout(() => flower.remove(), 4000);
    }, 3000);
}

// Create flower petals (peonies, lilies, roses)
function createRosePetals() {
    const container = document.getElementById('rosePetals');
    const petalCount = 20;
    const flowers = ['🌸', '🌺', '🌹', '💐'];

    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
            petal.style.position = 'absolute';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.top = -50 + 'px';
            petal.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
            petal.style.opacity = Math.random() * 0.5 + 0.3;
            petal.style.animation = `heartFall ${Math.random() * 3 + 4}s ease-in forwards`;
            petal.style.animationDelay = Math.random() * 2 + 's';
            petal.style.pointerEvents = 'none';
            container.appendChild(petal);

            setTimeout(() => petal.remove(), 7000);
        }, i * 100);
    }
}

// Reveal surprise - transition to Valentine's page
function revealSurprise() {
    // Start playing background music (Elaine - You're the One)
    playMusic();

    const surprisePage = document.getElementById('surprisePage');
    const valentinePage = document.getElementById('valentinePage');

    // Fade out surprise page with animation
    surprisePage.style.opacity = '0';
    surprisePage.style.transform = 'scale(0.8)';

    setTimeout(() => {
        surprisePage.classList.add('hidden');
        valentinePage.classList.remove('hidden');

        // Create rose petals
        createRosePetals();

        // Trigger love meter animation
        setTimeout(() => {
            const loveMeterFill = document.getElementById('loveMeterFill');
            if (loveMeterFill) {
                loveMeterFill.style.width = '100%';
            }
        }, 500);

        // Add a little welcome message
        setTimeout(() => {
            const hintMessage = document.getElementById('hintMessage');
            hintMessage.innerHTML = '💝 Hover over the buttons to see what happens... 😊';
            setTimeout(() => {
                hintMessage.style.opacity = '0';
                hintMessage.style.transition = 'opacity 1s ease-out';
            }, 4000);
        }, 2000);
    }, 600);
}

// Track button interaction attempts
let noButtonAttempts = 0;
let yesButtonScale = 1;

// Handle Yes button
function handleYes() {
    // Prevent multiple clicks
    if (hasClickedYes) {
        return;
    }
    hasClickedYes = true;

    // Start immediate celebration effects
    confetti.start();
    createFloatingHearts();
    celebrate();

    // Wait a moment for the celebration to start, then transition to celebration page
    setTimeout(() => {
        const valentinePage = document.getElementById('valentinePage');
        const celebrationPage = document.getElementById('celebrationPage');

        // Fade out valentine page
        valentinePage.style.opacity = '0';
        valentinePage.style.transform = 'scale(0.9)';

        setTimeout(() => {
            valentinePage.classList.add('hidden');
            celebrationPage.classList.remove('hidden');

            // Pause background music and play celebration song
            bgMusic.pause();
            const celebrationSong = document.getElementById('celebrationSong');
            celebrationSong.play().catch(error => {
                console.log('Could not play celebration song:', error);
            });

            // More confetti on celebration page
            setTimeout(() => {
                confetti.start();
            }, 500);

            // Continuous celebration
            const celebrationInterval = setInterval(() => {
                if (Math.random() > 0.7) {
                    createFloatingHearts();
                }
            }, 2000);
        }, 800);
    }, 1000);
}

// Handle No button - it runs away more dramatically and YES button grows
function moveButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const hintMessage = document.getElementById('hintMessage');
    const container = noBtn.parentElement;

    noButtonAttempts++;

    // Funny messages that get more desperate
    const funnyMessages = [
        { no: 'No', hint: '', yes: 'YES! 💕' },
        { no: 'No?', hint: '🤔 Really though?', yes: 'YES! 💕💕' },
        { no: 'Are you sure?', hint: '😢 The button is running away!', yes: 'YES PLEASE! 💕💕' },
        { no: 'Really??', hint: '😭 Come on, you know you want to!', yes: 'YES! I NEED THIS! 💕💕💕' },
        { no: 'Think again!', hint: '🥺 Please? The Yes button is getting lonely...', yes: 'ABSOLUTELY YES! 💕💕💕💕' },
        { no: 'Nope!', hint: '😱 Don\'t make me beg! (I will)...', yes: 'YES YES YES! 💕💕💕💕💕' },
        { no: 'Not happening', hint: '🙏 I\'m literally begging you!', yes: 'OF COURSE YES! 💕💕💕💕💕💕' },
        { no: '???', hint: '😍 You know the answer is yes!', yes: 'YESSSS! 💕💕💕💕💕💕💕' },
        { no: '🏃💨', hint: '💖 Just click the big button already!', yes: 'YES! ALWAYS YES! 💕💕💕💕💕💕💕💕' },
        { no: 'Bye!', hint: '✨ The universe wants you to say yes!', yes: 'YES TO EVERYTHING! 💕💕💕💕💕💕💕💕💕' }
    ];

    const messageIndex = Math.min(noButtonAttempts, funnyMessages.length - 1);
    const currentMessage = funnyMessages[messageIndex];

    // Update button texts
    document.getElementById('noBtnText').textContent = currentMessage.no;
    document.getElementById('yesBtnText').textContent = currentMessage.yes;

    // Show hint message
    if (currentMessage.hint) {
        hintMessage.textContent = currentMessage.hint;
        hintMessage.style.animation = 'none';
        setTimeout(() => {
            hintMessage.style.animation = 'bounce-word 0.6s ease-in-out';
        }, 10);
    }

    // Make YES button bigger
    yesButtonScale += 0.08;
    yesBtn.style.transform = `scale(${yesButtonScale})`;
    yesBtn.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    // Make NO button smaller and run away
    const noBtnScale = Math.max(0.2, 1 - (noButtonAttempts * 0.12));

    // Calculate random position that's far from the YES button
    const containerRect = container.getBoundingClientRect();
    const maxX = Math.min(400, window.innerWidth - containerRect.left - 150);
    const maxY = Math.min(300, window.innerHeight - containerRect.top - 100);

    const randomX = (Math.random() - 0.5) * maxX * 1.5;
    const randomY = (Math.random() - 0.5) * maxY * 1.5;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${noBtnScale})`;
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    // After 5 attempts, make NO button start spinning
    if (noButtonAttempts >= 5) {
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${noBtnScale}) rotate(${noButtonAttempts * 45}deg)`;
    }

    // After 8 attempts, make it super tiny and almost invisible
    if (noButtonAttempts >= 8) {
        noBtn.style.opacity = Math.max(0.1, 1 - (noButtonAttempts - 8) * 0.15);
    }

    // After 10 attempts, just hide it completely and make YES button huge
    if (noButtonAttempts >= 10) {
        noBtn.style.display = 'none';
        hintMessage.innerHTML = '🎉 Fine! I guess you HAVE to say yes now! 😄💕';
        yesBtn.style.transform = `scale(${yesButtonScale + 0.5})`;
    }

    // Add a little shake to the YES button to draw attention
    yesBtn.style.animation = 'none';
    setTimeout(() => {
        yesBtn.style.animation = 'glow-btn-anim 0.5s ease-in-out';
    }, 10);
}

function handleNo() {
    // Just in case they manage to click it
    const responses = [
        'Nope! That button is too fast for you! 😄',
        'Nice try! But the YES button is waiting... 💕',
        'Oops! It ran away again! 🏃💨',
        'So close! Maybe try YES instead? 😉',
        'The button said "not today!" 😂'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    document.getElementById('hintMessage').textContent = randomResponse;
}

// Create floating hearts and flowers
function createFloatingHearts() {
    const emojis = ['💕', '💖', '🌸', '🌺', '🌹', '💐', '💝', '🌼'];
    const count = 25;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.className = 'hearts';
            element.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.bottom = '0px';
            element.style.fontSize = (Math.random() * 2 + 1.5) + 'em';
            element.style.filter = `hue-rotate(${Math.random() * 30}deg)`;
            document.body.appendChild(element);

            setTimeout(() => element.remove(), 4000);
        }, i * 80);
    }
}

// Celebration effect
function celebrate() {
    const emojis = ['🎉', '🌸', '🎊', '🌺', '✨', '🌹', '💫', '💐', '🌼'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            celebration.style.position = 'fixed';
            celebration.style.fontSize = (Math.random() * 2 + 2) + 'em';
            celebration.style.left = Math.random() * window.innerWidth + 'px';
            celebration.style.top = Math.random() * window.innerHeight + 'px';
            celebration.style.pointerEvents = 'none';
            celebration.style.animation = 'zoomIn 0.6s ease-out';
            celebration.style.zIndex = '9999';
            celebration.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';

            document.body.appendChild(celebration);

            setTimeout(() => {
                celebration.style.animation = 'fadeOut 0.5s ease-out forwards';
                setTimeout(() => celebration.remove(), 500);
            }, 1000);
        }, i * 120);
    }
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Keyboard support - removed auto-triggering to prevent accidental accepts
// Users must click the buttons intentionally

// Initialize background effects
window.addEventListener('load', () => {
    createBackgroundHearts();
});

// Prevent double-clicks on YES button
let hasClickedYes = false;

// Add touch support for mobile
document.addEventListener('touchstart', function() {}, {passive: true});
