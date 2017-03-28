var communauteJSON;
var listOfNodes = [];
var ListOfTopics = [];

function preload() {
  var url = 'http://communaute.amontourdeprogrammer.fr/latest.json';
  communauteJSON = loadJSON(url);
}

function setup() {
	createCanvas(600, 600);
	var ListOfTopics = communauteJSON.topic_list.topics;

  	for (var i = 0; i < ListOfTopics.length; i++) {
		topic_Name = ListOfTopics[i].fancy_title;
		topic_id = ListOfTopics[i].id;
		post_count = ListOfTopics[i].posts_count;
		created_at = ListOfTopics[i].created_at;
		last_posted_at = ListOfTopics[i].last_posted_at;
		recency = 1/recent(last_posted_at, year(), month(), day());
		category_id = ListOfTopics[i].category_id
		listOfNodes.push(new Topic(topic_Name, topic_id, post_count, created_at, last_posted_at, category_id, recency))
		console.log("New topic added");
	}

  	  
}

function draw() {
	background(255);
  	for (var i=0; i<listOfNodes.length; i++) {
	    listOfNodes[i].move();
	    for (var j=i+1; j<listOfNodes.length; j++) {
	    	var distance = dist(listOfNodes[i].x,listOfNodes[i].y,listOfNodes[j].x,listOfNodes[j].y);
	    	//if (distance < 100){
	        	//linking (listOfNodes[i], listOfNodes[j], distance);
	        //}
	    }
	    listOfNodes[i].display();
	}
}
function mouseDragged() {
	for (var i=0; i<listOfNodes.length; i++) {
		node = listOfNodes[i];
		if (dist(mouseX, mouseY, node.x, node.y) < node.diameter) {
			node.x = mouseX;
			node.y = mouseY;
		}
		for (var j=1; j<listOfNodes.length; j++){
			altNode = listOfNodes[j];
			if (altNode.category_id == node.category_id){
				distance = dist(node.x,node.y, altNode.x, altNode.y);
				linking(node, altNode, distance);
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


	this.x = random(width/3)+ width/3;
  	this.y = random(height/3) + height/3;
  	this.diameter = 6*temppost_count;

  	this.xspeed = random([-1, 1])*temprecent;
 	this.yspeed = random([-1, 1])*temprecent;

  	this.move = function() {
	    this.x += this.xspeed;
	    this.y += this.yspeed;
	    
	    if (this.x + this.diameter/2 > width){ 
	      this.xspeed *= -1;
	      this.x = width - this.diameter/2;
	    }
	    if (this.x - this.diameter/2 < 0){ 
	      this.xspeed *= -1;
	      this.x  = 0 + this.diameter/2;
	    }
	    if (this.y + this.diameter/2> height){ 
	      this.yspeed *= -1;
	      this.y = height - this.diameter/2;
	    }
	    if (this.y  - this.diameter/2 < 0){ 
	      this.yspeed *= -1;
	      this.y = 0+ this.diameter/2;
	    }
	};

	this.display = function() {
   		strokeWeight(0.1);
   		colorMode(HSB, 15);
   		fill(this.category_id, 15, 10);
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
	colorMode(RGB, 255);
	stroke(10);
	strokeWeight(map(distance, 0, 100, 0.3, 0));
	line(n.x, n.y, m.x, m.y);
}