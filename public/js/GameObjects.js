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
		

		assetsloaded = true;
	},
	update: function(time){
        
	},
}; // end GameObjects