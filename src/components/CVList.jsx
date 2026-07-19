import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CVList() {
  const [cvs, setCvs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Vite native directory scanner
      const jsonModules = import.meta.glob('../cv_jsons/*.json', { eager: true });
      const cvList = [];

      Object.entries(jsonModules).forEach(([path, cvContent]) => {
        try {
          // Extract the filename without extensions to match router expectations
          const fileSlug = path.split('/').pop().replace('.json', '');
          const data = cvContent.default || cvContent;

          // 1. Fallback to data.id or fileSlug if id doesn't exist
          const rawId = data.id || fileSlug; 
          const idParts = rawId.split('-');
          
          // Company name is the first block, capitalize it cleanly
          const rawCompany = idParts[0] || "General";
          const company = rawCompany.charAt(0).toUpperCase() + rawCompany.slice(1);

          // Job Target Application is the remaining string, capitalized nicely
          const applicationTarget = idParts.length > 1 
            ? idParts.slice(1).join(' ').toUpperCase() 
            : "GENERAL APPLICATION";

          // 2. Parse skills array out of schema variants
          let parsedKeywords = [];
          if (Array.isArray(data.technicalSkills)) {
            parsedKeywords = data.technicalSkills.map(s => s.skills || '').filter(Boolean);
          } else if (Array.isArray(data.skills)) {
            parsedKeywords = data.skills;
          }

          cvList.push({
            slug: fileSlug, // Crucial: Router expects filename slug to match file system queries
            company: company,
            target: applicationTarget,
            keywords: parsedKeywords.join(', ').split(', ').map(k => k.trim()).filter(k => k.length > 0)
          });
        } catch (singleFileError) {
          console.warn(`Skipping corrupted file entry [${path}]:`, singleFileError);
        }
      });

      // Sort alphabetically by Company target
      cvList.sort((a, b) => a.company.localeCompare(b.company));
      setCvs(cvList);
    } catch (error) {
      console.error("Critical error building file matrix:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredCVs = cvs.filter(cv => 
    cv.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.keywords?.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-emerald-400 font-mono text-sm tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          [SYS_LOG]: Aggregating local portfolio records...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen pt-28 pb-20 px-6 text-slate-100 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Segment */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            My CV Collection
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Tailored professional profiles optimized for specific enterprise roles and target countries.
          </p>
          <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {filteredCVs.length} Active Targets Found
          </span>
        </div>

        {/* Search Block */}
        <div className="bg-slate-900 shadow-xl rounded-2xl p-2 border border-slate-800 max-w-xl mx-auto">
          <input 
            type="text"
            placeholder="Search by company, target role, or framework stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Main Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCVs.length > 0 ? (
            filteredCVs.map((cv) => (
              <div 
                key={cv.slug} 
                className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl shadow-lg hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between items-start gap-6 group hover:-translate-y-1"
              >
                <div className="space-y-4 w-full">
                  {/* Top Line: Company Badge & Application Target */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg">
                      {cv.company}
                    </span>
                    <span className="text-[10px] tracking-wider text-slate-500 font-bold uppercase">
                      {cv.target}
                    </span>
                  </div>

                  {/* Main Header Content */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
                      Candidate Profile
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-100 group-hover:text-emerald-400 transition-colors tracking-tight">
                      {cv.company}
                    </h2>
                    <p className="text-sm text-slate-400 font-medium pt-0.5">
                      <strong className="text-slate-500 font-normal">Targeting Role:</strong> {cv.target}
                    </p>
                  </div>
                  
                  {/* Skill Badge Section */}
                  <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-hidden">
                    {cv.keywords.slice(0, 6).map((word, wIdx) => (
                      <span key={wIdx} className="bg-slate-950 text-slate-400 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-slate-800/60">
                        {word}
                      </span>
                    ))}
                    {cv.keywords.length > 6 && (
                      <span className="text-[11px] text-slate-500 font-semibold pt-1 pl-1">
                        +{cv.keywords.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Router Action Link */}
                <Link 
                  to={`/cvs/${cv.slug}`}
                  className="w-full text-center bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold py-3 rounded-xl hover:bg-emerald-400 hover:text-slate-950 hover:border-emerald-400 transition-colors shadow-sm tracking-wider uppercase"
                >
                  View ATS Profile →
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 font-medium shadow-sm">
              No tailored CV variants match your current filter search criteria.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}