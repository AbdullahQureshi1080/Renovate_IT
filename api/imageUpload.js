import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default async function uploadAsPromise(file, type,uploadType,userId) {
    return new Promise(async function (resolve, reject) {
      const response = await fetch(file);
      // console.log(response);
      const blob = await response.blob();
      // console.log(blob);
      var childRoute = null;
      if (type == "image") {
        childRoute = "images";
      } else {
        childRoute = "documents";
      }
 
      const childPath = `${uploadType}/${userId}/${childRoute}/${Math.random().toString(36)}`;
 
      const task = firebase.storage().ref().child(childPath).put(blob);
 
      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };
      const taskCompleted = () => {
        const downloadURL = task.snapshot.ref.getDownloadURL();
        resolve(downloadURL);
      };
      const taskError = (snapshot) => {
        console.log("An Error Occured", snapshot);
        reject(err);
      };
 
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    });
  }