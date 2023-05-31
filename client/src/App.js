import './App.css';
import Home from './pages/Home';
import Complaint from './pages/Complaint';
import UserProfile from './pages/UserProfile';
import SignUp from './components/SignUp';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import Blog from './pages/Blog';
import SingleBlogCmpln from './components/SingleBlogCmpln';
import FacultyHome from './pages/FacultyHome';
import Newcomplains from './pages/Staff/Newcomplains';
import Activecomplains from './pages/Staff/Activecomplains';
import ClosedCompalins from './pages/Staff/ClosedCompalins';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminNav from './components/AdminNav';
import AdminCompTable from './components/AdminCompTable';
import AdminStudent from './components/AdminStudent';
import AdminHome from './pages/AdminHome';
import AdminStaff from './components/AdminStaff';
import ViewComplaint from './components/ViewComplaint';
import AddStaff from './components/AddStaff';
import ViewComplainstaff from './components/ViewComplainstaff'
import Resetpass from './components/Resetpass';
import ResetPassword from './components/ResetPassword';
function App() {
  return (
  <div className='relative'>
 <Router>
      
      <Routes>
      <Route path="/Complaint/:id" element={<ViewComplaint/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/Staff/Home' element={<FacultyHome/>}/>
        <Route path='/Staff/Newcomplaints' element={<Newcomplains/>}/> 
        <Route path='/Staff/Activecomplains' element={<Activecomplains/>}/>
       <Route path='/Staff/ClosedCompalins' element={<ClosedCompalins/>}/>
        <Route path='/Staff/SingleCompalins' element={<ViewComplainstaff/>}/>
        <Route path='/Blog' element={<Blog/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        
        <Route path='/Complaint' element={<Complaint/>}/>
        <Route path='/UserProfile' element={<UserProfile/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/ResetPass' element={<Resetpass/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/Admin/AdminHome' element={<AdminHome/>}/>
        <Route path='/Admin/Complain' element={<AdminCompTable/>}/>
        <Route path='/Admin/Student' element={<AdminStudent/>}/>
        <Route path='/Admin/Staff' element={<AdminStaff/>}/>
        <Route path='/Admin/AddStaff' element={<AddStaff/>}/>
      </Routes>
      <Footer/>
    </Router> 
    <ToastContainer/>
    </div>
  );
}

export default App;
