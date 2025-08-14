import { defineComponent as L, useCssVars as F, computed as v, ref as n, onMounted as I, watch as M, createElementBlock as p, openBlock as u, withDirectives as O, createCommentVNode as A, createBlock as k, unref as c, mergeProps as m, toHandlers as U, withCtx as z, Fragment as $, renderList as q, createSlots as G, renderSlot as J, createElementVNode as K, createVNode as Q } from "vue";
import { ElTable as W, ElTableColumn as X, vLoading as Z, ElSwitch as ee, ElPagination as ae } from "element-plus";
const te = { class: "yh-table" }, le = {
  key: 0,
  class: "yhtable-page"
}, ne = {
  key: 0,
  class: "show-all-page"
}, oe = /* @__PURE__ */ L({
  __name: "YHTable",
  props: {
    data: {},
    columns: {},
    on: { default: () => ({}) },
    table: { default: () => ({}) },
    page: { default: () => ({}) },
    showPage: { type: Boolean, default: !1 },
    autoPage: { type: Boolean, default: !0 },
    firstRendder: { type: Boolean, default: !1 },
    showAllBtn: { type: Boolean, default: !1 }
  },
  emits: ["update:currentPage", "update:pageSize"],
  setup(s, { expose: h, emit: y }) {
    F((e) => ({
      "0aa95196": V.value
    }));
    const a = s, d = n(), r = n([]), l = n(1), t = n(0), _ = n(0), o = n(0), b = n(!1), P = n(!1), x = n(!1), T = v(() => ({
      ...a.table,
      data: r.value
    })), E = v(
      () => a.columns.map((e) => ({
        ...e,
        headerAlign: e.headerAlign || "center",
        align: e.align || "center"
      }))
    ), R = v(() => ({
      pageSizes: [10, 20, 30, 50, 100],
      layout: "total, sizes, prev, pager, next, jumper",
      ...a.page,
      pageSize: t.value,
      total: o.value,
      currentPage: l.value
    })), w = v(() => a.showPage ? a.autoPage ? t.value < o.value && o.value > 0 : !0 : !1), V = v(() => w.value || a.showAllBtn ? "calc(100% - 40px)" : "100%"), f = (e = !1) => {
      x.value = !0, e && (l.value = 1), typeof a.data == "function" ? B() : C();
    }, B = async () => {
      P.value = !0;
      try {
        const e = await a.data({ pageNo: l.value, pageSize: t.value });
        e ? (o.value = e.total, r.value = e.list, l.value !== 1 && r.value.length === 0 && (l.value--, B())) : (r.value = [], o.value = 0);
      } finally {
        P.value = !1;
      }
    }, C = () => {
      const e = (l.value - 1) * t.value;
      r.value = a.data.slice(e, l.value * t.value);
    }, D = () => {
      b.value ? t.value = o.value ? o.value : 1e9 : t.value = _.value, l.value = 1, f();
    }, N = (e) => {
      _.value = t.value, t.value = e, f(!0);
    }, Y = (e) => {
      l.value = e, f();
    };
    return I(() => {
      l.value = a.page.currentPage || 1, t.value = a.page.pageSize || a.page.pageSizes?.[0] || 20, _.value = t.value, typeof a.data == "function" ? a.firstRendder && B() : C();
    }), M(
      () => a.data,
      (e) => {
        Array.isArray(e) && (o.value = e.length, a.showPage ? C() : r.value = e);
      },
      { immediate: !0 }
    ), h({
      load: f,
      getTable: () => d.value
    }), (e, g) => (u(), p("div", te, [
      O((u(), k(c(W), m({
        ref_key: "tableRef",
        ref: d
      }, T.value, U(a.on)), {
        default: z(() => [
          (u(!0), p($, null, q(E.value, (i, j) => (u(), k(c(X), m({ key: j }, { ref_for: !0 }, i), G({ _: 2 }, [
            i.render ? {
              name: "default",
              fn: z((H) => [
                J(e.$slots, i.render, m({ ref_for: !0 }, H), void 0, !0)
              ]),
              key: "0"
            } : void 0
          ]), 1040))), 128))
        ]),
        _: 3
      }, 16)), [
        [c(Z), P.value]
      ]),
      e.showAllBtn || w.value ? (u(), p("div", le, [
        e.showAllBtn ? (u(), p("div", ne, [
          g[1] || (g[1] = K("span", { class: "label" }, "显示全部", -1)),
          Q(c(ee), {
            modelValue: b.value,
            "onUpdate:modelValue": g[0] || (g[0] = (i) => b.value = i),
            onChange: D
          }, null, 8, ["modelValue"])
        ])) : A("", !0),
        w.value ? (u(), k(c(ae), m({
          key: 1,
          class: "elPagination is-background"
        }, R.value, {
          onSizeChange: N,
          onCurrentChange: Y
        }), null, 16)) : A("", !0)
      ])) : A("", !0)
    ]));
  }
}), ue = (s, h) => {
  const y = s.__vccOpts || s;
  for (const [a, d] of h)
    y[a] = d;
  return y;
}, S = /* @__PURE__ */ ue(oe, [["__scopeId", "data-v-77607600"]]), se = (s) => {
  s.component("YhTable", S);
}, ve = {
  install: se,
  YhTable: S
};
export {
  S as YhTable,
  ve as default,
  se as install
};
