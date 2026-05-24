export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-16 text-center">
      <span className="text-xs font-mono text-primary-600 dark:text-primary-400 tracking-[0.3em] uppercase mb-3 block">
        {label}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
      {subtitle && <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
