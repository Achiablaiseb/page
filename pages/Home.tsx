
import React from 'react';
import { motion } from 'framer-motion';
// Added missing Phone and MessageCircle icon imports from lucide-react
import { ChevronRight, ShieldCheck, Clock, Users, Award, HardHat, Building, Landmark, Phone, MessageCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, SERVICES } from '../constants';
import BookingForm from '../BookingForm';

// Fixed FeatureCard type definition to use React.FC which better handles reserved props like key in strictly typed environments
interface FeatureCardProps {
  icon: any;
  title: string;
  desc: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc, delay }) => (
  // Cast motion.div to any to avoid IntrinsicAttributes typing error
  <motion.div
    {...({
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay, duration: 0.6 }
    } as any)}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
  >
    <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
      <Icon className="text-primary group-hover:text-white transition-colors" size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

const TestimonialCard = ({ name, project, text, image, delay }: { name: string; project: string; text: string; image: string; delay: number }) => (
  <motion.div
    {...({
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay, duration: 0.6 }
    } as any)}
    className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all relative group"
  >
    <div className="absolute -top-4 -right-4 bg-chocolate w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
      <Quote size={18} fill="currentColor" />
    </div>
    <div className="flex items-center gap-4 mb-6">
      <img 
        src={image} 
        alt={name} 
        className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white"
      />
      <div>
        <h4 className="font-black text-gray-900 leading-tight">{name}</h4>
        <p className="text-chocolate text-[10px] font-black uppercase tracking-widest mt-1">{project}</p>
      </div>
    </div>
    <p className="text-gray-600 leading-relaxed italic text-sm">"{text}"</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Construction site"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
          <motion.div
            {...({
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.8 }
            } as any)}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-chocolate/20 backdrop-blur-md px-4 py-2 rounded-full border border-chocolate/30 text-chocolate font-bold text-xs tracking-widest uppercase mb-6">
              <HardHat size={14} /> Building the Future of Cameroon
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] font-serif">
              Engineering <span className="text-chocolate">Excellence</span> Since 2007
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              FOTABONG ROYAL ENTERPRISE delivers high-quality construction, civil engineering, and land services across Cameroon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/40">
                Get a Professional Quote <ChevronRight size={20} />
              </Link>
              <Link to="/projects" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold transition-all text-center">
                Explore Our Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-8 grayscale opacity-60">
          <div className="flex items-center gap-2 font-black text-2xl text-gray-800"><Building className="text-primary" /> GOVERNMENT PROJECTS</div>
          <div className="flex items-center gap-2 font-black text-2xl text-gray-800"><Landmark className="text-chocolate" /> PRIVATE ESTATES</div>
          <div className="flex items-center gap-2 font-black text-2xl text-gray-800"><ShieldCheck className="text-primary" /> LICENSED FIRM</div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary text-sm font-black tracking-[0.2em] uppercase mb-4">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Comprehensive Engineering Solutions</h3>
            <div className="w-24 h-1.5 bg-chocolate mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <FeatureCard 
                key={i} 
                title={s.title} 
                desc={s.description} 
                delay={i * 0.1}
                icon={Building} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Managing Director Profile */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
              <motion.div
                {...({
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true }
                } as any)}
                className="relative"
              >
                <div className="absolute -inset-4 border-2 border-chocolate/50 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
                <img 
                  src="https://i.postimg.cc/kGsndm2b/Whats-App-Image-2025-05-31-at-05-59-31-0189a8d0.jpg" 
                  alt="Managing Director" 
                  className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover"
                />
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2">
              <h4 className="text-chocolate font-black uppercase tracking-widest mb-4">Leadership</h4>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Message from the Managing Director</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 italic">
                "Our commitment to excellence is reflected in every brick laid and every road paved. At Fotabong Royal Enterprise, we don't just build structures; we build trust and long-lasting partnerships with our clients across Cameroon."
              </p>
              <div className="mb-10">
                <p className="font-black text-2xl text-white">{COMPANY_INFO.md}</p>
                <p className="text-chocolate font-bold">Managing Director</p>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-black text-primary mb-1">15+</p>
                  <p className="text-gray-500 text-xs font-bold uppercase">Years Exp.</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-primary mb-1">200+</p>
                  <p className="text-gray-500 text-xs font-bold uppercase">Projects</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-primary mb-1">50+</p>
                  <p className="text-gray-500 text-xs font-bold uppercase">Engineers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary text-sm font-black tracking-[0.2em] uppercase mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">What Our Clients Say</h3>
            <div className="w-24 h-1.5 bg-chocolate mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Barrister Enow T."
              project="Commercial Construction"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
              text="Fotabong Royal Enterprise transformed our vision into reality. The structural integrity of our Buea complex is impressive, and they delivered right on schedule."
              delay={0.1}
            />
            <TestimonialCard 
              name="Sarah M."
              project="Land Acquisition"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
              text="As a Cameroonian in the diaspora, I was worried about land scams. This company handled my land acquisition in Limbe with 100% transparency and secured my title."
              delay={0.2}
            />
            <TestimonialCard 
              name="Chief Emmanuel F."
              project="Property Management"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
              text="Their property management team is exceptional. They rehabilitated my old building in Douala and increased its market value significantly with professional maintenance."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Booking / Appointment Section */}
      <BookingForm />

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
          <motion.div
            {...({
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true }
            } as any)}
            className="bg-primary rounded-[3rem] p-12 md:p-20 text-white shadow-2xl shadow-blue-900/30 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-chocolate/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">Ready to Start Your Construction Project?</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto relative z-10">
              Get in touch with our team of experts today for a consultation on land, design, or construction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <a href={`tel:${COMPANY_INFO.phones[1]}`} className="bg-white text-primary px-10 py-5 rounded-2xl font-black hover:bg-blue-50 transition-colors flex items-center justify-center gap-3">
                <Phone size={24} /> Call Us Now
              </a>
              <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} className="bg-chocolate text-white px-10 py-5 rounded-2xl font-black hover:bg-[#8B4513] transition-colors flex items-center justify-center gap-3">
                <MessageCircle size={24} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
