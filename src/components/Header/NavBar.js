import React, { useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import { usePopper } from "react-popper";

const StyledNav = styled.nav`
  display: none;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  padding: 1rem;

  @media (min-width: 845px) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 2rem;
  text-decoration: none;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &.selected {
    color: ${({ theme }) => theme.colors.primary.dark};
    opacity: 1;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  color: white;
  font-weight: bolder;
  text-align: center;
  background-color: ${(props) => (props.visible ? "red" : "blue")};
  border-radius: 5px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: background-color, opacity 1s linear;
`;

const DropdownMenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  color: white;
  font-weight: bolder;
  text-decoration: none;
  background-color: blueviolet;
  cursor: pointer;

  &.selected {
    color: yellow;
    opacity: 1;
  }

  &:hover {
    color: yellow;
    opacity: 1;
  }
`;

const NavBar = () => {
  // USELOCATION - REACT ROUTER
  const { pathname } = useLocation();

  // USESTATE - STATE
  const [visible, setVisibility] = useState(false);
  const [referenceRef, setReferenceRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  // Popper Configuration
  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 0],
        },
      },
    ],
  });

  // OPEN DROP DOWN MENU - FUNCTION
  const handleOpenMenu = () => {
    setVisibility(true);
  };

  // CLOSE DROP DOWN MENU - FUNCTION
  const handleCloseMenu = () => {
    setVisibility(false);
  };

  return (
    <React.Fragment>
      <StyledNav>
        <StyledNavLink exact to="/" activeClassName="selected">
          HOME
        </StyledNavLink>
        <StyledNavLink
          to="/about"
          activeClassName="selected"
          isActive={() =>
            ["/about", "/cyrilo", "/resume", "/passions"].includes(pathname)
          }
          ref={setReferenceRef}
          onClick={handleCloseMenu}
          onMouseEnter={handleOpenMenu}
          onMouseLeave={handleCloseMenu}
        >
          ABOUT
        </StyledNavLink>
        <StyledNavLink to="/work" activeClassName="selected">
          WORK
        </StyledNavLink>
        <StyledNavLink to="/contact" activeClassName="selected">
          CONTACT
        </StyledNavLink>
      </StyledNav>
    </React.Fragment>
  );
};

export default NavBar;

/*

<DropdownMenu
    onMouseEnter={handleOpenMenu}
    onMouseLeave={handleCloseMenu}
    activeClassName="selected" // Active Class for NavLink / Based on useLocation
    ref={setPopperRef}
    style={styles.popper}
    {...attributes.popper}
    visible={visible}
>
    <DropdownMenuItem
        to="/customsoftware"
        activeClassName="selected"
        onClick={handleCloseMenu}
    >
        Custom Software Development
    </DropdownMenuItem>
    <DropdownMenuItem
        to="/mobileapps"
        activeClassName="selected"
        onClick={handleCloseMenu}
    >
        Mobile Apps
    </DropdownMenuItem>
    <DropdownMenuItem
        to="/website"
        activeClassName="selected"
        onClick={handleCloseMenu}
    >
        Website
    </DropdownMenuItem>
</DropdownMenu> */
