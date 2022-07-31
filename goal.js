class Goal 
{
  constructor(x, y, w, h) 
  {
    let options = {
      isStatic:true,
      bounciness:-5
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.color = color;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;

    push();
    rectMode(CENTER);
    stroke(127);
    fill(127);
    rect(pos.x, pos.y, this.w, this.h);
    pop();
  }
}