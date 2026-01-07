
import React from 'react';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Services = () => {
  return (
    <div className="pt-20">
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
          <h1 className="text-5xl md:text-7xl font-black mb-6">Our Services</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg md:text-xl font-medium opacity-90">
            End-to-end engineering and real estate solutions tailored for the Cameroonian market.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SERVICES.map((s, i) => (
              // Cast motion.div to any to avoid IntrinsicAttributes typing error
              <motion.div 
                key={i}
                {...({
                  initial: { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true }
                } as any)}
                className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-8">
                  <div className="bg-primary/5 w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <CheckCircle className="text-primary group-hover:text-white transition-colors" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-8">{s.description}</p>
                    <ul className="space-y-3 mb-8">
                      {['Professional Team', 'Transparent Costing', 'Timely Delivery'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-chocolate"></div> {item}
                        </li>
                      ))}
                    </ul>
                    <a href="#/contact" className="inline-flex items-center gap-2 font-black text-primary group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                      Inquire Details <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
