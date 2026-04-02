/**
 * Procedural Star Generator
 * Generates a starry background on the #stars-canvas element.
 */

function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        speed: 0.05 + Math.random() * 0.1
    }));

    function draw() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();

            // Minimal movement
            star.y -= star.speed;
            if (star.y < 0) star.y = height;
        });
        requestAnimationFrame(draw);
    }

    draw();
}

document.addEventListener('DOMContentLoaded', initStars);
