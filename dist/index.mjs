import { ref as y, inject as L, withModifiers as M, defineComponent as x, onUnmounted as b, onMounted as O, createVNode as c, watch as A, Teleport as R, Transition as q, mergeProps as $ } from "vue";
const N = "data-bottom-sheet-stop", p = {
  type: Boolean,
  default: !1
}, P = {
  threshold: {
    type: Number,
    default: 100
  },
  onlyHeaderSwipe: p,
  noStretch: p,
  noClickOutside: p,
  noHeader: p
}, B = Symbol("BottomSheet");
function I() {
  const t = y(-1);
  let l = 0;
  const i = {
    activeSheet: t,
    id: () => ++l
  };
  return {
    install(m) {
      m.provide(B, i);
    }
  };
}
function Y() {
  return L(B);
}
function _(t, l) {
  return M(t, l);
}
const j = x({
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
  setup(t, {
    emit: l,
    slots: i
  }) {
    const m = Y(), n = y(null);
    b(() => l("updateElement", null));
    let h = !0;
    const S = _(() => {
      t.noClickOutside || !h || l("close");
    }, ["self"]), d = y(!1), r = y(0), s = y(0);
    let o = !1, u = 0;
    function v() {
      u = n.value.getBoundingClientRect().height;
    }
    function g() {
      var e, a;
      (e = n.value) == null || e.style.removeProperty("height"), (a = n.value) == null || a.style.removeProperty("max-height"), u = 0, d.value = !1, r.value = 0, s.value = 0;
    }
    function f(e) {
      if (!o)
        return;
      let a;
      if ("touches" in e ? (a = e.touches[0].clientY, e.preventDefault()) : a = e.clientY, a === s.value) {
        d.value = !1;
        return;
      }
      d.value = !0, r.value = a - s.value, h = !1, r.value < 0 && !t.noStretch ? (n.value.style.setProperty("height", `${u + Math.abs(r.value)}px`), n.value.style.setProperty("max-height", "none")) : (n.value.style.removeProperty("height"), n.value.style.removeProperty("max-height"));
    }
    function C(e) {
      e.target instanceof HTMLElement && e.target.closest(`[${N}]`) || ("touches" in e ? s.value = e.touches[0].clientY : s.value = e.clientY, o = !0);
    }
    function w() {
      !o || (r.value >= t.threshold ? l("close") : setTimeout(() => {
        var a;
        h = !0;
        const e = (a = n.value) == null ? void 0 : a.animate([{
          height: `${u}px`
        }], {
          duration: 200,
          easing: "ease"
        });
        e == null || e.addEventListener("finish", () => {
          n.value && (n.value.style.removeProperty("height"), n.value.style.removeProperty("max-height"));
        });
      }), d.value = !1, s.value = 0, r.value = 0, o = !1);
    }
    function E(e) {
      t.onlyHeaderSwipe && C(e);
    }
    function k(e) {
      t.onlyHeaderSwipe || C(e);
    }
    const H = [["resize", g], ["resize", v], ["mousemove", f], ["mouseup", w], ["touchend", w], ["touchcancel", w], ["touchmove", f, {
      passive: !1
    }]];
    return O(() => {
      v();
      for (const [e, a, T] of H)
        window.addEventListener(e, a, T);
    }), b(() => {
      for (const [e, a] of H)
        window.removeEventListener(e, a);
    }), () => {
      var e;
      return c("div", {
        class: "bottom-sheet-backdrop",
        "data-sheet-active": t.id === m.activeSheet.value ? "" : null,
        draggable: !1,
        onClick: S,
        onMousedown: k,
        onTouchstart: k
      }, [c("div", {
        ref: n,
        class: "bottom-sheet",
        "data-swiping": d.value ? "" : null,
        style: {
          transform: `translateY(${Math.max(r.value, 0)}px)`
        }
      }, [t.noHeader ? null : c("div", {
        onMousedown: E,
        onTouchstart: E,
        class: "bottom-sheet-header"
      }, [i.header ? i.header() : c("div", {
        class: "bottom-sheet-header-bar"
      }, null)]), c("div", {
        class: "bottom-sheet-body"
      }, [(e = i.default) == null ? void 0 : e.call(i)])])]);
    };
  }
}), D = x({
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
  setup(t, {
    attrs: l,
    slots: i,
    emit: m
  }) {
    const n = Y(), h = n.id();
    let S = n.activeSheet.value;
    A(() => t.visible, (o) => {
      o ? (S = n.activeSheet.value, n.activeSheet.value = h) : n.activeSheet.value = S;
    }, {
      immediate: !0
    });
    function d() {
      m("update:visible", !1);
    }
    function r(o, u) {
      const v = o.querySelector(".bottom-sheet"), g = window.getComputedStyle(o).backgroundColor;
      o.animate([{
        backgroundColor: "rgba(0, 0, 0, 0)"
      }, {
        backgroundColor: g
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
    function s(o, u) {
      const v = o.querySelector(".bottom-sheet"), g = window.getComputedStyle(o).backgroundColor;
      o.animate([{
        backgroundColor: g
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
    return b(() => {
      n.activeSheet.value = S;
    }), () => c(R, {
      to: "body"
    }, {
      default: () => [c(q, {
        css: !1,
        onEnter: r,
        onLeave: s
      }, {
        default: () => [t.visible && c(j, $({
          id: h,
          onClose: d
        }, l, {
          noClickOutside: t.noClickOutside,
          noHeader: t.noHeader,
          noStretch: t.noStretch,
          onlyHeaderSwipe: t.onlyHeaderSwipe,
          threshold: t.threshold
        }), i)]
      })]
    });
  }
});
export {
  D as Sheet,
  I as createBottomSheet
};
