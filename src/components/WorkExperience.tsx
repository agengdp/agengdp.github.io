import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Code, Building, Building2, User, Globe } from "lucide-react";

const ICON_MAP = {
  code: Code,
  business: Briefcase,
  building: Building,
  building2: Building2,
  user: User,
  globe: Globe,
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyIcon?: keyof typeof ICON_MAP;
  positions: Array<{
    id: string;
    title: string;
    employmentPeriod: string;
    employmentType: string;
    icon?: "code" | "business" | "building";
    description: string;
    skills: string[];
  }>;
  isCurrentEmployer?: boolean;
};

export function WorkExperience({
  experiences,
  className,
}: {
  experiences: ExperienceItemType[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="space-y-10">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-full before:w-px before:bg-border last:before:hidden">
            <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-primary" />
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 flex-shrink-0">
                  {exp.companyLogo ? (
                    <img 
                      src={exp.companyLogo} 
                      alt={`${exp.companyName} logo`} 
                      className="h-8 w-8 rounded bg-white object-contain p-0.5 border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }} 
                    />
                  ) : null}
                  
                  <div 
                    className="logo-fallback flex h-8 w-8 items-center justify-center rounded border bg-muted text-xs font-semibold uppercase text-muted-foreground"
                    style={{ display: exp.companyLogo ? 'none' : 'flex' }}
                  >
                    {exp.companyIcon && ICON_MAP[exp.companyIcon] ? (
                      React.createElement(ICON_MAP[exp.companyIcon], { size: 16 })
                    ) : (
                      exp.companyName.substring(0, 2)
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold">{exp.companyName}</h3>
                    {exp.isCurrentEmployer && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">Current</Badge>
                    )}
                  </div>
                </div>
              </div>

              {exp.positions.map((pos) => {
                const clientsMentioned = pos.description.match(/Bank [^,\n]+|Telkom[^,\n]+|Gojek|Traveloka|Tokopedia|Pertamina/g);
                const bullets = pos.description
                  .split("\n")
                  .map((line) => line.replace(/^-\s*/, "").trim())
                  .filter(Boolean);

                return (
                  <div key={pos.id} className="mt-2">
                    <div className="flex w-full flex-wrap items-center gap-x-2 text-sm text-left">
                      <span className="font-medium text-foreground/90">{pos.title}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="text-xs text-muted-foreground">{pos.employmentPeriod}</span>
                    </div>

                    {clientsMentioned && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {Array.from(new Set(clientsMentioned)).map((client) => (
                          <span key={client} className="text-[9px] font-medium uppercase tracking-tight text-muted-foreground/60 bg-muted/30 px-1 py-0.5 rounded border border-border/50">
                            {client}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 space-y-3">
                      <ul className="list-disc space-y-1.5 pl-4 text-xs text-muted-foreground">
                        {bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1">
                        {pos.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-[10px] h-4 px-1">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}