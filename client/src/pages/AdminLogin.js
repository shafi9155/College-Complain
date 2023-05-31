import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import  { loginadmin } from "../features/Admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
function AdminLogin() {
  let location = useNavigate();
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {admin,Success}=useSelector((state)=>state.admin)
  
const navigate=useNavigate();

   const dispatch=useDispatch()
  const handleClick = async (e) => {
    e.preventDefault();
    const userdata={
      email:username,password
    }
   
    dispatch(loginadmin(userdata));
    
   }
   useEffect(() =>{
  
    if(admin|| Success ){
                        
     navigate("/Admin/AdminHome")

      }

}, [admin,Success])


    // const url = `http://localhost:5000/api/admin/adminLogin`;
    // console.log(username);
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email: username, password: password }),
    // });
    // const res = await response.json();

    // console.log(res);

    // if (res.success) {
    //  // localStorage.setItem("token", res.authtoken);
    //   location("/Admin/AdminHome");
    // } else {
    //   alert("Wrong credentials");
    // }
 // };


  return (
    <div className="min-h-screen flex flex-col">
      <AdminNav/>
      <div className=" mx-auto content-center mt-56 w-3/12  ">
        <div className="box-shadow border-2 px-10 py-16">
          <p className='text-4xl  text-custom-blue mb-8 text-center'>
            Admin Login
          </p>
          <form>
            <div>
              <label htmlFor="username">
                <p className="para">Email id:</p>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  className="ipt"
                />
              </label>
            </div>

            <div>
              <label htmlFor="password">
                <p className="para">Password:</p>
                <input
                  placeholder="password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="ipt"
                />
              </label>
            </div>

            <div class="flex items-center mt-5">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                required
                class="  w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="link-checkbox"
                class="ml-2 text-sm font-medium text-gray-900"
              >
                Remember Me
              </label>
            </div>

            <div className=" mt-4 mb-3 ">
              <button
                onClick={handleClick}
                type="submit"
                className="text-white mt-4 mb-3 w-full p-3 ml-1 bg-custom-blue rounded-lg hover:bg-sky-700"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
