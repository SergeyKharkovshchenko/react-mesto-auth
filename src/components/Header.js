import logo from "../images/mesto_logo.svg";
import { Route, Link } from "react-router-dom";

function Header({ onLogout, email }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="лого" />
      <Route exact path="/">
        <div className="header__data">
          <p className="header_user">{email}</p>
          <button onClick={onLogout} className="link">
            Выйти
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="link" to="signin">
          Войти
        </Link>
      </Route>
      <Route exact path="/signin">
        <Link className="link" to="signup">
          Зарегистрироваться
        </Link>
      </Route>
    </header>
  );
}

export default Header;
