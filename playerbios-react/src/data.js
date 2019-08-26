/*{
  "id":1053,
  "first_name":"Nasir",
  "last_name":"Adderley",
  "born":"1997-05-31T12:00:00Z",
  "url":"https://www.foxsports.com/nfl/nasir-adderley-player-stats",
  "hometown":"Philadelphia, PA",
  "latitude":"40.001812",
  "longitude":"-75.11787",
  "league":"nfl"
}*/
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getKey = dob => {
  return `${months[dob.getMonth()]} ${dob.getDate()}`;
};

const getAdjustedDOBArray = (bios = []) => {
  return bios
    .filter(bio => bio.born !== null)
    .map(b => {
      const dob = new Date(b.born);
      return new Date(getKey(dob) + ', 2016');
    });
};

export const dobData = data => {
  const arr = getAdjustedDOBArray(data).sort((a, b) => a.getTime() - b.getTime());
  if (arr.length < 1) {
    return [];
  }

  let retArray = [];
  let lastDate = arr[0];
  let currentEl = {
    date: arr[0],
    value: 1
  };
  for (let i = 1; i < arr.length; i++) {
    let thisDate = arr[i];
    if (thisDate.getTime() !== lastDate.getTime()) {
      retArray.push({ ...currentEl });
      currentEl['date'] = new Date(arr[i].getTime());
      currentEl['value'] = 1;
      lastDate = new Date(thisDate.getTime());
    } else if (i === arr.length - 1) {
      currentEl['value'] += 1;
      retArray.push({ ...currentEl });
    } else {
      currentEl['value'] += 1;
    }
  }

  return retArray;
};
