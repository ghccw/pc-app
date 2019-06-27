// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage,
  Menu,
  dialog,
  Tray
} = require("electron");

const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// var gui = require('nw.gui');
// var win = gui.Window.get();

// win.show();

let tray = null;
let messagetStatus = null;
let width = 1450;
let height = 850;
let mainWindow;
function createWindow() {
  // Create the browser window.
  const appIcon = nativeImage.createFromPath(
    path.join(__dirname, "customer_service_64.png")
  );
  mainWindow = new BrowserWindow({
    width: 340,
    height: 442,
    center: true,
    transparent: true,
    resizable: false,
    frame: false,
    icon: appIcon,
    nodeIntegration: true,
    show: false,
    webPreferences: {
      nativeWindowOpen: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // and load the index.html of the app.
  // mainWindow.loadFile("index.html", { userAgent: "kingwell" });
  mainWindow.loadURL("http://chat.hzins.com/", { userAgent: "huihui" });
  // mainWindow.openDevTools();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on("ready-to-show", () => {
    setTimeout(() => {
      mainWindow.show();
    }, 1000);
  });

  mainWindow.on("close", e => {
    return e.preventDefault();
  });
  var img1 = path.join("assets/cus.png");
  var img2 = path.join("assets/huihui-logo-32.ico");
  tray = new Tray(img2);
  const contextMenu = Menu.buildFromTemplate([
    { label: "退出系统", type: "normal" }
  ]);
  contextMenu.items[0].click = function() {
    mainWindow.close();
  };
  tray.setToolTip("慧慧");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.show();
    messagetStatus.hide();
  });

  class MessageStatus {
    constructor() {
      this.status = true;
    }
    show() {
      this.timer = setInterval(() => {
        if (status) {
          status = false;
          tray.setImage(img1);
        } else {
          status = true;
          tray.setImage(img2);
        }
      }, 500);
    }
    hide() {
      clearInterval(this.timer);
      tray.setImage(img2);
    }
  }
  messagetStatus = new MessageStatus();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// ipcMain.on("message", () => {
//   if (!mainWindow.isVisible()) {
//     messagetStatus.show();
//   }
// });
ipcMain.on("newmessage", () => {
  if (!mainWindow.isVisible()) {
    messagetStatus.show();
  }
});
ipcMain.on("nomessage", () => {
  messagetStatus.hide();
});
ipcMain.on("minimize", () => {
  mainWindow.minimize();
});
ipcMain.on("close", () => {
  // mainWindow.close();

  dialog.showMessageBox(
    {
      type: "info",
      title: "关闭提示",
      defaultId: 0,
      message: "确定要关闭吗？",
      buttons: ["取消", "确定退出"]
    },
    index => {
      if (index === 0) {
        // e.preventDefault(); //阻止默认行为，一定要有
        // mainWindow.minimize();	//调用 最小化实例方法
      } else {
        mainWindow = null;
        //app.quit();	//不要用quit();试了会弹两次
        app.exit(); //exit()直接关闭客户端，不会执行quit();
      }
    }
  );
});
ipcMain.on("normal", () => {
  mainWindow.setSize(width, height, true);
  mainWindow.center();
});
var status = true;
ipcMain.on("maximize", () => {
  console.log("maximize", status);
  if (!status) {
    status = true;
    mainWindow.setSize(width, height, true);
    mainWindow.center();
  } else {
    status = false;
    mainWindow.maximize();
  }
});

ipcMain.on("restore", () => {
  console.log("restore");
  mainWindow.restore();
  mainWindow.setSize(200, 200, true);
});
