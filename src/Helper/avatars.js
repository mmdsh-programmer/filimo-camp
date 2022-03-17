export const avatars = [
  {
    id: 201,
    mainUrl: "1.png",
    happyUrl: "1-happy.png",
    sadUrl: "1-sad.png",
  },
  {
    id: 202,
    mainUrl: "2.png",
    happyUrl: "2-happy.png",
    sadUrl: "2-sad.png",
  },
  {
    id: 203,
    mainUrl: "3.png",
    happyUrl: "3-happy.png",
    sadUrl: "3-sad.png",
  },
  {
    id: 204,
    mainUrl: "4.png",
    happyUrl: "4-happy.png",
    sadUrl: "4-sad.png",
  },
  {
    id: 205,
    mainUrl: "5.png",
    happyUrl: "5-happy.png",
    sadUrl: "5-sad.png",
  },
  {
    id: 206,
    mainUrl: "6.png",
    happyUrl: "6-happy.png",
    sadUrl: "6-sad.png",
  },
  {
    id: 207,
    mainUrl: "7.png",
    happyUrl: "7-happy.png",
    sadUrl: "7-sad.png",
  },
  {
    id: 208,
    mainUrl: "8.png",
    happyUrl: "8-happy.png",
    sadUrl: "8-sad.png",
  },
  {
    id: 209,
    mainUrl: "9.png",
    happyUrl: "9-happy.png",
    sadUrl: "9-sad.png",
  },
  {
    id: 210,
    mainUrl: "10.png",
    happyUrl: "10-happy.png",
    sadUrl: "10-sad.png",
  },
  {
    id: 211,
    mainUrl: "11.png",
    happyUrl: "11-happy.png",
    sadUrl: "11-sad.png",
  },
  {
    id: 212,
    mainUrl: "12.png",
    happyUrl: "12-happy.png",
    sadUrl: "12-sad.png",
  },
  {
    id: 213,
    mainUrl: "13.png",
    happyUrl: "13-happy.png",
    sadUrl: "13-sad.png",
  },
  {
    id: 214,
    mainUrl: "14.png",
    happyUrl: "14-happy.png",
    sadUrl: "14-sad.png",
  },
  {
    id: 215,
    mainUrl: "15.png",
    happyUrl: "15-happy.png",
    sadUrl: "15-sad.png",
  },
  {
    id: 216,
    mainUrl: "16.png",
    happyUrl: "16-happy.png",
    sadUrl: "16-sad.png",
  },
  {
    id: 217,
    mainUrl: "17.png",
    happyUrl: "17-happy.png",
    sadUrl: "17-sad.png",
  },
];

export const FindAvatarAdd = (id, status) => {
  debugger;
  let result;
  if (id !== undefined && typeof id == "number" && !isNaN(id)) {
    avatars.map((item, index) => {
      if (id === item.id) {
        result = item.mainUrl;
        if (status === "sad") {
          result = item.sadUrl;
        } else if (status === "happy") {
          result = item.happyUrl;
        }
      }
    });
    if (result === undefined) {
      return "11.png";
    } else {
      return String(result);
    }
  } else {
    return "11.png";
  }
};
