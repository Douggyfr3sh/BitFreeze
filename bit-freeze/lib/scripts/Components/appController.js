const BTC = require('bitcoinjs-lib')
//const qr = require('qr-image')
// const print = require('../../../node_modules/print.js/dist/print.min.js')

angular.module('ngBitFreeze', [])

.controller ('AppController', ['$scope', function($scope) {
  $scope.appName= 'BitFreeze';

  $scope.genWallet = function (e) {
    //Generate new Bitcoin K/V pair
    let newWallet = BTC.ECPair.makeRandom();
    let public = newWallet.getAddress();
    let private = newWallet.toWIF();

    //generate QR codes
    //for reference: https://davidshimjs.github.io/qrcodejs/
    var qrCodePub = new QRCode('qrcode-public');
    qrCodePub.makeCode(public);

    var qrCodePrivate = new QRCode('qrcode-private');
    qrCodePrivate.makeCode(private);

    //old NPM libary code
    // var pub_qr = qr.image(public);
    // var priv_qr = qr.image(private);



    //append address data to app before printing
    $('.btc-public-key').text(public);
    $('.btc-private-key').text(private);

    //TODO: append QR code


    //print new k/v pair (working!)
    printJS('pjs-target', 'html');
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