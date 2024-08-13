import React, { useEffect, useState } from "react";

const RedeemOffer = () => {
  const [result, setResult] = useState("");

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
        setResult(
          resultData.valid
            ? "Offer redeemed successfully."
            : "Invalid or expired offer."
        );
      } else {
        setResult("Error: URL parameters missing.");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
      setResult("Invalid or expired token.");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const getResultColor = () => {
    if (result.includes("successfully")) return "green";
    if (result.includes("Invalid") || result.includes("Error")) return "red";
    return "#333";
  };

  return (
    <div style={styles.container}>
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
    backgroundColor: "#f5f5f5",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  result: {
    fontSize: "1.2rem",
    padding: "10px 20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default RedeemOffer;
