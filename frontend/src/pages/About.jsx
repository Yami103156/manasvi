import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f3e5f5, #e1f5fe)",
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container>
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 style={{ color: "#6a1b9a", fontWeight: "700" }}>
            The Story of Manasvi 🌸
          </h2>
          <p className="lead text-muted" style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
            Manasvi is your mindful AI companion — a gentle guide designed to help you reflect, heal, and grow in your mental wellness journey.
          </p>
        </motion.div>

        {/* How It Works Section */}
        <Row className="mb-5 justify-content-center">
          <Col md={10}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h4 style={{ color: "#8e24aa", fontWeight: "600" }}>How It Works ✨</h4>
              <p className="text-muted fs-5" style={{ maxWidth: "720px", margin: "0 auto" }}>
                Manasvi creates a calm space for self-reflection and healing through soothing conversations, guided journaling, and uplifting affirmations. It offers calming exercises and interactive games crafted to nurture your mind and spirit.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Vision Cards Section */}
        <Row className="text-center justify-content-center">
          {[
            {
              title: "Mindful Technology",
              description: "Empathetic AI designed to support your emotional well-being with care and kindness.",
            },
            {
              title: "Healing Spaces",
              description: "Gentle visuals, journaling prompts, and reflective tools to encourage inner growth and peace.",
            },
            {
              title: "Empowerment & Growth",
              description: "Tools and exercises that inspire mindfulness, self-awareness, and personal transformation.",
            },
          ].map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className="shadow-sm"
                  style={{
                    backgroundColor: "#fce4ec",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    minHeight: "200px",
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{ color: "#8e24aa", fontWeight: "600", fontSize: "1.25rem" }}
                    >
                      {item.title}
                    </Card.Title>
                    <Card.Text className="text-muted">{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="mt-5 mx-auto text-center"
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 20px rgba(175, 145, 186, 0.2)",
              padding: "2rem",
              borderRadius: "1rem",
              maxWidth: "600px",
            }}
          >
            <h5 style={{ color: "#6a1b9a", fontWeight: "600" }}>
              “You are enough. You always have been.” 💖
            </h5>
            <p className="text-muted">— A gentle reminder from Manasvi</p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;
