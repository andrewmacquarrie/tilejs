function Game() {
	var me = this;
	this.imageRepository;
	this.DrawInterval = 25;

	this.ImagesLoadedCallback=function (loaded_images) {
		me.imageRepository = loaded_images;
		setInterval(me.Draw, me.DrawInterval);
	}

	this.Draw = function (game) {
		me.MoveAndDraw();
	}

	var size_x = 600;
	var size_y = 300;
	var mushroom_x = 10;
	var mushroom_y = 10;
	var x_direction = 1;
	var y_direction = 1;
	this.MoveAndDraw = function (){	
		var context = document.getElementById('stage').getContext('2d');
		context.clearRect(0,0,size_x,size_y);
		context.drawImage(me.imageRepository[0],mushroom_x,mushroom_y,80,90);
		context.drawImage(me.imageRepository[1],(size_x-mushroom_x),(size_y-mushroom_y),80,90);
		context.drawImage(me.imageRepository[2],(size_x-mushroom_x),(mushroom_y),80,90);
	
		if((mushroom_x > size_x - 80) || (mushroom_x < 1)) {
			x_direction = x_direction * -1;
		}

	
		if((mushroom_y > size_y - 90) || (mushroom_y < 1)) {
			y_direction = y_direction * -1;
		}

		mushroom_x = (mushroom_x + x_direction);
		mushroom_y = (mushroom_y + y_direction);
	}
}
