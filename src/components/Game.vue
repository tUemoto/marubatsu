<template lang="html">
  <v-item-group>
    <v-container grid-list-md>
      <p >
        <span
          v-if="turn"
        >先手</span>
        <span
          v-if="!turn"
        >後手</span>の
        <span
          v-if="winner === null"
        >番</span>
        <span
          v-if="winner !== null"
        >勝ち</span>
        です。
      </p>
      <p></p>
      <v-btn color="info" @click="refresh">もう一度</v-btn>
      <v-layout wrap>
        <v-flex
          v-for="m in sideLength"
          :key="m"
          xs4
        >
          <v-flex
            v-for="n in sideLength"
            :key="`${m}-${n}`"
            xs12
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                dark
                height="200"
                @click="check({col: `${m-1}`, row: `${n-1}`})"
              >
                <v-scroll-y-transition>
                  <div
                    v-if="data[`${m - 1}`][`${n - 1}`] === true"
                    class="display-3 text-xs-center"
                  >
                    ○
                  </div>
                  <div
                    v-if="data[`${m - 1}`][`${n - 1}`] === false"
                    class="display-3 text-xs-center"
                  >
                    ×
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';

export default {
  computed: {
    ...mapState('gameControl', [
      'sideLength',
      'winner',
      'turn',
      'data',
    ])
  },
  methods: {
    check({ col, row}) {
      const box = { col, row, value: this.turn };
      if (this.winner !== null) {
        // 勝者が決まっているなら続けさせない
        alert('勝敗は決しています。');
        return;
      }
      if (this.data[col][row] != null) {
        // 入力済みのマスの変更を許さない
        alert('入力済みです');
        return;
      }
      this.input(box);
    },
    ...mapMutations('gameControl', [
      'refresh',
    ]),
    ...mapActions('gameControl', [
      'input',
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
