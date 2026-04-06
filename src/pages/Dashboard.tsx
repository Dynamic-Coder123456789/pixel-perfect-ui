import { useState, useEffect, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Menu, X, Search, Bell, LogOut } from "lucide-react";

const ThreeJellyfish = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    let scene: any, camera: any, renderer: any;

    const initThree = async () => {
      const THREE = await import("three");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 3;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setClearColor(0x0f172a, 0);
      containerRef.current!.appendChild(renderer.domElement);

      // Create gradient background
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, "#1e3a8a");
      gradient.addColorStop(0.5, "#1e40af");
      gradient.addColorStop(1, "#0c4a6e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      scene.background = new THREE.CanvasTexture(canvas);

      // Create jellyfish-like shape using IcosahedronGeometry
      const geometry = new THREE.IcosahedronGeometry(1, 5);
      const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        wireframe: true,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.3,
      });
      const jellyfish = new THREE.Mesh(geometry, material);
      scene.add(jellyfish);

      // Add lighting
      const light = new THREE.PointLight(0x06b6d4, 2);
      light.position.set(5, 5, 5);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.4);
      scene.add(ambientLight);

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        jellyfish.rotation.x += 0.003;
        jellyfish.rotation.y += 0.005;
        jellyfish.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        const width = containerRef.current?.clientWidth || 800;
        const height = containerRef.current?.clientHeight || 300;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
      };
    };

    initThree().catch(console.error);
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const statCards = [
    { label: "Today's Money", value: "$53,000", change: "+68%", icon: "📊" },
    { label: "Today's Users", value: "2,300", change: "+3%", icon: "👥" },
    { label: "New Clients", value: "+3,052", change: "+5%", icon: "✨" },
    { label: "Total Sales", value: "$173,000", change: "+3%", icon: "💰" },
  ];

  const salesData = [
    { month: "Jan", sales: 200 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 250 },
    { month: "Apr", sales: 400 },
    { month: "May", sales: 350 },
    { month: "Jun", sales: 500 },
    { month: "Jul", sales: 450 },
    { month: "Aug", sales: 600 },
    { month: "Sep", sales: 550 },
    { month: "Oct", sales: 700 },
    { month: "Nov", sales: 650 },
    { month: "Dec", sales: 750 },
  ];

  const barData = [
    { name: "Jan", value: 50 },
    { name: "Feb", value: 100 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 120 },
    { name: "May", value: 90 },
    { name: "Jun", value: 140 },
    { name: "Jul", value: 110 },
    { name: "Aug", value: 160 },
    { name: "Sep", value: 130 },
    { name: "Oct", value: 170 },
    { name: "Nov", value: 150 },
    { name: "Dec", value: 180 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-16 z-40 bg-slate-900/50 backdrop-blur border-b border-blue-500/20 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden hover:text-blue-400 transition">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <span className="text-xs font-bold tracking-widest">VISION UI FREE</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">Pages / Dashboard</div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-blue-500/20">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Type here..."
              className="bg-transparent text-xs text-white placeholder:text-gray-500 outline-none w-32"
            />
          </div>
          <Bell className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition" />
          <LogOut className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition" />
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-slate-900/80 border-r border-blue-500/20 p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-30`}
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Dashboard</p>
            <div className="space-y-1">
              {["Dashboard", "Tables", "Billing", "RTL"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                    activeSection === item
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Account Pages</p>
            <div className="space-y-1">
              {["Profile", "Account", "Signup"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-blue-400 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <Link
            to="/"
            className="block text-xs text-gray-400 hover:text-blue-400 transition font-medium"
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
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/30 p-6 hover:border-blue-400/50 transition overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-xs font-semibold mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                    <div className="text-2xl">{stat.icon}</div>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">{stat.change} than last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 3D Jellyfish + Welcome */}
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 overflow-hidden">
              <div className="relative h-80">
                <div className="absolute inset-0 z-0">
                  <ThreeJellyfish />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-transparent to-transparent z-5" />
                <div className="absolute top-8 left-8 z-10">
                  <p className="text-gray-300 text-sm mb-1">Welcome back,</p>
                  <h2 className="text-2xl font-bold">Mark Johnson</h2>
                  <p className="text-gray-400 text-xs mt-1">Ask me anything.</p>
                  <p className="text-gray-500 text-xs mt-3">Tap to generate</p>
                </div>
              </div>
            </div>

            {/* Satisfaction Rate */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 p-6 flex flex-col justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-4">Satisfaction Rate</p>
                <h3 className="text-xs text-gray-300">From last projects</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#satisfactionGrad)"
                      strokeWidth="4"
                      strokeDasharray="314"
                      strokeDashoffset="47"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="satisfactionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-bold">95%</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-400 mt-4">0% on 23 reviews</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Overview Area Chart */}
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 p-6">
              <div className="mb-6">
                <p className="text-gray-200 text-sm font-semibold mb-1">Sales overview</p>
                <p className="text-gray-500 text-xs">Sales have increased by 2.5k in the last month</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                    <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Referral Tracking */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 p-6">
              <p className="text-gray-200 text-sm font-semibold mb-6">Referral Tracking</p>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Invited</span>
                    <span className="text-lg font-bold">143 people</span>
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="2" />
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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">9.3</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-400">Bonus</span>
                  <p className="text-lg font-bold">1,465</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Users Bar Chart */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 p-6">
              <p className="text-gray-200 text-sm font-semibold mb-6">Active Users</p>
              <p className="text-gray-500 text-xs mb-4">1,523 from last month</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData.slice(0, 8)}>
                    <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: "10px" }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: "10px" }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Projects */}
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-200 text-sm font-semibold">Projects</p>
                  <p className="text-gray-500 text-xs">30 done this month</p>
                </div>
                <div className="text-gray-400 cursor-pointer hover:text-blue-400 transition">⋮</div>
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
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
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
          </div>

          {/* Orders Overview */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-blue-500/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-200 text-sm font-semibold">Orders overview</p>
                <p className="text-gray-500 text-xs">150% this month</p>
              </div>
              <div className="text-gray-400 cursor-pointer hover:text-blue-400 transition">⋮</div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
