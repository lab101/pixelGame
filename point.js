class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;        
        this.hue = -1;

        this.targetX = x;
        this.targetY = y;

        this.xLocal = 0;
        this.yLocal = 0;

        this.isFree = true;
        this.lerpspeed = 0.03;//
        
        if(Math.random() > .8){
            this.lerpspeed +=Math.random() * .01;
        }else{
            this.lerpspeed += Math.random() * .04;
        }
        
    }

    update(lerpValue){

        
        // let diffX = this.targetX - this.x;
        // let diffY = this.targetY - this.y;

        // this.x += diffX * this.lerpspeed;
        // this.y += diffY * this.lerpspeed;

        this.x = lerp(this.x,this.targetX,lerpValue);
        this.y = lerp(this.y,this.targetY,lerpValue);
    }
}