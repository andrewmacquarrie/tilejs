var canvas;
var size_x = 600;
var size_y = 300;
var mushroom_x = 10;
var mushroom_y = 10;

var x_direction = 1;
var y_direction = 1;

var images_ready = false;
var t;

$(document).ready(function() {
	var canvas = document.getElementById('stage').getContext('2d');  
	PreloadImages();
});

function drawCanvas(){	
	t = setTimeout('drawCanvas()',5)
	var context = document.getElementById('stage').getContext('2d');
	context.clearRect(0,0,size_x,size_y);
	context.drawImage(loadedImage[0],mushroom_x,mushroom_y,80,90);
	context.drawImage(loadedImage[1],(size_x-mushroom_x),(size_y-mushroom_y),80,90);
	
	if((mushroom_x > size_x - 80) || (mushroom_x < 1)) {
		x_direction = x_direction * -1;
	}

	
	if((mushroom_y > size_y - 90) || (mushroom_y < 1)) {
		y_direction = y_direction * -1;
	}

	mushroom_x = (mushroom_x + x_direction);
	mushroom_y = (mushroom_y + y_direction);
}

// IMAGE PRELOADER

var imageList = [ 'http://www.clevescene.com/images/blogimages/2010/09/02/1283447366-mario-mushroom.jpg', 'http://www.supermariobrothers.org/themes/wallpaper/Mushroom_Wallpaper_Pack_by_Ackslawsin.png' ];

var loaded = [false, false];

var loadedImage = [];

function PreloadImages(){
	for(imageNo in imageList)
	{
		var img = new Image();
	  loadedImage.push(img);
		img.onload = function (x){
			return function (e) {
				loaded[imageNo] = true;
			}
		}(imageNo);
		
		img.src = imageList[imageNo];
	}
	//alert('starting image load check');
	setTimeout('checkForImageLoad()',1);
}

function checkForImageLoad(){
	for(imageNo in imageList)
	{
	  if(loaded[imageNo] == false){
			t = setTimeout('checkForImageLoad()',500);
			return;
		}
	}
	alert('images done');
	drawCanvas();
}



