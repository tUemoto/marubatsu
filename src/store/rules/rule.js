/**
 * 指定の行に同じマークが並んでいるかチェックする
 * @param  {Array} line 縦・横・斜めの行の入力値
 * @return {Object} 判定結果
 */
function checkLine(line) {
  if (line[0] === null) {
    // lineの先頭がnullならその行で勝敗はついていないのでreturn
    return { status: false, winner: null };
  }
  let status = true;
  let tmp = line[0];
  line.forEach((box) => {
    if (tmp !== box) {
      status = false;
    }
    tmp = box;
  });
  return { status, winner: status ? tmp : null };
}

/**
 * マス目からチェック対象の行を抽出する
 * @param  {Object} lattice    マス目の入力値 null, true, or false
 * @param  {Integer} sideLength 一辺の長さ
 * @return {Array} 取得結果
 */
function latticeIntoLines(lattice, sideLength) {
  const res = [];
  // 縦のライン
  for (let i = 0; i < sideLength; i += 1) {
    const col = [];
    for (let j = 0; j < sideLength; j += 1) {
      col.push(lattice[`${i}`][`${j}`]);
    }
    res.push(col);
  }
  // 横のライン
  for (let i = 0; i < sideLength; i += 1) {
    const row = [];
    for (let j = 0; j < sideLength; j += 1) {
      row.push(lattice[`${j}`][`${i}`]);
    }
    res.push(row);
  }
  // 対角線のライン
  const diagonalFromTopleft = [];
  for (let i = 0; i < sideLength; i += 1) {
    diagonalFromTopleft.push(lattice[`${i}`][`${i}`]);
  }
  res.push(diagonalFromTopleft);
  const diagonalsFromTopright = [];
  for (let i = 0; i < sideLength; i += 1) {
    const j = sideLength - 1 - i;
    diagonalsFromTopright.push(lattice[`${j}`][`${i}`]);
  }
  res.push(diagonalsFromTopright);
  return res;
}

/**
 * マス目の初期化
 * @param  {Integer} num 一辺の長さ
 * @return {Object} nullで埋めたマス目のデータ
 */
function createLattice(num) {
  const res = {};
  for (let i = 0; i < num; i += 1) {
    if (!res[`${i}`]) {
      res[`${i}`] = {};
    }
    for (let j = 0; j < num; j += 1) {
      res[`${i}`][`${j}`] = null;
    }
  }
  return res;
}

class Rule {
  constructor(num) {
    if (typeof num !== 'number') {
      throw Error('num must be integer');
    }
    const length = parseInt(num, 10);
    if (length < 1) {
      throw Error('num must be greater than 0');
    }
    this.sideLength = length;
    this.lattice = createLattice(length);
  }

  /**
   * マス目のデータ取得
   * @return {[type]} [description]
   */
  getLattice() {
    return this.lattice;
  }

  /**
   * 勝者を判定する
   * @return {Boolean || Null} Boolean -> 勝者がいる、Null -> 勝者は決まっていない
   */
  getWinner() {
    const lines = latticeIntoLines(this.lattice, this.sideLength);
    const length = lines.length - 1;
    let sts = false;
    let win = null;
    let i = 0;
    while (!sts && i < length) {
      const { status, winner } = checkLine(lines[i]);
      sts = status;
      win = winner;
      i += 1;
    }
    return win;
  }

  /**
   * マス目の状態をリフレッシュする
   * @return {Object} マス目の情報
   */
  refresh() {
    this.lattice = createLattice(this.sideLength);
    return this.lattice;
  }
}

export default Rule;
