import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Search from "./pages/Search.jsx";
import Service from "./pages/Service.jsx";
import CreateService from './pages/CreateService.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Header from "./components/Header.jsx";
import Footer from './components/Footer.jsx';
import Profile from "./pages/Profile.jsx";
import UpdateService from './pages/UpdateService.jsx'
function App() {
  return (
    <BrowserRouter> 
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<Search />} path="/search" />
        <Route element={<Service />} path="/service/:serviceId" />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/create-service" element={<CreateService />} />
          <Route
            path="/update-service/:serviceId"
            element={<UpdateService />}
          />
        </Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
