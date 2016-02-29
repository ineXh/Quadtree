var maxDepth = 4;
var maxChildren = 1;//8
var deepWidth;
var deepHeight;
var deepDim;
function QuadTree(width, height){
    deepWidth = getNodeWidth(maxDepth-1);
    deepHeight = getNodeHeight(maxDepth-1);
    deepDim = getDepthDim(maxDepth-1);
    this.nodes = [];
    this.init(width, height);

}
QuadTree.prototype = {
    init: function(width, height){
        for(var depth = 0; depth < maxDepth; depth++){
	    	this.nodes[depth] = [];
	    	for(var j = 0; j < getDepthNum(depth); j++){
                var parent = (depth == 0) ?
                        null :
                        this.nodes[depth-1][getParentIndex(depth, j)];
	    		var node = new QuadNode(depth, j, parent);
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
        var i0 = Math.floor(item.left  / deepWidth);
        if(i0 < 0) i0 = 0;
        var j0 = Math.floor(item.top   / deepHeight);
        if(j0 < 0) j0 = 0;
        var i1 = Math.floor(item.right / deepWidth);
        var j1 = Math.floor(item.bot   / deepHeight);
        item.nodes.length = 0;

        for(var i = i0; i <= i1 && i < deepDim; i++){
            for(var j = j0; j <= j1 && j < deepDim; j++){
                var node = this.nodes[maxDepth-1][deepDim*j + i];
                item.nodes.push(node);
            }
        }
        item.nodes.forEach(function(n){
            n.children.push(item);
            n.active = true;
            n.parent.active = true;
        })
    } // end insert

} // end QuadTree

function QuadNode(depth, depth_index, parent){
    this.depth = depth;
    this.depth_index = depth_index;
    this.parent = parent;
    this.active = false;
    this.drawn = false;
    this.children = [];
    this.init();
}
QuadNode.prototype = {
    init: function(){
    	var dim = getDepthDim(this.depth);
    	this.width = getNodeWidth(this.depth);
    	this.height = getNodeHeight(this.depth);
    	this.x = (this.depth_index % dim)  * this.width;
    	this.y = Math.floor(this.depth_index/dim) * this.height;
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
} // end QuadNode
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
        case 4: return stage_width / 16;
        case 5: return stage_width / 32;
	}
}
var getNodeHeight = function(depth){
    switch(depth){
        case 0: return stage_height / 1;
        case 1: return stage_height / 2;
        case 2: return stage_height / 4;
        case 3: return stage_height / 8;
        case 4: return stage_height / 16;
        case 5: return stage_height / 32;
    }
}
var getParentIndex = function(depth, index){
    var dim = getDepthDim(depth);
    var row = Math.floor(index / dim / 2);
    var col = Math.floor((index % dim) / 2);
    return row*dim/2 + col;
}
