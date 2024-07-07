import './App.css';
import Screen from './Screen/Screen';


function App(){

  setTimeout(() => {
    const black = document.querySelector(".container__active");
    black.classList.add("container__inactive");

    setTimeout(() => {
      black.remove();
    }, 1500);
  }, 200);

  return (
    <>
      <main className='container' id='main'>
          <h1 className='heading'>Space Invaders</h1>
          <Screen/>
          <div className='container__active'></div>
      </main>
    </>
  )
}

export default App
