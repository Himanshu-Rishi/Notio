import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let active_page = window.location.pathname;
  useEffect(() => {
    const nav_links = document.querySelectorAll(".navbar__link");
    nav_links.forEach((link) => {
      if (link.href.includes(active_page) && active_page !== "/") {
        link.classList.add("active");
      } else if (active_page === "/") {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
        console.log("no");
      }
    });
  }, [active_page]);
  return (
    <div className="navbar__container">
      <div className="title__section">
        <img src="/assets/logo.png" alt="Notio Logo" />
        <span className="site__title">Notio</span>
      </div>
      <div className="navbar__link_section">
        <Link to="/" className="navbar__link active nav-link-fade-up">
          HOME
        </Link>
        <Link to="/about" className="navbar__link nav-link-fade-up">
          ABOUT
        </Link>
        <Link to="/contact" className="navbar__link nav-link-fade-up">
          CONTACT
        </Link>

        {localStorage.getItem("token") ? (
          <div className="profile__section">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <img
                    src="/assets/main-menu.png"
                    alt="Account Setting"
                    className="profile__icon"
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="medium" />
                </ListItemIcon>{" "}
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button variant="contained">
              <Link to="/login" className="links">
                Login
              </Link>
            </Button>
            <Button variant="contained">
              <Link to="/signup" className="links">
                SignUp
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
