var walldamp = 0.99;
var square_id = 0;
function Square(x,y){
	this.init(x,y);
}
Square.prototype = {
	init: function(x,y){
		//this.pos = new PVector(x,y);
		this.x = x;
		this.y = y;
		this.vx = Math.random()*width/80;
		this.vy = Math.random()*height/80;
		this.width = 20;
		this.height = 20;
		this.r = this.width/2;
		this.id = square_id++;
		this.draw();
		this.nodes = [];
	},
	update: function(){
		this.x += this.vx;
		this.y += this.vy;
		this.stayinBorder();
		this.container.x = this.x;
	    this.container.y = this.y;
	    if(!tree.check(this)){
	    	tree.remove(this);
	    	tree.insert(this);
	    }
	},
	draw: function(){
		this.container = new PIXI.Container();
		this.sprite = new PIXI.Sprite(square_blue_texture);
	    this.sprite.anchor.x = 0.5;
	    this.sprite.anchor.y = 0.5;
	    this.sprite.x = 0;
	    this.sprite.y = 0;
	    this.scale =  (this.width) / this.sprite.width;
	    this.sprite.scale.set(this.scale);
	    this.container.addChild(this.sprite);

		var text = new PIXI.Text("" + this.id, {font: '32px Arial', fill: 'red'})
        text.x = 0;
        text.y = 0;
        this.container.addChild(text);

        stage.addChild(this.container);

	    this.container.x = this.x;
	    this.container.y = this.y;
	    var move = this.move;
	    var press = this.press;
	    var release = this.release;
	    this.sprite.interactive = true;
	    this.sprite.on('mousedown'        	, press.bind(this));
		this.sprite.on('touchstart'       	, press.bind(this));
		this.sprite.on('mousemove'        	, move.bind(this));
		this.sprite.on('touchmove'       	, move.bind(this));
		this.sprite.on('mouseup'        	, release.bind(this));
		this.sprite.on('touchend'       	, release.bind(this));
	},
	press:function(){
		spritetouched = true;
		this.pressed = true;
		tree.remove(this);
	},
	move: function(event){
	if(!this.pressed) return;
		if(event.type == "mousemove"){
            getMouse(event, undefined);
        }else if(event.type == "touchmove"){
            getMouse(event.data.originalEvent, event.data.originalEvent.changedTouches[0]);
        }
		this.x = MousePos.x;
		this.y = MousePos.y;
		this.container.x = this.x;
	    this.container.y = this.y;
	},
	release:function(){
		if(!this.pressed || !spritetouched) return;
		spritetouched = false;
		this.pressed = false;
		tree.insert(this);
		//getBound(this);
	},
	stayinBorder : function(){
    if (this.x - this.r < 0) {
      this.x = this.r;
      this.vx *= -walldamp;
      return true;
    }
    if (this.x + this.r > stage_width) {
      //println(this.vel);
      this.vx *= -walldamp;
      this.x = stage_width - this.r;
      return true;
    }
    if (this.y -this. r < 0) {
      this.vy *= -walldamp;
      this.y = this.r;
      return true;
    }
    if (this.y + this.r > stage_height) {
      this.vy *= -walldamp;
      this.y = stage_height - this.r;
      return true;
    }
    return false;
  }, // end stayinBorder
}
