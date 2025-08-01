import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import assistantImg from "../assets/assistant.png";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef();

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are Manasvi, a warm, empathetic mental health counselor. Respond kindly and thoughtfully to: ${input}`;
      const result = await model.generateContent([prompt]);
      const reply = result?.response?.text() || "I'm here for you.";

      const assistantMessage = {
        role: "Manasvi",
        text: reply.replace(/\n/g, "<br>"),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "Manasvi", text: "⚠️ I’m having trouble responding right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 text-gray-900 flex flex-col items-center py-8 px-4">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <img
          src={assistantImg}
          alt="Manasvi"
          className="w-24 h-24 rounded-full border-4 border-pink-300 shadow-xl mx-auto mb-4 glow"
        />
        <h1 className="text-3xl font-extrabold text-pink-700">🌸 Manasvi</h1>
        <p className="text-pink-600 italic">Your empathetic mental wellness companion</p>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={chatRef}
        className="w-full max-w-3xl h-[60vh] overflow-y-auto rounded-3xl border border-pink-300 bg-white/90 backdrop-blur-md shadow-2xl p-6 space-y-5 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ x: msg.role === "You" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className={`px-6 py-4 rounded-2xl max-w-[80%] leading-relaxed text-base md:text-lg break-words ${
              msg.role === "You"
                ? "bg-blue-200 text-right text-blue-900 ml-auto shadow-inner"
                : "bg-pink-200 text-left text-pink-900 mr-auto shadow-md"
            }`}
            dangerouslySetInnerHTML={{ __html: `<strong>${msg.role}:</strong> ${msg.text}` }}
          />
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-sm text-pink-700 italic bg-pink-100 px-5 py-3 rounded-xl w-fit shadow-md"
          >
            Manasvi is typing...
          </motion.div>
        )}
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full d-flex justify-content-center mt-6 px-3 mb-8"
      >
        <div className="position-relative w-100" style={{ maxWidth: "768px" }}>
          <textarea
            placeholder="💬 How are you feeling today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={3}
            className="form-control rounded-pill px-5 py-3"
            style={{
              minHeight: "4rem",
              resize: "none",
              background: "linear-gradient(135deg, #dbeafe, #f3e8ff)",
              border: "2px solid #a78bfa",
              color: "#1f2937", // dark text
              fontWeight: "500",
              boxShadow: "0 0 10px rgba(167, 139, 250, 0.5)",
            }}
            disabled={loading}
            aria-label="Type your message here"
          />
          <motion.button
            onClick={sendMessage}
            disabled={loading}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="position-absolute top-50 end-0 translate-middle-y rounded-pill px-4 py-2"
            style={{
              marginRight: "0.75rem",
              background: loading
                ? "#a9a9a9"
                : "linear-gradient(135deg, #8b5cf6, #e9d5ff)",
              border: "none",
              color: loading ? "#555" : "#fff",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
            }}
            aria-label="Send message"
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
                style={{
                  borderColor: "#fff transparent transparent transparent",
                }}
              ></span>
            ) : (
              "Send"
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
