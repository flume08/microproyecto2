import { Await, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import VistaClub from "./components/Home/Club";
import Demo from "./components/Demo/Demo";
import HomeHeader from "./components/Home/Header/HomeHeader";
import DemoHeader from "./components/Demo/DemoHeader";
import { Blog } from "./Context/Context";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Home/Profile/Profile";
import { setDoc } from "firebase/firestore";
import BuscadorVideojuegos from "./components/Home/Buscador";

function App() {
  const { currentUser } = Blog();

  return (
    
    <>
    
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<Demo />} />}
        <Route path="/buscador" element={<BuscadorVideojuegos/>}/>
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/clubes/:id" element={<VistaClub />}  />
        <Route
          path="*"
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
        
      </Routes>
    </>
  );
}


export default App;

