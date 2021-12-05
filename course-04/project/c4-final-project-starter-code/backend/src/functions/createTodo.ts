import { CreateTodoRequest } from "../requests/CreateTodoRequest"
import * as uuid from 'uuid'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS);

const docClient = new XAWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE

const createTodo = async (todo: CreateTodoRequest, userId: string)=>{

    const newTodo = {
        todoId: uuid.v4(),
        userId,
        createdAt: new Date().toISOString(),
        done:false,
        ...todo
    }

    await docClient.put({
        TableName: todoTable,
        Item: newTodo
    }).promise()

    return newTodo
}

export default createTodo