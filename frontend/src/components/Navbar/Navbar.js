import "./Navbar.css"

// Components
import { NavLink, Link } from 'react-router-dom'
import { 
  BsSearch,
  BsHouseDoorFill, 
  BsFillPersonFill, 
  BsFillCameraFill 
} from 'react-icons/bs'

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="pesquisar" />
      </form>
      <ul id="nav-links">
        <li>
          <NavLink to="/" end activeClassName="active">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar