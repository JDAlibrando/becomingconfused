let n, mode, tonic, musicScale, interval, note, noteNum;
let osc1, osc2, osc3, osc4, oscVoice;
let chord, notes, prog, time;
let env, del, rev;
let majorButton, minorButton, lydianButton, harmonicButton;
let twoFiveOneButton, longProgressionButton, oneFiveFourButton;
let ampSlider, speedSlider;
let cirMode, cirProg, cirSig, onOff, bmo;

function preload() {
  bmo = createImg("BMO.gif", "BMO");
  bmo.size(60, 65);
  bmo.position(280, 10);
}

function setup() {
  createCanvas(350, 170);
  image(bmo, 0, 0);
  slidersAndButtons();
  delay = new p5.Delay();
  rev = new p5.Reverb();
  env = new p5.Envelope(0.01, ampSlider.value(), 1.5, 0.01);
  osc1 = new p5.Oscillator("sine");
  osc2 = new p5.Oscillator("sine");
  osc3 = new p5.Oscillator("sine");
  osc4 = new p5.Oscillator("sine");
  oscVoice = new p5.Oscillator("sine");
  mode = modeLibrary.MI;
  tonic = noteLibrary.D;
  musicScale = new Scale(tonic, mode);
  prog = "2-5-1"
  onOff = 1;
  noteNum = 1;
  time = 5;
  n = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  let left = 260;
  let right = 260 + 60;
  let top = 10;
  let bottom = 10 + 65;
  if (mouseX > left && mouseX < right && mouseY < bottom && mouseY > top) {
    if (onOff === 0) {
      noLoop();
      onOff = 1;
    } else if (onOff === 1) {
      loop();
      onOff = 0;
    }
  }
}

function slidersAndButtons() {
  ampSlider = createSlider(0.001, 0.5, 0.25, 0.01);
  ampSlider.position(10, 10);

  speedSlider = createSlider(1, 5, 3, 0.05);
  speedSlider.position(10, 40);
  
  majorButton = createButton("Major");
  majorButton.mousePressed(major);
  majorButton.position(10, 81);
  
  minorButton = createButton("Minor");
  minorButton.mousePressed(minor);
  minorButton.position(60, 81);
  
  lydianButton = createButton("Lydian");
  lydianButton.mousePressed(lydian);
  lydianButton.position(110, 81);
  
  harmonicButton = createButton("Harmonic Minor");
  harmonicButton.mousePressed(harmonic);
  harmonicButton.position(165, 81);
  
  twoFiveOneButton = createButton("2-5-1");
  twoFiveOneButton.mousePressed(twoFiveOne);
  twoFiveOneButton.position(10, 130);
  
  longProgressionButton = createButton("2-5-3-6-4-2-5-1");
  longProgressionButton.mousePressed(longProgression);
  longProgressionButton.position(58, 130);
  
  bluesButton = createButton("1-4-5");
  bluesButton.mousePressed(oneFourFive);
  bluesButton.position(165, 130);
  
//   fourButton = createButton("Half");
//   fourButton.mousePressed(four);
//   fourButton.position(240, 130);
  
//   threeButton = createButton("Full");
//   threeButton.mousePressed(three);
//   threeButton.position(285, 130);

  
  cirMode = [10+10, 81];
  cirProg = [58+10, 130];
  // cirSig = [240+10, 130];
}

function draw() {
  background(300);
  noStroke()
  textSize(15);
  fill(50);
  text("Volume", 150, 25);
  text("Tempo", 150, 55);
  text("Chord Progression", 10, 125);
  text("Mode", 10, 77);
  text("play/\npause", 300, 90);
  fill(200, 20, 20, 100);
  circle(cirProg[0], cirProg[1], 20);
  circle(cirMode[0], cirMode[1], 20);
  // circle(cirSig[0], cirSig[1], 20);
  frameRate(speedSlider.value());
  env = new p5.Envelope(0.01, ampSlider.value(), 1/(speedSlider.value()-0.2), 0.01);
  if (n%200<190) {
    if (prog === "2-5-3-6-4-2-5-1") {
    classical();
    }
    if (prog === "2-5-1") {
      jazz();
    }
    if (prog === "1-4-5") {
      blues();
    }
  }
  if (n%120>40) {
    playMelody();
  }
  n++
}

function major() {
  mode = modeLibrary.MI;
  tonic = noteLibrary.D;
  musicScale = new Scale(tonic, mode);
  cirMode = [10+10, 81];
}

function minor() {
  mode = modeLibrary.MII;
  tonic = noteLibrary.D;
  musicScale = new Scale(tonic, mode);
  cirMode = [60+10, 81];
}

function lydian() {
  mode = modeLibrary.MIV;
  tonic = noteLibrary.D;
  musicScale = new Scale(tonic, mode);
  cirMode = [110+10, 81];
}

function harmonic() {
  mode = modeLibrary.HII;
  tonic = noteLibrary.D;
  musicScale = new Scale(tonic, mode);
  cirMode = [165+10, 81];
}

function twoFiveOne() {
  prog = "2-5-1";
  cirProg = [10+10, 130];
}

function longProgression() {
  prog = "2-5-3-6-4-2-5-1";
  cirProg = [58+10, 130];
}
function oneFourFive() {
  prog = "1-4-5";
  cirProg = [165+10, 130];
}

function four() {
  time = 5;
  cirSig = [240+10, 130];
}

function three() {
  time = 2;
  cirSig = [285+10, 130];
}

function playMelody() {
  let oct = 5;
  let notes = getNotes(interval, 3, 1, oct, 0);
  let l = oddsMachine([1, 0, 3, 5]);
  let number = oddsMachine([1, 1, 1]);
  if (n === 0){
    noteNum = interval;
    note = notes[number];
  }
  if (l === 0) {
    noteNum = interval;
    note = notes[number];
    oscVoice.stop();
    oscVoice.freq(note, 0);
    oscVoice.start();
    delay.process(oscVoice, 0.10, 0.5, 2300);
    env.play(oscVoice);
  }
  if (l === 1) {
    if (note < 1000) {
      oscVoice.stop();
      oscVoice.freq(note, 0);
      oscVoice.start();
      delay.process(oscVoice, 0.10, 0.5, 2300);
      env.play(oscVoice);
    }
  }
  if (l === 2) {
  }
  if (l === 3) {
    let direction = oddsMachine([15, 15, 1, 1, 1]);
    if (direction === 0) {
      if (interval < 7) {
        noteNum += 1;
        noteNum = noteNum;
        note = musicScale.scale[noteNum]*(2**oct);
      } else {
        noteNum = 7-noteNum;
        oct = 5;
        note = musicScale.scale[noteNum]*(2**oct);
      }
    }
    if (direction === 1) {
      if (interval > 1) {
         noteNum += -1;
         noteNum = noteNum;
        note = musicScale.scale[noteNum]*(2**oct);
      } else {
        noteNum += -1;
        noteNum = (noteNum+7)%8;
        oct = 4;
        note = musicScale.scale[noteNum]*(2**oct);
      }
    }
    if (direction === 2) {
      if (interval > 1) {
         noteNum += 1;
      }
      note *= pow(2, 1/12);
    }
    if (direction === 3) {
      if (interval > 1) {
         noteNum += -1;
      }
      note *= 1/pow(2, 1/12);
    }
    if (direction === 4) {
      noteNum += 6
      noteNum = noteNum%8;
      note = musicScale.scale[6]*(2**5);
    }
    if (note > 0) {
      oscVoice.stop();
      oscVoice.freq(note, 0);
      oscVoice.start();
      delay.process(oscVoice, 0.10, 0.5, 2300);
      env.play(oscVoice);
    }
  }
}

function jazz() {
  let notes;
  let chord;
  let len = 3;
  let baseNoteNumber = oddsMachine([5, 1]);
  let number = oddsMachine([0, 1, 1, 10, 5]);
  let topNoteNumber = baseNoteNumber + number;
  let noteNumber = [baseNoteNumber, topNoteNumber];
  let baseNote = oddsMachine([1, 8]);
  let rate = oddsMachine([0, 3, 1]);
  inversion = oddsMachine([0, 1, 3, 2, 1]);
  if ((n%floor((len*time)/rate) === floor((0*time)/rate))) {
    notes = getNotes(2, noteNumber, inversion, 4, baseNote);
    interval = 2;
    playChord(notes);
  } else if ((n%floor((len*time)/rate) === floor((1*time)/rate))) {
    notes = getNotes(5, noteNumber, inversion, 4, baseNote);
    interval = 5;
    playChord(notes);
  } else if ((n%floor((len*time)/rate) === floor((2*time)/rate))) {
    notes = getNotes(1, noteNumber, inversion, 4, baseNote);
    interval = 1;
    playChord(notes);
  } else {
    if (n%3 === 0) {
      notes = getNotes(interval, noteNumber, inversion, 4, baseNote);
    playChord(notes);
    }
  }
}

function blues() {
 let notes;
  let chord;
  let len = 3;
  let baseNoteNumber = oddsMachine([5, 1]);
  let number = oddsMachine([0, 1, 1, 10, 5]);
  let topNoteNumber = baseNoteNumber + number;
  let noteNumber = [baseNoteNumber, topNoteNumber];
  let baseNote = oddsMachine([1, 8]);
  let rate = oddsMachine([0, 3, 1]);
  inversion = oddsMachine([0, 1, 3, 2, 1]);
  if (n%floor((len*time)/rate) === floor((0*time)/rate)) {
    notes = getNotes(1, noteNumber, 1, 4, baseNote);
    interval = 1;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((1*time)/rate)) {
    notes = getNotes(4, noteNumber, 3, 4, baseNote);
    interval = 4;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((2*time)/rate)) {
    notes = getNotes(5, noteNumber, 4, 4, baseNote);
    interval = 5;
    playChord(notes);
  } else {
    if (n%3 === 0) {
      notes = getNotes(interval, noteNumber, inversion, 4, baseNote);
    playChord(notes);
    }
  }
}

function classical() {
  let notes;
  let chord;
  let len = 8;
  let baseNoteNumber = oddsMachine([5, 1]);
  let number = oddsMachine([0, 1, 1, 10, 5]);
  let topNoteNumber = baseNoteNumber + number;
  let noteNumber = [baseNoteNumber, topNoteNumber];
  let speed = oddsMachine([0, 1, 3]);
  let baseNote = oddsMachine([1, 8]);
  let rate = oddsMachine([0, 3, 1, 1]);
  inversion = oddsMachine([0, 1, 2, 2]);
  if (n%floor(len*time) === floor(0/rate)) {
    notes = getNotes(2, noteNumber, inversion, 4, baseNote);
    interval = 2;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((1*time)/rate)) {
    notes = getNotes(5, noteNumber, inversion, 4, baseNote);
    interval = 5;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((2*time)/rate)) {
    notes = getNotes(3, noteNumber, inversion, 4, baseNote);
    interval = 3;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((3*time)/rate)) {
    notes = getNotes(6, noteNumber, inversion, 4, baseNote);
    interval = 6;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((4*time)/rate)) {
    notes = getNotes(4, noteNumber, inversion, 4, baseNote);
    interval = 4;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((5*time)/rate)) {
    notes = getNotes(2, noteNumber, inversion, 4, baseNote);
    interval = 2;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((6*time)/rate)) {
    notes = getNotes(5, noteNumber, inversion, 4, baseNote);
    interval = 5;
    playChord(notes);
  } else if (n%floor((len*time)/rate) === floor((7*time)/rate)) {
    notes = getNotes(1, noteNumber, inversion, 4, baseNote);
    interval = 1;
    playChord(notes);
  } else {
    if (n%3 === 0) {
      notes = getNotes(interval, noteNumber, inversion, 4, baseNote);
    playChord(notes);
    }
  }
}


function getNotes(interval, noteAmount = 3, inversion = 1, octive = 4, bassNumber = 1) {
    let chord = new Chord(musicScale, getChord(interval, noteAmount));
    notes = chord.getChord(octive, inversion, bassNumber);
    return notes;
}

function getChord(interval, amount) {
  let chord;
  if (amount.length === 2) {
    chord = chordList[interval-1].slice(amount[0], amount[1]);
  } else {
    chord = chordList[interval-1].slice(0, amount);
  }
  return chord;
}

function playChord(freq) {
  let len = freq.length;
  if (len === 0) {
  }
  if (len === 1) {
    osc1.stop();
    osc2.stop();
    osc3.stop();
    osc4.stop();
    osc1.freq(freq[0], 0);
    osc1.start();
  }
  if (len === 2) {
    osc1.stop();
    osc2.stop();
    osc3.stop();
    osc4.stop();
    osc1.freq(freq[0], 0);
    osc2.freq(freq[1], 0);
    osc1.start();
    osc2.start();
  }
  if (len === 3) {
    osc1.stop();
    osc2.stop();
    osc3.stop();
    osc4.stop();
    osc1.freq(freq[0], 0);
    osc2.freq(freq[1], 0);
    osc3.freq(freq[2], 0);
    osc1.start();
    osc2.start();
    osc3.start();
  }
  if (len === 4) {
    osc1.stop();
    osc2.stop();
    osc3.stop();
    osc4.stop();
    osc1.freq(freq[0], 0);
    osc2.freq(freq[1], 0);
    osc3.freq(freq[2], 0);
    osc4.freq(freq[3], 0);
    osc1.start();
    osc2.start();
    osc3.start();
    osc4.start();
  }
  processOsc();
}

function processOsc() {
  delay.process(osc1, 0.12, 0.5, 2300);
  delay.process(osc2, 0.12, 0.5, 2300);
  delay.process(osc3, 0.12, 0.5, 2300);
  delay.process(osc4, 0.12, 0.5, 2300);
  env.play(osc1);
  env.play(osc2);
  env.play(osc3);
  env.play(osc4);
  
}

function oddsMachine(ratio) {
  let odds = [];
  let n = 0;
  for (let number of ratio) {
    for (let i = 0; i < number; i++) {
      append(odds, n);
    }
    n++
  }
  let outcome = random(odds);
  return outcome;
}
