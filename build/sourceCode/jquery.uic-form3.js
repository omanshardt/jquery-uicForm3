// Version 1.0.4 22.02.2015
!function(a,b,c){function d(b){for(var c=this,d=a(c),e=d.data(o).settings,f=(d.data(o).storage,b||c),g=e.ignoredElements.join(","),h=[],i=0;i<f.elements.length;i++)h.push(f.elements[i]);var j=a(h).not(g);j.filter(function(){return"select-one"==this.type.toLowerCase()}).each(function(){-1!=this.selectedIndex&&(this.options[this.selectedIndex].defaultSelected=!0)})}function e(){var b=this,c=a(b),d=(c.data(o).settings,c.data(o).storage);c.on("submit",function(a){a.preventDefault(),d.callEventListeners.call(b,"onFormSubmit",c.serialize(),q.data.call(c),q.modifiedData.call(c),a||null)}),c.on("change",'input[type="radio"], input[type="checkbox"], select',function(a){f.call(b,d.properties[a.currentTarget.name],a,!1)}),c.on("change input keyup",'input[type!="radio"][type!="checkbox"], textarea',function(a){f.call(b,d.properties[a.currentTarget.name],a,!1)}),c.on("DOMSubtreeModified propertychange",function(){}),c.on("DOMNodeInserted",function(){}),c.on("DOMNodeRemoved",function(){})}function f(b,c,d){var e=this,f=a(e),g=(f.data(o).settings,f.data(o).storage),h=q.initVal.call(f,b.name),i=q.val.call(f,b.name);m(h,b.tempInitVal)||(g.callEventListeners.call(e,"onPropertyInitValChange",b.elements,b.name,b.tempInitVal,h,c||null),b.tempInitVal=h),m(i,b.tempVal)||(g.callEventListeners.call(e,"onPropertyValChange",b.elements,b.name,b.tempVal,i,c||null),b.tempVal=i),m(h,i)&&1==b.modified?(g.callEventListeners.call(e,"onPropertyModifiedStateChange",b.elements,b.name,h,i,!1,c||null),b.modified=!1):m(h,i)||0!=b.modified||(g.callEventListeners.call(e,"onPropertyModifiedStateChange",b.elements,b.name,h,i,!0,c||null),b.modified=!0);var j=q.formModified.call(f);!g.formModified&&j?g.callEventListeners.call(e,"onFormModifiedStateChange",!0,c||null):g.formModified&&!j&&g.callEventListeners.call(e,"onFormModifiedStateChange",!1,c||null),g.formModified=j;var k=!0;k="[object Object]"==r.call(b.tempValObj)&&null!==b.tempValObj&&"boolean"==typeof b.tempValObj.valid?b.tempValObj.valid:d?!0:b.tempValid,k!=b.tempValid&&(g.callEventListeners.call(e,"onPropertyValidStateChange",b.elements,b.name,k,b.tempValObj||null),b.tempValid=k);var l=q.formValid.call(f);!g.formValid&&l?g.callEventListeners.call(e,"onFormValidStateChange",!0,c||null):g.formValid&&!l&&g.callEventListeners.call(e,"onFormValidStateChange",!1,c||null),g.formValid=l}function g(){for(var b=this,c=a(b),d=c.data(o).settings,e=c.data(o).storage,f=d.ignoredElements.join(","),g=[],h=0;h<b.elements.length;h++)g.push(b.elements[h]);$elms=a(g).not(f);var i=a(d.fixedElements.join(","));$elms.each(function(){this.name&&""!=this.name&&(e.properties[this.name]||(e.properties[this.name]={name:this.name,elements:[]}))}),$elms=a(g).not(f);for(var j in e.properties){var k=e.properties[j];if($elms.filter(function(){return this.name==k.name}).each(function(){this.name&&""!=this.name&&k.elements.push(this)}),k.elements.length>0){k.fixedElements=i.filter(function(){return this.name==k.name}).toArray(),a(k.fixedElements).attr("readonly","readonly"),k.$elms=a(k.elements),k.$radioButtons=k.$elms.filter(function(){return"radio"==this.type.toLowerCase()}),k.$checkBoxes=k.$elms.filter(function(){return"checkbox"==this.type.toLowerCase()}),k.$selectOnes=k.$elms.filter(function(){return"select-one"==this.type.toLowerCase()}),k.$selectMultiples=k.$elms.filter(function(){return"select-multiple"==this.type.toLowerCase()}),k.$others=k.$elms.not(k.$radioButtons).not(k.$checkBoxes).not(k.$selectOnes).not(k.$selectMultiples),k.length=k.elements.length,k.expectedValType=(1==k.length&&0==k.$selectMultiples.size()||k.length==k.$radioButtons.size())&&-1==k.name.lastIndexOf("[]")?"primitive":"complex";var l=q.initVal.call(c,k.name),n=q.val.call(c,k.name);k.modified=m(l,n)?!1:!0,"undefined"==typeof k.valid&&(k.tempValid=!0),"undefined"==typeof k.tempValObj&&(k.tempValObj=null),k.tempInitVal=l,k.tempVal=n}else delete e.properties[j]}}function h(b,c){try{var d=this,e=a(d),g=(e.data(o).settings,e.data(o).storage);b=b||!1,c=Array.prototype.slice.call(c,0);var h=[];a.extend(!0,h,c);var i=h[0],j=h[1],k=null,m=g.properties[i];if(!m)throw ReferenceError('No form elements are assigned to property "'+i+'".');if("[object Object]"==r.call(j)?("undefined"==typeof j.value?"primitive"==m.expectedValType?(n("warning",'The provided value object for property "'+i+'" does not have a value property. The property "'+i+'" is set to ""'),k=""):(n("warning",'The provided value object for property "'+i+'" does not have a value property. The property "'+i+'" is set to "[]"'),k=[]):k=j.value,m.tempValObj=j):(k=j,m.tempValObj=null),"primitive"==m.expectedValType&&"object"==typeof k)throw TypeError('Expected primitive data type for property "'+i+'", complex data type ('+r.call(k)+") given.");if("complex"==m.expectedValType&&"object"!=typeof k)throw TypeError('Expected complex data type for property "'+i+'", primitive data type ('+r.call(k)+") given.");if("primitive"==m.expectedValType){var p=k,q=!1;m.$radioButtons.not(m.fixedElements).each(function(){this.value==p?(b&&(this.defaultChecked=!0),(b||!this.readOnly&&!this.disabled)&&(this.checked=!0),q=!0):(b&&(this.defaultChecked=!1),(b||!this.readOnly&&!this.disabled)&&(this.checked=!1))}),m.$checkBoxes.not(m.fixedElements).each(function(){this.value==p||a.inArray(this.value,["1","true","on"])>-1&&a.inArray(p,[1,"1",!0,"on"])>-1?(b&&(this.defaultChecked=!0),(b||!this.readOnly&&!this.disabled)&&(this.checked=!0),q=!0):(b&&(this.defaultChecked=!1),(b||!this.readOnly&&!this.disabled)&&(this.checked=!1))}),m.$selectOnes.not(m.fixedElements).each(function(){for(var a=0;a<this.options.length;a++)this.options[a].value==p?(b&&(this.options[a].defaultSelected=!0),(b||!this.readOnly&&!this.disabled)&&(this.options[a].selected=!0),q=!0):(b&&(this.options[a].defaultSelected=!1),(b||!this.readOnly&&!this.disabled)&&(this.options[a].selected=!1));if(0==q){for(var a=0;a<m.$selectOnes.not(m.fixedElements).get(0).options.length;a++)0==a?(b&&(m.$selectOnes.not(m.fixedElements).get(0).options[a].defaultSelected=!0),(b||!this.readOnly&&!this.disabled)&&(m.$selectOnes.not(m.fixedElements).get(0).options[a].selected=!0)):(b&&(m.$selectOnes.not(m.fixedElements).get(0).options[a].defaultSelected=!1),(b||!this.readOnly&&!this.disabled)&&(m.$selectOnes.not(m.fixedElements).get(0).options[a].selected=!1));""==p&&(q=!0,n("info",'An empty value was provided for select-one element "'+i+'". UicForm set the first option as selected.'))}var c=this.style.visibility;this.style.visibility="visible",this.style.visibility=c}),m.$others.not(m.fixedElements).each(function(){b&&(this.defaultValue=p),(b||!this.readOnly&&!this.disabled)&&(this.value=p),q=!0})}else if("complex"==m.expectedValType){var p=k.slice(0);for(var s in p)p[s]=p[s].toString();var t=[],q=!1,u=0;m.$radioButtons.not(m.fixedElements).each(function(){var c=a.inArray(this.value,p);c>-1&&0==u?(b&&(this.defaultChecked=!0),(b||!this.readOnly&&!this.disabled)&&(this.checked=!0),t=t.concat(p.splice(c,1)),q=!0):(b&&(this.defaultChecked=!1),(b||!this.readOnly&&!this.disabled)&&(this.checked=!1)),c>-1&&u++}),u>1&&n("warn",'Too many values were provided for radioButton-Collection "'+m.name+'"'),m.$checkBoxes.not(m.fixedElements).each(function(){var c=a.inArray(this.value,p);c>-1?(b&&(this.defaultChecked=!0),(b||!this.readOnly&&!this.disabled)&&(this.checked=!0),t=t.concat(p.splice(c,1)),q=!0):(b&&(this.defaultChecked=!1),(b||!this.readOnly&&!this.disabled)&&(this.checked=!1))}),m.$selectOnes.not(m.fixedElements).each(function(){var c=0;a(this).find("option").each(function(){var d=a.inArray(this.value,p);d>-1&&0==c?(b&&(this.defaultSelected=!0),(b||!this.readOnly&&!this.disabled)&&(this.selected=!0),t=t.concat(p.splice(d,1)),q=!0):(b&&(this.defaultSelected=!1),(b||!this.readOnly&&!this.disabled)&&(this.selected=!1)),d>-1&&c++}),a(this).find("option").size()>0&&0==c&&a(this).find("option").each(function(a){b&&(this.defaultSelected=0==a?!0:!1),(b||!this.readOnly&&!this.disabled)&&(this.selected=0==a?!0:!1)}),c>1&&n("warn",'Too many values were provided for select-Box "'+m.name+'"');var d=this.style.visibility;this.style.visibility="visible",this.style.visibility=d}),m.$selectMultiples.not(m.fixedElements).each(function(){a(this).find("option").each(function(){var c=a.inArray(this.value,p);c>-1?(b&&(this.defaultSelected=!0),(b||!this.readOnly&&!this.disabled)&&(this.selected=!0),t=t.concat(p.splice(c,1)),q=!0):(b&&(this.defaultSelected=!1),(b||!this.readOnly&&!this.disabled)&&(this.selected=!1))});var c=this.style.visibility;this.style.visibility="visible",this.style.visibility=c}),m.$others.not(m.fixedElements).each(function(){p.length>0?(b&&(this.defaultValue=p[0]),(b||!this.readOnly&&!this.disabled)&&(this.value=p[0]),t=t.concat(p.splice(0,1)),q=!0):(b&&(this.defaultValue=""),(b||!this.readOnly&&!this.disabled)&&(this.value=""))}),p.length>0&&n("warn","Some values ("+p+') of value collection for property "'+i+'" could not be assigned.');for(var s in t)t[s]=l(t[s]);0==k.length&&(q=!0)}if(f.call(d,m,null,b),0==q)throw ReferenceError("Value ("+k+') for  property "'+i+'" could not be assigned.')}catch(v){n("error",v.name+" : "+v.message)}}function i(b,d){try{var e=this,f=a(e),g=(f.data(o).settings,f.data(o).storage);b=b||!1;var h=b?"defaultValue":"value",i=b?"defaultChecked":"checked",j=b?"defaultSelected":"selected";d=Array.prototype.slice.call(d,0);var k=[];a.extend(!0,k,d);var m=k[0],p=g.properties[m];if(!p)throw ReferenceError('No form elements are assigned to property "'+m+'".');var q=[];p.$radioButtons.each(function(){!this.disabled&&this[i]&&q.push(l(this.value))}),p.$checkBoxes.each(function(){var b=a(this).attr("data-off-value");1==p.length&&typeof b!=typeof c&&b!==!1?!this.disabled&&this[i]?q.push(l(this.value)):this.disabled||this[i]||q.push(l(a(this).attr("data-off-value"))):!this.disabled&&this[i]&&q.push(l(this.value))}),p.$selectOnes.each(function(){if(!this.disabled||b)for(var a=0;a<this.options.length;a++)!this.disabled&&this.options[a][j]&&q.push(l(this.options[a].value))}),p.$selectMultiples.each(function(){if(!this.disabled||b)for(var a=0;a<this.options.length;a++)!this.disabled&&this.options[a][j]&&q.push(l(this.options[a].value))}),p.$others.each(function(){this.disabled||""==this[h]||q.push(l(this[h]))});var r=null;return"primitive"==p.expectedValType?(r=1==q.length?q[0]:q.join(","),""==r&&"undefined"!=typeof p.emptyValue&&(r=p.emptyValue)):(r=q,0==r.length&&"undefined"!=typeof p.emptyValue&&(r=p.emptyValue)),r}catch(s){n("error",s.name+" : "+s.message)}}function j(a,b){function c(a){var b=d.shift();return d.length>0?"undefined"!=typeof a[b]?c(a[b]):void 0:a[b]}var d=b.split(/\]\[\]|\[\]|\]\[|\[|\]/g);""==d[d.length-1]&&d.pop();var e=c(a);return e}function k(a,b,c){function d(a){var b=e[f];f<e.length-1?("undefined"==typeof a[b]&&(a[b]=e[f+1]&&e[f+1].match(/\d+/)?[]:{}),f++,d(a[b])):a[b]=c}var e=b.split(/\]\[\]|\[\]|\]\[|\[|\]/g);""==e[e.length-1]&&e.pop();var f=0;d(a)}function l(b){return a.isNumeric(b)?parseFloat(b):"true"==b.toLowerCase()?!0:"false"==b.toLowerCase()?!1:b}function m(b,c){return"object"==typeof b&&"object"==typeof c?!(a(b).not(c).length>0||a(c).not(b).length>0):b==c}function n(c){try{if(b.console){var d=Array.prototype.slice.call(arguments,1);c==p.log.DEBUG&&a.inArray(p.log.DEBUG,a.fn.uicForm3.log)>-1?console[c].apply(console,d):c==p.log.INFO&&a.inArray(p.log.INFO,a.fn.uicForm3.log)>-1?console[c].apply(console,d):c==p.log.WARN&&a.inArray(p.log.WARN,a.fn.uicForm3.log)>-1?console[c].apply(console,d):c==p.log.ERROR&&a.inArray(p.log.ERROR,a.fn.uicForm3.log)>-1?console[c].apply(console,d):c==p.log.EVENT&&a.inArray(p.log.EVENT,a.fn.uicForm3.log)>-1&&console[c].apply(console,d)}}catch(e){}}var o="uic_form3",p={log:{DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error",EVENT:"event"},errCodes:{NOTAUICFORM:'The form is not a "uicForm".',NUMOFARGS:"Number of arguments is out of range."}},q={populate:function(a,b){try{var c=this,d=this.get(0),e=c.data(o);if(!e)throw TypeError(p.errCodes.NOTAUICFORM);var f=(c.data(o).settings,c.data(o).storage);if(b){if(0==f.callEventListeners.call(d,"onInitDataUnload",q.initData.call(c),q.formModified.call(c)))return!1}else if(0==f.callEventListeners.call(d,"onDataUnload",q.data.call(c),q.formModified.call(c)))return!1;for(var g in f.properties){var h=f.properties[g];try{var i=j.call(d,a,h.name);if("undefined"==typeof i||null==i)throw b&&q.initVal.call(c,h.name,"primitive"==h.expectedValType?"":[]),new ReferenceError('The data model for the form does not provide a value for the property with name "'+h.name+'"');b?q.initVal.call(c,h.name,i):q.val.call(c,h.name,i)}catch(k){n("error",k.name+": "+k.message)}}return b?f.callEventListeners.call(d,"onInitDataLoad",q.initData.call(c),q.formModified.call(c)):f.callEventListeners.call(d,"onDataLoad",q.data.call(c),q.formModified.call(c)),!0}catch(k){n("error",k.name+": "+k.message)}},populateRecord:function(a){try{if(1!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);return q.populate.call(this,a,!0)}catch(b){n("error",b.name+": "+b.message)}},populateData:function(a){try{if(1!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);return q.populate.call(this,a,!1)}catch(b){n("error",b.name+": "+b.message)}},initData:function(){try{var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);var d=(a.data(o).settings,a.data(o).storage);switch(arguments.length){case 0:var e={};for(var f in d.properties){var g=d.properties[f].$elms.filter(function(a){return!a.disabled});g.length>0&&k.call(b,e,d.properties[f].name,q.initVal.call(a,d.properties[f].name))}return e;case 1:return q.populate.call(a,arguments[0],!0);default:throw RangeError(p.errCodes.NUMOFARGS)}}catch(h){n("error",h.name+": "+h.message)}},data:function(){try{var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);var d=(a.data(o).settings,a.data(o).storage);switch(arguments.length){case 0:var e={};for(var f in d.properties){var g=d.properties[f].$elms.filter(function(a){return!a.disabled});g.length>0&&k.call(b,e,d.properties[f].name,q.val.call(a,d.properties[f].name))}return e;case 1:return q.populate.call(a,arguments[0],!1);default:throw RangeError(p.errCodes.NUMOFARGS)}}catch(h){n("error",h.name+": "+h.message)}},modifiedData:function(){try{var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);var d=(a.data(o).settings,a.data(o).storage);switch(arguments.length){case 0:var e={};for(var f in d.properties){var g=d.properties[f].$elms.filter(function(a){return!a.disabled}),h=q.val.call(a,d.properties[f].name),i=q.initVal.call(a,d.properties[f].name);m(i,h)||g.length>0&&k.call(b,e,d.properties[f].name,h)}return e;default:throw RangeError(p.errCodes.NUMOFARGS)}}catch(j){n("error",j.name+": "+j.message)}},initVal:function(){try{var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);switch(arguments.length){case 1:return i.call(b,!0,arguments);case 2:return h.call(b,!0,arguments),a;default:throw RangeError(p.errCodes.NUMOFARGS)}}catch(d){n("error",d.name+": "+d.message)}},val:function(){try{var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);switch(arguments.length){case 1:return i.call(b,!1,arguments);case 2:return h.call(b,!1,arguments),a;default:throw RangeError(p.errCodes.NUMOFARGS)}}catch(d){n("error",d.name+": "+d.message)}},emptyVal:function(){try{var a=this,b=(this.get(0),a.data(o));if(!b)throw TypeError(p.errCodes.NOTAUICFORM);switch(arguments.length){case 1:return"undefined"!=typeof b.storage.properties[arguments[0]].emptyValue?b.storage.properties[arguments[0]].emptyValue:"primitive"==b.storage.properties[arguments[0]].expectedValType?"":[];case 2:if("object"==typeof arguments[0])for(var c=0;c<arguments[0].length;c++)b.storage.properties[arguments[0][c]].emptyValue=arguments[1];else b.storage.properties[arguments[0]].emptyValue=arguments[1];return a;default:throw RangeError(p.errCodes.NUMOFARGS)}}catch(d){n("error",d.name+": "+d.message)}},clear:function(){try{if(0!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);var d=(a.data(o).settings,a.data(o).storage),e={};for(var f in d.properties){var g=d.properties[f].$elms.filter(function(a){return!a.disabled});g.length>0&&k.call(b,e,d.properties[f].name,"primitive"==d.properties[f].expectedValType?"":[])}q.populate.call(this,e,!0),d.callEventListeners.call(b,"onClear")}catch(h){n("error",h.name+": "+h.message)}},wipe:function(){try{if(0!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);var d=(a.data(o).settings,a.data(o).storage),e={};for(var f in d.properties){var g=d.properties[f],h=g.$elms.filter(function(a){return!a.disabled});if(h.length>0){var i=null;"primitive"==g.expectedValType?"[object Object]"==r.call(g.tempValObj)&&null!==g.tempValObj?(g.tempValObj.value="",i=g.tempValObj):i="":null!==g.tempValObj?(g.tempValObj.value=[],i=g.tempValObj):i=[],k.call(b,e,g.name,i)}}q.populate.call(this,e,!1),d.callEventListeners.call(b,"onWipe")}catch(j){n("error",j.name+": "+j.message)}},resetFields:function(){try{if(0!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);var d=(a.data(o).settings,a.data(o).storage);q.data.call(a,q.initData.call(a)),d.callEventListeners.call(b,"onResetFields")}catch(e){n("error",e.name+": "+e.message)}},addEventListener:function(a,b){try{if(2!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var c=this,d=(this.get(0),c.data(o));if(!d)throw TypeError(p.errCodes.NOTAUICFORM);var e=(c.data(o).settings,c.data(o).storage);return e.listeners[a]&&e.listeners[a].push(b),!0}catch(f){n("error",f.name+": "+f.message)}},removeEventListener:function(b,c){try{if(2!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var d=this,e=(this.get(0),d.data(o));if(!e)throw TypeError(p.errCodes.NOTAUICFORM);var f=(d.data(o).settings,d.data(o).storage);if(f.listeners[b]){var g=a.inArray(c,f.listeners[b]);return g>-1?(f.listeners[b].splice(g,1),!0):!1}}catch(h){n("error",h.name+": "+h.message)}},formModified:function(){try{if(0!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var a=this,b=(this.get(0),a.data(o));if(!b)throw TypeError(p.errCodes.NOTAUICFORM);var c=a.data(o).storage;for(var d in c.properties)if(c.properties[d].modified)return!0;return!1}catch(e){n("error",e.name+": "+e.message)}},formValid:function(){try{if(0!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var a=this,b=(this.get(0),a.data(o));if(!b)throw TypeError(p.errCodes.NOTAUICFORM);var c=a.data(o).storage;for(var d in c.properties)if(c.properties[d].tempValid===!1)return!1;return!0}catch(e){n("error",e.name+": "+e.message)}},properties:function(){try{if(0!=arguments.length)throw RangeError(p.errCodes.NUMOFARGS);var a=this,b=(this.get(0),a.data(o));if(!b)throw TypeError(p.errCodes.NOTAUICFORM);var c=a.data(o).storage;return c.properties}catch(d){n("error",d.name+": "+d.message)}},update:function(){try{var a=this,b=this.get(0),c=a.data(o);if(!c)throw TypeError(p.errCodes.NOTAUICFORM);return g.call(b),!0}catch(d){return n("error",d.name+": "+d.message),!1}},init:function(b){var c={ignoredElements:["fieldset","button",'input[type="button"]','input[type="image"]','input[type="reset"]','input[type="submit"]'],fixedElements:[],onFormInit:function(){},onFormSubmit:function(){},onInitDataLoad:function(){},onInitDataUnload:function(){},onDataLoad:function(){},onDataUnload:function(){},onPropertyInitValChange:function(){},onPropertyValChange:function(){},onPropertyModifiedStateChange:function(){},onPropertyValidStateChange:function(){},onFormModifiedStateChange:function(){},onFormValidStateChange:function(){},onResetFields:function(){},onClear:function(){},onWipe:function(){}},f=a.extend(!0,{},c,a.fn.uicForm3.defaults,b);return this.each(function(){var h=this,i=a(h),j=i.data(o);if(!j){i.data(o,{}),i.data(o).settings=f;var k=i.data(o).storage={initiated:!1,formModified:!1,formValid:!0,properties:[],callEventListeners:function(b){var c=!0;b.indexOf("onProperty")>-1?0==a.fn.uicForm3.debugFilter.length?a.inArray(p.log.DEBUG,a.fn.uicForm3.log)>-1&&n("debug",b+": ",Array.prototype.slice.call(arguments,1)):a.inArray(arguments[2],a.fn.uicForm3.debugFilter)>-1&&a.inArray(p.log.DEBUG,a.fn.uicForm3.log)>-1&&n("debug",b+": ",Array.prototype.slice.call(arguments,1)):a.inArray(p.log.DEBUG,a.fn.uicForm3.log)>-1&&n("debug",b+": ",Array.prototype.slice.call(arguments,1));for(var d=0;d<k.listeners[b].length;d++){var e=k.listeners[b][d].apply(this,Array.prototype.slice.call(arguments,1));e===!1&&(c=!1)}return c},listeners:{}};for(var l in c)0==l.indexOf("on")&&"[object Function]"==r.call(c[l])&&(k.listeners[l]=[]);for(var l in a.fn.uicForm3.defaults)0==l.indexOf("on")&&"[object Function]"==r.call(a.fn.uicForm3.defaults[l])&&k.listeners[l]&&k.listeners[l].push(a.fn.uicForm3.defaults[l]);for(var l in b)0==l.indexOf("on")&&"[object Function]"==r.call(b[l])&&k.listeners[l]&&k.listeners[l].push(b[l]);d.call(h),e.call(h),g.call(h),k.initiated=!0,k.formModified=q.formModified.call(i),k.callEventListeners.call(h,"onFormInit",k.formModified)}})}},r={}.toString;a.fn.uicForm3=function(b){return q[b]?q[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist."):q.init.apply(this,arguments)}}(jQuery,window),$.fn.uicForm3.defaults={},$.fn.uicForm3.log=[],$.fn.uicForm3.debugFilter=[];
