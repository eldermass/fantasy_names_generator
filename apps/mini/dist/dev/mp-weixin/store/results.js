"use strict";
var common_vendor = require("../common/vendor.js");
const useResultStore = common_vendor.defineStore({
  id: "results",
  state: () => ({
    results: ["test"]
  }),
  getters: {},
  actions: {
    set_results(results) {
      this.results = results;
    }
  }
});
exports.useResultStore = useResultStore;
