import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ICartProductDetails,
  IPlaceOrderDetails,
} from "../../helpers/cartInterface";
import {
  getCartList,
  deleteItemFromCart,
  placeOrder,
} from "./../../actions/cartAction";
import Storage from "../../services/storage";
import Header from "../Header/Header";
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
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const CartList = (props: any) => {
  const [cartList, setCartList] = useState<ICartProductDetails[]>([]);
  const [totalCartValue, setTotalCartValue] = useState<Number>(0);
  useEffect(() => {
    getCartList();
    return () => {};
  }, []);
  const getCartList = () => {
    const user = Storage.getUser();
    props.getCartList(user._id).then((val: ICartProductDetails[]) => {
      setCartList(val);
      let total = 0;
      for (let i = 0; i < val.length; i++) {
        total += Number(val[i].amount);
      }
      setTotalCartValue(total);
    });
  };
  const deleteFromCart = (id: Number) => {
    props.deleteItemFromCart(id).then((val: any) => {
      getCartList();
    });
  };

  const placeOrder = () => {
    const payload: IPlaceOrderDetails = {
      userId: Storage.getUser()._id,
      billAmount: totalCartValue,
      orderItems: [],
    };
    cartList.forEach((val: ICartProductDetails) => {
      payload.orderItems.push(val._id);
    });
    props.placeOrder(payload).then(() => {
      props.history.push('/products');
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
          Your Cart
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <caption>
              <div>
                <div style={{ float: "left" }}>
                  Cart Value: {totalCartValue + ""}
                </div>
                <div style={{ float: "right" }}>
                  <Button
                    sx={{
                      alignItems: "right",
                      float: "right",
                    }}
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => placeOrder()}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </caption>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Product Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Quantity
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Amount
                </TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartList?.length > 0 &&
                cartList.map((row: ICartProductDetails, index: number) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.productName}</TableCell>
                    <TableCell align="center">{row.quantity + ""}</TableCell>
                    <TableCell align="center">{row.price + ""}</TableCell>
                    <TableCell align="center">{row.amount + ""}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteFromCart(row._id)}>
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
  getCartList,
  deleteItemFromCart,
  placeOrder,
})(Header(CartList));
