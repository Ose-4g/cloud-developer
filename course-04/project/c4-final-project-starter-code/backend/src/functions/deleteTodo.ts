import todosAccess from "../helpers/todosAccess"


const deleteTodo = async (todoId: string, userId)=>{
  await todosAccess.deleteTodoItem(todoId, userId)
}

export default deleteTodo
