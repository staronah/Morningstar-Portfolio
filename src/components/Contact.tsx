import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, Phone, MapPin, MessageSquare, Github, Linkedin, Twitter, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handlePrivateGithubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('show-private-github-popup'));
  };

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: Partial<FormState> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message content is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API submit delay
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 1500);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase font-mono">
            Get in Touch
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Let's Build Something <span className="text-indigo-400">Exceptional</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-400">
            Have an app idea, responsive website concept, or looking to collaborate? Drop a line below!
          </p>
        </div>

        {/* Contact Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Block: Contact Cards & Socials */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Contact Information
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
              I generally respond to valid business proposals, inquiries, and collaboration messages within 24 hours. Let's make something amazing.
            </p>

            <div className="space-y-4">
              {/* Card 1: Email */}
              <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-gray-900/40 border border-gray-800/20 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-indigo-950/40 flex items-center justify-center text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-450 uppercase tracking-wider">Email Address</p>
                  <a href="mailto:staronah@gmail.com" className="text-sm font-semibold text-gray-200 hover:text-indigo-400 transition-colors">
                    staronah@gmail.com
                  </a>
                </div>
              </div>

              {/* Card 2: Phone */}
              <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-gray-900/40 border border-gray-800/20 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-indigo-950/40 flex items-center justify-center text-indigo-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-450 uppercase tracking-wider">Phone</p>
                  <a href="tel:+2349064108612" className="text-sm font-semibold text-gray-200 hover:text-indigo-400 transition-colors">
                    +234 906 410 8612
                  </a>
                </div>
              </div>

              {/* Card 3: WhatsApp */}
              <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-gray-900/40 border border-gray-800/20 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-indigo-950/40 flex items-center justify-center text-indigo-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-450 uppercase tracking-wider">WhatsApp</p>
                  <a href="https://wa.me/2348166068997" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-200 hover:text-indigo-400 transition-colors">
                    +234 816 606 8997
                  </a>
                </div>
              </div>

              {/* Card 4: Location */}
              <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-gray-900/40 border border-gray-800/20 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-indigo-950/40 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-450 uppercase tracking-wider">Based In</p>
                  <p className="text-sm font-semibold text-gray-200">
                    Kubwa, Abuja, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Social Network Link row */}
            <div className="space-y-3 pt-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-450 font-mono">
                Connect on Socials
              </h4>
              <div className="flex items-center space-x-3">
                <a
                  id="contact-github-btn"
                  href="https://github.com"
                  onClick={handlePrivateGithubClick}
                  className="w-10 h-10 rounded-xl bg-gray-900 text-gray-400 hover:text-white hover:bg-indigo-500 flex items-center justify-center border border-gray-800 transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>

                <a
                  id="contact-linkedin-btn"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 text-gray-400 hover:text-white hover:bg-indigo-500 flex items-center justify-center border border-gray-800 transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>

                <a
                  id="contact-twitter-btn"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 text-gray-400 hover:text-white hover:bg-indigo-500 flex items-center justify-center border border-gray-800 transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <Twitter className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 w-full relative">
            
            {/* Main form background card */}
            <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 p-6 sm:p-10 shadow-xs relative overflow-hidden min-h-[480px]">
              
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 font-display">Full Name</label>
                        <input
                          id="contact-name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl bg-gray-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${
                            errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-800 hover:border-gray-700'
                          }`}
                          placeholder="Jane Doe"
                        />
                        {errors.name && (
                          <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 font-display">Email Address</label>
                        <input
                          id="contact-email-input"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl bg-gray-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${
                            errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-800 hover:border-gray-700'
                          }`}
                          placeholder="jane@example.com"
                        />
                        {errors.email && (
                          <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 font-display">Subject</label>
                      <input
                        id="contact-subject-input"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${
                          errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-800 hover:border-gray-700'
                        }`}
                        placeholder="SaaS Redesign project"
                      />
                      {errors.subject && (
                        <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.subject}</span>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 font-display">Message Content</label>
                      <textarea
                        id="contact-message-input"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none ${
                          errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-800 hover:border-gray-700'
                        }`}
                        placeholder="Write details of your proposal here..."
                      />
                      {errors.message && (
                        <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none active:scale-99"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
                          Submitting Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-1.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* Immersive Success State Card */
                  <motion.div
                    id="contact-success-state"
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15, type: 'spring' }}
                      className="w-16 h-16 rounded-full bg-emerald-950/40 flex items-center justify-center text-emerald-400 border border-emerald-200/30 mb-6"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>

                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                      Message Received!
                    </h4>

                    <p className="font-sans text-sm sm:text-base text-gray-400 mt-2.5 max-w-sm leading-relaxed">
                      Thank you for reaching out. Your proposal is logged in my queue. I will reach out shortly.
                    </p>

                    <button
                      id="reset-contact-form-btn"
                      onClick={() => setShowSuccess(false)}
                      className="mt-8 inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-800 hover:border-indigo-500/40 text-gray-300 hover:text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono transition-all focus:outline-none"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
