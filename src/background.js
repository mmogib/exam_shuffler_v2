'use strict'

import { writeFile } from 'fs'
import { promisify } from 'util'

import { app, protocol, BrowserWindow, ipcMain as ipc } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

import { example_state } from './backend/handlers/example'
import {
  parse_examdoc,
  examDocument,
  partials,
  initial_state,
  get_or_create_db
} from './backend/examparser/'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, db

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1024, height: 800 })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    db = get_or_create_db()
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools()
  }
  db = get_or_create_db()
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//// main events

ipc.on('get-state', async e => {
  const saveFile = promisify(writeFile)
  try {
    const template = examDocument(partials)
    const exam = await parse_examdoc(example_state, template)
    await saveFile('./tessssing.tex', exam)
    e.sender.send('saved-file')
  } catch (error) {
    console.log(error)
    e.sender.send('got-error', error)
  }
})

ipc.on('get-init-state', async e => {
  const state = await initial_state(db)
  e.sender.send('state-init', state)
})
