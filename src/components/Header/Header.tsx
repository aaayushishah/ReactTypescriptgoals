import { MouseEvent, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  MenuItem,
  Container,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import Storage from "../../services/storage";
const Header = (PageComponent: any) => {
  return function WithPage({ ...props }) {
    const user = Storage.getUser();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElProduct, setAnchorElProduct] = useState<null | HTMLElement>(
      null
    );
    const [anchorElChart, setAnchorElChart] = useState<null | HTMLElement>(
      null
    );
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleOpenChartMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorElChart(event.currentTarget);
    };
    const handleOpenProductMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorElProduct(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
    const handleCloseChartMenu = () => {
      setAnchorElChart(null);
    };
    const logout = () => {
      Storage.set("token", "");
      props.history.push("/");
      setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleCloseProductMenu = () => {
      setAnchorElProduct(null);
    };

    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {((user._id && user.isAdmin) || !user._id) && (
                  <Tooltip title="User settings">
                    <Button
                      key={"User"}
                      onClick={handleOpenUserMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {"User"}
                    </Button>
                  </Tooltip>
                )}

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!user._id && (
                    <MenuItem
                      key={"Add User"}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to="/register"
                    >
                      <Typography textAlign="center">{"Add User"}</Typography>
                    </MenuItem>
                  )}
                  {user._id && user.isAdmin && (
                    <MenuItem
                      key={"User List"}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to="/"
                    >
                      <Typography textAlign="center">{"User List"}</Typography>
                    </MenuItem>
                  )}
                </Menu>

                {user._id && (
                  <>
                    {user.isAdmin && (
                      <Tooltip title="Charts">
                        <Button
                          key={"Charts"}
                          onClick={handleOpenChartMenu}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          {"Charts"}
                        </Button>
                      </Tooltip>
                    )}
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar-product"
                      anchorEl={anchorElChart}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElChart)}
                      onClose={handleCloseChartMenu}
                    >
                      {user.isAdmin && (
                        <>
                          <MenuItem
                            key={"Mui Charts"}
                            onClick={handleCloseChartMenu}
                            component={Link}
                            to="/muicharts"
                          >
                            <Typography textAlign="center">
                              {"Mui Charts"}
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            key={"Mui Charts"}
                            onClick={handleCloseChartMenu}
                            component={Link}
                            to="/highcharts"
                          >
                            <Typography textAlign="center">
                              {"High Charts"}
                            </Typography>
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                    <Tooltip title="Product settings">
                      <Button
                        key={"Product"}
                        onClick={handleOpenProductMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {"Product"}
                      </Button>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar-product"
                      anchorEl={anchorElProduct}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElProduct)}
                      onClose={handleCloseProductMenu}
                    >
                      {user.isAdmin && (
                        <MenuItem
                          key={"Add Product"}
                          onClick={handleCloseProductMenu}
                          component={Link}
                          to="/add/products"
                        >
                          <Typography textAlign="center">
                            {"Add Product"}
                          </Typography>
                        </MenuItem>
                      )}
                      <MenuItem
                        key={"Product List"}
                        onClick={handleCloseProductMenu}
                        component={Link}
                        to="/products"
                      >
                        <Typography textAlign="center">
                          {"Product List"}
                        </Typography>
                      </MenuItem>
                    </Menu>

                    {!user.isAdmin && (
                      <Tooltip title="View Cart">
                        <Button
                          key={"Cart"}
                          onClick={() => props.history.push("/cart")}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          {"Cart"}
                        </Button>
                      </Tooltip>
                    )}
                  </>
                )}
              </Box>
              {user._id && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar-test"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    <MenuItem key={"Logout"} onClick={() => logout()}>
                      <Typography textAlign="center">{"Logout"}</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <PageComponent {...props} />
      </div>
    );
  };
};

export default Header;
