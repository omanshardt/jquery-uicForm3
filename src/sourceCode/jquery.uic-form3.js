// Version 1.10.0 06.01.2018
// This is the successor of Version 1.0.5
// It incorporates most developments that was made since 22.02.2015 within various copies and versions from 1.0.5 to 1.9.2
// added hasOwnProperty query in many places

(function($, window, undefined) {
	var identifier = "uic_form3";
	var _const = {
		log: {
			DEBUG:'debug',
			INFO:'info',
			WARN:'warn',
			ERROR:'error',
			EVENT:'event'
		},
		errCodes: {
			NOTAUICFORM: 'The form is not a "uicForm".',
			NUMOFARGS: 'Number of arguments is out of range.'
		}
	}

	// public methods START
	var methods = {
		populate: function(dataObj, isInitialValue) {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				if (isInitialValue) {
					if (storage.callEventListeners.call(formElm, 'onInitDataUnload', methods.initData.call($formElm), methods.formModified.call($formElm)) == false) {
						return false;
					}
				}
				else {
					if (storage.callEventListeners.call(formElm, 'onDataUnload', methods.data.call($formElm), methods.formModified.call($formElm)) == false) {
						return false;
					}
				}

//				if (((isInitialValue) ? storage.callEventListeners.call(formElm, 'onInitDataUnload', methods.initData.call($formElm), methods.formModified.call($formElm)) : storage.callEventListeners.call(formElm, 'onDataUnload', methods.data.call($formElm), methods.formModified.call($formElm))) === false) {
//					return false;
//				}

				for (var obj in storage.properties) {
					if (storage.properties.hasOwnProperty(obj)) {
						var prop = storage.properties[obj];
						try {
							var val = getDataValue.call(formElm, dataObj, prop.name);
							if (typeof val == 'undefined' || val == null) {
								if (isInitialValue) methods.initVal.call($formElm, prop.name, (prop.expectedValType == 'primitive') ? '' : []);
								throw new ReferenceError('The data model for the form does not provide a value for the property with name \"' + prop.name + "\"");
							}
							(isInitialValue) ? methods.initVal.call($formElm, prop.name, val) : methods.val.call($formElm, prop.name, val);
						}
						catch(e) {
							log('error', e.name + ": " + e.message);
						}
					}
				}
				(isInitialValue) ? storage.callEventListeners.call(formElm, 'onInitDataLoad', methods.initData.call($formElm), methods.formModified.call($formElm)) : storage.callEventListeners.call(formElm, 'onDataLoad', methods.data.call($formElm), methods.formModified.call($formElm));
				return true;
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		populateRecord: function(data) {
			try {
				if (arguments.length != 1) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				return methods.populate.call(this, data, true);
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		populateData: function(data) {
			try {
				if (arguments.length != 1) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				return methods.populate.call(this, data, false);
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		initData: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				switch (arguments.length) {
					case 0:
						var dataObj = {}
						for (var i in storage.properties) {
							if (storage.properties.hasOwnProperty(i)) {
								// don't include property into return object when all assigned elements are disabled
								var enabledElements = storage.properties[i].$elms.filter(function(elm) { return !elm.disabled });
								if (enabledElements.length > 0) setDataValue.call(formElm, dataObj, storage.properties[i].name, methods.initVal.call($formElm, storage.properties[i].name));
							}
						}
						return dataObj;
						break;
					case 1:
						return methods.populate.call($formElm, arguments[0], true);
						break;
					default:
						throw RangeError(_const.errCodes.NUMOFARGS);
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		data: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				switch (arguments.length) {
					case 0:
						var dataObj = {}
						for (var i in storage.properties) {
							if (storage.properties.hasOwnProperty(i)) {
								// don't include property into return object when all assigned elements are disabled
								var enabledElements = storage.properties[i].$elms.filter(function(elm) { return !elm.disabled })
								if (enabledElements.length > 0) setDataValue.call(formElm, dataObj, storage.properties[i].name, methods.val.call($formElm, storage.properties[i].name));
							}
						}
						return dataObj;
						break;
					case 1:
						return methods.populate.call($formElm, arguments[0], false);
						break;
					default:
						throw RangeError(_const.errCodes.NUMOFARGS);
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		modifiedData: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				switch (arguments.length) {
					case 0:
						var dataObj = {}
						for (var i in storage.properties) {
							if (storage.properties.hasOwnProperty(i)) {
								var enabledElements = storage.properties[i].$elms.filter(function(elm) { return !elm.disabled })
								var val = methods.val.call($formElm, storage.properties[i].name);
								var initVal = methods.initVal.call($formElm, storage.properties[i].name);
								if (!isEqual(initVal, val)) {
									if (enabledElements.length > 0) setDataValue.call(formElm, dataObj, storage.properties[i].name, val);
								}
							}
						}
						return dataObj;
						break;
					default:
						throw RangeError(_const.errCodes.NUMOFARGS);
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		initVal: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				switch (arguments.length) {
					case 1:
						return getValue.call(formElm, true, arguments);
						break;
					case 2:
					case 3:
						setValue.call(formElm, true, arguments);
						return $formElm;
						break;
					default:
						throw RangeError(_const.errCodes.NUMOFARGS);
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		val: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				switch (arguments.length) {
					case 1:
						return getValue.call(formElm, false, arguments);
						break;
					case 2:
					case 3:
						setValue.call(formElm, false, arguments);
						return $formElm;
						break;
					default:
						throw RangeError(_const.errCodes.NUMOFARGS);
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		emptyVal: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				switch (arguments.length) {
					case 1:
						if (typeof data.storage.properties[arguments[0]].emptyValue != 'undefined') {
							return data.storage.properties[arguments[0]].emptyValue;
						}
						else {
							return (data.storage.properties[arguments[0]].expectedValType == 'primitive') ? '' : [];
						}
						break;
					case 2:
						if (typeof arguments[0] == 'object') {
							for (var i = 0; i < arguments[0].length; i++) {
								data.storage.properties[arguments[0][i]].emptyValue = arguments[1];
							}
						}
						else {
							data.storage.properties[arguments[0]].emptyValue = arguments[1];
						}
						return $formElm;
						break;
					default:
						throw RangeError(_const.errCodes.NUMOFARGS);
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		clear: function() {
			try {
				if (arguments.length != 0) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				var dataObj = {};
				for (var i in storage.properties) {
					if (storage.properties.hasOwnProperty(i)) {
						// don't include property into return object when all assigned elements are disabled
						var enabledElements = storage.properties[i].$elms.filter(function(elm) { return !elm.disabled })
						if (enabledElements.length > 0) setDataValue.call(formElm, dataObj, storage.properties[i].name, (storage.properties[i].expectedValType == 'primitive') ? '' : []);
					}
				}
				methods.populate.call(this, dataObj, true);
				storage.callEventListeners.call(formElm, 'onClear');
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		wipe: function() {
			try {
				if (arguments.length != 0) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				var dataObj = {};
				for (var i in storage.properties) {
					if (storage.properties.hasOwnProperty(i)) {
						// don't include property into return object when all assigned elements are disabled
						var prop = storage.properties[i];
						var enabledElements = prop.$elms.filter(function(elm) { return !elm.disabled })
						if (enabledElements.length > 0) {
							var val = null;
							if (prop.expectedValType == 'primitive') {
								if (toClass.call(prop.tempValObj) == '[object Object]' && prop.tempValObj !== null) {
									prop.tempValObj.value = '';
									val = prop.tempValObj;
								}
								else {
									val = '';
								}
							}
							else {
								if (prop.tempValObj !== null) {
									prop.tempValObj.value = [];
									val = prop.tempValObj;
								}
								else {
									val = [];
								}
							}
							setDataValue.call(formElm, dataObj, prop.name, val);
						}
					}
				}
				methods.populate.call(this, dataObj, false);
				storage.callEventListeners.call(formElm, 'onWipe');
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		resetFields: function() {
			try {
				if (arguments.length != 0) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				methods.data.call($formElm, methods.initData.call($formElm));
				storage.callEventListeners.call(formElm, 'onResetFields');
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},

		addEventListener: function(event, method) {
			try {
				if (arguments.length != 2) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				if (storage.listeners[event]) {
					storage.listeners[event].push(method);
				}
				return true;
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		removeEventListener: function(event, method) {
			try {
				if (arguments.length != 2) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var settings = $formElm.data(identifier).settings;
				var storage = $formElm.data(identifier).storage;
				if (storage.listeners[event]) {
					var index = $.inArray(method, storage.listeners[event]);
					if (index > -1) {
						storage.listeners[event].splice(index, 1);
						return true;
					}
					return false;
				}
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},

		formModified : function() {
			try {
				if (arguments.length != 0) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var storage = $formElm.data(identifier).storage;

				for (var prop in storage.properties) {
					if (storage.properties.hasOwnProperty(prop)) {
						if (storage.properties[prop].modified) return true;
					}
				}
				return false;
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		formValid : function() {
			try {
				if (arguments.length != 0) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var storage = $formElm.data(identifier).storage;

				for (var prop in storage.properties) {
					if (storage.properties.hasOwnProperty(prop)) {
						if (storage.properties[prop].tempValid === false) return false;
					}
				}
				return true;
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		properties: function() {
			try {
				if (arguments.length != 0) {
					throw RangeError(_const.errCodes.NUMOFARGS);
				}
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				var storage = $formElm.data(identifier).storage;
				return storage.properties;
			}
			catch(e) { log('error', e.name + ": " + e.message) }
		},
		update: function() {
			try {
				var $formElm = this;
				var formElm = this.get(0);
				var data = $formElm.data(identifier);
				if (!data) throw TypeError(_const.errCodes.NOTAUICFORM);
				updateProperties.call(formElm);
				return true;
			}
			catch(e) { log('error', e.name + ": " + e.message); return false }
		},
		init: function(options) {
			// separating the internal settings-file makes it accessable after merging the final settings
			// this is used for getting a list of event methods that is needed to create an listener-object in storage where for every event a listener array is created
			options = options || {};
			var internalDefaults = {
				ignoredElements: ['fieldset', 'button', 'input[type="button"]', 'input[type="image"]', 'input[type="reset"]', 'input[type="submit"]'],
				fixedElements: [],
				onFormInit: function() {},
				onFormSubmit: function() {},
				onInitDataLoad: function() {},
				onInitDataUnload: function() {},
				onDataLoad: function() {},
				onDataUnload: function() {},
				onPropertyInitValChange: function() {},
				onPropertyValChange: function() {},
				onPropertyModifiedStateChange: function() {},
				onPropertyValidStateChange: function() {},
				onFormModifiedStateChange: function() {},
				onFormValidStateChange: function() {},
				onResetFields: function() {},
				onClear: function() {},
				onWipe: function() {},
				dataTransformer: {}
			}
			var settings = $.extend(true, {}, internalDefaults, $.fn.uicForm3.defaults, options);
			return this.each(function() {
				var formElm = this;
				var $formElm = $(formElm);
				$formElm.addClass('uicForm');
				var data = $formElm.data(identifier);
				if (!data) {
					$formElm.data(identifier,{});
					$formElm.data(identifier).settings = settings;
					var storage = $formElm.data(identifier).storage = {
						initiated: false,
						formModified: false,
						formValid: true,
						properties: [],
						callEventListeners: function(event) {
							var retVal = true;
							if (event.indexOf('onProperty') > -1) {
								if ($.fn.uicForm3.debugFilter.length == 0) {
									if ($.inArray(_const.log.DEBUG, $.fn.uicForm3.log) > -1) log('debug', event + ': ', Array.prototype.slice.call(arguments, 1));
								}
								else {
									if ($.inArray(arguments[2], $.fn.uicForm3.debugFilter) > -1) {
										if ($.inArray(_const.log.DEBUG, $.fn.uicForm3.log) > -1) log('debug', event + ': ', Array.prototype.slice.call(arguments, 1));
									}
								}
							}
							else {
								if ($.inArray(_const.log.DEBUG, $.fn.uicForm3.log) > -1) log('debug', event + ': ', Array.prototype.slice.call(arguments, 1));
							}
							for (var i=0; i < storage.listeners[event].length; i++) {
								var r = storage.listeners[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
								if (r === false) { retVal = false }
							}
							return retVal;
						},
						listeners: {
						}
					};
					// create object with properties for every event as defined in internalDefaults
					for (var i in internalDefaults) {
						if (i.indexOf('on') == 0 && toClass.call(internalDefaults[i]) == '[object Function]') {
							storage.listeners[i] = [];
						}
					}
					// apply eventListeners from defaults
					for (var i in $.fn.uicForm3.defaults) {
						if (i.indexOf('on') == 0 && toClass.call($.fn.uicForm3.defaults[i]) == '[object Function]') {
							if (storage.listeners[i]) storage.listeners[i].push($.fn.uicForm3.defaults[i]);
						}
					}
					// apply eventListeners from options
					for (var i in options) {
						if (i.indexOf('on') == 0 && toClass.call(options[i]) == '[object Function]') {
							if (storage.listeners[i]) storage.listeners[i].push(options[i]);
						}
					}
					initElements.call(formElm);
					registerEvents.call(formElm);
					updateProperties.call(formElm);
					storage.initiated = true;
					storage.formModified = methods.formModified.call($formElm);
					storage.callEventListeners.call(formElm, 'onFormInit', storage.properties, storage.formModified);
				}
			});
		}
	};
	// public methods END

	// private methods START
	function initElements(tempForm) {
		var formElm = this;
		var $formElm = $(formElm);
		var settings = $formElm.data(identifier).settings;
		var storage = $formElm.data(identifier).storage;

		var form = tempForm || formElm;

		var ignoredElements = settings.ignoredElements.join(',');

		// this is for IE fix (IE <= 8) that does not provide a form.elements array like cool browsers do
		// so we have to transfere these elements to a new array before using them
		var formElmArr = [];
		for (var i = 0; i < form.elements.length; i++) {
			formElmArr.push(form.elements[i]);
		}

		var $elms = $(formElmArr).not(ignoredElements);

		// this makes sure that if no option is implicitly selected the first one is defaultselected as it is also selected by default
		$elms.filter(function() { return this.type.toLowerCase() == 'select-one' }).each(function() {
			if (this.selectedIndex != -1) { this.options[this.selectedIndex].defaultSelected = true; };
		});
	}
	function registerEvents() {
		var formElm = this;
		var $formElm = $(formElm);
		var settings = $formElm.data(identifier).settings;
		var storage = $formElm.data(identifier).storage;
		$formElm.on('submit', function(e) {
			e.preventDefault();
			storage.callEventListeners.call(formElm, 'onFormSubmit', $formElm.serialize(), methods.data.call($formElm), methods.modifiedData.call($formElm), e || null);
		});
		$formElm.on('change', 'input[type="radio"], input[type="checkbox"], select', function(e) {
			if (e.currentTarget.name && e.currentTarget.name != '') handleValueChanges.call(formElm, storage.properties[e.currentTarget.name], e, false);
		});
		$formElm.on('change input keyup', 'input[type!="radio"][type!="checkbox"], textarea', function(e) {
			if (e.currentTarget.name && e.currentTarget.name != '') handleValueChanges.call(formElm, storage.properties[e.currentTarget.name], e, false);
		});
//		$formElm.on('keypress keydown', 'input[type!="radio"][type!="checkbox"], textarea', function(e) {
//			console.log(e)
//			doKeyDown.call(formElm, storage.properties[e.currentTarget.name], e);
//			if (e.type == 'keydown' && e.which == 8) {
//
//				doKeyDown.call(formElm, storage.properties[e.currentTarget.name], e);
//			}
//		});
		$formElm.on('DOMSubtreeModified propertychange', function(e) {
			// DOMSubtreeModified for w3c compliant browsers
			// propertychange for ie < 9
			// seems to be buggy in some engines
			// webkit:
				// when changing initialValues programatically fires on every changed option, textarea, input[type=radio], input[type=checkbox]
				// when changing values programatically fires 25 x on input[type=date]
			// methods.update.call($formElm);
		});
		$formElm.on('DOMNodeInserted', function(e) {
			// log('debug', 'subTree inserted', e);
		});
		$formElm.on('DOMNodeRemoved', function(e) {
			// log('debug', 'subTree removed', e);
		});
	}
	function handleValueChanges(prop, e, suppressEvents) {
		if (prop) {
			var formElm = this;
			var $formElm = $(formElm);
			var settings = $formElm.data(identifier).settings;
			var storage = $formElm.data(identifier).storage;

			var initVal = methods.initVal.call($formElm, prop.name);
			var val = methods.val.call($formElm, prop.name);
			suppressEvents = suppressEvents || false;

			// this triggers whenever a property changed START
			if (!isEqual(initVal, prop.tempInitVal)) {
				if (suppressEvents == false) storage.callEventListeners.call(formElm, 'onPropertyInitValChange', prop.elements, prop.name, prop.tempInitVal, initVal, e || null);
				prop.tempInitVal = initVal;
			}
			if (!isEqual(val, prop.tempVal)) {
				if (suppressEvents == false) storage.callEventListeners.call(formElm, 'onPropertyValChange', prop.elements, prop.name, prop.tempVal, val, e || null);
				prop.tempVal = val;
			}
			// this triggers whenever a property changed END

			// this triggers only when changed state of a property changed START
			if (isEqual(initVal, val) && prop.modified == true) {
				storage.callEventListeners.call(formElm, 'onPropertyModifiedStateChange', prop.elements, prop.name, initVal, val, false, e || null);
				prop.modified = false;
			}
			else if (!isEqual(initVal, val) && prop.modified == false) {
				storage.callEventListeners.call(formElm, 'onPropertyModifiedStateChange', prop.elements, prop.name, initVal, val, true, e || null);
				prop.modified = true;
			}
			// this triggers only when changed state of a property changed END

			// this triggers only when changed state of the form changed START
			var computedFormChangeState = methods.formModified.call($formElm);
			if (!storage.formModified && computedFormChangeState) {
				storage.callEventListeners.call(formElm, 'onFormModifiedStateChange', true, e || null);
			}
			else if (storage.formModified && !computedFormChangeState) {
				storage.callEventListeners.call(formElm, 'onFormModifiedStateChange', false, e || null);
			}
			storage.formModified = computedFormChangeState;
			// this triggers only when changed state of the form changed END

			// this triggers only when valid state of a property changed START
			var currentValidState = !((toClass.call(prop.tempValObj) == '[object Object]' && prop.tempValObj !== null) && typeof prop.tempValObj.valid !== 'undefined' && prop.tempValObj.valid == false);
			if (currentValidState != prop.tempValid) {
				storage.callEventListeners.call(formElm, 'onPropertyValidStateChange', prop.elements, prop.name, currentValidState, prop.tempValObj || null);
				prop.tempValid = currentValidState;
			}
			// this triggers only when valid state of a property changed END

			// this triggers only when valid state of the form changed START
			var computedFormValidState = methods.formValid.call($formElm);
			if (!storage.formValid && computedFormValidState) {
				storage.callEventListeners.call(formElm, 'onFormValidStateChange', true, e || null);
			}
			else if (storage.formValid && !computedFormValidState) {
				storage.callEventListeners.call(formElm, 'onFormValidStateChange', false, e || null);
			}
			// this triggers only when valid state of the form changed END
			storage.formValid = computedFormValidState;
		}
		else {
			log('warning', 'The property associate with the formfield with name ' + e.target + ' is not registered in uicForm3. Maybe it was inserted into the DOM after initializing uicForm3. Please call „update“ method after DOM changes.');
		}
	}
	function updateProperties() {
		var formElm = this;
		var $formElm = $(formElm);
		var settings = $formElm.data(identifier).settings;
		var storage = $formElm.data(identifier).storage;
		storage.properties = [];

		var ignoredElements = settings.ignoredElements.join(',');

		// this is for IE fix (IE <= 8) that does not provide a form.elements array like cool browsers do
		// so we have to transfere these elements to a new array before using them
		var formElmArr = [];
		for (var i = 0; i < formElm.elements.length; i++) {
			formElmArr.push(formElm.elements[i]);
		}

		$elms = $(formElmArr).not(ignoredElements); // this could be only new elements when adding elements to the form

		var $fixedElements = $(settings.fixedElements.join(','));

		// add Properties to storage.properties START
		$elms.each(function() {
			if (this.name && this.name != '') {
				if (!storage.properties[this.name]) {
					storage.properties[this.name] = {
						name: this.name,
						elements: []
					}
				}
			}
		});

		$elms = $(formElmArr).not(ignoredElements); // this are all form's elements that are to be updated

//		this makes sure that if no option is implicitly selected the first one is defaultselected as it is also selected by default
		$elms.filter(function() { return this.type.toLowerCase() == 'select-one' }).each(function() {
			if (this.selectedIndex != -1) { this.options[this.selectedIndex].defaultSelected = true; };
		});

		for (var property in storage.properties) {
			if (storage.properties.hasOwnProperty(property)) {
				var prop = storage.properties[property];
				$elms.filter(function() { return this.name == prop.name }).each(function() {
					if (this.name && this.name != '') {
						prop.elements.push(this);
					}
				});
				if (prop.elements.length > 0) {
					prop.fixedElements = $fixedElements.filter(function() { return this.name == prop.name }).toArray();
					$(prop.fixedElements).attr('readonly','readonly');
					prop.$elms = $(prop.elements);
					prop.$radioButtons = prop.$elms.filter(function() { return this.type.toLowerCase() == 'radio' });
					prop.$checkBoxes = prop.$elms.filter(function() { return this.type.toLowerCase() == 'checkbox' });
					prop.$selectOnes = prop.$elms.filter(function() { return this.type.toLowerCase() == 'select-one' });
					prop.$selectMultiples = prop.$elms.filter(function() { return this.type.toLowerCase() == 'select-multiple' });
					prop.$others = prop.$elms.not(prop.$radioButtons).not(prop.$checkBoxes).not(prop.$selectOnes).not(prop.$selectMultiples);
					prop.length = prop.elements.length;
					prop.expectedValType = (((prop.length == 1 && prop.$selectMultiples.length == 0 ) || prop.length == prop.$radioButtons.length) && prop.name.lastIndexOf('[]') == -1) ? 'primitive' : 'complex';
					var initVal = methods.initVal.call($formElm, prop.name);
					var val = methods.val.call($formElm, prop.name);
					if (isEqual(initVal, val)) {
						prop.modified = false;
					}
					else {
						prop.modified = true;
					}
					if (typeof prop.valid === 'undefined') {
						prop.tempValid = true;
					}
					if (typeof prop.tempValObj === 'undefined') {
						prop.tempValObj = null;
					}
					prop.tempInitVal = initVal;
					prop.tempVal = val;
				}
				else {
					delete storage.properties[property];
				}
			}
		}
//		if (storage.initiated) storage.callEventListeners.call(formElm, 'onResetFields', storage.properties);
	}
	function setValue(initialValue, obj) {
		try {
			var formElm = this;
			var $formElm = $(formElm);
			var settings = $formElm.data(identifier).settings;
			var storage = $formElm.data(identifier).storage;

			initialValue = initialValue || false;

			obj = Array.prototype.slice.call(obj,0);

			var args = []; $.extend(true, args, obj);
			var key = args[0];
			var value = args[1];
			var suppressEvents = (args[2]) ? args[2] : false;
			var val = null;

			var prop = storage.properties[key];
			if (!prop) throw ReferenceError('No form elements are assigned to property "' + key + '".');

			if (toClass.call(value) == '[object Object]') {
				if (typeof value.value === 'undefined') {
					if (prop.expectedValType == 'primitive') {
						log('warning', 'The provided value object for property "' + key + '" does not have a value property. The property "' + key + '" is set to ""');
						val = '';
					}
					else {
						log('warning', 'The provided value object for property "' + key + '" does not have a value property. The property "' + key + '" is set to "[]"');
						val = [];
					}
				}
				else {
					val = value.value;
				}
				prop.tempValObj = value;
//				settings.onPropertyValidStateChange.call(formElm, prop.elements, prop.name, valObj.valid);
			}
			else {
				val = value;
				prop.tempValObj = null;
			}

			if (prop.expectedValType == 'primitive' && typeof val == 'object') throw TypeError('Expected primitive data type for property "' + key +'", complex data type (' + toClass.call(val) + ') given.');
			if (prop.expectedValType == 'complex' && typeof val != 'object') throw TypeError('Expected complex data type for property "' + key +'", primitive data type (' + toClass.call(val) + ') given.');

			if (prop.expectedValType == 'primitive') {
				var tempVal = val;
				var assigned = false;
				prop.$radioButtons.not(prop.fixedElements).each(function() {
					if (this.value == tempVal) {
						if (initialValue) this['defaultChecked'] = true;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = true;
						assigned = true;
					}
					else {
						if (initialValue) this['defaultChecked'] = false;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = false;
					}
				});

				prop.$checkBoxes.not(prop.fixedElements).each(function() {
					if (this.value == tempVal || ($.inArray(this.value, ['1', 'true', 'on']) > -1 && $.inArray(tempVal, [1, '1', true, 'on']) > -1)) {
						if (initialValue) this['defaultChecked'] = true;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = true;
						assigned = true;
					}
					else {
						if (initialValue) this['defaultChecked'] = false;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = false;
					}
				});

				prop.$selectOnes.not(prop.fixedElements).each(function() {
					for (var j = 0; j < this.options.length; j++) {
						if (this.options[j].value == tempVal) {
							if (initialValue) this.options[j]['defaultSelected'] = true;
							if (initialValue || !(this.readOnly || this.disabled)) this.options[j]['selected'] = true;
							assigned = true;
						}
						else {
							if (initialValue) this.options[j]['defaultSelected'] = false;
							if (initialValue || !(this.readOnly || this.disabled)) this.options[j]['selected'] = false;
						}
					}
					if (assigned == false ) {
						// if val cannot be assigned the select-box is set to the first entry.
						for (var j = 0; j < prop.$selectOnes.not(prop.fixedElements).get(0).options.length; j++)
						{
							if (j == 0) {
								if (initialValue) prop.$selectOnes.not(prop.fixedElements).get(0).options[j]['defaultSelected'] = true; // this sets the first option = selected, if no option element would be checked because this is the default behavior as recommended by the w3c
								if (initialValue || !(this.readOnly || this.disabled)) prop.$selectOnes.not(prop.fixedElements).get(0).options[j]['selected'] = true; // this sets the first option = selected, if no option element would be checkd because this is the default behavior as recommended by the w3c
							}
							else {
								if (initialValue) prop.$selectOnes.not(prop.fixedElements).get(0).options[j]['defaultSelected'] = false; // this sets the first option = selected, if no option element would be checked because this is the default behavior as recommended by the w3c
								if (initialValue || !(this.readOnly || this.disabled)) prop.$selectOnes.not(prop.fixedElements).get(0).options[j]['selected'] = false; // this sets the first option = selected, if no option element would be checkd because this is the default behavior as recommended by the w3c
							}
						}
						if (tempVal == '') {
							// if val is empty (i. e. when clearing the form) the val cannot be assigned (because one option must be selected)
							// in this case we don't want to throw an exception but give a warning that an empty val was provided
							assigned = true;
							log('info', 'An empty value was provided for select-one element "' + key + '". UicForm set the first option as selected.')
						}
					}
					// this is a safari fix forcing the browser to update the gui
					var tempStyle = this.style.visibility;
					this.style.visibility = 'visible';
					this.style.visibility = tempStyle;
				});
				prop.$others.not(prop.fixedElements).each(function() {
					var transformedTempVal = (prop.format) ? prop.format.call(prop, tempVal) : tempVal;
					if (initialValue) this['defaultValue'] = transformedTempVal;
					if (initialValue || !(this.readOnly || this.disabled)) this['value'] = transformedTempVal;
					assigned = true;
				});

//				if (tempVal == '') assigned = true;
			}
			else if (prop.expectedValType == 'complex') {
				var tempVal = val.slice(0); // tempVal will hold all remaining array values after assigning these values, best case would be an empty array after assignment
				var transformedTempVal = val.slice(0); // tempVal will hold all remaining array values after assigning these values, best case would be an empty array after assignment
				for (var i in tempVal) { tempVal[i] = tempVal[i].toString()} // convert the contents of tempVal-Array to string to be able to compare with values from DOM-Objects
				for (var i in transformedTempVal) { tempVal[i] = (prop.format) ? prop.format.call(prop, tempVal[i].toString()) : tempVal[i].toString()} // convert the contents of tempVal-Array to string to be able to compare with values from DOM-Objects
				var assignedValues = [];
				var assigned = false;
				var radioAssigned = 0;
				prop.$radioButtons.not(prop.fixedElements).each(function() {
					var idx = $.inArray(this.value, tempVal);
					if (idx > -1 && radioAssigned == 0) {
						if (initialValue) this['defaultChecked'] = true;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = true;
						assignedValues = assignedValues.concat(tempVal.splice(idx, 1));
						assigned = true;
					}
					else {
						if (initialValue) this['defaultChecked'] = false;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = false;
					}
					if (idx > -1) radioAssigned++;
				});
				if (radioAssigned > 1) log('warn', 'Too many values were provided for radioButton-Collection "' + prop.name + '"')

				prop.$checkBoxes.not(prop.fixedElements).each(function() {
					var idx = $.inArray(this.value, tempVal);
					if (idx > -1) {
						if (initialValue) this['defaultChecked'] = true;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = true;
						assignedValues = assignedValues.concat(tempVal.splice(idx, 1));
						assigned = true;
					}
					else {
						if (initialValue) this['defaultChecked'] = false;
						if (initialValue || !(this.readOnly || this.disabled)) this['checked'] = false;
					}
				});

				prop.$selectOnes.not(prop.fixedElements).each(function() {
					var optionAssigned = 0;
					$(this).find('option').each(function() {
						var idx = $.inArray(this.value, tempVal);
						if (idx > -1 && optionAssigned == 0) {
							if (initialValue) this['defaultSelected'] = true;
							if (initialValue || !(this.readOnly || this.disabled)) this['selected'] = true;
							assignedValues = assignedValues.concat(tempVal.splice(idx, 1));
							assigned = true;
						}
						else {
							if (initialValue) this['defaultSelected'] = false;
							if (initialValue || !(this.readOnly || this.disabled)) this['selected'] = false;
						}
						if (idx > -1) optionAssigned++;
					});

					if ($(this).find('option').length > 0 && optionAssigned == 0) {
						$(this).find('option').each(function(idx) {
							if (initialValue) this['defaultSelected'] = (idx == 0) ? true : false; // this sets the first radiobox = checked, if no radio box would be checked because this is the default behavior as recommended by the w3c
							if (initialValue || !(this.readOnly || this.disabled)) this['selected'] = (idx == 0) ? true : false; // this sets the first radiobox = checked, if no radio box would be checked because this is the default behavior as recommended by the w3c
						});
					}

					if (optionAssigned > 1) log('warn', 'Too many values were provided for select-Box "' + prop.name + '"')
					// this is a safari fix forcing the browser to update the gui
					var tempStyle = this.style.visibility;
					this.style.visibility = 'visible';
					this.style.visibility = tempStyle;
				});

				prop.$selectMultiples.not(prop.fixedElements).each(function() {
					$(this).find('option').each(function() {
						var idx = $.inArray(this.value, tempVal);
						if (idx > -1) {
							if (initialValue) this['defaultSelected'] = true;
							if (initialValue || !(this.readOnly || this.disabled)) this['selected'] = true;
							assignedValues = assignedValues.concat(tempVal.splice(idx, 1));
							assigned = true;
						}
						else {
							if (initialValue) this['defaultSelected'] = false;
							if (initialValue || !(this.readOnly || this.disabled)) this['selected'] = false;
						}
					});
					// this is a safari fix forcing the browser to update the gui
					var tempStyle = this.style.visibility;
					this.style.visibility = 'visible';
					this.style.visibility = tempStyle;
				});

				prop.$others.not(prop.fixedElements).each(function(idx) {
					if (tempVal.length > 0) {
						if (initialValue) this['defaultValue'] = transformedTempVal[0];
						if (initialValue || !(this.readOnly || this.disabled)) this['value'] = transformedTempVal[0];
						assignedValues = assignedValues.concat(tempVal.splice(0, 1));
						assigned = true;
					}
					else {
						if (initialValue) this['defaultValue'] = '';
						if (initialValue || !(this.readOnly || this.disabled)) this['value'] = '';
					}
				});
				if (tempVal.length > 0) log('warn', 'Some values (' + tempVal + ') of value collection for property "' + key +'" could not be assigned.');

				for (var i in assignedValues) { assignedValues[i] = convertType(assignedValues[i])} // reconvert all ArrayContents to appropriate data-types to compare with former values

				if (val.length == 0) assigned = true;
			}
			handleValueChanges.call(formElm, prop, null, suppressEvents);
			if (assigned == false) throw ReferenceError('Value (' + val + ') for property "' + key +'" could not be assigned.');
		}
		catch(e) { log('error', e.name + " : " + e.message) }
	}
	function getValue(initialValue, obj) {
		try {
			var formElm = this;
			var $formElm = $(formElm);
			var settings = $formElm.data(identifier).settings;
			var storage = $formElm.data(identifier).storage;

			initialValue = initialValue || false;

			var _val = (!initialValue) ? 'value' : 'defaultValue';
			var _ckd = (!initialValue) ? 'checked' : 'defaultChecked';
			var _sel = (!initialValue) ? 'selected' : 'defaultSelected';

			obj = Array.prototype.slice.call(obj,0);
			var args = []; $.extend(true, args, obj);
			var key = args[0];

			var prop = storage.properties[key];
			if (!prop) throw ReferenceError('No form elements are assigned to property "' + key + '".');

			//

			var vArr = [];

			prop.$radioButtons.each(function() {
				if (!this.disabled && this[_ckd]) { vArr.push(convertType(this.value)); }
			});
			prop.$checkBoxes.each(function() {
				var attr = $(this).attr('data-off-value');
				if (prop.length == 1 && typeof attr !== typeof undefined && attr !== false) {
					if (!this.disabled && this[_ckd]) {
						vArr.push(convertType(this.value));
					}
					else if (!this.disabled && !this[_ckd]) {
						vArr.push(convertType($(this).attr('data-off-value')));
					}
				}
				else {
					if (!this.disabled && this[_ckd]) { vArr.push(convertType(this.value)); }
				}
			});
			prop.$selectOnes.each(function() {
				if ((!this.disabled || initialValue)) {
					for (var j = 0; j < this.options.length; j++) {
						if (!this.disabled && this.options[j][_sel]) { vArr.push(convertType(this.options[j].value)); }
					}
				}
			});
			prop.$selectMultiples.each(function() {
				if ((!this.disabled || initialValue)) {
					for (var j = 0; j < this.options.length; j++) {
						if (!this.disabled && this.options[j][_sel]) { vArr.push(convertType(this.options[j].value)); }
					}
				}
			});
			prop.$others.each(function() {
				var val = (prop.unFormat) ? prop.unFormat.call(this, this[_val]) : this[_val];
				if (!this.disabled && this[_val] != '') { vArr.push(convertType(val)); }
			});

			var retVal = null;
			if (prop.expectedValType == 'primitive') {
				retVal = (vArr.length == 1) ? vArr[0] : vArr.join(','); // can vArr.length be greater than 1?
				if (retVal == '' && typeof prop.emptyValue != 'undefined') {
					retVal = prop.emptyValue;
				}
			}
			else {
				retVal = vArr;
				if (retVal.length == 0 && typeof prop.emptyValue != 'undefined') {
					retVal = prop.emptyValue;
				}
			}
			return retVal;
		}
		catch(e) { log('error', e.name + " : " + e.message) }
	}
	function getDataValue(data, elemName) {
		var arrSegments = elemName.split(/\]\[\]|\[\]|\]\[|\[|\]/g);
		if (arrSegments[arrSegments.length - 1] == '') {
			arrSegments.pop();
		}
		function loop(data) {
			var name = arrSegments.shift();
			if (arrSegments.length > 0) {
				if (typeof data[name] != 'undefined') {
					return loop(data[name]);
				}
			}
			else {
				return data[name];
			}
		}
		var res = loop(data);
		return res;
	}
	function setDataValue(data, elemName, val) {
		var arrSegments = elemName.split(/\]\[\]|\[\]|\]\[|\[|\]/g);
		if (arrSegments[arrSegments.length - 1] == '') {
			arrSegments.pop();
		}
		var counter = 0;
		function loop(data) {
			var name = arrSegments[counter];
			if (counter < arrSegments.length - 1) {
				if (typeof data[name] == 'undefined') {
					data[name] = (arrSegments[counter+1] && arrSegments[counter+1].match(/\d+/)) ? [] : {};
				}
				counter++;
				loop(data[name]);
			}
			else {
				data[name] = val;
			}
		}
		loop(data);
	}

	// Helper Methods START
	function convertType(val) {
		if ($.isNumeric(val)) {
			return parseFloat(val);
		}
		else if (val.toLowerCase() == 'true') {
			return true;
		}
		else if (val.toLowerCase() == 'false') {
			return false;
		}
		else {
			return val;
		}
	}
	function isEqual(a, b) {
		if (typeof a == 'object' && typeof b == 'object') {
			return !($(a).not(b).length > 0 || $(b).not(a).length > 0);
		}
		else {
			return a == b;
		}
	}
	var toClass = {}.toString; // this is for type-detection

	function log(level, subject) {
		try {
			if (window.console) {
				var args = Array.prototype.slice.call(arguments,1);
				if (level == _const.log.DEBUG && $.inArray(_const.log.DEBUG, $.fn.uicForm3.log) > -1) console[level].apply(console, args);
				else if (level == _const.log.INFO && $.inArray(_const.log.INFO, $.fn.uicForm3.log) > -1) console[level].apply(console, args);
				else if (level == _const.log.WARN && $.inArray(_const.log.WARN, $.fn.uicForm3.log) > -1) console[level].apply(console, args);
				else if (level == _const.log.ERROR && $.inArray(_const.log.ERROR, $.fn.uicForm3.log) > -1) console[level].apply(console, args);
				else if (level == _const.log.EVENT && $.inArray(_const.log.EVENT, $.fn.uicForm3.log) > -1) console[level].apply(console, args);
			}
		} catch(e) { }
	}
	// Helper Methods END
	// private methods END

	$.fn.uicForm3 = function(method,args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist.' );
		}
	};
})(jQuery, window);
$.fn.uicForm3.defaults = {};
$.fn.uicForm3.log = [];
$.fn.uicForm3.debugFilter = [];

