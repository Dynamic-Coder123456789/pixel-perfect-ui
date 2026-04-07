import { useState } from "react";
import { Link } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Menu, X, Search, Bell, LogOut,
  LayoutDashboard, Table, CreditCard, Globe,
  User, Settings, UserPlus,
  DollarSign, Users, Sparkles, TrendingUp,
} from "lucide-react";
import BorderGlowCard from "@/components/effects/BorderGlowCard";
import TiltCard from "@/components/effects/TiltCard";
import GlassIcon from "@/components/effects/GlassIcon";
import PixelCard from "@/components/effects/PixelCard";
import SpotlightCard from "@/components/effects/SpotlightCard";
import PrismaticBurst from "@/components/effects/PrismaticBurst";
import LineWaves from "@/components/effects/LineWaves";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const statCards = [
    { label: "Today's Money", value: "$53,000", change: "+68%", icon: <DollarSign className="w-5 h-5" />, glow: "210, 100%, 60%" },
    { label: "Today's Users", value: "2,300", change: "+3%", icon: <Users className="w-5 h-5" />, glow: "180, 100%, 50%" },
    { label: "New Clients", value: "+3,052", change: "+5%", icon: <Sparkles className="w-5 h-5" />, glow: "260, 80%, 65%" },
    { label: "Total Sales", value: "$173,000", change: "+3%", icon: <TrendingUp className="w-5 h-5" />, glow: "145, 80%, 50%" },
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
    { name: "Profile", icon: <User className="w-4 h-4" /> },
    { name: "Account", icon: <Settings className="w-4 h-4" /> },
    { name: "Signup", icon: <UserPlus className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* PrismaticBurst Background */}
      <div className="fixed inset-0 z-0">
        <PrismaticBurst
          intensity={1.5}
          speed={0.3}
          animationType="rotate3d"
          colors={["#1e3a5f", "#3b82f6", "#06b6d4", "#8b5cf6"]}
          distort={3}
          mixBlendMode="lighten"
        />
      </div>
      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-16 z-40 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden hover:text-blue-400 transition">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
              V
            </div>
            <span className="text-xs font-bold tracking-widest text-gray-300">VISION UI FREE</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 font-medium">Pages / Dashboard</div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Type here..." className="bg-transparent text-xs text-white placeholder:text-gray-500 outline-none w-32" />
          </div>
          <GlassIcon icon={<Bell className="w-4 h-4" />} size="sm" color="59, 130, 246" />
          <GlassIcon icon={<LogOut className="w-4 h-4" />} size="sm" color="239, 68, 68" />
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-slate-900/60 backdrop-blur-xl border-r border-white/5 p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-30`}
      >
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
                  <GlassIcon
                    icon={item.icon}
                    size="sm"
                    active={activeSection === item.name}
                    color="59, 130, 246"
                  />
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
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <GlassIcon icon={item.icon} size="sm" color="156, 163, 175" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <Link
            to="/"
            className="block text-xs text-gray-500 hover:text-blue-400 transition font-medium mt-8"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:ml-64 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          {/* Stats Cards — BorderGlow effect */}
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

          {/* Main Grid — TiltCard for Welcome, PixelCard for Satisfaction */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <TiltCard className="lg:col-span-2 rounded-2xl overflow-hidden" rotateAmplitude={5}>
              <div className="relative h-80 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <LineWaves
                    speed={0.3}
                    innerLineCount={32}
                    outerLineCount={36}
                    warpIntensity={1.0}
                    rotation={-45}
                    edgeFadeWidth={0.0}
                    colorCycleSpeed={1.0}
                    brightness={0.25}
                    color1="#3b82f6"
                    color2="#06b6d4"
                    color3="#8b5cf6"
                    enableMouseInteraction={true}
                    mouseInfluence={2.0}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-transparent to-transparent z-[5]" />
                <div className="absolute top-8 left-8 z-10">
                  <p className="text-gray-300 text-sm mb-1 font-light">Welcome back,</p>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Mark Johnson</h2>
                  <p className="text-gray-400 text-xs mt-2">Ask me anything.</p>
                  <button className="mt-4 px-4 py-2 text-xs bg-white/10 backdrop-blur border border-white/10 rounded-xl hover:bg-white/20 transition-all">
                    Tap to generate →
                  </button>
                </div>
              </div>
            </TiltCard>

            <PixelCard
              className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5"
              colors={["#3b82f6", "#06b6d4", "#8b5cf6"]}
              gap={5}
              speed={40}
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Satisfaction Rate</p>
                  <h3 className="text-xs text-gray-500">From last projects</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                      <circle
                        cx="60" cy="60" r="50" fill="none"
                        stroke="url(#satisfactionGrad)" strokeWidth="4"
                        strokeDasharray="314" strokeDashoffset="47" strokeLinecap="round"
                      />
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

          {/* Charts Section — SpotlightCard + BorderGlow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <SpotlightCard className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5">
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-200 text-sm font-semibold mb-1">Sales overview</p>
                  <p className="text-gray-500 text-xs">Sales have increased by 2.5k in the last month</p>
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
                <p className="text-gray-200 text-sm font-semibold mb-6">Referral Tracking</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Invited</span>
                      <span className="text-lg font-bold">143 people</span>
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

          {/* Bottom Row — PixelCard for active users, SpotlightCard for projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PixelCard
              className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5"
              colors={["#3b82f6", "#1d4ed8", "#2563eb"]}
              gap={8}
              speed={25}
            >
              <div className="p-6">
                <p className="text-gray-200 text-sm font-semibold mb-1">Active Users</p>
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
                    <p className="text-gray-200 text-sm font-semibold">Projects</p>
                    <p className="text-gray-500 text-xs">30 done this month</p>
                  </div>
                  <div className="text-gray-500 cursor-pointer hover:text-blue-400 transition">⋮</div>
                </div>
                <div className="space-y-5">
                  {[
                    { name: "Website redesign", progress: 80, status: "onTrack" },
                    { name: "Mobile app", progress: 60, status: "onTrack" },
                    { name: "Marketing campaign", progress: 40, status: "delayed" },
                  ].map((project, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{project.name}</span>
                        <span className="text-xs text-gray-400">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            project.status === "onTrack"
                              ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                              : "bg-gradient-to-r from-orange-400 to-red-400"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Orders Overview — TiltCard */}
          <TiltCard className="mt-8 rounded-2xl overflow-hidden" rotateAmplitude={3} scaleOnHover={1.01}>
            <SpotlightCard className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5" spotlightColor="6, 182, 212">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-200 text-sm font-semibold">Orders overview</p>
                    <p className="text-gray-500 text-xs">150% this month</p>
                  </div>
                  <div className="text-gray-500 cursor-pointer hover:text-blue-400 transition">⋮</div>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
