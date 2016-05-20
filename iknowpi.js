/**
 * Created by william on 5/19/2016.
 */

var pi = "3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679";

var audio = new window.AudioContext();
var currEl = document.querySelector('#current');
var pastEl = document.querySelector('#past');

var keycodes = [65,83,68,70,71,72,74,75,76,186];
var keys = "asdfghjkl;";
var digits = "0123456789";

var root = 200;
var currPlace = 0;
function play(e){
    var index = keycodes.indexOf(e.which);

    if (index >= 0) {

        if (digits[index] == pi[currPlace])
        {
            pastEl.innerHTML += pi[currPlace];
            currPlace++;
            while (pi[currPlace] === '.' || pi[currPlace] === ' ') {
                pastEl.innerHTML += pi[currPlace];
                currPlace++;
            }
            var freq = root * Math.pow(2,digits[index]/12);
            createOscillator(freq);
        }



        //currEl.innerHTML = digits[index];
        //pastEl.innerHTML += keys[index];
    } else {
        currEl.innerHTML = "";
        //createOscillator(root/4);
    }

}

var correct = 0;

document.onkeydown = play;
//    const scale = int(str, 12);
// const freq = 100 * Math.pow(2, (i - 2) / scale );

function createOscillator(freq) {
    var attack = 0;
    var decay = 700;
    var volume = 0.2;
    var gain = audio.createGain();
    var osc = audio.createOscillator();

    gain.connect(audio.destination);
    gain.gain.setValueAtTime(0, audio.currentTime);
    gain.gain.linearRampToValueAtTime(volume, audio.currentTime + attack / 1000);
    gain.gain.exponentialRampToValueAtTime(volume * 0.01, audio.currentTime + decay / 1000);

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