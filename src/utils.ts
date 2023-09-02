function timestampToDate(timestamp: string) {
  if (!timestamp) return '';

  const dateTime = timestamp.replace('T', ' ')
    .split('.')[0]
    .replace(/[-]/g, '/');

  const date = dateTime.split(' ')[0];
  return String(date);
}

function getSubString(string: string, numChars: number) {
 return string.length <= numChars
   ? string 
   : `${string.substring(0, numChars)}...`;
}

export {
  timestampToDate,
  getSubString,
};
