// MIDI
function onMIDISuccess(midiAccess) {
  const midi = midiAccess
  const inputs = midi.inputs.values()
  const input = inputs.next()
  console.log(input)
  input.value.onmidimessage = onMIDIMessage
}

function onMIDIMessage(message) {
  midiData = message.data
  if (midiData[0] == 176) { // 176 = shift-numero
    changeSet(midiData[1]);
  } else if (midiData[0] == 177) { // 177 = numero
    changeFile(midiData[1]);
  } else if (midiData[0] == 178) { // 178 = right arrow
    // console.log("trigger");
    if (myp5.trigger)
      myp5.trigger();
  } else if (midiData[0] == 179) { // 179/0 e 179/1 = x/y < da 0 a 99
    let midiX = map(midiData[1], 0, 99, 0, w);
    let midiY = map(midiData[2], 0, 99, 0, h);
    if (myp5.coordinateMidi)
      myp5.coordinateMidi(midiX, midiY);
    //console.log("x:" + midiX + " / y:" + midiY)
  } else if (midiData[0] == 180) { // touch x/y
    if (myp5.toggleMidiMouseOn)
      myp5.toggleMidiMouseOn();
  } else if (midiData[0] == 181) { // mic gain
    if (midiData[1] == 1) {
      let gain = midiData[2];
      if (myp5.setMicGain)
        myp5.setMicGain(gain);
    }
  }
  midiData = [];
}