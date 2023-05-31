import React, { useState } from 'react'


function ResetPassword() {

    const [changepass,setchangepass] = useState('');
    // const [email,setEmail] = useState('');
   
    const updatepass = async () => {
      // console.log(changepass)
//       const queryString = window.location.search;

// // Extract the value of the 'token' parameter from the query string
// const urlParams = new URLSearchParams(queryString);
// const token = urlParams.get('token');
// console.log(token)
      
        const url = `http://localhost:5000/api/staff/resetpass`;
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({ password:changepass }),
        });
        const res = await response.json();
       
      };

  return (
    <div className='text-blue-400'>
      <form onSubmit={updatepass}>
      {/* <label>Email:</label>
  <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/> */}
  <label>New Password:</label>
  <input type="password" name="password" onChange={(e) => setchangepass(e.target.value)}/>
  <button type="submit">Reset Password</button>
</form>
    </div>
  )
}

export default ResetPassword
