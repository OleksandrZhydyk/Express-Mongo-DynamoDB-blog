import {
  DynamoDBClient,
  CreateTableCommand,
  QueryCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const credentials = fromIni({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Updated SDK v3 code: Querying a DynamoDB table
const client = new DynamoDBClient({
  region: process.env.DYNAMO_DB_REGION,
  credentials,
});

// (async () => {
//   const command = new ListTablesCommand({});
//   try {
//     const results = await client.send(command);
//     console.log(results.TableNames.join("\n"));
//   } catch (err) {
//     console.error(err);
//   }
// })();

const awsconfig = {
  conf: {
    region: process.env.DYNAMO_DB_REGION,
    endpoint: "http://localhost:4444", // http://localhost:8000 or https://dynamodb.eu-west-1.amazonaws.com
  },

  dnmClient: client,
};

export default awsconfig;
