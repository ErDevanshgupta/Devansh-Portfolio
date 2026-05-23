'use client';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { submitContact } from '@/lib/api';
import { Mail, Send } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
import { useState } from 'react';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitContact(data);
      toast.success("Message sent! I'll get back to you within 48 hours.");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please email me directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-white text-sm
    placeholder:text-slate-600 focus:outline-none focus:border-primary-600 transition-colors`;
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <section id="contact" className="section-container">
      <Toaster position="bottom-center" toastOptions={{ style: { background: '#0f172a', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <SectionHeader label="07. Contact" title="Let's Connect" subtitle="Have a project in mind, a paper to collaborate on, or just want to say hi?" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Info */}
        <AnimatedSection>
          <div className="space-y-8">
            <p className="text-slate-400 leading-relaxed">
              I'm open to full-time roles, research collaborations, freelance projects, and
              conversations about AI + systems engineering. Response within 24–48 hours.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'erdevanshgupta@gmail.com', href: 'mailto:erdevanshgupta@gmail.com' },
                { icon: GithubIcon, label: 'github.com/ErDevanshgupta', href: 'https://github.com/ErDevanshgupta' },
                { icon: LinkedinIcon, label: 'linkedin.com/in/er-devansh-gupta', href: 'https://linkedin.com/in/er-devansh-gupta' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank"
                  className="flex items-center gap-3 text-slate-400 hover:text-primary-400 transition-colors group">
                  <div className="w-10 h-10 glass-card flex items-center justify-center group-hover:border-primary-700/50 transition-all">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Right: Form */}
        <AnimatedSection delay={0.15}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input {...register('name', { required: 'Name is required' })}
                  placeholder="Your name" className={inputClass} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                })}
                  placeholder="Your email" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <input {...register('subject', { required: 'Subject is required' })}
                placeholder="Subject" className={inputClass} />
              {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
            </div>
            <div>
              <textarea {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'At least 10 characters' }
              })}
                placeholder="Your message..." rows={5} className={`${inputClass} resize-none`} />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold
                         rounded-xl transition-all flex items-center justify-center gap-2">
              {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
