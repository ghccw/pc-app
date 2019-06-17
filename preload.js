// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const ipcRenderer = window.electron.ipcRenderer;\

window.addEventListener("DOMContentLoaded", () => {
  // for (const versionType of ["chrome", "electron", "node"]) {
  //   document.getElementById(`${versionType}-version`).innerText =
  //     process.versions[versionType];
  // }
  const electron = require("electron");
  const { ipcRenderer } = electron;

  var minimize = document.getElementById("minimize");

  var fullScreen = document.getElementById("fullScreen");

  minimize.addEventListener("click", function() {
    // let myNotification = new Notification("标题", {
    //   body: "通知正文内容"
    // });
    // myNotification.onclick = () => {
    //   console.log("通知被点击");
    // };

    ipcRenderer.send("minimize");
  });

  fullScreen.addEventListener("click", function() {
    ipcRenderer.send("fullScreen");
  });
});
