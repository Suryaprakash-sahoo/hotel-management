import React from 'react'

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Hotel Management System</h3>
              <p className="text-sm">Your comfort is our priority</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">About Us</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Hotel Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
