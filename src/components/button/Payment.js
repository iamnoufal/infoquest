import React,{useCallback} from 'react'
import useRazorpay from "react-razorpay";


function Payment() {
 const Razorpay=useRazorpay();

 const handlePayment = useCallback(async() => {
    
    const options={
      key:"",
      amount: 100*100,
      currency: "INR",
      name: "InfoQuest",
      description: "Test Transaction",
      image: "https://drive.google.com/file/d/17xEkBh9293ZN0EjwF6BjYDoUeoT-euVU/view?usp=drivesdk ",
      handler: (res) => {
        console.log(res.razorpay_payment_id);
      },
      prefill: {
        name: "Noufal Rahman",
        email: "jnrahman12@gmail.com",
        contact: "8610023136",
      },
      notes: {
        address: "Razorpay Corporate Office",
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
        <button onClick={handlePayment} className="btn register-button rounded-pill bg-color-aquagreen signin fs-4">Register & Pay</button>
    </div>
  )
}

export default Payment