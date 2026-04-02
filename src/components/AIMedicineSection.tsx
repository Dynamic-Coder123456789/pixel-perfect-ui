import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Spline from "@splinetool/react-spline/next";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15 },
  }),
};

const AIMedicineSection = (): JSX.Element => {
  const [showDemo, setShowDemo] = useState<boolean>(false);

  return (
    <section>
      {/* Heading */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <h1>
          Leading with AI in Medicine:
          <br />
          Innovating Today For a Healthier Tomorrow
        </h1>
      </motion.div>

      {/* Spline 3D — scaled */}
      <div style={{ width: "100%", height: "500px", transform: "scale(1)", transformOrigin: "center center", overflow: "hidden" }}>
        <Spline scene="https://prod.spline.design/mM5NaLoi32-wIXDb/scene.splinecode" />
      </div>

      {/* Tabs */}
      <div>
        <button>Symptom checker</button>
        <button>Genomic data analytics</button>
        <button onClick={() => document.getElementById("remote-monitoring")?.scrollIntoView({ behavior: "smooth" })}>
          Remote patient monitoring
        </button>
      </div>

      {/* Right: Description */}
      <div>
        <p>
          Our AI-powered symptom checker lets users input symptoms and get
          immediate, data-driven suggestions for potential conditions and next
          steps.
        </p>
        <button onClick={() => document.getElementById("remote-monitoring")?.scrollIntoView({ behavior: "smooth" })}>
          Learn more ›
        </button>
      </div>

      {/* Try demo button */}
      <div>
        <button onClick={() => setShowDemo(true)}>Try demo ›</button>
      </div>

      {/* Bottom info row */}
      <div id="remote-monitoring">
        <p>Information on remote monitoring</p>
        <div>
          <h3>Continuous monitoring</h3>
          <p>Real-time health data collection and analysis.</p>
        </div>
        <div>
          <h3>Patient engagement</h3>
          <p>Tools to keep patients engaged and informed about their health.</p>
        </div>
        <div>
          <h3>Timely Interventions</h3>
          <p>Immediate alerts to healthcare providers for potential health issues.</p>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div onClick={() => setShowDemo(false)}>
          <motion.div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Symptom Checker Demo</h2>
            <p>
              Enter your symptoms below to receive AI-powered diagnostic
              suggestions and recommended next steps.
            </p>
            <textarea />
            <div className="flex gap-3 mt-4">
              <button className="btn-primary flex-1">Analyze</button>
              <button className="btn-ghost-pill" onClick={() => setShowDemo(false)}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default AIMedicineSection;
