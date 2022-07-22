import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"



// pages
import HeartyOnePage from "./pages/hearty_one/hearty_one.page"
import RaisedByWolvesPage from "./pages/raised_by_wolves/raised_by_wolves.page"
import BallsPage from "./pages/balls/balls.page"
import PlanetsOnePage from "./pages/planets_one/planets_one.page"
import LinkedControlsPage from "./pages/linked_controls/linked_controls.page"
import LinkedControlsTwoPage from "./pages/linked_controls_two/linked_controls_two.page"
import BallyGamePage from "./pages/bally_game/bally_game.page"
import RaisedByWolvesFactoryPage from "./pages/raised_by_wolves_factory/raised_by_wolves_factory.page"




import './App.scss'



function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RaisedByWolvesPage />} />
          <Route path="/ray" element={<RaisedByWolvesFactoryPage />} />
          <Route path="/hearty-one" element={<HeartyOnePage />} />
          <Route path="/balls" element={<BallsPage />} />
          <Route path="/planets-one" element={<PlanetsOnePage />} />
          <Route path="/lc" element={<LinkedControlsPage />} />
          <Route path="/lc2" element={<LinkedControlsTwoPage />} />
          <Route path="/bg" element={<BallyGamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
