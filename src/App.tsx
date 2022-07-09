import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"



// pages
import HeartyOnePage from "./pages/hearty_one/hearty_one.page"
import RaisedByWolvesPage from "./pages/raised_by_wolves/raised_by_wolves.page"





import './App.scss'


function App() {

  // const createRectangle = ({ color, name, width, height, verticalAlignment:, linkOffsetX: })=> {
    // const rectangle = new Rectangle(name || "Rectangle")
    // rectangle.background = color || "darkgreen"
    // rectangle.height = height || "40px"
    // rectangle.alpha = .7
    // // rectangle.width = "30px"
    // rectangle.width = width || "120px"
    // rectangle.cornerRadius = 8
    // rectangle.thickness = 1
    // rectangle.linkOffsetX = linkOffsetX || 40
    // rectangle.top = 10
    // rectangle.zIndex = 100
    // rectangle.verticalAlignment = verticalAlignment || Control.VERTICAL_ALIGNMENT_TOP

    // return rectangle
  // }

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RaisedByWolvesPage />} />
          <Route path="/hearty-one" element={<HeartyOnePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
