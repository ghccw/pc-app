// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const ipcRenderer = window.electron.ipcRenderer;\
const electron = require("electron");
const { ipcRenderer } = electron;
window.addEventListener("DOMContentLoaded", () => {
  // for (const versionType of ["chrome", "electron", "node"]) {
  //   document.getElementById(`${versionType}-version`).innerText =
  //     process.versions[versionType];
  // }
  // var restore = document.getElementById("restore");
  // var maximize = document.getElementById("maximize");
  // var minimize = document.getElementById("minimize");
  // var restore = document.getElementById("restore");
  // var fullScreen = document.getElementById("fullScreen");
  // minimize.addEventListener("click", function() {
  //   // let myNotification = new Notification("标题", {
  //   //   body: "通知正文内容"
  //   // });
  //   // myNotification.onclick = () => {
  //   //   console.log("通知被点击");
  //   // };
  //   ipcRenderer.send("minimize");
  // });
  // maximize.addEventListener("click", function() {
  //   ipcRenderer.send("maximize");
  // });
  // restore.addEventListener("click", function() {
  //   ipcRenderer.send("restore");
  // });
  // fullScreen.addEventListener("click", function() {
  //   ipcRenderer.send("fullScreen");
  // });
});
window.addEventListener(
  "message",
  function(ev) {
    switch (ev.data) {
      case "newmessage":
        ipcRenderer.send("newmessage");
        break;
      case "minimize":
        ipcRenderer.send("minimize");
        break;
      case "maximize":
        ipcRenderer.send("maximize");
        break;
      case "close":
        ipcRenderer.send("close");
        break;
      case "normal":
        ipcRenderer.send("normal");
        break;
    }
  },
  false
);
