/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=5b563a3b7816a0d9e5cb)
 * Config saved to config.json and https://gist.github.com/5b563a3b7816a0d9e5cb
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.tooltip"),
                s = "object" == typeof e && e,
                r = s && s.selector;
            (n || "destroy" != e) && (r ? (n || i.data("bs.tooltip", n = {}), n[r] || (n[r] = new o(this, s))) : n || i.data("bs.tooltip", n = new o(this, s)), "string" == typeof e && n[e]())
        })
    }
    var o = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    o.VERSION = "3.3.1", o.TRANSITION_DURATION = 150, o.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, o.prototype.init = function(e, o, i) {
        this.enabled = !0, this.type = e, this.$element = t(o), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var p = "hover" == r ? "mouseenter" : "focusin",
                    a = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(p + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, o.prototype.getDefaults = function() {
        return o.DEFAULTS
    }, o.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, o.prototype.getDelegateOptions = function() {
        var e = {},
            o = this.getDefaults();
        return this._options && t.each(this._options, function(t, i) {
            o[t] != i && (e[t] = i)
        }), e
    }, o.prototype.enter = function(e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o && o.$tip && o.$tip.is(":visible") ? void(o.hoverState = "in") : (o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), clearTimeout(o.timeout), o.hoverState = "in", o.options.delay && o.options.delay.show ? void(o.timeout = setTimeout(function() {
            "in" == o.hoverState && o.show()
        }, o.options.delay.show)) : o.show())
    }, o.prototype.leave = function(e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), clearTimeout(o.timeout), o.hoverState = "out", o.options.delay && o.options.delay.hide ? void(o.timeout = setTimeout(function() {
            "out" == o.hoverState && o.hide()
        }, o.options.delay.hide)) : o.hide()
    }, o.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var n = this,
                s = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var p = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                a = /\s?auto?\s?/i,
                l = a.test(p);
            l && (p = p.replace(a, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(p).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
            var h = this.getPosition(),
                f = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (l) {
                var u = p,
                    d = this.options.container ? t(this.options.container) : this.$element.parent(),
                    v = this.getPosition(d);
                p = "bottom" == p && h.bottom + c > v.bottom ? "top" : "top" == p && h.top - c < v.top ? "bottom" : "right" == p && h.right + f > v.width ? "left" : "left" == p && h.left - f < v.left ? "right" : p, s.removeClass(u).addClass(p)
            }
            var g = this.getCalculatedOffset(p, h, f, c);
            this.applyPlacement(g, p);
            var y = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", y).emulateTransitionEnd(o.TRANSITION_DURATION) : y()
        }
    }, o.prototype.applyPlacement = function(e, o) {
        var i = this.tip(),
            n = i[0].offsetWidth,
            s = i[0].offsetHeight,
            r = parseInt(i.css("margin-top"), 10),
            p = parseInt(i.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(p) && (p = 0), e.top = e.top + r, e.left = e.left + p, t.offset.setOffset(i[0], t.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), i.addClass("in");
        var a = i[0].offsetWidth,
            l = i[0].offsetHeight;
        "top" == o && l != s && (e.top = e.top + s - l);
        var h = this.getViewportAdjustedDelta(o, e, a, l);
        h.left ? e.left += h.left : e.top += h.top;
        var f = /top|bottom/.test(o),
            c = f ? 2 * h.left - n + a : 2 * h.top - s + l,
            u = f ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(c, i[0][u], f)
    }, o.prototype.replaceArrow = function(t, e, o) {
        this.arrow().css(o ? "left" : "top", 50 * (1 - t / e) + "%").css(o ? "top" : "left", "")
    }, o.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, o.prototype.hide = function(e) {
        function i() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }
        var n = this,
            s = this.tip(),
            r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i(), this.hoverState = null, this)
    }, o.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, o.prototype.hasContent = function() {
        return this.getTitle()
    }, o.prototype.getPosition = function(e) {
        e = e || this.$element;
        var o = e[0],
            i = "BODY" == o.tagName,
            n = o.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = i ? {
                top: 0,
                left: 0
            } : e.offset(),
            r = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            p = i ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, r, p, s)
    }, o.prototype.getCalculatedOffset = function(t, e, o, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - o / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - o / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - i / 2,
            left: e.left - o
        } : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, o.prototype.getViewportAdjustedDelta = function(t, e, o, i) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var p = e.top - s - r.scroll,
                a = e.top + s - r.scroll + i;
            p < r.top ? n.top = r.top - p : a > r.top + r.height && (n.top = r.top + r.height - a)
        } else {
            var l = e.left - s,
                h = e.left + s + o;
            l < r.left ? n.left = r.left - l : h > r.width && (n.left = r.left + r.width - h)
        }
        return n
    }, o.prototype.getTitle = function() {
        var t, e = this.$element,
            o = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call(e[0]) : o.title)
    }, o.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, o.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, o.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, o.prototype.enable = function() {
        this.enabled = !0
    }, o.prototype.disable = function() {
        this.enabled = !1
    }, o.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, o.prototype.toggle = function(e) {
        var o = this;
        e && (o = t(e.currentTarget).data("bs." + this.type), o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o))), o.tip().hasClass("in") ? o.leave(o) : o.enter(o)
    }, o.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = o, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.popover"),
                s = "object" == typeof e && e,
                r = s && s.selector;
            (n || "destroy" != e) && (r ? (n || i.data("bs.popover", n = {}), n[r] || (n[r] = new o(this, s))) : n || i.data("bs.popover", n = new o(this, s)), "string" == typeof e && n[e]())
        })
    }
    var o = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    o.VERSION = "3.3.1", o.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), o.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), o.prototype.constructor = o, o.prototype.getDefaults = function() {
        return o.DEFAULTS
    }, o.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            o = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof o ? "html" : "append" : "text"](o), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, o.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, o.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, o.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, o.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var i = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = o, t.fn.popover.noConflict = function() {
        return t.fn.popover = i, this
    }
}(jQuery);