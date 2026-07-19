import React from 'react';
import FeaturedWorks from './FeaturedWorks';

export default function Works() {
  return (
    <div className="pt-12">
      <div className="max-w-4xl mx-auto px-6 pt-16 text-center space-y-2">
        {/* FIX: replaced text-foreground → text-foreground, text-foreground → text-muted-foreground */}
        <h1 className="text-4xl font-black text-foreground tracking-tight">
          System Engineering Index
        </h1>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Production-ready operational applications and architectures built from scratch.
        </p>
      </div>
      <FeaturedWorks />
    </div>
  );
}
