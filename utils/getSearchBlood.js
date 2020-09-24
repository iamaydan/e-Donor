export function getSearchBloodList(posts, search) {
  const list = posts
    .map((item) => {
      if (item.bloodType === search) {
        return item;
      }
      return;
    })
    .filter((item) => typeof item === "object");
  return list;
}
