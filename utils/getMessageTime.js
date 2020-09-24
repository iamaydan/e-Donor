export const getMessageTime = (time) => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth();

  const currentTime = new Date();
  const currentDay = currentTime.getDate();

  let last_msg_time = null;

  const makeFormattedTime = (time) => {
    return time > 9 ? `${time}` : `0${time}`;
  };
  if (day - currentDay === 0) {
    last_msg_time = `${makeFormattedTime(hour)} : ${makeFormattedTime(minute)}`;
  } else {
    last_msg_time = `${makeFormattedTime(day)}/${makeFormattedTime(month)}`;
  }

  return last_msg_time;
};
