import { Link as MaterialUILink } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__items">
        <li className="navigation__item">
          <MaterialUILink
            component={Link}
            className="navigation__link"
            to="/table"
          >
            Table
          </MaterialUILink>
        </li>
        <li className="navigation__item">
          <MaterialUILink
            component={Link}
            className="navigation__link"
            to="/chart"
          >
            Chart
          </MaterialUILink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
