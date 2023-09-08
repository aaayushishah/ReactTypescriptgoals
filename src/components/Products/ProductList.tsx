import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, deleteProduct } from "../../actions/productsAction";
import { IProduct } from "../../helpers/productInterface";
import { ICart } from "../../helpers/cartInterface";
import { addToCart } from "./../../actions/cartAction";
import Storage from "../../services/storage";
import Header from "../Header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Typography } from "@mui/material";

const ProductList = (props: any) => {
  const user = Storage.getUser();
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  useEffect(() => {
    getProducts();
    return () => {};
  }, []);
  const getProducts = () => {
    props.getProducts().then((val: any) => {
      setProductList(
        val.map((e: IProduct) => {
          return { ...e, quantity: 0, isChecked: false };
        })
      );
    });
  };
  const deleteProduct = (id: number) => {
    props.deleteProduct(id).then((val: any) => {
      getProducts();
    });
  };

  const incrementQuantity = (item: IProduct, index: number) => {
    item.quantity++;
    productList[index] = item;
    setProductList([...productList]);
  };
  const decrementQuantity = (item: IProduct, index: number) => {
    if (item.quantity > 0) {
      item.quantity--;
      productList[index] = item;
      setProductList([...productList]);
    }
  };
  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;
    if (!isChecked) {
      productList[index].quantity = 0;
    } else {
      productList[index].quantity = 1;
    }
    productList[index].isChecked = isChecked;
    setProductList([...productList]);
  };
  const enableAddToCartBtn = () => {
    return productList.filter((val) => val.isChecked).length === 0
      ? true
      : false;
  };
  const addToCart = () => {
    const user = Storage.getUser();
    let cartItems: ICart[] = [];
    let totalCartVal = 0;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].isChecked) {
        const amount = productList[i].quantity * productList[i].price;
        cartItems.push({
          userId: user._id,
          productId: productList[i]._id + "",
          quantity: productList[i].quantity,
          price: productList[i].price,
          amount,
        });
        totalCartVal += amount;
      }
    }
    setTotalCartAmount(totalCartVal);
    props.addToCart(cartItems).then((val: any) => {
      props.history.push("/cart");
    });
  };
  return (
    <div>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ alignItems: "left", textDecoration: "underline" }}
          >
            Products
          </Typography>
          {user._id && !user.isAdmin && (
            <>
              <Button
                sx={{
                  alignItems: "right",
                  float: "right",
                }}
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                disabled={enableAddToCartBtn()}
                onClick={() => addToCart()}
              >
                Add to Cart
              </Button>
              <Typography variant="h6">Amount : {totalCartAmount}</Typography>
            </>
          )}
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
                    Description
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>
                    Price
                  </TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  {user.isAdmin && <TableCell align="center">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((row: IProduct, index: number) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {index + 1}
                      {!user.isAdmin && <Checkbox
                        name="productCheckbox"
                        checked={row.isChecked}
                        onChange={(event) => handleCheckboxClick(event, index)}
                      />}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => decrementQuantity(row, index)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Tooltip>
                      {row.quantity}
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => incrementQuantity(row, index)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {user.isAdmin && <TableCell align="center">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteProduct(row._id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};
export default connect(null, {
  getProducts,
  deleteProduct,
  addToCart,
})(Header(ProductList));
