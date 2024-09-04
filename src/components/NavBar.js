import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toggle from './Toggle';

function NavBar() {
  const { articles, setArticles, isDark, setDark } = useContext(AppContext);
  const temp = articles;

  const debounce = (fn, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, timeout);
    };
  };

  const onChange = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setArticles(temp);
      return;
    }

    const filteredData = articles?.filter((news) =>
      news.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setArticles(filteredData);
  };

  const handleChange = () => {
    setDark(!isDark);
  };

  const [mode, setMode] = useState("dark");

  useEffect(() => {
    if (isDark) {
      setMode("light");
    } else {
      setMode("dark");
    }
  }, [isDark]);

  return (
    <>
      <Navbar bg={mode === "light" ? "dark" : "light"} data-bs-theme={mode === "light" ? "dark" : "light"} expand="lg" className="bg-body-tertiary fixed-top" style={{ padding: '7px 15px 7px 10px' }}>
        <Navbar.Brand href="/" className="navbar-brand-custom">News Paper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="/business">Business</NavDropdown.Item>
              <NavDropdown.Item href="/entertainment">Entertainment</NavDropdown.Item>
              <NavDropdown.Item href="/general">General</NavDropdown.Item>
              <NavDropdown.Item href="/health">Health</NavDropdown.Item>
              <NavDropdown.Item href="/science">Science</NavDropdown.Item>
              <NavDropdown.Item href="/sports">Sports</NavDropdown.Item>
              <NavDropdown.Item href="/technology">Technology</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Some other</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <form action='' className="search-bar">
            <input type="text" placeholder="Search" onChange={debounce(onChange, 300)}></input>
          </form>
          <div className="toggle-container">
            <Toggle isChecked={isDark} handleChange={handleChange} />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
