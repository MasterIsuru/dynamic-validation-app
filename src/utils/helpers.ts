export const sortArrayById = (items: any) => {
  items.sort(function (a: any, b: any) {
    return a.id - b.id;
  });
  return items;
};
