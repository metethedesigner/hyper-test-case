import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotalAmount);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box textAlign="center" mb={5}>
        <Avatar sx={{ bgcolor: "green", width: 56, height: 56, margin: "auto" }}>
          <ShoppingBagIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" mt={2}>
          Siparişiniz Alındı!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={1}>
          Satın alma işleminiz başarıyla tamamlandı. Aşağıda sipariş detaylarını görebilirsiniz.
        </Typography>
      </Box>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sipariş Özeti
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {cartItems?.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 60, height: 60, objectFit: "contain", marginRight: 16 }}
                    />
                    <Box>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Adet: {item.qty}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1">{item.price * item.qty} ₺</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 3, mb: 2 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Toplam Tutar:</Typography>
            <Typography variant="h6">{cartTotal} ₺</Typography>
          </Box>
        </CardContent>
      </Card>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Alışverişe Devam Et
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;
