import React from 'react'

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold">Hotel Management System</h3>
              <p className="text-xs sm:text-sm">Your comfort is our priority</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:space-x-4">
              <a href="#" className="text-xs sm:text-sm hover:text-gray-300">About Us</a>
              <a href="#" className="text-xs sm:text-sm hover:text-gray-300">Contact</a>
              <a href="#" className="text-xs sm:text-sm hover:text-gray-300">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs sm:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Hotel Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
