module.exports = {
    getTodos : async(req,res) => {
        try {
            let db = req.app.get('db')
            let todos = await db.todos.getTodos()
            res.status(200).send(todos)
        } catch (error) {
            console.log('Error getting todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },
    deleteTodos : async(req,res) => {
        try {
            let db = req.app.get('db')
            let todos = await db.todos.deleteTodo(id)
            res.status(200).send(todos)
        } catch (error) {
            console.log('Error deleting todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },
    createTodo : async(req,res)=>{
        try {
            let db = req.app.get('db')
            let todo = await db.todos.createTodo(req.body.userid,req.body.content)
            res.status(200).send(todo)
        } catch (error) {
            console.log('Error creating todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },
    editTodo : async (req,res) => {
        try {
            let db = req.app.get('db')
            let todo = await db.todo.updateTodo(content, id)
            res.send(todo)
        } catch (error) {
            console.log('Error editing todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    }

}