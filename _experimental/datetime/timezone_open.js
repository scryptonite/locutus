function timezone_open(timezone) {  var __ = Relator.$();
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // +   improved by: Andrea Giammarchi
    // -    depends on: timezone_abbreviations_list(), timezone_identifiers_list(), timezone_transitions_get()
    // %        note 1: Creates a DateTimeZone() object as in PHP, but we really need to implement DateTime() and possibly fix some methods here

	// BEGIN STATIC
	if (!window.php_js) {
		window.php_js = {};
	}
	if (!window.php_js.Relator) {
		window.php_js.Relator = function () {// Used this functional class for giving privacy to the class we are creating
			// Code adapted from http://www.devpro.it/code/192.html
			// Relator explained at http://webreflection.blogspot.com/2008/07/javascript-relator-object-aka.html
			// Its use as privacy technique described at http://webreflection.blogspot.com/2008/10/new-relator-object-plus-unshared.html
			// 1) At top of closure, put: var __ = Relator.$();
			// 2) In constructor, put: var _ = __.constructor(this);
			// 3) At top of each prototype method, put: var _ = __.method(this);
			// 4) Use like:  _.privateVar = 5;
			function indexOf (value) {
				for (var i = 0, length=this.length; i < length; i++) {
					if (this[i] === value) {
						return i;
					}
				}
				return -1;
			}
			function Relator () {
				var Stack = [], Array = [];
				if (!Stack.indexOf) {
					Stack.indexOf = indexOf;
				}
				return {
					// create a new relator
					$ : function () {
						return Relator();
					},
					constructor : function (that) {
						var i = Stack.indexOf(that);
						~i ? Array[i] : Array[Stack.push(that) - 1] = {};
						this.method(that).that = that;
						return this.method(that);
					},
					method : function (that) {
						return Array[Stack.indexOf(that)];
					}
				};
			}
			return Relator();
		}();
	}
	// END STATIC

	function DateTimeZone ($timezone) {var _ = __.constructor(this);
		_.timezone = $timezone;
	}
	DateTimeZone.prototype = {
		constructor : DateTimeZone,
		getLocation : function () {
			throw 'Apparently not implemented in PHP';
			// return {'country_code': 'CZ', 'latitude': 50.08333, 'longitude': 14.43333, comments:''};
		},
		getName : function () {var _ = __.method(this);
			return _.timezone;
		},
		getOffset : function (datetime) { // DateTime
			return datetime.getOffset(); // Fix: how to use rules of this object?
		},
		getTransitions : function (begin, end) {return timezone_transitions_get(this, begin, end);},
		listAbbreviations : function () {return timezone_abbreviations_list();},
		listIdentifiers : function (what, country) {return timezone_identifiers_list(what, country);}
	};
	DateTimeZone.AFRICA = 1;
	DateTimeZone.AMERICA = 2;
	DateTimeZone.ANTARCTICA = 4;
	DateTimeZone.ARCTIC = 8;
	DateTimeZone.ASIA = 16;
	DateTimeZone.ATLANTIC = 32;
	DateTimeZone.AUSTRALIA = 64;
	DateTimeZone.EUROPE = 128;
	DateTimeZone.INDIAN = 256;
	DateTimeZone.PACIFIC = 512;
	DateTimeZone.UTC = 1024;
	DateTimeZone.ALL = 2047;
	DateTimeZone.ALL_WITH_BC = 4095;
	DateTimeZone.PER_COUNTRY = 4096;

	return new DateTimeZone(timezone);
}
