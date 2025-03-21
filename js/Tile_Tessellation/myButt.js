let myPanel = [];

class myButt {
  constructor(textOn, textOff, position = [0,0], shape = [5,2], size = 100, colorOff = color(220), colorOn = color(50), isPressed = false) {
    this.textOn = textOn;
    this.textOff = textOff;
    this.shape = shape;
    this.position = position;
    this.size = size;
    this.width = this.size*this.shape[0];
    this.colorOn = colorOn;
    this.colorOff = colorOff;
    this.isPressed = isPressed;
    this.active = false;
    if (this.isPressed == false) {
      this.color = colorOff;
      this.text = textOff;
      this.color = colorOff
    } else {
      this.color = colorOn;
      this.text = textOn;
      this.color = colorOn;
    }
    this.func = function click() {
      this.switch();
                                  print(this.text +" clicked");
    }
    append(myPanel, this);
  }
  
  load() {
    this.active = true;
    let x = this.position[0];
    let y = this.position[1];
    noStroke();
    fill(this.color);
    rect(x, 
         y, 
         this.shape[0]*this.size, 
         this.shape[1]*this.size);
    if (this.isPressed) {
      fill(this.colorOff);
    } else {
      fill(this.colorOn);
    }
    textAlign(CENTER, CENTER);
    text(this.text,
         x + (1/2)*this.shape[0]*this.size, 
         y + (1/2)*this.shape[1]*this.size);
  }
  
  isOver() {
    let isOver = false;
    let xMin = this.position[0];
    let yMin = this.position[1];
    let xMax = this.position[0]+this.shape[0]*this.size;
    let yMax = this.position[1]+this.shape[1]*this.size;
    if (mouseX <= xMax & mouseX >= xMin & mouseY <=yMax & mouseY >= yMin) {
      isOver = true;
    }
    return isOver;
  }
  
  unload() {
    this.active = false;
    this.isPressed = false;
    this.color = this.colorOff;
    this.text = this.textOff;
    this.color = this.colorOff
  }
  
  pressed() {
    if (this.active) {
      this.func();
    }
  }
  
  switch() {
    if (this.isPressed == false) {
      this.isPressed = true;
    } else {
      this.isPressed = false;
    }
    
    if (this.isPressed == false) {
      this.color = this.colorOff;
      this.text = this.textOff;
      this.color = this.colorOff
    } else {
      this.color = this.colorOn;
      this.text = this.textOn;
      this.color = this.colorOn
    }
  }
  
}

function makeButt(text) {
  button = new myButt(text, text);
  button.size = 10;
  button.shape = [3, 2];
  button.position = [10, button.shape[1]*button.size];
  return button;
}

function buttAction(butt, func) {
  butt.func = func;
}