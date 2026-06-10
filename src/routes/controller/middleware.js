const filterCategory = (name, array) => {
  let filterCat = array.filter((e) => e.category.includes(name)); //name es la categoria que llega por query
  return filterCat;
};

export default {
  filterCategory,
};
