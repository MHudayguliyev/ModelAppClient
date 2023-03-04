import React from 'react'
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import { Toaster } from 'react-hot-toast';

//routes 
import routes from "./Components/Routes";


const location = new ReactLocation();

function App() {
  return (
    <div className="App">
          <>
         <Toaster
            position="top-center"
            reverseOrder={false}
         />
         <Router
            location={location}
            routes={routes}
         >
            <Outlet />
         </Router>
      </>
    </div>
  )
}

export default App
