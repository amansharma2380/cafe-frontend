import "./Home.css"
function Home(props){
  let id = "23423efd23"
  return(
  <div> <h1 style={{color:"black"}}>Hello {props.name}</h1>
  <h2 className="App-Home-Header">your student id is : {id}</h2>
  <p>you age is {props.age}</p>
</div>)
}
export default Home;