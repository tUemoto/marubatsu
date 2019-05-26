function checkLine(line) {
  if (line[0] === null) {
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
    this.sideLength = num;
    this.lattice = createLattice(num);
  }

  getLattice() {
    return this.lattice;
  }

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

  refresh() {
    this.lattice = createLattice(this.sideLength);
    return this.lattice;
  }
}

export default Rule;
