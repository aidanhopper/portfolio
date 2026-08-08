import React from 'react';

export const title = "Education";
export const order = 3;

export interface SchoolItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  gpa?: string;
  coursework?: string[];
}

const schools: SchoolItem[] = [
  {
    institution: "Georgia Institute of Technology",
    degree: "M. S.",
    field: "Computer Science",
    period: "Jan 2026 - May 2028",
    gpa: "4.0",
    coursework: [
      "Computer Networking",
      "Software Analysis",
    ],
  },
  {
    institution: "Washington State University",
    degree: "B. S.",
    field: "Computer Science",
    period: "Sept 2022 - May 2025",
    gpa: "3.7",
    coursework: [
      "Object Oriented Principles",
      "Advanced Data Structures",
      "Systems Programming",
      "Programming Language Design",
      "Design and Analysis of Algorithms",
    ],
  },
];

export default function EducationPage() {
  return (
    <section id="education" className="space-y-10">
      <div className="space-y-10">
        {schools.map((edu, idx) => (
          <article key={idx} className="space-y-3 group">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="font-serif text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
                  {edu.institution}
                </p>
              </div>

              {/* Right-aligned Date & GPA Metrics Column */}
              <div className="flex flex-col items-start sm:items-end shrink-0 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                <span>{edu.period}</span>
                {edu.gpa && (
                  <span className="text-zinc-900 dark:text-zinc-100">GPA {edu.gpa}</span>
                )}
              </div>
            </div>

            {edu.coursework && edu.coursework.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="font-sans text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold">
                  Key Coursework:
                </span>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {edu.coursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
