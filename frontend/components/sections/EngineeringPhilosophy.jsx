'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function EngineeringPhilosophy() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-6">
      <AnimatedSection>
        <div className="glass-card overflow-hidden
                        hover:border-primary-400/25 dark:hover:border-primary-700/40
                        hover:shadow-md dark:hover:shadow-primary-900/10
                        transition-all duration-300">
          <div className="h-0.5 bg-gradient-to-r from-primary-600 to-primary-400" />

          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">

              {/* Label */}
              <div className="shrink-0 md:pt-1.5">
                <span className="text-xs font-mono text-primary-600 dark:text-primary-400
                                 tracking-[0.2em] uppercase">
                  Engineering Philosophy
                </span>
              </div>

              {/* Quote */}
              <div className="md:border-l md:border-slate-200 dark:md:border-white/[0.08] md:pl-10">
                <blockquote className="text-lg md:text-xl text-slate-600 dark:text-slate-300
                                       leading-relaxed font-light">
                  <span className="text-slate-400 dark:text-slate-600 text-3xl leading-none mr-1 align-top">&ldquo;</span>
                  I enjoy owning systems end-to-end — from designing scalable architectures and
                  backend workflows to deploying production-ready applications. I believe impactful
                  software comes from balancing{' '}
                  <span className="text-slate-900 dark:text-white font-medium">engineering fundamentals</span>
                  ,{' '}
                  <span className="text-slate-900 dark:text-white font-medium">business outcomes</span>
                  , and rapid iteration through{' '}
                  <span className="text-primary-600 dark:text-primary-400 font-medium">AI-assisted workflows</span>
                  .<span className="text-slate-400 dark:text-slate-600 text-3xl leading-none ml-1 align-top">&rdquo;</span>
                </blockquote>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px w-8 bg-primary-400 dark:bg-primary-600" />
                  <span className="text-sm text-slate-500 dark:text-slate-500 font-medium">
                    Devansh Gupta
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
