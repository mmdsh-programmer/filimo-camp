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

      return [userinfo,teaminfo];
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