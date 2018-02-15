class Auth {
  //set local storage w/ token and datetime
  static authenticateUser(token) {
    const sfytKey = { token, timestamp: new Date().getTime() };
    localStorage.setItem("sfytKey", JSON.stringify(sfytKey));
  }

  //check if token exists and hasn't expired
  static isUserAuthenticated() {
    //simple sanity checks before going much further:
    // if token doesn't exist, return false here
    if (!localStorage.getItem("sfytKey")) return false;
    //if timestamp doesn't exist inside of key, return false
    const keyTime = JSON.parse(localStorage.getItem("sfytKey")).timestamp;
    if (!keyTime) return false;

    //set timelimit, in minutes, for token in minutes
    const timeLimit = 60;
    //get current time
    const curTime = new Date().getTime().toString();

    //compare times and round to minutes
    const diffInMinutes = Math.round(
      (parseInt(curTime) - parseInt(keyTime)) / 60000
    );

    //token is good, update token and return true
    if (diffInMinutes < timeLimit) {
      this.updateUserToken();
      return true;
    } else {
      //token exists but is old, should remove
      this.deauthenticateUser();
      return false;
    }
  }

  //update existing token
  //should ONLY be called from isUserAuthenticated so will
  //not be doing same sanity checks as above
  static updateUserToken() {
    const key = {
      token: JSON.parse(localStorage.getItem("sfytKey")).token,
      timestamp: new Date().getTime()
    };
    localStorage.setItem("sfytKey", JSON.stringify(key));
    return true;
  }

  //remove authentication token
  static deauthenticateUser() {
    //if exists, remove
    if (localStorage.getItem("sfytKey")) {
      localStorage.removeItem("sfytKey");
    }
  }

  //return authentication token
  static getToken() {
    //if exists, send back
    if (localStorage.getItem("sfytKey")) {
      return JSON.parse(localStorage.getItem("sfytKey")).token || null;
    }
    return null;
  }
}

export default Auth;
