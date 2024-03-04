const NUM_POINTS = 4000

class PointManager {


    constructor(canvas) {
        this.canvas = canvas;
        this.points = [];

        var screenHeight = canvas.height;
        var screenCenter = canvas.width / 2;

        for (let index = 0; index < NUM_POINTS; index++) {
            this.points.push(new Point(screenCenter, screenHeight));
          }
      
    }

    setFreePoint(x, y) {
        for (let i = 0; i < this.points.length; i++) {
          if (this.points[i].isFree) {
            this.points[i].xLocal = x;
            this.points[i].yLocal = y;
            this.points[i].isFree = false;
            return this.points[i];

            break;
          }
        }
        return null;

    }

     freeParticles(){
        for (let index = 0; index < NUM_POINTS; index++) {
          this.points[index].isFree = true;
        }

      }


    setPoints(sprite,step = 1.0) {
        // this.points = points;
        //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

        
        const ctx2 = this.canvas.getContext('2d', {willReadFrequently: true});
        ctx2.font = "40px serif";
        
        //ctx2.font = "58px serif";

        ctx2.fillStyle = '#330000';
        ctx2.fillRect(0, 0, 400, this.canvas.height);

        ctx2.fillStyle = '#FFFFFF';

        let xOffs = 0;//(Math.random() * .60) - 0.3;
        let yOffs = 0;//0;//-1+ (Math.random() * .40);

        ctx2.fillText(sprite.data, 0, 100);


        let width = this.canvas.width
        let height = this.canvas.height

        sprite.points = [];

        for (let x = 0; x < width; x+=step) {
            for (let y = 0; y < height; y+=step) {
                const pixel = ctx2.getImageData(x, y, 1, 1);
                const data = pixel.data;
                if (data[1] > 0.9) {
                    let point=  this.setFreePoint((x ) + xOffs, 1.0 - (y / height) *height + height);
                    //point.minLerp = 
                    if(point!=null){
                        sprite.points.push(point);
                    }
                }
            }
        }

    //tmp
    // loop through points
      //  for(let i=0; i < this.points.length; i++){
      //   if(this.points[i].isFree){
      //       this.points[i].targetX = Math.random();
      //       this.points[i].targetY = Math.random();
      //   }
      //  }



    }
}
