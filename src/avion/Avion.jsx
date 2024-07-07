import "./Avion.css"
import { mensaje, mensajeLost } from "../utilidades";


function Avion() {
    /* Funcion que mueve el avion con las teclas */
    setTimeout(() => {
        /* El avion y su anchura */
        const avion = document.querySelector(".avion__img");
        const avionWidth = avion.clientWidth;
        const flama = document.querySelector(".avion__flama");
    
        /* Posicion global de los misiles para modificarlo caundo el avion este rotado*/
        let misilPos = -10;
    
        /* La pantalla y su anchura */
        const screen = document.querySelector(".screen");
        const screenWidth = screen.clientWidth;
    
        let pos = (screenWidth - avionWidth)/ 2;/* Posicion centrada del avion */
        const step = (pos*10)/100; /* La cantidad de pixeles que se mueve cada que se presiona la tecla */
    
        avion.style.transform = `translateX(${pos}px)`;
        flama.style.transform = `translateX(${pos + (avionWidth/2) -10}px)`;
        
        /* Modificador para que la flama se haga visible hasta que el avion este en el centro */
            setTimeout(() => {
                flama.classList.remove("inactive")
            }, 500);
    
        /* Agrego el listener a las teclas */
        document.addEventListener("keydown", e =>{
            e.preventDefault();
            let newPos;
            let rotate = "0";
            let flamaPos = 0;
            if(e.key === "ArrowLeft" && !e.repeat){
                if((pos-step ) > 0){
                    newPos = pos - step;
                    rotate = "-10deg";
                    flamaPos = 10;
                    misilPos = -10;
                }
                else{
                    return
                }
            }
            else if(e.key === "ArrowRight" && !e.repeat){
                if((pos+avionWidth-screenWidth ) < 0 && !((pos+avionWidth-screenWidth ) > step)){
                    newPos = pos + step;
                    rotate = "10deg";
                    flamaPos = -10;
                    misilPos = -10;
                }
                else{
                    return
                }
            }
            else{
                return
            }
    
            pos = newPos;
            
            avion.style.transform = `translateX(${pos}px) rotate(${rotate})`;
            flama.style.transform = `translateX(${pos + (avionWidth/2) -10 + flamaPos}px) rotate(${rotate})`;
    
            document.addEventListener("keyup", () =>{
                rotate = "0"
                misilPos = -10;
                avion.style.transform = `translateX(${pos}px) rotate(${rotate})`;
                flama.style.transform = `translateX(${pos + (avionWidth/2) -10}px) rotate(${rotate})`;
            })
        })
        
        /* listener a los botones */
        const buttonLeft = document.querySelector("#button__left")
        const buttonRight = document.querySelector("#button__right")

        buttonLeft.addEventListener("click", () =>{
            let newPos;
            let rotate = "0";
            let flamaPos = 0;

            if((pos-step ) > 0){
                newPos = pos - step;
                rotate = "-10deg";
                flamaPos = 10;
                misilPos = -20;
            }
            else{
                return
            }

            pos = newPos;
            
            avion.style.transform = `translateX(${pos}px) rotate(${rotate})`;
            flama.style.transform = `translateX(${pos + (avionWidth/2) -10 + flamaPos}px) rotate(${rotate})`;
            
            setTimeout(() => {
                rotate = "0"
                misilPos = -10;
                avion.style.transform = `translateX(${pos}px) rotate(${rotate})`;
                flama.style.transform = `translateX(${pos + (avionWidth/2) -10}px) rotate(${rotate})`;
            }, 200);
        })


        buttonRight.addEventListener("click", () =>{
            let newPos;
            let rotate = "0";
            let flamaPos = 0;

            if((pos+avionWidth-screenWidth ) < 0 && !((pos+avionWidth-screenWidth ) > step)){
                newPos = pos + step;
                rotate = "10deg";
                flamaPos = -10;
                misilPos = -10;
            }
            else{
                return
            }

            pos = newPos;
            
            avion.style.transform = `translateX(${pos}px) rotate(${rotate})`;
            flama.style.transform = `translateX(${pos + (avionWidth/2) -10 + flamaPos}px) rotate(${rotate})`;
            
            setTimeout(() => {
                rotate = "0"
                misilPos = -10;
                avion.style.transform = `translateX(${pos}px) rotate(${rotate})`;
                flama.style.transform = `translateX(${pos + (avionWidth/2) -10}px) rotate(${rotate})`;
            }, 200);
        })
        /* Funcion para los disparos cada cierto tiempo */
        setInterval(() => {
            let posDesktop = 0;
            if(window.innerWidth >= 768){
                posDesktop = (window.innerWidth - 768)/2    ;
            }
            
            /* Primero calculo la ubicacion del centro del avion, para ubicar los disparos justo en su punta */
            const center = pos + (avionWidth/2) + posDesktop
            /* Tambien es necesario calcular la distancia entre la punta del avion y el top del documento */
            const distanceToTop = avion.getBoundingClientRect().top;
    
            const shoot = document.createElement("DIV");
            shoot.classList.add("shoot", "inactive");
            
    
            const misil = document.createElement("DIV");
            misil.classList.add("misil");
    
            shoot.appendChild(misil)
    
            /* Le asigno al disparo la posicion donde se encuentre la punta del avion */
            shoot.style.top =`${distanceToTop}px`;
            shoot.style.left = `${center + misilPos}px`;
    
            /* Agrego el disparo como hijo del contenedor principal */
            const main__container = document.querySelector(".container");
            main__container.appendChild(shoot);
    
            setTimeout(() => {
                shoot.classList.remove("inactive");
                shoot.style.transform = `translateY(-${distanceToTop}px)`
            }, 100);
    
    
            /* Evaluo si el misil golpea algun invasor */
            const invasores = document.querySelectorAll(".invader"); /* Arreglo con todos los invasores */
            invasores.forEach(invasor => {
                /* Evaluo cada cierto tiempo sus posiciones */
    
                setInterval(() => {
                    /* Coordenadas del invasor */
                    const invasorY = invasor.getBoundingClientRect().top;
                    const invasorX = invasor.getBoundingClientRect().left;
    
                    /* Coordenadas del misil */
                    const misilY = shoot.getBoundingClientRect().top;
                    const misilX = shoot.getBoundingClientRect().left;
    
                    const Xdiferencial = misilX - invasorX
                    const Ydiferencial = misilY - invasorY
    
                    const XPow = Math.pow(Xdiferencial, 2);
                    const Ypow = Math.pow(Ydiferencial, 2)
    
                    const diferencial = Math.sqrt(XPow + Ypow);
    
                    if(diferencial < 17 && !invasor.classList.contains("dead") && !shoot.classList.contains("inactive")){
                        invasor.classList.add("dead");
                        shoot.classList.add("inactive");
                        shoot.remove();
                    }
                }, 10);
            })

            /* Evaluo si una fila de invasores a sido eliminada */

            const filas = document.querySelectorAll(".fila");
            filas.forEach(fila =>{
                let NumberofDeads = 0;
                const numberofInvaders = fila.childNodes.length;

                fila.childNodes.forEach(invader => {
                    if(invader.classList.contains("dead")){
                        NumberofDeads++;
                    }
                })

                if(numberofInvaders === NumberofDeads){
                    fila.remove();
                }
            })
    
            /* Reviso si la posicion del misil llego al top de la pantalla cada cierto tiempo y lo elimino */
            setInterval(() => {
                const shootDistance = shoot.getBoundingClientRect().top;
                if(shootDistance < 20){
                    shoot.classList.add("inactive");
                    
                    /* Lo elimino despues de que acabe la transicion del inactive */
                    setTimeout(() => {
                        shoot.remove()
                    }, 300);
                }
                
            }, 10);
    
        }, 500);
        
        }, 1200);
    
        
    /* Funcion que evalua si se gano o se perdio */
    setInterval(() => {
        /* Aqui evaluo si todos los invasores estan muertos y muestro el mensaje de victoria */
        const invasorsDead = document.querySelectorAll(".dead");
        const invasors = document.querySelectorAll(".invader");

        const diference = invasorsDead.length - invasors.length;

        if(diference === 0){

            mensaje();

            const div = document.querySelector(".mensaje__div");
            const msj = document.querySelector(".mensaje__heading");

            setTimeout(() => {
                div.classList.add("mensaje__div--active");
                msj.classList.add("mensaje__heading--active");
            }, 500);

            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }

        /* Aqui evaluo si los invasores han llegado al avion y muestro mensaje de derrota */

        const invadersContainer = document.querySelector(".invaders");
        const avion = document.querySelector(".avion__img");
        
        /* Sus distancias al tope de la pantalla */
        const invadersDistance = invadersContainer.getBoundingClientRect().top;
        const avionDistance = avion.getBoundingClientRect().top;

        /* Altura del contenedor */
        const invadersHeight = invadersContainer.clientHeight;

        /* Calculo la distancia entre el top del avion y el bottom del container de invasores */
        const spaceBetween = invadersDistance + invadersHeight - avionDistance;

        /* Si el espacio entre ellos es 0 o positivo es que perdi */
        if(spaceBetween >= 0){

            mensajeLost();

            const div = document.querySelector(".mensaje__div");
            const msj = document.querySelector(".mensaje__heading");

            setTimeout(() => {
                div.classList.add("mensaje__div--active");
                msj.classList.add("mensaje__heading--active");
            }, 500);

            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }

    }, 200);    

    /* Funcion que hace a los invaders bajar */
    /* Despues de medio segundo evaluo la posicion de ambos */
    setTimeout(() => {
        const invaders = document.querySelector(".invaders");
        /* Variable que ira aumentando cada intervalo */
        let sumatoria = 1;

        /* Cada cierto tiempo hago que el contenedor de los invasores baje */
         setInterval(() => {
            invaders.style.transform = `translateY(${sumatoria}rem)`

            sumatoria += 1;
         }, 2000);

    }, 500);
    

  return (
    <div className="avion__container">
        <div>
            <div className="avion__img"></div>

            <div className="avion__flama inactive"></div>
        </div>
    </div>
  )
}

export default Avion