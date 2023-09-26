import { ref as g, inject as O, withModifiers as R, defineComponent as Y, onUnmounted as E, onMounted as A, createVNode as c, watch as $, Teleport as q, Transition as N, mergeProps as _ } from "vue";
const j = "data-bottom-sheet-stop", C = {
  type: Boolean,
  default: !1
}, T = {
  threshold: {
    type: Number,
    default: 100
  },
  onlyHeaderSwipe: C,
  noStretch: C,
  noClickOutside: C,
  noHeader: C
}, L = Symbol("BottomSheet");
function D() {
  const n = g(-1);
  let i = 0;
  const r = {
    activeSheet: n,
    id: () => ++i
  };
  return {
    install(S) {
      S.provide(L, r);
    }
  };
}
function M() {
  return O(L);
}
function z(n, i) {
  return R(n, i);
}
const F = Y({
  name: "SheetRenderer",
  props: {
    ...T,
    id: {
      type: Number,
      required: !0
    }
  },
  emits: {
    updateElement: null,
    close: null,
    swipeChange: null
  },
  setup(n, {
    emit: i,
    slots: r
  }) {
    const S = M(), t = g(null), p = g(null);
    E(() => i("updateElement", null));
    let d = !0;
    const w = z(() => {
      n.noClickOutside || !d || i("close");
    }, ["self"]), h = g(!1), l = g(0), s = g(0);
    let f = !1, o = 0, u;
    function v() {
      o = t.value.getBoundingClientRect().height;
    }
    function y() {
      var e, a;
      (e = t.value) == null || e.style.removeProperty("height"), (a = t.value) == null || a.style.removeProperty("max-height"), o = 0, h.value = !1, l.value = 0, s.value = 0;
    }
    function m(e) {
      if (!f)
        return;
      let a;
      if ("touches" in e ? (a = e.touches[0].clientY, e.preventDefault()) : a = e.clientY, a === s.value) {
        h.value = !1;
        return;
      }
      h.value = !0, l.value = a - s.value, d = !1, l.value < 0 && !n.noStretch ? (t.value.style.setProperty("height", `${o + Math.abs(l.value)}px`), t.value.style.setProperty("max-height", "none")) : (t.value.style.removeProperty("height"), t.value.style.removeProperty("max-height"));
    }
    function k(e) {
      e.target instanceof HTMLElement && e.target.closest(`[${j}]`) || ("touches" in e ? s.value = e.touches[0].clientY : s.value = e.clientY, f = !0);
    }
    function x() {
      !f || (l.value >= n.threshold ? (i("swipeChange", l.value), i("close")) : (i("swipeChange", 0), setTimeout(() => {
        var b;
        d = !0;
        const e = t.value ? t.value.getBoundingClientRect().height : 0, a = (b = t.value) == null ? void 0 : b.animate([{
          height: `${e}px`
        }, {
          height: `${o}px`
        }], {
          duration: 200,
          easing: "ease"
        });
        a == null || a.addEventListener("finish", () => {
          t.value && (t.value.style.removeProperty("height"), t.value.style.removeProperty("max-height"));
        });
      })), h.value = !1, s.value = 0, l.value = 0, f = !1);
    }
    function H(e) {
      n.onlyHeaderSwipe && k(e);
    }
    function P(e) {
      n.onlyHeaderSwipe || k(e);
    }
    const B = [["resize", y], ["resize", v], ["mousemove", m], ["mouseup", x], ["touchend", x], ["touchcancel", x], ["touchmove", m, {
      passive: !1
    }]];
    return A(() => {
      u = new MutationObserver(v), u.observe(p.value, {
        childList: !0,
        subtree: !0
      }), v();
      for (const [e, a, b] of B)
        window.addEventListener(e, a, b);
    }), E(() => {
      for (const [e, a] of B)
        window.removeEventListener(e, a);
      u && u.disconnect();
    }), () => {
      var e;
      return c("div", {
        class: "bottom-sheet-backdrop",
        "data-sheet-active": n.id === S.activeSheet.value ? "" : null,
        draggable: !1,
        onClick: w,
        onMousedown: P,
        onTouchstart: P
      }, [c("div", {
        ref: t,
        class: "bottom-sheet",
        "data-swiping": h.value ? "" : null,
        style: {
          transform: `translateY(${Math.max(l.value, 0)}px)`
        }
      }, [n.noHeader ? null : c("div", {
        onMousedown: H,
        onTouchstart: H,
        class: "bottom-sheet-header"
      }, [r.header ? r.header() : c("div", {
        class: "bottom-sheet-header-bar"
      }, null)]), c("div", {
        class: "bottom-sheet-body",
        ref: p
      }, [(e = r.default) == null ? void 0 : e.call(r)])])]);
    };
  }
}), K = Y({
  name: "Sheet",
  inheritAttrs: !1,
  props: {
    ...T,
    visible: {
      type: Boolean,
      required: !0
    }
  },
  emits: {
    "update:visible": null
  },
  setup(n, {
    attrs: i,
    slots: r,
    emit: S
  }) {
    const t = M(), p = t.id();
    let d = t.activeSheet.value, w = 0;
    $(() => n.visible, (o) => {
      o ? (d = t.activeSheet.value, t.activeSheet.value = p) : t.activeSheet.value = d;
    }, {
      immediate: !0
    });
    function h() {
      S("update:visible", !1);
    }
    function l(o, u) {
      const v = o.querySelector(".bottom-sheet"), y = window.getComputedStyle(o).backgroundColor;
      o.animate([{
        backgroundColor: "rgba(0, 0, 0, 0)"
      }, {
        backgroundColor: y
      }], {
        duration: 300,
        easing: "ease"
      });
      const m = v.animate([{
        transform: "translateY(100%)"
      }, {
        transform: "translateY(0%)"
      }], {
        duration: 300,
        easing: "ease"
      });
      m.onfinish = u;
    }
    function s(o, u) {
      const v = o.querySelector(".bottom-sheet"), y = window.getComputedStyle(o).backgroundColor;
      o.animate([{
        backgroundColor: y
      }, {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }], {
        duration: 300,
        easing: "ease"
      });
      const m = v.animate([{
        transform: "translateY(" + w.toString() + "px)"
      }, {
        transform: "translateY(100%)"
      }], {
        duration: 300,
        easing: "ease"
      });
      m.onfinish = u;
    }
    function f(o) {
      w = o;
    }
    return E(() => {
      t.activeSheet.value = d;
    }), () => c(q, {
      to: "body"
    }, {
      default: () => [c(N, {
        css: !1,
        onEnter: l,
        onLeave: s
      }, {
        default: () => [n.visible && c(F, _({
          id: p,
          onClose: h,
          onSwipeChange: f
        }, i, {
          noClickOutside: n.noClickOutside,
          noHeader: n.noHeader,
          noStretch: n.noStretch,
          onlyHeaderSwipe: n.onlyHeaderSwipe,
          threshold: n.threshold
        }), r)]
      })]
    });
  }
});
export {
  K as Sheet,
  D as createBottomSheet
};
