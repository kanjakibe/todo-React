import React, {useState, useEffect} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo'
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc,} from 'firebase/firestore'
import { useCallback } from 'react';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-gray-900 to-gray-1500`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between `,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#ff004f] text-slate-100`,
  count: `text-center p-2`,
  footer: `bg-[#262626] text-white max-w-[500px] p-4 m-auto rounded-md text-center`,
}



function App() {
const [todos, setTodos] = useState([])
const [input, setInput] = useState('');

console.log(process.env);

//Create todo
// const createTodo = async (e) => {
//   e.preventDefault(e)
//   if(input === '') {
//     alert('Please enter a valid todo')
//     return
//   }
//   await addDoc(collection(db, 'todos'), {
//     text: input, 
//     completed: false,
//   })
//   setInput('')
// }

const createTodo = async (e) => {
  e.preventDefault(e);
  if (input === '') {
    alert('Please enter a valid todo');
    return;
  }

  const timestamp = new Date();
  await addDoc(collection(db, 'todos'), {
    text: input,
    completed: false,
    timestamp: timestamp.toISOString(), // Store the timestamp as a string
  });
  setInput('');
};

//Delete todo
// const deleteTodo = async (id) => {
//   await deleteDoc(doc(db, 'todos', id))
// }
const deleteTodo = useCallback(
  async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  },
  [db]
);


//Read todo from firebase
// useEffect(()=>{
// const q = query(collection(db, 'todos'))
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   let todosArr = []
//   querySnapshot.forEach((doc) => {
//     todosArr.push({...doc.data(), id: doc.id})
//   })
//   setTodos(todosArr)
// })
// return () => unsubscribe()
// }, [])

useEffect(() => {
  const q = query(collection(db, 'todos'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todosArr = [];
    querySnapshot.forEach((doc) => {
      const todo = { ...doc.data(), id: doc.id };
      todosArr.push(todo);

      // Check if the todo is older than 30 minutes and delete it
      const todoTimestamp = new Date(todo.timestamp);
      const currentTimestamp = new Date();
      const timeDifference = currentTimestamp - todoTimestamp;

      if (timeDifference >  30 * 60 * 1000) {
        deleteTodo(doc.id);
      }
    });

    setTodos(todosArr);
  });

  return () => unsubscribe();
}, [deleteTodo]);

//Update todo in firebase
const toggleCommplete = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id),{
    completed: !todo.completed
  })
}





  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo}className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add Todo'/>
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index)=> (
            <Todo key={index} todo={todo} toggleCommplete={toggleCommplete} deleteTodo={deleteTodo}/>
          ))}
          
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}
        
      </div>
      <div className={style.footer}>
            <p>Copyright &copy; Nelson Kanja</p>
      </div>
      
    </div>
    
    
  );
}

export default App;
