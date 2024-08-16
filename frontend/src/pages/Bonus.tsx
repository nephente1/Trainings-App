import { useEffect, useState } from "react";
const kociak = require("../images/kociak.jpg");

export const Bonus = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);


  const wynik = <img style={{height: "75vh", margin: "auto", display: "flex"}} src={kociak} />
  
  return (
    <div>
      <h1 style={{textAlign: "center", color: "crimson"}}>Surprise</h1>
      <div style={{textAlign: "center", fontSize: "60px"}}>{seconds === 0 ? wynik : seconds + `...`}</div>
    </div>
  )
}
