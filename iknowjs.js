/**
 * Created by william on 5/19/2016.
 * Contributions by nooreen on 5/21/2016
 */

/*

  //TODO: here's an interesting bug that show more on mobile than desktop
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679".split("").forEach(
    function(number){play(number);
  });
  // fix is to only ever push numbers to a queue and constantly process queue
  // using play function instead of handling numbers synchronously, yeh?
*/

var pi = "3.1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679";

// this is a shortcut so people don't have to type document.querySelector ewww
function q(selector) {
    return document.querySelector(selector);
}

var htmlEl = q('html');

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audio = new AudioContext();

function isMobileOrTablet() {
    var agent = (navigator.userAgent || navigator.vendor || window.opera);
    return ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4))
    );
}

function buildKey(number) {
  var key = document.createElement("key");
  var span = document.createElement("span");
  span.innerHTML = number;
  key.appendChild(span);
  key.addEventListener("click", function(event){
    play(Number(event.target.innerText));
  });
  return key;
}

if (isMobileOrTablet()) {
    q('html').classList.add('mobile');
    [1,2,3,4,5,6,7,8,9,0].forEach(function(number){
      q('keypad').appendChild(
        buildKey(number)
      );
    });
}

var pastEl = q('past');
var scoreEl = q('score');
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

var keycodesNumberRow = [48, 49, 50, 51,  52,  53,  54,  55,  56,  57];
var keycodesNumberPad = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
var spaceCode = 32;
var leftArrowCode = 37;
var rightArrowCode = 39;
var digits = "0123456789";

var root = 200;
var currPlace = 0;
var score = 0;
var failed = false;
var blankCards = 0;

function reset() {
    score = 0;
    scoreEl.innerHTML = score;
    pastEl.innerHTML = '';
    currPlace = 0;
    blankCards = 0;
    failed = false;
    htmlEl.classList.remove("failed");
}

function insertBlankCard() {
    blankCards = blankCards + 1;
    pastEl.insertAdjacentHTML('beforeend', "<table>" + padHt + "</table>");
    pastEl.scrollTop = 0;
}

function removeBlankCardIfExists() {
    if (blankCards > 0) {
        q('past').removeChild(q('past table:last-child'));
        blankCards = blankCards - 1;
    }
}

function playEvent(e) {
  if (e.which == spaceCode) {
      return reset();
  }
  if (e.which == rightArrowCode) {
      return insertBlankCard();
  }
  if (e.which == leftArrowCode) {
      return removeBlankCardIfExists();
  }

  var indexNumberRow = keycodesNumberRow.indexOf(e.which);
  var indexNumberPad = keycodesNumberPad.indexOf(e.which);

  var numberPressed = -1;
  if (indexNumberRow > numberPressed) {
      numberPressed = indexNumberRow;
  }
  if (indexNumberPad > numberPressed) {
      numberPressed = indexNumberPad;
  }
  return play(numberPressed);
}

function play(numberPressed) {
    if (numberPressed >= 0) {
        var correct = digits[numberPressed] == pi[currPlace];
        var currClass;
        var freq = root * Math.pow(2, pi[currPlace] / 12);
        if (correct) {
            playCorrect(freq);
            currClass = 'correct';
            if (!failed) {
                score++;
                scoreEl.innerHTML = score;
            }
        } else {
            playIncorrect(freq);
            failed = true;
            currClass = 'incorrect';
            htmlEl.classList.add("failed");
        }

        pastEl.insertAdjacentHTML('beforeend', "<table class='" + currClass + " digit" + pi[currPlace] + "'>" + padHt + "</table>");
        pastEl.scrollTop = 0;
        currPlace++;
        blankCards = 0;

        while (pi[currPlace] === '.' || pi[currPlace] === ' ') {
            currPlace++;
        }
    }
}

document.onkeydown = playEvent;

function playCorrect(freq) {
    var decay = 700;
    createOscillator(freq, decay);
}

function playIncorrect(freq) {
    var decay = 80.0;
    var offset = 40;

    playAt(freq * 4, decay, 0.0);
    playAt(freq * 3, decay, offset);
    playAt(freq * 2, decay, offset * 2.0);
    playAt(freq * 1, decay, offset * 3.0);
    playAt(freq * 4, decay, offset * 4.0);
    playAt(freq * 3, decay, offset * 5.0);
    playAt(freq * 2, decay, offset * 6.0);
    playAt(freq * 1, decay, offset * 7.0);
    playAt(freq * 8, decay * 5, offset * 8.0);
}

function playAt(freq, decay, offset) {
    setTimeout(x, offset);
    function x() {
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