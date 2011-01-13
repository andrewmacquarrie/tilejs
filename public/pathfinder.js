function Pathfinder(walk_map){
	var pathfinder = this;
	this.walk_map = walk_map;
	this.x_tiles = 20; // pathfinder.walk_map.length;
	this.y_tiles = 20; //pathfinder.walk_map[0].length;
	this.destination;
	this.origin;
	

	this.path = [];
	
	this.findPath = function(origin, destination){
		pathfinder.path = [];
		pathfinder.destination = destination;
		pathfinder.origin = origin;
		
		pathfind(destination);
		var route = startPlotPath(origin);
		
		return route;
	}
	
	function startPlotPath(destination){
	  pathfinder.path.splice(indexInPath(pathfinder.origin),1);
	  return [pathfinder.origin].concat(plotPath(pathfinder.origin,pathfinder.destination));
	}
	
	function plotPath (centre, destination) {
	  var nextTile = getNextTile(centre);
	  if(nextTile.x == destination.x && nextTile.y == destination.y){
	    return nextTile;
	  }
	  return [nextTile].concat(plotPath(nextTile,destination));
  }
	
	function getNextTile(centre){
	  var adjacentTiles = [];
	  var i=0;
		for (i=0;i<pathfinder.path.length;i++) { 
  	  if(pathfinder.path[i].x == centre.x+1 && pathfinder.path[i].y == centre.y){
        adjacentTiles.push(pathfinder.path[i]);
      }
      if(pathfinder.path[i].x == centre.x-1 && pathfinder.path[i].y == centre.y){
        adjacentTiles.push(pathfinder.path[i]);
      }
      if(pathfinder.path[i].x == centre.x && pathfinder.path[i].y == centre.y+1){
        adjacentTiles.push(pathfinder.path[i]);
      }
      if(pathfinder.path[i].x == centre.x && pathfinder.path[i].y == centre.y-1){
        adjacentTiles.push(pathfinder.path[i]);
      }
    }
	  var bestTile = adjacentTiles.sort(sortByCount)[0];
	  pathfinder.path.splice(indexInPath(bestTile),1);
	  return bestTile;
	}
	
	function indexInPath(tile){
	  var i = 0;
	  for(i=0;i<pathfinder.path.length;i++){
		  if(pathfinder.path[i].x == tile.x && pathfinder.path[i].y == tile.y)
		  {
		    return i;
		  }
		}
		return null;
	}
	
	function sortByCount(a, b){
    return (a.count - b.count)
  }
	
	function pathfind (centre) {
	  pathfinder.path.push(centre)
	  var list = adjacentTiles(centre);
	  
	  var i = 0;
	  for(i=0;i<list.length;i++){
		  if(shouldKeep(list[i])){
		    pathfinder.path.push(list[i])
		    if(list[i].x == pathfinder.origin.x && list[i].y == pathfinder.origin.y){
		      return;
		    }
		  }
		}
		
		if(pathfinder.path.length > 0){
		  var next = pathfinder.path[0];
		  pathfinder.path.shift();
		  pathfind(next);
		}
  }
  
  function shouldKeep(tile){
    // alert('should keep');
    if(pathfinder.walk_map[tile.y][tile.x] == 0){
    	return false;
    }
    var i=0;
		for (i=0;i<pathfinder.path.length;i++) {
		  t = pathfinder.path[i];
		  if(t.x == tile.x && t.y == tile.y && t.count <= tile.count)
		  {
		    return false;
		  }
		}
		return true;
  }
  
  function adjacentTiles(tile){
    var list = [];
    if(tile.x+1<pathfinder.x_tiles-1){
      list.push({x:tile.x+1,y:tile.y,count:tile.count+1});
    }
    if(tile.x>0){
      list.push({x:tile.x-1,y:tile.y,count:tile.count+1});
    }
    if(tile.y<pathfinder.y_tiles-1){
      list.push({x:tile.x,y:tile.y+1,count:tile.count+1});
    }
    if(tile.y>0){
      list.push({x:tile.x,y:tile.y-1,count:tile.count+1});
    }
    return list;
  }
	
}