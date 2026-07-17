import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Code, Building, Building2, User, Globe, ChevronDown, MapPin } from "lucide-react";

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
  location?: string;
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
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set([experiences[0]?.id]));

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={className}>
      <div className="relative space-y-0">
        {/* Timeline line */}
        <div className="absolute left-4 top-8 bottom-0 w-px bg-border/40" />

        {experiences.map((exp, idx) => (
          <div key={exp.id} className="relative pb-8 last:pb-0">
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary border-2 border-background" />

            {/* Company card */}
            <div className="ml-8">
              {/* Header - company + location + toggle */}
              <button
                onClick={() => toggleOpen(exp.id)}
                className="w-full text-left hover:opacity-80 transition-opacity group py-2"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Company icon */}
                    <div className="relative h-6 w-6 flex-shrink-0 mt-0.5">
                      {exp.companyLogo ? (
                        <img
                          src={exp.companyLogo}
                          alt={`${exp.companyName} logo`}
                          className="h-6 w-6 rounded bg-white object-contain p-0.5"
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
                        className="logo-fallback flex h-6 w-6 items-center justify-center rounded border bg-muted text-xs font-semibold text-muted-foreground"
                        style={{ display: exp.companyLogo ? "none" : "flex" }}
                      >
                        {exp.companyIcon && ICON_MAP[exp.companyIcon]
                          ? React.createElement(ICON_MAP[exp.companyIcon], { size: 14 })
                          : exp.companyName.substring(0, 1)}
                      </div>
                    </div>

                    {/* Company name + current badge */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-foreground">{exp.companyName}</h3>
                        {exp.isCurrentEmployer && (
                          <Badge variant="default" className="h-4 px-1.5 text-[8px] font-semibold">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side: location + chevron */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {exp.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={14} className="text-primary/60" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform duration-300 ${
                        openIds.has(exp.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </button>

              {/* Expandable content */}
              {openIds.has(exp.id) && (
                <div className="space-y-4 pt-2">
                  {exp.positions.map((pos, posIdx) => {
                    const bullets = pos.description
                      .split("\n")
                      .map((line) => line.replace(/^-\s*/, "").trim())
                      .filter(Boolean);

                    return (
                      <div key={pos.id}>
                        {/* Position header */}
                        <div className="mb-3">
                          <div className="flex flex-wrap items-baseline gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-foreground">{pos.title}</h4>
                            <span className="text-xs text-muted-foreground/70">
                              {pos.employmentType}
                            </span>
                            <span className="text-xs text-muted-foreground/70">·</span>
                            <span className="text-xs text-muted-foreground/70">
                              {pos.employmentPeriod}
                            </span>
                          </div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-1.5 mb-3">
                          {bullets.map((bullet, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground leading-relaxed">
                              • {bullet}
                            </li>
                          ))}
                        </ul>

                        {/* Skills tags */}
                        <div className="flex flex-wrap gap-1">
                          {pos.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-[9px] h-5 px-1.5 font-normal bg-muted/50 text-muted-foreground/80"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Divider between positions */}
                        {posIdx < exp.positions.length - 1 && (
                          <div className="my-4 border-t border-border/20" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}