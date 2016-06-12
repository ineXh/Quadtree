function Draw(){
    this.init();
}
Draw.prototype = {
    init: function(){
        //this.lines = [];
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(5,0x000000, 1);
        stage.addChild(this.graphics);

    },
    clear: function(){
        this.graphics.clear();
        this.graphics.lineStyle(5,0x000000, 1);
    },
    point: function(x, y){

        this.graphics.drawCircle(x,y, dim/200);
    },
    line: function(x1,y1,x2,y2){
        //this.lines.push({x1: x1, y1: y1, x2: x2, y2: y2});
        this.graphics.moveTo(x1,y1);
        this.graphics.lineTo(x2,y2);
    }
} // end Draw
