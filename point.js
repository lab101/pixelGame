class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;        
        this.hue = -1;

        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;

        this.xLocal = 0;
        this.yLocal = 900;

        this.isFree = true;
        this.lerpspeed = 1.0;//
        
        if(Math.random() > .8){
            this.lerpspeed += Math.random() * .3;
        }else{
            this.lerpspeed += Math.random() * 1.8;
        }
        
    }

    update(lerpValue){

    
        // let diffX = this.targetX - this.x;
        // let diffY = this.targetY - this.y;

        // this.x += diffX * this.lerpspeed;
        // this.y += diffY * this.lerpspeed;

        lerpValue *= this.lerpspeed;
        if(lerpValue > 1){
            lerpValue = 1;
        }
        this.x = lerp(this.startX,this.targetX,lerpValue);
        this.y = lerp(this.startY,this.targetY,lerpValue);
    }
}