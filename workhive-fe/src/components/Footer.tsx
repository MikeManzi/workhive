export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">WorkHive</h2>
            <p className="text-gray-300">Connect businesses with talented freelancers</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} WorkHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

