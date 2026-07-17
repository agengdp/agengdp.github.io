import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronDown, Code, Building, Building2, User, Globe } from "lucide-react";

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
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group border border-border rounded-lg bg-card/30 hover:bg-card/60 transition-all duration-200 overflow-hidden"
          >
            {/* Header - Click to expand */}
            <button
              onClick={() => toggleOpen(exp.id)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3 text-left flex-1">
                <div className="relative h-10 w-10 flex-shrink-0">
                  {exp.companyLogo ? (
                    <img
                      src={exp.companyLogo}
                      alt={`${exp.companyName} logo`}
                      className="h-10 w-10 rounded bg-white object-contain p-0.5 border shadow-sm"
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
                    className="logo-fallback flex h-10 w-10 items-center justify-center rounded border bg-muted text-sm font-semibold uppercase text-muted-foreground"
                    style={{ display: exp.companyLogo ? "none" : "flex" }}
                  >
                    {exp.companyIcon && ICON_MAP[exp.companyIcon]
                      ? React.createElement(ICON_MAP[exp.companyIcon], { size: 18 })
                      : exp.companyName.substring(0, 2)}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-foreground">
                      {exp.companyName}
                    </h3>
                    {exp.isCurrentEmployer && (
                      <Badge variant="default" className="h-5 px-1.5 text-[10px] font-semibold">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {exp.positions.length} position{exp.positions.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                  openIds.has(exp.id) ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded content */}
            {openIds.has(exp.id) && (
              <div className="border-t border-border bg-background/40 px-4 py-4 space-y-4">
                {exp.positions.map((pos, posIdx) => {
                  const bullets = pos.description
                    .split("\n")
                    .map((line) => line.replace(/^-\s*/, "").trim())
                    .filter(Boolean);

                  return (
                    <div key={pos.id} className={posIdx > 0 ? "pt-4 border-t border-border/50" : ""}>
                      {/* Position title and date */}
                      <div className="flex flex-col gap-1 mb-3">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{pos.title}</h4>
                          <span className="text-xs text-muted-foreground">{pos.employmentPeriod}</span>
                        </div>
                        <span className="text-xs text-muted-foreground/70 font-medium">
                          {pos.employmentType}
                        </span>
                      </div>

                      {/* Achievements/bullets */}
                      <ul className="space-y-2 mb-4">
                        {bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {pos.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-[11px] h-5 px-2 font-normal"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}