


// export default function Temp({flag}){
//    if(flag){
//     return <h4>flag is true</h4>
//    }else{
//     return <h4>Flage is false</h4>
//    }
// }

// export default function Temp({flag}){
//    return flag ?  <h4>flag is true</h4> : <h4>flag is false</h4>;
// }

// export default function Temp({flag}){
//    return flag &&  <h4>flag is true</h4>
// }



// export default function Temp(){
//     const handleClick = () =>{
//         alert("hey!!!!!!!!")
//     }
//     const handleSubmit=(name)=>{
//         alert(`hello ${name}`);
//     };
//     return(
//         <>
//         <button onClick={handleClick}>click</button>
//         <button onClick={() =>handleSubmit("Martin")}>Submit</button>
//         </>
//     )
// }
import { useState } from "react"

export default function Temp() {
    const[score, setscore] = useState(0);
    const update =()=>{
      setscore(score+1);
    };

    return (<div>
{score}
<p><button onClick={update}>Update Score</button></p>
    </div>);
}