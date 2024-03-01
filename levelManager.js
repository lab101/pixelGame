class LevelManager {
  constructor() {
    this.currentLevel = [{q:"1x8",a:"8"},{q:"2x8",a:"16"},{q:"3x8",a:"24"},{q:"4x8",a:"32"},{q:"5x8",a:"40"},{q:"6x8",a:"48"},{q:"7x8",a:"56"},{q:"8x8",a:"64"},{q:"9x8",a:"72"},{q:"10x8",a:"80"}];
    this.questionIndex = -1;
  }

  addLevel(level) {
    this.levels.push(level);
  }

  nextLevel() {
    //this.currentLevel++;
  }

  nextQuestion() {
    this.questionIndex++;
    if(this.questionIndex >= this.currentLevel.length){
      this.questionIndex = 0;
    }
    return this.currentLevel[this.questionIndex];    
  }

}