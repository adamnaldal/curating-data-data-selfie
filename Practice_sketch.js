let payload
let adsServed = []
let unfollows = []
let activity
let margin = 20
let days = []
let xSpacing = 2.2
let activityYJump = 2
let adYJump = 1.1
let unfollowsYJump = 1.2

function preload(){
  payload = loadJSON('payload-0.json');
}

function setup() {
  textSize(18);
  colorMode(HSB,100);

  for (each of payload[0].data.client_side_ad_analytics) {
    adsServed.push(each)
  } // load ads i have been served

  for (each of payload[0].data.unfollows) {
    unfollows.push(each)
  } //load blogs i have unfollowed

  activity = payload[0].data.last_active_times //load every time i have been active on tumblr
  activity.sort()

  console.log("data collected")

 //Create alla date objects
  for (i = 0; i<activity.length; i++){
    if (i>0){
      if (activity[i].slice(0,10) == lastActivity.slice(0,10)){
        days[days.length-1].activity++
      } else {
        days.push(new day(activity[i].slice(0,10),days.length*xSpacing))
      }
    } else {
      days.push(new day(activity[i].slice(0,10),days.length*xSpacing))
    }
    lastActivity = activity[i];
  }

  console.log("day objects initialised")

  //add ads and unfollows to date objects
  for (each of days){
    each.collectAds()
  }
  console.log("ads added")

  //add unfollows to days
  for (each of days){
    each.collectUnfollows()
  }
  console.log("unfollows added")

  createCanvas(days.length*xSpacing+100, 700)
}

function draw(){
  background(0,0,100)
  //create timeline based on date objects
  for (i = 0; i<days.length; i += floor(days.length*0.05)){
    text(days[i].date, i*xSpacing+margin, height-20)
  }

  push()
  textSize(16)
  fill(10,100,100,100)
  text("Ads served:", 40, 40);
  fill(5,100,100,80)
  text("Ads i viewed", 50, 55);
  fill(0,100,100,100)
  text("Ads i interacted with" , 50, 70);
  fill(90,100,100,100)
  text("Ads i viewed and interacted with", 50, 85)

  fill(45,100,75,100)
  text("Blogs i unfollowed", 40, 120)

  fill(70,100,100,70)
  text("Activity", 40, 155)
  pop()

  for (each of days){
    each.drawActivity()
    each.drawAds()
    each.drawUnfollows()
  }

}
