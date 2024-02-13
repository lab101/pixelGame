class Sprite{
    constructor(x, y, w, h, data){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.data = data;
        this.points = [];
        this.stepSize = 0.5;
    }
   
    move(x, y){
        this.x += x;
        this.y += y;
    }

    moveTo(x, y){
        this.x = x;
        this.y = y;
    }

    moveLeft(){
        this.x -= this.stepSize;
    }

    moveRight(){
        this.x += this.stepSize;
    }

    moveUp(){
        this.y -= this.stepSize;
    }

    moveDown(){
        this.y += this.stepSize;
    }

    update(){
       // console.log(this.points.length);
        for(let i = 0; i < this.points.length; i++){
            this.points[i].targetX = this.x + (this.points[i].xLocal * this.w);
            this.points[i].targetY = this.y + (this.points[i].yLocal * this.h);
            this.points[i].update();
        }
    }

    isCollide(sprite){
        if(this.x < sprite.x + sprite.w &&
            this.x + this.w > sprite.x &&
            this.y < sprite.y + sprite.h &&
            this.y + this.h > sprite.y){
                return true;
            }
        return false;
    }
}