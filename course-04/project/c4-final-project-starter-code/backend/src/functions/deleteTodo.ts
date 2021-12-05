import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS);

const docClient = new XAWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE

const deleteTodo = async (todoId: string, userId)=>{

    await docClient.delete({ // IAM permission - dynamodb:DeleteItem
        TableName:todoTable,
        Key:{
          todoId: todoId,
          userId: userId
        },
      }).promise()
}

export default deleteTodo
