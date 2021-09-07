console.clear();

const AWS = require('aws-sdk');

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Kinesis.html
const kinesis = new AWS.Kinesis({
    region: 'ap-southeast-2'
});

const listStreams = async () => {
    try {
        return kinesis.listStreams({}).promise();
    } catch (err) {
        console.error('Error listStreams: ', err);
    }
};

const describeStream = async (streamName) => {
    try {
        return kinesis.describeStream({ StreamName: streamName }).promise();
    } catch (err) {
        console.error('Error describeStream: ', err);
    }
};

const listShards = async (streamName) => {
    try {
        return kinesis.listShards({ StreamName: streamName }).promise();
    } catch (err) {
        console.error('Error listShards: ', err);
    }
};

const getShardIterator = async (shardId, streamName) => {
    try {
        return kinesis.getShardIterator({ ShardId: shardId, ShardIteratorType: 'LATEST', StreamName: streamName }).promise();
    } catch (err) {
        console.error('Error getShardIterator: ', err);
    }
};

const getRecords = async (shardIterator) => {
    try {
        return kinesis.getRecords({ ShardIterator: shardIterator }).promise();
    } catch (err) {
        console.error('Error getRecords: ', err);
    }
};

const putRecord = async (data, partitionKey, streamName) => {
    try {
        return kinesis.putRecord({ Data: data, PartitionKey: partitionKey, StreamName: streamName }).promise();
    } catch (err) {
        console.error('Error putRecord: ', err);
    }
};



//stream.StreamDescription.StreamARN
// kinesis.listStreamConsumers({ StreamARN: 'arn:aws:kinesis:ap-southeast-2:188693474830:stream/trading-v2-qa' }, (err, data) => {
//     if (err) {
//         console.error('Error listStreamConsumers: ', err);
//     } else {
//         console.log('listStreamConsumers: ', data);
//     }
// });



(async () => {
    const streamName = 'stream-name';
    //const stream = await describeStream(streamName);
    const shards = await listShards(streamName);
    const shardIterator = await getShardIterator(shards.Shards[0].ShardId, streamName);
    
    const obj = {
        "wrapper": {
            "header": {
              "metadata": {
                "wrapperSchemaVersion": "1-0-0",
                "domain": "my-domain",
                "subdomain": "my-subdomain",
                "messageId": "1a95102e-3bd7-47a1-b820-953552cc8e1d",
                "source": "til"
              },
              "timestamp": {
                "created": "2021-07-08T01:14:49.241Z"
              }
            },
            "trailer": {
              "checksum": {
                "type": "sha256",
                "value": "9c2b5f1cf689cad42b15d9cb7844d7dfcff12bca6bfd9dc988a0f65a77012b0c"
              }
            }
          }
      };

      //const buffer = Buffer.from(JSON.stringify({testData: 'Test Data to put'}));
    const buffer = Buffer.from(JSON.stringify(obj));

    const putRec = await putRecord(buffer, 'pk-1', streamName);
    //const records = await getRecords(shardIterator.ShardIterator);

    
    //console.log(records);
    console.log(putRec);
})();