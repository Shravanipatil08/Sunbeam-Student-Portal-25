import { useState } from 'react'
import OnboardPage from './Pages/Public Pages/OnboardPage'
import LoginPage from './Pages/Public Pages/LoginPage'

import StudentHome from './Pages/Student Pages/StudentHome'
import MyCourses from './Pages/Student Pages/MyCourses'
import CourseDesc from './Pages/Public Pages/CourseDesc'
import RegisterPage from './Pages/Public Pages/RegisterPage'
import ProfilePage from './Pages/Student Pages/ProfilePage'
import ViewVideo from './Pages/Student Pages/ViewVideo'
import AboutUs from './Pages/Public Pages/AboutUs'

import './App.css'
 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<OnboardPage />} />
        <Route path='/loginPage' element={<LoginPage />} />
        <Route path='/registerStudent/:id' element={<RegisterPage />} />
        <Route path='/course/:id' element={<CourseDesc />} />
        <Route path='/aboutUs' element={<AboutUs/>}/>

        <Route path='/studentHome' element={  <StudentHome />} />
        <Route path='/myCourses' element={ <MyCourses /> } />
        <Route path='/viewVideo' element={<ViewVideo/>}/>
        <Route path='/profilePage' element={<ProfilePage/> }/>
      </Routes>
    </>
  )
}

export default App
