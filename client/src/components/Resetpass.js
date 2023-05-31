import React, { useState } from 'react';
import axios from 'axios';

function Resetpass() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/recovery/reset-password', { email });
  };

  return (
    <div className="model box-shadow">
    <div className="overlay"></div>
     <div className=" modal-content"> 
    <form onSubmit={handleSubmit} className=''>
      <label>
        Email address :     
        <input className='m-2 border-2 rounded-lg border-slate-600 ' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label><br></br>
      <button type="submit" className='bg-blue-600 rounded-lg p-2 mt-4 m-auto container w-1/2'>Reset password</button>
    </form>
    </div>
    </div>

  );
}

export default Resetpass;
