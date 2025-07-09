import { useState } from "react";


export default function TodoList2() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const handleAdd = () => {
        console.log("add", input);
        setList([...list, input])
        setInput("")
    }
    const handleDelete = (index) => {
        setList(list.filter((item, i) => i !== index).sort((a, b) => a - b))
    }
    return (
        <div>
            <h1>Todo List 2</h1>
            <input type="text" value={input} onChange={(e) => {
                setInput(e.target.value);
            }} />
            <button onClick={handleAdd} style={{ width: "100px", height: "30px" }}>添加数据</button>
            <ul>
                {
                    list.map((item, index) => (<li key={index}>
                        {item}
                        <button onClick={() => handleDelete(index)}>删除</button>
                    </li>))
                }
            </ul>
        </div>
    )
}