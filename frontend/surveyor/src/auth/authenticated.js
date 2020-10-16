import Cookies from 'universal-cookie';
const cookies = new Cookies();



class Auth {

//must add DB vhecks for token validation
  static authenticateUser(token) {
    cookies.set('Authorization', token, { path: '/'/*, httpOnly: true */ });//test on same origin if this will be avaliable to iframe
  }


  static isUserAuthenticated() {
    return cookies.get('Authorization') !== undefined;
  }


  static deauthenticateUser() {
    cookies.remove('Authorization');//test on same origin if this will be avaliable to iframe
  }


  static getToken() {
    return cookies.get('Authorization')
  }




}

export default Auth;
