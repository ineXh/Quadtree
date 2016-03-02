//objects[0].search_circle.nodes.forEach(function(n){console.log(n.depth_index)})
function Circle(parent){
	this.init(parent);
}
Circle.prototype = {
	init: function(parent){
		//this.pos = new PVector(x,y);
		this.parent = parent;
		this.x = this.parent.x;
		this.y = this.parent.y;
		this.vx = 0;//Math.random()*width/120;
		this.vy = 0;//Math.random()*height/120;
		this.anchor = {x: 0.5, y: 0.5};
		this.r = 100;
		this.width = this.r*2;
		this.height = this.r*2;
		
		this.draw();
		this.nodes = [];
	},
	update: function(){
		this.x = this.parent.x;
		this.y = this.parent.y;
		if(!tree.check(this)){
	    	this.nodes.length = 0;
	    	tree.getNodes(this);
	    }
		/*this.x += this.vx;
		this.y += this.vy;
		this.stayinBorder();
		this.container.x = this.x;
	    this.container.y = this.y;
	    if(!tree.check(this)){
	    	tree.remove(this);
	    	tree.insert(this);
	    }*/
	},
	draw: function(){		
		this.sprite = new PIXI.Sprite(circle_green_texture);
	    this.sprite.anchor.x = 0.5;
	    this.sprite.anchor.y = 0.5;
	    this.sprite.x = 0;
	    this.sprite.y = 0;
	    this.scale =  (this.width) / this.sprite.width;
	    this.sprite.alpha = 0.1;
	    this.sprite.scale.set(this.scale);	    
	},	
} // end circle
