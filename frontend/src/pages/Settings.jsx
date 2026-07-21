import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "../components/ThemeToggle";

// ── Icons for Sidebar (Copied from AddEmployee for consistency) ──
const GridIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const PeopleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const HelpCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const SupportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ── Settings Specific Icons ──
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const PaletteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
);
const BuildingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
);
const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
);
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

export default function Settings() {
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.ui.themeMode);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const companyName = localStorage.getItem("companyName") || "Acme Corp";
  const [activeTab, setActiveTab] = useState("profile");

  // Mock State for Settings Forms
  const [themePref, setThemePref] = useState(themeMode);
  const [langPref, setLangPref] = useState("English (US)");
  const [notifCompletion, setNotifCompletion] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);
  const [notifReminders, setNotifReminders] = useState(true);
  const [notifFeatures, setNotifFeatures] = useState(false);

  // Payroll Prefs State
  const [payrollCurrency, setPayrollCurrency] = useState("INR (₹)");
  const [payrollDate, setPayrollDate] = useState("Last working day");
  const [overtimeRate, setOvertimeRate] = useState("250");
  const [leavePolicy, setLeavePolicy] = useState("1 day = 1/30th of monthly base");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: <GridIcon /> },
    { id: "employees", label: "Employees", path: "/dashboard?tab=employees", icon: <PeopleIcon /> },
    { id: "settings", label: "Settings", path: "/settings", icon: <SupportIcon /> },
  ];

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: <UserIcon /> },
    { id: "account", label: "Account Security", icon: <LockIcon /> },
    { id: "preferences", label: "Preferences", icon: <PaletteIcon /> },
    { id: "company", label: "Company Info", icon: <BuildingIcon /> },
    { id: "payroll", label: "Payroll Config", icon: <WalletIcon /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon /> },
    { id: "about", label: "About PaySphere", icon: <InfoIcon /> },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Profile</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Manage your personal information and how it appears.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                JS
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Jane Smith</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Payroll Administrator at {companyName}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                    Change Picture
                  </button>
                  <button className="px-4 py-2 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Full Name</label>
                <input type="text" defaultValue="Jane Smith" className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm text-gray-900 dark:text-white transition" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Email Address</label>
                <input type="email" defaultValue="jane.smith@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm text-gray-900 dark:text-white transition" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Payroll ID</label>
                <input type="text" defaultValue="PR-8821" readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Role / Designation</label>
                <input type="text" defaultValue="Admin" className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm text-gray-900 dark:text-white transition" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-slate-800">
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 dark:shadow-none transition">
                Save Changes
              </button>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Security</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Manage your password and connected accounts.</p>
            </div>

            <div className="p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="password" placeholder="Current Password" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white" />
                <input type="password" placeholder="New Password" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-transparent dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white" />
              </div>
              <button className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold transition hover:opacity-90">
                Update Password
              </button>
            </div>

            <div className="p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Connected Accounts</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950 rounded-xl">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Google Account</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">jane.smith@example.com</p>
                  </div>
                </div>
                <button className="text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition">
                  Disconnect
                </button>
              </div>
            </div>

            <div className="p-5 border border-red-200 dark:border-red-900/30 rounded-2xl bg-red-50/50 dark:bg-red-950/10 shadow-sm">
              <h3 className="font-bold text-sm text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-5 py-2.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-bold transition hover:bg-gray-50 dark:hover:bg-slate-700">
                  Logout All Devices
                </button>
                <button className="px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-bold transition hover:bg-red-700">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">App Preferences</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Customize your UI and language settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Theme Settings</h3>
                <div className="space-y-3">
                  {["light", "dark", "system"].map(t => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition border border-transparent">
                      <input type="radio" name="theme" checked={themePref === t} onChange={() => setThemePref(t)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-slate-200 capitalize">{t} Mode</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">* Uses standard global theme logic</p>
              </div>

              <div className="p-5 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Language</h3>
                <select value={langPref} onChange={(e) => setLangPref(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white font-semibold focus:border-blue-500 transition cursor-pointer">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Hindi (IN)</option>
                  <option>Spanish (ES)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "company":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Information</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Details about your organization registered on PaySphere.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Company Name</label>
                <input type="text" defaultValue={companyName} className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white transition" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Organization ID</label>
                <input type="text" defaultValue="ORG-993821" readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Employee Count</label>
                <input type="text" defaultValue="142" readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Payroll Cycle</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white transition cursor-pointer">
                  <option>Monthly (End of month)</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-slate-800">
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 dark:shadow-none transition">
                Update Company Info
              </button>
            </div>
          </div>
        );

      case "payroll":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payroll Config</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Configure default rates, currency, and logic for payroll processing.</p>
            </div>

            <div className="p-6 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Currency</label>
                  <select value={payrollCurrency} onChange={(e)=>setPayrollCurrency(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white font-semibold transition cursor-pointer">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Processing Date</label>
                  <select value={payrollDate} onChange={(e)=>setPayrollDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white font-semibold transition cursor-pointer">
                    <option>Last working day</option>
                    <option>1st of next month</option>
                    <option>5th of next month</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Default Overtime Rate (per hr)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 font-bold text-sm">₹</span>
                    <input type="number" value={overtimeRate} onChange={(e) => setOvertimeRate(e.target.value)} className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white font-semibold transition" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 tracking-wider mb-2 block">Leave Deduction Policy</label>
                  <select value={leavePolicy} onChange={(e)=>setLeavePolicy(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 outline-none text-sm text-gray-900 dark:text-white font-semibold transition cursor-pointer">
                    <option>1 day = 1/30th of monthly base</option>
                    <option>Fixed Daily Rate</option>
                    <option>No deduction</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 dark:shadow-none transition">
                  Save Payroll Config
                </button>
              </div>

            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Manage what events trigger email or push notifications.</p>
            </div>

            <div className="border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-slate-800">
              
              <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Payroll Completion</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Get alerted when a payroll run is successfully finalized.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifCompletion} onChange={() => setNotifCompletion(!notifCompletion)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Employee Updates</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Alerts for new employee additions or removals.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifUpdates} onChange={() => setNotifUpdates(!notifUpdates)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Payroll Reminders</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Reminders when a cycle is nearing its processing date.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifReminders} onChange={() => setNotifReminders(!notifReminders)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Feature Announcements</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">News on new PaySphere features and product updates.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifFeatures} onChange={() => setNotifFeatures(!notifFeatures)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">About PaySphere</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">System info, documentation, and support.</p>
            </div>

            <div className="border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl text-white font-bold mx-auto mb-4 shadow-lg shadow-blue-500/30">
                ₹
              </div>
              <h3 className="text-xl font-serif text-gray-900 dark:text-white font-bold mb-1">PaySphere</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">Modern Payroll Management</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-gray-100 dark:border-slate-800 pt-6">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 dark:text-slate-500 mb-1">Version</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">2.4.0</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 dark:text-slate-500 mb-1">Build Number</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">1082</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 dark:text-slate-500 mb-1">Tech Stack</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">React, Node, MongoDB</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 dark:text-slate-500 mb-1">License</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">MIT</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="#" className="p-4 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition text-center group cursor-pointer block">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Documentation</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">API & Integration Guides</p>
              </a>
              <a href="#" className="p-4 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition text-center group cursor-pointer block">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">GitHub Repo</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Source Code & Issues</p>
              </a>
              <a href="#" className="p-4 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition text-center group cursor-pointer block">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Contact Support</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Get Help from Team</p>
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex font-sans text-slate-800 dark:text-slate-200 transition-colors duration-200">
      <Helmet>
        <title>Settings | PaySphere</title>
        <meta name="description" content="Manage your application settings and preferences." />
      </Helmet>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`w-56 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 fixed inset-y-0 left-0 flex flex-col z-50 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-5 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-blue-200 dark:shadow-none">
              ₹
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{companyName}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Payroll ID: 8821</p>
            </div>
          </div>
          <button
            className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition ${
                item.id === "settings"
                  ? "bg-indigo-50 dark:bg-indigo-950/30 text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition">
            <SupportIcon />
            Help & Support
          </button>
          <button onClick={() => navigate("/monthly-updates")} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-200 dark:shadow-none transition">
            Run Payroll
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col md:ml-56 transition-all duration-300">

        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className="md:hidden p-2 -ml-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
            <span className="font-bold text-blue-900 dark:text-blue-400 truncate">Settings</span>
          </div>

          <div className="flex items-center gap-3 text-gray-500 dark:text-slate-400">
            <ThemeToggle />
            <button className="hidden sm:flex p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"><BellIcon /></button>
            <button className="hidden sm:flex p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"><HelpCircleIcon /></button>
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {getInitials(companyName)}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("companyName");
                navigate("/auth");
              }}
              className="px-3 py-1.5 text-sm font-semibold text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 flex flex-col items-center">
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
            
            {/* ── Left Settings Menu ── */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-slate-800"
                        : "text-gray-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-900/50 hover:text-gray-900 dark:hover:text-white border border-transparent"
                    }`}
                  >
                    <span className={activeTab === tab.id ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-slate-500"}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right Content Area ── */}
            <div className="flex-1 pb-20">
              {renderContent()}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
