const forge = require('node-forge'); 
const fs = require('fs');
const path = require('path');
var rsa = forge.pki.rsa;

// console.log(path.join(__dirname, 'kres','id_rsa'))
// let pkey = fs.readFileSync(path.join(__dirname  , '/../kres','id_rsa' ));
// let privateKey = forge.pki.privateKeyFromPem(pkey);

class CryptoService
{
    static publicKey;
    static privateKey;
    constructor()
    {
        if(!CryptoService.publicKey || !CryptoService.privateKey)
        {
            rsa.generateKeyPair({bits: 4096, workers: -1}, function(err, keypair) {
                CryptoService.publicKey =  forge.pki.publicKeyToPem(keypair.publicKey)
                CryptoService.privateKey = forge.pki.privateKeyToPem(keypair.privateKey)
              });
        }
    }


}

module.exports = {
    'CryptoService' : CryptoService
}