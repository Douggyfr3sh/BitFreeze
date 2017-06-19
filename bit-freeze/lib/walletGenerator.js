//Write logic for generating a new k/v pair in here
//const $ = require('jquery')
const BTC = require('bitcoinjs-lib')

$(document).ready( () => {
  console.log('document ready!');

  $('.btc-btn-generate').on('click', (e) => {
    //doesnt work yet- next step add bootstrap and refactor btn HTML.
    console.log('button wuz click\'d');
    let newWallet = BTC.ECPair.makeRandom();
    let public = newWallet.getAddress();
    let _private = newWallet.toWIF();
    let shownPrivate = _private;

    //generate hidden private string:

    //show results
    $('.btc-public-key').text(public);
    $('.btc-private-key').text(shownPrivate);

  })
});