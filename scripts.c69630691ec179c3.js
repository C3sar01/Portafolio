!function(e){"use strict";function d(t){return t.is('[type="checkbox"]')?t.prop("checked"):t.is('[type="radio"]')?!!e('[name="'+t.attr("name")+'"]:checked').length:t.is("select[multiple]")?(t.val()||[]).length:t.val()}function f(t){return this.each(function(){var r=e(this),o=e.extend({},i.DEFAULTS,r.data(),"object"==typeof t&&t),a=r.data("bs.validator");(a||"destroy"!=t)&&(a||r.data("bs.validator",a=new i(this,o)),"string"==typeof t&&a[t]())})}var i=function(t,r){this.options=r,this.validators=e.extend({},i.VALIDATORS,r.custom),this.$element=e(t),this.$btn=e('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')),this.update(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",e.proxy(this.onInput,this)),this.$element.on("submit.bs.validator",e.proxy(this.onSubmit,this)),this.$element.on("reset.bs.validator",e.proxy(this.reset,this)),this.$element.find("[data-match]").each(function(){var o=e(this),a=o.attr("data-match");e(a).on("input.bs.validator",function(){d(o)&&o.trigger("input.bs.validator")})}),this.$inputs.filter(function(){return d(e(this))&&!e(this).closest(".has-error").length}).trigger("focusout"),this.$element.attr("novalidate",!0)};i.VERSION="0.11.9",i.INPUT_SELECTOR=':input:not([type="hidden"], [type="submit"], [type="reset"], button)',i.FOCUS_OFFSET=20,i.DEFAULTS={delay:500,html:!1,disable:!0,focus:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},i.VALIDATORS={native:function(t){var r=t[0];return r.checkValidity?!r.checkValidity()&&!r.validity.valid&&(r.validationMessage||"error!"):void 0},match:function(t){var r=t.attr("data-match");return t.val()!==e(r).val()&&i.DEFAULTS.errors.match},minlength:function(t){var r=t.attr("data-minlength");return t.val().length<r&&i.DEFAULTS.errors.minlength}},i.prototype.update=function(){var t=this;return this.$inputs=this.$element.find(i.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function(){t.clearErrors(e(this))})),this.toggleSubmit(),this},i.prototype.onInput=function(t){var r=this,o=e(t.target),a="focusout"!==t.type;this.$inputs.is(o)&&this.validateInput(o,a).done(function(){r.toggleSubmit()})},i.prototype.validateInput=function(t,r){var o=(d(t),t.data("bs.validator.errors"));t.is('[type="radio"]')&&(t=this.$element.find('input[name="'+t.attr("name")+'"]'));var a=e.Event("validate.bs.validator",{relatedTarget:t[0]});if(this.$element.trigger(a),!a.isDefaultPrevented()){var n=this;return this.runValidators(t).done(function(l){t.data("bs.validator.errors",l),l.length?r?n.defer(t,n.showErrors):n.showErrors(t):n.clearErrors(t),o&&l.toString()===o.toString()||(a=l.length?e.Event("invalid.bs.validator",{relatedTarget:t[0],detail:l}):e.Event("valid.bs.validator",{relatedTarget:t[0],detail:o}),n.$element.trigger(a)),n.toggleSubmit(),n.$element.trigger(e.Event("validated.bs.validator",{relatedTarget:t[0]}))})}},i.prototype.runValidators=function(t){function n(s){return function r(s){return t.attr("data-"+s+"-error")}(s)||function o(){var s=t[0].validity;return s.typeMismatch?t.attr("data-type-error"):s.patternMismatch?t.attr("data-pattern-error"):s.stepMismatch?t.attr("data-step-error"):s.rangeOverflow?t.attr("data-max-error"):s.rangeUnderflow?t.attr("data-min-error"):s.valueMissing?t.attr("data-required-error"):null}()||function a(){return t.attr("data-error")}()}var l=[],h=e.Deferred();return t.data("bs.validator.deferred")&&t.data("bs.validator.deferred").reject(),t.data("bs.validator.deferred",h),e.each(this.validators,e.proxy(function(s,c){var u=null;!d(t)&&!t.attr("required")||void 0===t.attr("data-"+s)&&"native"!=s||!(u=c.call(this,t))||(u=n(s)||u,!~l.indexOf(u)&&l.push(u))},this)),!l.length&&d(t)&&t.attr("data-remote")?this.defer(t,function(){var s={};s[t.attr("name")]=d(t),e.get(t.attr("data-remote"),s).fail(function(c,u,p){l.push(n("remote")||p)}).always(function(){h.resolve(l)})}):h.resolve(l),h.promise()},i.prototype.validate=function(){var t=this;return e.when(this.$inputs.map(function(){return t.validateInput(e(this),!1)})).then(function(){t.toggleSubmit(),t.focusError()}),this},i.prototype.focusError=function(){if(this.options.focus){var t=this.$element.find(".has-error:first :input");0!==t.length&&(e("html, body").animate({scrollTop:t.offset().top-i.FOCUS_OFFSET},250),t.focus())}},i.prototype.showErrors=function(t){var r=this.options.html?"html":"text",o=t.data("bs.validator.errors"),a=t.closest(".form-group"),n=a.find(".help-block.with-errors"),l=a.find(".form-control-feedback");o.length&&(o=e("<ul/>").addClass("list-unstyled").append(e.map(o,function(h){return e("<li/>")[r](h)})),void 0===n.data("bs.validator.originalContent")&&n.data("bs.validator.originalContent",n.html()),n.empty().append(o),a.addClass("has-error has-danger"),a.hasClass("has-feedback")&&l.removeClass(this.options.feedback.success)&&l.addClass(this.options.feedback.error)&&a.removeClass("has-success"))},i.prototype.clearErrors=function(t){var r=t.closest(".form-group"),o=r.find(".help-block.with-errors"),a=r.find(".form-control-feedback");o.html(o.data("bs.validator.originalContent")),r.removeClass("has-error has-danger has-success"),r.hasClass("has-feedback")&&a.removeClass(this.options.feedback.error)&&a.removeClass(this.options.feedback.success)&&d(t)&&a.addClass(this.options.feedback.success)&&r.addClass("has-success")},i.prototype.hasErrors=function(){return!!this.$inputs.filter(function t(){return!!(e(this).data("bs.validator.errors")||[]).length}).length},i.prototype.isIncomplete=function(){return!!this.$inputs.filter("[required]").filter(function t(){var r=d(e(this));return!("string"==typeof r?e.trim(r):r)}).length},i.prototype.onSubmit=function(t){this.validate(),(this.isIncomplete()||this.hasErrors())&&t.preventDefault()},i.prototype.toggleSubmit=function(){this.options.disable&&this.$btn.toggleClass("disabled",this.isIncomplete()||this.hasErrors())},i.prototype.defer=function(t,r){return r=e.proxy(r,this,t),this.options.delay?(window.clearTimeout(t.data("bs.validator.timeout")),void t.data("bs.validator.timeout",window.setTimeout(r,this.options.delay))):r()},i.prototype.reset=function(){return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success),this.$inputs.removeData(["bs.validator.errors","bs.validator.deferred"]).each(function(){var t=e(this),r=t.data("bs.validator.timeout");window.clearTimeout(r)&&t.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var t=e(this),r=t.data("bs.validator.originalContent");t.removeData("bs.validator.originalContent").html(r)}),this.$btn.removeClass("disabled"),this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"),this},i.prototype.destroy=function(){return this.reset(),this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$inputs.off(".bs.validator"),this.options=null,this.validators=null,this.$element=null,this.$btn=null,this.$inputs=null,this};var v=e.fn.validator;e.fn.validator=f,e.fn.validator.Constructor=i,e.fn.validator.noConflict=function(){return e.fn.validator=v,this},e(window).on("load",function(){e('form[data-toggle="validator"]').each(function(){var t=e(this);f.call(t,t.data())})})}(jQuery);