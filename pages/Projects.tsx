
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Filter, Search, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  status: string;
  image: string;
}

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('projects_portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProjects(data || []);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(proj => {
    const matchesStatus = filter === 'All' || proj.status === filter;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filters = ['All', 'Ongoing', 'Completed'];

  return (
    <div className="pt-20">
      {/* Page Header with Video Background */}
      <section className="relative py-32 md:py-48 text-white overflow-hidden flex items-center">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-w-[177.77vh] h-full min-h-[56.25vw]">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <iframe
                src="https://streamable.com/e/qqen15?autoplay=1&muted=1&loop=1"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
              ></iframe>
            </div>
          </div>
          {/* Dark Overlay (rgba(0,0,0,0.55)) */}
          <div className="absolute inset-0 bg-black/55 z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-20 w-full">
          {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
          <motion.div
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 }
            } as any)}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Portfolio</h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg md:text-xl font-medium opacity-90">
              Building the infrastructure that defines Cameroon's landscape. Explore our landmark projects across the country.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter UI */}
          <div className="space-y-8 mb-16">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  placeholder="Search projects by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary transition-all font-medium text-gray-700 shadow-sm"
                />
              </div>

              {/* Status Filter Container */}
              <div className="flex items-center gap-3 md:border-l md:border-gray-100 md:pl-6">
                <div className="hidden lg:flex bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                  <Filter size={20} />
                </div>
                <div className="flex p-1.5 bg-gray-100 rounded-2xl overflow-x-auto w-full md:w-auto">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${filter === f
                        ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {searchQuery && (
              // Cast motion.p to any to avoid IntrinsicAttributes typing error
              <motion.p
                {...({
                  initial: { opacity: 0 },
                  animate: { opacity: 1 }
                } as any)}
                className="text-gray-400 text-sm font-medium"
              >
                Showing {filteredProjects.length} results for "{searchQuery}"
              </motion.p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading projects...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Failed to Load Projects</h3>
              <p className="text-gray-500 font-medium mb-6">{error}</p>
              <button
                onClick={fetchProjects}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <>
              {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
              <motion.div
                {...({ layout: true } as any)}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                <AnimatePresence mode='popLayout'>
                  {filteredProjects.map((proj) => (
                    // Cast motion.div to any to avoid IntrinsicAttributes typing error
                    <motion.div
                      key={proj.id}
                      {...({
                        layout: true,
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.9 },
                        transition: { duration: 0.4 }
                      } as any)}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-video bg-gray-200">
                        <img
                          src={proj.image}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={proj.title}
                        />
                        <div className="absolute top-6 right-6">
                          <span className={`px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl backdrop-blur-md ${proj.status === 'Completed' ? 'bg-green-500/90 text-white' : 'bg-primary/90 text-white'
                            }`}>
                            {proj.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start px-2">
                        <div>
                          <p className="text-chocolate font-black uppercase text-xs tracking-[0.2em] mb-2">{proj.category}</p>
                          <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">{proj.title}</h3>
                          <p className="flex items-center gap-2 text-gray-500 mt-2 font-medium">
                            <MapPin size={16} className="text-chocolate/70" /> {proj.location}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-gray-100">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProjects.length === 0 && (
                // Cast motion.div to any to avoid IntrinsicAttributes typing error
                <motion.div
                  {...({
                    initial: { opacity: 0 },
                    animate: { opacity: 1 }
                  } as any)}
                  className="py-32 text-center"
                >
                  <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <Search size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-400 font-medium max-w-sm mx-auto">
                    We couldn't find any projects matching "{searchQuery}" in the {filter === 'All' ? 'entire portfolio' : `${filter.toLowerCase()} category`}.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setFilter('All'); }}
                    className="mt-8 text-primary font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
