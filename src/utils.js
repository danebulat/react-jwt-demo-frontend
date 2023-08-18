function timestampToDate(timestamp) {
  const dateTime = timestamp.replace('T', ' ')
    .split('.')[0]
    .replace(/[-]/g, '/');

  const date = dateTime.split(' ')[0];
  return String(date);
}

export {
  timestampToDate,
};