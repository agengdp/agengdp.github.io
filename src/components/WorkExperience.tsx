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
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="pb-6 border-b border-border/50 last:border-0">
            {/* Company header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="relative h-8 w-8 flex-shrink-0 mt-0.5">
                {exp.companyLogo ? (
                  <img
                    src={exp.companyLogo}
                    alt={`${exp.companyName} logo`}
                    className="h-8 w-8 rounded bg-white object-contain p-0.5 border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.parentElement?.querySelector(
                        ".logo-fallback"
                      ) as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}

                <div
                  className="logo-fallback flex h-8 w-8 items-center justify-center rounded border bg-muted text-xs font-semibold uppercase text-muted-foreground"
                  style={{ display: exp.companyLogo ? "none" : "flex" }}
                >
                  {exp.companyIcon && ICON_MAP[exp.companyIcon]
                    ? React.createElement(ICON_MAP[exp.companyIcon], { size: 16 })
                    : exp.companyName.substring(0, 2)}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">{exp.companyName}</h3>
                  {exp.isCurrentEmployer && (
                    <Badge variant="default" className="h-4 px-1.5 text-[9px] font-semibold">
                      Current
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Positions */}
            <div className="space-y-4 pl-11">
              {exp.positions.map((pos, posIdx) => {
                const bullets = pos.description
                  .split("\n")
                  .map((line) => line.replace(/^-\s*/, "").trim())
                  .filter(Boolean);

                return (
                  <div key={pos.id}>
                    {/* Title, period, type */}
                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h4 className="text-sm font-medium text-foreground">{pos.title}</h4>
                        <span className="text-xs text-muted-foreground">{pos.employmentPeriod}</span>
                      </div>
                      <span className="text-xs text-muted-foreground/70">{pos.employmentType}</span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-1 mb-3">
                      {bullets.map((bullet, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground leading-relaxed">
                          • {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {pos.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-[9px] h-4 px-1.5 font-normal"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Divider between positions within same company */}
                    {posIdx < exp.positions.length - 1 && (
                      <div className="my-4 border-t border-border/30" />
                    )}
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