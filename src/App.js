import React, {useState, useEffect} from "react"
import { View } from "./components/View";

//getting values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('watchs');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [watchs, setWatchs]= useState([getDatafromLS()]);

  //input field states
  const [watch_name, setWatchName]= useState('');
  const [brand, setBrand]= useState('');
  const [color, setColor]= useState('');
  const [price, setPrice]= useState('');

  //form submit event
  const handleAddWatchSubmit=(e)=>{
    e.preventDefault();

    //creating an object
    let watch={
      watch_name,
      brand,
      color,
      price
    }
    setWatchs([...watchs, watch]);
    setWatchName('');
    setBrand('');
    setColor('');
    setPrice('');
  }

  //delete from LS
  const deleteWatch=(watch_name)=>{
    const filteredWatchs=watchs.filter((element,index)=>{
      return element.watch_name !== watch_name
    })
    setWatchs(filteredWatchs);
  }

  //saving data to local storage
  useEffect(()=>{
    localStorage.setItem('watchs', JSON.stringify(watchs));
  },[watchs])

  return(
    <div className="wrapper">
      <div className="main">
        <div className="form-container bg-primary">
          <form autoComplete="off" className="form-group"
          onSubmit={handleAddWatchSubmit}>
            <label>Watch Name</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setWatchName(e.target.value)} value={watch_name}></input>
            <label>Brand</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setBrand(e.target.value)} value={brand}></input>
            <label>Color</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setColor(e.target.value)} value={color}></input>
            <label>Price</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setPrice(e.target.value)} value={price}></input>
            <br></br>
            <button type="submit" className="btn btn-secondary btn-md">
              Add Watch
            </button>
          </form>
        </div>

        <div className="view-container bg-primary">
          {watchs.length>0&&<>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Watch Name</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              
                <View watchs={watchs} deleteWatch={deleteWatch}/>
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger btn-md" 
          onClick={()=>setWatchs([])}>Remove All</button>
          </>}
          {watchs.length <1 && <div>No watchs added.</div>}
        </div>
      </div>
    </div>
  )
}

export default App;