var maxDepth = 4;
var maxChildren = 1;//8

function QuadTree(width, height){
    this.nodes = [];
    this.init(width, height);
}
QuadTree.prototype = {
    init: function(width, height){
        for(var depth = 0; depth < maxDepth; depth++){
	    	this.nodes[depth] = [];
	    	for(var j = 0; j < getDepthNum(depth); j++){
	    		var node = new QuadNode(depth, j);
	    		this.nodes[depth].push(node);
	    	}
	    }
    },
    update: function(){
      for(var depth = 0; depth < maxDepth; depth++){
        for(var j = 0; j < this.nodes[depth].length; j++){
            this.nodes[depth][j].update();
        }
      }
    },
    insert: function(item){
    	getBound(item);
        var i0 = Math.floor(item.left / getNodeWidth(maxDepth-1));
        var j0 = Math.floor(item.top / getNodeWidth(maxDepth-1));
        this.nodes[maxDepth-1][getDepthDim(maxDepth-1)*j0 + i0].active = true;
    }

} // end QuadTree

function QuadNode(depth, depth_index){
    this.depth = depth;
    this.depth_index = depth_index;
    this.active = false;
    this.drawn = false;
    this.children = [];
    this.init();
}
QuadNode.prototype = {
    init: function(){
    	var numNode = getDepthNum(this.depth);
    	var x_elements = Math.sqrt(numNode);
    	this.width = stage_width / x_elements;
    	this.height = stage_height / x_elements;
    	this.x = (this.depth_index % x_elements)  * stage_width / x_elements;
    	this.y = Math.floor(this.depth_index/x_elements) * stage_height / x_elements;
    	//this.x = this.depth_index
        this.draw();
    },
    update: function(){
        if(this.active && !this.drawn){
            stage.addChild(this.container);
            this.drawn = true;
        }else if(!this.active && this.drawn){
            stage.removeChild(this.container);
            this.drawn = false;
        }
    },
    draw: function(){
        this.container = new PIXI.Container();
        var grid = new PIXI.Graphics();
        grid.lineStyle(width/500, 0x0000FF, 1);
        this.container.x = this.x;
        this.container.y = this.y;
        grid.drawRect(0, 0, this.width, this.height);
        var text = new PIXI.Text("" + this.depth_index, {font: '32px Arial', fill: 'black'})
        text.x = 0;
        text.y = 0;
        this.container.addChild(text);
        this.container.addChild(grid);
        stage.addChild(this.container);
        this.drawn = true;
    },
}
var getDepthNum = function(depth){
    switch(depth){
        case 0: return 1;
        case 1: return 4;
        case 2: return 16;
        case 3: return 64;
        case 4: return 256;
        case 5: return 1024;
    }
}
var getDepthDim = function(depth){
    switch(depth){
        case 0: return 1;
        case 1: return 2;
        case 2: return 4;
        case 3: return 8;
        case 4: return 16;
        case 5: return 32;
    }
}
var getDepth = function(index){
    if(index <= 0) return 0;
    if(index <= 4) return 1;
    if(index <= 20) return 2;
    if(index <= 84) return 3;
    if(index <= 340) return 4;
    if(index <= 1634) return 5;
}


var getNodeWidth = function(depth){
	switch(depth){
		case 0: return stage_width / 1;
		case 1: return stage_width / 2;
		case 2: return stage_width / 4;
		case 3: return stage_width / 8;
	}
}
