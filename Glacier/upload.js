const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});

const glacier = new AWS.Glacier();

const vaultName = 'til-archive';
// No more than 4GB otherwise use multipart upload
const file = fs.readFileSync('./voicemod_receipt.png');

const params = {vaultName: vaultName, body: file};

glacier.uploadArchive(params, function(err, data) {
    if (err) console.log("Error uploading archive!", err);
    else console.log("Archive ID", data.archiveId);
});