module.exports = {
    getTodos : async(req,res) => {
        try {
            console.log(req.params.userid)
            let db = req.app.get('db')
            let todos = await db.todos.getTodos(req.params.userid)
            res.status(200).send(todos)
        } catch (error) {
            console.log('Error getting todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },
    deleteTodos : async(req,res) => {
        try {
            let db = req.app.get('db')
            let todos = await db.todos.deleteTodo(req.params.id, req.params.userid)
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
        console.log(req.body)
        try {
            let db = req.app.get('db')
            let todo = await db.todos.updateTodo(req.body.content, req.params.id, req.params.userid)
            res.send(todo)
        } catch (error) {
            console.log('Error editing todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },
    markComplete : async (req,res) => {
        try {
            let db = req.app.get('db')
            let todo = await db.todos.markTodoAsComplete(req.params.id, req.params.userid)
            res.send(todo)
        } catch (error) {
            console.log('Error completing todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },

    markIncomplete : async (req,res) => {
        try {
            let db = req.app.get('db')
            let todo = await db.todos.markTodoAsIncomplete(req.params.id, req.params.userid)
            res.send(todo)
        } catch (error) {
            console.log('Error incomplete todos Origin: server/todoController/ Error:', error);
            res.status(500).send(error)
        }
    },

    // <><><><><><><><><><><><><><> NESTED TODO CONTROLLER BELOW <><><><><><><><><><><><><>

    getNested : async (req,res) => {
        try {
            let db= req.app.get('db')
            let todo = await db.todos.getNested(req.params.parenttodoid)
            res.send(todo)
        } catch (e) {
            console.log('Error getting nested', e);
            res.status(500).send(e)
        }
    } ,

    createNested : async (req,res) => {
        try {
            let db = req.app.get('db')
            let todo = await db.todos.createNested(req.body.parenttodoid, req.body.userid, req.body.content)
            res.send(todo)
        } catch (e) {
            console.log('Error creating nested Orgin: todocontroller:',e);
            res.status(500).send(e)
        }
    },

    deleteNested : async (req,res) => {
        try {
            let db = req.app.get('db')
            let todo = await db.todos.deleteNested(req.params.id, req.params.userid)
            res.send(todo)
        } catch (e) {
            console.log('Error deleting nested Orgin: todocontroller:',e);
            res.status(500).send(e)
        }
    },

    updateNested : async(req,res)=>{
        try {
            let db = req.app.get('db')
            let todo = await db.todos.updateNested(req.body.content, req.params.id, req.params.userid)
            res.send(todo)
        } catch (e) {
            console.log('Error editing nested Orgin: todocontroller:',e);
            res.status(500).send(e) 
        }
    },

    markNestedComplete : async(req,res)=> {
        try {
            let db = req.app.get('db')
            let todo = await db.todos.markNestedAsComplete(req.params.id, req.params.userid)
            res.send(todo)
        } catch (e) {
            console.log('Error marking complete nested Orgin: todocontroller:',e);
            res.status(500).send(e) 
        }
    },

    markNestedIncomplete : async(req,res)=> {
        try {
            let db = req.app.get('db')
            let todo = await db.todos.markNestedAsIncomplete(req.params.id, req.params.userid)
            res.send(todo)
        } catch (e) {
            console.log('Error marking incomplete nested Orgin: todocontroller:',e);
            res.status(500).send(e) 
        }
    }
}