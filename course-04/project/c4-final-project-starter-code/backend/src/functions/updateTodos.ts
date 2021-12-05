import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS);

const docClient = new XAWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE

const updateTodos = async(todoId:string, userId:string, name: string, dueDate: string, done: boolean)=> {
   
    await docClient.update({ // IAM permission - dynamodb:UpdateItem
        TableName: todoTable,
        Key:{
          todoId: todoId,
          userId:userId
        },
        UpdateExpression: "SET #n = :name, dueDate = :dueDate, done = :done",
        ExpressionAttributeValues: { 
          ":name": name,
          ":dueDate": dueDate,
          ":done": done,
        },
        ExpressionAttributeNames: {
          "#n": "name",
        },
        ReturnValues:"ALL_NEW"
      }).promise()
    
      return {
          name,
          dueDate,
          done
      }
  
}

export default updateTodos