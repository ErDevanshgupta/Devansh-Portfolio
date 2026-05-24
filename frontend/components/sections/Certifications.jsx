'use client';
import { useEffect, useState } from 'react';
import { getCertifications } from '@/lib/api';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { ExternalLink, CheckCircle2, Clock, X, Search, Filter } from 'lucide-react';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    getCertifications()
      .then(data => setCerts(data || []))
      .catch(console.error);
  }, []);

  const safeCerts = certs || [];
  
  const sortedCerts = [...safeCerts].sort((a, b) => {
    if (a.status === 'Completed' && b.status !== 'Completed') return -1;
    if (a.status !== 'Completed' && b.status === 'Completed') return 1;
    return 0;
  });

  const featuredCerts = sortedCerts.filter(c => c.featured).slice(0, 6);
  
  const filteredCerts = sortedCerts.filter(c => {
    if (filterCategory !== 'All' && c.category !== filterCategory) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.provider.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories = ['All', ...new Set(sortedCerts.map(c => c.category))];

  const CertCard = ({ cert }) => (
    <div className="group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary-900/10 hover:border-primary-400/50 dark:hover:border-primary-500/30 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-cyan-500/5 transition-colors pointer-events-none" />
      
      {/* Cover Photo */}
      {cert.certificateImage && (
        <div className="w-full h-32 md:h-40 overflow-hidden relative border-b border-slate-200 dark:border-white/[0.08]">
          <div className="absolute inset-0 bg-dark-900/20 mix-blend-multiply z-10" />
          <img src={cert.certificateImage} alt={`${cert.title} cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col relative z-10">
        
        {/* Top */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-2 shrink-0">
            {cert.logo ? <img src={cert.logo} alt={cert.provider} className="w-full h-full object-contain" /> : <div className="text-slate-400 font-bold text-xl">{cert.provider.charAt(0)}</div>}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-primary-200 dark:border-primary-800/40 text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20">
              {cert.category}
            </span>
            {cert.status === 'Completed' ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold"><CheckCircle2 size={12} /> Completed</span>
            ) : cert.status === 'In Progress' ? (
              <span className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold"><Clock size={12} /> In Progress</span>
            ) : null}
          </div>
        </div>

        {/* Middle */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">{cert.title}</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">{cert.provider}</p>
        {cert.description && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">{cert.description}</p>}

        {/* Bottom */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {cert.tags?.slice(0, 4).map(t => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5">
              {t}
            </span>
          ))}
          {cert.tags?.length > 4 && <span className="text-[10px] font-mono px-2 py-0.5 text-slate-400">+{cert.tags.length - 4}</span>}
        </div>
      </div>

      {/* Footer */}
      {(cert.issueDate || cert.certificateUrl) && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-dark-900/50 flex justify-between items-center relative z-10">
          <span className="text-[11px] text-slate-500 font-medium">
            {cert.issueDate ? `Issued: ${new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : cert.credentialId ? `ID: ${cert.credentialId}` : ''}
          </span>
          {cert.certificateUrl && (
            <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              Verify <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}
    </div>
  );

  if (safeCerts.length === 0) return null;

  return (
    <section id="certifications" className="section-container">
      <SectionHeader 
        label="05. Credentials" 
        title="Continuous Learning & Certifications" 
        subtitle="Constantly expanding my engineering capabilities across cloud, AI, systems design, and emerging technologies."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCerts.map((cert, i) => (
          <AnimatedSection key={cert._id} delay={i * 0.1}>
            <CertCard cert={cert} />
          </AnimatedSection>
        ))}
      </div>

      {safeCerts.length > 6 && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:shadow-lg dark:hover:shadow-primary-900/20"
          >
            View All Certifications ({safeCerts.length}) <ExternalLink size={16} />
          </button>
        </div>
      )}

      {/* View All Modal */}
      {showAll && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen p-4 md:p-8 flex justify-center">
            <div className="bg-slate-50 dark:bg-dark-950 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="p-6 md:p-10 border-b border-slate-200 dark:border-white/10 flex justify-between items-start sticky top-0 bg-slate-50/90 dark:bg-dark-950/90 backdrop-blur-xl z-20">
                <div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">All Certifications</h2>
                  <p className="text-slate-500">Technical learning and professional credentials.</p>
                </div>
                <button onClick={() => setShowAll(false)} className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-10 bg-white/50 dark:bg-transparent">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search certifications..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-slate-700 dark:text-white focus:outline-none focus:border-primary-500 transition-colors shadow-sm"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => setFilterCategory(cat)}
                        className={`whitespace-nowrap px-4 py-3 rounded-xl border text-sm font-semibold transition-all shrink-0 ${filterCategory === cat ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-500/20' : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-primary-400 dark:hover:border-primary-700'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCerts.map(cert => <CertCard key={cert._id} cert={cert} />)}
                  {filteredCerts.length === 0 && <div className="col-span-full py-20 text-center text-slate-500">No certifications found matching your filters.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
