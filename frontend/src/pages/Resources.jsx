import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import assistantImg from "../assets/assistant.png";

const affirmations = [
  "You are doing your best, and that’s enough.",
  "Your feelings are valid.",
  "Today is a fresh start.",
  "Breathe in peace. Exhale doubt.",
  "You are worthy of love and healing.",
];

const selfCareTips = [
  "Take a 5-minute mindful walk.",
  "Hydrate and stretch gently.",
  "Write down 3 things you're grateful for.",
  "Take a deep breath and check in with your body.",
  "Disconnect from screens for 10 minutes.",
];

const mentalHealthArticles = [
  { title: "Understanding Anxiety", url: "https://www.adaa.org/understanding-anxiety" },
  { title: "Managing Depression", url: "https://www.nimh.nih.gov/health/topics/depression" },
  { title: "Mindfulness Basics", url: "https://www.mindful.org/what-is-mindfulness/" },
  { title: "Coping with Stress", url: "https://www.apa.org/topics/stress" },
  { title: "Building Resilience", url: "https://www.helpguide.org/articles/mental-health/building-resilience.htm" },
  { title: "Recognizing Burnout", url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642" },
  { title: "Meditation Techniques", url: "https://www.headspace.com/meditation/techniques" },
  { title: "Benefits of Therapy", url: "https://www.psychologytoday.com/us/basics/psychotherapy" },
  { title: "Social Support Importance", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1361287/" },
  { title: "Recognizing PTSD", url: "https://www.ptsd.va.gov/understand/what/ptsd_basics.asp" },
  { title: "Mind-Body Connection", url: "https://www.nccih.nih.gov/health/mind-and-body-practices" },
  { title: "Self-Compassion Practices", url: "https://self-compassion.org/" },
  { title: "Gratitude and Well-being", url: "https://greatergood.berkeley.edu/topic/gratitude/definition" },
  { title: "Seeking Help and Therapy", url: "https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Finding-Treatment" },
];

const moods = [
  { emoji: "😞", label: "Very Sad" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Happy" },
  { emoji: "😄", label: "Very Happy" },
];

const getFemaleVoice = () => {
  const voices = speechSynthesis.getVoices();
  return (
    voices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("google uk english female") ||
        v.name.toLowerCase().includes("zira") // fallback common female voice
    ) || voices[0] || null
  );
};

const Resources = () => {
  const [tip, setTip] = useState("");
  const [moodDate, setMoodDate] = useState(new Date());
  const [moodLog, setMoodLog] = useState(() => {
    const saved = localStorage.getItem("mood_log");
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    // Load mood for selected date if exists
    const dateKey = moodDate.toISOString().slice(0, 10);
    setSelectedMood(moodLog[dateKey] || null);

    // Load voices (some browsers require this to be called to populate voices list)
    speechSynthesis.getVoices();
  }, [moodDate, moodLog]);

  const onMoodSelect = (mood) => {
    setSelectedMood(mood);
    const dateKey = moodDate.toISOString().slice(0, 10);
    const updatedLog = { ...moodLog, [dateKey]: mood };
    setMoodLog(updatedLog);
    localStorage.setItem("mood_log", JSON.stringify(updatedLog));
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateKey = date.toISOString().slice(0, 10);
      const mood = moodLog[dateKey];
      if (mood) {
        return (
          <div style={{ fontSize: "1.5rem", textAlign: "center", marginTop: "0.2rem" }}>
            {mood.emoji}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #e1f5fe, #fce4ec)",
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container>
        <motion.h2
          className="text-center mb-5"
          style={{ color: "#6a1b9a", fontWeight: "700" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Mental Health Toolkit 🧘‍♀️
        </motion.h2>

        {/* Mental Health Articles and Voice Assistant side by side */}
        <Row className="mb-4" style={{ position: "relative" }}>
          <Col md={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                style={{
                  backgroundColor: "#ffffffc9",
                  borderRadius: "1rem",
                  padding: "1.2rem",
                  minHeight: "350px",
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#8e24aa", fontWeight: "600" }}>
                    📚 Mental Health Articles
                  </Card.Title>
                  <Card.Text
                    className="text-muted"
                    style={{ maxHeight: "280px", overflowY: "auto" }}
                  >
                    <ul style={{ paddingLeft: "1rem" }}>
                      {mentalHealthArticles.map((article, idx) => (
                        <li key={idx} style={{ marginBottom: "0.5rem" }}>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#6a1b9a" }}
                          >
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Voice Assistant on the right */}
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                style={{
                  backgroundColor: "#f9f5ff",
                  borderRadius: "1rem",
                  padding: "1rem",
                  textAlign: "center",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(186,104,200,0.3)",
                }}
              >
                <Card.Title style={{ color: "#6a1b9a", fontWeight: "600" }}>
                  🎙️ Your Calming Voice Assistant
                </Card.Title>
                <img
                  src={assistantImg}
                  alt="Voice Assistant"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    objectFit: "cover",
                    border: "2px solid #ba68c8",
                    boxShadow: "0px 0px 12px rgba(186, 104, 200, 0.5)",
                    alignSelf: "center",
                  }}
                />

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      const affirmation =
                        affirmations[Math.floor(Math.random() * affirmations.length)];
                      const synth = window.speechSynthesis;
                      const utter = new SpeechSynthesisUtterance(affirmation);
                      utter.voice = getFemaleVoice();
                      utter.pitch = 1.1;
                      utter.rate = 0.95;
                      synth.speak(utter);
                    }}
                  >
                    Start Affirmation
                  </Button>

                  <Button
                    variant="outline-success"
                    onClick={() => {
                      const synth = window.speechSynthesis;
                      const script = `Let's begin. Inhale deeply... 1, 2, 3, 4. Hold... 1, 2. Exhale slowly... 1, 2, 3, 4. Again... Inhale... Hold... Exhale... You're doing great.`;
                      const utter = new SpeechSynthesisUtterance(script);
                      utter.voice = getFemaleVoice();
                      utter.pitch = 1.05;
                      utter.rate = 0.9;
                      synth.speak(utter);
                    }}
                  >
                    Start Breathing Exercise
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => window.speechSynthesis.cancel()}
                  >
                    Stop
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Mood Tracker */}
        <Row className="mb-4">
          <Col>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                style={{
                  backgroundColor: "#f8f0fb",
                  borderRadius: "1rem",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <Card.Title style={{ color: "#6a1b9a", fontWeight: "600" }}>
                  📅 Mood Tracker
                </Card.Title>
                <Calendar
                  onChange={setMoodDate}
                  value={moodDate}
                  tileContent={tileContent}
                />
                <p className="mt-3">Select your mood for {moodDate.toDateString()}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    fontSize: "2rem",
                    marginTop: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  {moods.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => onMoodSelect(mood)}
                      style={{
                        cursor: "pointer",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "10px",
                        border:
                          selectedMood?.label === mood.label
                            ? "2px solid #6a1b9a"
                            : "2px solid transparent",
                        background:
                          selectedMood?.label === mood.label
                            ? "#d1c4e9"
                            : "transparent",
                        color: "#6a1b9a",
                        transition: "all 0.3s ease",
                      }}
                      aria-label={mood.label}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Daily Affirmations */}
        <motion.div
          className="my-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4
            className="text-center mb-4"
            style={{ color: "#6a1b9a", fontWeight: "600" }}
          >
            💖 Daily Affirmations
          </h4>
          <Row className="justify-content-center">
            {affirmations.map((text, idx) => (
              <Col md={4} key={idx} className="mb-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.2 }}
                >
                  <Card
                    style={{
                      backgroundColor: "#fce4ec",
                      borderRadius: "1rem",
                      minHeight: "150px",
                    }}
                  >
                    <Card.Body className="text-center">
                      <Card.Text className="fs-5" style={{ color: "#8e24aa" }}>
                        {text}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* AI Self-Care Generator */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 style={{ color: "#6a1b9a", fontWeight: "600" }}>🧘 Need a Self-Care Tip?</h4>
          <Button
            variant="secondary"
            className="mt-3 px-4 py-2"
            onClick={() => {
              const randomTip =
                selfCareTips[Math.floor(Math.random() * selfCareTips.length)];
              setTip(randomTip);
            }}
          >
            Show Me a Tip
          </Button>

          {tip && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card style={{ backgroundColor: "#fff3e0", borderRadius: "1rem" }}>
                <Card.Body>
                  <p className="fs-5 text-muted">{tip}</p>
                </Card.Body>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Resources;
