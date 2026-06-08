const filterCategory = async (name, array) => {
  try {
    let filterCat = await array.filter((e) => e.category.includes(name)); //name es la categoria que llega por query
    return filterCat;
  } catch (error) {
    console.log(error);
  }
};

export default {
  filterCategory,
};