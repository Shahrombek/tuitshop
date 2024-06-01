import { initializeApp } from "firebase/app";

import { getDatabase, ref, push, set, get, onValue } from "firebase/database";
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpw_ZVy6kll-cxvnGddvTLpPJNZUk4MsU",
  authDomain: "savatcha-a07c1.firebaseapp.com",
  databaseURL: "https://savatcha-a07c1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "savatcha-a07c1",
  storageBucket: "savatcha-a07c1.appspot.com",
  messagingSenderId: "947904462124",
  appId: "1:947904462124:web:ef511a8830261b02978089",
  measurementId: "G-PVDXZPHG24",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();
const auth = getAuth();
// //Auth
function createUser(userData, callback) {
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((cred) => {
      alert("Saytga muvaffaqqiyatli kirdingiz!");
      const userData2 = { ...userData };
      userData2.uid = cred.user.uid;
      userData2.password = "";
      userData2["role"] = "user";
      addUser(userData2, callback);
    })
    .catch((e) => {
      console.log(e);
    });
}
function signOutUser(callback = () => {}) {
  signOut(auth)
    .then(() => {
      callback(true);
      window.location.reload(true);
      console.log("user Chiqib ketti");
    })
    .catch(() => {
      callback(false);
      console.log("user chiqib keta olmadi");
    });
}

function signIn(dataUser, callback) {
  signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
    .then((cred) => {
      getUserData(cred.user.uid, callback);
    })
    .catch(() => {
      alert("parol yoki email xato");
    });
}

const isSignIn = (callback = () => {}) => {
  console.log("sign in boshlandi");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("sign in bulgan");
      getUserData(user.uid, callback);
    } else {
      console.warn("no sign in");
    }
  });
};

//User Functions
function addUser(userData, callback) {
  set(ref(db, "users/" + userData.uid), userData)
    .then(() => {
      getUserData(userData.uid, callback);
    })
    .catch((err) => console.log(err));
}

function setUserData(data, uid) {
  set(ref(db, `users/${uid}`), data)
    .then(() => {})
    .catch((err) => console.log(err));
}

const userKirdi = (role, callback) => {
  switch (role) {
    case "superAdmin":
      getUsers(callback);
    case "admin":
      getOrders(callback);
      break;
    case "yetkazuvchi":
      getOrders(callback);
      break;
    case "user":
      break;
  }
};
function getUserData(uid, callback) {
  onValue(ref(db, `users/${uid}`), (data) => {
    callback({ type: "USER_DATA", payload: data.val() || {} });
    userKirdi(data.val().role || "user", callback);
  });
}

function getUsers(callback) {
  onValue(ref(db, `users/`), (data) => {
    callback({ type: "GET_USERS", payload: data.val() || {} });
  });
}

// Products

// Get functions
function getCategories(callback) {
  onValue(ref(db, `categories/`), (data) => {
    callback({
      type: "GET_CATEGORIES",
      payload: Object.values(data.val() || {}),
    });
  });
}
function getProducts(callback) {
  onValue(ref(db, `products/`), (data) => {
    callback({ type: "GET_PRODUCTS", payload: data.val() || {} });
  });
}

function getOrders(callback) {
  onValue(ref(db, `orders/`), (data) => {
    callback({ type: "GET_ORDERS", payload: data.val() || {} });
  });
}

// Push functioins
const pushCategory = (category, onSuccess, onError) => {
  push(ref(db, `categories`), category)
    .then(() => onSuccess())
    .catch((err) => onError(err));
};

function pushProduct(category, data, onSuccess, onError) {
  push(ref(db, `products/${category}/`), data)
    .then(() => onSuccess())
    .catch((err) => onError(err));
}

function pushOrder(data) {
  push(ref(db, `orders/`), data)
    .then(() => {})
    .catch((err) => console.warn(err));
}

function pushProductToKorzina(data, uid) {
  push(ref(db, `users/${uid}/korzina`), data)
    .then(() => {})
    .catch((err) => console.warn(err));
}

const clearKorzina = (uid) => {
  set(ref(db, `users/${uid}/korzina`), {})
    .then()
    .catch((err) => console.log(err));
};
// SEt functions
const setKorzinaProduct = (data, id, uid) => {
  set(ref(db, `users/${uid}/korzina/${id}`), data)
    .then(() => {})
    .catch((err) => console.log(err));
};

//
function doneOrder(orderId, data, worker) {
  console.log("edite done", data);
  const data2 = { ...data };
  if (worker) {
    data2["done"] = !data2["done"];
    data2.worker = worker;
  }

  console.log("edite done", data2);
  set(ref(db, `orders/${orderId}`), data2)
    .then(() => {})
    .catch((err) => console.log(err));
}

export { isSignIn, signIn, pushProduct, createUser, getProducts, pushCategory, getCategories, pushProductToKorzina, clearKorzina, setKorzinaProduct, getOrders, pushOrder, doneOrder, setUserData, signOutUser };
