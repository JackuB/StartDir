var startApp = function() {
	/*
		Setup
	 */
	var self = this;
	self.search = ko.observable("");
	self.active = ko.observable(0);


	/**
	 * dir class
	 * @param  {object} object of dir
	 * @return {void}
	 */
	var dir = function(dir) {
		var thisDir = this;
		thisDir.hidden = ko.observable(dir.hidden);
		thisDir.folderName = ko.observable(dir.folderName);
		thisDir.toggleHidden = function() {
			thisDir.hidden(!thisDir.hidden());
		}
		thisDir.isVisible = ko.computed(function() {
			if(thisDir.hidden()) {
				return false;
			}
			if(fuzzy(thisDir.folderName(),self.search())) {
				return true;
			} else {
				return false;
			}
		});
		thisDir.go = function() {
			window.location.href=window.location.href + thisDir.folderName();
		}
	}
	self.dirs = ko.observableArray();
	var phpJSONLenght = phpJSON.length;
	for (var i = 0; i < phpJSONLenght; i++) {
		self.dirs.push(new dir(phpJSON[i]));
	};

	/**
	 * Check, whether given object is active
	 * @param  {object}
	 * @return {Boolean}
	 */
	self.isActive = function(object) {
		if(object.folderName() === self.dirs()[self.active()].folderName()) {
			if(object.isVisible()) {
				return true;
			} else {
				self.findNextVisible();
				return false;
			}
		} else {
			return false;
		}
	}

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

	/*
		Key binds
	*/
	$(document).keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			self.dirs()[self.active()].go();
		}
	});
	$(document).keydown(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '40'){
			self.findNextVisible();
		}
		if(keycode == '38'){
			self.findPrevVisible();
		}
	});
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