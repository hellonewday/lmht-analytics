let data = [
  {
    id: 1,
    list: [1, 2, 4, 14],
  },
  {
    id: 2,
    list: [3, 4, 2, 52],
  },
];

console.log(
  data.map((item) => {
    return item.list[3];
  })
);
