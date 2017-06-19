const BTC = require('bitcoinjs-lib')

angular.module('ngBitFreeze', [])

.controller ('AppController', ['$scope', function($scope) {
  $scope.appName= 'BitFreeze';

  $scope.genWallet = function () {
    let newWallet = BTC.ECPair.makeRandom();
    let public = newWallet.getAddress();
    let _private = newWallet.toWIF();

    appName = 'BitFrozen.';
  };
}])







/*

  I found the below code and tried to use it, but am refactoring using official AngularJS docs

*/

//This is the controller for our main ng-controller view

//Reference: https://github.com/Vj3k0/ea-todo/blob/master/app/scripts/app/todoController.js

// (function(){

//   angular
//     .module('app', ['ngMaterial', 'ngAnimate'])
//     .controller('AppController', ['$scope', 'logger', AppController]);

//   function AppController($scope, logger) {

//     // List of bindable properties and methods
//     var btcData = this;
//     btcData.currentValue = 'thousands';

//     activate();
//   };

// })();