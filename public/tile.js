var canvas;
var size_x = 600;
var size_y = 300;
var mushroom_x = 10;
var mushroom_y = 10;

var x_direction = 1;
var y_direction = 1;

var images_ready = false;
var t;
var img;

$(document).ready(function() {
	var canvas = document.getElementById('stage').getContext('2d');  
	
	img = new Image();
	img.onload = function(){  
		alert('images ready');
		images_ready = true;
  }
	img.src = 'http://www.clevescene.com/images/blogimages/2010/09/02/1283447366-mario-mushroom.jpg';

	drawCanvas();
 });

function drawCanvas(){	
	t = setTimeout('drawCanvas()',5)
	var context = document.getElementById('stage').getContext('2d');
	context.clearRect(0,0,size_x,size_y);
	
	if(images_ready){
		context.drawImage(img,mushroom_x,mushroom_y,80,90);
	}
	
	if((mushroom_x > size_x - 80) || (mushroom_x < 1)) {
		x_direction = x_direction * -1;
	}

	
	if((mushroom_y > size_y - 90) || (mushroom_y < 1)) {
		y_direction = y_direction * -1;
	}

	mushroom_x = (mushroom_x + x_direction);
	mushroom_y = (mushroom_y + y_direction);
}
