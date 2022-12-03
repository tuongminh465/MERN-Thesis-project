import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../../requestMethods"

import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./Success.css"
import { removeAllProduct } from "../../redux/cartSlice";

const Success = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch()

  const data = location.state.stripeData;

  const cart = location.state.cart;

  const currentUser = useSelector((state) => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const newOrder = {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            name: item.name,
          })),
          total: cart.total,
          address: data.billing_details.address,
        }
        
        const res = await userRequest.post("/orders", newOrder);
        setOrderId(res.data._id);
        console.log(res)
      } catch(error) {
        console.log(error);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser._id]);

  const handleReturn = async () => {
    await userRequest.delete(`/cart/${currentUser._id}`)
    dispatch(removeAllProduct());
    navigate("/")
  }

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
        ? `Order has been created successfully. Your order ID is: ${orderId}`
        : `Your order is being prepared...`}
      <button class="scp-btn" style={{ padding: 10, marginTop: 20 }} onClick={() => handleReturn()}>
        <HomeIcon style={{marginRight: 15}}/>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;