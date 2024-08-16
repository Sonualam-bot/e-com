import toast from "react-hot-toast";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (amount, setShowModal) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("You are offline... Failed to load Razorpay SDK");
    return;
  }

  const exchangeRate = 83.95;
  const amountInINR = amount * exchangeRate;

  const roundedAmount = Math.round(amountInINR);

  const options = {
    key: "rzp_test_W4XQY3kmlZ1HXe",
    currency: "INR",
    amount: roundedAmount * 100,
    name: "Md Sonu Alam",
    description: "Thanks for purchasing",
    image: "logo",

    handler: function (response) {
      const paymentId = response.razorpay_payment_id;

      toast.success("Payment is successfull");
      setShowModal(true);
    },

    prefill: {
      name: "Profile.fyi",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
