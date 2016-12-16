var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;
		var screen = document.getElementById('myScreen');
		var circColors = ['#FFA69E', '"FAF3DD' , '#87F5FB', '#DBD8F0' , '#52B2CF',  '#EED7C5']
		var notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5','C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',]
		var mouseX;
		var mouseY;
		var main_tl = new TimelineMax();

		// var synth = new Tone.Synth({
		//     "oscillator" : {
		//         "type" : "sine",
		//         "modulationFrequency" : 0.2
		//     },
		//     "envelope" : {
		//         "attack" : 0.01,
		//         "decay" : 0.1,
		//         "sustain" : 0.01,
		//         "release" : 0.01,
		//     }
		// }).toMaster();
		
		var reverb = new Tone.JCReverb(5).connect(Tone.Master);
		reverb.wet = 1;
		var delay = new Tone.FeedbackDelay(1); 
		var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
		var filter = new Tone.Filter(200, "lowpass");

		var polySynth = new Tone.PolySynth(6, Tone.Synth).connect(reverb, filter);
		
		var chord = new Tone.Event(function(time, chord){
	//the chord as well as the exact time of the event
	//are passed in as arguments to the callback function
		}, ["D4", "E4", "F4"]);

		//start the chord at the beginning of the transport timeline
		chord.start();
		//loop it every measure for 8 measures
		chord.loop = 8;
		chord.loopEnd = "1m";
		
		

		polySynth.volume.value = -20;
		polySynth.set({
		    "oscillator" : {
		        "type" : "sine",
		        "modulationFrequency" : 0.5
		    },
		    "envelope" : {
		        "attack" : 0.1,
		        "decay" : 0.1,
		        "sustain" : 0.0001,
		        "release" : 0.001,
		    }
		    
		}, 'polyphony', 3)

		

		function init() {
			
			
			

			//set size of screen
			screen.style.width = WIDTH + "px";
			screen.style.height = HEIGHT + "px";

			console.log(WIDTH, HEIGHT)


		}
		function createCirc(x, y) {
			var circle = document.createElement("div");
			var circleSize = getRandomInt(5, 500)
			screen.appendChild(circle);
			circle.style.borderRadius = '50%';
			circle.style.backgroundColor = circColors[getRandomInt(0, circColors.length)]
			circle.style.position = "absolute"
			circle.style.width = circleSize + "px"
			circle.style.height = circleSize + "px"
			circle.style.top = y + "px";
			circle.style.left = x + "px";
			
			TweenMax.from(circle, 1, {opacity:0, scale: 0.8, ease: Power1.easeInOut})
			TweenMax.to(circle, 5, {delay:1, opacity:0, scale:0 , ease: Power2.easeInOut} )

		}

		
		//Resize the screen 
		window.addEventListener('resize', function() {
			var WIDTH = window.innerWidth;
			var HEIGHT = window.innerHeight;
			
			//Update screen size
			screen.style.width = WIDTH + "px";
			screen.style.height = HEIGHT + "px";
		});

		function getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
		}

		screen.addEventListener('click', function(e) {
			mouseY = e.pageY;
			mouseX = e.pageX;
			createCirc(mouseX, mouseY )
		
			polySynth.triggerAttackRelease(notes[getRandomInt(0, notes.length)]);
			
		
			
			

			console.log( (mouseX / 8) * 2 )
		});
		init();