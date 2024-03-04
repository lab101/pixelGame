class AnswerSprite extends Sprite{
        constructor(x, y, w, h, data,minLerpSpeed = 0.03){
            super(x, y, w, h, data,minLerpSpeed);
            this.question = "";
            this.isFreeMovement = false;
        }
    

}