const createCombinations = (arr: number[], k: number): number => {
  const n = arr.length;
  const res: number[][] = [];

  const dfs = (start: number, path: number[]) => {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i < n; i++) {
      path.push(arr[i]);
      dfs(i + 1, path);
      path.pop();
    }
  };
  dfs(0, []);

  return res.length;
};

createCombinations([1, 2, 3], 2); // ?
