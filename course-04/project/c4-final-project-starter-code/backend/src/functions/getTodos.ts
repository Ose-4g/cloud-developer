import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { TodoItem } from '../models/TodoItem'

const XAWS = AWSXRay.captureAWS(AWS);

const docClient = new XAWS.DynamoDB.DocumentClient()


const todoTable = process.env.TODOS_TABLE
const userIdIndex = process.env.USER_ID_INDEX

const getTodos = async(userId:string): Promise<TodoItem[]>=> {
   
    const result = await docClient.query({ // IAM permission - dynamodb:Query
        TableName: todoTable,
        IndexName: userIdIndex,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues:{
          ":userId":userId
        }
      }).promise()
  
      const items = result.Items ? result.Items : []
      return items as TodoItem[]
}

export default getTodos