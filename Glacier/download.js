const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});

const glacier = new AWS.Glacier();

const vaultName = 'til-archive';

const listVaults = async (params) => {
    try {
        return glacier.listVaults(params).promise();
    } catch (err) {
        console.error('Error listVaults: ', err);
    }
};

const describeVault = async (params) => {
    try {
        return glacier.describeVault(params).promise();
    } catch (err) {
        console.error('Error describeVault: ', err);
    }
};

const getVaultNotifications = async (params) => {
    try {
        return glacier.getVaultNotifications(params).promise();
    } catch (err) {
        console.error('Error getVaultNotifications: ', err);
    }
};

const initiateJob = async (params) => {
    try {
        return glacier.initiateJob(params).promise();
    } catch (err) {
        console.error('Error initiateJob: ', err);
    }
};

const getJobOutput = async (params) => {
    try {
        return glacier.getJobOutput(params).promise();
    } catch (err) {
        console.error('Error getJobOutput: ', err);
    }
};

const listJobs = async (params) => {
    try {
        return glacier.listJobs(params).promise();
    } catch (err) {
        console.error('Error listJobs: ', err);
    }
};


// glacier.initiateJob(params, function(err, data) {
//     if (err) console.log("Error uploading archive!", err);
//     else console.log("Archive ID", data.archiveId);
// });


(async () => {

    // const result = await initiateJob({ 
    //     vaultName, 
    //     jobParameters: {
    //         ArchiveId: 'v26CALq2RVpn9UTFCmE9sLDJJmA7q8Jgdsd0PgKSR2r_RjAKlrQg0Wb53IsQgao9cYCJboFDFta7dRc1Y9hhHGcSYvYjE0kDMamhb8-Ta5WFLbcIoPTMpTbyl9Wv867er-7_wCsGOQ',
    //         Description: 'downloading the archive',
    //         // OutputLocation: {
    //         //     S3: {
    //         //         BucketName: 'til-temp'
    //         //     }
    //         // },
    //         Type: 'archive-retrieval'
    //     } 
    // });

    // const result = await listJobs({ vaultName });

    const result = await getJobOutput({ vaultName, jobId: '3phC8y-dR-mqBiHmRyMM-LD2xzUBnJeCzzjVwvuIExh5o2ql6anwppind_PJsTwBh5fek7GuRtolPa0lr6HkD5rFX2Kl' });
    
    if (result.status == 200) {
        fs.writeFile("test.png", result.body, "binary", function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
    
    // console.log(result);
})();