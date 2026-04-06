import { useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Menu, Settings, Bell, User, ChevronRight, Eye } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const statCards = [
    { label: "Today's Money", value: "$53,000", change: "+68%", positive: true, icon: "💰" },
    { label: "Today's Users", value: "2,300", change: "+3%", positive: true, icon: "👥" },
    { label: "New Clients", value: "+3,052", change: "+5%", positive: true, icon: "✨" },
    { label: "Total Sales", value: "$173,000", change: "+3%", positive: true, icon: "📊" },
  ];

  const salesData = [
    { name: "Jan", value: 300 },
    { name: "Feb", value: 400 },
    { name: "Mar", value: 350 },
    { name: "Apr", value: 500 },
    { name: "May", value: 450 },
    { name: "Jun", value: 600 },
    { name: "Jul", value: 550 },
    { name: "Aug", value: 700 },
    { name: "Sep", value: 650 },
    { name: "Oct", value: 750 },
    { name: "Nov", value: 800 },
    { name: "Dec", value: 900 },
  ];

  const usersData = [
    { name: "Users", value: 32164 },
    { name: "Clicks", value: 2400 },
    { name: "Sales", value: 2400 },
    { name: "Items", value: 230 },
  ];

  const projects = [
    { name: "Design System", progress: 60 },
    { name: "Marketing App", progress: 45 },
    { name: "Mobile Redesign", progress: 75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-16 z-40 flex items-center justify-between px-6 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <span className="font-bold text-white">V</span>
            </div>
            <span className="text-sm font-bold">VISION UI</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">Pages / Dashboard</div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type here..."
            className="hidden md:block px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 w-48"
          />
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            <User className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-slate-800/50 border-r border-white/10 p-6 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} z-30`}>
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Dashboard</p>
            <div className="space-y-2">
              {["Dashboard", "Tables", "Billing", "RTL"].map((item) => (
                <button
                  key={item}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                    item === "Dashboard"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Account Pages</p>
            <div className="space-y-2">
              {["Profile", "Account", "Signup"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:ml-64 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back,</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6 hover:border-blue-500/30 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-2">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">from last week</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Spline 3D Section */}
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 overflow-hidden">
              <div className="relative h-80 bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
                <div className="absolute top-8 left-8 z-10">
                  <p className="text-gray-300 text-sm mb-1">Welcome back,</p>
                  <h2 className="text-2xl font-bold">Mark Johnson</h2>
                  <p className="text-gray-400 text-xs mt-1">Ask me anything.</p>
                </div>
                <Suspense fallback={<div className="w-full h-full bg-slate-700" />}>
                  <div className="absolute inset-0">
                    <Spline
                      scene="https://prod.spline.design/HGceMlEMZBHAHg98/scene.splinecode"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </Suspense>
              </div>
            </div>

            {/* Satisfaction Rate */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-4">Satisfaction Rate</p>
                <h3 className="text-sm text-gray-300">From last projects</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="3" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#grad)"
                      strokeWidth="3"
                      strokeDasharray="282"
                      strokeDashoffset="42"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-bold">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Overview */}
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6">
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Sales overview</p>
                <p className="text-gray-500 text-xs">Sales have increased by 2.5k in the last month</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Referral Tracking */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-6">Referral Tracking</p>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Invited</span>
                    <span className="text-lg font-bold">143 people</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" strokeWidth="2" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="251"
                        strokeDashoffset="63"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-bold">9.3</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-400">Bonus</span>
                  <p className="text-lg font-bold">1,465</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Users */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-6">Active Users</p>
              <p className="text-gray-500 text-xs mb-4">1,523 Last month</p>
              <div className="grid grid-cols-2 gap-4">
                {usersData.map((user, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-2 text-sm">
                      {user.value}
                    </div>
                    <p className="text-xs text-gray-400">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Projects</p>
                  <p className="text-gray-500 text-xs">30 done this month</p>
                </div>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-4">
                {projects.map((project, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{project.name}</span>
                      <span className="text-xs text-gray-400">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Overview */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-400 text-sm">Orders overview</p>
                <p className="text-gray-500 text-xs">150% this month</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
