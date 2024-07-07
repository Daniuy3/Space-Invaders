import "./Screen.css"
import {empiezaJuego} from "../utilidades/index";

function Screen() {
  
  
  
  function menu(){
    return(
      <div className="screen ">
        <div className="menu">
        <h2 className="menu__header">Welcome to Space invaders!</h2>
        <div className="menu__div" onClick={empiezaJuego}>
          <div className="menu__svg"></div>
          <h3 className="menu__play">PLAY</h3>
        </div>
        </div>
      </div>
    )

  
  }


      return (
        menu()
      )

 
}

export default Screen