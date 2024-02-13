class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;        

        this.targetX = x;
        this.targetY = y;

        this.xLocal = 0;
        this.yLocal = 0;

        this.isFree = true;
        this.lerpspeed = 0.002;//
        
        if(Math.random() > .8){
            this.lerpspeed +=Math.random() * .01;
        }else{
            this.lerpspeed += Math.random() * .09;
        }
        
    }

    update(){

        
        let diffX = this.targetX - this.x;
        let diffY = this.targetY - this.y;

        this.x += diffX * this.lerpspeed;
        this.y += diffY * this.lerpspeed;
    }
}