import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const RedeemOffer = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const callbackUrlRef = useRef(null);
  const router = useRouter();

  // Function to fetch callbackUrl from your Next.js API
  const fetchCallbackUrl = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/verifyToken", {
        method: "GET", // Adjust this based on your request type
        headers: {
          "Content-Type": "application/json", // Adjust if needed
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data.callbackUrl; // Assuming your API returns an object with callbackUrl
    } catch (error) {
      console.log("Error fetching callback URL:", error);
      setResult("⚠️ Failed to fetch callback URL.");
      setLoading(false);
    }
  };

  // Verify the offer token
  const verifyToken = async (session, uniqueId, walletId) => {
    try {
      const callbackUrl = callbackUrlRef.current;
      console.log(callbackUrl);
      if (session && uniqueId && walletId && callbackUrl) {
        const requestBody = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletId, token: session }),
        };

        const response = await fetch(
          decodeURIComponent(callbackUrl),
          requestBody
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error Response Text:", errorText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();

        if (resultData.valid) {
          setResult("🎉 Offer redeemed successfully!");
          setTimeout(() => {
            router.push("/offers"); // Redirect to the offers page after a short delay
          }, 3000);
        } else {
          setResult("⚠️ Invalid or expired offer.");
        }
      } else {
        setResult("⚠️ Error: URL parameters missing.");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
      setResult("⚠️ Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { session, uniqueId, walletId } = router.query;

    if (session && uniqueId && walletId) {
      setTimeout(async () => {
        const url = await fetchCallbackUrl();
        console.log(url);
        callbackUrlRef.current = url; // Store the URL in the ref
        if (url) {
          await verifyToken(session, uniqueId, walletId);
        }
      }, 3000); // 3-second delay before verification starts
    }
  }, [router.query]);

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
        {loading ? "Verifying offer, please wait..." : result}
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
