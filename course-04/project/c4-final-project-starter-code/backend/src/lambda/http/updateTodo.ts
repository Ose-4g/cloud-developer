import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import updateTodo  from '../../functions/updateTodos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import updateTodos from '../../functions/updateTodos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    const {name, dueDate, done} = updatedTodo
    const userId = getUserId(event)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object

    try {
      const userId = getUserId(event)
      const updated = await updateTodos(userId, name,dueDate, done);
      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'unable to update todo item'
        })
      }
    }
  }

)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
