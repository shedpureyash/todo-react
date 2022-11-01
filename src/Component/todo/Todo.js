import React, { useState, useEffect } from 'react'

const Todo = () => {

  //Function to get data back from local storage
  let getlocalstoragedata = ()=>{
    let data=JSON.parse(localStorage.getItem("todolist"))
    if(data)
      return data
    else
      return [] 
  }

  let [inputdata, SetInputdata] = useState("")
  let [items, SetItems] = useState(getlocalstoragedata())

  // Funciton for Adding items
  let additem = () => {
    if (!inputdata) {
      window.alert("please fill the box")
    }
    else {
      let mynewinputdata = {
        id: new Date().getTime().toString(),
        value: inputdata
      }
      console.log(mynewinputdata.id)
      SetItems([...items, mynewinputdata])
      SetInputdata("")
    }
  }
  //Function for deleting items
  let deleteitem = (index) => {
    console.log("deleteitem is called")
    let updateditemslist = items.filter((currele) => {
      return currele.id !== index
    })
    SetItems(updateditemslist)
  }

  //Function to remove all items
  let deleteall = () => {
    SetItems([])
  }

  // Adding items(data) to local storage
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items))
  }, [items])

  return (
    <div>
      <figure >
        <img className='figur' src='./logotodo.jpg' alt='todologo'></img>
        <figcaption>Add your list here</figcaption>
      </figure>
      <div>
      <input  type="text" placeholder="🖋🖋 Add Item" value={inputdata} onChange={(event) => { SetInputdata(event.target.value) }}></input>
      <i className="fas fa-plus plus" onClick={additem}></i>
      <br></br>
      <br></br>
      <button className="deletebutton" onClick={deleteall}>Remove all</button>
      <br></br>
      <br></br>
        <ol>
          {
            items.map((currele, index) => {
              return (
                <li key={index}>
                  {currele.value}
                  <i className="far fa-trash-alt deleteitem" onClick={() => deleteitem(currele.id)}></i>
                </li>
              )
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default Todo
