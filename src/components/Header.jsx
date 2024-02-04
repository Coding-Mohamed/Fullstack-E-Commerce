import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const cartItems = useSelector((state) => state.products.cart.items);

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleLogin = () => {
    // login operation...
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    console.log("Token removed from local storage");
    navigate("/"); // Redirect to home page
    console.log("Redirected to home page");
  };

  const handleToggleAccount = () => {
    setAccountOpen(!accountOpen);
  };

  const handleOpenAccount = () => {
    setAccountOpen(true);
  };

  const handleCloseAccount = () => {
    setAccountOpen(false);
  };

  return (
    <nav>
      <div className="logo">
        <h1>
          <NavLink to="/" className="logo">
            WholeSale
          </NavLink>
        </h1>
      </div>

      <input type="checkbox" id="checkbox" checked={menuOpen} onChange={handleToggleMenu} />
      <div className="menu">
        <label htmlFor="checkbox"></label>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="line-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="x-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className="nav-link" onClick={handleCloseMenu}>
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link" onClick={handleCloseMenu}>
            Collection
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className="nav-link" onClick={handleCloseMenu}>
            Discover
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-link" onClick={handleCloseMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cart">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItemsInCart > 0 && <span className="cart-count">{totalItemsInCart}</span>} {/* Display the total quantity of items in the cart */}
          </NavLink>
        </li>
        <li ref={accountRef} onMouseEnter={handleOpenAccount} onMouseLeave={handleCloseAccount}>
          <span className="nav-link account-link" onClick={(handleToggleAccount, handleCloseMenu)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cart">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            {accountOpen && (
              <ul className="account-dropdown">
                {localStorage.getItem("token") ? (
                  <>
                    <li>
                      <NavLink to="/" className="nav-link" onClick={handleLogout}>
                        Logout
                      </NavLink>
                    </li>
                    <li>
                      <Link to="/orders">
                        <button className="btn btn-primary">View Your Order here</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart">
                        <button className="btn btn-primary">Continue Shopping</button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <p>Log in to view your orders.</p>
                      <NavLink to="/login" className="nav-link" onClick={handleLogin}>
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
