import React, { useState } from "react";
import axios from "axios";

function App() {
  const [emailData, setEmailData] = useState({
    from: "",
    to: "",
    subject: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const generateEmail = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/email/generate/", emailData, {
        headers: { "Content-Type": "application/json" },
      });

      setGeneratedEmail(response.data.email);
    } catch (err) {
      setError("Failed to generate email. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📧 Phishing Email Generator</h1>

      <div style={styles.form}>
        <label style={styles.label}>From:</label>
        <input style={styles.input} type="email" name="from" value={emailData.from} onChange={handleChange} required />

        <label style={styles.label}>To:</label>
        <input style={styles.input} type="email" name="to" value={emailData.to} onChange={handleChange} required />

        <label style={styles.label}>Subject:</label>
        <input style={styles.input} type="text" name="subject" value={emailData.subject} onChange={handleChange} required />

        <button style={styles.button} onClick={generateEmail} disabled={loading}>
          {loading ? "Generating..." : "Generate Email"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {generatedEmail && (
        <div style={styles.result}>
          <h3 style={styles.resultTitle}>📜 Generated Email:</h3>
          <pre style={styles.emailContent}>{generatedEmail}</pre>
        </div>
      )}
    </div>
  );
}

// 🎨 Better Styling
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  result: {
    marginTop: "20px",
    padding: "15px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  resultTitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
  },
  emailContent: {
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default App;
