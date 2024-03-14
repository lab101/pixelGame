class QuestionSprite extends Sprite{
    constructor(x, y, w, h, data,minLerpSpeed = 0.03){
        super(x, y, w, h, data,minLerpSpeed);
        this.question = "";
        this.isFreeMovement = false;
        this.intervalHandle;
        this.isDone = false;
        //console.log(this.y);
    }

    startMoving(){

        if(this.isMoving == true){
            console.log("already moving");
            return;
        }
        this.move();
        //set interval bind to this
       // clearInterval(this.intervalHandle);
      //  this.intervalHandle = setTimeout(this.move.bind(this), 2000);
    }

    move(){
        if(this.isMoving == true){
            return;
        }
        this.y += this.directionY;
        //this.updatePoints(false);
        console.log("start move tween");
        this.animateToTarget();
    }

    stopMoving(){
     //   clearInterval(this.intervalHandle);
     //   this.isMoving = false;
    }


}