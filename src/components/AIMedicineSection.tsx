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

    <section id="ai-medicine" className="relative w-full bg-background">

      <div className="relative min-h-screen flex items-center justify-center px-8 py-12 overflow-hidden">

        {/* Spline 3D Bot - Center */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Suspense fallback={<div className="w-full h-full bg-card" />}>
            <div style={{ width: "100%", height: "100%" }}>
              <Spline
                scene="https://prod.spline.design/mM5NaLoi32-wIXDb/scene.splinecode"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Suspense>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left: Heading and Tabs */}
            <motion.div

              className="lg:col-span-1 flex flex-col items-start"

              variants={fadeUp}

              initial="hidden"

              whileInView="visible"

              viewport={{ once: true, amount: 0.3 }}

              custom={0}

            >

              <h2 className="text-2xl md:text-3xl font-medium leading-tight text-card-foreground tracking-tight mb-6">

                Leading with <span className="pill-hero">AI</span> in Medicine

              </h2>

              <div className="flex flex-col gap-2">

                <button className="btn-ghost-pill border-primary text-primary bg-primary/5 justify-start">Symptom checker</button>

                <button className="btn-ghost-pill justify-start">Genomic data analytics</button>

                <button

                  className="btn-ghost-pill justify-start"

                  onClick={() => document.getElementById('remote-monitoring')?.scrollIntoView({ behavior: 'smooth' })}

                >

                  Remote patient monitoring

                </button>

              </div>

            </motion.div>

            {/* Center: Spline (handled by absolute positioning) */}

            {/* Right: Description and CTA */}

            <motion.div

              className="lg:col-span-1 flex flex-col items-end"

              variants={fadeUp}

              initial="hidden"

              whileInView="visible"

              viewport={{ once: true, amount: 0.3 }}

              custom={1}

            >

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">

                Our AI-powered symptom checker lets users input symptoms and get immediate, data-driven suggestions for potential conditions and next steps.

              </p>

              <button

                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-all mb-6"

                onClick={() => document.getElementById('remote-monitoring')?.scrollIntoView({ behavior: 'smooth' })}

              >

                Learn more <span>›</span>

              </button>

              <button className="btn-ghost-pill bg-secondary" onClick={() => setShowDemo(true)}>

                Try demo <span>›</span>

              </button>

            </motion.div>
          </div>
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
