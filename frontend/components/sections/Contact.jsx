'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { submitContact } from '@/lib/api';
import { Mail, ArrowRight, BookOpen, Award, Zap, Cpu } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CONTACT_LINKS = [
  { icon: Mail,        label: 'erdevanshgupta@gmail.com',         href: 'mailto:erdevanshgupta@gmail.com' },
  { icon: GithubIcon,  label: 'github.com/ErDevanshgupta',        href: 'https://github.com/ErDevanshgupta' },
  { icon: LinkedinIcon,label: 'linkedin.com/in/er-devansh-gupta', href: 'https://www.linkedin.com/in/er-devansh-gupta/' },
];

const CREDIBILITY = [
  { icon: BookOpen, label: '10+ Research Papers' },
  { icon: Award,    label: '1 Published Patent'  },
  { icon: Zap,      label: 'Production Systems'  },
  { icon: Cpu,      label: 'AI + Full Stack'      },
];

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

  const inputClass = [
    'w-full rounded-xl px-4 py-3 text-sm transition-all duration-200',
    'bg-slate-50 dark:bg-white/[0.03]',
    'border border-slate-200 dark:border-white/[0.08]',
    'text-slate-900 dark:text-white',
    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
    'focus:border-primary-500 dark:focus:border-primary-500',
  ].join(' ');

  return (
    <section id="contact" className="section-container">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: '#0f172a', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }
        }}
      />

      <SectionHeader
        label="07. Contact"
        title="Let's Build Something Meaningful"
        subtitle="Open to software engineering roles, full-stack opportunities, applied AI projects, and technical collaborations."
      />

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* ── Left: identity + availability + links ── */}
        <AnimatedSection>
          <div className="space-y-6">

            {/* Professional brief */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineer specializing in{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                full-stack systems, production AI, and cloud-native architecture
              </span>
              . Currently open to full-time software engineering roles and technical collaborations.
              Response within 24–48 hours.
            </p>

            {/* Availability badges */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                              bg-emerald-50 dark:bg-emerald-900/20
                              border border-emerald-200 dark:border-emerald-800/40
                              text-emerald-700 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                      style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
                Open to Full-Time Roles
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                              bg-amber-50 dark:bg-amber-900/20
                              border border-amber-200 dark:border-amber-800/40
                              text-amber-700 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Available for Freelance
              </div>
            </div>

            {/* Contact links */}
            <div className="space-y-3">
              {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 group transition-colors">
                  <div className="w-10 h-10 glass-card flex items-center justify-center shrink-0
                                  text-slate-500 dark:text-slate-500
                                  group-hover:text-primary-600 dark:group-hover:text-primary-400
                                  group-hover:border-primary-400/40 dark:group-hover:border-primary-700/50
                                  transition-all duration-200">
                    <Icon size={15} />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400
                                   group-hover:text-primary-600 dark:group-hover:text-primary-400
                                   transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Credibility metrics */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {CREDIBILITY.map(({ icon: Icon, label }) => (
                <div key={label}
                     className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                bg-slate-50 dark:bg-white/[0.02]
                                border border-slate-200 dark:border-white/[0.06]">
                  <Icon size={12} className="text-primary-600 dark:text-primary-400 shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </AnimatedSection>

        {/* ── Right: elevated form card ──────────── */}
        <AnimatedSection delay={0.15}>
          <div className="glass-card overflow-hidden">
            <div className="h-0.5 bg-gradient-to-r from-primary-500 to-cyan-400" />
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name + Email row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input {...register('name', { required: 'Name is required' })}
                      placeholder="Your name" className={inputClass} />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <input {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                    })}
                      placeholder="your@email.com" className={inputClass} />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <input {...register('subject', { required: 'Subject is required' })}
                    placeholder="Engineering role · Freelance project · Collaboration"
                    className={inputClass} />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'At least 10 characters' }
                  })}
                    placeholder="Tell me about the role, project, or what you'd like to build together…"
                    rows={5} className={`${inputClass} resize-none`} />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white
                             bg-primary-600 hover:bg-primary-500 disabled:opacity-50
                             shadow-md shadow-primary-200 dark:shadow-primary-900/30
                             transition-all duration-200
                             flex items-center justify-center gap-2 group">
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Start a Conversation
                      <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
