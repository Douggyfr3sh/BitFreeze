const BTC = require('bitcoinjs-lib')
const request = require('request')
//const ks = require('node-key-sender')
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

    //get data from input
    var walletName = $('.btc-new-name')[0].value;

    //TODO: use doc template for rendering instead of code below:

    //append address data to app before printing
    $('.btc-public-key').text('Public Key: ' + public);
    $('.btc-private-key').text('Private Key: ' + private);
    $('.btc-wallet-name').text('Wallet- ' + walletName + ' details:');

  };

  $scope.printWallet = function (e) {
    //print new k/v pair (working!)
    printJS('pjs-target', 'html');
  };

  //This works!!! getting data
  $scope.getCharts = function (e) {
    //send GET request to blockchain API to get price charts
    console.log('charts got??');
    request('https://blockchain.info/ticker', (err, res, body) => {
      if (err) {
        console.log('error getting blockchain price data: ', err);
      }

      console.log('body: ', body);
    });
  };

}])
