import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getUserList, deleteUser } from "../actions/usersAction";
import Header from "./Header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useToast } from "../providers/ToastProvider";

interface IUser {
  id: number;
  name: string;
  email: string;
}
const UserComponent = (props: any) => {
  const { openToast } = useToast();

  const userList = useSelector((state: any) => state.users.data);
  useEffect(() => {
    props.getUserList();
    return () => {};
  }, []);

  const deleteUser = (id: number) => {
    props.deleteUser(id).then((val: any) => {
      openToast("User deleted", { type: "success" });
      props.getUserList();
    });
  };
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            alignItems: "left",
            textDecoration: "underline",
            marginBottom: 5,
          }}
        >
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Email
                </TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row: IUser, index: number) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => deleteUser(row.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
export default connect(null, {
  getUserList,
  deleteUser,
})(Header(UserComponent));
