import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import OnboardPage from './Pages/Public Pages/OnboardPage'
import LoginPage from './Pages/Public Pages/LoginPage'

import StudentHome from './Pages/Student Pages/StudentHome'
import MyCourses from './Pages/Student Pages/MyCourses'
import CourseDesc from './Pages/Public Pages/CourseDesc'
import RegisterPage from './Pages/Public Pages/RegisterPage'
import ProfilePage from './Pages/Student Pages/ProfilePage'
import ViewVideo from './Pages/Student Pages/ViewVideo'

import AdminHome from './Pages/Admin Pages/AdminHome'

import AddCourse from './Pages/Admin Pages/Courses/AddCourse'
import ShowCourses from './Pages/Admin Pages/Courses/ShowCourses'
import UpdateCourse from './Pages/Admin Pages/Courses/UpdateCourse'

import AddVideo from './Pages/Admin Pages/Videos/AddVideo'
import EditVideo from './Pages/Admin Pages/Videos/EditVideo'
import ShowVideos from './Pages/Admin Pages/Videos/ShowVideos'

import EnrollStudent from './Pages/Admin Pages/EnrollStudent'
import ProtectedRoutes from './context/ProtectedRoutes'
import AboutUs from './Pages/Public Pages/AboutUs'

function App() {
  return (
    <>
      {<Routes>
        <Route path='/' element={<OnboardPage />} />
        <Route path='/loginPage' element={<LoginPage />} />
        <Route path='/registerStudent/:id' element={<RegisterPage />} />
        <Route path='/course/:id' element={<CourseDesc />} />
        <Route path='/aboutUs' element={<AboutUs/>}/>
        

        <Route path='/studentHome' element={<ProtectedRoutes role={"student"}> <StudentHome /> </ProtectedRoutes>} />
        <Route path='/myCourses' element={<ProtectedRoutes role={"student"}> <MyCourses /> </ProtectedRoutes>} />
        <Route path='/viewVideo' element={<ProtectedRoutes role={"student"}><ViewVideo/></ProtectedRoutes>}/>
        <Route path='/profilePage' element={<ProtectedRoutes role={"student"}><ProfilePage/> </ProtectedRoutes>}/>


        <Route path='/adminHome' element={<ProtectedRoutes role={"admin"}> <AdminHome /> </ProtectedRoutes>} />

        <Route path='/addCourse' element={<ProtectedRoutes role={"admin"}> <AddCourse /> </ProtectedRoutes>} />
        <Route path='/showCourses' element={<ProtectedRoutes role={"admin"}><ShowCourses /> </ProtectedRoutes>} />
        <Route path='/updateCourse' element={<ProtectedRoutes role={"admin"}><UpdateCourse /> </ProtectedRoutes>} />

        <Route path='/addVideo' element={<ProtectedRoutes role={"admin"}> <AddVideo /> </ProtectedRoutes>} />
        <Route path='/editVideo' element={<ProtectedRoutes role={"admin"}> <EditVideo /> </ProtectedRoutes>} />
        <Route path='/showVideos' element={<ProtectedRoutes role={"admin"}><ShowVideos /> </ProtectedRoutes>} />

        <Route path="/getEnrolledStudents" element={<ProtectedRoutes role={"admin"}> <EnrollStudent /> </ProtectedRoutes>} />
      </Routes>}      
    </>
  )
}

export default App
