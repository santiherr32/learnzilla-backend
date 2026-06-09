const filterCategory = (name, array) => {
  try {
    let filterCat = array.filter((e) => e.category.includes(name)); //name es la categoria que llega por query
    return filterCat;
  } catch (error) {
    next(error);
  }
};

export default {
  filterCategory,
};
