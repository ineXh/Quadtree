var objects = [];
function GameObjects(){
	this.init();
}
GameObjects.prototype = {
	init: function(){
		PIXI.loader
		.add('assets/blue_circle.png')
        .add('assets/blue_square.png')
        .add('assets/green_circle.png')
        .add('assets/green_square.png')
        .add('assets/red_circle.png')
        .add('assets/red_square.png')		
        .load(this.onassetsloaded.bind(this));
	},
	onassetsloaded : function(){
		square_red_texture = PIXI.Texture.fromImage("assets/red_square.png");
        square_green_texture = PIXI.Texture.fromImage("assets/green_square.png");
        square_blue_texture = PIXI.Texture.fromImage("assets/blue_square.png");
        circle_red_texture = PIXI.Texture.fromImage("assets/red_circle.png");
        circle_green_texture = PIXI.Texture.fromImage("assets/green_circle.png");
        circle_blue_texture = PIXI.Texture.fromImage("assets/blue_circle.png");

		assetsloaded = true;
	},
	update: function(time){
        
	},
}; // end GameObjects

var spawnSquare = function(){
    var square = new Square(MousePos.x, MousePos.y);
    objects.push(square)
}