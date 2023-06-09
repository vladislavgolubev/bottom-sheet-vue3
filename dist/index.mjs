import { ref as m, inject as O, withModifiers as R, defineComponent as P, onUnmounted as C, onMounted as A, createVNode as d, watch as $, Teleport as q, Transition as N, mergeProps as _ } from "vue";
const j = "data-bottom-sheet-stop", b = {
  type: Boolean,
  default: !1
}, Y = {
  threshold: {
    type: Number,
    default: 100
  },
  onlyHeaderSwipe: b,
  noStretch: b,
  noClickOutside: b,
  noHeader: b
}, T = Symbol("BottomSheet");
function D() {
  const n = m(-1);
  let l = 0;
  const i = {
    activeSheet: n,
    id: () => ++l
  };
  return {
    install(g) {
      g.provide(T, i);
    }
  };
}
function L() {
  return O(T);
}
function z(n, l) {
  return R(n, l);
}
const F = P({
  name: "SheetRenderer",
  props: {
    ...Y,
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
    const g = L(), t = m(null), S = m(null);
    C(() => l("updateElement", null));
    let h = !0;
    const p = z(() => {
      n.noClickOutside || !h || l("close");
    }, ["self"]), v = m(!1), r = m(0), o = m(0);
    let s = !1, u = 0, c;
    function f() {
      u = t.value.getBoundingClientRect().height;
    }
    function M() {
      var e, a;
      (e = t.value) == null || e.style.removeProperty("height"), (a = t.value) == null || a.style.removeProperty("max-height"), u = 0, v.value = !1, r.value = 0, o.value = 0;
    }
    function E(e) {
      if (!s)
        return;
      let a;
      if ("touches" in e ? (a = e.touches[0].clientY, e.preventDefault()) : a = e.clientY, a === o.value) {
        v.value = !1;
        return;
      }
      v.value = !0, r.value = a - o.value, h = !1, r.value < 0 && !n.noStretch ? (t.value.style.setProperty("height", `${u + Math.abs(r.value)}px`), t.value.style.setProperty("max-height", "none")) : (t.value.style.removeProperty("height"), t.value.style.removeProperty("max-height"));
    }
    function k(e) {
      e.target instanceof HTMLElement && e.target.closest(`[${j}]`) || ("touches" in e ? o.value = e.touches[0].clientY : o.value = e.clientY, s = !0);
    }
    function w() {
      !s || (r.value >= n.threshold ? l("close") : setTimeout(() => {
        var y;
        h = !0;
        const e = t.value ? t.value.getBoundingClientRect().height : 0, a = (y = t.value) == null ? void 0 : y.animate([{
          height: `${e}px`
        }, {
          height: `${u}px`
        }], {
          duration: 200,
          easing: "ease"
        });
        a == null || a.addEventListener("finish", () => {
          t.value && (t.value.style.removeProperty("height"), t.value.style.removeProperty("max-height"));
        });
      }), v.value = !1, o.value = 0, r.value = 0, s = !1);
    }
    function x(e) {
      n.onlyHeaderSwipe && k(e);
    }
    function H(e) {
      n.onlyHeaderSwipe || k(e);
    }
    const B = [["resize", M], ["resize", f], ["mousemove", E], ["mouseup", w], ["touchend", w], ["touchcancel", w], ["touchmove", E, {
      passive: !1
    }]];
    return A(() => {
      c = new MutationObserver(f), c.observe(S.value, {
        childList: !0,
        subtree: !0
      }), f();
      for (const [e, a, y] of B)
        window.addEventListener(e, a, y);
    }), C(() => {
      for (const [e, a] of B)
        window.removeEventListener(e, a);
      c && c.disconnect();
    }), () => {
      var e;
      return d("div", {
        class: "bottom-sheet-backdrop",
        "data-sheet-active": n.id === g.activeSheet.value ? "" : null,
        draggable: !1,
        onClick: p,
        onMousedown: H,
        onTouchstart: H
      }, [d("div", {
        ref: t,
        class: "bottom-sheet",
        "data-swiping": v.value ? "" : null,
        style: {
          transform: `translateY(${Math.max(r.value, 0)}px)`
        }
      }, [n.noHeader ? null : d("div", {
        onMousedown: x,
        onTouchstart: x,
        class: "bottom-sheet-header"
      }, [i.header ? i.header() : d("div", {
        class: "bottom-sheet-header-bar"
      }, null)]), d("div", {
        class: "bottom-sheet-body",
        ref: S
      }, [(e = i.default) == null ? void 0 : e.call(i)])])]);
    };
  }
}), K = P({
  name: "Sheet",
  inheritAttrs: !1,
  props: {
    ...Y,
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
    emit: g
  }) {
    const t = L(), S = t.id();
    let h = t.activeSheet.value;
    $(() => n.visible, (o) => {
      o ? (h = t.activeSheet.value, t.activeSheet.value = S) : t.activeSheet.value = h;
    }, {
      immediate: !0
    });
    function p() {
      g("update:visible", !1);
    }
    function v(o, s) {
      const u = o.querySelector(".bottom-sheet"), c = window.getComputedStyle(o).backgroundColor;
      o.animate([{
        backgroundColor: "rgba(0, 0, 0, 0)"
      }, {
        backgroundColor: c
      }], {
        duration: 300,
        easing: "ease"
      });
      const f = u.animate([{
        transform: "translateY(100%)"
      }, {
        transform: "translateY(0%)"
      }], {
        duration: 300,
        easing: "ease"
      });
      f.onfinish = s;
    }
    function r(o, s) {
      const u = o.querySelector(".bottom-sheet"), c = window.getComputedStyle(o).backgroundColor;
      o.animate([{
        backgroundColor: c
      }, {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }], {
        duration: 300,
        easing: "ease"
      });
      const f = u.animate([{
        transform: "translateY(0%)"
      }, {
        transform: "translateY(100%)"
      }], {
        duration: 300,
        easing: "ease"
      });
      f.onfinish = s;
    }
    return C(() => {
      t.activeSheet.value = h;
    }), () => d(q, {
      to: "body"
    }, {
      default: () => [d(N, {
        css: !1,
        onEnter: v,
        onLeave: r
      }, {
        default: () => [n.visible && d(F, _({
          id: S,
          onClose: p
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
  K as Sheet,
  D as createBottomSheet
};
