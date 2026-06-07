import { useState } from "react"

const Todo = () =>{

    const [todoList, setTodoList] = useState([])
    const [input, setInput] = useState("")
    const [newName, setNewName] = useState("")

    function addTask(task) {
        if(!task) {
            return
        }
        setTodoList([...todoList, {name: task, id: Date.now(), isEdit: false}])
        setInput("")
    }

    function removeTask(index) {
        const newTodo = todoList.filter((item)=> item.id != index)
        setTodoList([...newTodo])
    }

    function setEditTrue(index) {
        const updatedList = todoList.map((item) => {
            if(item.id == index) {
                item.isEdit = true
                setNewName(item.name)
            }
            return item      
        })
        setTodoList(updatedList)
    }

    function updateTask(index) {
        const updatedList = todoList.map((item) => {
            if(item.id == index) {
                item.name = newName
                item.isEdit = false
            }
            return item  
        })
        setNewName("")
        setTodoList(updatedList) 
    }

    return (
        <div className="min-h-screen bg-gray-400 items-center flex flex-col gap-2 mb-5">
            <div className="bg-white p-6 mb-3 rounded-xl shadow-lg mt-50">
                <div className="flex gap-2 mb-10">
                    <input className="border bg-white p-2 rounded" placeholder="Enter task" value={input} onChange={(e)=> {setInput(e.target.value)}} onKeyDown={(e)=> {if(e.key == "Enter") addTask(input)}}></input>
                    <button className="bg-blue-500 text-white px-2 py-2 rounded" onClick={()=> addTask(input)}>Add</button>
                </div>
                <ul>
                {todoList.map((item)=> {
                    return (
                        <div className="flex justify-between items-center bg-gray-200 rounded-lg gap-2 mb-3 p-3" key={item.id}>
                            <li>{item.isEdit ? <input  className="border bg-white p-2 rounded" value={newName} onChange={(e)=> {setNewName(e.target.value)}} onKeyDown={(e)=> {if(e.key == "Enter") updateTask(item.id)}}></input>: item.name}</li>
                            <div className="flex gap-2">
                                <button className="bg-green-500 text-white px-2 py-2 rounded" onClick={item.isEdit ? ()=> {updateTask(item.id)} : ()=> {setEditTrue(item.id)}}>{item.isEdit ? "Save" : "Edit"}</button>
                                <button className="bg-red-500 text-white px-2 py-2 rounded" onClick={()=> {removeTask(item.id)}}>Delete</button>
                            </div>
                        </div>
                    )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Todo