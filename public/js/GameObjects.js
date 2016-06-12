var objects = [];
var tree;
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
        .add('assets/squares.png')
        .load(this.onassetsloaded.bind(this));
	},
	onassetsloaded : function(){
		square_red_texture = PIXI.Texture.fromImage("assets/red_square.png");
        square_green_texture = PIXI.Texture.fromImage("assets/green_square.png");
        square_blue_texture = PIXI.Texture.fromImage("assets/blue_square.png");
        squares_texture = PIXI.Texture.fromImage("assets/squares.png");
        circle_red_texture = PIXI.Texture.fromImage("assets/red_circle.png");
        circle_green_texture = PIXI.Texture.fromImage("assets/green_circle.png");
        circle_blue_texture = PIXI.Texture.fromImage("assets/blue_circle.png");

		tree = new QuadTree(stage_width, stage_height);

        assetsloaded = true;
        for(var i = 0; i < 2; i++) spawnSquare();
        for(var i = 0; i < 2; i++) spawnSquares();
	},
	update: function(time){
        /*objects.forEach(function(s){
            s.update();
        })*/
        //tree.update();
        for(var i = 0; i < objects.length; i++){
            objects[i].update();
            if(i == 0){
                var targets = tree.retrieve(objects[i].search_circle);
                var circle = objects[i].search_circle;
                for(var j = 0; j < targets.length; j++){
                    var target = targets[j];
                    if(target == objects[i]) continue;
                    if(intersectCR(circle.x,circle.y,circle.r,target.x,target.y,target.width,target.height)){
                        target.sprite.tint = 0xFF0000;
                    }else{
                        target.sprite.tint = 0xFFFFFF;
                    }
                }
            }
        }
	},
}; // end GameObjects

var spawnSquare = function(){
    //console.log('spawn')
    var square = new Square(MousePos.x, MousePos.y);
    objects.push(square)
    tree.insert(square)
    tree.getNodes(square.search_circle);
}

var spawnSquares = function(){
    var squares = new Squares(MousePos.x, MousePos.y);
    objects.push(squares)
    tree.insert(squares)
    tree.getNodes(squares.search_circle);
}
