"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Replace with your local video path ───────────────────────────────────────
const VIDEO_SRC =
  "https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_30fps.mp4";
// ─────────────────────────────────────────────────────────────────────────────

/* ── Dot positions matched to reference image scatter ── */
const DOT_POSITIONS = [
  { x: 0,  y: 0  }, { x: 18, y: 1  }, { x: 34, y: 0  },
  { x: 6,  y: 11 }, { x: 22, y: 10 }, { x: 40, y: 11 }, { x: 56, y: 10 },
  { x: 10, y: 21 }, { x: 28, y: 22 }, { x: 44, y: 21 }, { x: 60, y: 22 }, { x: 74, y: 21 },
  { x: 14, y: 32 }, { x: 48, y: 31 }, { x: 66, y: 32 },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  /* ─── Three.js glass DNA helix ─────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    /* scene / camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    /* lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const mkPt = (hex: number, intensity: number, x: number, y: number, z: number) => {
      const l = new THREE.PointLight(hex, intensity, 24);
      l.position.set(x, y, z);
      scene.add(l);
      return l;
    };
    const l1 = mkPt(0x44ffcc, 7,  4,  3,  4);
    const l2 = mkPt(0xff3366, 5, -4, -2,  3);
    const l3 = mkPt(0xffd060, 3,  0,  6, -2);
    const l4 = mkPt(0x8899ff, 2, -2, -4,  2);

    /* glass material */
    const glass = (color: number, opacity: number) =>
      new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity,
        roughness:       0.0,
        metalness:       0.05,
        transmission:    0.85,
        thickness:       1.0,
        ior:             1.52,
        reflectivity:    1,
        clearcoat:       1,
        clearcoatRoughness: 0,
        side: THREE.DoubleSide,
      });

    const mA   = glass(0xaaddff, 0.58);   // strand A – ice blue
    const mB   = glass(0xffbbdd, 0.58);   // strand B – blush pink
    const mRng = glass(0xddeeff, 0.20);   // rungs
    const mJnt = glass(0xffffff, 0.75);   // rung-end joints

    /* helix params */
    const STEPS  = 64;
    const HEIGHT = 7.5;
    const RADIUS = 1.0;
    const TURNS  = 3.2;

    const dna  = new THREE.Group();
    const posA: THREE.Vector3[] = [];
    const posB: THREE.Vector3[] = [];

    /* ── bead positions ── */
    for (let i = 0; i < STEPS; i++) {
      const t     = i / (STEPS - 1);
      const angle = t * Math.PI * 2 * TURNS;
      const y     = (t - 0.5) * HEIGHT;

      const ax = Math.cos(angle) * RADIUS;
      const az = Math.sin(angle) * RADIUS;
      const bx = Math.cos(angle + Math.PI) * RADIUS;
      const bz = Math.sin(angle + Math.PI) * RADIUS;

      posA.push(new THREE.Vector3(ax, y, az));
      posB.push(new THREE.Vector3(bx, y, bz));

      const bGeo = new THREE.SphereGeometry(0.115, 22, 22);
      const sA = new THREE.Mesh(bGeo, mA); sA.position.set(ax, y, az); dna.add(sA);
      const sB = new THREE.Mesh(bGeo, mB); sB.position.set(bx, y, bz); dna.add(sB);
    }

    /* ── backbone cylinders between consecutive beads ── */
    const buildBackbone = (pts: THREE.Vector3[], mat: THREE.Material) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const mid  = a.clone().add(b).multiplyScalar(0.5);
        const dist = a.distanceTo(b);
        const cyl  = new THREE.Mesh(
          new THREE.CylinderGeometry(0.024, 0.024, dist, 12, 1),
          mat
        );
        cyl.position.copy(mid);
        cyl.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          b.clone().sub(a).normalize()
        );
        dna.add(cyl);
      }
    };
    buildBackbone(posA, mA);
    buildBackbone(posB, mB);

    /* ── rungs every 4 steps ── */
    for (let i = 0; i < STEPS; i += 4) {
      const a = posA[i], b = posB[i];
      const mid  = a.clone().add(b).multiplyScalar(0.5);
      const dist = a.distanceTo(b);
      const dir  = b.clone().sub(a).normalize();

      /* rung bar */
      const rung = new THREE.Mesh(
        new THREE.CylinderGeometry(0.030, 0.030, dist, 12, 1),
        mRng
      );
      rung.position.copy(mid);
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      dna.add(rung);

      /* end joints */
      const jGeo = new THREE.SphereGeometry(0.056, 16, 16);
      [a, b].forEach(p => {
        const j = new THREE.Mesh(jGeo, mJnt);
        j.position.copy(p);
        dna.add(j);
      });
    }

    scene.add(dna);

    /* ── ambient particle field ── */
    const pN   = 220;
    const pPos = new Float32Array(pN * 3);
    for (let i = 0; i < pN; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 2] = (Math.random() - 0.5) *  6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0x88ffcc, size: 0.032, transparent: true, opacity: 0.45,
    })));

    /* ── resize ── */
    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── render loop ── */
    const clock = new THREE.Clock();
    const tick  = () => {
      rafRef.current = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      dna.rotation.y = t * 0.36;
      dna.rotation.x = Math.sin(t * 0.17) * 0.11;
      dna.position.y = Math.sin(t * 0.21) * 0.14;

      l1.position.set(Math.sin(t * 0.55) * 5, 3,  Math.cos(t * 0.55) * 3);
      l2.position.set(Math.cos(t * 0.42) * 5, -2, Math.sin(t * 0.42) * 3);
      l3.position.y = Math.sin(t * 0.28) * 4;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* ─────────────────── GLOBAL STYLES ─────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Space+Mono&display=swap');

        /*
          If you have the Ceraso font file, uncomment below and drop
          the .woff2 in /public/fonts/Ceraso.woff2
        */
        /*
        @font-face {
          font-family: 'Ceraso';
          src: url('/fonts/Ceraso.woff2') format('woff2');
          font-weight: 900;
          font-display: swap;
        }
        */

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow: hidden; }

        /* Scrolling sine wave */
        @keyframes waveScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ncc-wave { animation: waveScroll 2.0s linear infinite; }

        /* Compass ring slow spin */
        @keyframes compassSpin { to { transform: rotate(360deg); } }
        .ncc-compass { animation: compassSpin 16s linear infinite; }

        /* Scan line */
        @keyframes scanDown {
          0%   { top: -2px; opacity: 0; }
          4%   { opacity: 0.8; }
          94%  { opacity: 0.3; }
          100% { top: 100%;   opacity: 0; }
        }
        .ncc-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(155,255,46,0.15) 35%,
            rgba(155,255,46,0.15) 65%,
            transparent 100%);
          animation: scanDown 8s ease-in-out infinite;
          pointer-events: none; z-index: 22;
        }

        /* Title reveal */
        @keyframes slideReveal {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ncc-t1 { animation: slideReveal 1.0s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .ncc-t2 { animation: slideReveal 1.0s cubic-bezier(0.16,1,0.3,1) 0.32s both; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .ncc-sub { animation: fadeIn 1.4s ease 0.55s both; }
      `}</style>

      {/* ─────────────────── HERO WRAPPER ─────────────────── */}
      <section style={{
        position: "relative",
        width:  "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#07090a",
      }}>

        {/* ── Video ── */}
        <video
          src={VIDEO_SRC}
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 20%",
            opacity: 0.52,
            filter: "saturate(0.62) brightness(0.48)",
          }}
        />

        {/* ── Overlay stack ── */}
        {/* radial center vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 75% 65% at 58% 42%, transparent 22%, rgba(5,7,9,0.72) 100%)",
          zIndex: 3, pointerEvents: "none",
        }}/>
        {/* left gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(5,7,9,0.88) 0%, rgba(5,7,9,0.55) 32%, transparent 60%)",
          zIndex: 4, pointerEvents: "none",
        }}/>
        {/* bottom gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,7,9,0.95) 0%, rgba(5,7,9,0.55) 20%, transparent 48%)",
          zIndex: 4, pointerEvents: "none",
        }}/>
        {/* top gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(5,7,9,0.65) 0%, transparent 18%)",
          zIndex: 4, pointerEvents: "none",
        }}/>

        {/* ── Scan line ── */}
        <div className="ncc-scan" />

        {/* ── Three.js DNA canvas ── */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0, right: 0,
            width: "60%", height: "100%",
            zIndex: 10,
            pointerEvents: "none",
            mixBlendMode: "screen",
            opacity: 0.9,
          }}
        />

        {/* ════════════════ FRAME & HUD ════════════════ */}

        {/* Outer border rect */}
        <div style={{
          position: "absolute", inset: "10px",
          border: "1px solid rgba(255,255,255,0.065)",
          zIndex: 32, pointerEvents: "none",
        }}/>

        {/* Left vertical accent line */}
        <div style={{
          position: "absolute",
          left: "62px", top: 0, bottom: 0,
          width: "1px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.13) 15%, rgba(255,255,255,0.13) 85%, transparent 100%)",
          zIndex: 32, pointerEvents: "none",
        }}/>

        {/* Top-right × */}
        <div style={{
          position: "absolute", top: "11px", right: "15px",
          fontFamily: "monospace",
          fontSize: "14px", lineHeight: 1,
          color: "rgba(255,255,255,0.28)",
          zIndex: 36,
        }}>×</div>

        {/* Bottom-left × */}
        <div style={{
          position: "absolute", bottom: "11px", left: "15px",
          fontFamily: "monospace",
          fontSize: "14px", lineHeight: 1,
          color: "rgba(255,255,255,0.22)",
          zIndex: 36,
        }}>×</div>

        {/* Top horizontal rule */}
        <div style={{
          position: "absolute", top: "10px", left: "10px", right: "10px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)",
          zIndex: 32, pointerEvents: "none",
        }}/>

        {/* Bottom horizontal rule */}
        <div style={{
          position: "absolute", bottom: "10px", left: "10px", right: "10px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent)",
          zIndex: 32, pointerEvents: "none",
        }}/>

        {/* Right edge tick marks */}
        <div style={{
          position: "absolute", right: "15px", top: "50%",
          transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: "9px",
          zIndex: 32, pointerEvents: "none",
        }}>
          {[12, 7, 20, 7, 12, 7, 20, 7, 12].map((w, i) => (
            <span key={i} style={{
              display: "block", height: "1px",
              width: `${w}px`, marginLeft: "auto",
              background: (i === 2 || i === 6)
                ? "rgba(155,255,46,0.38)"
                : "rgba(255,255,255,0.13)",
            }}/>
          ))}
        </div>

        {/* ════════════════ TOP-LEFT HUD ════════════════ */}
        <header style={{
          position: "absolute", top: "22px", left: "72px",
          display: "flex", alignItems: "center", gap: "14px",
          zIndex: 40,
        }}>

          {/* Animated sine wave */}
          <div style={{
            width: "56px", height: "22px",
            overflow: "hidden",
            display: "flex", alignItems: "center",
          }}>
            <div className="ncc-wave" style={{ display: "flex", alignItems: "center", willChange: "transform" }}>
              {[0, 1].map(k => (
                <svg key={k} width="112" height="22" viewBox="0 0 112 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 11 C5 3,9 3,14 11 C19 19,23 19,28 11 C33 3,37 3,42 11 C47 19,51 19,56 11 C61 3,65 3,70 11 C75 19,79 19,84 11 C89 3,93 3,98 11 C103 19,107 19,112 11"
                    stroke="#9bff2e" strokeWidth="1.7" fill="none" strokeLinecap="round"
                  />
                </svg>
              ))}
            </div>
          </div>

          {/* ON badge */}
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#9bff2e",
            border: "1px solid #9bff2e",
            padding: "2px 7px 2px 8px",
            borderRadius: "2px",
          }}>ON</span>

          {/* Compass icon */}
          <div style={{ position: "relative", width: "28px", height: "28px" }}>
            {/* spinning outer ring */}
            <svg className="ncc-compass"
              viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <circle cx="14" cy="14" r="12.5" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8"/>
            </svg>
            {/* static 4-point star */}
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <path d="M14 2 L15.8 13 L14 26 L12.2 13 Z" fill="white" opacity="0.9"/>
              <path d="M2 14 L13 12.2 L26 14 L13 15.8 Z" fill="white" opacity="0.38"/>
              <circle cx="14" cy="14" r="1.6" fill="white"/>
            </svg>
          </div>
        </header>

        {/* ════════════════ DOT SCATTER ════════════════ */}
        <div style={{
          position: "absolute",
          left: "74px",
          top: "50%", transform: "translateY(-50%) translateY(-22px)",
          zIndex: 32, pointerEvents: "none",
        }}>
          <div style={{ position: "relative", width: "88px", height: "44px" }}>
            {DOT_POSITIONS.map((d, i) => (
              <span key={i} style={{
                position: "absolute",
                left: d.x, top: d.y,
                width: "3.5px", height: "3.5px",
                borderRadius: "50%",
                background: "rgba(215,202,178,0.52)",
                display: "block",
              }}/>
            ))}
          </div>
        </div>

        {/* ════════════════ MAIN COPY ════════════════ */}
        <div style={{
          position: "absolute",
          bottom: "42px", left: "64px",
          zIndex: 40,
        }}>
          {/* subtitle */}
          <p className="ncc-sub" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            lineHeight: 1.78,
            color: "rgba(255,255,255,0.46)",
            letterSpacing: "0.02em",
            marginBottom: "13px",
          }}>
            Explore the future of fashion<br/>
            where culture meets innovation.
          </p>

          {/* display title */}
          <div style={{
            lineHeight: 0.86,
            letterSpacing: "-0.015em",
          }}>
            <div className="ncc-t1" style={{
              fontFamily: "'Ceraso', 'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(66px, 9.6vw, 152px)",
              color: "#ddd0b4",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              display: "block",
            }}>
              Neocultural
            </div>
            <div className="ncc-t2" style={{
              fontFamily: "'Ceraso', 'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(66px, 9.6vw, 152px)",
              color: "#ddd0b4",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              display: "block",
            }}>
              Couture
            </div>
          </div>
        </div>

        {/* ════════════════ BOTTOM-RIGHT STAMP ════════════════ */}
        <div style={{
          position: "absolute",
          bottom: "20px", right: "20px",
          textAlign: "right",
          fontFamily: "'Space Mono', monospace",
          zIndex: 40,
        }}>
          <div style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.30)",
            lineHeight: 1.5,
          }}>INITIATING</div>
          <div style={{
            fontSize: "9px",
            letterSpacing: "0.10em",
            color: "rgba(255,255,255,0.17)",
            lineHeight: 1.5,
          }}>i2-9345NCC0188</div>
        </div>

      </section>
    </>
  );
}
