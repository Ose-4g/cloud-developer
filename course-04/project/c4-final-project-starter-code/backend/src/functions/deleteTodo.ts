import { CreateTodoRequest } from "../requests/CreateTodoRequest"
import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'
import { getUserId } from "../lambda/utils"

const docClient = new DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE

const deleteTodo = async (todoId: string, userId)=>{

    await docClient.delete({ // IAM permission - dynamodb:DeleteItem
        TableName:todoTable,
        Key:{
          todoId: todoId
        },
        ConditionExpression: "userId = :userId",
        ExpressionAttributeValues:{
          ":userId" : userId
        }
      }).promise()
}

export default deleteTodo
