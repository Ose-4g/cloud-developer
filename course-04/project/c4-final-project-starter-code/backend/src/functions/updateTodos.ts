import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'

const docClient = new DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE

const updateTodos = async(todoId:string, name: string, dueDate: string, done: boolean)=> {
   
    await docClient.update({ // IAM permission - dynamodb:UpdateItem
        TableName: todoTable,
        Key:{
          todoId: todoId
        },
        UpdateExpression: "set todoName = :todoName, dueDate = :dueDate, done = :done",
        ConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { 
          ":todoName": name,
          ":dueDate": dueDate,
          ":done": done,
        },
        ReturnValues:"UPDATED_NEW"
      }).promise()
  
}

export default updateTodos