// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, nativeImage, Menu, Tray } = require("electron");


const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let tray = null;

let mainWindow;
function createWindow() {
  // Create the browser window.
  const appIcon = nativeImage.createFromPath(
    path.join(__dirname, "customer_service_64.png")
  );
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    center: true,
    transparent: true,
    frame: false,
    icon: appIcon,
    nodeIntegration: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  //var img1=path.join('tray.setImage(image)')
  var img1 = path.join('cus.png');
  var img2 = path.join('customer_service_64.png');
  tray = new Tray(path.join(__dirname, "customer_service_64.png"))
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出系统', type: 'normal' }
  ]);
  contextMenu.items[0].click = function () {
    console.log('contextMenu.items[1]');
    mainWindow.destroy();
  };
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.show();
  });
  var status = true;
  setInterval(() => {
    if (status) {
      status = false;
      tray.setImage(img1);
    } else {
      status = true;
      tray.setImage(img2);
    }
  }, 1000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


setTimeout(() => {
  return;
  // mainWindow.maximize();
  var p = mainWindow.getPosition();
  var s = mainWindow.getSize();
  console.log(p, s);

  // mainWindow.setSize(200, 200, true);
  // mainWindow.setPosition(0, 0);

  setTimeout(() => {
    mainWindow.setFullScreen(false);
    // mainWindow.setPosition(p[0], p[1]);
    // mainWindow.setSize(s[0], s[1], true);
  }, 3000);
}, 2000);

ipcMain.on("minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("fullScreen", () => {
  //win.isMaximized()
  if (!mainWindow.isMaximized()) {
    // mainWindow.setFullScreen(false);
    // mainWindow.restore();
    // mainWindow.unmaximize()
    // mainWindow.setFullScreen(false);
    mainWindow.maximize();
    // mainWindow.setSize(200, 200, true);
  } else {
    // mainWindow.unmaximize()
    mainWindow.restore()
    mainWindow.setSize(200, 200, true);
    // mainWindow.setFullScreen(true);
  }
});


