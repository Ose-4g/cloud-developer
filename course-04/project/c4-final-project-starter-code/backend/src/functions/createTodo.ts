import { CreateTodoRequest } from "../requests/CreateTodoRequest"
import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'
import { getUserId } from "../lambda/utils"

const docClient = new DynamoDB.DocumentClient()
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