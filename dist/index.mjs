import { ref as y, inject as L, withModifiers as M, defineComponent as B, onUnmounted as C, onMounted as O, createVNode as c, watch as R, Teleport as A, Transition as $, mergeProps as q } from "vue";
const N = "data-bottom-sheet-stop", w = {
  type: Boolean,
  default: !1
}, P = {
  threshold: {
    type: Number,
    default: 100
  },
  onlyHeaderSwipe: w,
  noStretch: w,
  noClickOutside: w,
  noHeader: w
}, Y = Symbol("BottomSheet");
function F() {
  const n = y(-1);
  let l = 0;
  const i = {
    activeSheet: n,
    id: () => ++l
  };
  return {
    install(m) {
      m.provide(Y, i);
    }
  };
}
function T() {
  return L(Y);
}
function _(n, l) {
  return M(n, l);
}
const j = B({
  name: "SheetRenderer",
  props: {
    ...P,
    id: {
      type: Number,
      required: !0
    }
  },
  emits: {
    updateElement: null,
    close: null
  },
  setup(n, {
    emit: l,
    slots: i
  }) {
    const m = T(), t = y(null);
    C(() => l("updateElement", null));
    let h = !0;
    const g = _(() => {
      n.noClickOutside || !h || l("close");
    }, ["self"]), d = y(!1), r = y(0), s = y(0);
    let a = !1, u = 0;
    function v() {
      u = t.value.getBoundingClientRect().height;
    }
    function S() {
      var e, o;
      (e = t.value) == null || e.style.removeProperty("height"), (o = t.value) == null || o.style.removeProperty("max-height"), u = 0, d.value = !1, r.value = 0, s.value = 0;
    }
    function f(e) {
      if (!a)
        return;
      let o;
      if ("touches" in e ? (o = e.touches[0].clientY, e.preventDefault()) : o = e.clientY, o === s.value) {
        d.value = !1;
        return;
      }
      d.value = !0, r.value = o - s.value, h = !1, r.value < 0 && !n.noStretch ? (t.value.style.setProperty("height", `${u + Math.abs(r.value)}px`), t.value.style.setProperty("max-height", "none")) : (t.value.style.removeProperty("height"), t.value.style.removeProperty("max-height"));
    }
    function E(e) {
      e.target instanceof HTMLElement && e.target.closest(`[${N}]`) || ("touches" in e ? s.value = e.touches[0].clientY : s.value = e.clientY, a = !0);
    }
    function b() {
      !a || (r.value >= n.threshold ? l("close") : setTimeout(() => {
        var p;
        h = !0;
        const e = t.value ? t.value.getBoundingClientRect().height : 0, o = (p = t.value) == null ? void 0 : p.animate([{
          height: `${e}px`
        }, {
          height: `${u}px`
        }], {
          duration: 200,
          easing: "ease"
        });
        o == null || o.addEventListener("finish", () => {
          t.value && (t.value.style.removeProperty("height"), t.value.style.removeProperty("max-height"));
        });
      }), d.value = !1, s.value = 0, r.value = 0, a = !1);
    }
    function k(e) {
      n.onlyHeaderSwipe && E(e);
    }
    function x(e) {
      n.onlyHeaderSwipe || E(e);
    }
    const H = [["resize", S], ["resize", v], ["mousemove", f], ["mouseup", b], ["touchend", b], ["touchcancel", b], ["touchmove", f, {
      passive: !1
    }]];
    return O(() => {
      v();
      for (const [e, o, p] of H)
        window.addEventListener(e, o, p);
    }), C(() => {
      for (const [e, o] of H)
        window.removeEventListener(e, o);
    }), () => {
      var e;
      return c("div", {
        class: "bottom-sheet-backdrop",
        "data-sheet-active": n.id === m.activeSheet.value ? "" : null,
        draggable: !1,
        onClick: g,
        onMousedown: x,
        onTouchstart: x
      }, [c("div", {
        ref: t,
        class: "bottom-sheet",
        "data-swiping": d.value ? "" : null,
        style: {
          transform: `translateY(${Math.max(r.value, 0)}px)`
        }
      }, [n.noHeader ? null : c("div", {
        onMousedown: k,
        onTouchstart: k,
        class: "bottom-sheet-header"
      }, [i.header ? i.header() : c("div", {
        class: "bottom-sheet-header-bar"
      }, null)]), c("div", {
        class: "bottom-sheet-body"
      }, [(e = i.default) == null ? void 0 : e.call(i)])])]);
    };
  }
}), I = B({
  name: "Sheet",
  inheritAttrs: !1,
  props: {
    ...P,
    visible: {
      type: Boolean,
      required: !0
    }
  },
  emits: {
    "update:visible": null
  },
  setup(n, {
    attrs: l,
    slots: i,
    emit: m
  }) {
    const t = T(), h = t.id();
    let g = t.activeSheet.value;
    R(() => n.visible, (a) => {
      a ? (g = t.activeSheet.value, t.activeSheet.value = h) : t.activeSheet.value = g;
    }, {
      immediate: !0
    });
    function d() {
      m("update:visible", !1);
    }
    function r(a, u) {
      const v = a.querySelector(".bottom-sheet"), S = window.getComputedStyle(a).backgroundColor;
      a.animate([{
        backgroundColor: "rgba(0, 0, 0, 0)"
      }, {
        backgroundColor: S
      }], {
        duration: 300,
        easing: "ease"
      });
      const f = v.animate([{
        transform: "translateY(100%)"
      }, {
        transform: "translateY(0%)"
      }], {
        duration: 300,
        easing: "ease"
      });
      f.onfinish = u;
    }
    function s(a, u) {
      const v = a.querySelector(".bottom-sheet"), S = window.getComputedStyle(a).backgroundColor;
      a.animate([{
        backgroundColor: S
      }, {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }], {
        duration: 300,
        easing: "ease"
      });
      const f = v.animate([{
        transform: "translateY(0%)"
      }, {
        transform: "translateY(100%)"
      }], {
        duration: 300,
        easing: "ease"
      });
      f.onfinish = u;
    }
    return C(() => {
      t.activeSheet.value = g;
    }), () => c(A, {
      to: "body"
    }, {
      default: () => [c($, {
        css: !1,
        onEnter: r,
        onLeave: s
      }, {
        default: () => [n.visible && c(j, q({
          id: h,
          onClose: d
        }, l, {
          noClickOutside: n.noClickOutside,
          noHeader: n.noHeader,
          noStretch: n.noStretch,
          onlyHeaderSwipe: n.onlyHeaderSwipe,
          threshold: n.threshold
        }), i)]
      })]
    });
  }
});
export {
  I as Sheet,
  F as createBottomSheet
};
