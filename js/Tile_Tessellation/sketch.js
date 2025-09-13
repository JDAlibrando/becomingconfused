let tile, reloadTile;
let direction;
let mode, shape, style;
let topButt, bottumButt, leftButt, rightButt, tessButt, delButt, resetButt, saveButt, clearButt, setButt, tranButt, rotButt;
let buffer;
let canv;

function setup() {
  buffer = 60;
  setUpWindow();
  setUpPanel();
  direcition = "top";
  mode = "edit";
}

function draw() {
  clear();
  if (mode == "edit") {
    background(200);
    tile.showEditor();
    fill(200);
    noStroke();
    rect(0, tile.size, width, height);
    rotButt.unload();
    tranButt.unload();
    saveButt.unload();
    // setButt.load();
    clearButt.load();
    delButt.load();
    topButt.load();
    rightButt.load();
    leftButt.load();
    bottomButt.load();
    tessButt.load();
  }

  if (mode == "tile") {
    tile.tessellate(12);
    setButt.unload();
    delButt.unload();
    clearButt.unload();
    topButt.unload();
    rightButt.unload();
    leftButt.unload();
    bottomButt.unload();
    tessButt.load();
    saveButt.load();
    noLoop();
  }
  
  if (mode == "save") {
    saveButt.unload();
    clearButt.unload();
    delButt.unload();
    topButt.unload();
    rightButt.unload();
    leftButt.unload();
    bottomButt.unload();
    tile.tessellate(12);
    saveCanvas(canv, 'myTesselation', 'PNG');
    mode = "tile";
    loop();
  }
  
  if (mode === "settings") {
    saveButt.unload();
    clearButt.unload();
    delButt.unload();
    topButt.unload();
    rightButt.unload();
    leftButt.unload();
    bottomButt.unload();
    rotButt.load();
    tranButt.load();
    tessButt.load();
  }
  
}

function mouseClicked() {
  if (mouseX < width & mouseY < width & mouseX > 0 & mouseY > 0) {
    pushIt();
  }
  for (let butt of myPanel) {
    if (butt.isOver()) {
      butt.pressed();
    }
  }
}

function mousePressed() {
  if (delButt.isOver()) {
    delButt.switch();
  }
  
  if (clearButt.isOver()) {
    clearButt.switch();
  }
  
  if (tessButt.isOver()) {
    tessButt.switch();
  }
  
  if (setButt.isOver()) {
    setButt.switch();
  }
}

function mouseReleased() {
  if (delButt.isPressed) {
    delButt.switch();
  }
  
  if (clearButt.isPressed) {
    clearButt.switch();
  }
  
  if (tessButt.isPressed) {
    tessButt.switch();
  }
  
  if (setButt.isPressed) {
    setButt.switch();
  }
}

function mouseDragged() {
  if (mouseX < width & mouseX > 0 & mouseY > 0 & mouseY < width) {
    pushIt();
  }
}

function keyPressed() {
  changeMode();
  if (mode == "edit") {
    assignDirection();
    deleteIt();
    if (keyCode == ESCAPE) {
    reset();
    }
  }
}

function pushIt() {
  if (direction == "left") {
    tile.pushVertex(mouseX, mouseY, "left");
  }
  if (direction == "top") {
    tile.pushVertex(mouseX, mouseY, "top");
  }
  if (direction == "right") {
    tile.pushVertex(mouseX, mouseY, "right");
  }
  if (direction == "bottom") {
    tile.pushVertex(mouseX, mouseY, "bottom");
  }
}

function assignDirection() {
  if (keyCode == UP_ARROW) {
    switchToTop() 
  }
  if (keyCode == DOWN_ARROW) {
    switchToBottom()
  }
  if (keyCode == RIGHT_ARROW) {
    switchToRight()
  }
  if (keyCode == LEFT_ARROW) {
    switchToLeft()
  }
}

function deleteIt() {
  if (keyCode == BACKSPACE) {
    if (direction == "left") {
      tile.popVertex("left");
    }
    if (direction == "right") {
      tile.popVertex("right");
    }
    if (direction == "top") {
      tile.popVertex("top");
    }
    if (direction == "bottom") {
      tile.popVertex("bottom");
    }
  }
}

function reset() {
  let size = tile.size
  tile = new SquareTile(tile.size);
}

function changeMode() {
  if (keyCode == ENTER) {
    tessButt.switch();
    if (mode == "edit") {
      mode = "tile";
    } else {
      reloadTile = new SquareTile(width);
      direcition = "top";
      mode = "edit";
      reloadTile.top = tile.top;
      reloadTile.bottom = tile.bottom;
      reloadTile.right = tile.right;
      reloadTile.left = tile.left;
      tile = reloadTile;
      tile.rotateTile();
      tile.rotateTile();
      tile.rotateTile();
      loop();
    }
  }
}

function switchToTop() {
  if (leftButt.isPressed) {
    leftButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  } else if (rightButt.isPressed) {
    rightButt.switch();
  }
  direction = "top";
  topButt.switch();
}
  
function switchToBottom() {
  if (leftButt.isPressed) {
    leftButt.switch();
  } else if (topButt.isPressed) {
    topButt.switch();
  } else if (rightButt.isPressed) {
    rightButt.switch();
  }
  direction = "bottom";
  bottomButt.switch();
}

function switchToRight() {
  if (topButt.isPressed) {
    topButt.switch();
  } else if (leftButt.isPressed) {
    leftButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  }
  direction = "right";
  rightButt.switch();
}

function switchToLeft() {
  if (topButt.isPressed) {
    topButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  } else if (rightButt.isPressed) {
    rightButt.switch();
  }
  direction = "left";
  leftButt.switch();
}

function tesselate() {
  if (mode == "edit") {
      mode = "tile";
      tessButt.text = "Edit";
      tessButt.textOn = "Edit";
      tessButt.textOff = "Edit";
    } else {
      reloadTile = new SquareTile(width);
      direcition = "top";
      mode = "edit";
      reloadTile.top = tile.top;
      reloadTile.bottom = tile.bottom;
      reloadTile.right = tile.right;
      reloadTile.left = tile.left;
      tile = reloadTile;
      tile.rotateTile();
      tile.rotateTile();
      tile.rotateTile();
      tessButt.text = "Tesselate";
      tessButt.textOn = "Tesselate";
      tessButt.textOff = "Tesselate";
      loop();
    }
  if (leftButt.isPressed) {
    leftButt.switch();
  } else if (bottomButt.isPressed) {
    bottomButt.switch();
  } else if (topButt.isPressed) {
    topButt.switch();
  }
}

function deletePoint() {
  if (direction == "left") {
      tile.popVertex("left");
    }
    if (direction == "right") {
      tile.popVertex("right");
    }
    if (direction == "top") {
      tile.popVertex("top");
    }
    if (direction == "bottom") {
      tile.popVertex("bottom");
    }
}

function saveTess() {
  mode = "save";
  redraw();
}

function setTess() {
  tessButt.text = "Edit";
  tessButt.textOn = "Edit";
  tessButt.textOff = "Edit";
  mode = "settings"
}

function styleTran() {
  style = "translate";
  if (!tranButt.isPressed) {
    tranButt.switch();
  }
  if (rotButt.isPressed) {
    rotButt.switch();
  }
}

function styleRot() {
  style = "rotate";
  if (!rotButt.isPressed) {
    rotButt.switch();
  }
  if (tranButt.isPressed) {
    tranButt.switch();
  }
}

function setUpPanel() {
  topButt = makeButt("^");
  topButt.position = [40, height - 53];
  topButt.shape = [2,2]
  topButt.color = topButt.colorOff;
  buttAction(topButt, switchToTop);
  
  bottomButt = makeButt("v");
  bottomButt.position = [40, height - 27];
  bottomButt.shape = [2,2]
  bottomButt.color = bottomButt.colorOff;
  buttAction(bottomButt, switchToBottom);
  
  rightButt = makeButt(">");
  rightButt.position = [70, height - 40];
  rightButt.shape = [2,2]
  rightButt.color = bottomButt.colorOff;
  buttAction(rightButt, switchToRight);
  
  leftButt = makeButt("<");
  leftButt.position = [10, height - 40];
  leftButt.shape = [2,2]
  leftButt.color = bottomButt.colorOff;
  buttAction(leftButt, switchToLeft);
  
  delButt = makeButt("Delete");
  delButt.position = [width-100, height - 40];
  delButt.shape = [4,2];
  buttAction(delButt, deletePoint);
  
  clearButt = makeButt("Clear");
  clearButt.position = [width-50, height - 40];
  clearButt.shape = [4,2];
  buttAction(clearButt, reset);
  
  setButt = makeButt("Settings");
  setButt.position = [420, height - 40];
  setButt.shape = [6,2];
  buttAction(setButt, setTess);
  
  tranButt = makeButt("Translate");
  tranButt.position = [20, height - 80];
  tranButt.shape = [8,2];
  buttAction(tranButt, styleTran);
  
  tessButt = makeButt("Tesselate");
  let x = ((rightButt.position[0] + delButt.position[0])/2)-10;
  let y = rightButt.position[1];
  tessButt.position = [x , y];
  tessButt.shape = [6,2];
  buttAction(tessButt, tesselate);
  
  saveButt = makeButt("Save");
  y = tessButt.position[1];
  saveButt.position = [20, y];
  saveButt.shape = [4,2];
  buttAction(saveButt, saveTess);
  
  rotButt = makeButt("Rotate");
  rotButt.position = [120, height - 80];
  rotButt.shape = [8,2];
  buttAction(rotButt, styleRot);
}

function setUpWindow() {
  canv = createCanvas(windowWidth*0.3, (windowWidth*.3) + buffer);
  tile = new SquareTile(width);
}