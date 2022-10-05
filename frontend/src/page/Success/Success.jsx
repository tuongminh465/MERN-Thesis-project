import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../../requestMethods"

import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./Success.css"

const Success = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const data = location.state.stripeData;

  const cart = location.state.cart;

//   const currentUser = useSelector((state) => state.user.currentUser);

  const currentUser = {
    _id: "1234"
  }

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    > 
      <img src="/assets/img/successpage.png" alt="order success"/>
      <CheckCircleOutlineIcon style={{color: 'green', fontSize: 50}} />
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful! Your order is being prepared...`}
      <button class="scp-btn" style={{ padding: 10, marginTop: 20 }} onClick={() => navigate("/")}>
        <HomeIcon style={{marginRight: 15}}/>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;