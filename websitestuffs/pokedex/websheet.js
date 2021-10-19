! function(e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).websheet = e()
  }
}(function() {
  var e, t, s;
  return function() {
    return function e(t, s, o) {
      function n(r, i) {
        if (!s[r]) {
          if (!t[r]) {
            var h = "function" == typeof require && require;
            if (!i && h) return h(r, !0);
            if (a) return a(r, !0);
            var l = new Error("Cannot find module '" + r + "'");
            throw l.code = "MODULE_NOT_FOUND", l
          }
          var c = s[r] = {
            exports: {}
          };
          t[r][0].call(c.exports, function(e) {
            return n(t[r][1][e] || e)
          }, c, c.exports, e, t, s, o)
        }
        return s[r].exports
      }
      for (var a = "function" == typeof require && require, r = 0; r < o.length; r++) n(o[r]);
      return n
    }
  }()({
    1: [function(e, t, s) {
      "use strict";
      Object.defineProperty(s, "__esModule", {
        value: !0
      });
      s.default = class {
        constructor(e) {
          this.enabled = e, this.fetchData = (e => {
            if (!this.enabled) return null;
            try {
              const t = localStorage.getItem(`websheet:${e}`);
              return JSON.parse(t)
            } catch (e) {
              return null
            }
          }), this.setData = ((e, t) => {
            this.enabled && localStorage.setItem(`websheet:${e}`, JSON.stringify(t))
          }), !1 !== this.enabled && (this.enabled = !0)
        }
      }
    }, {}],
    2: [function(e, t, s) {
      "use strict";
      Object.defineProperty(s, "__esModule", {
        value: !0
      });
      s.default = [{
        attribute: /^data-websheet-text$/,
        valueSource: "column",
        handler: (e, t, s) => {
          s && (e.innerText = s.formatted || s.value)
        }
      }, {
        attribute: /^data-websheet-html$/,
        valueSource: "column",
        handler: (e, t, s) => {
          s && (e.innerHTML = s.value)
        }
      }, {
        attribute: /^data-websheet-if$/,
        valueSource: "column",
        handler: (e, t, s) => {
          s && s.value || e.remove()
        }
      }, {
        attribute: /^data-websheet-unless$/,
        valueSource: "column",
        handler: (e, t, s) => {
          s && s.value && e.remove()
        }
      }, {
        attribute: /^data-websheet-bind:(.*)$/,
        valueSource: "column",
        handler: (e, t, s) => {
          const o = t.match(/^data-websheet-bind:(.*)$/)[1];
          s && e.setAttribute(o, s.formatted || s.value)
        }
      }]
    }, {}],
    3: [function(e, t, s) {
      "use strict";
      Object.defineProperty(s, "__esModule", {
        value: !0
      });
      const o = e("./cache"),
        n = e("./snapshots"),
        a = e("./style"),
        r = e("./formatters");
      window._websheet_handlers = {}, document.head.insertAdjacentHTML("beforeend", a.default);
      class i {
        constructor(e, t) {
          this.dataset = e, this.options = t, this.abort = (e => {
            this.snapshots.restore("initial");
            for (const e of this.sections) e.classList.remove("websheet--loaded"), e.classList.add("websheet--error");
            throw new Error(`[websheet:${this.dataset}] ${e}`)
          }), this.onDataReceived = ((e, t = !1) => {
            "error" === e.status && this.abort(e.errors.map(e => e.detailed_message).join(", "));
            const s = e.table.rows.map(t => {
              const s = {};
              for (const o in e.table.cols) {
                const n = e.table.cols[o];
                if ("" === n.label) continue;
                let a = t.c[o] && t.c[o].v || null;
                !a || "date" !== n.type && "datetime" !== n.type || (a = eval(`new ${a}`)), s[n.label] = {
                  type: n.type,
                  value: a,
                  formatted: t.c[o] && t.c[o].f || null
                }
              }
              if (this.options.aliases)
                for (const e of Object.keys(this.options.aliases)) {
                  const t = this.options.aliases[e](s);
                  s[e] = {
                    type: typeof t,
                    value: t,
                    formatted: null
                  }
                }
              return s
            });
            if (this.options.caching)
              if (t) this.cachedVersionSig = e.sig;
              else {
                if (e.sig === this.cachedVersionSig) return;
                this.cache.setData(this.googleSheetUrl, e), this.snapshots.hasVersion("before_cache_applied") && this.snapshots.restore("before_cache_applied")
              } t && this.snapshots.capture("before_cache_applied");
            for (const e of this.sections) this.renderSection(e, s);
            this.options.onLoaded && !t && this.options.onLoaded(s)
          }), this.sections = [...document.querySelectorAll(`[data-websheet="${e}"]`)].map(e => e), this.snapshots = new n.Snapshots(this.sections), this.snapshots.capture("initial"), this.cache = new o.default(this.options.caching), this.templates = {};
          const s = document.querySelectorAll("[data-websheet-template]");
          for (const e of s) {
            const t = e.dataset.websheetTemplate;
            this.templates[t] = e
          }
          this.renderTemplates(), this.snapshots.capture("initial")
        }
        exec() {
          this.options.url && this.options.sheet || this.abort("Missing url or sheet"), /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]*)\//g.exec(this.options.url) || this.abort("Invalid spreadsheet url"), this.fetchData(this.onDataReceived);
          const e = this.cache.fetchData(this.googleSheetUrl);
          e && this.onDataReceived(e, !0)
        }
        renderTemplates() {
          const e = document.querySelectorAll("[data-websheet-render]");
          for (const t of e) {
            const e = t.dataset.websheetRender;
            this.templates[e] || this.abort(`Template '${e}' not defined`), t.innerHTML = this.templates[e].innerHTML
          }
        }
        fetchData(e) {
          const t = Object.keys(window._websheet_handlers).length,
            s = {
              tqx: "out:json;responseHandler:window._websheet_handlers.dataset" + t,
              sheet: this.options.sheet,
              headers: 1,
              tq: this.options.query ? this.options.query.trim() : "select *"
            },
            o = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]*)\//g.exec(this.options.url),
            n = Object.keys(s).map(e => `${e}=${encodeURIComponent(s[e])}`);
          this.googleSheetUrl = `https://docs.google.com/spreadsheets/d/${o[1]}/gviz/tq?${n.join("&")}`, window._websheet_handlers[`dataset${t}`] = e, fetch(this.googleSheetUrl).then(e => {
            if (404 === e.status) throw new Error("spreadsheet not found");
            if (200 !== e.status) throw new Error(`error ${e.status}`);
            return e.text()
          }).then(e => eval(e)).catch(e => {
            this.abort(`An error occured while trying to fetch data: ${e.stack}`)
          })
        }
        renderSection(e, t) {
          const s = [];
          for (const o of t) {
            const t = e.cloneNode(!0);
            for (const e of r.default) {
              const s = [...t.querySelectorAll("*")].filter(t => {
                for (const s of t.getAttributeNames())
                  if (s.match(e.attribute)) return !0;
                return !1
              });
              for (const t of s)
                for (const s of t.getAttributeNames())
                  if (s.match(e.attribute)) {
                    const n = s.substring(5).replace(/-[a-z]/g, e => e.substring(1).toUpperCase()),
                      a = t.dataset[n].trim();
                    "column" === e.valueSource ? o[a] ? e.handler(t, s, o[a]) : this.abort(`Column or alias '${a}' not found (used in ${s})`) : e.handler(t, s, a)
                  }
            }
            t.className = `${t.className} websheet--loaded`, s.push(t)
          }
          e.style.display = "none";
          for (let t = 0; t < s.length; t++) {
            const o = 0 === t ? e : s[t - 1];
            o.parentNode.insertBefore(s[t], o.nextSibling)
          }
        }
      }
      t.exports = ((e, t) => {
        new i(e, t).exec()
      })
    }, {
      "./cache": 1,
      "./formatters": 2,
      "./snapshots": 4,
      "./style": 5
    }],
    4: [function(e, t, s) {
      "use strict";
      Object.defineProperty(s, "__esModule", {
        value: !0
      }), s.Snapshots = void 0;
      s.Snapshots = class {
        constructor(e) {
          this.versions = [], this.sections = e.map(e => ({
            element: e,
            versions: {}
          }))
        }
        hasVersion(e) {
          return this.versions.includes(e)
        }
        capture(e) {
          for (const t of this.sections) t.versions[e] = t.element.innerHTML;
          this.hasVersion(e) || this.versions.push(e)
        }
        restore(e) {
          if (!this.hasVersion(e)) throw new Error(`websheet versioning: version ${e} not found`);
          for (const t of this.sections) t.element.innerHTML = t.versions[e]
        }
      }
    }, {}],
    5: [function(e, t, s) {
      "use strict";
      Object.defineProperty(s, "__esModule", {
        value: !0
      }), s.default = "<style>\n\n.websheet--loaded[data-websheet] [data-websheet-on\\:loaded] {\n    display: block;\n}\n\n.websheet--error[data-websheet] [data-websheet-on\\:error] {\n    display: block;\n}\n\n.websheet--error[data-websheet] [data-websheet-on\\:loading] {\n    display: none;\n}\n\n[data-websheet-template],\n[data-websheet] [data-websheet-on\\:loaded],\n[data-websheet] [data-websheet-on\\:error],\n.websheet--loaded[data-websheet] [data-websheet-on\\:loading] {\n    display: none;\n}\n\n</style>"
    }, {}]
  }, {}, [3])(3)
});
