/**
 * Created by william on 5/19/2016.
 */

var pi = "3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679";
var htmlEl = document.querySelector('html');
var audio = new webkitAudioContext();
var pastEl = document.querySelector('#past');
var scoreEl = document.querySelector('#score');
var padHt = '<tr>' +
        '<td class="num7">7</td> <td class="num8">8</td> <td class="num9">9</td>' +
    '</tr>' +
    '<tr>' +
        '<td  class="num4">4</td> <td class="num5">5</td> <td class="num6">6</td>' +
    '</tr>' +
    '<tr>' +
        '<td class="num1">1</td> <td class="num2">2</td> <td class="num3">3</td>' +
    '</tr>' +
    '<tr>' +
        '<td colspan="2" class="num0">0</td>' +
    '</tr>';
var keycodes =  [65,    83,68,70,   71,72,74,       75,76,186];//home row
var keycodes2 = [48,    49,50,51,   52,53,54,       55,56,57]; //nums
var keycodes3 = [96,    97,98,99,   100,101,102,    103,104,105]; // numpad
var spaceCode = 32;
var keys = "asdfghjkl;";
var digits = "0123456789";

var root = 200;
var currPlace = 0;
var score = 0;
var failed = false;

function reset() {
    score =0;
    scoreEl.innerHTML = score;
    pastEl.innerHTML = '';
    currPlace = 0;
    failed = false;
    htmlEl.classList.remove("failed");
}

function play(e){
    if (e.which == spaceCode) {
        return reset();
    }
    var index = keycodes.indexOf(e.which);
    var index2 = keycodes2.indexOf(e.which);
    var index3 = keycodes3.indexOf(e.which);
    if (index2 > index) {
        index= index2;
    }
    if (index3 > index) {
        index = index3;
    }

    if (index >= 0) {
        var correct = digits[index] == pi[currPlace];
        var currClass;
        var freq = root * Math.pow(2,pi[currPlace]/12);
        if (correct) {
            playCorrect(freq);
            currClass = 'correct';
            if (!failed){
                score++;
                scoreEl.innerHTML = score;
            }
        } else {
            playIncorrect(freq);
            failed = true;
            currClass = 'incorrect';
            htmlEl.classList.add("failed");
        }

        pastEl.insertAdjacentHTML('beforeend', "<table class='"+currClass+" digit"+pi[currPlace]+"'>" +  padHt + "</table>");
        pastEl.scrollTop=0;
        currPlace++;

        while (pi[currPlace] === '.' || pi[currPlace] === ' ') {

            currPlace++;
        }
    } else {
    }
}
var correct = 0;

document.onkeydown = play;

function playCorrect(freq) {
    var decay = 700;
    createOscillator(freq, decay);
}

function playIncorrect(freq) {
    var decay = 80.0;
    var offset = 40;

    playAt(freq*4, decay,    offset*0.0);
    playAt(freq*3, decay,    offset*1.0);
    playAt(freq*2, decay,    offset*2.0);
    playAt(freq*1, decay,    offset*3.0);
    playAt(freq*4, decay,    offset*4.0);
    playAt(freq*3, decay,    offset*5.0);
    playAt(freq*2, decay,    offset*6.0);
    playAt(freq*1, decay,    offset*7.0);
    playAt(freq*8, decay*5,  offset*8.0);
}

function playAt(freq, decay, offset) {
    setTimeout(x, offset);
    function x(){
        createOscillator(freq, decay);
    }
}

function createOscillator(freq, decay) {
    var attack = 0;
    var volume = 0.2;
    var gain = audio.createGain();
    var osc = audio.createOscillator();
    var t = audio.currentTime;
    gain.connect(audio.destination);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + attack / 1000);
    gain.gain.exponentialRampToValueAtTime(volume * 0.01, t + decay / 1000);
    osc.frequency.value = freq;
    osc.type = "square";
    osc.connect(gain);
    osc.start(0);

    setTimeout(audioTimeout, decay);
    function audioTimeout() {
        osc.stop(0);
        osc.disconnect(gain);
        gain.disconnect(audio.destination);
    }
}