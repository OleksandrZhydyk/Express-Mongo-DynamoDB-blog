import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import awsconfig from "../../config/dynamoConfig.js";
import { UserDTO } from "../../DTOs/index.js";

const table = "user_table";

export const registerDB = async (dto) => {
  const salt = await bcrypt.genSalt(10);
  const pwdhash = await bcrypt.hash(dto.password, salt);

  const uuid = uuidv4();

  const createItem = {
    id: uuid,
    email: dto.email,
    name: dto.name,
    passwordHash: pwdhash,
    avatarUrl: dto.avatarUrl,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const marshallOptions = {
    removeUndefinedValues: true,
  };

  const userCreate = {
    TableName: table,
    Item: marshall(createItem, marshallOptions),
  };

  const getUser = {
    TableName: table,
    Key: marshall({ id: uuid }),
  };

  try {
    await awsconfig.dnmClient.send(new PutItemCommand(userCreate));
    const response = await awsconfig.dnmClient.send(
      new GetItemCommand(getUser)
    );

    const { passwordHash, ...userData } = unmarshall(response.Item);
    return new UserDTO.RegisterGetMeUserOutputDTO(userData);
  } catch (e) {
    console.log(e);
  }
};

export const getMeDB = async (dto) => {
  const getUser = {
    TableName: table,
    Key: marshall({ id: dto.userId }),
  };

  const response = await awsconfig.dnmClient.send(new GetItemCommand(getUser));
  const { passwordHash, ...userData } = unmarshall(response.Item);

  return new UserDTO.RegisterGetMeUserOutputDTO(userData);
};

export const loginDB = async (dto) => {
  const getUserByEmail = {
    TableName: table,
    FilterExpression: "email = :value",
    ExpressionAttributeValues: {
      ":value": { S: dto.email }, // The value to search for
    },
  };

  const response = await awsconfig.dnmClient.send(
    new ScanCommand(getUserByEmail)
  );

  return new UserDTO.LoginChecksDTO(unmarshall(response.Items[0]));
};
