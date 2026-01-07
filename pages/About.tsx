
import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../constants';
import { Target, Eye, Shield, Award, Users, HardHat } from 'lucide-react';

const About = () => {
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
          {/* Cast motion.h1 to any to avoid IntrinsicAttributes typing error */}
          <motion.h1
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 }
            } as any)}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Our Story
          </motion.h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            A legacy of trust, a future of innovation. Serving Cameroon's construction needs since 2007.
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img
                src="https://i.postimg.cc/1zwk3jhX/Whats-App-Image-2025-05-31-at-13-58-56-1bb004fd.jpg"
                className="rounded-[3rem] shadow-2xl relative z-10"
                alt="About Fotabong Royal Enterprise"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-chocolate/10 rounded-full -z-10"></div>
            </div>
            <div>
              <h2 className="text-4xl font-black mb-8 text-gray-900 leading-tight">
                About Fotabong Royal Enterprise
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  FOTABONG ROYAL ENTERPRISE is a professional construction and engineering company operating in Cameroon.
                  Founded with a vision to revolutionize the infrastructure landscape, we have executed critical
                  government and private projects including buildings, roads, and bridges.
                </p>
                <p>
                  Our multi-disciplinary team consists of qualified and experienced engineers, senior technicians,
                  and skilled laborers who work under the guidance of our Managing Director, {COMPANY_INFO.md}.
                </p>
                <p>
                  From land title processing to complex civil engineering works, we provide a holistic
                  approach to real estate and construction, ensuring every client project is handled
                  with technical precision and financial transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-primary font-black uppercase tracking-widest text-sm mb-4">Core Principles</h2>
          <h3 className="text-4xl font-black">What Drives Us</h3>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Integrity", desc: "Absolute transparency in costing and material usage.", icon: Shield },
            { title: "Quality", desc: "Adherence to international engineering standards.", icon: Award },
            { title: "Community", desc: "Building infrastructure that empowers Cameroonians.", icon: Users },
          ].map((v, i) => (
            // Cast motion.div to any to avoid IntrinsicAttributes typing error
            <motion.div
              key={i}
              {...({
                whileHover: { y: -10 }
              } as any)}
              className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center"
            >
              <div className="bg-chocolate/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <v.icon className="text-chocolate" size={36} />
              </div>
              <h4 className="text-2xl font-black mb-4">{v.title}</h4>
              <p className="text-gray-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
