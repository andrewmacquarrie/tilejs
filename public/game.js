function Game() {
	var me = this;
	this.imageRepository;
	this.DrawInterval = 25;
	this.character_x = 0;
	this.character_y = 0;

	this.ImagesLoadedCallback=function (loaded_images) {
		me.imageRepository = loaded_images;
		setInterval(me.Draw, me.DrawInterval);
	}

	this.Draw = function (game) {
		me.MoveAndDraw();
	}

	var map = [[0,1,0,1,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,1]];
	var tile_height = 60;
	var tile_width = 60;
	var map_size_x = 600;
	var map_size_y = 300;
	
	this.MoveAndDraw = function (){	
		var context = document.getElementById('stage').getContext('2d');
		context.clearRect(0,0,map_size_x,map_size_y);
		
		var row=0;
		for (row=0;row<map.length;row++) {
			var col = 0;
		  for(col=0;col<map[row].length;col++){
				var tile = map[row][col];
				context.drawImage(me.imageRepository[tile],row*tile_width,col*tile_height,tile_width,tile_height);
			}
		}
		
		context.drawImage(me.imageRepository[2],me.character_x,me.character_y,tile_width,tile_height);
	}
	
	$(document).keypress(function(e){
		var keyCode = e.keyCode || e.which;
	 	var arrow = {left: 37, up: 38, right: 39, down: 40 };

	  if (keyCode == arrow.left) { me.character_x = me.character_x - tile_width; }
	  if (keyCode == arrow.right) { me.character_x = me.character_x + tile_width; }
		if (keyCode == arrow.up) { me.character_y = me.character_y - tile_height; }
		if (keyCode == arrow.down) { me.character_y = me.character_y + tile_height; }
	  
		return false;
	});
}
