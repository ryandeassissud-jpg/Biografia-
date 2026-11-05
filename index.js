document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÃO DO CANVAS NEURAL BIOMÉDICO ANCESTRAL ---
    const canvas = document.getElementById('neural-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let nodes = [];
        let cursor = { x: null, y: null, activeRadius: 180 };

        function resizeMatrix() { 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
        }
        resizeMatrix(); 
        window.addEventListener('resize', resizeMatrix);

        window.addEventListener('mousemove', (e) => { 
            cursor.x = e.clientX; 
            cursor.y = e.clientY; 
        });

        window.addEventListener('mouseout', () => { 
            cursor.x = null; 
            cursor.y = null; 
        });

        class NeuralNode {
            constructor() {
                this.x = Math.random() * canvas.width; 
                this.y = Math.random() * canvas.height;
                this.speedX = (Math.random() - 0.5) * 0.4; 
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.baseRadius = Math.random() * 2 + 1;
            }

            physicsUpdate() {
                this.x += this.speedX; 
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

                if (cursor.x !== null && cursor.y !== null) {
                    let dX = cursor.x - this.x; 
                    let dY = cursor.y - this.y;
                    let dist = Math.sqrt(dX*dX + dY*dY);
                    if (dist < cursor.activeRadius) { 
                        this.x += dX * 0.015; 
                        this.y += dY * 0.015; 
                    }
                }
            }

            render() {
                ctx.beginPath(); 
                ctx.arc(this.x, this.y, this.baseRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(214, 175, 85, 0.35)'; // Partículas Douradas
                ctx.fill();
            }
        }

        function createNeuralMesh() {
            nodes = []; 
            const count = Math.floor((canvas.width * canvas.height) / 9500);
            for (let i = 0; i < count; i++) nodes.push(new NeuralNode());
        }
        createNeuralMesh(); 
        window.addEventListener('resize', createNeuralMesh);

        function engineLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(n => { n.physicsUpdate(); n.render(); });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i; j < nodes.length; j++) {
                    let dX = nodes[i].x - nodes[j].x; 
                    let dY = nodes[i].y - nodes[j].y;
                    let dist = Math.sqrt(dX*dX + dY*dY);

                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist/120) * 0.12})`; // Teias Ciano Tecnológico
                        ctx.lineWidth = 0.6; 
                        ctx.beginPath(); 
                        ctx.moveTo(nodes[i].x, nodes[i].y); 
                        ctx.lineTo(nodes[j].x, nodes[j].y); 
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(engineLoop);
        }
        engineLoop();
    }

    // --- 2. INTELLIGENT SCROLLSPY (INDICADOR DE NAVEGAÇÃO ATIVA) ---
    const DOMsections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let activeSectionId = '';
        DOMsections.forEach(s => {
            if (window.pageYOffset >= (s.offsetTop - s.clientHeight / 3.5)) {
                activeSectionId = s.getAttribute('id');
            }
        });

        menuLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href').includes(activeSectionId)) {
                l.classList.add('active');
            }
        });
    });

    // --- 3. REVEAL ANIMATION ENGINE (REVELAÇÃO SUAVE EM ROLAGEM) ---
    const animateTargets = document.querySelectorAll('.timeline-card, .profile-card, .lab-gallery-card, .metric-card');
    
    animateTargets.forEach(t => t.classList.add('reveal-hidden'));

    const triggerReveal = () => {
        animateTargets.forEach(t => {
            if (t.getBoundingClientRect().top < (window.innerHeight / 5) * 4.2) {
                t.classList.add('reveal-visible');
            }
        });
    };
    
    window.addEventListener('scroll', triggerReveal); 
    triggerReveal(); // Executa o disparo inicial
});
