!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], t) : t(e.bootstrap = {}, e.jQuery)
}(this, function(e, t) {
    "use strict";
    function n(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    function i(e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }
    function o() {
        return o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, o.apply(this, arguments)
    }
    function r(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    function s(e) {
        var t = !1;
        return function() {
            t || (t = !0, window.Promise.resolve().then(function() {
                t = !1, e()
            }))
        }
    }
    function a(e) {
        var t = !1;
        return function() {
            t || (t = !0, setTimeout(function() {
                t = !1, e()
            }, _e))
        }
    }
    function l(e) {
        var t = {};
        return e && "[object Function]" === t.toString.call(e)
    }
    function c(e, t) {
        if (1 !== e.nodeType)
            return [];
        var n = getComputedStyle(e, null);
        return t ? n[t] : n
    }
    function u(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }
    function d(e) {
        if (!e)
            return document.body;
        switch (e.nodeName) {
        case "HTML":
        case "BODY":
            return e.ownerDocument.body;
        case "#document":
            return e.body
        }
        var t = c(e),
            n = t.overflow,
            i = t.overflowX;
        return /(auto|scroll)/.test(n + t.overflowY + i) ? e : d(u(e))
    }
    function f(e) {
        var t = e && e.offsetParent,
            n = t && t.nodeName;
        return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === c(t, "position") ? f(t) : t : e ? e.ownerDocument.documentElement : document.documentElement
    }
    function h(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || f(e.firstElementChild) === e)
    }
    function p(e) {
        return null !== e.parentNode ? p(e.parentNode) : e
    }
    function g(e, t) {
        if (!(e && e.nodeType && t && t.nodeType))
            return document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? e : t,
            o = n ? t : e,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(o, 0);
        var s = r.commonAncestorContainer;
        if (e !== s && t !== s || i.contains(o))
            return h(s) ? s : f(s);
        var a = p(e);
        return a.host ? g(a.host, t) : g(e, p(t).host)
    }
    function m(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === t ? "scrollTop" : "scrollLeft",
            i = e.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var o = e.ownerDocument.documentElement;
            return (e.ownerDocument.scrollingElement || o)[n]
        }
        return e[n]
    }
    function v(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = m(t, "top"),
            o = m(t, "left"),
            r = n ? -1 : 1;
        return e.top += i * r, e.bottom += i * r, e.left += o * r, e.right += o * r, e
    }
    function _(e, t) {
        var n = "x" === t ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10)
    }
    function E(e, t, n, i) {
        return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], we() ? n["offset" + e] + i["margin" + ("Height" === e ? "Top" : "Left")] + i["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
    }
    function y() {
        var e = document.body,
            t = document.documentElement,
            n = we() && getComputedStyle(t);
        return {
            height: E("Height", e, t, n),
            width: E("Width", e, t, n)
        }
    }
    function b(e) {
        return Oe({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }
    function T(e) {
        var t = {};
        if (we())
            try {
                t = e.getBoundingClientRect();
                var n = m(e, "top"),
                    i = m(e, "left");
                t.top += n, t.left += i, t.bottom += n, t.right += i
            } catch (e) {}
        else
            t = e.getBoundingClientRect();
        var o = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
            r = "HTML" === e.nodeName ? y() : {},
            s = r.width || e.clientWidth || o.right - o.left,
            a = r.height || e.clientHeight || o.bottom - o.top,
            l = e.offsetWidth - s,
            u = e.offsetHeight - a;
        if (l || u) {
            var d = c(e);
            l -= _(d, "x"), u -= _(d, "y"), o.width -= l, o.height -= u
        }
        return b(o)
    }
    function w(e, t) {
        var n = we(),
            i = "HTML" === t.nodeName,
            o = T(e),
            r = T(t),
            s = d(e),
            a = c(t),
            l = parseFloat(a.borderTopWidth, 10),
            u = parseFloat(a.borderLeftWidth, 10),
            f = b({
                top: o.top - r.top - l,
                left: o.left - r.left - u,
                width: o.width,
                height: o.height
            });
        if (f.marginTop = 0, f.marginLeft = 0, !n && i) {
            var h = parseFloat(a.marginTop, 10),
                p = parseFloat(a.marginLeft, 10);
            f.top -= l - h, f.bottom -= l - h, f.left -= u - p, f.right -= u - p, f.marginTop = h, f.marginLeft = p
        }
        return (n ? t.contains(s) : t === s && "BODY" !== s.nodeName) && (f = v(f, t)), f
    }
    function C(e) {
        var t = e.ownerDocument.documentElement,
            n = w(e, t),
            i = Math.max(t.clientWidth, window.innerWidth || 0),
            o = Math.max(t.clientHeight, window.innerHeight || 0),
            r = m(t),
            s = m(t, "left");
        return b({
            top: r - n.top + n.marginTop,
            left: s - n.left + n.marginLeft,
            width: i,
            height: o
        })
    }
    function S(e) {
        var t = e.nodeName;
        return "BODY" !== t && "HTML" !== t && ("fixed" === c(e, "position") || S(u(e)))
    }
    function I(e, t, n, i) {
        var o = {
                top: 0,
                left: 0
            },
            r = g(e, t);
        if ("viewport" === i)
            o = C(r);
        else {
            var s = void 0;
            "scrollParent" === i ? (s = d(u(t)), "BODY" === s.nodeName && (s = e.ownerDocument.documentElement)) : s = "window" === i ? e.ownerDocument.documentElement : i;
            var a = w(s, r);
            if ("HTML" !== s.nodeName || S(r))
                o = a;
            else {
                var l = y(),
                    c = l.height,
                    f = l.width;
                o.top += a.top - a.marginTop, o.bottom = c + a.top, o.left += a.left - a.marginLeft, o.right = f + a.left
            }
        }
        return o.left += n, o.top += n, o.right -= n, o.bottom -= n, o
    }
    function O(e) {
        return e.width * e.height
    }
    function A(e, t, n, i, o) {
        var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto"))
            return e;
        var s = I(n, i, r, o),
            a = {
                top: {
                    width: s.width,
                    height: t.top - s.top
                },
                right: {
                    width: s.right - t.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - t.bottom
                },
                left: {
                    width: t.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map(function(e) {
                return Oe({
                    key: e
                }, a[e], {
                    area: O(a[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            c = l.filter(function(e) {
                var t = e.width,
                    i = e.height;
                return t >= n.clientWidth && i >= n.clientHeight
            }),
            u = c.length > 0 ? c[0].key : l[0].key,
            d = e.split("-")[1];
        return u + (d ? "-" + d : "")
    }
    function D(e, t, n) {
        return w(n, g(t, n))
    }
    function N(e) {
        var t = getComputedStyle(e),
            n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
        return {
            width: e.offsetWidth + i,
            height: e.offsetHeight + n
        }
    }
    function R(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }
    function L(e, t, n) {
        n = n.split("-")[0];
        var i = N(e),
            o = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ["right", "left"].indexOf(n),
            s = r ? "top" : "left",
            a = r ? "left" : "top",
            l = r ? "height" : "width",
            c = r ? "width" : "height";
        return o[s] = t[s] + t[l] / 2 - i[l] / 2, o[a] = n === a ? t[a] - i[c] : t[R(a)], o
    }
    function P(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }
    function j(e, t, n) {
        if (Array.prototype.findIndex)
            return e.findIndex(function(e) {
                return e[t] === n
            });
        var i = P(e, function(e) {
            return e[t] === n
        });
        return e.indexOf(i)
    }
    function k(e, t, n) {
        return (void 0 === n ? e : e.slice(0, j(e, "name", n))).forEach(function(e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = e.function || e.fn;
            e.enabled && l(n) && (t.offsets.popper = b(t.offsets.popper), t.offsets.reference = b(t.offsets.reference), t = n(t, e))
        }), t
    }
    function x() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = D(this.state, this.popper, this.reference), e.placement = A(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = L(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = k(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }
    function H(e, t) {
        return e.some(function(e) {
            var n = e.name;
            return e.enabled && n === t
        })
    }
    function M(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length - 1; i++) {
            var o = t[i],
                r = o ? "" + o + n : e;
            if (void 0 !== document.body.style[r])
                return r
        }
        return null
    }
    function F() {
        return this.state.isDestroyed = !0, H(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[M("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }
    function W(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }
    function Q(e, t, n, i) {
        var o = "BODY" === e.nodeName,
            r = o ? e.ownerDocument.defaultView : e;
        r.addEventListener(t, n, {
            passive: !0
        }), o || Q(d(r.parentNode), t, n, i), i.push(r)
    }
    function U(e, t, n, i) {
        n.updateBound = i, W(e).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = d(e);
        return Q(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }
    function V() {
        this.state.eventsEnabled || (this.state = U(this.reference, this.options, this.state, this.scheduleUpdate))
    }
    function B(e, t) {
        return W(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }
    function G() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = B(this.reference, this.state))
    }
    function $(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }
    function z(e, t) {
        Object.keys(t).forEach(function(n) {
            var i = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && $(t[n]) && (i = "px"), e.style[n] = t[n] + i
        })
    }
    function K(e, t) {
        Object.keys(t).forEach(function(n) {
            !1 !== t[n] ? e.setAttribute(n, t[n]) : e.removeAttribute(n)
        })
    }
    function Y(e) {
        return z(e.instance.popper, e.styles), K(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && z(e.arrowElement, e.arrowStyles), e
    }
    function q(e, t, n, i, o) {
        var r = D(o, t, e),
            s = A(n.placement, r, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
        return t.setAttribute("x-placement", s), z(t, {
            position: "absolute"
        }), n
    }
    function X(e, t) {
        var n = t.x,
            i = t.y,
            o = e.offsets.popper,
            r = P(e.instance.modifiers, function(e) {
                return "applyStyle" === e.name
            }).gpuAcceleration;
        void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
        var s = void 0 !== r ? r : t.gpuAcceleration,
            a = f(e.instance.popper),
            l = T(a),
            c = {
                position: o.position
            },
            u = {
                left: Math.floor(o.left),
                top: Math.floor(o.top),
                bottom: Math.floor(o.bottom),
                right: Math.floor(o.right)
            },
            d = "bottom" === n ? "top" : "bottom",
            h = "right" === i ? "left" : "right",
            p = M("transform"),
            g = void 0,
            m = void 0;
        if (m = "bottom" === d ? -l.height + u.bottom : u.top, g = "right" === h ? -l.width + u.right : u.left, s && p)
            c[p] = "translate3d(" + g + "px, " + m + "px, 0)", c[d] = 0, c[h] = 0, c.willChange = "transform";
        else {
            var v = "bottom" === d ? -1 : 1,
                _ = "right" === h ? -1 : 1;
            c[d] = m * v, c[h] = g * _, c.willChange = d + ", " + h
        }
        var E = {
            "x-placement": e.placement
        };
        return e.attributes = Oe({}, E, e.attributes), e.styles = Oe({}, c, e.styles), e.arrowStyles = Oe({}, e.offsets.arrow, e.arrowStyles), e
    }
    function J(e, t, n) {
        var i = P(e, function(e) {
                return e.name === t
            }),
            o = !!i && e.some(function(e) {
                return e.name === n && e.enabled && e.order < i.order
            });
        if (!o) {
            var r = "`" + t + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
        }
        return o
    }
    function Z(e, t) {
        var n;
        if (!J(e.instance.modifiers, "arrow", "keepTogether"))
            return e;
        var i = t.element;
        if ("string" == typeof i) {
            if (!(i = e.instance.popper.querySelector(i)))
                return e
        } else if (!e.instance.popper.contains(i))
            return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
        var o = e.placement.split("-")[0],
            r = e.offsets,
            s = r.popper,
            a = r.reference,
            l = -1 !== ["left", "right"].indexOf(o),
            u = l ? "height" : "width",
            d = l ? "Top" : "Left",
            f = d.toLowerCase(),
            h = l ? "left" : "top",
            p = l ? "bottom" : "right",
            g = N(i)[u];
        a[p] - g < s[f] && (e.offsets.popper[f] -= s[f] - (a[p] - g)), a[f] + g > s[p] && (e.offsets.popper[f] += a[f] + g - s[p]), e.offsets.popper = b(e.offsets.popper);
        var m = a[f] + a[u] / 2 - g / 2,
            v = c(e.instance.popper),
            _ = parseFloat(v["margin" + d], 10),
            E = parseFloat(v["border" + d + "Width"], 10),
            y = m - e.offsets.popper[f] - _ - E;
        return y = Math.max(Math.min(s[u] - g, y), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, Ie(n, f, Math.round(y)), Ie(n, h, ""), n), e
    }
    function ee(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e
    }
    function te(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = De.indexOf(e),
            i = De.slice(n + 1).concat(De.slice(0, n));
        return t ? i.reverse() : i
    }
    function ne(e, t) {
        if (H(e.instance.modifiers, "inner"))
            return e;
        if (e.flipped && e.placement === e.originalPlacement)
            return e;
        var n = I(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
            i = e.placement.split("-")[0],
            o = R(i),
            r = e.placement.split("-")[1] || "",
            s = [];
        switch (t.behavior) {
        case Ne.FLIP:
            s = [i, o];
            break;
        case Ne.CLOCKWISE:
            s = te(i);
            break;
        case Ne.COUNTERCLOCKWISE:
            s = te(i, !0);
            break;
        default:
            s = t.behavior
        }
        return s.forEach(function(a, l) {
            if (i !== a || s.length === l + 1)
                return e;
            i = e.placement.split("-")[0], o = R(i);
            var c = e.offsets.popper,
                u = e.offsets.reference,
                d = Math.floor,
                f = "left" === i && d(c.right) > d(u.left) || "right" === i && d(c.left) < d(u.right) || "top" === i && d(c.bottom) > d(u.top) || "bottom" === i && d(c.top) < d(u.bottom),
                h = d(c.left) < d(n.left),
                p = d(c.right) > d(n.right),
                g = d(c.top) < d(n.top),
                m = d(c.bottom) > d(n.bottom),
                v = "left" === i && h || "right" === i && p || "top" === i && g || "bottom" === i && m,
                _ = -1 !== ["top", "bottom"].indexOf(i),
                E = !!t.flipVariations && (_ && "start" === r && h || _ && "end" === r && p || !_ && "start" === r && g || !_ && "end" === r && m);
            (f || v || E) && (e.flipped = !0, (f || v) && (i = s[l + 1]), E && (r = ee(r)), e.placement = i + (r ? "-" + r : ""), e.offsets.popper = Oe({}, e.offsets.popper, L(e.instance.popper, e.offsets.reference, e.placement)), e = k(e.instance.modifiers, e, "flip"))
        }), e
    }
    function ie(e) {
        var t = e.offsets,
            n = t.popper,
            i = t.reference,
            o = e.placement.split("-")[0],
            r = Math.floor,
            s = -1 !== ["top", "bottom"].indexOf(o),
            a = s ? "right" : "bottom",
            l = s ? "left" : "top",
            c = s ? "width" : "height";
        return n[a] < r(i[l]) && (e.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (e.offsets.popper[l] = r(i[a])), e
    }
    function oe(e, t, n, i) {
        var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +o[1],
            s = o[2];
        if (!r)
            return e;
        if (0 === s.indexOf("%")) {
            var a = void 0;
            switch (s) {
            case "%p":
                a = n;
                break;
            case "%":
            case "%r":
            default:
                a = i
            }
            return b(a)[t] / 100 * r
        }
        if ("vh" === s || "vw" === s) {
            return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r
        }
        return r
    }
    function re(e, t, n, i) {
        var o = [0, 0],
            r = -1 !== ["right", "left"].indexOf(i),
            s = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            a = s.indexOf(P(s, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
        return c = c.map(function(e, i) {
            var o = (1 === i ? !r : r) ? "height" : "width",
                s = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return oe(e, o, t, n)
            })
        }), c.forEach(function(e, t) {
            e.forEach(function(n, i) {
                $(n) && (o[t] += n * ("-" === e[i - 1] ? -1 : 1))
            })
        }), o
    }
    function se(e, t) {
        var n = t.offset,
            i = e.placement,
            o = e.offsets,
            r = o.popper,
            s = o.reference,
            a = i.split("-")[0],
            l = void 0;
        return l = $(+n) ? [+n, 0] : re(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), e.popper = r, e
    }
    function ae(e, t) {
        var n = t.boundariesElement || f(e.instance.popper);
        e.instance.reference === n && (n = f(n));
        var i = I(e.instance.popper, e.instance.reference, t.padding, n);
        t.boundaries = i;
        var o = t.priority,
            r = e.offsets.popper,
            s = {
                primary: function(e) {
                    var n = r[e];
                    return r[e] < i[e] && !t.escapeWithReference && (n = Math.max(r[e], i[e])), Ie({}, e, n)
                },
                secondary: function(e) {
                    var n = "right" === e ? "left" : "top",
                        o = r[n];
                    return r[e] > i[e] && !t.escapeWithReference && (o = Math.min(r[n], i[e] - ("right" === e ? r.width : r.height))), Ie({}, n, o)
                }
            };
        return o.forEach(function(e) {
            var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
            r = Oe({}, r, s[t](e))
        }), e.offsets.popper = r, e
    }
    function le(e) {
        var t = e.placement,
            n = t.split("-")[0],
            i = t.split("-")[1];
        if (i) {
            var o = e.offsets,
                r = o.reference,
                s = o.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                c = a ? "width" : "height",
                u = {
                    start: Ie({}, l, r[l]),
                    end: Ie({}, l, r[l] + r[c] - s[c])
                };
            e.offsets.popper = Oe({}, s, u[i])
        }
        return e
    }
    function ce(e) {
        if (!J(e.instance.modifiers, "hide", "preventOverflow"))
            return e;
        var t = e.offsets.reference,
            n = P(e.instance.modifiers, function(e) {
                return "preventOverflow" === e.name
            }).boundaries;
        if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
            if (!0 === e.hide)
                return e;
            e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
        } else {
            if (!1 === e.hide)
                return e;
            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
        }
        return e
    }
    function ue(e) {
        var t = e.placement,
            n = t.split("-")[0],
            i = e.offsets,
            o = i.popper,
            r = i.reference,
            s = -1 !== ["left", "right"].indexOf(n),
            a = -1 === ["top", "left"].indexOf(n);
        return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), e.placement = R(t), e.offsets.popper = b(o), e
    }
    t = t && t.hasOwnProperty("default") ? t.default : t;
    for (var de = function(e) {
            function t(e) {
                return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }
            function n() {
                return {
                    bindType: s.end,
                    delegateType: s.end,
                    handle: function(t) {
                        if (e(t.target).is(this))
                            return t.handleObj.handler.apply(this, arguments)
                    }
                }
            }
            function i() {
                return ("undefined" == typeof window || !window.QUnit) && {
                        end: "transitionend"
                    }
            }
            function o(t) {
                var n = this,
                    i = !1;
                return e(this).one(a.TRANSITION_END, function() {
                    i = !0
                }), setTimeout(function() {
                    i || a.triggerTransitionEnd(n)
                }, t), this
            }
            function r(t) {
                return t = "function" == typeof e.escapeSelector ? e.escapeSelector(t).substr(1) : t.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")
            }
            var s = !1,
                a = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(e) {
                        do {
                            e += ~~(1e6 * Math.random())
                        } while (document.getElementById(e));
                        return e
                    },
                    getSelectorFromElement: function(t) {
                        var n = t.getAttribute("data-target");
                        n && "#" !== n || (n = t.getAttribute("href") || ""), "#" === n.charAt(0) && (n = r(n));
                        try {
                            return e(document).find(n).length > 0 ? n : null
                        } catch (e) {
                            return null
                        }
                    },
                    reflow: function(e) {
                        return e.offsetHeight
                    },
                    triggerTransitionEnd: function(t) {
                        e(t).trigger(s.end)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(s)
                    },
                    isElement: function(e) {
                        return (e[0] || e).nodeType
                    },
                    typeCheckConfig: function(e, n, i) {
                        for (var o in i)
                            if (Object.prototype.hasOwnProperty.call(i, o)) {
                                var r = i[o],
                                    s = n[o],
                                    l = s && a.isElement(s) ? "element" : t(s);
                                if (!new RegExp(r).test(l))
                                    throw new Error(e.toUpperCase() + ': Option "' + o + '" provided type "' + l + '" but expected type "' + r + '".')
                            }
                    }
                };
            return function() {
                s = i(), e.fn.emulateTransitionEnd = o, a.supportsTransitionEnd() && (e.event.special[a.TRANSITION_END] = n())
            }(), a
        }(t), fe = function(e) {
            var t = "alert",
                n = e.fn[t],
                o = {
                    DISMISS: '[data-dismiss="alert"]'
                },
                r = {
                    CLOSE: "close.bs.alert",
                    CLOSED: "closed.bs.alert",
                    CLICK_DATA_API: "click.bs.alert.data-api"
                },
                s = {
                    ALERT: "alert",
                    FADE: "fade",
                    SHOW: "show"
                },
                a = function() {
                    function t(e) {
                        this._element = e
                    }
                    var n = t.prototype;
                    return n.close = function(e) {
                        e = e || this._element;
                        var t = this._getRootElement(e);
                        this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
                    }, n.dispose = function() {
                        e.removeData(this._element, "bs.alert"), this._element = null
                    }, n._getRootElement = function(t) {
                        var n = de.getSelectorFromElement(t),
                            i = !1;
                        return n && (i = e(n)[0]), i || (i = e(t).closest("." + s.ALERT)[0]), i
                    }, n._triggerCloseEvent = function(t) {
                        var n = e.Event(r.CLOSE);
                        return e(t).trigger(n), n
                    }, n._removeElement = function(t) {
                        var n = this;
                        if (e(t).removeClass(s.SHOW), !de.supportsTransitionEnd() || !e(t).hasClass(s.FADE))
                            return void this._destroyElement(t);
                        e(t).one(de.TRANSITION_END, function(e) {
                            return n._destroyElement(t, e)
                        }).emulateTransitionEnd(150)
                    }, n._destroyElement = function(t) {
                        e(t).detach().trigger(r.CLOSED).remove()
                    }, t._jQueryInterface = function(n) {
                        return this.each(function() {
                            var i = e(this),
                                o = i.data("bs.alert");
                            o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this)
                        })
                    }, t._handleDismiss = function(e) {
                        return function(t) {
                            t && t.preventDefault(), e.close(this)
                        }
                    }, i(t, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), t
                }();
            return e(document).on(r.CLICK_DATA_API, o.DISMISS, a._handleDismiss(new a)), e.fn[t] = a._jQueryInterface, e.fn[t].Constructor = a, e.fn[t].noConflict = function() {
                return e.fn[t] = n, a._jQueryInterface
            }, a
        }(t), he = function(e) {
            var t = "button",
                n = e.fn[t],
                o = {
                    ACTIVE: "active",
                    BUTTON: "btn",
                    FOCUS: "focus"
                },
                r = {
                    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
                    DATA_TOGGLE: '[data-toggle="buttons"]',
                    INPUT: "input",
                    ACTIVE: ".active",
                    BUTTON: ".btn"
                },
                s = {
                    CLICK_DATA_API: "click.bs.button.data-api",
                    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
                },
                a = function() {
                    function t(e) {
                        this._element = e
                    }
                    var n = t.prototype;
                    return n.toggle = function() {
                        var t = !0,
                            n = !0,
                            i = e(this._element).closest(r.DATA_TOGGLE)[0];
                        if (i) {
                            var s = e(this._element).find(r.INPUT)[0];
                            if (s) {
                                if ("radio" === s.type)
                                    if (s.checked && e(this._element).hasClass(o.ACTIVE))
                                        t = !1;
                                    else {
                                        var a = e(i).find(r.ACTIVE)[0];
                                        a && e(a).removeClass(o.ACTIVE)
                                    }
                                if (t) {
                                    if (s.hasAttribute("disabled") || i.hasAttribute("disabled") || s.classList.contains("disabled") || i.classList.contains("disabled"))
                                        return;
                                    s.checked = !e(this._element).hasClass(o.ACTIVE), e(s).trigger("change")
                                }
                                s.focus(), n = !1
                            }
                        }
                        n && this._element.setAttribute("aria-pressed", !e(this._element).hasClass(o.ACTIVE)), t && e(this._element).toggleClass(o.ACTIVE)
                    }, n.dispose = function() {
                        e.removeData(this._element, "bs.button"), this._element = null
                    }, t._jQueryInterface = function(n) {
                        return this.each(function() {
                            var i = e(this).data("bs.button");
                            i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
                        })
                    }, i(t, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), t
                }();
            return e(document).on(s.CLICK_DATA_API, r.DATA_TOGGLE_CARROT, function(t) {
                t.preventDefault();
                var n = t.target;
                e(n).hasClass(o.BUTTON) || (n = e(n).closest(r.BUTTON)), a._jQueryInterface.call(e(n), "toggle")
            }).on(s.FOCUS_BLUR_DATA_API, r.DATA_TOGGLE_CARROT, function(t) {
                var n = e(t.target).closest(r.BUTTON)[0];
                e(n).toggleClass(o.FOCUS, /^focus(in)?$/.test(t.type))
            }), e.fn[t] = a._jQueryInterface, e.fn[t].Constructor = a, e.fn[t].noConflict = function() {
                return e.fn[t] = n, a._jQueryInterface
            }, a
        }(t), pe = (function(e) {
            var t = "carousel",
                n = "bs.carousel",
                r = "." + n,
                s = e.fn[t],
                a = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                l = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                c = {
                    NEXT: "next",
                    PREV: "prev",
                    LEFT: "left",
                    RIGHT: "right"
                },
                u = {
                    SLIDE: "slide" + r,
                    SLID: "slid" + r,
                    KEYDOWN: "keydown" + r,
                    MOUSEENTER: "mouseenter" + r,
                    MOUSELEAVE: "mouseleave" + r,
                    TOUCHEND: "touchend" + r,
                    LOAD_DATA_API: "load.bs.carousel.data-api",
                    CLICK_DATA_API: "click.bs.carousel.data-api"
                },
                d = {
                    CAROUSEL: "carousel",
                    ACTIVE: "active",
                    SLIDE: "slide",
                    RIGHT: "carousel-item-right",
                    LEFT: "carousel-item-left",
                    NEXT: "carousel-item-next",
                    PREV: "carousel-item-prev",
                    ITEM: "carousel-item"
                },
                f = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                h = function() {
                    function s(t, n) {
                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = e(t)[0], this._indicatorsElement = e(this._element).find(f.INDICATORS)[0], this._addEventListeners()
                    }
                    var h = s.prototype;
                    return h.next = function() {
                        this._isSliding || this._slide(c.NEXT)
                    }, h.nextWhenVisible = function() {
                        !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
                    }, h.prev = function() {
                        this._isSliding || this._slide(c.PREV)
                    }, h.pause = function(t) {
                        t || (this._isPaused = !0), e(this._element).find(f.NEXT_PREV)[0] && de.supportsTransitionEnd() && (de.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, h.cycle = function(e) {
                        e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, h.to = function(t) {
                        var n = this;
                        this._activeElement = e(this._element).find(f.ACTIVE_ITEM)[0];
                        var i = this._getItemIndex(this._activeElement);
                        if (!(t > this._items.length - 1 || t < 0)) {
                            if (this._isSliding)
                                return void e(this._element).one(u.SLID, function() {
                                    return n.to(t)
                                });
                            if (i === t)
                                return this.pause(), void this.cycle();
                            var o = t > i ? c.NEXT : c.PREV;
                            this._slide(o, this._items[t])
                        }
                    }, h.dispose = function() {
                        e(this._element).off(r), e.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, h._getConfig = function(e) {
                        return e = o({}, a, e), de.typeCheckConfig(t, e, l), e
                    }, h._addEventListeners = function() {
                        var t = this;
                        this._config.keyboard && e(this._element).on(u.KEYDOWN, function(e) {
                            return t._keydown(e)
                        }), "hover" === this._config.pause && (e(this._element).on(u.MOUSEENTER, function(e) {
                            return t.pause(e)
                        }).on(u.MOUSELEAVE, function(e) {
                            return t.cycle(e)
                        }), "ontouchstart" in document.documentElement && e(this._element).on(u.TOUCHEND, function() {
                            t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                                return t.cycle(e)
                            }, 500 + t._config.interval)
                        }))
                    }, h._keydown = function(e) {
                        if (!/input|textarea/i.test(e.target.tagName))
                            switch (e.which) {
                            case 37:
                                e.preventDefault(), this.prev();
                                break;
                            case 39:
                                e.preventDefault(), this.next()
                            }
                    }, h._getItemIndex = function(t) {
                        return this._items = e.makeArray(e(t).parent().find(f.ITEM)), this._items.indexOf(t)
                    }, h._getItemByDirection = function(e, t) {
                        var n = e === c.NEXT,
                            i = e === c.PREV,
                            o = this._getItemIndex(t),
                            r = this._items.length - 1;
                        if ((i && 0 === o || n && o === r) && !this._config.wrap)
                            return t;
                        var s = e === c.PREV ? -1 : 1,
                            a = (o + s) % this._items.length;
                        return -1 === a ? this._items[this._items.length - 1] : this._items[a]
                    }, h._triggerSlideEvent = function(t, n) {
                        var i = this._getItemIndex(t),
                            o = this._getItemIndex(e(this._element).find(f.ACTIVE_ITEM)[0]),
                            r = e.Event(u.SLIDE, {
                                relatedTarget: t,
                                direction: n,
                                from: o,
                                to: i
                            });
                        return e(this._element).trigger(r), r
                    }, h._setActiveIndicatorElement = function(t) {
                        if (this._indicatorsElement) {
                            e(this._indicatorsElement).find(f.ACTIVE).removeClass(d.ACTIVE);
                            var n = this._indicatorsElement.children[this._getItemIndex(t)];
                            n && e(n).addClass(d.ACTIVE)
                        }
                    }, h._slide = function(t, n) {
                        var i,
                            o,
                            r,
                            s = this,
                            a = e(this._element).find(f.ACTIVE_ITEM)[0],
                            l = this._getItemIndex(a),
                            h = n || a && this._getItemByDirection(t, a),
                            p = this._getItemIndex(h),
                            g = Boolean(this._interval);
                        if (t === c.NEXT ? (i = d.LEFT, o = d.NEXT, r = c.LEFT) : (i = d.RIGHT, o = d.PREV, r = c.RIGHT), h && e(h).hasClass(d.ACTIVE))
                            return void (this._isSliding = !1);
                        if (!this._triggerSlideEvent(h, r).isDefaultPrevented() && a && h) {
                            this._isSliding = !0, g && this.pause(), this._setActiveIndicatorElement(h);
                            var m = e.Event(u.SLID, {
                                relatedTarget: h,
                                direction: r,
                                from: l,
                                to: p
                            });
                            de.supportsTransitionEnd() && e(this._element).hasClass(d.SLIDE) ? (e(h).addClass(o), de.reflow(h), e(a).addClass(i), e(h).addClass(i), e(a).one(de.TRANSITION_END, function() {
                                e(h).removeClass(i + " " + o).addClass(d.ACTIVE), e(a).removeClass(d.ACTIVE + " " + o + " " + i), s._isSliding = !1, setTimeout(function() {
                                    return e(s._element).trigger(m)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (e(a).removeClass(d.ACTIVE), e(h).addClass(d.ACTIVE), this._isSliding = !1, e(this._element).trigger(m)), g && this.cycle()
                        }
                    }, s._jQueryInterface = function(t) {
                        return this.each(function() {
                            var i = e(this).data(n),
                                r = o({}, a, e(this).data());
                            "object" == typeof t && (r = o({}, r, t));
                            var l = "string" == typeof t ? t : r.slide;
                            if (i || (i = new s(this, r), e(this).data(n, i)), "number" == typeof t)
                                i.to(t);
                            else if ("string" == typeof l) {
                                if (void 0 === i[l])
                                    throw new TypeError('No method named "' + l + '"');
                                i[l]()
                            } else
                                r.interval && (i.pause(), i.cycle())
                        })
                    }, s._dataApiClickHandler = function(t) {
                        var i = de.getSelectorFromElement(this);
                        if (i) {
                            var r = e(i)[0];
                            if (r && e(r).hasClass(d.CAROUSEL)) {
                                var a = o({}, e(r).data(), e(this).data()),
                                    l = this.getAttribute("data-slide-to");
                                l && (a.interval = !1), s._jQueryInterface.call(e(r), a), l && e(r).data(n).to(l), t.preventDefault()
                            }
                        }
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), s
                }();
            return e(document).on(u.CLICK_DATA_API, f.DATA_SLIDE, h._dataApiClickHandler), e(window).on(u.LOAD_DATA_API, function() {
                e(f.DATA_RIDE).each(function() {
                    var t = e(this);
                    h._jQueryInterface.call(t, t.data())
                })
            }), e.fn[t] = h._jQueryInterface, e.fn[t].Constructor = h, e.fn[t].noConflict = function() {
                return e.fn[t] = s, h._jQueryInterface
            }, h
        }(t)), ge = function(e) {
            var t = "collapse",
                n = "bs.collapse",
                r = e.fn[t],
                s = {
                    toggle: !0,
                    parent: ""
                },
                a = {
                    toggle: "boolean",
                    parent: "(string|element)"
                },
                l = {
                    SHOW: "show.bs.collapse",
                    SHOWN: "shown.bs.collapse",
                    HIDE: "hide.bs.collapse",
                    HIDDEN: "hidden.bs.collapse",
                    CLICK_DATA_API: "click.bs.collapse.data-api"
                },
                c = {
                    SHOW: "show",
                    COLLAPSE: "collapse",
                    COLLAPSING: "collapsing",
                    COLLAPSED: "collapsed"
                },
                u = {
                    WIDTH: "width",
                    HEIGHT: "height"
                },
                d = {
                    ACTIVES: ".show, .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                f = function() {
                    function r(t, n) {
                        this._isTransitioning = !1, this._element = t, this._config = this._getConfig(n), this._triggerArray = e.makeArray(e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                        for (var i = e(d.DATA_TOGGLE), o = 0; o < i.length; o++) {
                            var r = i[o],
                                s = de.getSelectorFromElement(r);
                            null !== s && e(s).filter(t).length > 0 && (this._selector = s, this._triggerArray.push(r))
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    var f = r.prototype;
                    return f.toggle = function() {
                        e(this._element).hasClass(c.SHOW) ? this.hide() : this.show()
                    }, f.show = function() {
                        var t = this;
                        if (!this._isTransitioning && !e(this._element).hasClass(c.SHOW)) {
                            var i,
                                o;
                            if (this._parent && (i = e.makeArray(e(this._parent).find(d.ACTIVES).filter('[data-parent="' + this._config.parent + '"]')), 0 === i.length && (i = null)), !(i && (o = e(i).not(this._selector).data(n)) && o._isTransitioning)) {
                                var s = e.Event(l.SHOW);
                                if (e(this._element).trigger(s), !s.isDefaultPrevented()) {
                                    i && (r._jQueryInterface.call(e(i).not(this._selector), "hide"), o || e(i).data(n, null));
                                    var a = this._getDimension();
                                    e(this._element).removeClass(c.COLLAPSE).addClass(c.COLLAPSING), this._element.style[a] = 0, this._triggerArray.length > 0 && e(this._triggerArray).removeClass(c.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var u = function() {
                                        e(t._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).addClass(c.SHOW), t._element.style[a] = "", t.setTransitioning(!1), e(t._element).trigger(l.SHOWN)
                                    };
                                    if (!de.supportsTransitionEnd())
                                        return void u();
                                    var f = a[0].toUpperCase() + a.slice(1),
                                        h = "scroll" + f;
                                    e(this._element).one(de.TRANSITION_END, u).emulateTransitionEnd(600), this._element.style[a] = this._element[h] + "px"
                                }
                            }
                        }
                    }, f.hide = function() {
                        var t = this;
                        if (!this._isTransitioning && e(this._element).hasClass(c.SHOW)) {
                            var n = e.Event(l.HIDE);
                            if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                                var i = this._getDimension();
                                if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", de.reflow(this._element), e(this._element).addClass(c.COLLAPSING).removeClass(c.COLLAPSE).removeClass(c.SHOW), this._triggerArray.length > 0)
                                    for (var o = 0; o < this._triggerArray.length; o++) {
                                        var r = this._triggerArray[o],
                                            s = de.getSelectorFromElement(r);
                                        if (null !== s) {
                                            var a = e(s);
                                            a.hasClass(c.SHOW) || e(r).addClass(c.COLLAPSED).attr("aria-expanded", !1)
                                        }
                                    }
                                this.setTransitioning(!0);
                                var u = function() {
                                    t.setTransitioning(!1), e(t._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).trigger(l.HIDDEN)
                                };
                                if (this._element.style[i] = "", !de.supportsTransitionEnd())
                                    return void u();
                                e(this._element).one(de.TRANSITION_END, u).emulateTransitionEnd(600)
                            }
                        }
                    }, f.setTransitioning = function(e) {
                        this._isTransitioning = e
                    }, f.dispose = function() {
                        e.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, f._getConfig = function(e) {
                        return e = o({}, s, e), e.toggle = Boolean(e.toggle), de.typeCheckConfig(t, e, a), e
                    }, f._getDimension = function() {
                        return e(this._element).hasClass(u.WIDTH) ? u.WIDTH : u.HEIGHT
                    }, f._getParent = function() {
                        var t = this,
                            n = null;
                        de.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = e(this._config.parent)[0];
                        var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return e(n).find(i).each(function(e, n) {
                            t._addAriaAndCollapsedClass(r._getTargetFromElement(n), [n])
                        }), n
                    }, f._addAriaAndCollapsedClass = function(t, n) {
                        if (t) {
                            var i = e(t).hasClass(c.SHOW);
                            n.length > 0 && e(n).toggleClass(c.COLLAPSED, !i).attr("aria-expanded", i)
                        }
                    }, r._getTargetFromElement = function(t) {
                        var n = de.getSelectorFromElement(t);
                        return n ? e(n)[0] : null
                    }, r._jQueryInterface = function(t) {
                        return this.each(function() {
                            var i = e(this),
                                a = i.data(n),
                                l = o({}, s, i.data(), "object" == typeof t && t)
                                ;
                            if (!a && l.toggle && /show|hide/.test(t) && (l.toggle = !1), a || (a = new r(this, l), i.data(n, a)), "string" == typeof t) {
                                if (void 0 === a[t])
                                    throw new TypeError('No method named "' + t + '"');
                                a[t]()
                            }
                        })
                    }, i(r, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return s
                        }
                    }]), r
                }();
            return e(document).on(l.CLICK_DATA_API, d.DATA_TOGGLE, function(t) {
                "A" === t.currentTarget.tagName && t.preventDefault();
                var i = e(this),
                    o = de.getSelectorFromElement(this);
                e(o).each(function() {
                    var t = e(this),
                        o = t.data(n),
                        r = o ? "toggle" : i.data();
                    f._jQueryInterface.call(t, r)
                })
            }), e.fn[t] = f._jQueryInterface, e.fn[t].Constructor = f, e.fn[t].noConflict = function() {
                return e.fn[t] = r, f._jQueryInterface
            }, f
        }(t), me = "undefined" != typeof window && "undefined" != typeof document, ve = ["Edge", "Trident", "Firefox"], _e = 0, Ee = 0; Ee < ve.length; Ee += 1)
        if (me && navigator.userAgent.indexOf(ve[Ee]) >= 0) {
            _e = 1;
            break
        }
    var ye = me && window.Promise,
        be = ye ? s : a,
        Te = void 0,
        we = function() {
            return void 0 === Te && (Te = -1 !== navigator.appVersion.indexOf("MSIE 10")), Te
        },
        Ce = function(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        },
        Se = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        Ie = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        Oe = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        },
        Ae = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        De = Ae.slice(3),
        Ne = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        Re = {
            shift: {
                order: 100,
                enabled: !0,
                fn: le
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: se,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: ae,
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: ie
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: Z,
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: ne,
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: ue
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: ce
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: X,
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: Y,
                onLoad: q,
                gpuAcceleration: void 0
            }
        },
        Le = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: Re
        },
        Pe = function() {
            function e(t, n) {
                var i = this,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Ce(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = be(this.update.bind(this)), this.options = Oe({}, e.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Oe({}, e.Defaults.modifiers, o.modifiers)).forEach(function(t) {
                    i.options.modifiers[t] = Oe({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return Oe({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && l(e.onLoad) && e.onLoad(i.reference, i.popper, i.options, e, i.state)
                }), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return Se(e, [{
                key: "update",
                value: function() {
                    return x.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return F.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return V.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return G.call(this)
                }
            }]), e
        }();
    Pe.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Pe.placements = Ae, Pe.Defaults = Le;
    var je = function(e) {
            var t = "dropdown",
                n = "bs.dropdown",
                r = "." + n,
                s = e.fn[t],
                a = new RegExp("38|40|27"),
                l = {
                    HIDE: "hide" + r,
                    HIDDEN: "hidden" + r,
                    SHOW: "show" + r,
                    SHOWN: "shown" + r,
                    CLICK: "click" + r,
                    CLICK_DATA_API: "click.bs.dropdown.data-api",
                    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
                    KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
                },
                c = {
                    DISABLED: "disabled",
                    SHOW: "show",
                    DROPUP: "dropup",
                    DROPRIGHT: "dropright",
                    DROPLEFT: "dropleft",
                    MENURIGHT: "dropdown-menu-right",
                    MENULEFT: "dropdown-menu-left",
                    POSITION_STATIC: "position-static"
                },
                u = {
                    DATA_TOGGLE: '[data-toggle="dropdown"]',
                    FORM_CHILD: ".dropdown form",
                    MENU: ".dropdown-menu",
                    NAVBAR_NAV: ".navbar-nav",
                    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
                },
                d = {
                    TOP: "top-start",
                    TOPEND: "top-end",
                    BOTTOM: "bottom-start",
                    BOTTOMEND: "bottom-end",
                    RIGHT: "right-start",
                    RIGHTEND: "right-end",
                    LEFT: "left-start",
                    LEFTEND: "left-end"
                },
                f = {
                    offset: 0,
                    flip: !0,
                    boundary: "scrollParent"
                },
                h = {
                    offset: "(number|string|function)",
                    flip: "boolean",
                    boundary: "(string|element)"
                },
                p = function() {
                    function s(e, t) {
                        this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var p = s.prototype;
                    return p.toggle = function() {
                        if (!this._element.disabled && !e(this._element).hasClass(c.DISABLED)) {
                            var t = s._getParentFromElement(this._element),
                                n = e(this._menu).hasClass(c.SHOW);
                            if (s._clearMenus(), !n) {
                                var i = {
                                        relatedTarget: this._element
                                    },
                                    o = e.Event(l.SHOW, i);
                                if (e(t).trigger(o), !o.isDefaultPrevented()) {
                                    if (!this._inNavbar) {
                                        if (void 0 === Pe)
                                            throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                        var r = this._element;
                                        e(t).hasClass(c.DROPUP) && (e(this._menu).hasClass(c.MENULEFT) || e(this._menu).hasClass(c.MENURIGHT)) && (r = t), "scrollParent" !== this._config.boundary && e(t).addClass(c.POSITION_STATIC), this._popper = new Pe(r, this._menu, this._getPopperConfig())
                                    }
                                    "ontouchstart" in document.documentElement && 0 === e(t).closest(u.NAVBAR_NAV).length && e("body").children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(c.SHOW), e(t).toggleClass(c.SHOW).trigger(e.Event(l.SHOWN, i))
                                }
                            }
                        }
                    }, p.dispose = function() {
                        e.removeData(this._element, n), e(this._element).off(r), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                    }, p.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, p._addEventListeners = function() {
                        var t = this;
                        e(this._element).on(l.CLICK, function(e) {
                            e.preventDefault(), e.stopPropagation(), t.toggle()
                        })
                    }, p._getConfig = function(n) {
                        return n = o({}, this.constructor.Default, e(this._element).data(), n), de.typeCheckConfig(t, n, this.constructor.DefaultType), n
                    }, p._getMenuElement = function() {
                        if (!this._menu) {
                            var t = s._getParentFromElement(this._element);
                            this._menu = e(t).find(u.MENU)[0]
                        }
                        return this._menu
                    }, p._getPlacement = function() {
                        var t = e(this._element).parent(),
                            n = d.BOTTOM;
                        return t.hasClass(c.DROPUP) ? (n = d.TOP, e(this._menu).hasClass(c.MENURIGHT) && (n = d.TOPEND)) : t.hasClass(c.DROPRIGHT) ? n = d.RIGHT : t.hasClass(c.DROPLEFT) ? n = d.LEFT : e(this._menu).hasClass(c.MENURIGHT) && (n = d.BOTTOMEND), n
                    }, p._detectNavbar = function() {
                        return e(this._element).closest(".navbar").length > 0
                    }, p._getPopperConfig = function() {
                        var e = this,
                            t = {};
                        return "function" == typeof this._config.offset ? t.fn = function(t) {
                            return t.offsets = o({}, t.offsets, e._config.offset(t.offsets) || {}), t
                        } : t.offset = this._config.offset, {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: t,
                                flip: {
                                    enabled: this._config.flip
                                },
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        }
                    }, s._jQueryInterface = function(t) {
                        return this.each(function() {
                            var i = e(this).data(n),
                                o = "object" == typeof t ? t : null;
                            if (i || (i = new s(this, o), e(this).data(n, i)), "string" == typeof t) {
                                if (void 0 === i[t])
                                    throw new TypeError('No method named "' + t + '"');
                                i[t]()
                            }
                        })
                    }, s._clearMenus = function(t) {
                        if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                            for (var i = e.makeArray(e(u.DATA_TOGGLE)), o = 0; o < i.length; o++) {
                                var r = s._getParentFromElement(i[o]),
                                    a = e(i[o]).data(n),
                                    d = {
                                        relatedTarget: i[o]
                                    };
                                if (a) {
                                    var f = a._menu;
                                    if (e(r).hasClass(c.SHOW) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && e.contains(r, t.target))) {
                                        var h = e.Event(l.HIDE, d);
                                        e(r).trigger(h), h.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e("body").children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), e(f).removeClass(c.SHOW), e(r).removeClass(c.SHOW).trigger(e.Event(l.HIDDEN, d)))
                                    }
                                }
                            }
                    }, s._getParentFromElement = function(t) {
                        var n,
                            i = de.getSelectorFromElement(t);
                        return i && (n = e(i)[0]), n || t.parentNode
                    }, s._dataApiKeydownHandler = function(t) {
                        if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || e(t.target).closest(u.MENU).length)) : a.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !e(this).hasClass(c.DISABLED))) {
                            var n = s._getParentFromElement(this),
                                i = e(n).hasClass(c.SHOW);
                            if (!i && (27 !== t.which || 32 !== t.which) || i && (27 === t.which || 32 === t.which)) {
                                if (27 === t.which) {
                                    var o = e(n).find(u.DATA_TOGGLE)[0];
                                    e(o).trigger("focus")
                                }
                                return void e(this).trigger("click")
                            }
                            var r = e(n).find(u.VISIBLE_ITEMS).get();
                            if (0 !== r.length) {
                                var l = r.indexOf(t.target);
                                38 === t.which && l > 0 && l--, 40 === t.which && l < r.length - 1 && l++, l < 0 && (l = 0), r[l].focus()
                            }
                        }
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return f
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return h
                        }
                    }]), s
                }();
            return e(document).on(l.KEYDOWN_DATA_API, u.DATA_TOGGLE, p._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API, u.MENU, p._dataApiKeydownHandler).on(l.CLICK_DATA_API + " " + l.KEYUP_DATA_API, p._clearMenus).on(l.CLICK_DATA_API, u.DATA_TOGGLE, function(t) {
                t.preventDefault(), t.stopPropagation(), p._jQueryInterface.call(e(this), "toggle")
            }).on(l.CLICK_DATA_API, u.FORM_CHILD, function(e) {
                e.stopPropagation()
            }), e.fn[t] = p._jQueryInterface, e.fn[t].Constructor = p, e.fn[t].noConflict = function() {
                return e.fn[t] = s, p._jQueryInterface
            }, p
        }(t),
        ke = function(e) {
            var t = "modal",
                n = ".bs.modal",
                r = e.fn[t],
                s = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                a = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                l = {
                    HIDE: "hide.bs.modal",
                    HIDDEN: "hidden.bs.modal",
                    SHOW: "show.bs.modal",
                    SHOWN: "shown.bs.modal",
                    FOCUSIN: "focusin.bs.modal",
                    RESIZE: "resize.bs.modal",
                    CLICK_DISMISS: "click.dismiss.bs.modal",
                    KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                    MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                    MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                    CLICK_DATA_API: "click.bs.modal.data-api"
                },
                c = {
                    SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                    BACKDROP: "modal-backdrop",
                    OPEN: "modal-open",
                    FADE: "fade",
                    SHOW: "show"
                },
                u = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    STICKY_CONTENT: ".sticky-top",
                    NAVBAR_TOGGLER: ".navbar-toggler"
                },
                d = function() {
                    function r(t, n) {
                        this._config = this._getConfig(n), this._element = t, this._dialog = e(t).find(u.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    var d = r.prototype;
                    return d.toggle = function(e) {
                        return this._isShown ? this.hide() : this.show(e)
                    }, d.show = function(t) {
                        var n = this;
                        if (!this._isTransitioning && !this._isShown) {
                            de.supportsTransitionEnd() && e(this._element).hasClass(c.FADE) && (this._isTransitioning = !0);
                            var i = e.Event(l.SHOW, {
                                relatedTarget: t
                            });
                            e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), e(document.body).addClass(c.OPEN), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(l.CLICK_DISMISS, u.DATA_DISMISS, function(e) {
                                return n.hide(e)
                            }), e(this._dialog).on(l.MOUSEDOWN_DISMISS, function() {
                                e(n._element).one(l.MOUSEUP_DISMISS, function(t) {
                                    e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return n._showElement(t)
                            }))
                        }
                    }, d.hide = function(t) {
                        var n = this;
                        if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                            var i = e.Event(l.HIDE);
                            if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                                this._isShown = !1;
                                var o = de.supportsTransitionEnd() && e(this._element).hasClass(c.FADE);
                                o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(l.FOCUSIN), e(this._element).removeClass(c.SHOW), e(this._element).off(l.CLICK_DISMISS), e(this._dialog).off(l.MOUSEDOWN_DISMISS), o ? e(this._element).one(de.TRANSITION_END, function(e) {
                                    return n._hideModal(e)
                                }).emulateTransitionEnd(300) : this._hideModal()
                            }
                        }
                    }, d.dispose = function() {
                        e.removeData(this._element, "bs.modal"), e(window, document, this._element, this._backdrop).off(n), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, d.handleUpdate = function() {
                        this._adjustDialog()
                    }, d._getConfig = function(e) {
                        return e = o({}, s, e), de.typeCheckConfig(t, e, a), e
                    }, d._showElement = function(t) {
                        var n = this,
                            i = de.supportsTransitionEnd() && e(this._element).hasClass(c.FADE);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && de.reflow(this._element), e(this._element).addClass(c.SHOW), this._config.focus && this._enforceFocus();
                        var o = e.Event(l.SHOWN, {
                                relatedTarget: t
                            }),
                            r = function() {
                                n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o)
                            };
                        i ? e(this._dialog).one(de.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                    }, d._enforceFocus = function() {
                        var t = this;
                        e(document).off(l.FOCUSIN).on(l.FOCUSIN, function(n) {
                            document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                        })
                    }, d._setEscapeEvent = function() {
                        var t = this;
                        this._isShown && this._config.keyboard ? e(this._element).on(l.KEYDOWN_DISMISS, function(e) {
                            27 === e.which && (e.preventDefault(), t.hide())
                        }) : this._isShown || e(this._element).off(l.KEYDOWN_DISMISS)
                    }, d._setResizeEvent = function() {
                        var t = this;
                        this._isShown ? e(window).on(l.RESIZE, function(e) {
                            return t.handleUpdate(e)
                        }) : e(window).off(l.RESIZE)
                    }, d._hideModal = function() {
                        var t = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            e(document.body).removeClass(c.OPEN), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(l.HIDDEN)
                        })
                    }, d._removeBackdrop = function() {
                        this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
                    }, d._showBackdrop = function(t) {
                        var n = this,
                            i = e(this._element).hasClass(c.FADE) ? c.FADE : "";
                        if (this._isShown && this._config.backdrop) {
                            var o = de.supportsTransitionEnd() && i;
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = c.BACKDROP, i && e(this._backdrop).addClass(i), e(this._backdrop).appendTo(document.body), e(this._element).on(l.CLICK_DISMISS, function(e) {
                                if (n._ignoreBackdropClick)
                                    return void (n._ignoreBackdropClick = !1);
                                e.target === e.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                            }), o && de.reflow(this._backdrop), e(this._backdrop).addClass(c.SHOW), !t)
                                return;
                            if (!o)
                                return void t();
                            e(this._backdrop).one(de.TRANSITION_END, t).emulateTransitionEnd(150)
                        } else if (!this._isShown && this._backdrop) {
                            e(this._backdrop).removeClass(c.SHOW);
                            var r = function() {
                                n._removeBackdrop(), t && t()
                            };
                            de.supportsTransitionEnd() && e(this._element).hasClass(c.FADE) ? e(this._backdrop).one(de.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                        } else
                            t && t()
                    }, d._adjustDialog = function() {
                        var e = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, d._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, d._checkScrollbar = function() {
                        var e = document.body.getBoundingClientRect();
                        this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, d._setScrollbar = function() {
                        var t = this;
                        if (this._isBodyOverflowing) {
                            e(u.FIXED_CONTENT).each(function(n, i) {
                                var o = e(i)[0].style.paddingRight,
                                    r = e(i).css("padding-right");
                                e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
                            }), e(u.STICKY_CONTENT).each(function(n, i) {
                                var o = e(i)[0].style.marginRight,
                                    r = e(i).css("margin-right");
                                e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
                            }), e(u.NAVBAR_TOGGLER).each(function(n, i) {
                                var o = e(i)[0].style.marginRight,
                                    r = e(i).css("margin-right");
                                e(i).data("margin-right", o).css("margin-right", parseFloat(r) + t._scrollbarWidth + "px")
                            });
                            var n = document.body.style.paddingRight,
                                i = e("body").css("padding-right");
                            e("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                        }
                    }, d._resetScrollbar = function() {
                        e(u.FIXED_CONTENT).each(function(t, n) {
                            var i = e(n).data("padding-right");
                            void 0 !== i && e(n).css("padding-right", i).removeData("padding-right")
                        }), e(u.STICKY_CONTENT + ", " + u.NAVBAR_TOGGLER).each(function(t, n) {
                            var i = e(n).data("margin-right");
                            void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                        });
                        var t = e("body").data("padding-right");
                        void 0 !== t && e("body").css("padding-right", t).removeData("padding-right")
                    }, d._getScrollbarWidth = function() {
                        var e = document.createElement("div");
                        e.className = c.SCROLLBAR_MEASURER, document.body.appendChild(e);
                        var t = e.getBoundingClientRect().width - e.clientWidth;
                        return document.body.removeChild(e), t
                    }, r._jQueryInterface = function(t, n) {
                        return this.each(function() {
                            var i = e(this).data("bs.modal"),
                                s = o({}, r.Default, e(this).data(), "object" == typeof t && t);
                            if (i || (i = new r(this, s), e(this).data("bs.modal", i)), "string" == typeof t) {
                                if (void 0 === i[t])
                                    throw new TypeError('No method named "' + t + '"');
                                i[t](n)
                            } else
                                s.show && i.show(n)
                        })
                    }, i(r, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return s
                        }
                    }]), r
                }();
            return e(document).on(l.CLICK_DATA_API, u.DATA_TOGGLE, function(t) {
                var n,
                    i = this,
                    r = de.getSelectorFromElement(this);
                r && (n = e(r)[0]);
                var s = e(n).data("bs.modal") ? "toggle" : o({}, e(n).data(), e(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
                var a = e(n).one(l.SHOW, function(t) {
                    t.isDefaultPrevented() || a.one(l.HIDDEN, function() {
                        e(i).is(":visible") && i.focus()
                    })
                });
                d._jQueryInterface.call(e(n), s, this)
            }), e.fn[t] = d._jQueryInterface, e.fn[t].Constructor = d, e.fn[t].noConflict = function() {
                return e.fn[t] = r, d._jQueryInterface
            }, d
        }(t),
        xe = function(e) {
            var t = "tooltip",
                n = ".bs.tooltip",
                r = e.fn[t],
                s = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                a = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)",
                    boundary: "(string|element)"
                },
                l = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                },
                c = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: 0,
                    container: !1,
                    fallbackPlacement: "flip",
                    boundary: "scrollParent"
                },
                u = {
                    SHOW: "show",
                    OUT: "out"
                },
                d = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    INSERTED: "inserted" + n,
                    CLICK: "click" + n,
                    FOCUSIN: "focusin" + n,
                    FOCUSOUT: "focusout" + n,
                    MOUSEENTER: "mouseenter" + n,
                    MOUSELEAVE: "mouseleave" + n
                },
                f = {
                    FADE: "fade",
                    SHOW: "show"
                },
                h = {
                    TOOLTIP: ".tooltip",
                    TOOLTIP_INNER: ".tooltip-inner",
                    ARROW: ".arrow"
                },
                p = {
                    HOVER: "hover",
                    FOCUS: "focus",
                    CLICK: "click",
                    MANUAL: "manual"
                },
                g = function() {
                    function r(e, t) {
                        if (void 0 === Pe)
                            throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
                    }
                    var g = r.prototype;
                    return g.enable = function() {
                        this._isEnabled = !0
                    }, g.disable = function() {
                        this._isEnabled = !1
                    }, g.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, g.toggle = function(t) {
                        if (this._isEnabled)
                            if (t) {
                                var n = this.constructor.DATA_KEY,
                                    i = e(t.currentTarget).data(n);
                                i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                            } else {
                                if (e(this.getTipElement()).hasClass(f.SHOW))
                                    return void this._leave(null, this);
                                this._enter(null, this)
                            }
                    }, g.dispose = function() {
                        clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, g.show = function() {
                        var t = this;
                        if ("none" === e(this.element).css("display"))
                            throw new Error("Please use show on visible elements");
                        var n = e.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            e(this.element).trigger(n);
                            var i = e.contains(this.element.ownerDocument.documentElement, this.element);
                            if (n.isDefaultPrevented() || !i)
                                return;
                            var o = this.getTipElement(),
                                s = de.getUID(this.constructor.NAME);
                            o.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && e(o).addClass(f.FADE);
                            var a = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                                l = this._getAttachment(a);
                            this.addAttachmentClass(l);
                            var c = !1 === this.config.container ? document.body : e(this.config.container);
                            e(o).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(o).appendTo(c), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Pe(this.element, o, {
                                placement: l,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: h.ARROW
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function(e) {
                                    e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                                },
                                onUpdate: function(e) {
                                    t._handlePopperPlacementChange(e)
                                }
                            }), e(o).addClass(f.SHOW), "ontouchstart" in document.documentElement && e("body").children().on("mouseover", null, e.noop);
                            var d = function() {
                                t.config.animation && t._fixTransition();
                                var n = t._hoverState;
                                t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === u.OUT && t._leave(null, t)
                            };
                            de.supportsTransitionEnd() && e(this.tip).hasClass(f.FADE) ? e(this.tip).one(de.TRANSITION_END, d).emulateTransitionEnd(r._TRANSITION_DURATION) : d()
                        }
                    }, g.hide = function(t) {
                        var n = this,
                            i = this.getTipElement(),
                            o = e.Event(this.constructor.Event.HIDE),
                            r = function() {
                                n._hoverState !== u.SHOW && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                            };
                        e(this.element).trigger(o), o.isDefaultPrevented() || (e(i).removeClass(f.SHOW), "ontouchstart" in document.documentElement && e("body").children().off("mouseover", null, e.noop), this._activeTrigger[p.CLICK] = !1, this._activeTrigger[p.FOCUS] = !1, this._activeTrigger[p.HOVER] = !1, de.supportsTransitionEnd() && e(this.tip).hasClass(f.FADE) ? e(i).one(de.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
                    }, g.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, g.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, g.addAttachmentClass = function(t) {
                        e(this.getTipElement()).addClass("bs-tooltip-" + t)
                    }, g.getTipElement = function() {
                        return this.tip = this.tip || e(this.config.template)[0], this.tip
                    }, g.setContent = function() {
                        var t = e(this.getTipElement());
                        this.setElementContent(t.find(h.TOOLTIP_INNER), this.getTitle()), t.removeClass(f.FADE + " " + f.SHOW)
                    }, g.setElementContent = function(t, n) {
                        var i = this.config.html;
                        "object" == typeof n && (n.nodeType || n.jquery) ? i ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text()) : t[i ? "html" : "text"](n)
                    }, g.getTitle = function() {
                        var e = this.element.getAttribute("data-original-title");
                        return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
                    }, g._getAttachment = function(e) {
                        return l[e.toUpperCase()]
                    }, g._setListeners = function() {
                        var t = this;
                        this.config.trigger.split(" ").forEach(function(n) {
                            if ("click" === n)
                                e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                                    return t.toggle(e)
                                });
                            else if (n !== p.MANUAL) {
                                var i = n === p.HOVER ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                                    o = n === p.HOVER ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                                e(t.element).on(i, t.config.selector, function(e) {
                                    return t._enter(e)
                                }).on(o, t.config.selector, function(e) {
                                    return t._leave(e)
                                })
                            }
                            e(t.element).closest(".modal").on("hide.bs.modal", function() {
                                return t.hide()
                            })
                        }), this.config.selector ? this.config = o({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, g._fixTitle = function() {
                        var e = typeof this.element.getAttribute("data-original-title");
                        (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, g._enter = function(t, n) {
                        var i = this.constructor.DATA_KEY;
                        return n = n || e(t.currentTarget).data(i), n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? p.FOCUS : p.HOVER] = !0), e(n.getTipElement()).hasClass(f.SHOW) || n._hoverState === u.SHOW ? void (n._hoverState = u.SHOW) : (clearTimeout(n._timeout), n._hoverState = u.SHOW, n.config.delay && n.config.delay.show ? void (n._timeout = setTimeout(function() {
                            n._hoverState === u.SHOW && n.show()
                        }, n.config.delay.show)) : void n.show())
                    }, g._leave = function(t, n) {
                        var i = this.constructor.DATA_KEY;
                        if (n = n || e(t.currentTarget).data(i), n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? p.FOCUS : p.HOVER] = !1), !n._isWithActiveTrigger()) {
                            if (clearTimeout(n._timeout), n._hoverState = u.OUT, !n.config.delay || !n.config.delay.hide)
                                return void n.hide();
                            n._timeout = setTimeout(function() {
                                n._hoverState === u.OUT && n.hide()
                            }, n.config.delay.hide)
                        }
                    }, g._isWithActiveTrigger = function() {
                        for (var e in this._activeTrigger)
                            if (this._activeTrigger[e])
                                return !0;
                        return !1
                    }, g._getConfig = function(n) {
                        return n = o({}, this.constructor.Default, e(this.element).data(), n), "number" == typeof n.delay && (n.delay = {
                            show: n.delay,
                            hide: n.delay
                        }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), de.typeCheckConfig(t, n, this.constructor.DefaultType), n
                    }, g._getDelegateConfig = function() {
                        var e = {};
                        if (this.config)
                            for (var t in this.config)
                                this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                        return e
                    }, g._cleanTipClass = function() {
                        var t = e(this.getTipElement()),
                            n = t.attr("class").match(s);
                        null !== n && n.length > 0 && t.removeClass(n.join(""))
                    }, g._handlePopperPlacementChange = function(e) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
                    }, g._fixTransition = function() {
                        var t = this.getTipElement(),
                            n = this.config.animation;
                        null === t.getAttribute("x-placement") && (e(t).removeClass(f.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                    }, r._jQueryInterface = function(t) {
                        return this.each(function() {
                            var n = e(this).data("bs.tooltip"),
                                i = "object" == typeof t && t;
                            if ((n || !/dispose|hide/.test(t)) && (n || (n = new r(this, i), e(this).data("bs.tooltip", n)), "string" == typeof t)) {
                                if (void 0 === n[t])
                                    throw new TypeError('No method named "' + t + '"');
                                n[t]()
                            }
                        })
                    }, i(r, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return c
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return t
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.tooltip"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return d
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return a
                        }
                    }]), r
                }();
            return e.fn[t] = g._jQueryInterface, e.fn[t].Constructor = g, e.fn[t].noConflict = function() {
                return e.fn[t] = r, g._jQueryInterface
            }, g
        }(t),
        He = function(e) {
            var t = "popover",
                n = ".bs.popover",
                s = e.fn[t],
                a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                l = o({}, xe.Default, {
                    placement: "right",
                    trigger: "click",
                    content: "",
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }),
                c = o({}, xe.DefaultType, {
                    content: "(string|element|function)"
                }),
                u = {
                    FADE: "fade",
                    SHOW: "show"
                },
                d = {
                    TITLE: ".popover-header",
                    CONTENT: ".popover-body"
                },
                f = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    INSERTED: "inserted" + n,
                    CLICK: "click" + n,
                    FOCUSIN: "focusin" + n,
                    FOCUSOUT: "focusout" + n,
                    MOUSEENTER: "mouseenter" + n,
                    MOUSELEAVE: "mouseleave" + n
                },
                h = function(o) {
                    function s() {
                        return o.apply(this, arguments) || this
                    }
                    r(s, o);
                    var h = s.prototype;
                    return h.isWithContent = function() {
                        return this.getTitle() || this._getContent()
                    }, h.addAttachmentClass = function(t) {
                        e(this.getTipElement()).addClass("bs-popover-" + t)
                    }, h.getTipElement = function() {
                        return this.tip = this.tip || e(this.config.template)[0], this.tip
                    }, h.setContent = function() {
                        var t = e(this.getTipElement());
                        this.setElementContent(t.find(d.TITLE), this.getTitle());
                        var n = this._getContent();
                        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(d.CONTENT), n), t.removeClass(u.FADE + " " + u.SHOW)
                    }, h._getContent = function() {
                        return this.element.getAttribute("data-content") || this.config.content
                    }, h._cleanTipClass = function() {
                        var t = e(this.getTipElement()),
                            n = t.attr("class").match(a);
                        null !== n && n.length > 0 && t.removeClass(n.join(""))
                    }, s._jQueryInterface = function(t) {
                        return this.each(function() {
                            var n = e(this).data("bs.popover"),
                                i = "object" == typeof t ? t : null;
                            if ((n || !/destroy|hide/.test(t)) && (n || (n = new s(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
                                if (void 0 === n[t])
                                    throw new TypeError('No method named "' + t + '"');
                                n[t]()
                            }
                        })
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return t
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.popover"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return f
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return c
                        }
                    }]), s
                }(xe);
            return e.fn[t] = h._jQueryInterface, e.fn[t].Constructor = h, e.fn[t].noConflict = function() {
                return e.fn[t] = s, h._jQueryInterface
            }, h
        }(t),
        Me = function(e) {
            var t = "scrollspy",
                n = e.fn[t],
                r = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                s = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                a = {
                    ACTIVATE: "activate.bs.scrollspy",
                    SCROLL: "scroll.bs.scrollspy",
                    LOAD_DATA_API: "load.bs.scrollspy.data-api"
                },
                l = {
                    DROPDOWN_ITEM: "dropdown-item",
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active"
                },
                c = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    NAV_LINKS: ".nav-link",
                    NAV_ITEMS: ".nav-item",
                    LIST_ITEMS: ".list-group-item",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                u = {
                    OFFSET: "offset",
                    POSITION: "position"
                },
                d = function() {
                    function n(t, n) {
                        var i = this;
                        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + c.NAV_LINKS + "," + this._config.target + " " + c.LIST_ITEMS + "," + this._config.target + " " + c.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(a.SCROLL, function(e) {
                            return i._process(e)
                        }), this.refresh(), this._process()
                    }
                    var d = n.prototype;
                    return d.refresh = function() {
                        var t = this,
                            n = this._scrollElement === this._scrollElement.window ? u.OFFSET : u.POSITION,
                            i = "auto" === this._config.method ? n : this._config.method,
                            o = i === u.POSITION ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), e.makeArray(e(this._selector)).map(function(t) {
                            var n,
                                r = de.getSelectorFromElement(t);
                            if (r && (n = e(r)[0]), n) {
                                var s = n.getBoundingClientRect();
                                if (s.width || s.height)
                                    return [e(n)[i]().top + o, r]
                            }
                            return null
                        }).filter(function(e) {
                            return e
                        }).sort(function(e, t) {
                            return e[0] - t[0]
                        }).forEach(function(e) {
                            t._offsets.push(e[0]), t._targets.push(e[1])
                        })
                    }, d.dispose = function() {
                        e.removeData(this._element, "bs.scrollspy"),
                        e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, d._getConfig = function(n) {
                        if (n = o({}, r, n), "string" != typeof n.target) {
                            var i = e(n.target).attr("id");
                            i || (i = de.getUID(t), e(n.target).attr("id", i)), n.target = "#" + i
                        }
                        return de.typeCheckConfig(t, n, s), n
                    }, d._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, d._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, d._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, d._process = function() {
                        var e = this._getScrollTop() + this._config.offset,
                            t = this._getScrollHeight(),
                            n = this._config.offset + t - this._getOffsetHeight();
                        if (this._scrollHeight !== t && this.refresh(), e >= n) {
                            var i = this._targets[this._targets.length - 1];
                            return void (this._activeTarget !== i && this._activate(i))
                        }
                        if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0)
                            return this._activeTarget = null, void this._clear();
                        for (var o = this._offsets.length; o--;) {
                            this._activeTarget !== this._targets[o] && e >= this._offsets[o] && (void 0 === this._offsets[o + 1] || e < this._offsets[o + 1]) && this._activate(this._targets[o])
                        }
                    }, d._activate = function(t) {
                        this._activeTarget = t, this._clear();
                        var n = this._selector.split(",");
                        n = n.map(function(e) {
                            return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                        });
                        var i = e(n.join(","));
                        i.hasClass(l.DROPDOWN_ITEM) ? (i.closest(c.DROPDOWN).find(c.DROPDOWN_TOGGLE).addClass(l.ACTIVE), i.addClass(l.ACTIVE)) : (i.addClass(l.ACTIVE), i.parents(c.NAV_LIST_GROUP).prev(c.NAV_LINKS + ", " + c.LIST_ITEMS).addClass(l.ACTIVE), i.parents(c.NAV_LIST_GROUP).prev(c.NAV_ITEMS).children(c.NAV_LINKS).addClass(l.ACTIVE)), e(this._scrollElement).trigger(a.ACTIVATE, {
                            relatedTarget: t
                        })
                    }, d._clear = function() {
                        e(this._selector).filter(c.ACTIVE).removeClass(l.ACTIVE)
                    }, n._jQueryInterface = function(t) {
                        return this.each(function() {
                            var i = e(this).data("bs.scrollspy"),
                                o = "object" == typeof t && t;
                            if (i || (i = new n(this, o), e(this).data("bs.scrollspy", i)), "string" == typeof t) {
                                if (void 0 === i[t])
                                    throw new TypeError('No method named "' + t + '"');
                                i[t]()
                            }
                        })
                    }, i(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return r
                        }
                    }]), n
                }();
            return e(window).on(a.LOAD_DATA_API, function() {
                for (var t = e.makeArray(e(c.DATA_SPY)), n = t.length; n--;) {
                    var i = e(t[n]);
                    d._jQueryInterface.call(i, i.data())
                }
            }), e.fn[t] = d._jQueryInterface, e.fn[t].Constructor = d, e.fn[t].noConflict = function() {
                return e.fn[t] = n, d._jQueryInterface
            }, d
        }(t),
        Fe = function(e) {
            var t = e.fn.tab,
                n = {
                    HIDE: "hide.bs.tab",
                    HIDDEN: "hidden.bs.tab",
                    SHOW: "show.bs.tab",
                    SHOWN: "shown.bs.tab",
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                o = {
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active",
                    DISABLED: "disabled",
                    FADE: "fade",
                    SHOW: "show"
                },
                r = {
                    DROPDOWN: ".dropdown",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    ACTIVE: ".active",
                    ACTIVE_UL: "> li > .active",
                    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    DROPDOWN_TOGGLE: ".dropdown-toggle",
                    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
                },
                s = function() {
                    function t(e) {
                        this._element = e
                    }
                    var s = t.prototype;
                    return s.show = function() {
                        var t = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(o.ACTIVE) || e(this._element).hasClass(o.DISABLED))) {
                            var i,
                                s,
                                a = e(this._element).closest(r.NAV_LIST_GROUP)[0],
                                l = de.getSelectorFromElement(this._element);
                            if (a) {
                                var c = "UL" === a.nodeName ? r.ACTIVE_UL : r.ACTIVE;
                                s = e.makeArray(e(a).find(c)), s = s[s.length - 1]
                            }
                            var u = e.Event(n.HIDE, {
                                    relatedTarget: this._element
                                }),
                                d = e.Event(n.SHOW, {
                                    relatedTarget: s
                                });
                            if (s && e(s).trigger(u), e(this._element).trigger(d), !d.isDefaultPrevented() && !u.isDefaultPrevented()) {
                                l && (i = e(l)[0]), this._activate(this._element, a);
                                var f = function() {
                                    var i = e.Event(n.HIDDEN, {
                                            relatedTarget: t._element
                                        }),
                                        o = e.Event(n.SHOWN, {
                                            relatedTarget: s
                                        });
                                    e(s).trigger(i), e(t._element).trigger(o)
                                };
                                i ? this._activate(i, i.parentNode, f) : f()
                            }
                        }
                    }, s.dispose = function() {
                        e.removeData(this._element, "bs.tab"), this._element = null
                    }, s._activate = function(t, n, i) {
                        var s,
                            a = this;
                        s = "UL" === n.nodeName ? e(n).find(r.ACTIVE_UL) : e(n).children(r.ACTIVE);
                        var l = s[0],
                            c = i && de.supportsTransitionEnd() && l && e(l).hasClass(o.FADE),
                            u = function() {
                                return a._transitionComplete(t, l, i)
                            };
                        l && c ? e(l).one(de.TRANSITION_END, u).emulateTransitionEnd(150) : u()
                    }, s._transitionComplete = function(t, n, i) {
                        if (n) {
                            e(n).removeClass(o.SHOW + " " + o.ACTIVE);
                            var s = e(n.parentNode).find(r.DROPDOWN_ACTIVE_CHILD)[0];
                            s && e(s).removeClass(o.ACTIVE), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                        }
                        if (e(t).addClass(o.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), de.reflow(t), e(t).addClass(o.SHOW), t.parentNode && e(t.parentNode).hasClass(o.DROPDOWN_MENU)) {
                            var a = e(t).closest(r.DROPDOWN)[0];
                            a && e(a).find(r.DROPDOWN_TOGGLE).addClass(o.ACTIVE), t.setAttribute("aria-expanded", !0)
                        }
                        i && i()
                    }, t._jQueryInterface = function(n) {
                        return this.each(function() {
                            var i = e(this),
                                o = i.data("bs.tab");
                            if (o || (o = new t(this), i.data("bs.tab", o)), "string" == typeof n) {
                                if (void 0 === o[n])
                                    throw new TypeError('No method named "' + n + '"');
                                o[n]()
                            }
                        })
                    }, i(t, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), t
                }();
            return e(document).on(n.CLICK_DATA_API, r.DATA_TOGGLE, function(t) {
                t.preventDefault(), s._jQueryInterface.call(e(this), "show")
            }), e.fn.tab = s._jQueryInterface, e.fn.tab.Constructor = s, e.fn.tab.noConflict = function() {
                return e.fn.tab = t, s._jQueryInterface
            }, s
        }(t);
    !function(e) {
        if (void 0 === e)
            throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = e.fn.jquery.split(" ")[0].split(".");
        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4)
            throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(t), e.Util = de, e.Alert = fe, e.Button = he, e.Carousel = pe, e.Collapse = ge, e.Dropdown = je, e.Modal = ke, e.Popover = He, e.Scrollspy = Me, e.Tab = Fe, e.Tooltip = xe, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}), function(e) {
    var t = !1;
    if ("function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), !t) {
        var n = window.Cookies,
            i = window.Cookies = e();
        i.noConflict = function() {
            return window.Cookies = n, i
        }
    }
}(function() {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n)
                t[i] = n[i]
        }
        return t
    }
    function t(n) {
        function i(t, o, r) {
            var s;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (r = e({
                        path: "/"
                    }, i.defaults, r), "number" == typeof r.expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * r.expires), r.expires = a
                    }
                    r.expires = r.expires ? r.expires.toUTCString() : "";
                    try {
                        s = JSON.stringify(o), /^[\{\[]/.test(s) && (o = s)
                    } catch (e) {}
                    o = n.write ? n.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape);
                    var l = "";
                    for (var c in r)
                        r[c] && (l += "; " + c, !0 !== r[c] && (l += "=" + r[c]));
                    return document.cookie = t + "=" + o + l
                }
                t || (s = {});
                for (var u = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, f = 0; f < u.length; f++) {
                    var h = u[f].split("="),
                        p = h.slice(1).join("=");
                    this.json || '"' !== p.charAt(0) || (p = p.slice(1, -1));
                    try {
                        var g = h[0].replace(d, decodeURIComponent);
                        if (p = n.read ? n.read(p, g) : n(p, g) || p.replace(d, decodeURIComponent), this.json)
                            try {
                                p = JSON.parse(p)
                            } catch (e) {}
                        if (t === g) {
                            s = p;
                            break
                        }
                        t || (s[g] = p)
                    } catch (e) {}
                }
                return s
            }
        }
        return i.set = i, i.get = function(e) {
            return i.call(i, e)
        }, i.getJSON = function() {
            return i.apply({
                json: !0
            }, [].slice.call(arguments))
        }, i.defaults = {}, i.remove = function(t, n) {
            i(t, "", e(n, {
                expires: -1
            }))
        }, i.withConverter = t, i
    }
    return t(function() {})
}), function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
}(this, function() {
    "use strict";
    var e = function() {
        i.log(2, "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")
    };
    e.version = "2.0.5", window.addEventListener("mousewheel", function() {});
    e.Controller = function(n) {
        var o,
            r,
            s = "ScrollMagic.Controller",
            a = t.defaults,
            l = this,
            c = i.extend({}, a, n),
            u = [],
            d = !1,
            f = 0,
            h = "PAUSED",
            p = !0,
            g = 0,
            m = !0,
            v = function() {
                c.refreshInterval > 0 && (r = window.setTimeout(C, c.refreshInterval))
            },
            _ = function() {
                return c.vertical ? i.get.scrollTop(c.container) : i.get.scrollLeft(c.container)
            },
            E = function() {
                return c.vertical ? i.get.height(c.container) : i.get.width(c.container)
            },
            y = this._setScrollPos = function(e) {
                c.vertical ? p ? window.scrollTo(i.get.scrollLeft(), e) : c.container.scrollTop = e : p ? window.scrollTo(e, i.get.scrollTop()) : c.container.scrollLeft = e
            },
            b = function() {
                if (m && d) {
                    var e = i.type.Array(d) ? d : u.slice(0);
                    d = !1;
                    var t = f;
                    f = l.scrollPos();
                    var n = f - t;
                    0 !== n && (h = n > 0 ? "FORWARD" : "REVERSE"), "REVERSE" === h && e.reverse(), e.forEach(function(t, n) {
                        S(3, "updating Scene " + (n + 1) + "/" + e.length + " (" + u.length + " total)"), t.update(!0)
                    }), 0 === e.length && c.loglevel >= 3 && S(3, "updating 0 Scenes (nothing added to controller)")
                }
            },
            T = function() {
                o = i.rAF(b)
            },
            w = function(e) {
                S(3, "event fired causing an update:", e.type), "resize" == e.type && (g = E(), h = "PAUSED"), !0 !== d && (d = !0, T())
            },
            C = function() {
                if (!p && g != E()) {
                    var e;
                    try {
                        e = new Event("resize", {
                            bubbles: !1,
                            cancelable: !1
                        })
                    } catch (t) {
                        e = document.createEvent("Event"), e.initEvent("resize", !1, !1)
                    }
                    c.container.dispatchEvent(e)
                }
                u.forEach(function(e, t) {
                    e.refresh()
                }), v()
            },
            S = this._log = function(e, t) {
                c.loglevel >= e && (Array.prototype.splice.call(arguments, 1, 0, "(" + s + ") ->"), i.log.apply(window, arguments))
            };
        this._options = c;
        var I = function(e) {
            if (e.length <= 1)
                return e;
            var t = e.slice(0);
            return t.sort(function(e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }), t
        };
        return this.addScene = function(t) {
            if (i.type.Array(t))
                t.forEach(function(e, t) {
                    l.addScene(e)
                });
            else if (t instanceof e.Scene) {
                if (t.controller() !== l)
                    t.addTo(l);
                else if (u.indexOf(t) < 0) {
                    u.push(t), u = I(u), t.on("shift.controller_sort", function() {
                        u = I(u)
                    });
                    for (var n in c.globalSceneOptions)
                        t[n] && t[n].call(t, c.globalSceneOptions[n]);
                    S(3, "adding Scene (now " + u.length + " total)")
                }
            } else
                S(1, "ERROR: invalid argument supplied for '.addScene()'");
            return l
        }, this.removeScene = function(e) {
            if (i.type.Array(e))
                e.forEach(function(e, t) {
                    l.removeScene(e)
                });
            else {
                var t = u.indexOf(e);
                t > -1 && (e.off("shift.controller_sort"), u.splice(t, 1), S(3, "removing Scene (now " + u.length + " left)"), e.remove())
            }
            return l
        }, this.updateScene = function(t, n) {
            return i.type.Array(t) ? t.forEach(function(e, t) {
                l.updateScene(e, n)
            }) : n ? t.update(!0) : !0 !== d && t instanceof e.Scene && (d = d || [], -1 == d.indexOf(t) && d.push(t), d = I(d), T()), l
        }, this.update = function(e) {
            return w({
                type: "resize"
            }), e && b(), l
        }, this.scrollTo = function(t, n) {
            if (i.type.Number(t))
                y.call(c.container, t, n);
            else if (t instanceof e.Scene)
                t.controller() === l ? l.scrollTo(t.scrollOffset(), n) : S(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", t);
            else if (i.type.Function(t))
                y = t;
            else {
                var o = i.get.elements(t)[0];
                if (o) {
                    for (; o.parentNode.hasAttribute("data-scrollmagic-pin-spacer");)
                        o = o.parentNode;
                    var r = c.vertical ? "top" : "left",
                        s = i.get.offset(c.container),
                        a = i.get.offset(o);
                    p || (s[r] -= l.scrollPos()), l.scrollTo(a[r] - s[r], n)
                } else
                    S(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", t)
            }
            return l
        }, this.scrollPos = function(e) {
            return arguments.length ? (i.type.Function(e) ? _ = e : S(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."), l) : _.call(l)
        }, this.info = function(e) {
            var t = {
                size: g,
                vertical: c.vertical,
                scrollPos: f,
                scrollDirection: h,
                container: c.container,
                isDocument: p
            };
            return arguments.length ? void 0 !== t[e] ? t[e] : void S(1, 'ERROR: option "' + e + '" is not available') : t
        }, this.loglevel = function(e) {
            return arguments.length ? (c.loglevel != e && (c.loglevel = e), l) : c.loglevel
        }, this.enabled = function(e) {
            return arguments.length ? (m != e && (m = !!e, l.updateScene(u, !0)), l) : m
        }, this.destroy = function(e) {
            window.clearTimeout(r);
            for (var t = u.length; t--;)
                u[t].destroy(e);
            return c.container.removeEventListener("resize", w), c.container.removeEventListener("scroll", w), i.cAF(o), S(3, "destroyed " + s + " (reset: " + (e ? "true" : "false") + ")"), null
        }, function() {
            for (var t in c)
                a.hasOwnProperty(t) || (S(2, 'WARNING: Unknown option "' + t + '"'), delete c[t]);
            if (c.container = i.get.elements(c.container)[0], !c.container)
                throw S(1, "ERROR creating object " + s + ": No valid scroll container supplied"), s + " init failed.";
            p = c.container === window || c.container === document.body || !document.body.contains(c.container), p && (c.container = window), g = E(), c.container.addEventListener("resize", w), c.container.addEventListener("scroll", w), c.refreshInterval = parseInt(c.refreshInterval) || a.refreshInterval, v(), S(3, "added new " + s + " controller (v" + e.version + ")")
        }(), l
    };
    var t = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    e.Controller.addOption = function(e, n) {
        t.defaults[e] = n
    }, e.Controller.extend = function(t) {
        var n = this;
        e.Controller = function() {
            return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this
        }, i.extend(e.Controller, n), e.Controller.prototype = n.prototype, e.Controller.prototype.constructor = e.Controller
    }, e.Scene = function(t) {
        var o,
            r,
            s = "ScrollMagic.Scene",
            a = n.defaults,
            l = this,
            c = i.extend({}, a, t),
            u = "BEFORE",
            d = 0,
            f = {
                start: 0,
                end: 0
            },
            h = 0,
            p = !0,
            g = {};
        this.on = function(e, t) {
            return i.type.Function(t) ? (e = e.trim().split(" "), e.forEach(function(e) {
                var n = e.split("."),
                    i = n[0],
                    o = n[1];
                "*" != i && (g[i] || (g[i] = []), g[i].push({
                    namespace: o || "",
                    callback: t
                }))
            })) : m(1, "ERROR when calling '.on()': Supplied callback for '" + e + "' is not a valid function!"), l
        }, this.off = function(e, t) {
            return e ? (e = e.trim().split(" "), e.forEach(function(e, n) {
                var i = e.split("."),
                    o = i[0],
                    r = i[1] || "";
                ("*" === o ? Object.keys(g) : [o]).forEach(function(e) {
                    for (var n = g[e] || [], i = n.length; i--;) {
                        var o = n[i];
                        !o || r !== o.namespace && "*" !== r || t && t != o.callback || n.splice(i, 1)
                    }
                    n.length || delete g[e]
                })
            }), l) : (m(1, "ERROR: Invalid event name supplied."), l)
        }, this.trigger = function(t, n) {
            if (t) {
                var i = t.trim().split("."),
                    o = i[0],
                    r = i[1],
                    s = g[o];
                m(3, "event fired:", o, n ? "->" : "", n || ""), s && s.forEach(function(t, i) {
                    r && r !== t.namespace || t.callback.call(l, new e.Event(o, t.namespace, l, n))
                })
            } else
                m(1, "ERROR: Invalid event name supplied.");
            return l
        }, l.on("change.internal", function(e) {
            "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? E() : "reverse" === e.what && l.update())
        }).on("shift.internal", function(e) {
            v(), l.update()
        });
        var m = this._log = function(e, t) {
            c.loglevel >= e && (Array.prototype.splice.call(arguments, 1, 0, "(" + s + ") ->"), i.log.apply(window, arguments))
        };
        this.addTo = function(t) {
            return t instanceof e.Controller ? r != t && (r && r.removeScene(l), r = t, T(), _(!0), E(!0), v(), r.info("container").addEventListener("resize", y), t.addScene(l), l.trigger("add", {
                controller: r
            }), m(3, "added " + s + " to controller"), l.update()) : m(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"), l
        }, this.enabled = function(e) {
            return arguments.length ? (p != e && (p = !!e, l.update(!0)), l) : p
        }, this.remove = function() {
            if (r) {
                r.info("container").removeEventListener("resize", y);
                var e = r;
                r = void 0, e.removeScene(l), l.trigger("remove"), m(3, "removed " + s + " from controller")
            }
            return l
        }, this.destroy = function(e) {
            return l.trigger("destroy", {
                reset: e
            }), l.remove(), l.off("*.*"), m(3, "destroyed " + s + " (reset: " + (e ? "true" : "false") + ")"), null
        }, this.update = function(e) {
            if (r)
                if (e)
                    if (r.enabled() && p) {
                        var t,
                            n = r.info("scrollPos");
                        t = c.duration > 0 ? (n - f.start) / (f.end - f.start) : n >= f.start ? 1 : 0, l.trigger("update", {
                            startPos: f.start,
                            endPos: f.end,
                            scrollPos: n
                        }), l.progress(t)
                    } else
                        S && "DURING" === u && O(!0);
                else
                    r.updateScene(l, !1);
            return l
        }, this.refresh = function() {
            return _(), E(), l
        }, this.progress = function(e) {
            if (arguments.length) {
                var t = !1,
                    n = u,
                    i = r ? r.info("scrollDirection") : "PAUSED",
                    o = c.reverse || e >= d;
                if (0 === c.duration ? (t = d != e, d = e < 1 && o ? 0 : 1, u = 0 === d ? "BEFORE" : "DURING") : e < 0 && "BEFORE" !== u && o ? (d = 0, u = "BEFORE", t = !0) : e >= 0 && e < 1 && o ? (d = e, u = "DURING", t = !0) : e >= 1 && "AFTER" !== u ? (d = 1, u = "AFTER", t = !0) : "DURING" !== u || o || O(), t) {
                    var s = {
                            progress: d,
                            state: u,
                            scrollDirection: i
                        },
                        a = u != n,
                        f = function(e) {
                            l.trigger(e, s)
                        };
                    a && "DURING" !== n && (f("enter"), f("BEFORE" === n ? "start" : "end")), f("progress"), a && "DURING" !== u && (f("BEFORE" === u ? "start" : "end"), f("leave"))
                }
                return l
            }
            return d
        };
        var v = function() {
                f = {
                    start: h + c.offset
                }, r && c.triggerElement && (f.start -= r.info("size") * c.triggerHook), f.end = f.start + c.duration
            },
            _ = function(e) {
                if (o) {
                    w("duration", o.call(l)) && !e && (l.trigger("change", {
                        what: "duration",
                        newval: c.duration
                    }), l.trigger("shift", {
                        reason: "duration"
                    }))
                }
            },
            E = function(e) {
                var t = 0,
                    n = c.triggerElement;
                if (r && n) {
                    for (var o = r.info(), s = i.get.offset(o.container), a = o.vertical ? "top" : "left"; n.parentNode.hasAttribute("data-scrollmagic-pin-spacer");)
                        n = n.parentNode;
                    var u = i.get.offset(n);
                    o.isDocument || (s[a] -= r.scrollPos()), t = u[a] - s[a]
                }
                var d = t != h;
                h = t, d && !e && l.trigger("shift", {
                    reason: "triggerElementPosition"
                })
            },
            y = function(e) {
                c.triggerHook > 0 && l.trigger("shift", {
                    reason: "containerResize"
                })
            },
            b = i.extend(n.validate, {
                duration: function(e) {
                    if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
                        var t = parseFloat(e) / 100;
                        e = function() {
                            return r ? r.info("size") * t : 0
                        }
                    }
                    if (i.type.Function(e)) {
                        o = e;
                        try {
                            e = parseFloat(o())
                        } catch (t) {
                            e = -1
                        }
                    }
                    if (e = parseFloat(e), !i.type.Number(e) || e < 0)
                        throw o ? (o = void 0, ['Invalid return value of supplied function for option "duration":', e]) : ['Invalid value for option "duration":', e];
                    return e
                }
            }),
            T = function(e) {
                e = arguments.length ? [e] : Object.keys(b), e.forEach(function(e, t) {
                    var n;
                    if (b[e])
                        try {
                            n = b[e](c[e])
                        } catch (t) {
                            n = a[e];
                            var o = i.type.String(t) ? [t] : t;
                            i.type.Array(o) ? (o[0] = "ERROR: " + o[0], o.unshift(1), m.apply(this, o)) : m(1, "ERROR: Problem executing validation callback for option '" + e + "':", t.message)
                        } finally {
                            c[e] = n
                        }
                })
            },
            w = function(e, t) {
                var n = !1,
                    i = c[e];
                return c[e] != t && (c[e] = t, T(e), n = i != c[e]), n
            },
            C = function(e) {
                l[e] || (l[e] = function(t) {
                    return arguments.length ? ("duration" === e && (o = void 0), w(e, t) && (l.trigger("change", {
                        what: e,
                        newval: c[e]
                    }), n.shifts.indexOf(e) > -1 && l.trigger("shift", {
                        reason: e
                    })), l) : c[e]
                })
            };
        this.controller = function() {
            return r
        }, this.state = function() {
            return u
        }, this.scrollOffset = function() {
            return f.start
        }, this.triggerPosition = function() {
            var e = c.offset;
            return r && (c.triggerElement ? e += h : e += r.info("size") * l.triggerHook()), e
        };
        var S,
            I;
        l.on("shift.internal", function(e) {
            var t = "duration" === e.reason;
            ("AFTER" === u && t || "DURING" === u && 0 === c.duration) && O(), t && A()
        }).on("progress.internal", function(e) {
            O()
        }).on("add.internal", function(e) {
            A()
        }).on("destroy.internal", function(e) {
            l.removePin(e.reset)
        });
        var O = function(e) {
                if (S && r) {
                    var t = r.info(),
                        n = I.spacer.firstChild;
                    if (e || "DURING" !== u) {
                        var o = {
                                position: I.inFlow ? "relative" : "absolute",
                                top: 0,
                                left: 0
                            },
                            s = i.css(n, "position") != o.position;
                        I.pushFollowers ? c.duration > 0 && ("AFTER" === u && 0 === parseFloat(i.css(I.spacer, "padding-top")) ? s = !0 : "BEFORE" === u && 0 === parseFloat(i.css(I.spacer, "padding-bottom")) && (s = !0)) : o[t.vertical ? "top" : "left"] = c.duration * d, i.css(n, o), s && A()
                    } else {
                        "fixed" != i.css(n, "position") && (i.css(n, {
                            position: "fixed"
                        }), A());
                        var a = i.get.offset(I.spacer, !0),
                            l = c.reverse || 0 === c.duration ? t.scrollPos - f.start : Math.round(d * c.duration * 10) / 10;
                        a[t.vertical ? "top" : "left"] += l, i.css(I.spacer.firstChild, {
                            top: a.top,
                            left: a.left
                        })
                    }
                }
            },
            A = function() {
                if (S && r && I.inFlow) {
                    var e = "DURING" === u,
                        t = r.info("vertical"),
                        n = I.spacer.firstChild,
                        o = i.isMarginCollapseType(i.css(I.spacer, "display")),
                        s = {};
                    I.relSize.width || I.relSize.autoFullWidth ? e ? i.css(S, {
                        width: i.get.width(I.spacer)
                    }) : i.css(S, {
                        width: "100%"
                    }) : (s["min-width"] = i.get.width(t ? S : n, !0, !0), s.width = e ? s["min-width"] : "auto"), I.relSize.height ? e ? i.css(S, {
                        height: i.get.height(I.spacer) - (I.pushFollowers ? c.duration : 0)
                    }) : i.css(S, {
                        height: "100%"
                    }) : (s["min-height"] = i.get.height(t ? n : S, !0, !o), s.height = e ? s["min-height"] : "auto"), I.pushFollowers && (s["padding" + (t ? "Top" : "Left")] = c.duration * d, s["padding" + (t ? "Bottom" : "Right")] = c.duration * (1 - d)), i.css(I.spacer, s)
                }
            },
            D = function() {
                r && S && "DURING" === u && !r.info("isDocument") && O()
            },
            N = function() {
                r && S && "DURING" === u && ((I.relSize.width || I.relSize.autoFullWidth) && i.get.width(window) != i.get.width(I.spacer.parentNode) || I.relSize.height && i.get.height(window) != i.get.height(I.spacer.parentNode)) && A()
            },
            R = function(e) {
                r && S && "DURING" === u && !r.info("isDocument") && (e.preventDefault(), r._setScrollPos(r.info("scrollPos") - ((e.wheelDelta || e[r.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)))
            };
        this.setPin = function(e, t) {
            var n = {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            };
            if (t = i.extend({}, n, t), !(e = i.get.elements(e)[0]))
                return m(1, "ERROR calling method 'setPin()': Invalid pin element supplied."), l;
            if ("fixed" === i.css(e, "position"))
                return m(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."), l;
            if (S) {
                if (S === e)
                    return l;
                l.removePin()
            }
            S = e;
            var o = S.parentNode.style.display,
                r = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            S.parentNode.style.display = "none";
            var s = "absolute" != i.css(S, "position"),
                a = i.css(S, r.concat(["display"])),
                u = i.css(S, ["width", "height"]);
            S.parentNode.style.display = o, !s && t.pushFollowers && (m(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."), t.pushFollowers = !1), window.setTimeout(function() {
                S && 0 === c.duration && t.pushFollowers && m(2, "WARNING: pushFollowers =", !0, "has no effect, when scene duration is 0.")
            }, 0);
            var d = S.parentNode.insertBefore(document.createElement("div"), S),
                f = i.extend(a, {
                    position: s ? "relative" : "absolute",
                    boxSizing: "content-box",
                    mozBoxSizing: "content-box",
                    webkitBoxSizing: "content-box"
                });
            if (s || i.extend(f, i.css(S, ["width", "height"])), i.css(d, f), d.setAttribute("data-scrollmagic-pin-spacer", ""), i.addClass(d, t.spacerClass), I = {
                spacer: d,
                relSize: {
                    width: "%" === u.width.slice(-1),
                    height: "%" === u.height.slice(-1),
                    autoFullWidth: "auto" === u.width && s && i.isMarginCollapseType(a.display)
                },
                pushFollowers: t.pushFollowers,
                inFlow: s
            }, !S.___origStyle) {
                S.___origStyle = {};
                var h = S.style;
                r.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function(e) {
                    S.___origStyle[e] = h[e] || ""
                })
            }
            return I.relSize.width && i.css(d, {
                width: u.width
            }), I.relSize.height && i.css(d, {
                height: u.height
            }), d.appendChild(S), i.css(S, {
                position: s ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (I.relSize.width || I.relSize.autoFullWidth) && i.css(S, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }), window.addEventListener("scroll", D), window.addEventListener("resize", D), window.addEventListener("resize", N), S.addEventListener("mousewheel", R), S.addEventListener("DOMMouseScroll", R), m(3, "added pin"), O(), l
        }, this.removePin = function(e) {
            if (S) {
                if ("DURING" === u && O(!0), e || !r) {
                    var t = I.spacer.firstChild;
                    if (t.hasAttribute("data-scrollmagic-pin-spacer")) {
                        var n = I.spacer.style,
                            o = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                        margins = {}, o.forEach(function(e) {
                            margins[e] = n[e] || ""
                        }), i.css(t, margins)
                    }
                    I.spacer.parentNode.insertBefore(t, I.spacer), I.spacer.parentNode.removeChild(I.spacer), S.parentNode.hasAttribute("data-scrollmagic-pin-spacer") || (i.css(S, S.___origStyle), delete S.___origStyle)
                }
                window.removeEventListener("scroll", D), window.removeEventListener("resize", D), window.removeEventListener("resize", N), S.removeEventListener("mousewheel", R), S.removeEventListener("DOMMouseScroll", R), S = void 0, m(3, "removed pin (reset: " + (e ? "true" : "false") + ")")
            }
            return l
        };
        var L,
            P = [];
        return l.on("destroy.internal", function(e) {
            l.removeClassToggle(e.reset)
        }), this.setClassToggle = function(e, t) {
            var n = i.get.elements(e);
            return 0 !== n.length && i.type.String(t) ? (P.length > 0 && l.removeClassToggle(), L = t, P = n, l.on("enter.internal_class leave.internal_class", function(e) {
                var t = "enter" === e.type ? i.addClass : i.removeClass;
                P.forEach(function(e, n) {
                    t(e, L)
                })
            }), l) : (m(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === n.length ? "element" : "classes") + " supplied."), l)
        }, this.removeClassToggle = function(e) {
            return e && P.forEach(function(e, t) {
                i.removeClass(e, L)
            }), l.off("start.internal_class end.internal_class"), L = void 0, P = [], l
        }, function() {
            for (var e in c)
                a.hasOwnProperty(e) || (m(2, 'WARNING: Unknown option "' + e + '"'), delete c[e]);
            for (var t in a)
                C(t);
            T()
        }(), l
    };
    var n = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(e) {
                if (e = parseFloat(e), !i.type.Number(e))
                    throw ['Invalid value for option "offset":', e];
                return e
            },
            triggerElement: function(e) {
                if (e = e || void 0) {
                    var t = i.get.elements(e)[0];
                    if (!t)
                        throw ['Element defined in option "triggerElement" was not found:', e];
                    e = t
                }
                return e
            },
            triggerHook: function(e) {
                var t = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (i.type.Number(e))
                    e = Math.max(0, Math.min(parseFloat(e), 1));
                else {
                    if (!(e in t))
                        throw ['Invalid value for option "triggerHook": ', e];
                    e = t[e]
                }
                return e
            },
            reverse: function(e) {
                return !!e
            },
            loglevel: function(e) {
                if (e = parseInt(e), !i.type.Number(e) || e < 0 || e > 3)
                    throw ['Invalid value for option "loglevel":', e];
                return e
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    e.Scene.addOption = function(t, i, o, r) {
        t in n.defaults ? e._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + t + "', because it already exists.") : (n.defaults[t] = i, n.validate[t] = o, r && n.shifts.push(t))
    }, e.Scene.extend = function(t) {
        var n = this;
        e.Scene = function() {
            return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this
        }, i.extend(e.Scene, n), e.Scene.prototype = n.prototype, e.Scene.prototype.constructor = e.Scene
    }, e.Event = function(e, t, n, i) {
        i = i || {};
        for (var o in i)
            this[o] = i[o];
        return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this
    };
    var i = e._util = function(e) {
        var t,
            n = {},
            i = function(e) {
                return parseFloat(e) || 0
            },
            o = function(t) {
                return t.currentStyle ? t.currentStyle : e.getComputedStyle(t)
            },
            r = function(t, n, r, s) {
                if ((n = n === document ? e : n) === e)
                    s = !1;
                else if (!p.DomElement(n))
                    return 0;
                t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
                var a = (r ? n["offset" + t] || n["outer" + t] : n["client" + t] || n["inner" + t]) || 0;
                if (r && s) {
                    var l = o(n);
                    a += "Height" === t ? i(l.marginTop) + i(l.marginBottom) : i(l.marginLeft) + i(l.marginRight)
                }
                return a
            },
            s = function(e) {
                return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(e) {
                    return e[1].toUpperCase()
                })
            };
        n.extend = function(e) {
            for (e = e || {}, t = 1; t < arguments.length; t++)
                if (arguments[t])
                    for (var n in arguments[t])
                        arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
            return e
        }, n.isMarginCollapseType = function(e) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        };
        var a = 0,
            l = ["ms", "moz", "webkit", "o"],
            c = e.requestAnimationFrame,
            u = e.cancelAnimationFrame;
        for (t = 0; !c && t < l.length; ++t)
            c = e[l[t] + "RequestAnimationFrame"], u = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];
        c || (c = function(t) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16 - (n - a)),
                o = e.setTimeout(function() {
                    t(n + i)
                }, i);
            return a = n + i, o
        }), u || (u = function(t) {
            e.clearTimeout(t)
        }), n.rAF = c.bind(e), n.cAF = u.bind(e);
        var d = ["error", "warn", "log"],
            f = e.console || {};
        for (f.log = f.log || function() {}, t = 0; t < d.length; t++) {
            var h = d[t];
            f[h] || (f[h] = f.log)
        }
        n.log = function(e) {
            (e > d.length || e <= 0) && (e = d.length);
            var t = new Date,
                n = ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2) + ":" + ("00" + t.getMilliseconds()).slice(-3),
                i = d[e - 1],
                o = Array.prototype.splice.call(arguments, 1),
                r = Function.prototype.bind.call(f[i], f);
            o.unshift(n), r.apply(f, o)
        };
        var p = n.type = function(e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        p.String = function(e) {
            return "string" === p(e)
        }, p.Function = function(e) {
            return "function" === p(e)
        }, p.Array = function(e) {
            return Array.isArray(e)
        }, p.Number = function(e) {
            return !p.Array(e) && e - parseFloat(e) + 1 >= 0
        }, p.DomElement = function(e) {
            return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        var g = n.get = {};
        return g.elements = function(t) {
            var n = [];
            if (p.String(t))
                try {
                    t = document.querySelectorAll(t)
                } catch (e) {
                    return n
                }
            if ("nodelist" === p(t) || p.Array(t))
                for (var i = 0, o = n.length = t.length; i < o; i++) {
                    var r = t[i];
                    n[i] = p.DomElement(r) ? r : g.elements(r)
                }
            else
                (p.DomElement(t) || t === document || t === e) && (n = [t]);
            return n
        }, g.scrollTop = function(t) {
            return t && "number" == typeof t.scrollTop ? t.scrollTop : e.pageYOffset || 0
        }, g.scrollLeft = function(t) {
            return t && "number" == typeof t.scrollLeft ? t.scrollLeft : e.pageXOffset || 0
        }, g.width = function(e, t, n) {
            return r("width", e, t, n)
        }, g.height = function(e, t, n) {
            return r("height", e, t, n)
        }, g.offset = function(e, t) {
            var n = {
                top: 0,
                left: 0
            };
            if (e && e.getBoundingClientRect) {
                var i = e.getBoundingClientRect();
                n.top = i.top, n.left = i.left, t || (n.top += g.scrollTop(), n.left += g.scrollLeft())
            }
            return n
        }, n.addClass = function(e, t) {
            t && (e.classList ? e.classList.add(t) : e.className += " " + t)
        }, n.removeClass = function(e, t) {
            t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        }, n.css = function(e, t) {
            if (p.String(t))
                return o(e)[s(t)];
            if (p.Array(t)) {
                var n = {},
                    i = o(e);
                return t.forEach(function(e, t) {
                    n[e] = i[s(e)]
                }), n
            }
            for (var r in t) {
                var a = t[r];
                a == parseFloat(a) && (a += "px"), e.style[s(r)] = a
            }
        }, n
    }(window || {});
    return e.Scene.prototype.addIndicators = function() {
        return e._util.log(1, "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
    }, e.Scene.prototype.removeIndicators = function() {
        return e._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
    }, e.Scene.prototype.setTween = function() {
        return e._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
    }, e.Scene.prototype.removeTween = function() {
        return e._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
    }, e.Scene.prototype.setVelocity = function() {
        return e._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
    }, e.Scene.prototype.removeVelocity = function() {
        return e._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
    }, e
}), function(e) {
    var t = {
            common: {
                init: function() {
                    e("#frontpageHeader, #sectionsPageMainHeader").on("show.bs.collapse", function() {
                        e(this).parents("nav.navbar").addClass("navbar-header-mobile"), e("header.banner").addClass("header-mobile"), e("html, body").css("overflow", "hidden")
                    }), e("#frontpageHeader, #sectionsPageMainHeader").on("hidden.bs.collapse", function() {
                        e(this).parents("nav.navbar").removeClass("navbar-header-mobile"), e("header.banner").removeClass("header-mobile"), e("html, body").css("overflow", "")
                    }), e("header.banner .menu-mobile-scroll .language-header-selector.toggler a").on("click", function(t) {
                        t.preventDefault(), t.stopPropagation(), e("header.banner .menu-mobile-scroll .search-header-mobile.toggler").removeClass("show"), e("header.banner .menu-mobile-scroll .search-header-mobile.menu").removeClass("show"), e(this).parents(".language-header-nav").find(".language-header-selector.toggler .dropdown").toggleClass("show"), e(this).parents(".language-header-nav").find(".language-header-selector.menu .dropdown-menu").toggleClass("show")
                    }), e("header.banner .menu-mobile-scroll .search-header-mobile.toggler").on("click", function(t) {
                        t.preventDefault(), t.stopPropagation(), e("header.banner .menu-mobile-scroll .language-header-selector.toggler .dropdown").removeClass("show"), e("header.banner .menu-mobile-scroll .language-header-selector.menu .dropdown-menu").removeClass("show"), e(this).toggleClass("show"), e(this).parents(".language-header-nav").find(".search-header-mobile.menu").toggleClass("show")
                    }), e(".sections-page-submenu .menu-mobile-scroll .menu-item.hoverdown .hoverdown-toggle").on("click", function(t) {
                        var n = this;
                        e(".sections-page-submenu .menu-mobile-scroll .menu-item.hoverdown .hoverdown-toggle").each(function() {
                            this !== n && (e(this).parent(".menu-item.hoverdown").removeClass("show"),
                            e(this).parent(".menu-item.hoverdown").find(".hoverdown-menu").removeClass("show"))
                        }), e(n).parent(".menu-item.hoverdown").hasClass("show") ? ("_blank" === e(n).attr("target") ? window.open = e(n).attr("href").toString() : window.location = e(n).attr("href").toString(), e(n).parent(".menu-item.hoverdown").removeClass("show"), e(n).parent(".menu-item.hoverdown").find(".hoverdown-menu").removeClass("show")) : window.innerWidth <= 1023 && (t.preventDefault(), e(n).parent(".menu-item.hoverdown").addClass("show"), e(n).parent(".menu-item.hoverdown").find(".hoverdown-menu").addClass("show"))
                    }), e(".nav-tabs-selector").selectmenu({
                        change: function(t, n) {
                            e(".nav-tabs a#" + n.item.value).tab("show")
                        }
                    }), "" !== window.location.hash && ($hashID = window.location.hash.replace("#", ""), e(".tab-content #" + $hashID).length > 0 && ($currentSelector = e(".nav-tabs-selector option[value=" + $hashID + "-tab]").parent(), e($currentSelector).val($hashID + "-tab"), e($currentSelector).selectmenu("instance").refresh(), e(".nav-tabs a#" + $hashID + "-tab").on("shown.bs.tab", function(t) {
                        $currentOffet = e(window).scrollTop(), $offsetTopHash = e(".tab-content #" + $hashID).offset().top, $tabSelectorHeight = 0, window.innerWidth >= 768 ? $tabSelectorHeight = e(".nav-tabs a#" + $hashID + "-tab").parents(".nav-tabs").outerHeight(!0) : $tabSelectorHeight = e($currentSelector).parent().find(".ui-selectmenu-button").outerHeight(!0), e("html, body").animate({
                            specialEasing: {
                                scrollTop: "easeOutBounce"
                            },
                            scrollTop: $offsetTopHash - $tabSelectorHeight
                        }, 800)
                    }), e(".nav-tabs a#" + $hashID + "-tab").tab("show"))), e("#search-desktop-modal input.search-input, #search-header-mobile input.search-input").on("keypress", function(e) {
                        "Enter" === e.key && ($searchURI = jQuery(this).data("search_uri"), $searchQuery = jQuery(this).val(), window.location = encodeURI($searchURI.replace("+/", "") + $searchQuery))
                    }), e(".nav-tabs a").on("shown.bs.tab", function(e) {
                        jQuery(window).resize()
                    })
                },
                finalize: function() {
                    var t = Cookies.get("t1_alerts_closed"),
                        n = e("section#alerts");
                    n.length && void 0 === t && (e(n).find(".close").on("click", function() {
                        e(n).removeClass("visible");
                        var t = new Date((new Date).getTime() + 36e5);
                        Cookies.set("t1_alerts_closed", !0, {
                            expires: t
                        })
                    }), setTimeout(function() {
                        e(n).addClass("visible")
                    }, 5e3));
                    var i = Cookies.get("t1_cookies_policy"),
                        o = e(".cookies-message-container");
                    o.length && void 0 === i && (e(o).find(".cookies-close").on("click", function(t) {
                        t.preventDefault(), e(o).addClass("hidden");
                        var n = new Date((new Date).getTime() + 31536e6);
                        Cookies.set("t1_cookies_policy", !0, {
                            expires: n
                        })
                    }), setTimeout(function() {
                        e(o).removeClass("hidden")
                    }, 2e3));
                    var r = new ScrollMagic.Controller;
                    e(".mod-animated").each(function(t, n) {
                        new ScrollMagic.Scene({
                            triggerElement: n,
                            duration: "100%"
                        }).addTo(r).on("enter leave", function(t) {
                            e(n).hasClass("trigger-animation") && e(n).removeClass("trigger-animation")
                        })
                    }), Modules.mod09_expandable_content(), Modules.mod09b_faqs_content(), Modules.mod17_two_columns_collection(), Modules.mod18_three_columns_collection(), Modules.mod27c_third_party_table(), Modules.mod28_contact(), Modules.mod27b_excel_table(), Common.t1_footer_persistent_disclaimer()
                }
            },
            home: {
                init: function() {
                    e(".fp-items .item h3, .fp-items .item .item-logo").on("click", function() {
                        var t = this;
                        e(".fp-items .item h3, .fp-items .item .item-logo").each(function() {
                            this !== t && e(this).parents(".item").addClass("colapsed")
                        }), e(t).parents(".item").hasClass("colapsed") ? e(t).parents(".item").removeClass("colapsed") : e(t).parents(".item").addClass("colapsed")
                    })
                },
                finalize: function() {
                    function t(e) {
                        var t = document.documentElement,
                            n = e.getBoundingClientRect();
                        return {
                            top: n.top + window.pageYOffset - t.clientTop,
                            left: n.left + window.pageXOffset - t.clientLeft
                        }
                    }
                    var n = e(".main").outerHeight(),
                        i = e(".licensed-by").outerHeight(),
                        o = e("#alerts").hasClass("visible") ? e("#alerts").outerHeight() : 0;
                    n - i + o > t(e(".licensed-by")[0]).top && e(".licensed-by").addClass("shadow"), e(window).scroll(function() {
                        o = e("#alerts").hasClass("visible") ? e("#alerts").outerHeight() : 0, n - i + o > t(e(".licensed-by")[0]).top ? e(".licensed-by").addClass("shadow") : e(".licensed-by").removeClass("shadow")
                    })
                }
            },
            about_us: {
                init: function() {}
            }
        },
        n = {
            fire: function(e, n, i) {
                var o,
                    r = t;
                n = void 0 === n ? "init" : n, o = "" !== e, o = o && r[e], (o = o && "function" == typeof r[e][n]) && r[e][n](i)
            },
            loadEvents: function() {
                n.fire("common"), e.each(document.body.className.replace(/-/g, "_").split(/\s+/), function(e, t) {
                    n.fire(t), n.fire(t, "finalize")
                }), n.fire("common", "finalize")
            }
        };
    e(document).ready(n.loadEvents)
}(jQuery);
var Common = {
        t1_footer_persistent_disclaimer: function() {
            jQuery(window).resize(function() {
                jQuery(".footer-persistent-disclaimer").length > 0 && ($persistentDisclaimerHeight = jQuery(".footer-persistent-disclaimer").innerHeight(), jQuery("footer.content-info").css("margin-bottom", $persistentDisclaimerHeight + "px"), jQuery(".licensed-by").length > 0 && jQuery(".licensed-by").css("bottom", $persistentDisclaimerHeight + "px"))
            }), jQuery(window).resize()
        }
    },
    Modules = {
        mod09_expandable_content: function() {
            jQuery(".mod-expandable-content .card .expandable-parent").on("hide.bs.collapse", function(e) {
                jQuery(this).find(".subcard .expandable-child").first().collapse("show")
            }), jQuery(".mod-expandable-content .card .expandable-child").on("hide.bs.collapse", function(e) {
                e.stopPropagation()
            })
        },
        mod09b_faqs_content: function() {
            jQuery(".mod-faqs-content .card .expandable-parent").on("hide.bs.collapse", function(e) {
                jQuery(this).find(".subcard .expandable-child").first().collapse("show")
            }), jQuery(".mod-faqs-content .card .expandable-child").on("hide.bs.collapse", function(e) {
                e.stopPropagation()
            })
        },
        mod17_two_columns_collection: function() {
            jQuery(window).resize(function() {
                jQuery(".mod-two-columns-collection .columns-container .column").each(function(e, t) {
                    var n = jQuery(t).find(".item-desc"),
                        i = jQuery(n).innerHeight(),
                        o = jQuery(n).prop("scrollHeight"),
                        r = jQuery(t).find(".icon");
                    jQuery(n).css("height", ""), jQuery(r).removeClass("icon-less opened hidden").addClass("icon-plus"), o !== i || jQuery(n).hasClass("opened") ? (jQuery(n).removeClass("opened"), jQuery(r).unbind("click"), jQuery(r).on("click", function(e) {
                        jQuery(r).hasClass("icon-plus") ? (jQuery(n).css("height", o + "px"), jQuery(r).removeClass("icon-plus").addClass("icon-less opened"), jQuery(n).addClass("opened")) : (jQuery(n).css("height", ""), jQuery(r).removeClass("icon-less opened").addClass("icon-plus"), jQuery(n).removeClass("opened"))
                    })) : jQuery(r).addClass("hidden")
                })
            }), jQuery(window).resize()
        },
        mod18_three_columns_collection: function() {
            jQuery(window).resize(function() {
                jQuery(".mod-three-columns-collection .columns-container .column").each(function(e, t) {
                    var n = jQuery(t).find(".item-desc"),
                        i = jQuery(n).innerHeight(),
                        o = jQuery(n).prop("scrollHeight"),
                        r = jQuery(t).find(".icon");
                    jQuery(n).css("height", ""), jQuery(r).removeClass("icon-less opened hidden").addClass("icon-plus"), o !== i || jQuery(n).hasClass("opened") ? (jQuery(n).removeClass("opened"), jQuery(r).unbind("click"), jQuery(r).on("click", function(e) {
                        jQuery(r).hasClass("icon-plus") ? (jQuery(n).css("height", o + "px"), jQuery(r).removeClass("icon-plus").addClass("icon-less opened"), jQuery(n).addClass("opened")) : (jQuery(n).css("height", ""), jQuery(r).removeClass("icon-less opened").addClass("icon-plus"), jQuery(n).removeClass("opened"))
                    })) : jQuery(r).addClass("hidden")
                })
            }), jQuery(window).resize()
        },
        mod27c_third_party_table: function() {
            jQuery(".mod-third-party-table .showfulllist-action").on("click", function(e) {
                $that = this, e.preventDefault(), $expanded = jQuery($that).data("expanded"), $iframe = jQuery(this).parents(".mod-third-party-table").find(".spread-iframe")[0], $expanded ? (service_url = jQuery($iframe).data("service_colapsed"), jQuery($iframe).attr("src", service_url), jQuery($iframe).css("height", jQuery($iframe).data("colapsed_size") + "px"), jQuery($that).data("expanded", !1), jQuery($that).text(jQuery($that).data("more")), jQuery($that).removeClass("less"), jQuery("html, body").animate({
                    scrollTop: jQuery($that).parents(".mod-third-party-table").find(".spread-iframe").offset().top
                }, 500)) : (service_url = jQuery($iframe).data("service"), jQuery($iframe).attr("src", service_url), jQuery($iframe).css("height", jQuery($iframe).data("fullsize") + "px"), jQuery($that).data("expanded", !0), jQuery($that).text(jQuery($that).data("less")), jQuery($that).addClass("less"))
            })
        },
        mod28_contact: function() {
            jQuery(".mod-contact-form form select").selectmenu({
                position: {
                    my: "left top+6",
                    at: "left bottom",
                    collision: "none"
                },
                appendTo: ".contact-form-menu-container"
            })
        },
        mod27b_excel_table: function() {
            jQuery(".mod-excel-table .table-wrapper .showfulllist-action").on("click", function(e) {
                $that = this, e.preventDefault(), $tableType = jQuery($that).data("table_type"), $expanded = jQuery($that).data("expanded"), $disabled = jQuery($that).data("disabled"), $selectedSymbols = jQuery($that).data("selected_symbols"), $expanded || $disabled ? $expanded && !$disabled && (jQuery($that).parents(".table-wrapper").find("tbody tr.expand-remove").remove(), jQuery($that).data("expanded", !1), jQuery($that).text(jQuery($that).data("more")), jQuery($that).removeClass("less"), jQuery("html, body").animate({
                    scrollTop: jQuery($that).parents(".table-wrapper").offset().top
                }, 500)) : jQuery.ajax({
                    type: "GET",
                    url: "utils/AjaxMirror",
                    data: {
                        action: "mod27bexceltable",
                        tableType: $tableType,
                        selectedSymbols: $selectedSymbols
                    },
                    beforeSend: function() {
                        jQuery($that).data("disabled", !0), jQuery($that).text(jQuery($that).data("loading")), jQuery($that).addClass("loading")
                    },
                    success: function(e) {
                        $parsedJson = jQuery.parseJSON(e), jQuery($that).parents(".table-wrapper").find("tbody").append($parsedJson), jQuery($that).data("disabled", !1), jQuery($that).data("expanded", !0), jQuery($that).text(jQuery($that).data("less")), jQuery($that).removeClass("loading").addClass("less")
                    }
                })
            })
        }
    };

