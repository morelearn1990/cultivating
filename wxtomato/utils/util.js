const formatTimeAll = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeYMD = date => {
  date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatTimeMS = time => {
  let minutes = parseInt(time / 60);
  let scends = time % 60;

  return [minutes, scends].map(formatNumber).join(":");
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getMonthWeek = date => {
  date = new Date(date);
  let w = date.getDay(), d = date.getDate();
  let month = date.getMonth() + 1;
  let monthWeek = Math.floor((d + 6 - w) / 7);

  if ((d + 6 - w) % 7 < 3) {
    monthWeek -= 1;
  }
  if (d < 3) {
    month -= 1;
    monthWeek -= 4;
  }
  return month + "月第" + monthWeek + "周";
}
export { formatTimeAll, formatTimeYMD, formatTimeMS, getMonthWeek }

