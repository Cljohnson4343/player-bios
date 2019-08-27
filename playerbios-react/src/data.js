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
      const bd = new Date(b.born);
      return [new Date(getKey(bd) + ', 2016'), b.league];
    });
};

const dob = d => d[0];
const league = d => d[1];

export const dobData = data => {
  const arr = getAdjustedDOBArray(data).sort((a, b) => dob(a).getTime() - dob(b).getTime());
  if (arr.length < 1) {
    return [];
  }

  let retArray = [];
  let lastDate = dob(arr[0]);
  let currentEl = {
    date: dob(arr[0]),
    value: 1,
    [league(arr[0])]: 1
  };
  for (let i = 1; i < arr.length; i++) {
    let thisDate = dob(arr[i]);
    if (thisDate.getTime() !== lastDate.getTime()) {
      retArray.push({ ...currentEl });
      currentEl = {
        date: dob(arr[i]),
        value: 1,
        [league(arr[i])]: 1
      };
      lastDate = new Date(thisDate.getTime());
    } else if (i === arr.length - 1) {
      currentEl['value'] += 1;
      currentEl[league(arr[i])] = league(arr[i]) in currentEl ? currentEl[league(arr[i])] + 1 : 1;
      retArray.push({ ...currentEl });
    } else {
      currentEl['value'] += 1;
      currentEl[league(arr[i])] = league(arr[i]) in currentEl ? currentEl[league(arr[i])] + 1 : 1;
    }
  }

  return retArray;
};

export const dobMonthlyAverages = data => {
  const dobArray = getAdjustedDOBArray(data).sort((a, b) => dob(a).getTime() - dob(b).getTime());

  let monthlyTotals = {
    date: new Date('Jan 1, 2016'),
    value: 0,
    nba: 0,
    nfl: 0,
    mlb: 0,
    nhl: 0,
    days: 0
  };
  let thisMonth = 0;
  let thisDay = 0;
  let retArr = [];
  for (let i = 0; i < dobArray.length; i++) {
    let d = dob(dobArray[i]);
    if (d.getMonth() !== thisMonth) {
      thisMonth = d.getMonth();
      retArr.push({ ...monthlyTotals });
      monthlyTotals = {
        date: new Date(d.getTime()),
        value: 0,
        nba: 0,
        nfl: 0,
        mlb: 0,
        nhl: 0,
        days: 0
      };
    } else if (i === dobArray.length - 1) {
      monthlyTotals[league(dobArray[i])] += 1;
      monthlyTotals.value += 1;
      retArr.push({ ...monthlyTotals });
      if (thisDay !== d.getDate()) {
        thisDay = d.getDate();
        monthlyTotals.days += 1;
      }
    } else {
      monthlyTotals[league(dobArray[i])] += 1;
      monthlyTotals.value += 1;
      if (thisDay !== d.getDate()) {
        thisDay = d.getDate();
        monthlyTotals.days += 1;
      }
    }
  }
  return retArr.map(d => {
    d.avg = d.value / d.days;
    return d;
  });
};

const EPSILON = 0.1;
const equals = (a, b) => Math.abs(a - b) <= EPSILON;

export const latLonData = data => {
  const arr = data
    .filter(d => Math.abs(d.longitude) && Math.abs(d.latitude) > 0)
    .sort((a, b) => {
      if (equals(a.latitude, b.latitude)) {
        if (equals(a.longitude, b.longitude)) {
          return 0;
        }
        return a.longitude - b.longitude;
      }
      return a.latitude - b.latitude;
    });

  if (arr.length < 1) {
    return [];
  }

  let x = {
    latitude: arr[0].latitude,
    longitude: arr[0].longitude,
    population: 0
  };
  let ret = [];
  for (let i = 0; i < arr.length; i++) {
    if (equals(x.latitude, arr[i].latitude) && equals(x.longitude, arr[i].longitude)) {
      x.population += 1;
    } else {
      ret.push({ ...x });
      x = {
        latitude: arr[i].latitude,
        longitude: arr[i].longitude,
        population: 1
      };
    }
  }
  return ret;
};
