
export const isAuth = () => {
  // check some condition and return boolean
  const userToken = window.localStorage.getItem('filimo:ACCESS_TOKEN');
  return !!userToken;
};
