import "./Scoreboard.css"
import { useState } from "react";

export default function Scoreboard(){
    const [run,setrun] = useState(0);
    const updaterun = () =>{
        setrun(run+1);
    };
    const [wicket,setwicket] = useState(0);
const updatewicket = () =>{
    if(wicket >= 10){setwicket(10);}
    else{
        setwicket(wicket+1);
    }
}

const result = () => {
if(wicket == 10){
    return "All Out!!!"
}else{
   return  "Play"
}
}
    return(
    <div className="container">
       <div className="left">
<p><button onClick={updaterun}>Run</button><br/>
{run}</p>
<p><button onClick={updatewicket}>wicket</button><br/>
{wicket}</p>
</div>
<p className="right">{result()}</p>
    </div>
    )
}