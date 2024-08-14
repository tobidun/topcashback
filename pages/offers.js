import React, { useState } from "react";

const offerData = {
  id: 1,
  title: "10% Off on Electronics",
  description:
    "Use the coupon code to get 10% off on all electronic items. Hurry, offer valid until the end of this year!",
  validUntil: "2024-12-31",
};

const Offer = () => {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [hover, setHover] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (couponCode.trim() === "DISCOUNT10") {
      setMessage("🎉 Coupon applied successfully! You got 10% off.");
    } else {
      setMessage("⚠️ Invalid coupon code. Please try again.");
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div
        style={{
          ...styles.container,
          ...(hover ? styles.containerHover : {}),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h1 style={styles.title}>{offerData.title}</h1>
        <p style={styles.description}>{offerData.description}</p>
        <p style={styles.validity}>
          Valid Until: <strong>{offerData.validUntil}</strong>
        </p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              ...styles.input,
              ...(inputFocus ? styles.inputFocus : {}),
            }}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
          >
            Apply Coupon
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <div style={styles.animatedBackground}></div>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5a623, #ff6347)",
    padding: "20px",
    overflow: "hidden",
    position: "relative",
  },
  container: {
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    transform: "scale(1)",
    transition: "transform 0.3s ease-in-out",
    position: "relative",
    zIndex: 2,
  },
  containerHover: {
    transform: "scale(1.05) rotate(-1deg)",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "glow 1.5s ease-in-out infinite alternate",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#555",
  },
  validity: {
    fontSize: "1rem",
    marginBottom: "30px",
    color: "#777",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 3, // Ensures form elements are on top
  },
  input: {
    padding: "12px 15px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid #ff6347",
    marginBottom: "15px",
    width: "100%",
    maxWidth: "300px",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxShadow: "0 0 10px rgba(255, 99, 71, 0.5)",
    zIndex: 3, // Ensure the input remains clickable
  },
  inputFocus: {
    borderColor: "#f5a623",
    boxShadow: "0 0 20px rgba(245, 166, 35, 0.7)",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#ff416c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    boxShadow: "0 0 10px rgba(255, 65, 108, 0.5)",
    zIndex: 3, // Ensure the button remains clickable
  },
  buttonHover: {
    backgroundColor: "#ff4b2b",
    transform: "scale(1.1)",
    boxShadow: "0 0 20px rgba(255, 75, 43, 0.7)",
  },
  message: {
    marginTop: "20px",
    fontSize: "1.1rem",
    color: "#333",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    zIndex: 3, // Ensure the message remains visible
  },
  animatedBackground: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle at center, rgba(255, 99, 71, 0.2), transparent 50%)",
    animation: "rotateBackground 20s linear infinite",
    zIndex: 1,
  },
  "@keyframes rotateBackground": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
};

export default Offer;
