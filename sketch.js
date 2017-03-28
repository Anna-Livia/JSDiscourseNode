var communauteJSON;
var listOfTopics = [];

function preload() {
  var url = 'http://communaute.amontourdeprogrammer.fr/latest.json';
  communauteJSON = loadJSON(url);
}

function setup() {
	createCanvas(710, 400);
	var ListOfTopics = communauteJSON.topic_list.topics;

  	for (var i = 0; i < ListOfTopics.length; i++) {
		topic_Name = ListOfTopics[i].fancy_title;
		topic_id = ListOfTopics[i].id;
		post_count = ListOfTopics[i].posts_count;
		created_at = ListOfTopics[i].created_at;
		last_posted_at = ListOfTopics[i].last_posted_at;
		recency = recent(last_posted_at, year(), month(), day());
		category_id = ListOfTopics[i].category_id
		listOfTopics.push(new Topic(topic_Name, topic_id, post_count, created_at, last_posted_at, category_id, recency))
		console.log("New topic added");
	}
  	  
}

function draw() {
	background(255);
  	for (var i=0; i<listOfTopics.length; i++) {
	    listOfTopics[i].move();
	    listOfTopics[i].display();
	    for (var j=i+1; j<listOfTopics.length; j++) {
	    	var distance = dist(listOfTopics[i].x,listOfTopics[i].y,listOfTopics[j].x,listOfTopics[j].y);
	    	if (distance < 100){
	        	linking (listOfTopics[i], listOfTopics[j], distance);
	        }
	    }
	}
}

function Topic(temptopic_Name, temptopic_id, temppost_count, tempcreated_at, templast_posted_at, tempcategory_id, temprecent) {

 	this.topic_Name = temptopic_Name;
	this.topic_id = temptopic_id;
	this.post_count = temppost_count;
	this.created_at = tempcreated_at;
	this.last_posted_at = templast_posted_at;
	this.category_id = tempcategory_id;
	this.recent = temprecent;


	this.x = random(width);
  	this.y = random(height);
  	this.diameter = random(10, 30);
  	this.xspeed = random(1,2);
 	this.yspeed = random(1,2);

  	this.move = function() {
	    this.x += this.xspeed;
	    this.y += this.yspeed;
	    
	    if (this.x > width){ 
	      this.xspeed *= -1;
	      this.x = width;
	    }
	    if (this.x < 0){ 
	      this.xspeed *= -1;
	      this.x = 0;
	    }
	    if (this.y > height){ 
	      this.yspeed *= -1;
	      this.y = height;
	    }
	    if (this.y < 0){ 
	      this.yspeed *= -1;
	      this.y = 0;
	    }
	};

	this.display = function() {
   		strokeWeight(1);
    	ellipse(this.x, this.y, this.diameter, this.diameter);
    };

}

function recent(dateAsString, yearNow, monthNow, dayNow) {
	//2016-04-12T06:16:50.539Z
	var yearThen = parseInt(dateAsString.substring(0,4));
	var monthThen = parseInt(dateAsString.substring(5,7));
	var dayThen = parseInt(dateAsString.substring(8,10));
	var then = yearThen*365+monthThen*30+dayThen;;
	var now = yearNow*365 + monthNow*30+dayNow;
	timeDistance = now - then;
	if (timeDistance < 1 ){
		timeDistance = 1;
	}
	return timeDistance
}

function linking(n, m, distance){
	stroke(255,0,0);
	strokeWeight(map(distance, 0, 100, 3, 0));
	line(n.x, n.y, m.x, m.y);
}