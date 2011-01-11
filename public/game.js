function Game() {
	var me = this;
	this.imageRepository;
	this.DrawInterval = 50;
	this.character_x = 0;
	this.character_y = 0;

	this.ImagesLoadedCallback=function (loaded_images) {
		me.imageRepository = loaded_images;
		setInterval(me.Draw, me.DrawInterval);
	}

	this.Draw = function (game) {
		me.MoveAndDraw();
	}

	var map =  [];
  map.push([0,0,0]);
  map.push([0,1,0]);
  map.push([0,0,0]);
	// map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	//   map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,1,1,1,1,1,1,1,0]);
	//   map.push([0,1,1,1,1,1,1,1,1,1,1,1,1,1,0]);
	//   map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	var walk_map = [];
	walk_map.push([1,1,1]);
  walk_map.push([1,0,1]);
  walk_map.push([1,1,1]);
	// walk_map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	//   walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,0,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,1,1,1,1,1,1,1,0]);
	//   walk_map.push([0,1,1,1,1,1,1,1,1,1,1,1,1,1,0]);
	//   walk_map.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	var tile_height = 40;
	var tile_width = 40;
	var map_size_x = 600;
	var map_size_y = 800;
	var x_tiles = map.length;
	var y_tiles = map[0].length;
	var route = [];
	
	this.MoveAndDraw = function (){	
	  if (route.length > 0){
	    var pos = route.pop();
	    
      me.character_y = pos.x;
      me.character_x = pos.y;
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
    
    var destination = {x:map_x,y:map_y,count:0};
    pathfind(destination);
    
    var p = startPlotPath(destination);
    debugger;
	  return false;
	});
	
	var path = [];
	
	function startPlotPath(destination){
	  var origin = {x:me.character_x, y:me.character_y};
	  path.splice(indexInPath(origin),1);
	  return origin + plotPath(origin,destination);
	}
	
	function plotPath (centre, destination) {
	  var nextTile = getNextTile(centre);
	  if(nextTile.x == destination.x && nextTile.y == destination.y){
	    return nextTile;
	  }
	  return nextTile + plotPath(nextTile,destination);
  }
	
	function getNextTile(centre){
	  var adjacentTiles = [];
	  var i=0;
		for (i=0;i<path.length;i++) { 
  	  if(path[i].x == centre.x+1 && path[i].y == centre.y){
        adjacentTiles.push(path[i]);
      }
      if(path[i].x == centre.x-1 && path[i].y == centre.y){
        adjacentTiles.push(path[i]);
      }
      if(path[i].x == centre.x && path[i].y == centre.y+1){
        adjacentTiles.push(path[i]);
      }
      if(path[i].x == centre.x && path[i].y == centre.y-1){
        adjacentTiles.push(path[i]);
      }
    }
    debugger;
	  var bestTile = adjacentTiles.sort(sortByCount)[0];
	  path.splice(indexInPath(bestTile),1);
	  return bestTile;
	}
	
	function indexInPath(tile){
	  var i = 0;
	  for(i=0;i<path.length;i++){
		  if(path[i].x == tile.x && path[i].y == tile.y)
		  {
		    return i;
		  }
		}
		return null;
	}
	
	function sortByCount(a, b){
    return (a.count - b.count) //causes an array to be sorted numerically and ascending
  }
	
	function pathfind (centre) {
	  path.push(centre)
	  var list = adjacentTiles(centre);
	  
	  var i = 0;
	  for(i=0;i<list.length;i++){
		  if(shouldKeep(list[i])){
		    path.push(list[i])
		    if(list[i].x == me.character_x && list[i].y == me.character_y){
		      return;
		    }
		  }
		}
		
		if(path.length > 0){
		  var next = path[0];
		  path.shift();
		  pathfind(next);
		}
  }
  
  function shouldKeep(tile){
    // alert('should keep');
    //     if(!walk_map[tile.x, tile.y]){
    //       return false;
    //     }
    var i=0;
		for (i=0;i<path.length;i++) {
		  t = path[i];
		  if(t.x == tile.x && t.y == tile.y && t.count <= tile.count)
		  {
		    return false;
		  }
		}
		return true;
  }
  
  function adjacentTiles(tile){
    var list = [];
    if(tile.x+1<x_tiles-1){
      list.push({x:tile.x+1,y:tile.y,count:tile.count+1});
    }
    if(tile.x>0){
      list.push({x:tile.x-1,y:tile.y,count:tile.count+1});
    }
    if(tile.y<y_tiles-1){
      list.push({x:tile.x,y:tile.y+1,count:tile.count+1});
    }
    if(tile.y>0){
      list.push({x:tile.x,y:tile.y-1,count:tile.count+1});
    }
    return list;
  }
  
}
