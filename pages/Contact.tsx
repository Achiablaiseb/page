
import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { COMPANY_INFO } from '../constants';
import BookingForm from '../BookingForm';
import { useToast } from '../components/Toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      }]);

      if (error) throw error;

      showToast('Message sent successfully! We will contact you soon.', 'success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-8 leading-tight">Let's Discuss Your Project</h1>
              <p className="text-lg text-gray-500 mb-12 max-w-lg leading-relaxed font-medium">
                Whether it's land acquisition, a residential home, or major road construction, our engineering team is ready to assist.
              </p>

              <div className="space-y-10">
                <div className="flex gap-6 items-start group">
                  <div className="bg-primary/10 p-5 rounded-2xl group-hover:bg-primary transition-colors">
                    <Phone className="text-primary group-hover:text-white" size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-2">Call Our Office</h4>
                    {COMPANY_INFO.phones.map((p, i) => (
                      <p key={i} className="text-gray-500 font-bold">{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="bg-chocolate/10 p-5 rounded-2xl group-hover:bg-chocolate transition-colors">
                    <Mail className="text-chocolate group-hover:text-white" size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-2">Email Us</h4>
                    <p className="text-gray-500 font-bold">{COMPANY_INFO.email}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="bg-primary/10 p-5 rounded-2xl group-hover:bg-primary transition-colors">
                    <MapPin className="text-primary group-hover:text-white" size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-2">Office Location</h4>
                    <p className="text-gray-500 font-bold">{COMPANY_INFO.location}</p>
                    <p className="text-gray-400 text-sm font-medium">{COMPANY_INFO.poBox}</p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                  className="inline-flex items-center gap-4 bg-green-500 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-xl shadow-green-500/20 hover:scale-105 transition-transform"
                >
                  <MessageCircle size={28} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-10 md:p-16 rounded-[3rem] border border-gray-100">
              <h3 className="text-3xl font-black mb-8 text-gray-900">Send a Message</h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Full Name</label>
                    <input required name="name" type="text" className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50" disabled={loading} />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Email Address</label>
                    <input required name="email" type="email" className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50" disabled={loading} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Service Required</label>
                  <select name="subject" className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all appearance-none disabled:opacity-50" disabled={loading}>
                    <option>Construction</option>
                    <option>Land Acquisition</option>
                    <option>Architectural Design</option>
                    <option>Equipment Supply</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Your Message</label>
                  <textarea required name="message" rows={5} className="w-full bg-white border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50" disabled={loading}></textarea>
                </div>
                <button
                  disabled={loading}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Submit Inquiry <Send size={20} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Consultation Booking Section */}
      <BookingForm />
    </div>
  );
};

export default Contact;
