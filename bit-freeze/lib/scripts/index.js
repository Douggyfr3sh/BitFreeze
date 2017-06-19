//this file handles bootstrapping angular to app.
//Followed example at:
//https://github.com/Vj3k0/ea-todo/blob/master/app/scripts/index.js
//also: http://electron.rocks/electron-angular-creating-sample-application/

//Refactored for my needs- reference this link if stuff doesn't work.

const electron = require('electron');
//const {ipcRenderer} = electron;
const {remote} = electron;

function boot() {

  // Get logger instance and inject it in Angular
  const logger = remote.getGlobal('logger');
  angular
    .module('app')
    .value('logger', logger);

  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
}

document.addEventListener('DOMContentLoaded', boot);