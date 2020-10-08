class day {
  constructor(_date,_xPosition,_ads,_unfollows,_activity){
    this.date = _date;
    this.ads = _ads; //an array of add objects
    this.unfollows = _unfollows;
    this.activity = _activity;
    this.xPosition = _xPosition;
  }

  collectAds(){
    for (each of adsServed){
      if (each.serve_time.slice(0,10) == this.date){
        this.ads.push(each)
      }
    }
  }

  collectUnfollows(){
    for (each of unfollows){
      if (each.timestamp.slice(0,10) == this.date){
        this.unfollows.push(each)
        console.log("unfollow added", this)
      }
    }
  }

  drawActivity(){
    push();
    fill(70,100,100,50)
    noStroke()

    let yPos = height-45;

    for (i = 0; i<this.activity;i++){
      circle(this.xPosition+margin, yPos, 1.2)
      yPos = yPos-activityYJump
    }
    pop();
  }

  drawAds(){
    push();
    fill(10,100,100,50)
    noStroke()

    let yPos = height-130;

    for (i = 0; i<this.ads.length; i++){
      if (this.ads[i].viewed == "true"){
        fill(5,100,100,50)
      }
      if (this.ads[i].interacted == "true"){
        fill(0,100,100,50)
      }
      if (this.ads[i].viewed == "true" && this.ads[i].interacted == "true"){
        fill(90,100,100,50)
      }
      circle(this.xPosition+margin, yPos, 1.2)
      yPos = yPos-adYJump
    }
    pop();

  }

  drawUnfollows(){
    push();
    fill(45,100,75,100)
    noStroke()

    let yPos = height-55;

    for (i = 0; i<this.unfollows.length;i++){
      circle(this.xPosition+margin, yPos, 1.1)
      yPos = yPos-unfollowsYJump
    }
    pop();
  }

}
