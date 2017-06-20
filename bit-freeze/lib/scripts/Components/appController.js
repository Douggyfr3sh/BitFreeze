const BTC = require('bitcoinjs-lib')
const request = require('request')
//const ks = require('node-key-sender')
//const qr = require('qr-image')
// const print = require('../../../node_modules/print.js/dist/print.min.js')

angular.module('ngBitFreeze', [])

.controller ('AppController', ['$scope', function($scope) {
  $scope.appName = 'BitFreeze';
  $scope.btcValue = {
    usd: {last: 'loading', buy: 'loading', sell: 'loading' },
    jpy: {last: 'お待ちください', buy: 'お待ちください', sell: 'お待ちください' }
  };

  //update prices once on load
  request('https://blockchain.info/ticker', (err, res, body) => {
    if (err) {
      console.log('error getting blockchain price data: ', err);
    }
    //set price data on controller
    var priceData = JSON.parse(body);

    $scope.btcValue.usd = {
      last: priceData.USD.last,
      buy: priceData.USD.buy,
      sell: priceData.USD.sell
    };

    $scope.btcValue.jpy = {
      last: priceData.JPY.last,
      buy: priceData.JPY.buy,
      sell: priceData.JPY.sell
    };

    console.log($scope);

    //Must call apply to digest changes since we are inside another scope
    //see: https://stackoverflow.com/questions/20070077/angularjs-view-not-updating-on-model-change
    $scope.$apply();

  });


  //refresh btc values on an interval
  setInterval(() => {
    request('https://blockchain.info/ticker', (err, res, body) => {
      if (err) {
        console.log('error getting blockchain price data: ', err);
      }
      //set price data on controller
      var priceData = JSON.parse(body);

      $scope.btcValue.usd = {
        last: priceData.USD.last,
        buy: priceData.USD.buy,
        sell: priceData.USD.sell
      };

      $scope.btcValue.jpy = {
        last: priceData.JPY.last,
        buy: priceData.JPY.buy,
        sell: priceData.JPY.sell
      };

      console.log($scope);

      //Must call apply to digest changes since we are inside another scope
      //see: https://stackoverflow.com/questions/20070077/angularjs-view-not-updating-on-model-change
      $scope.$apply();

    });
  }, 20000);

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


}])
