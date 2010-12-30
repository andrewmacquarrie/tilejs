function Preloader(callback) {
	var me = this;
	this.callback = callback;
	this.imageList = [];
	this.loaded = [];
	this.loadedImage = [];

	this.PreloadImages = function (imagesList){
		me.imageList = imagesList;
		for(imageNo in me.imageList)
		{
			me.loaded.push(false);
			var img = new Image();
		  me.loadedImage.push(img);
			img.onload = function (x){
				return function (e) {
					me.loaded[imageNo] = true;
					me.checkForImageLoad();
				}
			}(imageNo);
		
			img.src = me.imageList[imageNo];
		}
		this.checkForImageLoad();
	}

	this.checkForImageLoad = function (){
		for(imageNo in me.imageList)
		{
		  if(me.loaded[imageNo] == false){
				return;
			}
		}
		this.callback(me.loadedImage);
	}
}






