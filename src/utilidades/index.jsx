/* eslint-disable react-hooks/rules-of-hooks */
import "./Index.css";
import Filas from '../filas/Filas';
import Avion from '../avion/Avion';
import root from '../main';

function limpiaScreen(){
   const screen = document.querySelector(".screen");

   while(screen.firstChild){
    screen.removeChild(screen.firstChild);
   }
}

function empiezaJuego(){

    const menu = document.querySelector(".menu");
    menu.classList.add("inactive");

        setTimeout(() => {
            root.render(
            
                <>
                    <main className='container' id='main'>
                    </main>
                    <div className='main__container'>
                            <div className='screen'>
                                <div className="invaders">
                                    <Filas />
                                    <Filas />
                                    <Filas />
                                    <Filas />
                                    <Filas />
                                    <Filas />
                                    <Filas />
                                </div>
                                <Avion/>
                            </div>

                            <div className="buttons__grid">
                                <div className="button" id="button__left">
                                    
                                </div>
                                <div className="button" id="button__right">
                                    
                                </div>
                            </div>
                    </div>
                </>
           
            )
        }, 1000);
}

function mensaje() {
    const main = document.querySelector(".root");

    const divMsj = document.createElement("DIV");
    divMsj.classList.add("mensaje__div");

    const heading = document.createElement("H2");
    heading.classList.add("mensaje__heading")
    heading.textContent = "Has ganado";

    divMsj.appendChild(heading);
    main.appendChild(divMsj);
}
function mensajeLost() {
    const main = document.querySelector(".root");

    const divMsj = document.createElement("DIV");
    divMsj.classList.add("mensaje__div");

    const heading = document.createElement("H2");
    heading.classList.add("mensaje__heading")
    heading.textContent = "Has perdido";

    divMsj.appendChild(heading);
    main.appendChild(divMsj);
}
export {
    limpiaScreen,
    empiezaJuego,
    mensaje,
    mensajeLost
};