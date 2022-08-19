import { defineStore } from 'pinia'

export type ResultType = (string | { name: string; rarity: string; })[]

export const useResultStore = defineStore({
  id: 'results',
  state: (): { results: ResultType } => ({
    results: []
  }),
  getters: {
    // doubleCount: (state) => state.results * 2
  },
  actions: {
    set_results(results: ResultType) {
      this.results = results
    }
  }
})
