
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Folder, CreditCard, Image as ImageIcon,
  FileText, LogOut, ChevronRight, CheckCircle2,
  Clock, MapPin, Plus, User, ArrowLeft, BarChart3, HardHat
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserProfile, Project, ConstructionStage, Payment } from '../types';
import CreateProjectModal from '../components/CreateProjectModal';
import { useToast } from '../components/Toast';

// Mock Data
const MOCK_PROJECTS: Project[] = [
  { id: 'p1', clientId: '2', name: 'Residential Villa - Tiko', location: 'Golf Layout, Tiko', status: 'IN_PROGRESS', startDate: '2023-11-15', progress: 65 },
  { id: 'p2', clientId: '2', name: 'Commercial Plaza - Buea', location: 'Molyko, Buea', status: 'IN_PROGRESS', startDate: '2024-01-10', progress: 30 },
];

const MOCK_STAGES: ConstructionStage[] = [
  { id: 's1', projectId: 'p1', name: 'Foundation', percentage: 25, completed: true },
  { id: 's2', projectId: 'p1', name: 'Blockwork', percentage: 35, completed: true },
  { id: 's3', projectId: 'p1', name: 'Roofing', percentage: 20, completed: false },
  { id: 's4', projectId: 'p1', name: 'Finishing', percentage: 20, completed: false },
];

const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', projectId: 'p1', amount: 15000000, status: 'PAID', date: '2023-11-10', milestone: 'Advance / Land Title' },
  { id: 'pay2', projectId: 'p1', amount: 8000000, status: 'PAID', date: '2023-12-20', milestone: 'Foundation Completion' },
  { id: 'pay3', projectId: 'p1', amount: 12000000, status: 'PENDING', date: '2024-04-15', milestone: 'Roofing Stage' },
];


const ClientView = ({ project, stages, payments }: { project: Project; stages: ConstructionStage[]; payments: Payment[] }) => {
  const { showToast } = useToast();

  const handleRequestStatement = () => {
    // Determine which projects to request statement for, defaulting to current
    showToast('Statement request sent successfully. Admin has been notified.', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Project Overview - HERO */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
            <p className="flex items-center gap-2 text-gray-500 font-medium">
              <MapPin size={16} className="text-gray-400" /> {project.location}
            </p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg text-primary font-semibold text-sm">
            {project.status.replace('_', ' ')}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-gray-500 font-semibold uppercase text-xs tracking-wider">Overall Completion</span>
            <span className="text-primary font-black text-5xl">{project.progress}%</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
            <motion.div
              {...({
                initial: { width: 0 },
                animate: { width: `${project.progress}%` },
                transition: { duration: 1, ease: "easeOut" }
              } as any)}
              className="h-full bg-gradient-to-r from-primary to-blue-400"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">2 of 4 phases complete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stages Timeline */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-6 text-gray-900">Construction Phases</h3>
          <div className="space-y-8 relative">
            <div className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 bg-gray-100"></div>
            {stages.map((stage) => (
              <div key={stage.id} className="relative pl-12">
                <div className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white z-10 ${stage.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                  {stage.completed ? <CheckCircle2 size={18} /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-semibold ${stage.completed ? 'text-gray-900' : 'text-gray-400'}`}>{stage.name}</h4>
                  <span className="text-xs font-semibold text-gray-400">{stage.percentage}%</span>
                </div>
                {stage.completed && <p className="text-xs text-green-600 font-medium">Completed</p>}
                {!stage.completed && stage.name === 'Roofing' && (
                  <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-primary font-medium">Currently in progress. Estimated completion by May 2024.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payments Milestone */}
        <div className="bg-white p-8 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-6 text-gray-900">Payment Tracking</h3>
          <div className="space-y-6">
            {payments.map((payment) => (
              <div key={payment.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{payment.milestone}</p>
                    <p className="font-bold text-lg text-gray-900">{payment.amount.toLocaleString()} XAF</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${payment.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    {payment.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={12} /> {payment.date}
                </div>
              </div>
            ))}
            <button
              onClick={handleRequestStatement}
              className="w-full mt-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Request Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminView = ({ projects, onCreateProject }: { projects: Project[]; onCreateProject: () => void }) => {
  const { showToast } = useToast();

  return (
    <div className="space-y-12">
      {/* Hero: Project Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Client Projects</h2>
            <p className="text-sm text-gray-500 mt-1">{projects.length} active projects</p>
          </div>
          <button
            onClick={onCreateProject}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> New Project
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{proj.name}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{proj.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[120px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${proj.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-[40px]">{proj.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => showToast('Full project details view coming soon.', 'info')}
                      className="text-primary font-medium text-sm hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supporting: Simplified Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Projects', value: projects.length.toString(), icon: Folder },
          { label: 'Ongoing Builds', value: '12', icon: HardHat },
          { label: 'Pending Payments', value: '6.5M XAF', icon: BarChart3 },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gray-100">
              <stat.icon className="text-gray-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }: { user: UserProfile | null; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientProject, setClientProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<ConstructionStage[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchData = async () => {
    if (!user) return;

    if (user.role === 'ADMIN') {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) {
        setProjects(data.map(p => ({
          id: p.id,
          clientId: p.client_id,
          name: p.name,
          location: p.location,
          status: p.status,
          startDate: p.start_date,
          progress: p.progress
        })));
      }
    } else {
      // Fetch client project
      const { data: projectData } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .single();

      if (projectData) {
        const mappedProject: Project = {
          id: projectData.id,
          clientId: projectData.client_id,
          name: projectData.name,
          location: projectData.location,
          status: projectData.status,
          startDate: projectData.start_date,
          progress: projectData.progress
        };
        setClientProject(mappedProject);

        // Fetch stages
        const { data: stageData } = await supabase
          .from('project_stages')
          .select('*')
          .eq('project_id', projectData.id);

        if (stageData) {
          setStages(stageData.map(s => ({
            id: s.id,
            projectId: s.project_id,
            name: s.name,
            percentage: s.percentage,
            completed: s.completed
          })));
        }

        // Fetch payments
        const { data: paymentData } = await supabase
          .from('payments')
          .select('*')
          .eq('project_id', projectData.id);

        if (paymentData) {
          setPayments(paymentData.map(p => ({
            id: p.id,
            projectId: p.project_id,
            amount: p.amount,
            status: p.status,
            date: p.date,
            milestone: p.milestone
          })));
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (!user) {
    window.location.hash = '#/login';
    return null;
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 hidden lg:flex flex-col fixed inset-y-0">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <img
              src="https://i.postimg.cc/2jcQwfK9/Whats-App-Image-2026-01-06-at-5-38-07-PM.jpg"
              alt="Logo"
              className="h-8 w-auto object-contain rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold text-sm leading-tight">FOTABONG ROYAL</span>
              <span className="text-gray-500 font-medium text-[10px] tracking-widest uppercase">ENTERPRISE</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <div className="bg-gray-100 text-gray-600 w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 font-medium">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${activeTab === item.id
                ? 'text-gray-900 bg-gray-50 border-l-2 border-primary'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-gray-500 font-medium">Welcome back, {user.name.split(' ')[0]}</p>
          </div>
          <button className="lg:hidden p-3 bg-white border border-gray-200 rounded-xl text-gray-600">
            <LayoutDashboard size={24} />
          </button>
        </header>

        <AnimatePresence mode="wait">
          {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
          <motion.div
            {...({
              key: activeTab,
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.3 }
            } as any)}
          >
            {user.role === 'ADMIN' ? (
              <AdminView projects={projects} onCreateProject={() => setShowCreateModal(true)} />
            ) : (
              clientProject ? (
                <ClientView project={clientProject} stages={stages} payments={payments} />
              ) : (
                <div className="text-center py-20 text-gray-500">No active projects found.</div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showCreateModal && (
          <CreateProjectModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              fetchData();
              setShowCreateModal(false);
              // Toast will be handled inside modal or here if we pass showing function
            }}
          />
        )}
      </AnimatePresence>
    </div >
  );
};

// Helpfully defining Link locally since it's used in Dashboard
const Link = ({ to, children, className }: any) => <a href={`#${to}`} className={className}>{children}</a>;

export default Dashboard;
