var startApp = function() {
	var self = this;
	self.dirs = ko.observable(phpJSON);
	self.search = ko.observable("");

	self.active = ko.observable(0);

	self.isActive = function(folderName) {
		if(folderName === self.dirs()[self.active()].folderName) {
			if(self.isVisible(folderName)) {
				return true;
			} else {
				self.findNextVisible();
				return false;
			}
		} else {
			return false;
		}
	}

	self.findNextVisible = function() {
		var numberOfDirs = self.dirs().length - 1;
		if(self.active() < numberOfDirs) {
			self.active(self.active()+1);
		} else {
			self.active(0);
		}
	};

	self.findPrevVisible = function() {
		var numberOfDirs = self.dirs().length - 1;
		if(self.active() < numberOfDirs+1 && self.active() > 0) {
			self.active(self.active()-1);
		} else {
			self.active(numberOfDirs);
		}
	};

	self.isVisible = function(folderName) {
		if(fuzzy(folderName,self.search())) {
			return true;
		} else {
			return false;
		}
	};

	self.goActive = function() {
		window.location.href=window.location.href + self.dirs()[self.active()].folderName;
	}

	/*
		Key binds
	*/
	$(document).keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			self.goActive();
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

function fuzzy (h,s) {
    var hay = h.toLowerCase(), i = 0, n = 0, l;
    s = s.toLowerCase();
    for (; l = s[i++] ;) if ((n = hay.indexOf(l, n)) === -1) return false;
    return true;
};