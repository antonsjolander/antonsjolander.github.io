var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var screen = document.getElementById('myScreen');
var circColors = ['#FFA69E', '"FAF3DD' , '#87F5FB', '#DBD8F0' , '#52B2CF',  '#EED7C5']
var notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5','C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',]
var mouseX;
var mouseY;
var main_tl = new TimelineMax();
		
//Set the synthesizer
var reverb = new Tone.JCReverb(.9).connect(Tone.Master);
	reverb.wet = 1;
var delay = new Tone.FeedbackDelay(1); 
var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var filter = new Tone.Filter(200, "lowpass");
var polySynth = new Tone.PolySynth(6, Tone.Synth).connect(reverb, filter, pingPong);
		
		
		

polySynth.volume.value = -20;
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
    }, 'polyphony', 3)

////////////////////////////		

function init() {
	//set size of screen
	screen.style.width = WIDTH + "px";
	screen.style.height = HEIGHT + "px";
}
init();

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
	
	//Circle animation	
	TweenMax.from(circle, 1, {opacity:0, scale: 0.8, ease: Power1.easeOut})
	TweenMax.to(circle, 5, {delay:1, opacity:0, scale:0 , ease: Power3.easeInOut} )
			

}

		
//Update screen size 
window.addEventListener('resize', function() {
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	screen.style.width = WIDTH + "px";
	screen.style.height = HEIGHT + "px";
});

//Get random int
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//Click event		
screen.addEventListener('click', function(e) {
	mouseY = e.pageY;
	mouseX = e.pageX;
	//Append circle
	createCirc(mouseX, mouseY )
	//Play note	
	polySynth.triggerAttackRelease(notes[getRandomInt(0, notes.length)]);
});

