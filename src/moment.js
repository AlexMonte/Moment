const sunsets = [
    { name: 'default', start: "#6B0F3A", end: "#FF4E00" },
    { name: 'Mars Conquest', start: "#EC9F05", end: "#FF4E00" },
    { name: "Pollock's inspiration", start: "#B91372", end: "#6B0F1A" },
    { name: 'West Coast', start: "#AFF1DA", end: "#F9EA8F" },
    { name: 'Mars ambassador', start: "#FE5F75", end: "#FC9842" },
    { name: 'Wet Desert', start: "#F9ABA4", end: "#EFECEC" },
    { name: 'Entry Scene', start: "#864BA2", end: "#BF3A30" }
]

const defaults = {
    starCount: 50,
    minStarSize: 1,
    maxStarSize: 3,
    color: "#fff",
    animationSpeed: 16,
    motion: true,
    css: "MomentStyle",
    initialize: false,
    theme: 0,
    DEMO: false,
    fade: 0.2
}
const Key = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57

}

function Star(ctx, x, y, speed, size) {
    this.x = x;
    this.y = y;
    this.dx = size / speed;
    this.size = size;
    this.ctx = ctx;

    this.isAlive = true;

    this.remove = () => {
        this.isAlive = false;
    }

    this.draw = () => {
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    this.update = () => {
        if (this.x > 0) {
            this.x -= this.dx;
            this.draw();
        }
        else {
            this.remove();
        }
    }


}

let _addEventListener = (evt, element, fn) => {
    if (window.addEventListener) {
        element.addEventListener(evt, fn, false);
    }
    else {
        element.attachEvent('on' + evt, fn);
    }
}

class Moment {
    constructor(targetElement, options) {
        this.settings = { ...defaults, ...options };
        this.time = new Date();
        this.init(targetElement);
        window.requestAnimationFrame(this.update);
    }
    init = (targetElement) => {
        this.stars = [];

        if (typeof targetElement === 'string') {
            this.target = document.querySelector(targetElement);
        } else {
            this.target = targetElement;
        }
        this.loadCss(this.settings.css);
        this.canvas = document.createElement("canvas");
        this.target.appendChild(this.canvas);
        this.target.classList.add("skytarget");
        this.canvas.classList.add("moment");
        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', this.resize);

        if(this.settings.DEMO === true) {
            this.debug();
        }
    }
    loadCss = (cssID) => {
        if (document.getElementById(cssID)) { return };
        let head = document.getElementsByTagName("head")[0];
        let link = document.createElement("link");
        link.id = cssID;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './src/moment.css';
        link.media = 'all';
        head.appendChild(link);
    }
    randomizeStarSize = (min, max) => {
        return Math.floor(Math.random() * (min - max + min) + max);
    }
    randomizeStarPosition = function (value) {
        return Math.ceil(Math.random() * value) - 1;
    }
    createStar = () => {

    }
    draw = () => {
        // let time = this.time.getHours()
        let gradient = this.ctx.createLinearGradient(0, 0, 0, innerHeight);
        gradient.addColorStop(0, sunsets[this.settings.theme].start);
        gradient.addColorStop(this.settings.fade, sunsets[this.settings.theme].end);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, innerWidth, innerHeight)
        while (this.stars.length < this.settings.starCount) {

            this.stars.push(new Star(
                this.ctx,
                innerWidth + this.settings.maxStarSize,
                this.randomizeStarPosition(innerHeight),
                this.settings.animationSpeed,
                this.randomizeStarSize(this.settings.minStarSize, this.settings.maxStarSize)
            ));

        }
        this.settings.initialize = true;
    }
    update = () => {
        window.requestAnimationFrame(this.update);
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.draw();
        for (let i = 0; i < this.stars.length; i++) {
            if (!this.stars[i].isAlive) {
                this.stars.splice(i, 1);
            }
            this.stars[i].update();
        }
        if(this.settings.DEMO === true) {

        }

    }
    input = (evt) => {
        if (!evt) { evt = window.event; } // for old IE compatible
        var keycode = evt.keyCode || evt.which; // also for cross-browser compatible
        switch (keycode) {
            case Key.LEFT:
                this.settings.starCount -= 1;
                break;
            case Key.UP:
                if (this.settings.fade + 0.1 < 1) {
                    this.settings.fade += 0.1;
                    console.log(this.settings.fade);
                }
                break;
            case Key.DOWN:
                if (this.settings.fade - 0.1 > 0) {
                    this.settings.fade -= 0.1;
                    console.log(this.settings.fade);
                }
                break;
            case Key.RIGHT:
                this.settings.starCount += 1;
                break;
            case Key.ZERO:
                this.settings.theme = 0;
                break;
            case Key.ONE:
                this.settings.theme = 1;
                break;
            case Key.TWO:
                this.settings.theme = 2
                break;
            case Key.THREE:
                this.settings.theme = 3;
                break;
            case Key.FOUR:
                this.settings.theme = 4;
                break;
            case Key.FIVE:
                this.settings.theme = 5;
                break;
            case Key.SIX:
                this.settings.theme = 6;
                break;
            default:
             //   this.info.innerHTML += "SOMEKEY ";
        }
    }
    resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.stars = [];
        while (this.stars.length < this.settings.starCount) {
            this.stars.push(new Star(
                this.ctx,
                this.randomizeStarPosition(innerWidth),
                this.randomizeStarPosition(innerHeight),
                this.settings.animationSpeed,
                this.randomizeStarSize(this.settings.minStarSize, this.settings.maxStarSize)
            ));

        }
    }

    debug = () => {
        this.info = document.createElement("span",);
        this.info.classList.add("debug");
        
        this.target.appendChild(this.info);
    
    _addEventListener('keydown', document, this.input);

    }
}

