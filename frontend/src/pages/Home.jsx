import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import bg1 from "../assets/slide1.png";
import bg2 from "../assets/slide2.png";
import bg3 from "../assets/slide3.png";
import aboutImg from "../assets/assistant.png";

const timelineData = [
  {
    img: bg1,
    quote:
      "“You don’t have to control your thoughts. You just have to stop letting them control you.”",
    author: "Dan Millman",
  },
  {
    img: bg2,
    quote: "“Healing takes time, and asking for help is a courageous step.”",
    author: "Mariska Hargitay",
  },
  {
    img: bg3,
    quote:
      "“Your present circumstances don’t determine where you can go; they merely determine where you start.”",
    author: "Nido Qubein",
  },
];

const featuresList = [
  {
    title: "AI-Powered Chat",
    description:
      "Engage with Manasvi, your empathetic AI companion, for emotional support and guidance.",
  },
  {
    title: "Voice Journaling",
    description:
      "Record and reflect on your thoughts with voice-based journaling and AI reflections.",
  },
  {
    title: "Mindful Breathing",
    description:
      "Calming breathing exercises designed to help you relax and center yourself.",
  },
  {
    title: "Daily Affirmations",
    description:
      "Receive personalized affirmations to boost your mood and self-confidence.",
  },
  {
    title: "Interactive Mental Health Games",
    description:
      "Engaging exercises and games that promote mindfulness and emotional wellness.",
  },
  {
    title: "Mood Tracking",
    description:
      "Visualize your mood trends with an easy-to-use mood tracker and calendar.",
  },
];

// --- Mindful Pattern Memory Game ---
const colors = ["#ab47bc", "#6a1b9a", "#e1bee7", "#ce93d8"];

const MindfulPatternGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("Press Start to begin");
  const [highlightIndex, setHighlightIndex] = useState(null);

  // Generate random next color
  const addColorToSequence = () => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => [...prev, nextColor]);
  };

  // Show sequence to user
  const playSequence = async () => {
    setMessage("Watch the pattern...");
    setPlaying(true);
    for (let i = 0; i < sequence.length; i++) {
      setHighlightIndex(i);
      await new Promise((r) => setTimeout(r, 800));
      setHighlightIndex(null);
      await new Promise((r) => setTimeout(r, 400));
    }
    setMessage("Your turn: Repeat the pattern");
    setUserInput([]);
    setPlaying(false);
  };

  // Start game
  const startGame = () => {
    setSequence([]);
    setUserInput([]);
    setMessage("Watch the pattern...");
    addColorToSequence();
  };

  // When sequence changes, play it
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  // Handle user click
  const handleUserClick = (color) => {
    if (playing) return; // ignore clicks during play sequence
    const nextIndex = userInput.length;
    if (color === sequence[nextIndex]) {
      const newUserInput = [...userInput, color];
      setUserInput(newUserInput);
      if (newUserInput.length === sequence.length) {
        setMessage("Good job! Adding next color...");
        setTimeout(() => addColorToSequence(), 1000);
      }
    } else {
      setMessage("Oops! Wrong color. Try again.");
      setUserInput([]);
      setTimeout(() => playSequence(), 1500);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fce4ec",
        borderRadius: "1rem",
        padding: "1rem",
        minHeight: "280px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ color: "#ad1457", marginBottom: "1rem" }}>
        Mindful Pattern Memory
      </h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "1rem",
        }}
      >
        {colors.map((color, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleUserClick(color)}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: color,
              cursor: playing ? "default" : "pointer",
              boxShadow:
                highlightIndex !== null && sequence[highlightIndex] === color
                  ? "0 0 15px 5px #ad1457"
                  : "none",
              border:
                userInput.includes(color) && !playing
                  ? "3px solid #6a1b9a"
                  : "none",
              userSelect: "none",
            }}
            whileTap={{ scale: playing ? 1 : 0.9 }}
            whileHover={{ scale: playing ? 1 : 1.1 }}
          />
        ))}
      </div>
      <p style={{ color: "#6a1b9a", minHeight: "2.2rem" }}>{message}</p>
      <Button
        variant="outline-primary"
        onClick={startGame}
        disabled={playing}
        style={{ borderRadius: "2rem", fontWeight: "500" }}
      >
        Start
      </Button>
    </div>
  );
};

// --- Affirmation Jumbled Words Game ---
const affirmations = [
  "you are worthy",
  "stay positive",
  "believe in yourself",
  "you are enough",
  "embrace the journey",
];

const shuffleArray = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const JumbledWordsGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumbledWords, setJumbledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [message, setMessage] = useState("Unscramble the affirmation");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // On current affirmation, create jumbled words
    const words = affirmations[currentIndex].split(" ");
    setJumbledWords(shuffleArray(words));
    setSelectedWords([]);
    setMessage("Unscramble the affirmation");
    setCompleted(false);
  }, [currentIndex]);

  const selectWord = (word, fromJumbled) => {
    if (completed) return;
    if (fromJumbled) {
      setSelectedWords((prev) => [...prev, word]);
      setJumbledWords((prev) => prev.filter((w) => w !== word));
    } else {
      setJumbledWords((prev) => [...prev, word]);
      setSelectedWords((prev) => prev.filter((w) => w !== word));
    }
  };

  const checkAnswer = () => {
    const answer = selectedWords.join(" ");
    if (answer === affirmations[currentIndex]) {
      setMessage("Correct! Well done 🎉");
      setCompleted(true);
    } else {
      setMessage("Try again! Keep going.");
      setCompleted(false);
    }
  };

  const nextAffirmation = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <div
      style={{
        backgroundColor: "#fce4ec",
        borderRadius: "1rem",
        padding: "1rem",
        minHeight: "280px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        userSelect: "none",
      }}
    >
      <h4 style={{ color: "#ad1457", marginBottom: "1rem" }}>
        Affirmation Jumble
      </h4>
      <p style={{ color: "#6a1b9a", minHeight: "2rem" }}>{message}</p>
      <div
        style={{
          minHeight: "50px",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
          padding: "0.25rem",
          border: "2px solid #6a1b9a",
          borderRadius: "8px",
          backgroundColor: "#fff9f9",
          cursor: completed ? "default" : "pointer",
        }}
        onClick={() => {
          if (!completed && selectedWords.length > 0) {
            // Remove last word from selectedWords back to jumbledWords on click container
            const lastWord = selectedWords[selectedWords.length - 1];
            selectWord(lastWord, false);
          }
        }}
        title={
          completed
            ? "Click 'Next' to continue"
            : "Click here to remove last selected word"
        }
      >
        {selectedWords.length > 0
          ? selectedWords.map((word, idx) => (
              <motion.span
                key={idx}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#ab47bc",
                  color: "white",
                  borderRadius: "20px",
                  fontWeight: "600",
                  userSelect: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!completed) selectWord(word, false);
                }}
                whileHover={{ scale: completed ? 1 : 1.1 }}
                whileTap={{ scale: completed ? 1 : 0.95 }}
              >
                {word}
              </motion.span>
            ))
          : "Select words below to form the affirmation"}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {jumbledWords.map((word, idx) => (
          <motion.span
            key={idx}
            style={{
              padding: "6px 12px",
              backgroundColor: "#6a1b9a",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "600",
              userSelect: "none",
            }}
            onClick={() => selectWord(word, true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <div className="mt-3">
        <Button
          onClick={checkAnswer}
          disabled={selectedWords.length === 0 || completed}
          variant="outline-primary"
          style={{ borderRadius: "2rem", fontWeight: "500", marginRight: "1rem" }}
        >
          Check
        </Button>
        <Button
          onClick={nextAffirmation}
          variant="primary"
          style={{ borderRadius: "2rem", fontWeight: "500" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f3e5f5",
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center pt-5"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 style={{ color: "#6a1b9a", fontWeight: "700" }}>
          Meet <span style={{ color: "#ab47bc" }}>Manasvi</span>
        </h1>
        <p
          className="fs-5 mt-3"
          style={{ color: "#4a148c", maxWidth: "600px", margin: "0 auto" }}
        >
          Your trusted companion for mental wellness, mindfulness, and
          self-reflection. Journey with Manasvi through calming conversations,
          guided journaling, and uplifting affirmations.
        </p>
        <div className="mt-4">
          <Button
            onClick={() => navigate("/chat")}
            variant="outline-primary"
            className="mx-3 px-4 py-2"
            style={{ borderRadius: "2rem", fontWeight: "500" }}
          >
            Chat
          </Button>
          <Button
            onClick={() => navigate("/journal")}
            variant="primary"
            className="mx-3 px-4 py-2"
            style={{
              borderRadius: "2rem",
              fontWeight: "500",
              backgroundColor: "#ab47bc",
              borderColor: "#ab47bc",
            }}
          >
            Start Journal
          </Button>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="container py-5"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Row className="align-items-center">
          <Col md={6}>
            <motion.img
              src={aboutImg}
              alt="About Manasvi"
              className="img-fluid rounded shadow-sm"
              whileHover={{ scale: 1.05 }}
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h2 style={{ color: "#6a1b9a" }}>About Our Platform</h2>
            <p
              style={{ fontSize: "1.1rem", color: "#4a148c", lineHeight: "1.6" }}
            >
              Manasvi is a digital sanctuary focused on nurturing your mental and
              emotional well-being. The platform offers AI-powered chat, voice
              journaling, mood tracking, calming exercises, and interactive games
              to guide you through moments of stress or overwhelm. It’s designed
              to be your gentle, non-judgmental companion on the path to healing
              and self-discovery.
            </p>
          </Col>
        </Row>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        className="container my-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-center mb-4" style={{ color: "#6a1b9a" }}>
          A Journey Through Reflection
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {timelineData.map(({ img, quote, author }, idx) => (
            <motion.div
              key={idx}
              className="shadow rounded"
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: "#fce4ec",
                borderRadius: "1rem",
                maxWidth: "280px",
                padding: "1rem",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                style={{
                  borderRadius: "1rem",
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                }}
              />
              <blockquote
                style={{
                  color: "#6a1b9a",
                  fontStyle: "italic",
                  marginTop: "1rem",
                  fontSize: "0.95rem",
                }}
              >
                "{quote}"
                <footer style={{ color: "#ad1457", marginTop: "0.5rem" }}>
                  — {author}
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Games Section */}
      <motion.div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: "#6a1b9a" }}>
          Engage & Heal: Mental Wellness Games
        </h2>

        <Row className="justify-content-center" style={{ gap: "1rem" }}>
          <Col xs={12} md={5}>
            <MindfulPatternGame />
          </Col>

          <Col xs={12} md={5}>
            <JumbledWordsGame />
          </Col>
        </Row>
      </motion.div>

      {/* Features List Section */}
      <motion.div
        className="container my-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-center mb-4" style={{ color: "#6a1b9a" }}>
          Platform Features
        </h2>

        <Row className="justify-content-center">
          {featuresList.map(({ title, description }, idx) => (
            <Col key={idx} xs={12} md={6} lg={4} className="mb-4">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(171, 71, 188, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 rounded shadow"
                style={{
                  backgroundColor: "#fff9f9",
                  minHeight: "150px",
                  color: "#4a148c",
                  fontWeight: "500",
                }}
              >
                <h5 style={{ color: "#6a1b9a", marginBottom: "0.75rem" }}>
                  {title}
                </h5>
                <p style={{ fontSize: "1rem" }}>{description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </motion.div>
  );
};

export default Home;
