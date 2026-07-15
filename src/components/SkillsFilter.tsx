import React, { useState } from 'react';
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const SKILLS: Skill[] = [
  // Programming Languages
  { name: "PHP", icon: "/assets/skills/php.svg", category: "Languages" },
  { name: "JavaScript", icon: "/assets/skills/javascript.svg", category: "Languages" },
  { name: "TypeScript", icon: "/assets/skills/typescript.svg", category: "Languages" },
  { name: "VB .NET", icon: "/assets/skills/dotnetcore.svg", category: "Languages" },
  { name: "Go", icon: "/assets/skills/go.svg", category: "Languages" },
  
  // Frameworks & Libraries
  { name: "Laravel", icon: "/assets/skills/laravel.svg", category: "Frameworks & Libraries" },
  { name: "Lumen", icon: "/assets/skills/lumen.svg", category: "Frameworks & Libraries" },
  { name: "Slim Framework", icon: "/assets/skills/slim.jpg", category: "Frameworks & Libraries" },
  { name: "WordPress", icon: "/assets/skills/wordpress.svg", category: "Frameworks & Libraries" },
  { name: "CodeIgniter", icon: "/assets/skills/codeigniter.svg", category: "Frameworks & Libraries" },
  { name: "Next.js", icon: "/assets/skills/nextjs.svg", category: "Frameworks & Libraries" },
  { name: "React", icon: "/assets/skills/react.svg", category: "Frameworks & Libraries" },
  { name: "Vue.js", icon: "/assets/skills/vuejs.svg", category: "Frameworks & Libraries" },
  { name: "jQuery", icon: "/assets/skills/jquery.svg", category: "Frameworks & Libraries" },
  { name: "Inertia.js", icon: "/assets/skills/inertia.png", category: "Frameworks & Libraries" },
  { name: "Express", icon: "/assets/skills/express.svg", category: "Frameworks & Libraries" },
  { name: "Gin", icon: "/assets/skills/gin.png", category: "Frameworks & Libraries" },
  { name: "Chi", icon: "/assets/skills/chi.svg", category: "Frameworks & Libraries" },
  { name: "GoFiber", icon: "/assets/skills/gofiber.svg", category: "Frameworks & Libraries" },
  { name: "Astro", icon: "/assets/skills/astro.svg", category: "Frameworks & Libraries" },
  { name: "Hugo", icon: "/assets/skills/hugo.svg", category: "Frameworks & Libraries" },
  { name: "Tailwind CSS", icon: "/assets/skills/tailwindcss.svg", category: "Frameworks & Libraries" },
  { name: "Socket.io", icon: "/assets/skills/socketio.svg", category: "Frameworks & Libraries" },
  
  // Databases
  { name: "MySQL", icon: "/assets/skills/mysql.svg", category: "Databases" },
  { name: "PostgreSQL", icon: "/assets/skills/postgresql.svg", category: "Databases" },
  { name: "MongoDB", icon: "/assets/skills/mongodb.svg", category: "Databases" },
  { name: "SQLite", icon: "/assets/skills/sqlite.svg", category: "Databases" },
  { name: "Redis", icon: "/assets/skills/redis.svg", category: "Databases" },
  
  // Tools
  { name: "GitHub", icon: "/assets/skills/github.svg", category: "Tools" },
  { name: "GitLab", icon: "/assets/skills/gitlab.svg", category: "Tools" },
  { name: "Jira", icon: "/assets/skills/jira.svg", category: "Tools" },
  { name: "CI/CD", icon: "/assets/skills/githubactions.svg", category: "Tools" },
  { name: "Docker", icon: "/assets/skills/docker.svg", category: "Tools" },
  { name: "Kubernetes", icon: "/assets/skills/kubernetes.svg", category: "Tools" },
  { name: "Digital Ocean", icon: "/assets/skills/digitalocean.svg", category: "Tools" },
  { name: "GCP", icon: "/assets/skills/googlecloud.svg", category: "Tools" },
  { name: "MinIO", icon: "/assets/skills/minio.svg", category: "Tools" },
  { name: "Grafana", icon: "/assets/skills/grafana.svg", category: "Tools" },
  { name: "Prometheus", icon: "/assets/skills/prometheus.svg", category: "Tools" },
  { name: "Loki", icon: "/assets/skills/loki.svg", category: "Tools" },
  { name: "Elasticsearch", icon: "/assets/skills/elasticsearch.svg", category: "Tools" },
  { name: "aaPanel", icon: "/assets/skills/aapanel.png", category: "Tools" },
  { name: "PM2", icon: "/assets/skills/pm2.svg", category: "Tools" },
  { name: "Portainer", icon: "/assets/skills/portainer.svg", category: "Tools" },
  { name: "JWT", icon: "/assets/skills/jwt.svg", category: "Tools" },
  { name: "Microservices", icon: "/assets/skills/microservices.svg", category: "Tools" },
];

const CATEGORIES = ["All", "Languages", "Frameworks & Libraries", "Databases", "Tools"];

export const SkillsFilter = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = SKILLS.filter(skill => {
    const matchesTab = activeTab === "All" || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-full transition-all border",
                activeTab === category
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-card text-muted-foreground/70 hover:bg-accent hover:text-accent-foreground border-border hover:border-primary/20"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-40 lg:w-48">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/40"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full bg-card/40 border border-border/50 rounded-full py-1 pl-7 pr-3 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-muted-foreground/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-2 min-h-[60px]">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div 
              key={skill.name} 
              className="group relative flex aspect-square items-center justify-center rounded-md border border-border/30 bg-card/10 transition-all hover:scale-110 hover:bg-card/30 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40 animate-in fade-in zoom-in duration-500 hover:z-20" 
              title={skill.name}
            >
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="h-[85%] w-[85%] object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300 opacity-90 group-hover:opacity-100" 
                loading="lazy" 
              />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-1.5 py-0.5 text-[9px] font-semibold text-popover-foreground shadow-xl opacity-0 transition-all group-hover:opacity-100 border z-30 pointer-events-none translate-y-1 group-hover:translate-y-0">
                {skill.name}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-muted-foreground/50 text-xs italic">
            No skills found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
