import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Menu, X, Search, Bell, LogOut,
  LayoutDashboard, Table, CreditCard, Globe,
  User, Settings, UserPlus,
  DollarSign, Users, Sparkles, TrendingUp,
  Check, Trash2, Eye, Edit, Download, Copy, Plus,
} from "lucide-react";
import BorderGlowCard from "@/components/effects/BorderGlowCard";
import TiltCard from "@/components/effects/TiltCard";
import GlassIcon from "@/components/effects/GlassIcon";
import PixelCard from "@/components/effects/PixelCard";
import SpotlightCard from "@/components/effects/SpotlightCard";
import PrismaticBurst from "@/components/effects/PrismaticBurst";
import LineWaves from "@/components/effects/LineWaves";

const notifications = [
  { id: 1, text: "New patient referral from Dr. Smith", time: "2 min ago", read: false },
  { id: 2, text: "Lab results ready for J. Adams", time: "15 min ago", read: false },
  { id: 3, text: "Appointment rescheduled: R. Chen moved to 3PM", time: "1 hr ago", read: false },
  { id: 4, text: "Patient S. Mitchell checked in", time: "2 hrs ago", read: true },
  { id: 5, text: "Prescription renewal request from M. Davis", time: "3 hrs ago", read: true },
];

type Patient = { id: string; name: string; age: number; condition: string; status: string; lastVisit: string };


const billingData = [
  { id: "INV-3001", patient: "Sarah Mitchell", service: "Post-Op Follow-up", amount: "$350", date: "Apr 7, 2026", status: "Paid" },
  { id: "INV-3002", patient: "James Adams", service: "Chemotherapy Session", amount: "$2,400", date: "Apr 8, 2026", status: "Pending" },
  { id: "INV-3003", patient: "Rachel Chen", service: "PT Session x3", amount: "$450", date: "Apr 6, 2026", status: "Paid" },
  { id: "INV-3004", patient: "Michael Davis", service: "X-Ray + Consultation", amount: "$280", date: "Apr 5, 2026", status: "Overdue" },
  { id: "INV-3005", patient: "Linda Park", service: "ECG + Monitoring", amount: "$520", date: "Apr 9, 2026", status: "Pending" },
];

const aiInsights = [
  "Based on current trends, patient volume is expected to increase 15% next month. Consider opening additional appointment slots on Tuesdays and Thursdays.",
  "3 patients are due for follow-up appointments this week. S. Mitchell (Post-Op Day 14), J. Adams (Chemo Cycle 3 Review), and L. Park (Cardiac Check).",
  "Patient satisfaction has improved 12% since last quarter. Key drivers: reduced wait times and improved communication scores.",
  "Alert: J. Adams' latest lab results show elevated WBC count. Recommend reviewing before next chemotherapy session.",
  "Revenue is up 8% this month. Highest-performing service category: Follow-up Consultations (+23%).",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [clinicalInput, setClinicalInput] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState<{ patientId: string; patientName: string; note: string; timestamp: string }[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "", status: "Stable" });
  const [treatmentMenu, setTreatmentMenu] = useState(false);
  const [ordersMenu, setOrdersMenu] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const treatmentMenuRef = useRef<HTMLDivElement>(null);
  const ordersMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (treatmentMenuRef.current && !treatmentMenuRef.current.contains(e.target as Node)) setTreatmentMenu(false);
      if (ordersMenuRef.current && !ordersMenuRef.current.contains(e.target as Node)) setOrdersMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addPatient = () => {
    if (!newPatient.name.trim() || !newPatient.age || !newPatient.condition.trim()) return;
    const id = `P-${1001 + patients.length}`;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setPatients(prev => [...prev, { id, name: newPatient.name, age: parseInt(newPatient.age), condition: newPatient.condition, status: newPatient.status, lastVisit: today }]);
    setNewPatient({ name: "", age: "", condition: "", status: "Stable" });
    setShowAddPatient(false);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length === 0) { setSearchResults([]); setShowSearch(false); return; }
    const results: string[] = [];
    patients.forEach(p => {
      if (p.name.toLowerCase().includes(q.toLowerCase()) || p.condition.toLowerCase().includes(q.toLowerCase()))
        results.push(`Patient: ${p.name} — ${p.condition}`);
    });
    billingData.forEach(b => {
      if (b.patient.toLowerCase().includes(q.toLowerCase()) || b.service.toLowerCase().includes(q.toLowerCase()))
        results.push(`Invoice ${b.id}: ${b.patient} — ${b.service}`);
    });
    clinicalNotes.forEach(n => {
      if (n.patientName.toLowerCase().includes(q.toLowerCase()) || n.note.toLowerCase().includes(q.toLowerCase()))
        results.push(`Note (${n.patientName}): ${n.note.slice(0, 60)}...`);
    });
    if (results.length === 0) results.push("No results found");
    setSearchResults(results);
    setShowSearch(true);
  };

  const markAllRead = () => setNotifList(notifList.map(n => ({ ...n, read: true })));
  const deleteNotif = (id: number) => setNotifList(notifList.filter(n => n.id !== id));
  const unreadCount = notifList.filter(n => !n.read).length;

  const generateInsight = async () => {
    if (!clinicalInput.trim()) return;
    setAiLoading(true);
    setAiInsight("");
    try {
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: clinicalInput }),
      });
      const data = await res.json();
      const note = data.output || data.response || data.result || JSON.stringify(data);
      setAiInsight(note);
      // Find best matching patient from input
      const matchedPatient = patients.find(p =>
        clinicalInput.toLowerCase().includes(p.name.toLowerCase().split(" ")[1].toLowerCase())
      );
      setClinicalNotes(prev => [
        {
          patientId: matchedPatient?.id || "General",
          patientName: matchedPatient?.name || "General Note",
          note,
          timestamp: new Date().toLocaleString(),
        },
        ...prev,
      ]);
      setClinicalInput("");
    } catch (err) {
      setAiInsight("Error: Could not connect to localhost:8000. Make sure your backend is running.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const statCards = [
    { label: "Patient Reviews", value: "4.8/5", change: "+12%", icon: <DollarSign className="w-5 h-5" />, glow: "210, 100%, 60%" },
    { label: "Today's Patients", value: "2,300", change: "+3%", icon: <Users className="w-5 h-5" />, glow: "180, 100%, 50%" },
    { label: "New Patients", value: "+3,052", change: "+5%", icon: <Sparkles className="w-5 h-5" />, glow: "260, 80%, 65%" },
    { label: "Upcoming Appointments", value: "48", change: "+8%", icon: <TrendingUp className="w-5 h-5" />, glow: "145, 80%, 50%" },
  ];

  const salesData = [
    { month: "Jan", sales: 200 }, { month: "Feb", sales: 300 },
    { month: "Mar", sales: 250 }, { month: "Apr", sales: 400 },
    { month: "May", sales: 350 }, { month: "Jun", sales: 500 },
    { month: "Jul", sales: 450 }, { month: "Aug", sales: 600 },
    { month: "Sep", sales: 550 }, { month: "Oct", sales: 700 },
    { month: "Nov", sales: 650 }, { month: "Dec", sales: 750 },
  ];

  const barData = [
    { name: "Jan", value: 50 }, { name: "Feb", value: 100 },
    { name: "Mar", value: 80 }, { name: "Apr", value: 120 },
    { name: "May", value: 90 }, { name: "Jun", value: 140 },
    { name: "Jul", value: 110 }, { name: "Aug", value: 160 },
  ];

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Tables", icon: <Table className="w-4 h-4" /> },
    { name: "Billing", icon: <CreditCard className="w-4 h-4" /> },
    { name: "RTL", icon: <Globe className="w-4 h-4" /> },
  ];

  const accountItems = [
    { name: "Profile", icon: <User className="w-4 h-4" />, action: () => setShowProfile(true) },
    { name: "Account", icon: <Settings className="w-4 h-4" />, action: () => setShowAccountSettings(true) },
    { name: "Signup", icon: <UserPlus className="w-4 h-4" />, action: () => navigate("/") },
  ];

  // ─── Section Renderers ───
  const renderTablesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Patient Records</h2>
        <button onClick={() => setShowAddPatient(true)} className="px-4 py-2 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Add Patient
        </button>
      </div>
      {patients.length === 0 ? (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 p-8 text-center">
          <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No patients yet.</p>
          <p className="text-xs text-gray-500 mt-1">Add your first patient using the button above or from the Dashboard.</p>
        </div>
      ) : (
      <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Age</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Condition</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Visit</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-gray-300 font-mono text-xs">{p.id}</td>
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-gray-400">{p.age}</td>
                  <td className="px-6 py-4 text-gray-300">{p.condition}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      p.status === "Critical" ? "bg-red-500/20 text-red-400" :
                      p.status === "Improving" ? "bg-green-500/20 text-green-400" :
                      p.status === "Monitoring" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{p.lastVisit}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => alert(`Viewing full record for ${p.name}\n\nID: ${p.id}\nAge: ${p.age}\nCondition: ${p.condition}\nStatus: ${p.status}\nLast Visit: ${p.lastVisit}`)} className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => alert(`Edit mode for ${p.name} — In a full app, this would open an edit form.`)} className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Clinical Notes Section */}
      <h2 className="text-xl font-bold mt-8">Clinical Notes</h2>
      {clinicalNotes.length === 0 ? (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 p-8 text-center">
          <Sparkles className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No clinical notes yet.</p>
          <p className="text-xs text-gray-500 mt-1">Go to Dashboard and use the clinical notes generator to create notes for your patients.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {clinicalNotes.map((note, i) => (
            <div key={i} className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-blue-400">{note.patientId}</span>
                  <span className="text-sm font-semibold">{note.patientName}</span>
                </div>
                <span className="text-[10px] text-gray-500">{note.timestamp}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{note.note}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { navigator.clipboard.writeText(note.note); alert("Note copied to clipboard."); }} className="px-3 py-1.5 text-[10px] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</button>
                <button onClick={() => setClinicalNotes(prev => prev.filter((_, idx) => idx !== i))} className="px-3 py-1.5 text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBillingSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Billing & Invoices</h2>
        <button onClick={() => alert("Export initiated — In a full app, this would download a CSV/PDF of all invoices.")} className="px-4 py-2 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition flex items-center gap-2">
          <Download className="w-3.5 h-3.5" /> Export Invoices
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <BorderGlowCard glowColor="145, 80%, 50%" className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
          <div className="p-5">
            <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-emerald-400">$4,000</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>
        </BorderGlowCard>
        <BorderGlowCard glowColor="210, 100%, 60%" className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
          <div className="p-5">
            <p className="text-xs text-gray-400 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">$2,920</p>
            <p className="text-xs text-gray-500 mt-1">2 invoices</p>
          </div>
        </BorderGlowCard>
        <BorderGlowCard glowColor="0, 80%, 60%" className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
          <div className="p-5">
            <p className="text-xs text-gray-400 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-red-400">$280</p>
            <p className="text-xs text-gray-500 mt-1">1 invoice</p>
          </div>
        </BorderGlowCard>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Invoice</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingData.map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-gray-300 font-mono text-xs">{b.id}</td>
                  <td className="px-6 py-4 font-medium">{b.patient}</td>
                  <td className="px-6 py-4 text-gray-300">{b.service}</td>
                  <td className="px-6 py-4 font-semibold">{b.amount}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{b.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      b.status === "Paid" ? "bg-green-500/20 text-green-400" :
                      b.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => alert(`Invoice ${b.id}\n\nPatient: ${b.patient}\nService: ${b.service}\nAmount: ${b.amount}\nDate: ${b.date}\nStatus: ${b.status}`)} className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => alert(`Copying invoice ${b.id} details to clipboard.`)} className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white" title="Copy"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRTLSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">RTL / Layout Settings</h2>
        <button
          onClick={() => setIsRTL(!isRTL)}
          className={`px-4 py-2 text-xs rounded-xl border transition flex items-center gap-2 ${
            isRTL ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-gray-400 border-white/10"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          {isRTL ? "RTL Enabled" : "Enable RTL"}
        </button>
      </div>
      <div className={`${isRTL ? "direction-rtl text-right" : ""}`} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 p-6">
            <h3 className="text-sm font-semibold mb-3">Preview Text (RTL)</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              {isRTL
                ? "هذا النص يظهر من اليمين إلى اليسار. يمكنك استخدام هذا الوضع لعرض المحتوى العربي والعبري بشكل صحيح."
                : "This text displays left-to-right. Toggle RTL mode to preview how the layout adapts for Arabic, Hebrew, and other RTL languages."}
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 p-6">
            <h3 className="text-sm font-semibold mb-3">{isRTL ? "إعدادات اللغة" : "Language Settings"}</h3>
            <div className="space-y-3">
              {["English", "العربية", "עברית"].map((lang) => (
                <button key={lang} className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 text-gray-300">
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardContent = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <BorderGlowCard key={i} glowColor={stat.glow} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <GlassIcon icon={stat.icon} active color={stat.glow.split(",").slice(0, 1).join(",")} />
              </div>
              <span className="text-xs text-emerald-400 font-semibold">{stat.change} than last month</span>
            </div>
          </BorderGlowCard>
        ))}
      </div>

      {/* Welcome + Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <TiltCard className="lg:col-span-2 rounded-2xl overflow-hidden" rotateAmplitude={5}>
          <div className="relative h-80 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-0">
              <LineWaves speed={0.3} innerLineCount={32} outerLineCount={36} warpIntensity={1.0} rotation={-45} edgeFadeWidth={0.0} colorCycleSpeed={1.0} brightness={0.25} color1="#3b82f6" color2="#06b6d4" color3="#8b5cf6" enableMouseInteraction={true} mouseInfluence={2.0} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-transparent to-transparent z-[5]" />
            <div className="absolute top-8 left-8 z-10 max-w-md">
              <p className="text-gray-300 text-sm mb-1 font-light">Welcome back,</p>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Dr. Mark Johnson</h2>
              <p className="text-gray-400 text-xs mt-2">Manage patients & generate clinical notes.</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setShowAddPatient(true)} className="px-4 py-2 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Add Patient
                </button>
                <span className="px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-gray-400">{patients.length} patients</span>
              </div>
              <textarea
                value={clinicalInput}
                onChange={e => setClinicalInput(e.target.value)}
                placeholder="e.g. Mitchell presented with elevated heart rate, mild chest pain..."
                className="mt-3 w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition resize-none text-white placeholder:text-gray-500"
                rows={3}
              />
              <button onClick={generateInsight} disabled={aiLoading || !clinicalInput.trim()} className="mt-2 px-4 py-2 text-xs bg-white/10 backdrop-blur border border-white/10 rounded-xl hover:bg-white/20 transition-all disabled:opacity-50">
                {aiLoading ? "Generating..." : "Generate Clinical Notes →"}
              </button>
              {aiInsight && (
                <div className="mt-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 leading-relaxed max-h-32 overflow-y-auto">
                  {aiInsight}
                </div>
              )}
            </div>
          </div>
        </TiltCard>

        <PixelCard className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5" colors={["#3b82f6", "#06b6d4", "#8b5cf6"]} gap={5} speed={40}>
          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-400 text-xs mb-1">Patient Satisfaction</p>
              <h3 className="text-xs text-gray-500">From recent consultations</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#satisfactionGrad)" strokeWidth="4" strokeDasharray="314" strokeDashoffset="47" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="satisfactionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">95%</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">0% on 23 reviews</p>
            </div>
          </div>
        </PixelCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SpotlightCard className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-200 text-sm font-semibold mb-1">Consultations Overview</p>
              <p className="text-gray-500 text-xs">Consultations have increased by 2.5k in the last month</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#374151" style={{ fontSize: "11px" }} />
                  <YAxis stroke="#374151" style={{ fontSize: "11px" }} />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SpotlightCard>

        <BorderGlowCard glowColor="145, 80%, 50%" className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
          <div className="p-6">
            <p className="text-gray-200 text-sm font-semibold mb-6">Patient Referrals</p>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Referred</span>
                  <span className="text-lg font-bold">143 patients</span>
                </div>
              </div>
              <div className="flex justify-center py-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="251" strokeDashoffset="63" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">9.3</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-500">Bonus</span>
                <p className="text-lg font-bold">1,465</p>
              </div>
            </div>
          </div>
        </BorderGlowCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PixelCard className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5" colors={["#3b82f6", "#1d4ed8", "#2563eb"]} gap={8} speed={25}>
          <div className="p-6">
            <p className="text-gray-200 text-sm font-semibold mb-1">Active Patients</p>
            <p className="text-gray-500 text-xs mb-4">1,523 from last month</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#374151" style={{ fontSize: "10px" }} />
                  <YAxis stroke="#374151" style={{ fontSize: "10px" }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </PixelCard>

        <SpotlightCard className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-200 text-sm font-semibold">Treatments</p>
                <p className="text-gray-500 text-xs">30 completed this month</p>
              </div>
              <div className="relative" ref={treatmentMenuRef}>
                <button onClick={() => setTreatmentMenu(!treatmentMenu)} className="text-gray-500 cursor-pointer hover:text-blue-400 transition p-1">⋮</button>
                {treatmentMenu && (
                  <div className="absolute right-0 top-8 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <button onClick={() => { alert("Exporting treatment data as CSV..."); setTreatmentMenu(false); }} className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 transition flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Export as CSV</button>
                    <button onClick={() => { setActiveSection("Tables"); setTreatmentMenu(false); }} className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 transition flex items-center gap-2"><Eye className="w-3.5 h-3.5" /> View All Patients</button>
                    <button onClick={() => { alert("Refreshing treatment data..."); setTreatmentMenu(false); }} className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 transition flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Refresh Data</button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-5">
              {[
                { name: "Post-Op Recovery — S. Mitchell", progress: 80, status: "onTrack" },
                { name: "Chemotherapy Cycle 3 — J. Adams", progress: 60, status: "onTrack" },
                { name: "Physical Therapy — R. Chen", progress: 40, status: "delayed" },
              ].map((project, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-xs text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${project.status === "onTrack" ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-gradient-to-r from-orange-400 to-red-400"}`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Orders Overview */}
      <TiltCard className="mt-8 rounded-2xl overflow-hidden" rotateAmplitude={3} scaleOnHover={1.01}>
        <SpotlightCard className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5" spotlightColor="6, 182, 212">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-200 text-sm font-semibold">Orders overview</p>
                <p className="text-gray-500 text-xs">150% this month</p>
              </div>
              <div className="relative" ref={ordersMenuRef}>
                <button onClick={() => setOrdersMenu(!ordersMenu)} className="text-gray-500 cursor-pointer hover:text-blue-400 transition p-1">⋮</button>
                {ordersMenu && (
                  <div className="absolute right-0 top-8 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <button onClick={() => { alert("Exporting orders data..."); setOrdersMenu(false); }} className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 transition flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Export Data</button>
                    <button onClick={() => { setActiveSection("Billing"); setOrdersMenu(false); }} className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 transition flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Go to Billing</button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#374151" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#374151" style={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SpotlightCard>
      </TiltCard>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* PrismaticBurst Background */}
      <div className="fixed inset-0 z-0">
        <PrismaticBurst intensity={1.5} speed={0.3} animationType="rotate3d" colors={["#1e3a5f", "#3b82f6", "#06b6d4", "#8b5cf6"]} distort={3} mixBlendMode="lighten" />
      </div>


      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddPatient(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-emerald-400" /> Add New Patient</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Full Name *</label>
                <input value={newPatient.name} onChange={e => setNewPatient(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Sarah Mitchell" className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Age *</label>
                <input type="number" value={newPatient.age} onChange={e => setNewPatient(p => ({ ...p, age: e.target.value }))} placeholder="e.g. 34" className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Condition *</label>
                <input value={newPatient.condition} onChange={e => setNewPatient(p => ({ ...p, condition: e.target.value }))} placeholder="e.g. Post-Op Recovery" className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Status</label>
                <select value={newPatient.status} onChange={e => setNewPatient(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition text-white">
                  <option value="Stable" className="bg-slate-900">Stable</option>
                  <option value="Critical" className="bg-slate-900">Critical</option>
                  <option value="Improving" className="bg-slate-900">Improving</option>
                  <option value="Monitoring" className="bg-slate-900">Monitoring</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={addPatient} disabled={!newPatient.name.trim() || !newPatient.age || !newPatient.condition.trim()} className="flex-1 py-2.5 text-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition disabled:opacity-50">Add Patient</button>
              <button onClick={() => setShowAddPatient(false)} className="flex-1 py-2.5 text-sm bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:bg-white/10 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowProfile(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-2xl font-bold">MJ</div>
              <div>
                <h3 className="text-lg font-bold">Dr. Mark Johnson</h3>
                <p className="text-sm text-gray-400">Cardiologist</p>
                <p className="text-xs text-gray-500">mark.johnson@hospital.com</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Specialization</span><span>Cardiology</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">License #</span><span>MD-2024-8834</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Years of Practice</span><span>12</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Department</span><span>Internal Medicine</span></div>
            </div>
            <button onClick={() => setShowProfile(false)} className="w-full py-2.5 text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition">Close</button>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {showAccountSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAccountSettings(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Display Name</label>
                <input defaultValue="Dr. Mark Johnson" className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email</label>
                <input defaultValue="mark.johnson@hospital.com" className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Notification Preferences</label>
                <div className="space-y-2 mt-2">
                  {["Email Notifications", "SMS Alerts", "Push Notifications"].map(pref => (
                    <label key={pref} className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5" />
                      {pref}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { alert("Settings saved!"); setShowAccountSettings(false); }} className="flex-1 py-2.5 text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition">Save</button>
              <button onClick={() => setShowAccountSettings(false)} className="flex-1 py-2.5 text-sm bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:bg-white/10 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-16 z-40 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden hover:text-blue-400 transition">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">V</div>
            <span className="text-xs font-bold tracking-widest text-gray-300">Synaptic.</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 font-medium">Pages / {activeSection}</div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block" ref={searchRef}>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search patients, invoices..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearch(true)}
                className="bg-transparent text-xs text-white placeholder:text-gray-500 outline-none w-44"
              />
              {searchQuery && <button onClick={() => { setSearchQuery(""); setSearchResults([]); setShowSearch(false); }} className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>}
            </div>
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-72 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {searchResults.map((r, i) => (
                  <button key={i} onClick={() => {
                    if (r.includes("Patient:") || r.includes("Note (")) setActiveSection("Tables");
                    else if (r.includes("Invoice")) setActiveSection("Billing");
                    setShowSearch(false);
                    setSearchQuery("");
                  }} className="w-full px-4 py-3 text-xs text-left hover:bg-white/5 transition border-b border-white/5 last:border-0 text-gray-300">
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
              <GlassIcon icon={<Bell className="w-4 h-4" />} size="sm" color="59, 130, 246" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="text-xs font-semibold">Notifications</span>
                  <button onClick={markAllRead} className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"><Check className="w-3 h-3" /> Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifList.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-white/5 flex items-start gap-3 ${n.read ? "opacity-50" : ""}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-gray-600" : "bg-blue-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-200">{n.text}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{n.time}</p>
                      </div>
                      <button onClick={() => deleteNotif(n.id)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <button onClick={handleLogout} title="Logout — Return to Home">
            <GlassIcon icon={<LogOut className="w-4 h-4" />} size="sm" color="239, 68, 68" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-slate-900/60 backdrop-blur-xl border-r border-white/5 p-6 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} z-30`}>
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Dashboard</p>
            <div className="space-y-1.5">
              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white font-semibold border border-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <GlassIcon icon={item.icon} size="sm" active={activeSection === item.name} color="59, 130, 246" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Account Pages</p>
            <div className="space-y-1.5">
              {accountItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <GlassIcon icon={item.icon} size="sm" color="156, 163, 175" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <Link to="/" className="block text-xs text-gray-500 hover:text-blue-400 transition font-medium mt-8">← Back to Home</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:ml-64 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{activeSection}</h1>
          </div>

          {activeSection === "Dashboard" && renderDashboardContent()}
          {activeSection === "Tables" && renderTablesSection()}
          {activeSection === "Billing" && renderBillingSection()}
          {activeSection === "RTL" && renderRTLSection()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
