class Sprite{
    constructor(x, y, w, h, data,minLerpSpeed = 0.03){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.data = data;
        this.points = [];
        this.stepSize = 0.5;
        this.directionX = 0;
        this.directionY = 0;
        this.minLerpSpeed = minLerpSpeed;
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
        this.y += this.directionY;
        this.x += this.directionX;
        this.updatePoints(false);
        
    }




    setColorHue(hue){
        for(let i = 0; i < this.points.length; i++){
            this.points[i].hue = hue;
        }
    }

    updatePoints(force = false){
        for(let i = 0; i < this.points.length; i++){
            this.points[i].targetX = this.x + (this.points[i].xLocal * this.w);
            this.points[i].targetY = this.y + (this.points[i].yLocal * this.h);
            
            if(force){
                this.points[i].x = this.points[i].targetX;
                this.points[i].y = this.points[i].targetY;
            }
            this.points[i].update();
        }
    }

    releasePoints(){
        for(let i = 0; i < this.points.length; i++){
            this.points[i].isFree = true;
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