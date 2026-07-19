import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-[--light3] py-10 px-6 print:hidden">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-foreground font-medium">
          © {new Date().getFullYear()} Lawrence Ughonu. All Rights Reserved.
        </p>
        <div className="flex gap-6 text-xs font-bold text-foreground">
          <a href="https://github.com/renzium" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="https://lawrence-ughonu.vercel.app" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Portfolio Portfolio</a>
        </div>
      </div>
    </footer>
  );
}