export const isAuth = () => {
  // check some condition and return boolean
  const userToken = window.localStorage.getItem('Loyality:ACCESS_TOKEN');
  return !!userToken;
};
