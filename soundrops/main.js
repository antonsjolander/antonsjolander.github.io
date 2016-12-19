var if_mobile = document.getElementById('if_mobile');
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var screen = document.getElementById('myScreen');
var startScreen = document.getElementById('startScreen');
var text_box = document.getElementById('text_box');
var start_ios = document.getElementById('start_ios');

var circColors = ['#FFA69E', '"FAF3DD' , '#87F5FB', '#DBD8F0' , '#52B2CF',  '#EED7C5']
var notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5','C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',]
var mouseX;
var mouseY;
var main_tl = new TimelineMax();
		
//Set the synthesizer
var context = new AudioContext();
var reverb = new Tone.JCReverb(.9).connect(Tone.Master);
	reverb.wet = 1;
var delay = new Tone.FeedbackDelay(1); 
var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var filter = new Tone.Filter(200, "lowpass");
var polySynth = new Tone.PolySynth(6, Tone.Synth).connect(reverb, filter, pingPong);
var polySynth_2 = new Tone.PolySynth(6, Tone.Synth).connect(reverb, filter, pingPong);
		
		
		

polySynth.volume.value = -40;
polySynth.set({
	"oscillator" : {
	"type" : "sine",
	"modulationFrequency" : 0.5
	},
	"envelope" : {
	"attack" : 0.1,
	"decay" : 0.1,
	"sustain" : 0,
	"release" : 0,
	}
    }, 'polyphony', 7)

polySynth_2.volume.value = -40;
polySynth_2.set({
	"oscillator" : {
	"type" : "sine",
	"modulationFrequency" : 0.5
	},
	"envelope" : {
	"attack" : 0.1,
	"decay" : 0.1,
	"sustain" : 0,
	"release" : 0,
	}
    }, 'polyphony', 7)

console.log(polySynth.volume.value,polySynth_2.volume.value )


////////////////////////////	

function bgTones(scale, tone2, tone3) {
	polySynth_2.triggerAttackRelease(scale + "2");
	polySynth_2.triggerAttackRelease(scale + "3");
	polySynth_2.triggerAttackRelease(tone2 + "4");
	polySynth_2.triggerAttackRelease(tone3 + "4");
	
}	

function init() {
	//set size of screen
	screen.style.width = WIDTH + "px";
	screen.style.height = HEIGHT + "px";
	startScreen.style.width = WIDTH + "px";
	startScreen.style.height = HEIGHT + "px";

	text_box.style.top = (HEIGHT/2) - (text_box.clientHeight/2) + "px";
	text_box.style.left = (WIDTH/2) - (text_box.clientWidth/2) + "px";

}
init();

function startAnimation() {
	var txt_1 = document.getElementById('txt_1');
	var txt_2 = document.getElementById('txt_2');
	if(isMobile === true){
	TweenMax.to(txt_1, 3, {opacity:1 , ease: Power2.easeInOut})
	TweenMax.to(txt_2, 3, {delay:2, opacity:1 , ease: Power2.easeInOut})
	TweenMax.to(start_ios, 3, {delay:2.1, opacity:1 , ease: Power2.easeInOut})

	}else{
	TweenMax.to(txt_1, 3, {opacity:1 , ease: Power2.easeInOut})
	TweenMax.to(txt_2, 3, {delay:2, opacity:1 , ease: Power2.easeInOut})
	TweenMax.to(startScreen, 2, {delay:5.5, autoAlpha:0 , ease: Power2.easeInOut})
	}
}
startAnimation();

function createCirc(x, y) {
	//Create the circles 
	var circle = document.createElement("div");
	var circleSize = getRandomInt(5, 500)
	screen.appendChild(circle);
	circle.style.borderRadius = '50%';
	circle.style.backgroundColor = randomColor({luminosity: 'light', hue: 'random'});
	circle.style.position = "absolute"
	circle.style.width = circleSize + "px"
	circle.style.height = circleSize + "px"
	circle.style.top = y - (circleSize / 2) + "px";
	circle.style.left = x - (circleSize / 2) + "px";
	circle.style.blendMode = "multiply"
	//Circle animation	
	TweenMax.from(circle, 1, {opacity:0, scale: 0.8, ease: Power1.easeOut})
	TweenMax.to(circle, 5, {delay:1, opacity:0, scale:0 , ease: Power3.easeInOut, onComplete: removeDiv} )
			
	function removeDiv() {
		circle.remove();
	
	}

}

		
//Update screen size 
window.addEventListener('resize', function() {
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	screen.style.width = WIDTH + "px";
	screen.style.height = HEIGHT + "px";
	startScreen.style.width = WIDTH + "px";
	startScreen.style.height = HEIGHT + "px";


	text_box.style.top = (HEIGHT/2) - (text_box.clientHeight/2) + "px";
	text_box.style.left = (WIDTH/2) - (text_box.clientWidth/2) + "px";
});

//Get random int
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//Click event
if(isMobile === true){
	screen.addEventListener('touchstart', function(e) {
	mouseY = e.pageY;
	mouseX = e.pageX;
	//Append circle
	e.preventDefault()
	createCirc(mouseX, mouseY )
	//Play note	
	polySynth.triggerAttackRelease(notes[getRandomInt(0, notes.length)]);

	
});}else{		
	screen.addEventListener('click', function(e) {
	mouseY = e.pageY;
	mouseX = e.pageX;
	//Append circle
	e.preventDefault()
	createCirc(mouseX, mouseY )
	//Play note	
	polySynth.triggerAttackRelease(notes[getRandomInt(0, notes.length)]);
	
	
});}

startScreen.addEventListener('click', function() {
	TweenMax.to(startScreen, 2, {autoAlpha:0 , ease: Power2.easeInOut});
	
})

//Start sound on ios
StartAudioContext(Tone.context, '#startScreen').then(function(){
    //started
})



//Spacebar event 
document.body.onkeyup = function(e){
    if(e.keyCode == 65){
        bgTones('C','E','G');
        TweenMax.to(screen, .1, {backgroundColor:'#A3E9B8', ease: Linear.easeInOut})
        TweenMax.to(screen, 1, {delay:1, backgroundColor:'#E5E5E5', ease: Linear.easeInOut})
    }
    if(e.keyCode == 83){
        bgTones('E', 'G' , 'B');
        TweenMax.to(screen, .1, {backgroundColor:'#E6B7E0', ease: Linear.easeInOut})
        TweenMax.to(screen, 1, {delay:1, backgroundColor:'#E5E5E5', ease: Linear.easeInOut})
    }
    if(e.keyCode == 68){
        bgTones('F', 'A' , 'C');
        TweenMax.to(screen, .1, {backgroundColor:'#97D7E7', ease: Linear.easeInOut})
        TweenMax.to(screen, 1, {delay:1, backgroundColor:'#E5E5E5', ease: Linear.easeInOut})
    }

}

