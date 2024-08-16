export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  const truncated = text.substr(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  return truncated.substr(0, lastSpaceIndex) + "...";
};

// to format price in Indian Rupees
export const formatPrice = (priceInUsd) => {
  const USD_TO_INR_RATE = 83.95;
  const priceInInr = priceInUsd * USD_TO_INR_RATE;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInInr);
};

export const discountCoupons = [
  { code: "SUMMER10%", type: "percentage", value: 10 },
  { code: "FLAT20", type: "fixed", value: 20 },
  { code: "SAVE15%", type: "percentage", value: 15 },
];
