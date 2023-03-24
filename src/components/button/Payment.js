import { useCallback } from 'react'
import { registerEvent } from 'apis/firebase';
import useRazorpay from "react-razorpay";

function PaymentButton({ name, email, phn, amt, workshopName }) {
  const Razorpay = useRazorpay();
  const handlePayment = useCallback(async() => {
    const options = {
      key: "rzp_test_yXI8CcMOkrPhmV",
      amount: amt*100,
      currency: "INR",
      name: "InfoQuest",
      description: workshopName,
      image: "https://drive.google.com/file/d/17xEkBh9293ZN0EjwF6BjYDoUeoT-euVU/view?usp=drivesdk ",
      handler: (res) => {
        registerEvent(email, workshopName, res.razorpay_payment_id).then(() => alert("You've successfully registered for "+workshopName)).catch(err => alert(err))
      },
      prefill: {
        name: name,
        email: email,
        contact: phn,
      },
      notes: {
        address: "Computer Science and Engineering Association, Government College of Technology, Coimbatore",
      },
      theme: {
        color: "#063A50",
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div>
      <button onClick={handlePayment} className="mx-1 btn mt-3 mb-3 register-button rounded-pill bg-color-aquagreen">Pay and Register</button>
    </div>
  )
}

export default PaymentButton