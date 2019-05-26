/*
eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
 */

import Rule from './rules/rule';

const sideLength = 3; // 一辺の長さ
const rule = new Rule(sideLength);
export default {
  namespaced: true,
  state: {
    sideLength,
    turn: true, // 手番(true: 先手, false: 後手)
    data: rule.getLattice(),
    winner: null,
  },
  actions: {
    input({ commit }, box) {
      commit('setData', box);
      const winner = rule.getWinner();
      if (winner !== null) {
        commit('setWinner', winner);
      } else {
        commit('toggleTurn');
      }
    },
  },
  mutations: {
    toggleTurn(state) {
      state.turn = !state.turn;
    },
    setData(state, box) {
      const { col, row, value } = box;
      state.data[`${col}`][`${row}`] = value;
    },
    setWinner(state, winner) {
      state.winner = winner;
    },
    refresh(state) {
      state.turn = true;
      state.data = rule.refresh();
      state.winner = null;
    },
  },
};
