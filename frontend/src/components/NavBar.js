import React from "react";
import { Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function NavBar({ signedIn, signout, email }) {
  return (
    <nav className="navbar">
      <Switch>
        <Route path="/signin">
          <NavLink className="navbar__item" to="/signup">
            Регистрация
          </NavLink>
        </Route>
        <Route path="/signup">
          <NavLink className="navbar__item" to="/signin">
            Войти
          </NavLink>
        </Route>
        <ProtectedRoute exact path="/" signedIn={signedIn}>
          <button className="navbar__item navbar__item_button navbar__item_button-email">{email}</button>
          <button onClick={signout} className="navbar__item navbar__item_button navbar__item_button-exit">Выйти</button>
          {/* <NavLink onClick={signout} className="navbar__item" to="/signup">
            Выйти
          </NavLink> */}
        </ProtectedRoute>
      </Switch>
    </nav>
  );
}

export default NavBar;
