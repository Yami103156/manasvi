import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPenFancy, FaRegLightbulb, FaRobot } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleGeminiReply = async () => {
    if (!entry.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Read this personal diary entry and respond with gentle advice, thoughts, or an emotional reflection:\n"${entry}"`;

      const result = await model.generateContent([prompt]);
      const output = result.response.text();
      setResponse(output);
    } catch (error) {
      console.error("Gemini Error:", error);
      setResponse("Sorry, I couldn't reflect on this right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fbeffb, #e3f0ff)",
        padding: "2rem",
        paddingTop: "6rem",
        fontFamily: "'Segoe UI', cursive",
      }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#6a1b9a",
          marginBottom: "2rem",
        }}
      >
        🌸 Your Journal, Your Sanctuary
      </motion.h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {/* Prompts */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "#fce4ec",
            borderRadius: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            width: "320px",
          }}
        >
          <h4 style={{ color: "#ad1457", fontWeight: "bold" }}>
            <FaRegLightbulb style={{ marginRight: "8px" }} />
            Reflection Prompts
          </h4>
          <ul style={{ marginTop: "1rem", paddingLeft: "1rem", color: "#6a1b9a" }}>
            <li>✦ What made you smile today?</li>
            <li>✦ Is there something you need to let go of?</li>
            <li>✦ Describe a peaceful moment from your day.</li>
            <li>✦ What are you grateful for right now?</li>
          </ul>
        </motion.div>

        {/* Journal Box */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "#fff9f9",
            borderRadius: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            padding: "2rem",
            flex: "1",
            minWidth: "300px",
            maxWidth: "600px",
          }}
        >
          <h4 style={{ color: "#6a1b9a", fontWeight: "bold", marginBottom: "1rem" }}>
            <FaPenFancy style={{ marginRight: "8px" }} />
            Write your thoughts
          </h4>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Dear Diary, today I feel…"
            rows={10}
            style={{
              width: "100%",
              borderRadius: "10px",
              border: "2px solid #d1c4e9",
              padding: "1rem",
              resize: "none",
              fontSize: "1rem",
              fontFamily: "'Segoe UI', sans-serif",
              color: "#4a148c",
              background: "#fef5ff",
            }}
          />
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <button
              onClick={handleGeminiReply}
              disabled={loading}
              style={{
                background: "#8e24aa",
                color: "#fff",
                border: "none",
                padding: "0.6rem 1.4rem",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#6a1b9a")}
              onMouseLeave={(e) => (e.target.style.background = "#8e24aa")}
            >
              <FaRobot style={{ marginRight: "6px" }} />
              {loading ? "Reflecting..." : "Tell me what you think"}
            </button>
          </div>

          {response && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                marginTop: "1.5rem",
                background: "#f3e5f5",
                borderLeft: "4px solid #ab47bc",
                padding: "1rem",
                borderRadius: "10px",
                color: "#4a148c",
                fontStyle: "italic",
              }}
            >
              {response}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Journal;
