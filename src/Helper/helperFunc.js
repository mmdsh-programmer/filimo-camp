import Fetch from "../Helper/Fetch";

export const userData = async () => {
  let userinfo;
  let teaminfo;
  const userserviceURL = await Fetch({
    url: 'http://37.152.185.94:8001/user/user/',
    method: 'GET',
  });

  if (!('ERROR' in userserviceURL)) {

    localStorage.setItem("filimoId", userserviceURL.data.data.user_info.filimo_id);
    localStorage.setItem("filimoNumberPh", userserviceURL.data.data.user_info.mobile);
    userinfo = { ...userserviceURL.data.data.user_info };
    teaminfo = { ...userserviceURL.data.data.team_info };
    localStorage.setItem('filimo::user', JSON.stringify(userinfo));
    localStorage.setItem('filimo::teaminfo', JSON.stringify(teaminfo));
    // var retrievedObject = localStorage.getItem('filimo::user')
    // console.log('sssss', JSON.parse(retrievedObject));
    // console.log('datauser', user, taemData);

    return [userinfo, teaminfo];
  }
  return false;
};

export const Poster = async () => {

  const posterURl = await Fetch({
    url: 'http://37.152.185.94:8001/user/poster/',
    method: 'GET',
  });

  if (!('ERROR' in posterURl)) {



    // var retrievedObject = localStorage.getItem('filimo::user')
    // console.log('sssss', JSON.parse(retrievedObject));
    // console.log('datauser', user, taemData);
    return posterURl.data.data;
  }
  return false;
};
export const getTimeServer = async () => {
  let time;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Cookie", "ARRAffinity=f3f88b740ec44f2b3a94276852de6b2d89f94fbdb02de0b590e3cbb4f204c8af");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const timeServer = await Fetch({
    url: 'http://worldclockapi.com/api/json/est/now',
    requestOptions,
  });

  if (!('ERROR' in timeServer)) {





    time = timeServer.data.currentDateTime
  }
  else {

    time = new Date();
  }
  return time;
}