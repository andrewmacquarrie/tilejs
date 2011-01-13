function Game() {
	var me = this;
	this.imageRepository;
	this.DrawInterval = 150;
	this.character_x = 2;
	this.character_y = 2;

	this.ImagesLoadedCallback=function (loaded_images) {
		me.imageRepository = loaded_images;
		setInterval(me.Draw, me.DrawInterval);
	}

	this.Draw = function (game) {
		me.MoveAndDraw();
	}

	var map =  [];
  // map.push([0,0,0]);
  // map.push([0,1,0]);
  // map.push([0,0,0]);
	map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
  map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
  map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  map.push([0,1,1,1,1,1,1,1,1,1,1,0,1,1,0]);
  map.push([0,1,1,1,1,1,1,1,1,1,1,0,1,1,0]);
  map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	var walk_map = [];
	// walk_map.push([1,1,1]);
	//   walk_map.push([1,0,1]);
	//   walk_map.push([1,1,1]);
	walk_map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,0,1,1,1,0,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,1,1,1,1,0,1,1,0]);
  walk_map.push([0,1,1,1,1,1,1,1,1,1,1,0,1,1,0]);
  walk_map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	var tile_height = 40;
	var tile_width = 40;
	var map_size_x = 600;
	var map_size_y = 800;

	var route = [];
	
	this.MoveAndDraw = function (){	
	  if (route.length > 0){
	    var pos = route.shift();
      me.character_y = pos.y;
      me.character_x = pos.x;
	  }
	  
		var context = document.getElementById('stage').getContext('2d');
		context.clearRect(0,0,map_size_x,map_size_y);
		
		var row=0;
		for (row=0;row<map.length;row++) {
			var col = 0;
		  for(col=0;col<map[row].length;col++){
				var tile = map[row][col];
				context.drawImage(me.imageRepository[tile],col*tile_height,row*tile_width,tile_height,tile_width);
			}
		}
		
		context.drawImage(me.imageRepository[2],me.character_x*tile_width,me.character_y*tile_height,tile_width,tile_width);
	}
	
	$(document).keypress(function(e){
		var keyCode = e.keyCode || e.which;
	 	var arrow = {left: 37, up: 38, right: 39, down: 40 };
		
	  if (keyCode == arrow.left) { if(walk_map[me.character_y][me.character_x-1]) { me.character_x = me.character_x - 1; } }
	  if (keyCode == arrow.right) { if(walk_map[me.character_y][me.character_x + 1]) {  me.character_x = me.character_x + 1; } }
		if (keyCode == arrow.up) { if(walk_map[me.character_y - 1][me.character_x]) { me.character_y = me.character_y - 1; } }
		if (keyCode == arrow.down) { if(walk_map[me.character_y + 1][me.character_x]) { me.character_y = me.character_y + 1; } }
	  
		// $("#diag").val("(x:"+me.character_x+",y:"+me.character_y+")");
	
		return false;
	});
	
	$(document).click(function(e){
	  var offset = $("#stage").offset();
	  var x = e.pageX - offset.top;
    var y = e.pageY - offset.left;
    
    var map_x = Math.floor(x/tile_width);
    var map_y = Math.floor(y/tile_height);
    
    var destination = {x:map_x, y:map_y, count:0};
		var origin = {x:me.character_x, y:me.character_y};
		var pathfinder = new Pathfinder(walk_map);
		var p = pathfinder.findPath(origin,destination)
		route = p;
	  return false;
	});
	
	var path = [];

  
}
