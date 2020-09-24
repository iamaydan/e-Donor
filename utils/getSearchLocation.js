// export function getSearchLocationList(posts, search) {
//   const list = posts
//     .map((item) => {
//       if (item.location.includes(search)) {
//         return item;
//       }
//       return;
//     })
//     .filter((item) => typeof item === "object");
//   return list;
// }

export function getAll(posts, search, filter) {
  const list = posts
    .map((post) => {
      if (filter === "all") {
        if (
          post.author_name.includes(search) ||
          post.bloodType.includes(search) ||
          post.location.includes(search)
        )
          return post;
      } else if (filter === "users") {
        if (post.author_name.includes(search)) return post;
      } else if (filter === "locations") {
        if (post.location.includes(search)) return post;
      } else if (filter === "blood types") {
        if (post.bloodType.includes(search)) return post;
      }
      return;
    })
    .filter((post) => typeof post === "object");

  return list;
}
