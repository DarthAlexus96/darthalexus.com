const canvas = document.createElement("canvas");
canvas.id = "rainCanvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let raindrops = [];
let clouds = [];
let splashes = [];

// Cloud class
class Cloud {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.2; // Cloud starts near the top
        this.width = Math.random() * 200 + 100;
        this.height = Math.random() * 50 + 30;
        this.opacity = Math.random() * 0.5 + 0.2; // Semi-transparent clouds
    }

    move() {
        this.x -= 0.2; // Clouds slowly move left to right
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, Math.PI, 0);
        ctx.arc(this.x + this.width, this.y, this.width / 2, Math.PI, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

class Raindrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 30 + 10;
        this.speed = Math.random() * 5 + 4;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.width = Math.random() * 1.2 + 0.5;
        this.shadow = "rgba(0, 0, 0, 0.3)"; // Shadow color
    }

    fall() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.createSplash();
            this.y = -this.length;
            this.x = Math.random() * canvas.width;
        }
    }

    createSplash() {
        splashes.push(new Splash(this.x, canvas.height));
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = `rgba(173, 216, 230, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.shadowColor = this.shadow; // Shadow color
        ctx.shadowBlur = 4; // Soft shadow effect
        ctx.shadowOffsetX = 2; // X offset
        ctx.shadowOffsetY = 2; // Y offset
        ctx.stroke();
    }
}

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.size = Math.random() * 3 + 1;
        this.lifetime = 10;
    }

    update() {
        this.opacity -= 0.1;
        this.lifetime--;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`;
        ctx.fill();
    }
}

// Create clouds and raindrops
function createClouds(count) {
    for (let i = 0; i < count; i++) {
        clouds.push(new Cloud());
    }
}

function createRain(count) {
    raindrops = [];
    for (let i = 0; i < count; i++) {
        raindrops.push(new Raindrop());
    }
}

// Animate the rain and clouds
function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clouds
    for (let cloud of clouds) {
        cloud.move();
        cloud.draw();
    }

    // Draw raindrops
    for (let drop of raindrops) {
        drop.fall();
        drop.draw();
    }

    // Handle splashes
    for (let i = splashes.length - 1; i >= 0; i--) {
        splashes[i].update();
        splashes[i].draw();
        if (splashes[i].lifetime <= 0) {
            splashes.splice(i, 1);
        }
    }

    requestAnimationFrame(animateRain);
}

// Initialize scene
createClouds(5); // Number of clouds
createRain(200); // Number of raindrops
animateRain();

