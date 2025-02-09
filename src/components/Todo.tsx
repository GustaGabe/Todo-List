"use client"
import { useState, useEffect } from "react"

export const Todo = () => {
    const [values, setValues] = useState<string>('')
    const [tasks, setTasks] = useState<{ id: string; value: string }[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks")
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault()

        if (values.trim() === "") return

        const newTask = {
            id: crypto.randomUUID(),
            value: values
        }

        setTasks([...tasks, newTask])
        setValues("")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(e.target.value)
    }

    const handleDeleteTodo = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <div className="bg-white w-[480px] p-5 rounded-md flex flex-col inset-0">
            <span className="text-2xl font-semibold text-left ml-4 mb-2 text-slate-800">To-do List 📋</span>
            <form onSubmit={handleAddTodo} className="flex justify-center">
                <input 
                    value={values} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Add your task" 
                    className="bg-slate-200 w-[320px] p-3 rounded-s-3xl text-slate-400 focus:outline-1 focus:outline-offset-1 focus:outline-slate-300"
                />
                <button 
                    type="submit" 
                    className="bg-violet-500 p-3 px-8 rounded-r-3xl focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 hover:bg-violet-600"
                >
                    Add
                </button>
            </form>
            
            <div>
                {tasks.map((task) => (
                    <div key={task.id} className="ml-4 mt-6">
                        <span className="text-slate-500 flex justify-between items-center text-lg">
                            {task.value}
                            <button 
                                type="button" 
                                className="bg-violet-500 mr-4 p-1 rounded-md text-white focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 hover:bg-violet-600"
                                onClick={() => handleDeleteTodo(task.id)}
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
