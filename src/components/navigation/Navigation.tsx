import {Link} from "react-router-dom";
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__items">
        <li className="navigation__item">
          <Link to="/table">Table</Link>
        </li>
        <li className="navigation__item">
          <Link to="/chart">Chart</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation