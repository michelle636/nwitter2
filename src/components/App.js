import React, {useState, useEffect} from 'react';
import AppRouter from "./Router";
import {authService} from '../fbInstance';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  )
}

export default App;
