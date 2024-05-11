const icons = [
    {
        link: "/beam-loading",
        image: "HomePage/Assets/Icons/Beam_Loading_Icon.png",
        name: "Beam Load Calculator"
    },
    {
        link: "/derivative-grapher",
        image: "HomePage/Assets/Icons/Derivative_Grapher_Icon.png",
        name: "Derivative Grapher"
    },
    {
        link: "/mixture-calculator",
        image: "HomePage/Assets/Icons/Mixture_Calculator_Icon.png",
        name: "Mixture Calculator"
    },
    {
        link: "/terrain-generator",
        image: "HomePage/Assets/Icons/Terrain_Generator_Icon.png",
        name: "2D Terrain Generator"
    },
    {
        link: "/box-plot-generator",
        image: "HomePage/Assets/Icons/Box_Plot_Generator_Icon.png",
        name: "Box Plot Generator"
    },
    {
        link: "/rss-calculator",
        image: "HomePage/Assets/Icons/RSS_Calculator_Icon.png",
        name: "RSS Calculator"
    },
    {
        link: "/inverse-kinematics",
        image: "HomePage/Assets/Icons/Inverse_Kinematics_Icon.png",
        name: "Inverse Kinematics"
    },
    {
        link: "/clock",
        image: "HomePage/Assets/Icons/Clock_Icon.png",
        name: "Clock"
    },
    {
        link: "/bezier",
        image: "HomePage/Assets/Icons/Bezier_Icon.png",
        name: "Bezier Curves"
    },
    {
        link: "/mapmaker",
        image: "HomePage/Assets/Icons/Mapmaker_Icon.png",
        name: "Map Maker"
    },
    {
        link: "/sierpinski",
        image: "HomePage/Assets/Icons/Sierpinski_Icon.png",
        name: "Sierpinski"
    }
];

let font;
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;
let physics;
const CANVAS_HEIGHT = 100;
const GRAVITY = 0.25;

let letters = {
    startY:  -20,
    spacing: 80,
    height: 100,
    sampleFactor: 0.1,
    letters: []
};
const strength = 0.0125;
const support = {
    strength: 0.015,
    offset: 20,
    frequency: 5
};

let text = "1023mb";

function preload() {
    font = loadFont("HomePage/Assets/AvenirLTStd-Black.otf");
}

function setup() {
    let canvas = createCanvas(windowWidth, CANVAS_HEIGHT);
    canvas.position(0, 0);
    createNavbar();
    createIcons();

    generateSoftBody(text);
}

function draw() {
    background("#030327");
    physics.update();
    drawSoftBody(text);
}

function mousePressed() {
    let maxForce = 200;
    let forceY = -4;

    for (let letter of letters.letters) {
        for (let particle of letter.particles) {
            let dx = maxForce / (particle.x - mouseX);
            particle.force.x = dx;
            particle.force.y = forceY;
        }
    }
}

function createNavbar() {
    let navbarDiv = createDiv();
    navbarDiv.id("navbar");
    navbarDiv.position(0, CANVAS_HEIGHT);

    let homeLinkDiv = createDiv();
    homeLinkDiv.class("navbarLinkContainer");
    let homeLink = `
    <a href="/" class="navbarLink"> Home </a>
    <div id="linkUnderbar"> </div>
    `;
    homeLinkDiv.html(homeLink);
    homeLinkDiv.position(10, 0);
    navbarDiv.child(homeLinkDiv);

    let gamesLinkDiv = createDiv();
    gamesLinkDiv.class("navbarLinkContainer");
    let gamesLink = `
    <a href="http://games.1023mb.net" class="navbarLink"> Games </a>
    `;
    gamesLinkDiv.html(gamesLink);
    gamesLinkDiv.position(80, 0);
    navbarDiv.child(gamesLinkDiv);


}

function createIcons() {

    const ICON_SPACING = 200;
    const ICON_LEFT_MARGIN = 20;
    const SPACING_BELOW_NAVBAR = 70;

    let iconContainer = createDiv();
    iconContainer.id("iconContainer");

    let iconsPerRow = floor((iconContainer.width / ICON_SPACING));

    for (let i = 0; i < icons.length; i++) {
        let icon = icons[i];

        let iconDiv = createDiv();
        iconDiv.class("iconDiv");
        let html = `
        <a href=${icon.link}>
            <div class="iconDiv">
                <img class="iconImg" src=${icon.image} />
                <p class="iconName">${icon.name}</p>
            </div>
        </a>
        `;
        iconDiv.html(html);

        let x = (i%iconsPerRow) * ICON_SPACING + ICON_LEFT_MARGIN;
        let y = height + SPACING_BELOW_NAVBAR + ICON_SPACING*floor(i/iconsPerRow)
        iconContainer.child(iconDiv);
        iconDiv.position(x, y);
    }
}

function generateSoftBody(text) {
    physics = new VerletPhysics2D();
    physics.addBehavior(new GravityBehavior(new Vec2D(0, GRAVITY)));
    let top = letters.startY - letters.height;
    let bottom = height;
    physics.setWorldBounds(new Rect(0, top, width, bottom - top));

    noStroke();
    fill(240, 99, 164);

    for (let i = 0; i < text.length; i++) {
        letters.letters.push([]);
        letters.letters[i].particles = [];
        letters.letters[i].springs = [];
        letters.letters[i].xBounds = {min: Infinity, max: -Infinity};
        letters.letters[i].maxY = -1;
        letters.letters[i].supportParticles = [];
        letters.letters[i].supportSprings = [];
        letters.letters[i].minDistFromFirstSquared = {dist: Infinity, index: -1};
        letters.letters[i].minDistFromLastSquared = {dist: Infinity, index: -1};

        let particles = letters.letters[i].particles;
        let springs = letters.letters[i].springs;
        let xBounds = letters.letters[i].xBounds;
        let maxY = letters.letters[i].maxY;
        let supportParticles = letters.letters[i].supportParticles;
        let supportSprings  = letters.letters[i].supportSprings;
        let minDistFromFirstSquared = letters.letters[i].minDistFromFirstSquared;
        let minDistFromLastSquared = letters.letters[i].minDistFromLastSquared;

        let points = font.textToPoints(text[i], width/2 - letters.spacing*text.length/2 + letters.spacing*i, letters.startY, letters.height, {sampleFactor: letters.sampleFactor});
        for (let j = 0; j < points.length; j++) {
            let point = points[j];
            particles.push(new Particle(point.x, point.y));
            // Check for bounds for support particles
            if (point.x < xBounds.min) {
                xBounds.min = point.x;
            } else if (point.x > xBounds.max) {
                xBounds.max = point.x;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
            // Check for closest point to first and last points
            if (j != 0) {
                let distSquared = (point.x - points[0].x)**2 + (point.y - points[0].y)**2;
                if (distSquared < minDistFromFirstSquared.dist) {
                    minDistFromFirstSquared.dist = distSquared;
                    minDistFromFirstSquared.index = j;
                }
            }
            if (j != points.length-1) {
                let distSquared = (point.x - points[points.length-1].x)**2 + (point.y - points[points.length-1].y)**2;
                if (distSquared < minDistFromLastSquared.dist) {
                    minDistFromLastSquared.dist = distSquared;
                    minDistFromLastSquared.index = j;
                }
            }
        }

        for (let j = 0; j < particles.length; j++) {
            for (let k = j+1; k < particles.length; k++) {
                let a = particles[j];
                let b = particles[k];
                springs.push(new Spring(a, b, strength));
            }
        }

        supportParticles.push(new Particle(xBounds.min - support.offset, maxY));
        supportParticles.push(new Particle(xBounds.max + support.offset, maxY));

        for (let j = 0; j < particles.length - support.frequency; j+= support.frequency) {
            supportSprings.push(new Spring(supportParticles[0], particles[j], support.strength));
            supportSprings.push(new Spring(supportParticles[1], particles[j], support.strength));
        }
    }
}

function drawSoftBody() {
    for (let letter of letters.letters) {
        beginShape();
        vertex(letter.particles[letter.minDistFromFirstSquared.index].x, letter.particles[letter.minDistFromFirstSquared.index].y);
        for (let particle of letter.particles) {
            vertex(particle.x, particle.y);
        }
        vertex(letter.particles[letter.minDistFromLastSquared.index].x, letter.particles[letter.minDistFromLastSquared.index].y);
        endShape();
    }

    // Draw the support springs
    // for (let letter of letters.letters) {
    //     for (let spring of letter.supportSprings) {
    //         spring.show();
    //     }
    // }
}