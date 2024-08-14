import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RedeemOffer = () => {
  const [result, setResult] = useState("");
  const router = useRouter();

  // Verify the offer token
  const verifyToken = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("session");
      const uniqueId = urlParams.get("uniqueId");
      const walletId = urlParams.get("walletId");
      const callbackUrl = decodeURIComponent(urlParams.get("callbackUrl"));

      if (token && uniqueId && walletId) {
        const requestBody = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletId, token }),
        };

        const response = await fetch(callbackUrl, requestBody);

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error Response Text:", errorText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resultData = await response.json();

        if (resultData.valid) {
          setResult("🎉 Offer redeemed successfully!");
          router.push("/offers"); // Redirect to the offers page
        } else {
          setResult("⚠️ Invalid or expired offer.");
        }
      } else {
        setResult("⚠️ Error: URL parameters missing.");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
      setResult("⚠️ Invalid or expired token.");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const getResultColor = () => {
    if (result.includes("successfully")) return "#28a745"; // Green for success
    if (result.includes("Invalid") || result.includes("Error"))
      return "#dc3545"; // Red for error
    return "#333";
  };

  const getBackgroundGradient = () => {
    if (result.includes("successfully"))
      return "linear-gradient(135deg, #28a745, #85e085)";
    if (result.includes("Invalid") || result.includes("Error"))
      return "linear-gradient(135deg, #dc3545, #f08080)";
    return "linear-gradient(135deg, #f5f5f5, #ddd)";
  };

  return (
    <div style={{ ...styles.container, background: getBackgroundGradient() }}>
      <h1 style={styles.title}>Redeem Offer</h1>
      <div id="result" style={{ ...styles.result, color: getResultColor() }}>
        {result}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    transition: "background 0.5s ease",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(45deg, #007bff, #6610f2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "fadeIn 1s ease-in-out",
  },
  result: {
    fontSize: "1.5rem",
    padding: "15px 30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    textAlign: "center",
    transform: "scale(1.05)",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

export default RedeemOffer;
