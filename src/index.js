import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/index"
import About from "./pages/about"
import Contact from "./pages/contact"
import Navbar from "./navbar"
import Youtube from "./pages/youtube"

const el = document.getElementById("root")

// tell react to take control of that element
const root = ReactDOM.createRoot(el)

function App() {
    return  (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/youtube" element={<Youtube />} />
            </Routes>
        </Router>
    )
}

root.render(<App />)