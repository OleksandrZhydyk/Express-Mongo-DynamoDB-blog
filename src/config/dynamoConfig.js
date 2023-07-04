import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const client = new DynamoDBClient({
  credentials: fromEnv(),
  region: process.env.DYNAMO_DB_REGION,
});

const awsconfig = {
  conf: {
    region: process.env.DYNAMO_DB_REGION,
    endpoint: "http://localhost:4444", // http://localhost:8000 or https://dynamodb.eu-west-1.amazonaws.com
  },

  dnmClient: client,
};

export default awsconfig;
