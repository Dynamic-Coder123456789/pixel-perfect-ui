import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis
} from "recharts";
import { Heart, Brain, Activity, Clock, Flame, Moon, ChevronDown, ChevronLeft, ChevronRight, Send, X, MessageCircle, Menu, Pill, BarChart3, Calendar } from "lucide-react";

// ── Types ──
interface OrganMetric {
  title: string;
  value: string;
  badge: string;
  data: number[];
}
interface OrganInfo {
  label: string;
  value: string;
  icon: React.ReactNode;
  metrics: OrganMetric[];
}
interface Appointment {
  name: string;
  specialty: string;
  time: string;
  status: "confirmed" | "pending";
  avatar: string;
}

// ── Data ──
const organData: Record<string, OrganInfo> = {
  heart: {
    label: "Heart Rate", value: "72 bpm",
    icon: <Heart className="w-5 h-5" />,
    metrics: [
      { title: "Blood Pressure", value: "120/80 mmHg", badge: "120/80", data: [115,118,120,122,120,119,121] },
      { title: "Blood Oxygen", value: "98%", badge: "98%", data: [96,97,98,97,98,99,98] },
      { title: "Body Temperature", value: "98.6°F", badge: "98.6°F", data: [98.2,98.4,98.6,98.5,98.6,98.7,98.6] },
    ],
  },
  brain: {
    label: "Brain Activity", value: "92%",
    icon: <Brain className="w-5 h-5" />,
    metrics: [
      { title: "Cognitive Score", value: "94/100", badge: "94", data: [88,90,92,93,94,93,92] },
      { title: "Memory Retention", value: "91%", badge: "91%", data: [85,87,89,90,91,90,89] },
      { title: "Focus Level", value: "93%", badge: "93%", data: [88,89,91,92,93,92,91] },
    ],
  },
  lungs: {
    label: "Oxygen Level", value: "99%",
    icon: <Activity className="w-5 h-5" />,
    metrics: [
      { title: "SpO₂ Level", value: "99%", badge: "99%", data: [97,98,99,98,99,99,98] },
      { title: "Breathing Rate", value: "14 breaths/min", badge: "14", data: [13,14,14,15,14,14,15] },
      { title: "Lung Capacity", value: "5.2 L", badge: "5.2L", data: [4.9,5.0,5.1,5.2,5.2,5.1,5.0] },
    ],
  },
  liver: {
    label: "Liver Function", value: "Optimal",
    icon: <Activity className="w-5 h-5" />,
    metrics: [
      { title: "ALT Level", value: "28 U/L", badge: "28", data: [25,26,27,28,27,28,29] },
      { title: "AST Level", value: "24 U/L", badge: "24", data: [22,23,24,23,24,25,24] },
      { title: "Bilirubin", value: "0.9 mg/dL", badge: "0.9", data: [0.8,0.8,0.9,0.9,0.9,0.9,0.8] },
    ],
  },
  kidneys: {
    label: "Kidney Function", value: "Excellent",
    icon: <Activity className="w-5 h-5" />,
    metrics: [
      { title: "Creatinine", value: "0.95 mg/dL", badge: "0.95", data: [0.9,0.92,0.94,0.95,0.94,0.95,0.96] },
      { title: "GFR", value: "98 mL/min", badge: "98", data: [95,96,97,98,97,98,99] },
      { title: "BUN", value: "14 mg/dL", badge: "14", data: [12,13,14,13,14,15,14] },
    ],
  },
};

const appointmentsData: Record<string, Appointment[]> = {
  Today: [
    { name: "Dr. Vijay Mallya", specialty: "Cardiologist", time: "11:00 AM", status: "confirmed", avatar: "VM" },
    { name: "Dr. Salman Khan", specialty: "Dermatologist", time: "3:30 PM", status: "pending", avatar: "SK" },
    { name: "Dr. Jeff Bezos", specialty: "Neurologist", time: "5:00 PM", status: "confirmed", avatar: "JB" },
  ],
  Tomorrow: [
    { name: "Dr. Aman Mehta", specialty: "Neurologist", time: "10:00 AM", status: "confirmed", avatar: "AM" },
    { name: "Dr. Michael Jordan", specialty: "Orthopedic", time: "2:30 PM", status: "pending", avatar: "MJ" },
  ],
  "Next Week": [
    { name: "Dr. Mukesh Ambani", specialty: "Pediatrician", time: "9:00 AM", status: "confirmed", avatar: "MA" },
    { name: "Dr. Bruce Lee", specialty: "Dentist", time: "1:00 PM", status: "confirmed", avatar: "BL" },
  ],
};

const medications = [
  { name: "Aspirin 100mg", time: "8:00 AM" },
  { name: "Lisinopril 10mg", time: "12:00 PM" },
  { name: "Metformin 500mg", time: "6:00 PM" },
];

// ── Chatbot ──
function generateBotResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("heart") || m.includes("cardiac")) return "Your heart rate is 72 BPM, within the normal range. Cardiovascular health score: 92/100.";
  if (m.includes("blood pressure") || m.includes("bp")) return "Blood pressure: 120/80 mmHg — optimal!";
  if (m.includes("brain") || m.includes("cognitive")) return "Cognitive score: 94/100, memory retention: 91%. Brain health is excellent.";
  if (m.includes("lung") || m.includes("oxygen")) return "SpO₂: 99%, breathing rate: 14/min. Respiratory function is excellent.";
  if (m.includes("sleep")) return "Last night: 7h 32min, quality score 87/100. Deep sleep: 1h 45min.";
  if (m.includes("steps") || m.includes("activity")) return "8,247 steps today — 82% of your goal! 145 active minutes.";
  if (m.includes("medication") || m.includes("medicine")) return "3 medications scheduled: Aspirin 8AM, Lisinopril 12PM, Metformin 6PM.";
  if (m.includes("appointment") || m.includes("doctor")) return "Next: Dr. Vijay Mallya (Cardiologist) at 11:00 AM today.";
  if (m.includes("hello") || m.includes("hi") || m.includes("hey")) return "Hello! I'm your AI health assistant. How can I help you today?";
  if (m.includes("help")) return "I can help with: heart rate, blood pressure, sleep, activity, appointments, medications, and more!";
  return "I can help you track vital signs, activity, sleep, nutrition, appointments, and medications. What would you like to know?";
}

// ── Live chart data generator ──
function generateChartData(range: [number, number], count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    x: i,
    y: Math.random() * (range[1] - range[0]) + range[0],
  }));
}

const statCards = [
  { label: "Average Heart Rate", value: "72 bpm", change: "+5%", positive: true, icon: <Heart className="w-5 h-5" /> },
  { label: "Active Minutes", value: "145 min", change: "+12%", positive: true, icon: <Clock className="w-5 h-5" /> },
  { label: "Calories Burned", value: "2,340", change: "+8%", positive: true, icon: <Flame className="w-5 h-5" /> },
  { label: "Sleep Quality", value: "87%", change: "-3%", positive: false, icon: <Moon className="w-5 h-5" /> },
];

// ── Component ──
const Dashboard = () => {
  const [selectedOrgan, setSelectedOrgan] = useState("heart");
  const [dateLabel, setDateLabel] = useState("Today");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [medPanelOpen, setMedPanelOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ text: string; from: "user" | "bot" }[]>([
    { text: "Hello! I'm your AI health assistant. Ask me about your health metrics.", from: "bot" },
  ]);
  const [takenMeds, setTakenMeds] = useState<boolean[]>(medications.map(() => false));
  const [darkMode, setDarkMode] = useState(true);

  // Live chart data
  const [heartData, setHeartData] = useState(() => generateChartData([60, 90]));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartData(prev => {
        const next = [...prev.slice(1)];
        next.push({ x: prev[prev.length - 1].x + 1, y: Math.random() * 30 + 60 });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cycleDates = () => {
    const dates = ["Today", "Tomorrow", "Next Week"];
    setDateLabel(dates[(dates.indexOf(dateLabel) + 1) % dates.length]);
  };

  const sendChat = useCallback(() => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { text: userMsg, from: "user" }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: generateBotResponse(userMsg), from: "bot" }]);
    }, 600);
  }, [chatInput]);

  const organ = organData[selectedOrgan];
  const appointments = appointmentsData[dateLabel] || [];

  const themeClass = darkMode ? "bg-[#0a0e1a] text-white" : "bg-[#f0f8ff] text-slate-800";
  const glassClass = darkMode
    ? "bg-white/[0.06] border-white/[0.12] backdrop-blur-xl"
    : "bg-white/80 border-black/[0.08] backdrop-blur-xl";
  const textMuted = darkMode ? "text-gray-400" : "text-slate-500";

  return (
    <div className={`min-h-screen ${themeClass} transition-colors duration-500`}>
      {/* ── Top Bar ── */}
      <header className={`fixed top-0 inset-x-0 h-[70px] z-50 flex items-center justify-between px-6 border-b ${glassClass}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`w-10 h-10 rounded-xl border flex items-center justify-center hover:scale-105 transition ${glassClass}`}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Coordina</h1>
              <p className={`text-[10px] ${textMuted}`}>Advanced Health Dashboard</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className={`text-xs ${textMuted} hover:text-cyan-400 transition`}>← Back to Home</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition hover:scale-105 ${glassClass}`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <aside className={`fixed left-0 top-[70px] w-[260px] h-[calc(100vh-70px)] z-40 border-r p-5 transition-transform duration-300 ${glassClass} ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <p className={`text-[11px] font-semibold uppercase tracking-wider mb-3 ${textMuted}`}>Navigation</p>
        {[
          { icon: <BarChart3 className="w-4 h-4 text-cyan-400" />, label: "Dashboard" },
          { icon: <Pill className="w-4 h-4 text-cyan-400" />, label: "Medications", onClick: () => { setMedPanelOpen(true); setSidebarOpen(false); } },
          { icon: <Calendar className="w-4 h-4 text-cyan-400" />, label: "Appointments" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 text-sm font-medium transition hover:translate-x-1 border ${glassClass}`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </aside>

      {/* ── Medication Panel ── */}
      {medPanelOpen && (
        <div className={`fixed left-0 top-0 w-[380px] h-full z-[60] border-r p-6 ${glassClass}`}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h3 className="text-lg font-semibold">Medications</h3>
            <button onClick={() => setMedPanelOpen(false)} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red-500 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
          {medications.map((med, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl mb-3 border transition hover:translate-x-1 ${glassClass}`}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{med.name}</p>
                <p className={`text-xs ${textMuted}`}>{med.time}</p>
              </div>
              <button
                onClick={() => setTakenMeds(prev => prev.map((v, j) => j === i ? !v : v))}
                className={`w-7 h-7 rounded-lg border-2 transition ${takenMeds[i] ? "bg-emerald-500 border-emerald-500" : "border-cyan-400"}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="pt-[90px] px-5 pb-10 max-w-[1400px] mx-auto">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className={`rounded-2xl p-5 border transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 ${glassClass}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  {stat.icon}
                </div>
                <p className={`text-xs ${textMuted}`}>{stat.label}</p>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`text-xs font-semibold ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                {stat.change} {stat.positive ? "better" : "lower"}
              </span>
            </div>
          ))}
        </section>

        {/* Heart Rate + Appointments */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Heart Rate Card */}
          <div className={`lg:col-span-2 rounded-2xl p-6 border ${glassClass}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-400/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold" id="organLabel">{organ.label}</h2>
                <p className="text-2xl font-bold text-cyan-400">{organ.value}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className={`text-xs ${textMuted}`}>Live Monitoring</span>
              </div>
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartData}>
                  <Line type="monotone" dataKey="y" stroke="#ef4444" strokeWidth={2.5} dot={false} />
                  <XAxis dataKey="x" hide />
                  <YAxis hide domain={[55, 95]} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Appointments */}
          <div className={`rounded-2xl p-6 border ${glassClass}`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold">Appointments</h3>
              </div>
              <button onClick={cycleDates} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border ${glassClass}`}>
                {dateLabel} <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {appointments.map((apt, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition hover:translate-x-1 ${glassClass}`}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {apt.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{apt.name}</p>
                    <p className={`text-[11px] ${textMuted}`}>{apt.specialty} · {apt.time}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-semibold ${apt.status === "confirmed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Body Condition */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">My Body Condition</h2>
            <div className="flex gap-2">
              <button className={`w-9 h-9 rounded-xl border flex items-center justify-center hover:scale-105 transition ${glassClass}`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className={`w-9 h-9 rounded-xl border flex items-center justify-center hover:scale-105 transition ${glassClass}`}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Organ carousel */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {Object.entries(organData).map(([key, o]) => (
              <button
                key={key}
                onClick={() => setSelectedOrgan(key)}
                className={`flex-shrink-0 w-[140px] h-[150px] rounded-2xl border flex flex-col items-center justify-center gap-3 transition hover:-translate-y-1 ${
                  selectedOrgan === key
                    ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/20"
                    : glassClass
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedOrgan === key ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-white" : "bg-white/10 text-cyan-400"}`}>
                  {o.icon}
                </div>
                <span className="text-sm font-medium capitalize">{key}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {organ.metrics.map((metric, i) => (
            <div key={i} className={`rounded-2xl p-5 border transition hover:-translate-y-1 hover:border-cyan-400/50 ${glassClass}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs ${textMuted}`}>{metric.title}</p>
                  <p className="text-lg font-bold">{metric.value}</p>
                </div>
              </div>
              <div className={`h-[80px] rounded-xl p-2 mt-3 border relative ${darkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-black/5"}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data.map((v, j) => ({ x: j, y: v }))}>
                    <Line type="monotone" dataKey="y" stroke="#00bfff" strokeWidth={2} dot={false} />
                    <XAxis hide />
                    <YAxis hide />
                  </LineChart>
                </ResponsiveContainer>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/40">
                  {metric.badge}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Insights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={`rounded-2xl p-6 border ${glassClass}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Activity</h3>
              <span className="text-xs px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">+15%</span>
            </div>
            <p className={`text-sm ${textMuted} leading-relaxed`}>
              Your activity levels have improved by 15% compared to last week. Keep up the great work with consistent exercise and movement throughout the day.
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" style={{ transform: "translateX(-100%)", animation: "shimmer 2s infinite" }} />
              </div>
            </div>
            <p className={`text-xs mt-2 ${textMuted}`}>82% of weekly goal</p>
          </div>
          <div className={`rounded-2xl p-6 border ${glassClass}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sleep Analysis</h3>
              <span className="text-xs px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">Needs Improvement</span>
            </div>
            <p className={`text-sm ${textMuted} leading-relaxed`}>
              Your sleep quality dipped slightly this week. Consider establishing a consistent bedtime routine and reducing screen time before bed.
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>
            <p className={`text-xs mt-2 ${textMuted}`}>65% optimal sleep</p>
          </div>
        </section>
      </main>

      {/* ── Chatbot Toggle ── */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-600 border-2 border-purple-500/30 flex items-center justify-center z-50 shadow-lg shadow-purple-600/40 hover:scale-110 transition"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* ── Chatbot ── */}
      {chatOpen && (
        <div className={`fixed bottom-24 right-6 w-[360px] h-[460px] rounded-3xl border flex flex-col overflow-hidden z-50 ${glassClass}`}>
          <div className="px-5 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-between">
            <span className="text-white font-semibold">Health Assistant</span>
            <button onClick={() => setChatOpen(false)} className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === "bot" ? `${darkMode ? "bg-cyan-500/15 border border-cyan-500/30" : "bg-cyan-50 border border-cyan-200"} self-start` : `${darkMode ? "bg-purple-500/15 border border-purple-500/30" : "bg-purple-50 border border-purple-200"} ml-auto`}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className={`p-4 border-t flex gap-3 ${darkMode ? "border-white/10" : "border-black/10"}`}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="Ask about your health..."
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none ${darkMode ? "bg-white/10 border-white/15 text-white placeholder:text-gray-500" : "bg-white border-black/10 text-slate-800 placeholder:text-slate-400"}`}
            />
            <button onClick={sendChat} className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center hover:scale-110 transition">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
