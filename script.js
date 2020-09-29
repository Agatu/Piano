const bars = document.querySelectorAll('.keyboard div');
const sounds = document.querySelectorAll('.soundbars audio');

function playSound() {

    sounds.forEach(sound => {
        if (this.classList.contains(sound.id)) {
            sound.currentTime = 0;
            sound.play();
        }
    }, false);

    const moveBar = () => {
        this.classList.add('grey', 'move');
        setTimeout(() => {
            this.classList.remove('grey', 'move')
        }, 150)
    };
    moveBar();
}

function playSoundWithKey(e) {
    sounds.forEach(sound => {
        if (e.keyCode == sound.dataset.key) {
            sound.currentTime = 0;
            sound.play();
            bars.forEach(bar => {
                if (bar.classList.contains(sound.id)) {
                    bar.classList.add('grey', 'move');
                    setTimeout(() => {
                        bar.classList.remove('grey', 'move');
                    }, 150)
                }
            })
        }
    }, false);
}


bars.forEach(bar => bar.addEventListener('mousedown', playSound));
window.addEventListener('keydown', playSoundWithKey);

//metronom

const metronomIcon = document.querySelector('nav .metronom');
const metronomIconParts = document.querySelectorAll('.metronom span')
const metronomNav = document.querySelector('.metronomNav');

const metrStartBtn = document.querySelector('.start');
const metrPlayBtn = document.querySelector('.fa-play');
const metrPauseBtn = document.querySelector('.fa-pause');
const beat = document.querySelector('audio.metronom');

const tempoMinus = document.querySelector('.fa-minus');
const tempoPlus = document.querySelector('.fa-plus');
const tempo = document.querySelector('.tempo span');
const metrCtrl1 = document.querySelector('.ctrl.c1');
const metrCtrl2 = document.querySelector('.ctrl.c2');


let time = 500;
let active = false;
let metronomOn;

const showMetronom = () => {
    metronomIconParts.forEach(metronomIconPart => {
        metronomIconPart.classList.toggle('show')
    });
    metronomNav.classList.toggle('show');
};

metronomIcon.addEventListener('click', showMetronom);

const metronom = () => {
    metrCtrl1.classList.add('show');
    if (!active) {
        active = !active;
        metronomOn = setInterval(() => {
            beat.currentTime = 0;
            beat.play();
            metrCtrl1.classList.toggle('show');
            metrCtrl2.classList.toggle('show');
        }, time);
        metrPlayBtn.classList.add('off');
        metrPauseBtn.classList.remove('off');

    } else {
        active = !active;
        clearInterval(metronomOn);
        metrPlayBtn.classList.remove('off');
        metrPauseBtn.classList.add('off');
        metrCtrl1.classList.remove('show');
        metrCtrl2.classList.remove('show');
    };
    tempo.textContent = (60000 / time).toFixed(0);
}

metrStartBtn.addEventListener('click', metronom);

const increaseTempo = () => {
    time -= 5;
    tempo.textContent = (60000 / time).toFixed(0);
    if (active) {
        clearInterval(metronomOn);
        metronomOn = setInterval(() => {
            beat.currentTime = 0;
            beat.play();
            metrCtrl1.classList.toggle('show');
            metrCtrl2.classList.toggle('show');
        }, time);
    }
};

const decreaseTempo = () => {
    time += 5;
    tempo.textContent = (60000 / time).toFixed(0);
    if (active) {
        clearInterval(metronomOn);
        metronomOn = setInterval(() => {
            beat.currentTime = 0;
            beat.play();
            metrCtrl1.classList.toggle('show');
            metrCtrl2.classList.toggle('show');
        }, time);
    }
};

tempoPlus.addEventListener('click', increaseTempo);
tempoMinus.addEventListener('click', decreaseTempo);


//Keybord letter hint

const keyboardIcon = document.querySelector('.fa-keyboard');
const notes = document.querySelectorAll('span.note');
const keyLetters = document.querySelectorAll('span.keyLetter');

const showLetters = () => {
    keyboardIcon.classList.toggle('show');
    notes.forEach(note => {
        note.classList.toggle('hide');
    });
    keyLetters.forEach(keyLetter => {
        keyLetter.classList.toggle('hide');
    });
};

keyboardIcon.addEventListener('click', showLetters);


//Fullscreen mode

document.body.addEventListener('dblclick', () => {
    document.documentElement.requestFullscreen().catch();
});