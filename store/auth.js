import fbApp from "../firebaseInit";
import * as firebase from "firebase";
import { Alert } from "react-native";

// ACTION TYPES
const SET_AUTH_STATUS = "SET_AUTH_STATUS";
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const SET_AUTH_LOGOUT = "SET_AUTH_LOGOUT";
const SET_PHOTO = "SET_PHOTO";
const DELETE_PHOTO = "DELETE_PHOTO";
const RESET_PASSWORD = "RESET_PASSWORD";
const SET_OTHER_USER = "SET_OTHER_USER";
const INIT_OTHER_USER = "INIT_OTHER_USER";
const UPDATE_CREDENTIALS = "UPDATE_CREDENTIALS";
const CHANGE_EMAIL = "CHANGE_EMAIL";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";

// SELECTORS
export const MODULE_NAME = "auth";
export const selectAuthStatus = (state) => state[MODULE_NAME].status;
export const selectUserID = (state) => state[MODULE_NAME].userID;
export const selectUsername = (state) => state[MODULE_NAME].username;
export const selectName = (state) => state[MODULE_NAME].fullname;
export const selectPhoto = (state) => state[MODULE_NAME].photo;
export const selectBlood = (state) => state[MODULE_NAME].bloodType;
export const selectMail = (state) => state[MODULE_NAME].email;
export const selectOtherUser = (state) => state[MODULE_NAME].otherUser;

// REDUCER
const initialState = {
  status: false,
  userID: null,
  username: null,
  fullname: null,
  bloodType: null,
  email: null,
  password: null,
  photo: null,
  otherUser: {},
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_AUTH_STATUS:
      return {
        ...state,
        status: payload,
      };
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        status: true,
        ...payload,
      };
    case UPDATE_CREDENTIALS:
      return {
        ...state,
        fullname: payload.fullname,
        username: payload.username,
        bloodType: payload.bloodType,
      };
    case SET_PHOTO:
      return {
        ...state,
        photo: payload,
      };
    case DELETE_PHOTO:
      return {
        ...state,
        photo: "",
      };
    case RESET_PASSWORD:
      return {
        ...state,
        email: payload,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    case SET_AUTH_LOGOUT:
      return {
        ...state,
        status: false,
        userID: null,
        username: null,
        fullname: null,
        email: null,
        bloodType: null,
        password: null,
        photo: null,
      };
    case INIT_OTHER_USER:
      return {
        ...state,
        otherUser: {},
      };
    case SET_OTHER_USER:
      return {
        ...state,
        otherUser: payload,
      };
    default:
      return state;
  }
}

// ACTION CREATORS
export const setAuthStatus = (payload) => ({
  type: SET_AUTH_STATUS,
  payload,
});

export const setAuthSuccess = (payload) => ({
  type: SET_AUTH_SUCCESS,
  payload,
});

export const setPhoto = (payload) => ({
  type: SET_PHOTO,
  payload,
});

export const deletePhoto = () => ({
  type: DELETE_PHOTO,
});

export const updateCredentials = (payload) => ({
  type: UPDATE_CREDENTIALS,
  payload,
});

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const changePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const resetPassword = (payload) => ({
  type: RESET_PASSWORD,
  payload,
});

export const setAuthLogout = () => ({
  type: SET_AUTH_LOGOUT,
});

export const setOtherUser = (payload) => ({
  type: SET_OTHER_USER,
  payload,
});

export const initOtherUser = () => ({
  type: INIT_OTHER_USER,
});

// MIDDLEWARES
export const signUp = (email, password, username, fullname) => async (
  dispatch
) => {
  try {
    const {
      user: { uid },
    } = await fbApp.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        Alert.alert(error.code, error.message);
        console.log(error.code, error.message);
      });

    fbApp.db.ref(`users/${uid}`).set({
      username,
      fullname,
      email,
      password,
      bloodType: "",
      photo: "",
    });

    dispatch(
      setAuthSuccess({
        userID: uid,
        username,
        fullname,
        email,
        password,
      })
    );
  } catch (error) {
    Alert.alert("Signup failed", error.message);
  }
};

export const logIn = (Email, Password) => async (dispatch) => {
  try {
    const {
      user: { uid },
    } = await fbApp.auth
      .signInWithEmailAndPassword(Email, Password)
      .catch(function (error) {
        Alert.alert(error.code, error.message);
        console.log(error.code, error.message);
      });

    const userData = await (
      await fbApp.db.ref(`users/${uid}`).once("value")
    ).val();

    dispatch(
      setAuthSuccess({
        userID: uid,
        ...userData,
      })
    );
  } catch (error) {
    console.log("Login failed", error.message);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await fbApp.auth.signOut();
    dispatch(setAuthLogout());
  } catch (error) {
    Alert.alert(error.code, error.message);
    console.log("logOut error", error);
  }
};

export const removeAvatar = () => async (dispatch, getState) => {
  try {
    const userID = selectUserID(getState());
    await fbApp.db.ref(`users/${userID}/photo`).set("");
    dispatch(deletePhoto());
  } catch (error) {
    Alert.alert(error.code, error.message);
  }
};

export const uploadPhoto = (uri) => async (dispatch, getState) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const key = (await fbApp.db.ref("keys").push()).key;
    const snap = await fbApp.storage.ref(key).put(blob);
    const url = await snap.ref.getDownloadURL();
    const userID = selectUserID(getState());
    await fbApp.db.ref(`users/${userID}/photo`).set(url);
    dispatch(setPhoto(url));
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};
export const updateUserInfo = (userInfo) => async (dispatch) => {
  try {
    const { uid } = fbApp.auth.currentUser;
    const { fullname, username, bloodType } = userInfo;
    dispatch(updateCredentials({ ...userInfo }));
    fbApp.db.ref(`users/${uid}`).update({ fullname, username, bloodType });
  } catch (error) {
    console.log("updateUserInfo error", error);
    Alert.alert(error.code, error.message);
  }
};

export const sendEmail = (email) => async (dispatch) => {
  try {
    await fbApp.auth.sendPasswordResetEmail(email);
    dispatch(resetPassword({ email }));
  } catch (error) {
    Alert.alert(error.code, error.message);
    console.log("sendEmail error: ", error);
  }
};

export const updateEmail = (email, password) => async (dispatch) => {
  try {
    const currentUser = fbApp.auth.currentUser;

    const { uid } = currentUser;
    const user = (await fbApp.db.ref(`users/${uid}`).once("value")).val();

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    await currentUser.reauthenticateWithCredential(credential);

    console.log("credential", credential);
    console.log("user", user);

    if (user.password === password) {
      await currentUser.updateEmail(email);
    } else {
      Alert.alert("Wrong password", "Please, write your correct password");
    }

    fbApp.db.ref(`users/${uid}`).update({ email });
    dispatch(changeEmail(email));
  } catch (error) {
    Alert.alert(error.code, error.message);
    console.log("updateEmail error ", error);
  }
};

export const updatePassword = (email, currentPass, password) => async (
  dispatch
) => {
  try {
    const currentUser = fbApp.auth.currentUser;
    const { uid } = currentUser;
    const user = (await fbApp.db.ref(`users/${uid}`).once("value")).val();

    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      currentPass
    );
    await currentUser.reauthenticateWithCredential(credential);

    if (user.password === currentPass) {
      await currentUser.updatePassword(password);
    } else {
      Alert.alert("Wrong password", "Please, write your current password");
    }

    fbApp.db.ref(`users/${uid}`).update({ password });
    dispatch(changePassword(password));
  } catch (error) {
    Alert.alert(error.code, error.message);
    console.log("updatePassword error ", error);
  }
};

export const deleteAccount = (email, password) => async () => {
  try {
    const currentUser = fbApp.auth.currentUser;
    const { uid } = currentUser;
    const user = (await fbApp.db.ref(`users/${uid}`).once("value")).val();

    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    await currentUser.reauthenticateWithCredential(credential);

    if (password === user.password) {
      currentUser.delete();
    } else {
      Alert.alert("Wrong password", "Please, write your correct password");
    }
  } catch (error) {
    Alert.alert(error.code, error.message);
    console.log("deleteAccount error ", error);
  }
};

export const verifyEmail = (email) => async (dispatch) => {
  try {
    dispatch(resetPassword({ email }));
  } catch (error) {
    console.log("verification error: ", error);
  }
};

// export const changePassword = () => async (dispatch) => {
//   try {
//     const user = fbApp.auth.currentUser;
//     user.updatePassword("123456789123");
//   } catch (error) {}
// };

export const getAndListenForUsers = (author_id) => async (dispatch) => {
  try {
    const key = await fbApp.db.ref(`users/${author_id}`).key;
    const user = await fbApp.db.ref(`users/${author_id}`).once("value");
    dispatch(setOtherUser({ userID: key, ...user.val() }));
  } catch (err) {
    console.log("user not found", err);
  }
};
