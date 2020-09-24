export function generateChatID(firstID, secondID) {
  return [firstID, secondID]
    .sort((a, b) => {
      if (a === b) return 0;
      if (a > b) return 1;
      if (a < b) return -1;
    })
    .join("_");
}
