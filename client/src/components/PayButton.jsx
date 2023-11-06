import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = "http://localhost:8080";

function PayButton({ currentTask, filteredSkill }) {
  const handlePayment = () => {
    axios
      .post(`${BASE_URL}/api/stripe/create-checkout-session`, {
        currentTask,
        filteredSkill,
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
      <button
        onClick={() => handlePayment()}
        className="rounded-full bg-cyan-700 text-white font-bold hover:bg-cyan-900 p-3"
      >
        Confirm & Pay
      </button>
    </>
  );
}

export default PayButton;
