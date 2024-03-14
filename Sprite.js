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
        this.scale = 1;
        this.minLerpSpeed = minLerpSpeed;
        this.lerpAnimation = 0;
        this.isMoving = false;

        this.onMoveDone = function(){};
        // event one done

    }
   
    addDirection(){
        this.y += this.directionY;
        this.x += this.directionX;

        console.log(this.y);
    }
  

    update(){
       // console.log(this.points.length);
      //  this.y += this.directionY;
      //  this.x += this.directionX;
       // this.updatePoints(false);
        
    }

    explode(){
        for(let i = 0; i < this.points.length; i++){
            let margin = 10;

                this.points[i].xLocal = this.points[i].xLocal * 2.0
                this.points[i].yLocal = this.points[i].yLocal * 2.0
                let randomX = (Math.random() * margin) - margin * 0.5;
                let randomY = (Math.random() * margin) - margin * 0.5;

                this.points[i].xLocal += randomX;
                this.points[i].yLocal += randomY;

        }
        //this.updatePoints(false);
    }

    movePointsTo(targetSprite){
        console.log("move points to" + targetSprite.points.length);
        for(let i = 0; i < this.points.length; i++){
            //let point = sprite.setFreePoint(this.points[i].xLocal, this.points[i].yLocal);

                let rndIndex = Math.floor(Math.random() * targetSprite.points.length);              

                let margin = 0;
                let randomX = (Math.random() * margin) - margin * 0.5;
                let randomY = (Math.random() * margin) - margin * 0.5;
                this.points[i].targetX = targetSprite.points[rndIndex].targetX + randomX;
             //   console.log("before move tween");
                this.points[i].targetY = targetSprite.points[rndIndex].targetY + randomY;

                this.points[i].startX = this.points[i].x;
                this.points[i].startY = this.points[i].y;
             //   console.log(this.points[i].targetY);

           //     this.points[i].lerpspeed =  this.points[i].lerpspeed *3.0;
                
           
        }

      //  console.log(this.points[0].y);
      //  console.log(this.points[0].targetY);
        this.isMoving = true;
        var _this = this;
        gsap.fromTo(this,{lerpAnimation:0}, {lerpAnimation: 1,duration:.7, ease: "power3.Out"})
        .eventCallback("onUpdate", function(){    
          //  console.log(_this.lerpAnimation);
          _this.isMoving = true;

            for(let i = 0; i < _this.points.length; i++){
                _this.points[i].update(_this.lerpAnimation);                  
            }
        })
        .eventCallback("onComplete", function(){
            _this.isMoving = false;
            _this.onMoveDone(_this);
        });

        console.log("start move tween");
    }



    animateToTarget(duration = 2.0){

        var _this = this;
     //   console.log(this.points[0].y);

        if(this.isMoving == true){
            console.log("animateToTarget : already moving");
            return;
        }
        this.isMoving = true;
        for(let i = 0; i < this.points.length; i++){
            this.points[i].startX = this.points[i].x;
            this.points[i].startY = this.points[i].y;

            this.points[i].targetX = this.x + (this.points[i].xLocal * this.w * this.scale);
            this.points[i].targetY = this.y + (this.points[i].yLocal * this.h* this.scale);

        }
      //  console.log(this.points[0].targetY);

        gsap.fromTo(this,{lerpAnimation:0}, {lerpAnimation: 1,duration:duration, ease: "power2.Out"})
        .eventCallback("onUpdate", function(){    
          //  console.log(_this.lerpAnimation);
              _this.isMoving = true;

            for(let i = 0; i < _this.points.length; i++){
                _this.points[i].update(_this.lerpAnimation);  
            }
        })
        .eventCallback("onComplete", function(){    
            for(let i = 0; i < _this.points.length; i++){
                _this.points[i].x = _this.points[i].targetX;
                _this.points[i].y = _this.points[i].targetY;           
            }
            _this.isMoving = false;
            _this.onMoveDone(_this);

        });

    }


    setPos(x,y){
        this.x = x;
        this.y = y;
        

        for(let i = 0; i < _this.points.length; i++){
            
            _this.points[i].x = _this.points[i].targetX;
            _this.points[i].y = _this.points[i].targetY;

        }
    }

    setColorHue(hue){
        for(let i = 0; i < this.points.length; i++){
            this.points[i].hue = hue;
        }
    }

    updatePoints(force = false){
        console.log("update points ");
        for(let i = 0; i < this.points.length; i++){
            this.points[i].targetX = this.x + (this.points[i].xLocal * this.w * this.scale);
            this.points[i].targetY = this.y + (this.points[i].yLocal * this.h* this.scale);
            
            if(force){
                this.points[i].x = this.points[i].targetX;
                this.points[i].y = this.points[i].targetY;
            }
            this.points[i].update(0);
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