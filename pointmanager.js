const NUM_POINTS = 3000

class PointManager {


    constructor(canvas) {
        this.canvas = canvas;
        this.points = [];

        for (let index = 0; index < NUM_POINTS; index++) {
            this.points.push(new Point(Math.random(), Math.random()));
          }
      
    }

    setFreePoint(x, y) {
        for (let i = 0; i < this.points.length; i++) {
          if (this.points[i].isFree) {
            this.points[i].targetX = x;
            this.points[i].targetY = y;
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


    setPoints(sprite) {
        // this.points = points;
        //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

        const ctx2 = this.canvas.getContext('2d', {willReadFrequently: true});

        if(Math.random() > 0.5){
            ctx2.font = "58px serif";
        }else{
            ctx2.font = "38px sans-serif";
        }
        //ctx2.font = "58px serif";

        ctx2.fillStyle = '#000000';
        ctx2.fillRect(0, 0, 400, 400);

        ctx2.fillStyle = '#FFFFFF';

        const d = new Date();
        let seconds = d.getSeconds();

        let minutes = d.getMinutes();

        //minutes = 60;

        let xOffs = (Math.random() * .60) - 0.3;
        let yOffs = -1+ (Math.random() * .40);

        ctx2.fillText(sprite.data, 0, 45);

        let width = this.canvas.width
        let height = this.canvas.height
        let step = 1;

        sprite.points = [];

        for (let x = 0; x < width; x+=step) {
            for (let y = 0; y < height; y+=step) {
                const pixel = ctx2.getImageData(x, y, 1, 1);
                const data = pixel.data;
                if (data[0] > 0.7) {
                    let point=  this.setFreePoint((x / width) + xOffs, 1.0 - (y / height) + yOffs);
                    if(point!=null){
                        point.targetX *= 4;
                        point.targetY *= 4;
                       // point.targetY += 1;
                        point.targetX -= 1;


                        sprite.points.push(point);
                    }
                }
            }
        }

        //tmp
       // loop through points
       for(let i=0; i < this.points.length; i++){
        if(this.points[i].isFree){
            this.points[i].targetX = Math.random();
            this.points[i].targetY = Math.random();
        }
       }



    }
}
