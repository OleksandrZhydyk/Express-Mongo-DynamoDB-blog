import { v4 as uuidv4 } from "uuid";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import awsconfig from "../../config/dynamoConfig.js";
import { PostDTO } from "../../DTOs/index.js";

const table = "post_table";

export const createDB = async (dto) => {
  const uuid = uuidv4();

  const createItem = {
    id: uuid,
    title: dto.title,
    text: dto.text,
    tags: dto.tags,
    imageUrl: dto.imageUrl,
    user: dto.userId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const marshallOptions = {
    removeUndefinedValues: true,
  };

  const postCreate = {
    TableName: table,
    Item: marshall(createItem, marshallOptions),
  };

  const getPost = {
    TableName: table,
    Key: marshall({ id: uuid }),
  };

  try {
    await awsconfig.dnmClient.send(new PutItemCommand(postCreate));
    const response = await awsconfig.dnmClient.send(
      new GetItemCommand(getPost)
    );
    return new PostDTO.GetPostOutputDTO(unmarshall(response.Item));
  } catch (e) {
    console.log(e);
  }
};

export const getAllDB = async () => {
  const getAll = {
    TableName: table,
  };

  const response = await awsconfig.dnmClient.send(new ScanCommand(getAll));

  return response.Items.map(
    (item) => new PostDTO.GetPostOutputDTO(unmarshall(item))
  );
};

export const getOneWithLikesDB = async (dto) => {
  const getPost = {
    TableName: table,
    Key: marshall({ id: dto.postId }),
  };

  const response = await awsconfig.dnmClient.send(new GetItemCommand(getPost));
  console.log(response);

  if (response && response.$metadata.httpStatusCode === 200) {
    return new PostDTO.GetPostOutputDTO(unmarshall(response.Item));
  }
  return false;
};

export const getOneDB = async (dto) => {
  const getPost = {
    TableName: table,
    Key: marshall({ id: dto.postId }),
  };

  const response = await awsconfig.dnmClient.send(new GetItemCommand(getPost));

  if (response && response.$metadata.httpStatusCode === 200) {
    return new PostDTO.GetPostOutputDTO(unmarshall(response.Item));
  }
  return false;
};

export const removeOneDB = async (dto) => {
  const deletePost = {
    TableName: table,
    Key: marshall({ id: dto.postId }),
  };

  const response = await awsconfig.dnmClient.send(
    new DeleteItemCommand(deletePost)
  );
  if (response && response.$metadata.httpStatusCode === 200) {
    return true;
  }
  return false;
};

export const updateDB = async (dto) => {
  const updateItem = {
    title: dto.title,
    text1: dto.text,
    tags: dto.tags,
    imageUrl: dto.imageUrl,
    updatedAt: Date.now(),
  };

  const marshallOptions = {
    removeUndefinedValues: true,
  };

  const marshalled = marshall(updateItem, marshallOptions);

  function getUpdateExpression(updateItem) {
    let expression = "SET ";
    for (let key in marshalled) {
      expression += `${key} = :${key}, `;
    }
    return expression.substring(0, expression.length - 2);
  }

  function getExpressionAttributes(updateItem) {
    const expressionAttributes = {};
    for (let key in marshalled) {
      expressionAttributes[`:${key}`] = marshalled[key];
    }
    return expressionAttributes;
  }

  const updatePost = {
    TableName: table,
    Key: marshall({ id: dto.postId }),
    UpdateExpression: getUpdateExpression(updateItem),
    ExpressionAttributeValues: getExpressionAttributes(updateItem),
  };

  const response = await awsconfig.dnmClient.send(
    new UpdateItemCommand(updatePost)
  );

  if (response && response.$metadata.httpStatusCode === 200) {
    return true;
  }
  return false;
};
