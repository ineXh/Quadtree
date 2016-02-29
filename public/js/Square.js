var square_id = 0;
function Square(x,y){
	this.init(x,y);
}
Square.prototype = {
	init: function(x,y){
		//this.pos = new PVector(x,y);
		this.x = x;
		this.y = y;
		this.width = 20;
		this.height = 20;
		this.id = square_id++;
		this.draw();
		this.nodes = [];
	},
	draw: function(){
		this.sprite = new PIXI.Sprite(square_blue_texture);
	    this.sprite.anchor.x = 0.5;
	    this.sprite.anchor.y = 0.5;
	    this.scale =  (this.width) / this.sprite.width;
	    this.sprite.scale.set(this.scale);
	    stage.addChild(this.sprite);
	    this.sprite.x = this.x;
	    this.sprite.y = this.y;
	    var moved = this.moved;
	    var pressed = this.pressed;
	    var released = this.released;
	    this.sprite.interactive = true;
	    this.sprite.on('mousedown'        	, pressed.bind(this));
		this.sprite.on('touchstart'       	, pressed.bind(this));
		this.sprite.on('mousemove'        	, moved.bind(this));
		this.sprite.on('touchmove'       	, moved.bind(this));
		this.sprite.on('mouseup'        	, released.bind(this));
		this.sprite.on('touchend'       	, released.bind(this));
	},
	pressed:function(){
		spritetouched = true;
		this.pressed = true;
	},
	moved: function(event){
	if(!this.pressed) return;
		if(event.type == "mousemove"){
            getMouse(event, undefined);
        }else if(event.type == "touchmove"){
            getMouse(event.data.originalEvent, event.data.originalEvent.changedTouches[0]);
        }
		this.x = MousePos.x;
		this.y = MousePos.y;
		this.sprite.x = this.x;
	    this.sprite.y = this.y;
	},
	released:function(){
		spritetouched = false;
		this.pressed = false;
		getBound(this);
	}
}
