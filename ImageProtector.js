var ImageProtector = {
	transparentPNG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',

	overrideCanvasExports: function(canvas) {
		var protectFunction = function() {
			alert('This image is protected.');
		};

		// a friendly reminder that the image is protected,
		// if any canvas image export methods are tried
		canvas.getImageData = protectFunction;
		canvas.getContext = protectFunction;
		canvas.toDataURL = protectFunction;
	},

	preventRightClick: function(canvas) {	
		// prevent right click and context menu (for saving)
		// this of course can be reversed, 
		// but let's mess with the adversary as much as we can
		canvas.oncontextmenu =function() {
			return false;
		};
		canvas.onmousedown = function(evt) {
			if (evt.button === 2) {
				return false;
			}
		};
	},

	overlayTransparentPNG: function(canvas) {
		var wrapper = document.createElement('div');
		var img = document.createElement('img');
		img.src = ImageProtector.transparentPNG;
		img.setAttribute('style', 'width: ' + canvas.width + 'px; height:' + canvas.height + 'px; position: absolute; top: 0; left: 0;');
		wrapper.setAttribute('style', 'position: relative;');
		canvas.parentNode.insertBefore(wrapper, canvas);
		wrapper.appendChild(canvas);
		wrapper.appendChild(img);
	},

	lockCanvas: function(canvas) {
		ImageProtector.overrideCanvasExports(canvas);
		ImageProtector.preventRightClick(canvas);
		ImageProtector.overlayTransparentPNG(canvas);
	},

	selfDestruct: function() {
		ImageProtector = null;
	}
};
