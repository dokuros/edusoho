define("arale/validator/0.9.3/core",["$","./async","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.1.0/class","arale/events/1.1.0/events","./utils","./rule","./item"],function(a,b,c){function d(a,b){for(var c=0;c<b.length;c++)if(a===b[c])return b.splice(c,1),b}function e(a,b){var c;return f.each(b,function(b,d){return a.get(0)===d.element.get(0)?(c=d,!1):void 0}),c}var f=a("$"),g=a("./async"),h=a("arale/widget/1.1.0/widget"),i=a("./utils"),j=a("./item"),k=[],l={value:f.noop,setter:function(a){return f.isFunction(a)?a:i.helper(a)}},m=h.extend({attrs:{triggerType:"blur",checkOnSubmit:!0,stopOnError:!1,autoSubmit:!0,checkNull:!0,onItemValidate:l,onItemValidated:l,onFormValidate:l,onFormValidated:l,displayHelper:function(a){var b,c,d=a.element.attr("id");return d&&(b=f("label[for="+d+"]").text(),b&&(b=b.replace(/^[\*\s\:\：]*/,"").replace(/[\*\s\:\：]*$/,""))),c=a.element.attr("name"),b||c},showMessage:l,hideMessage:l,autoFocus:!0,failSilently:!1,skipHidden:!1},setup:function(){var a=this;if(a.items=[],a.element.is("form")){a._novalidate_old=a.element.attr("novalidate");try{a.element.attr("novalidate","novalidate")}catch(b){}a.get("checkOnSubmit")&&a.element.on("submit.validator",function(b){b.preventDefault(),a.execute(function(b){!b&&a.get("autoSubmit")&&a.element.get(0).submit()})})}a.on("itemValidated",function(a,b,c,d){this.query(c).get(a?"showMessage":"hideMessage").call(this,b,c,d)}),k.push(a)},Statics:f.extend({helper:i.helper},a("./rule"),{autoRender:function(a){var b=new this(a);f("input, textarea, select",b.element).each(function(a,c){c=f(c);var d=c.attr("type");if("button"==d||"submit"==d||"reset"==d)return!0;var e={};if(e.element="radio"==d||"checkbox"==d?f("[type="+d+"][name="+c.attr("name")+"]",b.element):c,!b.query(e.element)){var g=i.parseDom(c);if(!g.rule)return!0;f.extend(e,g),b.addItem(e)}})},query:function(a){return h.query(a)},validate:function(a){var b=f(a.element),c=new m({element:b.parents()});c.addItem(a),c.query(b).execute(),c.destroy()}}),addItem:function(a){var b=this;if(f.isArray(a))return f.each(a,function(a,c){b.addItem(c)}),this;if(a=f.extend({triggerType:b.get("triggerType"),checkNull:b.get("checkNull"),displayHelper:b.get("displayHelper"),showMessage:b.get("showMessage"),hideMessage:b.get("hideMessage"),failSilently:b.get("failSilently"),skipHidden:b.get("skipHidden")},a),!f(a.element).length){if(a.failSilently)return b;throw new Error("element does not exist")}var c=new j(a);return b.items.push(c),c.delegateEvents(c.get("triggerType"),function(a){(this.get("checkNull")||this.element.val())&&this.execute(null,{event:a})}),c.on("all",function(){this.trigger.apply(this,[].slice.call(arguments))},b),b},removeItem:function(a){var b=this,c=a instanceof j?a:e(f(a),b.items);return c&&(d(c,b.items),c.get("hideMessage").call(b,null,c.element),c.destroy()),b},execute:function(a){var b=this,c=[],d=!1,e=null;return f.each(b.items,function(a,c){c.get("hideMessage").call(b,null,c.element)}),b.trigger("formValidate",b.element),g[b.get("stopOnError")?"forEachSeries":"forEach"](b.items,function(a,f){a.execute(function(a,g,h){a&&!d&&(d=!0,e=h),c.push([].slice.call(arguments,0)),f(b.get("stopOnError")?a:null)})},function(){b.get("autoFocus")&&d&&(b.trigger("autoFocus",e),e.focus()),b.trigger("formValidated",d,c,b.element),a&&a(d,c,b.element)}),b},destroy:function(){var a=this,b=a.items.length;if(a.element.is("form")){try{void 0==a._novalidate_old?a.element.removeAttr("novalidate"):a.element.attr("novalidate",a._novalidate_old)}catch(c){}a.element.off("submit.validator")}for(var e=b-1;e>=0;e--)a.removeItem(a.items[e]);d(a,k),m.superclass.destroy.call(this)},query:function(a){return e(f(a),this.items)}});c.exports=m}),define("arale/validator/0.9.3/async",[],function(a,b,c){var d={};c.exports=d;var e=function(a,b){if(a.forEach)return a.forEach(b);for(var c=0;c<a.length;c+=1)b(a[c],c,a)},f=function(a,b){if(a.map)return a.map(b);var c=[];return e(a,function(a,d,e){c.push(b(a,d,e))}),c},g=function(a){if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b};d.nextTick="undefined"!=typeof process&&process.nextTick?process.nextTick:function(a){setTimeout(a,0)},d.forEach=function(a,b,c){if(c=c||function(){},!a.length)return c();var d=0;e(a,function(e){b(e,function(b){b?(c(b),c=function(){}):(d+=1,d===a.length&&c(null))})})},d.forEachSeries=function(a,b,c){if(c=c||function(){},!a.length)return c();var d=0,e=function(){b(a[d],function(b){b?(c(b),c=function(){}):(d+=1,d===a.length?c(null):e())})};e()};var h=function(a){return function(){var b=Array.prototype.slice.call(arguments);return a.apply(null,[d.forEach].concat(b))}},i=function(a){return function(){var b=Array.prototype.slice.call(arguments);return a.apply(null,[d.forEachSeries].concat(b))}},j=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c,d){e[a.index]=d,b(c)})},function(a){d(a,e)})};d.map=h(j),d.mapSeries=i(j),d.series=function(a,b){if(b=b||function(){},a.constructor===Array)d.mapSeries(a,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},b);else{var c={};d.forEachSeries(g(a),function(b,d){a[b](function(a){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),c[b]=e,d(a)})},function(a){b(a,c)})}}}),define("arale/validator/0.9.3/utils",["$","arale/validator/0.9.3/rule"],function(require,exports,module){function unique(){return"__anonymous__"+u_count++}function parseRules(a){return a?a.match(/[a-zA-Z0-9\-\_]+(\{[^\{\}]*\})?/g):null}function parseDom(a){var a=$(a),b={},c=[],d=a.attr("required");d&&(c.push("required"),b.required=!0);var e=a.attr("type");if(e&&"submit"!=e&&"cancel"!=e&&"checkbox"!=e&&"radio"!=e&&"select"!=e&&"select-one"!=e&&"file"!=e&&"hidden"!=e&&"textarea"!=e){if(!Rule.getRule(e))throw new Error('Form field with type "'+e+'" not supported!');c.push(e)}var f=a.attr("min");f&&c.push('min{"min":"'+f+'"}');var g=a.attr("max");g&&c.push("max{max:"+g+"}");var h=a.attr("minlength");h&&c.push("minlength{min:"+h+"}");var i=a.attr("maxlength");i&&c.push("maxlength{max:"+i+"}");var j=a.attr("pattern");if(j){var k=new RegExp(j),l=unique();Rule.addRule(l,k),c.push(l)}var m=a.attr("data-rule");return m=m&&parseRules(m),m&&(c=c.concat(m)),b.rule=0==c.length?null:c.join(" "),b}function parseJSON(str){function getValue(str){return'"'==str.charAt(0)&&'"'==str.charAt(str.length-1)||"'"==str.charAt(0)&&"'"==str.charAt(str.length-1)?eval(str):str}if(!str)return null;var NOTICE='Invalid option object "'+str+'".';str=str.slice(1,-1);var result={},arr=str.split(",");return $.each(arr,function(a,b){if(arr[a]=$.trim(b),!arr[a])throw new Error(NOTICE);var c=arr[a].split(":"),d=$.trim(c[0]),e=$.trim(c[1]);if(!d||!e)throw new Error(NOTICE);result[getValue(d)]=$.trim(getValue(e))}),result}var $=require("$"),Rule=require("arale/validator/0.9.3/rule"),u_count=0,helpers={};module.exports={parseRule:function(a){var b=a.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);return{name:b[1],param:parseJSON(b[2])}},parseRules:parseRules,parseDom:parseDom,helper:function(a,b){return b?(helpers[a]=b,this):helpers[a]}}}),define("arale/validator/0.9.3/rule",["$"],function(a,b,c){function d(a,b){var c=this;if(c.name=a,b instanceof RegExp)c.operator=function(a,c){var d=b.test(j(a.element).val());c(d?null:a.rule,f(a,d))};else{if(!j.isFunction(b))throw new Error("The second argument must be a regexp or a function.");c.operator=function(a,c){var d=b(a,function(b,d){c(b?null:a.rule,d||f(a,b))});void 0!==d&&c(d?null:a.rule,f(a,d))}}}function e(a,b,c){return j.isPlainObject(a)?(j.each(a,function(a,b){j.isArray(b)?e(a,b[0],b[1]):e(a,b)}),this):(k[a]=b instanceof d?new d(a,b.operator):new d(a,b),g(a,c),this)}function f(a,b){var c,d=a.rule;return c=a.message?j.isPlainObject(a.message)?a.message[b?"success":"failure"]:b?"":a.message:l[d][b?"success":"failure"],c?i(a,c):c}function g(a,b){return j.isPlainObject(a)?(j.each(a,function(a,b){g(a,b)}),this):(l[a]=j.isPlainObject(b)?b:{failure:b},this)}function h(a,b){if(b){var c=k[a];return new d(null,function(a,d){c.operator(j.extend(null,a,b),d)})}return k[a]}function i(a,b){var c=b,d=/\{\{[^\{\}]*\}\}/g,e=/\{\{(.*)\}\}/,f=b.match(d);return f&&j.each(f,function(b,d){var f=d.match(e)[1],g=a[j.trim(f)];c=c.replace(d,g)}),c}var j=a("$"),k={},l={};d.prototype.and=function(a,b){var c=a instanceof d?a:h(a,b);if(!c)throw new Error('No rule with name "'+a+'" found.');var e=this,g=function(a,b){e.operator(a,function(d){d?b(d,f(a,!d)):c.operator(a,b)})};return new d(null,g)},d.prototype.or=function(a,b){var c=a instanceof d?a:h(a,b);if(!c)throw new Error('No rule with name "'+a+'" found.');var e=this,g=function(a,b){e.operator(a,function(d){d?c.operator(a,b):b(null,f(a,!0))})};return new d(null,g)},d.prototype.not=function(a){var b=h(this.name,a),c=function(a,c){b.operator(a,function(b){b?c(null,f(a,!0)):c(!0,f(a,!1))})};return new d(null,c)},e("required",function(a){var b=j(a.element),c=b.attr("type");switch(c){case"checkbox":case"radio":var d=!1;return b.each(function(a,b){return j(b).prop("checked")?(d=!0,!1):void 0}),d;default:return Boolean(b.val())}},"请输入{{display}}"),e("email",/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,"{{display}}的格式不正确"),e("text",/.*/),e("password",/.*/),e("radio",/.*/),e("checkbox",/.*/),e("url",/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,"{{display}}的格式不正确"),e("number",/^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/,"{{display}}的格式不正确"),e("date",/^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/,"{{display}}的格式不正确"),e("min",function(a){var b=a.element,c=a.min;return Number(b.val())>=Number(c)},"{{display}}必须大于或者等于{{min}}"),e("max",function(a){var b=a.element,c=a.max;return Number(b.val())<=Number(c)},"{{display}}必须小于或者等于{{max}}"),e("minlength",function(a){var b=a.element,c=b.val().length;return c>=Number(a.min)},"{{display}}的长度必须大于或等于{{min}}"),e("maxlength",function(a){var b=a.element,c=b.val().length;return c<=Number(a.max)},"{{display}}的长度必须小于或等于{{max}}"),e("mobile",/^1\d{10}$/,"请输入正确的{{display}}"),e("confirmation",function(a){var b=a.element,c=j(a.target);return b.val()==c.val()},"两次输入的{{display}}不一致，请重新输入"),c.exports={addRule:e,setMessage:g,getRule:h,getOperator:function(a){return k[a].operator}}}),define("arale/validator/0.9.3/item",["$","arale/validator/0.9.3/utils","arale/validator/0.9.3/rule","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.1.0/class","arale/events/1.1.0/events","arale/validator/0.9.3/async"],function(a,b,c){function d(a){return a+="",a.charAt(0).toUpperCase()+a.slice(1)}function e(a,b,c,d,e){if(!b){var h=!1,k=a.attr("type");switch(k){case"checkbox":case"radio":var l=!1;a.each(function(a,b){return f(b).prop("checked")?(l=!0,!1):void 0}),h=l;break;default:h=!!a.val()}if(!h)return e&&e(null,null),void 0}if(!f.isArray(c))throw new Error("No validation rule specified or not specified as an array.");var m=[];f.each(c,function(b,c){var e=g.parseRule(c),h=e.name,i=e.param,k=j.getOperator(h);if(!k)throw new Error('Validation rule with name "'+h+'" cannot be found.');var l=f.extend({},i,{element:a,display:i&&i.display||d,rule:h});m.push(function(a){k(l,a)})}),i.series(m,function(a,b){e&&e(a,b[b.length-1])})}var f=a("$"),g=a("arale/validator/0.9.3/utils"),h=a("arale/widget/1.1.0/widget"),i=a("arale/validator/0.9.3/async"),j=a("arale/validator/0.9.3/rule"),k={value:f.noop,setter:function(a){return f.isFunction(a)?a:g.helper(a)}},l=h.extend({attrs:{rule:"",display:null,displayHelper:null,triggerType:{setter:function(a){if(!a)return a;var b=f(this.get("element")),c=b.attr("type"),d=b.is("select")||"radio"==c||"checkbox"==c;return d&&(a.indexOf("blur")>-1||a.indexOf("key")>-1)?"change":a}},required:!1,checkNull:!0,errormessage:null,onItemValidate:k,onItemValidated:k,showMessage:k,hideMessage:k},setup:function(){this.get("required")&&(!this.get("rule")||this.get("rule").indexOf("required")<0)&&this.set("rule","required "+this.get("rule")),!this.get("display")&&f.isFunction(this.get("displayHelper"))&&this.set("display",this.get("displayHelper")(this))},execute:function(a,b){var c=this;if(b=b||{},c.get("skipHidden")&&!c.element.is(":visible"))return a&&a(null,"",c.element),c;c.trigger("itemValidate",c.element,b.event);var f=g.parseRules(c.get("rule"));return f?e(c.element,c.get("required"),f,c.get("display"),function(e,f){var g=e?c.get("errormessage")||c.get("errormessage"+d(e))||f:f;c.trigger("itemValidated",e,g,c.element,b.event),a&&a(e,g,c.element)}):a&&a(null,"",c.element),c}});c.exports=l});
