import { Link as MaterialUILink } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './Navigation.css'
import { Typography } from '@material-ui/core'

function Navigation() {
  return (
    <Typography variant="button">
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
    </Typography>
  )
}

export default Navigation
