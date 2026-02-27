
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./components/HomePage"
import FileUploadContainer from'./containers/FileUploadContainer'
import GridContainer from './containers/GridContainer'

function App() {

  return (
    <div className="container-fluid p-1">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">
          Rights App
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/upload">
            Upload
          </Link>
          <Link className="nav-link" to="/search">
            Search
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUploadContainer />} />
        <Route path="/search" element={<GridContainer />} />
      </Routes>
    </div>
  )
}

export default App
