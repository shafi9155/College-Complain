import React from 'react'

function Footer() {
  return (
    <div>
    <footer className="p-4 h-20 bg-white -mt-20 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">College Complaint</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>
</div>
  )
}

export default Footer