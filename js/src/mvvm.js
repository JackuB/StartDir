var startApp = function() {
	/*
		Setup
	 */
	var self = this;
	self.search = ko.observable("");
	self.active = ko.observable(0);
	self.showHidden = ko.observable(false);

	/**
	 * dir class
	 * @param  {object} object of dir
	 * @return {void}
	 */
	var dir = function(dir) {
		var thisDir = this;
		thisDir.hidden = ko.observable(dir.hidden);
		thisDir.folderName = ko.observable(dir.folderName);
		thisDir.isVisible = ko.computed(function() {
			if(fuzzy(thisDir.folderName(),self.search())) {
				return true;
			} else {
				return false;
			}
		});
		thisDir.isActive = function(c,e) {
			if(thisDir.folderName() === self.dirs()[self.active()].folderName()) {
				if(thisDir.isVisible()) {
					return true;
				} else {
					self.findNextVisible();
					return false;
				}
			} else {
				return false;
			}
		}
		thisDir.go = function() {
			window.location.href=window.location.href + thisDir.folderName();
		}
	}

	self.dirs = ko.observableArray();
	var phpArray = phpJSON;
	var phpArrayLenght = phpArray.length;

	for (var i = 0; i < phpArrayLenght; i++) {
		self.dirs.push(new dir(phpArray[i]));
	};

	/**
	 * set self.active() to next visible object. If it reaches end, it starts from beginning
	 * @return {void}
	 */
	self.findNextVisible = function() {
		var numberOfDirs = self.dirs().length - 1;
		if(self.active() < numberOfDirs) {
			self.active(self.active()+1);
		} else {
			self.active(0);
		}
	};

	/**
	 * set self.active() to next visible object. If it reaches end, it starts from beginning
	 * @return {void}
	 */
	self.findPrevVisible = function() {
		var numberOfDirs = self.dirs().length - 1;
		if(self.active() < numberOfDirs+1 && self.active() > 0) {
			self.active(self.active()-1);
		} else {
			self.active(numberOfDirs);
		}
	};


	self.scrollToActive = ko.computed(function() {
		self.active();
		if(!elementInViewport(document.querySelectorAll(".box.active"))) {
			window.scroll(0,findPos(document.getElementById(".box.active")));
		}
	});

	/*
		Key binds
	*/
	window.onkeypress = function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			self.dirs()[self.active()].go();
		}
	};
	window.onkeydown = function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '40'){
			self.findNextVisible();
		}
		if(keycode == '38'){
			self.findPrevVisible();
		}
	};
}
ko.applyBindings(new startApp);

/**
 * Fuzzy search
 * @param  {string} haystack
 * @param  {string} string to find
 * @return {bool}
 */
function fuzzy (h,s) {
    var hay = h.toLowerCase(), i = 0, n = 0, l;
    s = s.toLowerCase();
    for (; l = s[i++] ;) if ((n = hay.indexOf(l, n)) === -1) return false;
    return true;
};

/**
 * Is element visible in current viewport?
 * @param  {object} el element in question
 * @return {bool}
 */
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

//Finds y value of given object
function findPos(obj) {
    var curtop = 0;
    if(obj !== null) {
	    if (obj.offsetParent) {
	        do {
	            curtop += obj.offsetTop;
	        } while (obj = obj.offsetParent);
	    return [curtop];
	    }
	} else {
		return 0;
	}
}