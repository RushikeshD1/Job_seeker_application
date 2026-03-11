import { useContext, useEffect } from 'react'
import "./App.css"
import {Context} from "./main"
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Login from "./component/auth/login"
import Register from "./component/auth/register"
import Navbar from "./component/layout/Navbar"
import Footer from "./component/layout/Footer"
import Home from "./component/home/Home"
import JobsDetails from "./component/job/JobsDetails"
import Jobs from "./component/job/Jobs"
import PostJobs from "./component/job/PostJobs"
import MyJobs from "./component/job/MyJobs"
import Application from "./component/application/Application"
import MyApplication from "./component/application/MyApplication"
import NotFound from "./component/not found/NotFound"
import { Toaster } from "react-hot-toast"
import axios from "axios"


const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log(error);
        
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobsDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App