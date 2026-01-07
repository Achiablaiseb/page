
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Briefcase, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from './lib/supabase';

import { useToast } from './components/Toast';
import { Loader2 } from 'lucide-react';

const BookingForm = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const bookingData = {
      client_name: formData.get('client_name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      service_type: formData.get('service_type') as string,
      description: `Preferred Date: ${formData.get('date')} | Time: ${formData.get('time')}\n\nMessage: ${formData.get('message')}`
    };

    try {
      const { error } = await supabase.from('bookings').insert([bookingData]);

      if (error) throw error;

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting booking:', error);
      showToast('Failed to submit booking. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...({
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5 }
            } as any)}
            className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-gray-100 text-center max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Booking Successful!</h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Thank you for choosing Fotabong Royal Enterprise. Your consultation request has been received.
              Our team will contact you within 24 hours to confirm your booking.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
            >
              Book Another Session
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary text-sm font-black tracking-[0.2em] uppercase mb-4">Get Started</h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">Book a Consultation</h3>
          <div className="w-24 h-1.5 bg-chocolate mx-auto rounded-full"></div>
        </div>

        <motion.div
          {...({
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 }
          } as any)}
          className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Info Side */}
            <div className="lg:col-span-2 bg-primary p-12 text-white relative flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h4 className="text-2xl font-black mb-10">Why consult with our experts?</h4>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0"><Clock size={22} /></div>
                  <div>
                    <p className="font-bold text-lg">Save Time</p>
                    <p className="text-blue-100 text-sm">Direct access to expert engineers and project managers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0"><Briefcase size={22} /></div>
                  <div>
                    <p className="font-bold text-lg">Expert Advice</p>
                    <p className="text-blue-100 text-sm">Professional guidance on land, design, and costing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0"><Calendar size={22} /></div>
                  <div>
                    <p className="font-bold text-lg">Flexible Scheduling</p>
                    <p className="text-blue-100 text-sm">Choose a time that works best for your busy schedule.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm font-medium italic text-blue-100">
                  “Our team will contact you within 24 hours to confirm your booking.”
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-3 p-10 md:p-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <User size={12} className="text-primary" /> Full Name
                    </label>
                    <input required name="client_name" type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Phone size={12} className="text-primary" /> Phone Number
                    </label>
                    <input required name="phone" type="tel" placeholder="+237 ..." className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Mail size={12} className="text-primary" /> Email Address
                    </label>
                    <input required name="email" type="email" placeholder="email@example.com" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Briefcase size={12} className="text-primary" /> Service Type
                    </label>
                    <select required name="service_type" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none font-medium">
                      <option value="">Select a service</option>
                      <option>Building Construction</option>
                      <option>Road/Bridge Works</option>
                      <option>Land Acquisition</option>
                      <option>Design & BOQ</option>
                      <option>Property Management</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Calendar size={12} className="text-primary" /> Preferred Date
                    </label>
                    <input required name="date" type="date" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Clock size={12} className="text-primary" /> Preferred Time
                    </label>
                    <input required name="time" type="time" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <MessageSquare size={12} className="text-primary" /> Message / Project Description
                  </label>
                  <textarea rows={4} name="message" placeholder="Tell us more about your construction needs or land inquiry..." className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium"></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Submit Booking <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
