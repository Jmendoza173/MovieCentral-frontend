// API CONSTANTS

const BASE_URL = 'http://localhost:3000/api/v1';
const USERS_URL = BASE_URL + '/users';
const MOVIES_URL = BASE_URL + '/movies'
const LISTS_URL = BASE_URL + '/lists'
const LISTITEMS_URL = BASE_URL + '/list_items'
const REPLIES_URL = BASE_URL + '/replies'
const DISCUSSIONS_URL = BASE_URL + '/discussions'
const RATINGS_URL = BASE_URL + '/ratings'
const LOGIN_URL = BASE_URL + '/login';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;
const SPECIFIC_Movie_URL = id => MOVIES_URL + '/' + id;
const SPECIFIC_LIST_URL = id => LISTS_URL + '/' + id;
const SPECIFIC_LISTITEM_URL = id => LISTITEMS_URL + '/' + id;
const SPECIFIC_REPLY_URL = id => REPLIES_URL + '/' + id;
const SPECIFIC_DISCUSSION_URL = id => DISCUSSIONS_URL + '/' + id;
const SPECIFIC_RATING_URL = id => RATINGS_URL + '/' + id;

// Redux Actions

const setUserAction = userObj => ({
    type: 'SET_USER',
    payload: userObj
  });
  
  const clearUserAction = () => ({
    type: 'CLEAR_USER'
  });
  
  // Fetch
  
  const newUserToDB = userObj => dispatch => {
    console.log("newUserToDB",userObj)
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    };
    fetch(USERS_URL, config)
      .then(r => r.json())
      .then(data => {
        console.log("After fetching",data)
        dispatch(setUserAction(data.username));
        localStorage.setItem('token', data.token);
        localStorage.setItem('loggedInUserId', data.user_id);
      });
  };

  const getUserFromDB = token => dispatch => {
    fetch(LOGIN_URL,{
        headers: {
            Accept: "application/json",
            "Authorization": token
        }
    }).then(r=>r.json())
    .then(data => dispatch(setUserAction(data.username)))
  }
  
  const deleteUserFromDB = userId => dispatch => {
    const config = {
      method: 'DELETE'
    };
    fetch(SPECIFIC_USER_URL(userId), config).then(r => {
      dispatch(clearUserAction());
      localStorage.clear();
    });
  };
  
  const loginUserToDB = userCredentials => dispatch => {
      console.log(userCredentials)
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    };
    fetch(LOGIN_URL, config)
      .then(r => r.json())
      .then(data => {
          console.log("fetch info",data)
          dispatch(setUserAction(data.username));
          localStorage.setItem('token', data.token);
          localStorage.setItem('loggedInUserId', data.user_id);
        });
  };
  
//   const persistUser = () => dispatch => {
//     const config = {
//       method: 'GET',
//       headers: {
//         Authorization: `bearer ` + localStorage.token
//       }
//     };
//     fetch(PERSIST_URL, config)
//       .then(r => r.json())
//       .then(userInstance => {
//         dispatch(setUserAction(userInstance));
//       });
//   };
  
  const logoutUser = () => dispatch => {
    dispatch(clearUserAction());
    localStorage.clear();
  };
  
  export default {
    newUserToDB,
    deleteUserFromDB,
    loginUserToDB,
    getUserFromDB,
    logoutUser
  };