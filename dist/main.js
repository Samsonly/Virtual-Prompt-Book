"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, "../dist/index.html"),
        protocol: "file:",
        slashes: true,
    }));
    const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
    //   mainWindow.webContents.on("before-input-event", (event, input) => {
    //     if (
    //       input.key === "I" &&
    //       input.meta && // Command key (Meta) on macOS
    //       input.alt // Option key (Alt) on macOS
    //     ) {
    //       event.preventDefault();
    //       mainWindow.webContents.toggleDevTools();
    //     }
    //   });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
const menuTemplate = [
    {
        label: electron_1.app.name,
        submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }, // Quit "AppName"
        ],
    },
    {
        label: "Project",
        submenu: [
            {
                label: "New Project",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "New Project");
                },
            },
            {
                label: "Open Project",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Open Project");
                },
            },
            {
                label: "Save Project",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Save Project");
                },
            },
            {
                label: "Save Project As",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Save Project As");
                },
            },
            {
                label: "Placeholder 5",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 5");
                },
            },
            {
                label: "Placeholder 6",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 6");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "Placeholder 10",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 10");
                },
            },
        ],
    },
    {
        label: "Content",
        submenu: [
            {
                label: "Upload Script",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Upload Script");
                },
            },
            {
                label: "Edit Script",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Edit Script");
                },
            },
            {
                label: "Placeholder 3",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 3");
                },
            },
            {
                label: "Placeholder 4",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 4");
                },
            },
            {
                label: "Character List",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Character List");
                },
            },
            {
                label: "Placeholder 6",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 6");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "Placeholder 10",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 10");
                },
            },
        ],
    },
    {
        label: "Team",
        submenu: [
            {
                label: "Contact List",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Contact List");
                },
            },
            {
                label: "Production Team",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Production Team");
                },
            },
            {
                label: "Cast List",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Cast List");
                },
            },
            {
                label: "Placeholder 4",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 4");
                },
            },
            {
                label: "Placeholder 5",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 5");
                },
            },
            {
                label: "Placeholder 6",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 6");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "Settings",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Settings");
                },
            },
        ],
    },
    {
        label: "Rehearsal",
        submenu: [
            {
                label: "Placeholder 1",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 1");
                },
            },
            {
                label: "Placeholder 2",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 2");
                },
            },
            {
                label: "Placeholder 3",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 3");
                },
            },
            {
                label: "Placeholder 4",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 4");
                },
            },
            {
                label: "Placeholder 5",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 5");
                },
            },
            {
                label: "Placeholder 6",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 6");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "End Rehearsal",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "End Rehearsal");
                },
            },
        ],
    },
    {
        label: "Schedule",
        submenu: [
            {
                label: "Placeholder 1",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 1");
                },
            },
            {
                label: "Placeholder 2",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 2");
                },
            },
            {
                label: "Placeholder 3",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 3");
                },
            },
            {
                label: "Placeholder 4",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 4");
                },
            },
            {
                label: "Placeholder 5",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 5");
                },
            },
            {
                label: "Placeholder 6",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 6");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "Placeholder 10",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 10");
                },
            },
        ],
    },
    {
        label: "Reports",
        submenu: [
            {
                label: "View Line Notes",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "View Line Notes");
                },
            },
            {
                label: "Rehearsal Reports",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Rehearsal Reports");
                },
            },
            {
                label: "Performance Reports",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Performance Reports");
                },
            },
            {
                label: "Production Meeting Notes",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Production Meeting Notes");
                },
            },
            {
                label: "Tech Week Notes",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Tech Week Notes");
                },
            },
            {
                label: "Daily Call",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Daily Call");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "[Equity]",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "[Equity]");
                },
            },
        ],
    },
    {
        label: "Help",
        submenu: [
            {
                label: "Placeholder 1",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 1");
                },
            },
            {
                label: "Placeholder 2",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 2");
                },
            },
            {
                label: "Placeholder 3",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 3");
                },
            },
            {
                label: "Placeholder 4",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 4");
                },
            },
            {
                label: "Placeholder 5",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 5");
                },
            },
            {
                label: "Placeholder 6",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 6");
                },
            },
            {
                label: "Placeholder 7",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 7");
                },
            },
            {
                label: "Placeholder 8",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 8");
                },
            },
            {
                label: "Placeholder 9",
                click: () => {
                    mainWindow.webContents.send("menu-item-click", "Placeholder 9");
                },
            },
            {
                label: "Toggle DevTools",
                accelerator: "CmdOrCtrl+Option+I",
                click: () => {
                    if (mainWindow) {
                        mainWindow.webContents.toggleDevTools();
                    }
                },
            },
        ],
    },
];
const menu = electron_1.Menu.buildFromTemplate(menuTemplate);
electron_1.Menu.setApplicationMenu(menu);
