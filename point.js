class point{
    constructor(x,y){
        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;

        this.isFree = true;
        this.lerpspeed = 0.02+  Math.random() * .2;
    }

    update(){
        let diffX = this.targetX - this.x;
        let diffY = this.targetY - this.y;

        this.x += diffX * this.lerpspeed;
        this.y += diffY * this.lerpspeed;
    }
}