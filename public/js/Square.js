function Square(x,y){
	this.init(x,y);
}
Square.prototype = {
	init: function(x,y){
		this.pos = new PVector(x,y);
		this.draw();
	},
	draw: function(){
		this.sprite = new PIXI.Sprite(square_blue_texture);
	    this.sprite.anchor.x = 0.5;
	    this.sprite.anchor.y = 0.5;
	    this.scale =  (20) / this.sprite.width;
	    this.sprite.scale.set(this.scale);
	    stage.addChild(this.sprite);
	    this.sprite.x = this.pos.x;
	    this.sprite.y = this.pos.y;
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
		this.pos.x = MousePos.x;
		this.pos.y = MousePos.y;
		this.sprite.x = this.pos.x;
	    this.sprite.y = this.pos.y;
	},
	released:function(){
		spritetouched = false;
		this.pressed = false;
	}
}
