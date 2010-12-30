var game = new Game();

$(document).ready(function() { 
	var preloader = new Preloader(game.ImagesLoadedCallback);
	var images = [];
	images.push('http://www.supermariobrothers.org/themes/wallpaper/Mushroom_Wallpaper_Pack_by_Ackslawsin.png');
	images.push('http://www.clevescene.com/images/blogimages/2010/09/02/1283447366-mario-mushroom.jpg');
	images.push('http://images.pictureshunt.com/pics/m/mario-1900.png');
	preloader.PreloadImages(images);
});