/**
 * jquery.uicform3 1.10.1
 * Release date: 2018-01-18
 */

!function(e,t,r){var i="uic_form3",a={log:{DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error",EVENT:"event"},errCodes:{NOTAUICFORM:'The form is not a "uicForm".',NUMOFARGS:"Number of arguments is out of range."}},s={populate:function(e,t){try{var r=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var n=this.data(i).storage;if(t){if(0==n.callEventListeners.call(r,"onInitDataUnload",s.initData.call(this),s.formModified.call(this)))return!1}else if(0==n.callEventListeners.call(r,"onDataUnload",s.data.call(this),s.formModified.call(this)))return!1;for(var o in n.properties)if(n.properties.hasOwnProperty(o)){var l=n.properties[o];try{var c=h.call(r,e,l.name);if(void 0===c||null==c)throw t&&s.initVal.call(this,l.name,"primitive"==l.expectedValType?"":[]),new ReferenceError('The data model for the form does not provide a value for the property with name "'+l.name+'"');t?s.initVal.call(this,l.name,c):s.val.call(this,l.name,c)}catch(e){m("error",e.name+": "+e.message)}}return t?n.callEventListeners.call(r,"onInitDataLoad",s.initData.call(this),s.formModified.call(this)):n.callEventListeners.call(r,"onDataLoad",s.data.call(this),s.formModified.call(this)),!0}catch(e){m("error",e.name+": "+e.message)}},populateRecord:function(e){try{if(1!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);return s.populate.call(this,e,!0)}catch(e){m("error",e.name+": "+e.message)}},populateData:function(e){try{if(1!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);return s.populate.call(this,e,!1)}catch(e){m("error",e.name+": "+e.message)}},initData:function(){try{var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var t=this.data(i).storage;switch(arguments.length){case 0:var r={};for(var n in t.properties)if(t.properties.hasOwnProperty(n)){t.properties[n].$elms.filter(function(e){return!e.disabled}).length>0&&d.call(e,r,t.properties[n].name,s.initVal.call(this,t.properties[n].name))}return r;case 1:return s.populate.call(this,arguments[0],!0);default:throw RangeError(a.errCodes.NUMOFARGS)}}catch(e){m("error",e.name+": "+e.message)}},data:function(){try{var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var t=this.data(i).storage;switch(arguments.length){case 0:var r={};for(var n in t.properties)if(t.properties.hasOwnProperty(n)){t.properties[n].$elms.filter(function(e){return!e.disabled}).length>0&&d.call(e,r,t.properties[n].name,s.val.call(this,t.properties[n].name))}return r;case 1:return s.populate.call(this,arguments[0],!1);default:throw RangeError(a.errCodes.NUMOFARGS)}}catch(e){m("error",e.name+": "+e.message)}},modifiedData:function(){try{var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var t=this.data(i).storage;switch(arguments.length){case 0:var r={};for(var n in t.properties)if(t.properties.hasOwnProperty(n)){var o=t.properties[n].$elms.filter(function(e){return!e.disabled}),l=s.val.call(this,t.properties[n].name);f(s.initVal.call(this,t.properties[n].name),l)||o.length>0&&d.call(e,r,t.properties[n].name,l)}return r;default:throw RangeError(a.errCodes.NUMOFARGS)}}catch(e){m("error",e.name+": "+e.message)}},initVal:function(){try{var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);switch(arguments.length){case 1:return c.call(e,!0,arguments);case 2:case 3:return l.call(e,!0,arguments),this;default:throw RangeError(a.errCodes.NUMOFARGS)}}catch(e){m("error",e.name+": "+e.message)}},val:function(){try{var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);switch(arguments.length){case 1:return c.call(e,!1,arguments);case 2:case 3:return l.call(e,!1,arguments),this;default:throw RangeError(a.errCodes.NUMOFARGS)}}catch(e){m("error",e.name+": "+e.message)}},emptyVal:function(){try{this.get(0);var e=this.data(i);if(!e)throw TypeError(a.errCodes.NOTAUICFORM);switch(arguments.length){case 1:return void 0!==e.storage.properties[arguments[0]].emptyValue?e.storage.properties[arguments[0]].emptyValue:"primitive"==e.storage.properties[arguments[0]].expectedValType?"":[];case 2:if("object"==typeof arguments[0])for(var t=0;t<arguments[0].length;t++)e.storage.properties[arguments[0][t]].emptyValue=arguments[1];else e.storage.properties[arguments[0]].emptyValue=arguments[1];return this;default:throw RangeError(a.errCodes.NUMOFARGS)}}catch(e){m("error",e.name+": "+e.message)}},clear:function(){try{if(0!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var t=this.data(i).storage,r={};for(var n in t.properties)if(t.properties.hasOwnProperty(n)){t.properties[n].$elms.filter(function(e){return!e.disabled}).length>0&&d.call(e,r,t.properties[n].name,"primitive"==t.properties[n].expectedValType?"":[])}s.populate.call(this,r,!0),t.callEventListeners.call(e,"onClear")}catch(e){m("error",e.name+": "+e.message)}},wipe:function(){try{if(0!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var t=this.data(i).storage,r={};for(var n in t.properties)if(t.properties.hasOwnProperty(n)){var o=t.properties[n];if(o.$elms.filter(function(e){return!e.disabled}).length>0){var l=null;"primitive"==o.expectedValType?"[object Object]"==u.call(o.tempValObj)&&null!==o.tempValObj?(o.tempValObj.value="",l=o.tempValObj):l="":null!==o.tempValObj?(o.tempValObj.value=[],l=o.tempValObj):l=[],d.call(e,r,o.name,l)}}s.populate.call(this,r,!1),t.callEventListeners.call(e,"onWipe")}catch(e){m("error",e.name+": "+e.message)}},resetFields:function(){try{if(0!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var t=this.data(i).storage;s.data.call(this,s.initData.call(this)),t.callEventListeners.call(e,"onResetFields")}catch(e){m("error",e.name+": "+e.message)}},addEventListener:function(e,t){try{if(2!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var r=this.data(i).storage;return r.listeners[e]&&r.listeners[e].push(t),!0}catch(e){m("error",e.name+": "+e.message)}},removeEventListener:function(t,r){try{if(2!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);this.data(i).settings;var s=this.data(i).storage;if(s.listeners[t]){var n=e.inArray(r,s.listeners[t]);return n>-1&&(s.listeners[t].splice(n,1),!0)}}catch(e){m("error",e.name+": "+e.message)}},formModified:function(){try{if(0!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);var e=this.data(i).storage;for(var t in e.properties)if(e.properties.hasOwnProperty(t)&&e.properties[t].modified)return!0;return!1}catch(e){m("error",e.name+": "+e.message)}},formValid:function(){try{if(0!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);var e=this.data(i).storage;for(var t in e.properties)if(e.properties.hasOwnProperty(t)&&!1===e.properties[t].tempValid)return!1;return!0}catch(e){m("error",e.name+": "+e.message)}},properties:function(){try{if(0!=arguments.length)throw RangeError(a.errCodes.NUMOFARGS);this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);return this.data(i).storage.properties}catch(e){m("error",e.name+": "+e.message)}},update:function(){try{var e=this.get(0);if(!this.data(i))throw TypeError(a.errCodes.NOTAUICFORM);return o.call(e),!0}catch(e){return m("error",e.name+": "+e.message),!1}},init:function(t){t=t||{};var r={ignoredElements:["fieldset","button",'input[type="button"]','input[type="image"]','input[type="reset"]','input[type="submit"]'],fixedElements:[],onFormInit:function(){},onFormSubmit:function(){},onInitDataLoad:function(){},onInitDataUnload:function(){},onDataLoad:function(){},onDataUnload:function(){},onPropertyInitValChange:function(){},onPropertyValChange:function(){},onPropertyModifiedStateChange:function(){},onPropertyValidStateChange:function(){},onFormModifiedStateChange:function(){},onFormValidStateChange:function(){},onResetFields:function(){},onClear:function(){},onWipe:function(){},dataTransformer:{}},l=e.extend(!0,{},r,e.fn.uicForm3.defaults,t);return this.each(function(){var c=e(this);c.addClass("uicForm");if(!c.data(i)){c.data(i,{}),c.data(i).settings=l;var h=c.data(i).storage={initiated:!1,formModified:!1,formValid:!0,properties:[],callEventListeners:function(t){var r=!0;t.indexOf("onProperty")>-1?0==e.fn.uicForm3.debugFilter.length?e.inArray(a.log.DEBUG,e.fn.uicForm3.log)>-1&&m("debug",t+": ",Array.prototype.slice.call(arguments,1)):e.inArray(arguments[2],e.fn.uicForm3.debugFilter)>-1&&e.inArray(a.log.DEBUG,e.fn.uicForm3.log)>-1&&m("debug",t+": ",Array.prototype.slice.call(arguments,1)):e.inArray(a.log.DEBUG,e.fn.uicForm3.log)>-1&&m("debug",t+": ",Array.prototype.slice.call(arguments,1));for(var i=0;i<h.listeners[t].length;i++){!1===h.listeners[t][i].apply(this,Array.prototype.slice.call(arguments,1))&&(r=!1)}return r},listeners:{}};for(var d in r)0==d.indexOf("on")&&"[object Function]"==u.call(r[d])&&(h.listeners[d]=[]);for(var d in e.fn.uicForm3.defaults)0==d.indexOf("on")&&"[object Function]"==u.call(e.fn.uicForm3.defaults[d])&&h.listeners[d]&&h.listeners[d].push(e.fn.uicForm3.defaults[d]);for(var d in t)0==d.indexOf("on")&&"[object Function]"==u.call(t[d])&&h.listeners[d]&&h.listeners[d].push(t[d]);(function(t){for(var r=e(this),a=r.data(i).settings,s=(r.data(i).storage,t||this),n=a.ignoredElements.join(","),o=[],l=0;l<s.elements.length;l++)o.push(s.elements[l]);var c=e(o).not(n);c.filter(function(){return"select-one"==this.type.toLowerCase()}).each(function(){-1!=this.selectedIndex&&(this.options[this.selectedIndex].defaultSelected=!0)}),c.filter(function(){return"range"==this.type.toLowerCase()}).each(function(){""===this.defaultValue&&(this.defaultValue=50)})}).call(this),function(){var t=this,r=e(t),a=(r.data(i).settings,r.data(i).storage);r.on("submit",function(e){e.preventDefault(),a.callEventListeners.call(t,"onFormSubmit",r.serialize(),s.data.call(r),s.modifiedData.call(r),e||null)}),r.on("change",'input[type="radio"], input[type="checkbox"], select',function(e){e.currentTarget.name&&""!=e.currentTarget.name&&n.call(t,a.properties[e.currentTarget.name],e,!1)}),r.on("change input keyup",'input[type!="radio"][type!="checkbox"], textarea',function(e){e.currentTarget.name&&""!=e.currentTarget.name&&n.call(t,a.properties[e.currentTarget.name],e,!1)})}.call(this),o.call(this),h.initiated=!0,h.formModified=s.formModified.call(c),h.callEventListeners.call(this,"onFormInit",h.properties,h.formModified)}})}};function n(t,r,a){if(t){var n=e(this),o=(n.data(i).settings,n.data(i).storage),l=s.initVal.call(n,t.name),c=s.val.call(n,t.name);a=a||!1,f(l,t.tempInitVal)||(0==a&&o.callEventListeners.call(this,"onPropertyInitValChange",t.elements,t.name,t.tempInitVal,l,r||null),t.tempInitVal=l),f(c,t.tempVal)||(0==a&&o.callEventListeners.call(this,"onPropertyValChange",t.elements,t.name,t.tempVal,c,r||null),t.tempVal=c),f(l,c)&&1==t.modified?(o.callEventListeners.call(this,"onPropertyModifiedStateChange",t.elements,t.name,l,c,!1,r||null),t.modified=!1):f(l,c)||0!=t.modified||(o.callEventListeners.call(this,"onPropertyModifiedStateChange",t.elements,t.name,l,c,!0,r||null),t.modified=!0);var h=s.formModified.call(n);!o.formModified&&h?o.callEventListeners.call(this,"onFormModifiedStateChange",!0,r||null):o.formModified&&!h&&o.callEventListeners.call(this,"onFormModifiedStateChange",!1,r||null),o.formModified=h;var d=!("[object Object]"==u.call(t.tempValObj)&&null!==t.tempValObj&&void 0!==t.tempValObj.valid&&0==t.tempValObj.valid);d!=t.tempValid&&(o.callEventListeners.call(this,"onPropertyValidStateChange",t.elements,t.name,d,t.tempValObj||null),t.tempValid=d);var p=s.formValid.call(n);!o.formValid&&p?o.callEventListeners.call(this,"onFormValidStateChange",!0,r||null):o.formValid&&!p&&o.callEventListeners.call(this,"onFormValidStateChange",!1,r||null),o.formValid=p}else m("warning","The property associate with the formfield with name "+r.target+" is not registered in uicForm3. Maybe it was inserted into the DOM after initializing uicForm3. Please call „update“ method after DOM changes.")}function o(){var t=e(this),r=t.data(i).settings,a=t.data(i).storage;a.properties=[];for(var n=r.ignoredElements.join(","),o=[],l=0;l<this.elements.length;l++)o.push(this.elements[l]);$elms=e(o).not(n);var c=e(r.fixedElements.join(","));$elms.each(function(){this.name&&""!=this.name&&(a.properties[this.name]||(a.properties[this.name]={name:this.name,elements:[]}))}),$elms=e(o).not(n),$elms.filter(function(){return"select-one"==this.type.toLowerCase()}).each(function(){-1!=this.selectedIndex&&(this.options[this.selectedIndex].defaultSelected=!0)});for(var h in a.properties)if(a.properties.hasOwnProperty(h)){var d=a.properties[h];if($elms.filter(function(){return this.name==d.name}).each(function(){this.name&&""!=this.name&&d.elements.push(this)}),d.elements.length>0){d.fixedElements=c.filter(function(){return this.name==d.name}).toArray(),e(d.fixedElements).attr("readonly","readonly"),d.$elms=e(d.elements),d.$radioButtons=d.$elms.filter(function(){return"radio"==this.type.toLowerCase()}),d.$checkBoxes=d.$elms.filter(function(){return"checkbox"==this.type.toLowerCase()}),d.$selectOnes=d.$elms.filter(function(){return"select-one"==this.type.toLowerCase()}),d.$selectMultiples=d.$elms.filter(function(){return"select-multiple"==this.type.toLowerCase()}),d.$others=d.$elms.not(d.$radioButtons).not(d.$checkBoxes).not(d.$selectOnes).not(d.$selectMultiples),d.length=d.elements.length,d.expectedValType=(1==d.length&&0==d.$selectMultiples.length||2==d.length&&"hidden"===d.$elms[0].type.toLowerCase()&&"checkbox"===d.$elms[1].type.toLowerCase()||d.length==d.$radioButtons.length)&&-1==d.name.lastIndexOf("[]")?"primitive":"complex";var p=s.initVal.call(t,d.name),u=s.val.call(t,d.name);f(p,u)?d.modified=!1:d.modified=!0,void 0===d.valid&&(d.tempValid=!0),void 0===d.tempValObj&&(d.tempValObj=null),d.tempInitVal=p,d.tempVal=u}else delete a.properties[h]}}function l(t,r){try{var a=e(this),s=(a.data(i).settings,a.data(i).storage);t=t||!1,r=Array.prototype.slice.call(r,0);var o=[];e.extend(!0,o,r);var l=o[0],c=o[1],h=!!o[2]&&o[2],d=null,f=s.properties[l];if(!f)throw ReferenceError('No form elements are assigned to property "'+l+'".');if("[object Object]"==u.call(c)?(void 0===c.value?"primitive"==f.expectedValType?(m("warning",'The provided value object for property "'+l+'" does not have a value property. The property "'+l+'" is set to ""'),d=""):(m("warning",'The provided value object for property "'+l+'" does not have a value property. The property "'+l+'" is set to "[]"'),d=[]):d=c.value,f.tempValObj=c):(d=c,f.tempValObj=null),"primitive"==f.expectedValType&&"object"==typeof d)throw TypeError('Expected primitive data type for property "'+l+'", complex data type ('+u.call(d)+") given.");if("complex"==f.expectedValType&&"object"!=typeof d)throw TypeError('Expected complex data type for property "'+l+'", primitive data type ('+u.call(d)+") given.");if("primitive"==f.expectedValType){var g=d,y=!1;f.$radioButtons.not(f.fixedElements).each(function(){this.value==g?(t&&(this.defaultChecked=!0),(t||!this.readOnly&&!this.disabled)&&(this.checked=!0),y=!0):(t&&(this.defaultChecked=!1),(t||!this.readOnly&&!this.disabled)&&(this.checked=!1))}),f.$checkBoxes.not(f.fixedElements).each(function(){this.value==g||e.inArray(this.value,["1","true","on"])>-1&&e.inArray(g,[1,"1",!0,"on"])>-1?(t&&(this.defaultChecked=!0),(t||!this.readOnly&&!this.disabled)&&(this.checked=!0),y=!0):(t&&(this.defaultChecked=!1),(t||!this.readOnly&&!this.disabled)&&(this.checked=!1))}),f.$selectOnes.not(f.fixedElements).each(function(){for(var e=0;e<this.options.length;e++)this.options[e].value==g?(t&&(this.options[e].defaultSelected=!0),(t||!this.readOnly&&!this.disabled)&&(this.options[e].selected=!0),y=!0):(t&&(this.options[e].defaultSelected=!1),(t||!this.readOnly&&!this.disabled)&&(this.options[e].selected=!1));if(0==y){for(e=0;e<f.$selectOnes.not(f.fixedElements).get(0).options.length;e++)0==e?(t&&(f.$selectOnes.not(f.fixedElements).get(0).options[e].defaultSelected=!0),(t||!this.readOnly&&!this.disabled)&&(f.$selectOnes.not(f.fixedElements).get(0).options[e].selected=!0)):(t&&(f.$selectOnes.not(f.fixedElements).get(0).options[e].defaultSelected=!1),(t||!this.readOnly&&!this.disabled)&&(f.$selectOnes.not(f.fixedElements).get(0).options[e].selected=!1));""==g&&(y=!0,m("info",'An empty value was provided for select-one element "'+l+'". UicForm set the first option as selected.'))}var r=this.style.visibility;this.style.visibility="visible",this.style.visibility=r}),f.$others.not(f.fixedElements).each(function(){var e=f.format?f.format.call(f,g):g;t&&(this.defaultValue=e),(t||!this.readOnly&&!this.disabled)&&(this.value=e),y=!0})}else if("complex"==f.expectedValType){g=d.slice(0);var v=d.slice(0);for(var O in g)g[O]=g[O].toString();for(var O in v)g[O]=f.format?f.format.call(f,g[O].toString()):g[O].toString();var b=[],E=(y=!1,0);f.$radioButtons.not(f.fixedElements).each(function(){var r=e.inArray(this.value,g);r>-1&&0==E?(t&&(this.defaultChecked=!0),(t||!this.readOnly&&!this.disabled)&&(this.checked=!0),b=b.concat(g.splice(r,1)),y=!0):(t&&(this.defaultChecked=!1),(t||!this.readOnly&&!this.disabled)&&(this.checked=!1)),r>-1&&E++}),E>1&&m("warn",'Too many values were provided for radioButton-Collection "'+f.name+'"'),f.$checkBoxes.not(f.fixedElements).each(function(){var r=e.inArray(this.value,g);r>-1?(t&&(this.defaultChecked=!0),(t||!this.readOnly&&!this.disabled)&&(this.checked=!0),b=b.concat(g.splice(r,1)),y=!0):(t&&(this.defaultChecked=!1),(t||!this.readOnly&&!this.disabled)&&(this.checked=!1))}),f.$selectOnes.not(f.fixedElements).each(function(){var r=0;e(this).find("option").each(function(){var i=e.inArray(this.value,g);i>-1&&0==r?(t&&(this.defaultSelected=!0),(t||!this.readOnly&&!this.disabled)&&(this.selected=!0),b=b.concat(g.splice(i,1)),y=!0):(t&&(this.defaultSelected=!1),(t||!this.readOnly&&!this.disabled)&&(this.selected=!1)),i>-1&&r++}),e(this).find("option").length>0&&0==r&&e(this).find("option").each(function(e){t&&(this.defaultSelected=0==e),(t||!this.readOnly&&!this.disabled)&&(this.selected=0==e)}),r>1&&m("warn",'Too many values were provided for select-Box "'+f.name+'"');var i=this.style.visibility;this.style.visibility="visible",this.style.visibility=i}),f.$selectMultiples.not(f.fixedElements).each(function(){e(this).find("option").each(function(){var r=e.inArray(this.value,g);r>-1?(t&&(this.defaultSelected=!0),(t||!this.readOnly&&!this.disabled)&&(this.selected=!0),b=b.concat(g.splice(r,1)),y=!0):(t&&(this.defaultSelected=!1),(t||!this.readOnly&&!this.disabled)&&(this.selected=!1))});var r=this.style.visibility;this.style.visibility="visible",this.style.visibility=r}),f.$others.not(f.fixedElements).each(function(e){g.length>0?(t&&(this.defaultValue=v[0]),(t||!this.readOnly&&!this.disabled)&&(this.value=v[0]),b=b.concat(g.splice(0,1)),y=!0):(t&&(this.defaultValue=""),(t||!this.readOnly&&!this.disabled)&&(this.value=""))}),g.length>0&&m("warn","Some values ("+g+') of value collection for property "'+l+'" could not be assigned.');for(var O in b)b[O]=p(b[O]);0==d.length&&(y=!0)}if(n.call(this,f,null,h),0==y)throw ReferenceError("Value ("+d+') for property "'+l+'" could not be assigned.')}catch(e){m("error",e.name+" : "+e.message)}}function c(t,a){try{var s=e(this),n=(s.data(i).settings,s.data(i).storage),o=(t=t||!1)?"defaultValue":"value",l=t?"defaultChecked":"checked",c=t?"defaultSelected":"selected";a=Array.prototype.slice.call(a,0);var h=[];e.extend(!0,h,a);var d=h[0],f=n.properties[d];if(!f)throw ReferenceError('No form elements are assigned to property "'+d+'".');var u=[];f.$radioButtons.each(function(){!this.disabled&&this[l]&&u.push(p(this.value))}),f.$checkBoxes.each(function(){var t=e(this).attr("data-off-value");1==f.length&&typeof t!=typeof r&&!1!==t?!this.disabled&&this[l]?u.push(p(this.value)):this.disabled||this[l]||u.push(p(e(this).attr("data-off-value"))):!this.disabled&&this[l]&&u.push(p(this.value))}),f.$selectOnes.each(function(){if(!this.disabled||t)for(var e=0;e<this.options.length;e++)!this.disabled&&this.options[e][c]&&u.push(p(this.options[e].value))}),f.$selectMultiples.each(function(){if(!this.disabled||t)for(var e=0;e<this.options.length;e++)!this.disabled&&this.options[e][c]&&u.push(p(this.options[e].value))}),f.$others.each(function(){var e=f.unFormat?f.unFormat.call(this,this[o]):this[o];this.disabled||""==this[o]||u.push(p(e))});var g=null;return"primitive"==f.expectedValType?""==(g=1==u.length?u[0]:u.join(","))&&void 0!==f.emptyValue&&(g=f.emptyValue):0==(g=u).length&&void 0!==f.emptyValue&&(g=f.emptyValue),g}catch(e){m("error",e.name+" : "+e.message)}}function h(e,t){var r=t.split(/\]\[\]|\[\]|\]\[|\[|\]/g);""==r[r.length-1]&&r.pop();return function e(t){var i=r.shift();return r.length>0?void 0!==t[i]?e(t[i]):void 0:t[i]}(e)}function d(e,t,r){var i=t.split(/\]\[\]|\[\]|\]\[|\[|\]/g);""==i[i.length-1]&&i.pop();var a=0;!function e(t){var s=i[a];a<i.length-1?(void 0===t[s]&&(t[s]=i[a+1]&&i[a+1].match(/\d+/)?[]:{}),a++,e(t[s])):t[s]=r}(e)}function p(t){return e.isNumeric(t)?parseFloat(t):"true"==t.toLowerCase()||"false"!=t.toLowerCase()&&t}function f(t,r){return"object"==typeof t&&"object"==typeof r?!(e(t).not(r).length>0||e(r).not(t).length>0):t==r}var u={}.toString;function m(r,i){try{if(t.console){var s=Array.prototype.slice.call(arguments,1);r==a.log.DEBUG&&e.inArray(a.log.DEBUG,e.fn.uicForm3.log)>-1?console[r].apply(console,s):r==a.log.INFO&&e.inArray(a.log.INFO,e.fn.uicForm3.log)>-1?console[r].apply(console,s):r==a.log.WARN&&e.inArray(a.log.WARN,e.fn.uicForm3.log)>-1?console[r].apply(console,s):r==a.log.ERROR&&e.inArray(a.log.ERROR,e.fn.uicForm3.log)>-1?console[r].apply(console,s):r==a.log.EVENT&&e.inArray(a.log.EVENT,e.fn.uicForm3.log)>-1&&console[r].apply(console,s)}}catch(e){}}e.fn.uicForm3=function(t,r){return s[t]?s[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist."):s.init.apply(this,arguments)}}(jQuery,window),$.fn.uicForm3.defaults={},$.fn.uicForm3.log=[],$.fn.uicForm3.debugFilter=[];