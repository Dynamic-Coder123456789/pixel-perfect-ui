import { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

const fadeUp = {

  hidden: { opacity: 0, y: 40 },

  visible: (i: number) => ({

    opacity: 1,

    y: 0,

    transition: { duration: 0.7, delay: i * 0.15 },

  }),

};

const AIMedicineSection = () => {

  const [showDemo, setShowDemo] = useState(false);

  return (

    <section id="ai-medicine" className="relative w-full">

      <div className="section-container relative min-h-screen flex flex-col items-center px-8 py-12 overflow-hidden">

        {/* Heading */}

        <motion.div

          className="text-center z-10 max-w-2xl mt-12"

          variants={fadeUp}

          initial="hidden"

          whileInView="visible"

          viewport={{ once: true, amount: 0.3 }}

          custom={0}

        >

          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-medium leading-tight text-card-foreground tracking-tight">

            Leading with <span className="pill-hero">AI</span> in Medicine:

            <br />Innovating Today For a Healthier Tomorrow

          </h2>

        </motion.div>

        {/* Tabs */}

        <motion.div

          className="flex items-center gap-3 mt-8 z-10 flex-wrap justify-center"

          variants={fadeUp}

          initial="hidden"

          whileInView="visible"

          viewport={{ once: true, amount: 0.3 }}

          custom={1}

        >

          <button className="btn-ghost-pill border-primary text-primary bg-primary/5">Symptom checker</button>

          <button className="btn-ghost-pill">Genomic data analytics</button>

          <button

            className="btn-ghost-pill"

            onClick={() => document.getElementById('remote-monitoring')?.scrollIntoView({ behavior: 'smooth' })}

          >

            Remote patient monitoring

          </button>

        </motion.div>

        {/* Right: Description */}

        <motion.div

          className="absolute right-8 bottom-[18%] z-10 max-w-[220px]"

          variants={fadeUp}

          initial="hidden"

          whileInView="visible"

          viewport={{ once: true, amount: 0.3 }}

          custom={2}

        >

          <p className="text-xs text-muted-foreground leading-relaxed">

            Our AI-powered symptom checker lets users input symptoms and get immediate, data-driven suggestions for potential conditions and next steps.

          </p>

          <button

            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-all"

            onClick={() => document.getElementById('remote-monitoring')?.scrollIntoView({ behavior: 'smooth' })}

          >

            Learn more <span>›</span>

          </button>

        </motion.div>

        {/* Try demo button */}

        <motion.div

          className="relative z-10 pb-4 mt-auto"

          variants={fadeUp}

          initial="hidden"

          whileInView="visible"

          viewport={{ once: true, amount: 0.3 }}

          custom={3}

        >

          <button className="btn-ghost-pill bg-secondary" onClick={() => setShowDemo(true)}>

            Try demo <span>›</span>

          </button>

        </motion.div>

        {/* Spline 3D background */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
          <Suspense fallback={<div className="w-full h-full bg-card" />}>
            <Spline
              scene="https://prod.spline.design/mM5NaLoi32-wIXDb/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        </div>
      </div>

      {/* Bottom info row */}

      <motion.div

        className="py-10 grid grid-cols-1 md:grid-cols-4 gap-6 px-8"

        variants={fadeUp}

        initial="hidden"

        whileInView="visible"

        viewport={{ once: true, amount: 0.3 }}

        custom={0}

      >

        <div>

          <h3 className="text-lg font-semibold text-foreground mb-1">Information on<br />remote monitoring</h3>

        </div>

        <div>

          <h4 className="font-semibold text-foreground text-sm mb-1">Continuous monitoring</h4>

          <p className="text-xs text-foreground/60">Real-time health data collection and analysis.</p>

        </div>

        <div>

          <h4 className="font-semibold text-foreground text-sm mb-1">Patient engagement</h4>

          <p className="text-xs text-foreground/60">Tools to keep patients engaged and informed about their health.</p>

        </div>

        <div>

          <h4 className="font-semibold text-foreground text-sm mb-1">Timely Interventions</h4>

          <p className="text-xs text-foreground/60">Immediate alerts to healthcare providers for potential health issues.</p>

        </div>

      </motion.div>

      {/* Demo Modal */}

      {showDemo && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowDemo(false)}>

          <motion.div

            className="bg-card rounded-2xl p-8 max-w-md mx-4 shadow-2xl"

            onClick={e => e.stopPropagation()}

            initial={{ opacity: 0, scale: 0.9 }}

            animate={{ opacity: 1, scale: 1 }}

            transition={{ duration: 0.3 }}

          >

            <h3 className="text-xl font-semibold text-card-foreground mb-3">Symptom Checker Demo</h3>

            <p className="text-sm text-muted-foreground mb-6">

              Enter your symptoms below to receive AI-powered diagnostic suggestions and recommended next steps.

            </p>

            <textarea

              className="w-full rounded-xl border border-border bg-secondary/50 p-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"

              rows={3}

              placeholder="Describe your symptoms..."

            />

            <div className="flex gap-3 mt-4">

              <button className="btn-primary flex-1">Analyze</button>

              <button className="btn-ghost-pill" onClick={() => setShowDemo(false)}>Close</button>

            </div>

          </motion.div>

        </div>

      )}

    </section>

  );

};

export default AIMedicineSection;
