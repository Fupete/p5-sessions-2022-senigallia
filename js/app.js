// -
// P5-SESSIONS-2022-SENIGALLIA
// 2022 - Daniele @Fupete and the course DS-2022 at DESIGN.unirsm
// github.com/ds-2022-unirsm — github.com/fupete
// Educational purposes, CC0 license, 2022, San Marino
// —
/*    CREDITS
      the base keyboard VJ engine is heavily
      inspired and builded upon the work of
      George Gally Radarboy
      https://github.com/GeorgeGally/rbvj/
      && Salil Parekh
      https://github.com/burnedsap/p5-vj */
// —
// Credits/Thanks also to:
// original MIDI sketch IDEA: https://editor.p5js.org/cdaein/sketches/01tCK67N_
// ...
// —

// global var
let myp5;
let fs; // < fullscreen true/false
let video = null;
let Sound;
let midiData; // < MIDI data holder
let midiX, midiY;

let artFolder = "sketch";
let loc;
let fileref;

var current_file = 0;
var current_bank = 0;
var current_set = 0;

// Matter lib
Matter.use('matter-attractors');
const Runner = Matter.Runner;
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Common = Matter.Common;
const Composite = Matter.Composite;
const Vector = Matter.Vector;
let engine;

function setup() {
  // initialize mic hack > click mouse on screen during initial 5' seconds
  // of running to give permission to use microphone and contextual audio
  setTimeout(() => {
    Sound = new Microphone();
    console.log(Sound);
    changeFile(0);
  }, 5000);

  // setup MIDI
  if (navigator.requestMIDIAccess) console.log('This browser supports WebMIDI!')
  else console.log('WebMIDI is not supported in this browser.')
  navigator.requestMIDIAccess()
    .then(onMIDISuccess, function(e) {
      console.log('Could not access your MIDI devices: ', e)
    });
}

// Methods
function changeFile(file) {
  current_file = file;
  loc = current_set + '/' + current_bank + '/' + current_file;
  var filename = artFolder + '/' + loc + '.js';
  loadJS(filename);
  document.location.hash = loc;
  // console.log("File: " + loc + '.js');
}

function changeSet(set) {
  current_set = set;
  current_bank = 0;
  // console.log("changeSet: " + current_bank);
  // reset
  changeFile(0);
}

function changeBank(bank) {
  current_bank = bank;
  // console.log("changeBank: " + current_bank);
  changeFile(0);
}

function loadJS(filename) {
  if (fileref != undefined) {
    document.getElementsByTagName("head")[0].removeChild(fileref);
  }
  fileref = document.createElement('script');
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", filename);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  // success event
  fileref.addEventListener("load", () => {
    // console.log("File loaded")
    if (myp5) {
      myp5.remove();
      video = null;
      if (engine != undefined) {
        Engine.clear(engine);
        World.clear(engine.world);
        Render.stop(engine);
        Runner.stop(engine);
      }
    }
    myp5 = new p5(s1);
  });
  // error event
  // fileref.addEventListener("error", (ev) => {
  //   // console.log("Error on loading file", ev);
  // });
}