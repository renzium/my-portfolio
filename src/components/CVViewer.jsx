import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CVViewer() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(`The slog is: ${id}`)

  useEffect(() => {
    const fetchTargetCV = async () => {
      try {
        setLoading(true);
        const jsonModules = import.meta.glob('../cv_jsons/*.json');
        const targetPath = `../cv_jsons/${id}.json`;

        if (jsonModules[targetPath]) {
          const importedModule = await jsonModules[targetPath]();
          setCv(importedModule.default || importedModule);
        } else {
          console.error(`File path target not found: ${targetPath}`);
          setCv(null);
        }
      } catch (error) {
        console.error("Critical error pulling target structural layout data:", error);
        setCv(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTargetCV();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center text-[--emerald] font-mono text-sm tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[--emerald] animate-pulse"></div>
          [SYS_LOG]: Resolving target CV matrix parameters...
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4 text-foreground font-sans">
        <p className="text-sm font-semibold text-muted-foreground font-mono">
          [ERROR_404]: Requested profile matrix could not be resolved.
        </p>
        <Link
          to="/cvs"
          className="text-[--emerald] font-bold hover:underline text-xs tracking-wider uppercase"
        >
          ← Return to Collection
        </Link>
      </div>
    );
  }

  const fullName = cv.personalInfo?.fullName || "Lawrence Ughonu";
  const email = cv.personalInfo?.email || "";
  const phone = cv.personalInfo?.phone || "";
  const location = cv.personalInfo?.location || "";
  const website = cv.personalInfo?.website || "";
  const linkedin = cv.personalInfo?.linkedin || "";
  const github = cv.personalInfo?.github || "";
  const summaryText = cv.summary || "";
  const rawSkills = cv.technicalSkills || cv.skills || [];
  const rawExperience = cv.experience || cv.workHistory || [];
  const projectList = cv.projects || [];
  const educationList = cv.education || [];

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans text-slate-900 print:bg-background print:pt-0 print:pb-0 print:px-0 print:min-h-0">
      <div className="max-w-4xl mx-auto space-y-6 print:max-w-none print:space-y-0">

        {/* Navigation & Action Header Strip */}
        <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border text-foreground print:hidden shadow-lg">
          <Link
            to="/"
            className="text-xs font-bold tracking-wider uppercase text-muted-foreground hover:text-[--emerald] transition-colors flex items-center gap-2"
          >
            ‹ Back
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-[--emerald] text-muted-foreground text-xs font-extrabold px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-md tracking-wider uppercase"
          >
            Print PDF / Download
          </button>
        </div>

        {/*
          FIX: Added "cv-canvas" class here.
          This class is targeted in index.css to prevent the dark mode
          .bg-white override from turning this canvas dark.
          The CV print canvas must ALWAYS be white — in both light and dark mode.
        */}
        <div className="cv-canvas bg-white shadow-2xl rounded-2xl p-8 md:p-16 border border-slate-200 text-slate-800 font-sans leading-relaxed selection:bg-emerald-100 print:shadow-none print:rounded-none print:border-none print:p-8 print:m-0">

          {/* Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-200 pb-6">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
              {fullName}
            </h1>
            <p className="text-sm font-bold text-emerald-600 tracking-wide uppercase">
              {/* {cv.name || cv.role || "Software Development Engineer"} */}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500 pt-2 max-w-2xl mx-auto">
              {email && <span>{email}</span>}
              {phone && <><span className="text-slate-300">•</span><span>{phone}</span></>}
              {location && <><span className="text-slate-300">•</span><span>{location}</span></>}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs font-bold text-slate-700 pt-1">
              {website && (
                <a href={website} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                  {website.replace('https://', '')}
                </a>
              )}
              {linkedin && (
                <><span className="text-slate-300">•</span>
                <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                  {linkedin}
                </a></>
              )}
              {github && (
                <><span className="text-slate-300">•</span>
                <a href={`https://${github}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                  {github}
                </a></>
              )}
            </div>
          </div>

          {/* Summary */}
          {summaryText && (
            <div className="py-6 border-b border-slate-200 space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Professional Summary
              </h2>
              <p className="text-[13px] text-slate-700 font-normal leading-relaxed text-justify">
                {summaryText}
              </p>
            </div>
          )}

          {/* Skills */}
          {rawSkills.length > 0 && (
            <div className="py-6 border-b border-slate-200 space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Technical Core Competencies
              </h2>
              <div className="grid grid-cols-1 gap-2 text-[13px] text-slate-700">
                {rawSkills.map((skillGroup, idx) => (
                  <div key={idx} className="text-justify leading-relaxed">
                    <strong className="text-slate-900 font-bold">{skillGroup.category}:</strong>{" "}
                    {skillGroup.skills}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {rawExperience.length > 0 && (
            <div className="py-6 border-b border-slate-200 space-y-5">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {rawExperience.map((job, idx) => {
                  const bulletPoints = job.achievements || job.highlights || [];
                  const durationSpan = job.period || (job.startDate && `${job.startDate} — ${job.endDate || 'Present'}`) || "";

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{job.title || job.position}</h3>
                          <p className="text-xs font-semibold text-slate-500">
                            {job.company}{job.location && ` • ${job.location}`}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {durationSpan}
                        </span>
                      </div>
                      {bulletPoints.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 text-[13px] text-slate-700 font-normal text-justify">
                          {bulletPoints.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {projectList.length > 0 && (
            <div className="py-6 border-b border-slate-200 space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Technical Projects
              </h2>
              <div className="space-y-4">
                {projectList.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{proj.name}</h4>
                      {proj.technologies && (
                        <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
                          {proj.technologies}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-slate-700 text-justify leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educationList.length > 0 && (
            <div className="py-6 space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Education
              </h2>
              {educationList.map((edu, idx) => (
                <div key={idx} className="space-y-1 text-sm">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">{edu.institution}</p>
                  {edu.note && (
                    <p className="text-[12px] text-slate-600 text-justify pt-1 leading-relaxed">
                      {edu.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
