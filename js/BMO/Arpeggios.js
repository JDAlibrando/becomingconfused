class Scale {
  constructor(tonic, mode) {
    this.tonic = tonic;
    this.mode = mode;
    this.scale = this.makeScale(tonic, mode);
  }

  makeScale(tonic, mode) {
    let frequencies = [];
    let halfStep = pow(2, 1 / 12);
    for (let i = 0; i < 3; i++) {
      for (let amount of mode) {
        let note = tonic * 2**i;
        for (let n = 0; n < amount; n++) {
          note = note * halfStep;
        }
        append(frequencies, note);
      }
    }
    return frequencies;
  }

  makeJust() {
    let tonic = this.tonic;
    let mode = this.mode;
    let frequencies = [];
    let note = tonic;
    for (let amount of mode) {
      if (amount === 0) {
      } else if (amount === 1) {
        note += note * (1 / 15);
      } else if (amount === 2) {
        note += note * (1 / 8);
      } else if (amount === 3) {
        note += note * (1 / 5);
      } else if (amount === 4) {
        note += note * (1 / 4);
      } else if (amount === 5) {
        note += note * (1 / 3);
      } else if (amount === 6) {
        note += note * (13 / 32);
      } else if (amount === 7) {
        note += note * (1 / 2);
      } else if (amount === 8) {
        note += note * (3 / 5);
      } else if (amount === 9) {
        note += note * (2 / 3);
      } else if (amount === 10) {
        note += note * (4 / 5);
      } else if (amount === 11) {
        note += note * (7 / 8);
      } else if (amount === 12) {
        note += note * 1;
      }
      append(frequencies, note);
    }
    this.scale = frequencies;
  }
}

class Chord {
  constructor(scale, notes) {
    this.notes = this.getNotes(scale, notes);
    this.scale = scale.scale;
  }

  getNotes(scale, notes) {
    let chordNotes = [];
    for (let note of notes) {
      let chordNote = scale.scale[note - 1];
      append(chordNotes, chordNote);
    }
    return chordNotes;
  }

  getChord(octive, inversion, spread) {
    let chordLength = this.notes.length;
    let chord = [];
    for (let i = 0; i < chordLength; i++) {
      let note;
      if (i < chordLength - (inversion - 1)) {
        note = this.notes[i] * 2 ** octive;
      } else {
        note = this.notes[i] * 2 ** (octive - 1);
      }
      append(chord, note);
    }
    let spreadChord = [];
    for (let i = 0; i < chord.length; i++) {
      let note;
      if (i < spread) {
        if ((chord[i] * (1 / 4)) <= this.scale[0]*4) {
          note = chord[i] * (1 / 2);
        } else {
          note = chord[i] * (1 / 4);
        }
      } else {
        note = chord[i];
      }
      append(spreadChord, note);
    }
    chord = spreadChord;
    chord.sort();
    return chord;
  }
}


let chordList = [
  [1+0, 3+0, 5+0, 7+0, 9+0, 11+0, 13+0],
  [1+1, 3+1, 5+1, 7+1, 9+1, 11+1, 13+1],
  [1+2, 3+2, 5+2, 7+2, 9+2, 11+2, 13+2],
  [1+3, 3+3, 5+3, 7+3, 9+3, 11+3, 13+3],
  [1+4, 3+4, 5+4, 7+4, 9+4, 11+4, 13+4],
  [1+5, 3+5, 5+5, 7+5, 9+5, 11+5, 13+5],
  [1+6, 3+6, 5+6, 7+6, 9+6, 11+6, 13+6]
]

let modeLibrary = {
  DHI: [0, 1, 4, 5, 7, 8, 11],
  DHII: [0, 3, 4, 6, 7, 10, 11],
  DHIII: [0, 1, 3, 4, 7, 8, 9],
  DHIV: [0, 2, 3, 6, 7, 8, 11],
  DHV: [0, 1, 4, 5, 6, 9, 10],
  DHVI: [0, 3, 4, 5, 8, 9, 11],
  DHVII: [0, 1, 2, 5, 6, 8, 9],
  HI: [0, 2, 3, 4, 7, 8, 11],
  HII: [0, 1, 3, 5, 6, 9, 10],
  HIII: [0, 2, 4, 5, 8, 9, 11],
  HIV: [0, 2, 3, 6, 7, 9, 10],
  HV: [0, 1, 4, 5, 7, 8, 10],
  HVI: [0, 3, 4, 6, 7, 9, 11],
  HVII: [0, 1, 3, 4, 6, 8, 9],
  MI: [0, 2, 4, 5, 7, 9, 11],
  MII: [0, 2, 3, 5, 7, 9, 10],
  MIII: [0, 1, 3, 5, 7, 8, 10],
  MIV: [0, 2, 4, 6, 7, 9, 11],
  MV: [0, 2, 4, 5, 7, 9, 10],
  MVI: [0, 2, 3, 5, 7, 8, 10],
  MVII: [0, 1, 3, 5, 6, 8, 10],
  MMI: [0, 2, 3, 5, 7, 9, 11],
  MMII: [0, 1, 3, 5, 7, 9, 10],
  MMIII: [0, 2, 4, 6, 8, 9, 11],
  MMIV: [0, 2, 4, 6, 7, 9, 10],
  MMV: [0, 2, 4, 5, 7, 8, 10],
  MMVI: [0, 2, 3, 5, 6, 8, 10],
  MMVII: [0, 1, 3, 4, 6, 8, 10],
};

let noteLibrary = {
  C: 16.35,
  Db: 17.32,
  D: 18.35,
  Eb: 19.45,
  E: 20.6,
  F: 21.83,
  Gb: 23.12,
  G: 24.5,
  Ab: 25.96,
  A: 27.5,
  Bb: 29.14,
  B: 30.87,
};
