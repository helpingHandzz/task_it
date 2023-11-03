import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = "http://localhost:8080";

function PayButton({ currentTask }) {
  const handlePayment = () => {
    axios
      .post(`${BASE_URL}/api/stripe/create-checkout-session`, {
        currentTask,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <button onClick={() => handlePayment()}>Confirm & Pay</button>
    </>
  );
}

export default PayButton;
