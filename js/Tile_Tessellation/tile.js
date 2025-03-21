class SquareTile {
  constructor(size) {
    this.size = size
    this.top = [{x: 0, y: 0}, {x: size, y: 0}];
    this.right = [{x: size, y: 0}, {x: size, y: size}];
    this.bottom = [{x: size, y: size}, {x: 0, y: size}]
    this.left = [{x: 0, y: size}, {x: 0, y: 0}]
    this.n = 1;
  }
  
  pushVertex(x, y, side) {
    if (side === "top") {
      let newPoint = {x: x, y: y};
      splice(this.top, newPoint, 1);
      newPoint = {x: -y, y: x};
      splice(this.left, newPoint, this.left.length-1);
    }
    if (side === "bottom") {
      let newPoint = {x: x, y: y};
      splice(this.bottom, newPoint, 1);
      newPoint = {x: 2*this.size-y, y: x};
      splice(this.right, newPoint, this.right.length-1);
    }
    if (side === "right") {
      let newPoint = {x: x, y: y};
      splice(this.right, newPoint, 1);
      newPoint = {x: y, y: 2*this.size - x};
      splice(this.bottom, newPoint, this.bottom.length-1);
    }
    if (side === "left") {
      let newPoint = {x: x, y: y};
      splice(this.left, newPoint, 1);
      newPoint = {x: y, y: -x};
      splice(this.top, newPoint, this.top.length-1);
    }
  }
  
  popVertex(side) {
    if (side === "top") {
      if (this.top.length > 2) {
        this.top.splice(1, 1);
        this.left.splice(this.left.length-2, 1);
      }
    }
    if (side === "bottom") {
      if (this.bottom.length > 2) {
        this.bottom.splice(1, 1);
        this.right.splice(this.right.length-2, 1);
      }
    }
    if (side === "right") {
      if (this.right.length > 2) {
        this.right.splice(1, 1);
        this.bottom.splice(this.bottom.length-2, 1);
      }
    }
    if (side === "left") {
      if (this.left.length > 2) {
        this.left.splice(1, 1);
        this.top.splice(this.top.length-2, 1);
      }
    }  
  }
  
  showEditor() {
    fill(250);
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let pnt of this.top) {
      vertex(pnt.x, pnt.y)
    }
    for (let pnt of this.right) {
      vertex(pnt.x, pnt.y)
    }
    for (let pnt of this.bottom) {
      vertex(pnt.x, pnt.y)
    }
    for (let pnt of this.left) {
      vertex(pnt.x, pnt.y)
    }
    endShape();
  }
  
  showTile(n, i, scale) {
    stroke(0);
    strokeWeight(1);
    if (mode === "tile") {
      fill(random(225),random(225),random(225));
    } else if (mode === "save") {
      noFill(250);
    }
    beginShape();
    for (let pnt of this.top) {
      let x = (pnt.x/scale)+n*width/scale;
      let y = (pnt.y/scale)+i*width/scale;
      vertex(x, y);
    }
    for (let pnt of this.right) {
      let x = (pnt.x/scale)+n*width/scale;
      let y = (pnt.y/scale)+i*width/scale;
      vertex(x, y);
    }
    for (let pnt of this.bottom) {
      let x = (pnt.x/scale)+n*width/scale;
      let y = (pnt.y/scale)+i*width/scale;
      vertex(x, y);
    }
    for (let pnt of this.left) {
      let x = (pnt.x/scale)+n*width/scale;
      let y = (pnt.y/scale)+i*width/scale;
      vertex(x, y);
    }
    endShape();
  }
  
  rotateTile() {
    let newTop = [];
    let newBottom = [];
    let newRight = [];
    let newLeft = [];
    for (let pnt of this.top) {
      let newPoint = {x: pnt.y, y: width - pnt.x};
      append(newRight, newPoint);
    }
    for (let pnt of this.right) {
      let newPoint = {x: pnt.y, y: width - pnt.x};
      append(newBottom, newPoint);
    }
    for (let pnt of this.bottom) {
      let newPoint = {x: pnt.y, y: width - pnt.x};
      append(newLeft, newPoint);
    }
    for (let pnt of this.left) {
      let newPoint = {x: pnt.y, y: width - pnt.x};
      append(newTop, newPoint);
    }
    this.top = newTop;
    this.bottom = newBottom;
    this.right = newRight;
    this.left = newLeft;
  }
  
  tessellate(d) {
    strokeWeight(1);
    for (let i = -1; i < d+2; i+=1) {
      this.rotateTile();
      this.rotateTile()
      for (let n = -1; n < d+2; n+=1) {
        if (this.n%2 == 1) {
          this.rotateTile();
          this.rotateTile();
          this.rotateTile();
          this.n ++
        }
        else {
          this.rotateTile();
          this.n++
        }
        
        this.showTile(n, i, d);
      }
    }
  }
}