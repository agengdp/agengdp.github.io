import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const items = [
  { label: "WordPress Development", href: "/services/wordpress-development" },
  { label: "NextJS Development", href: "/services/nextjs-development" },
  { label: "Full Stack Development", href: "/services/full-stack-development" },
];

export default function ServicesDropdown({ active }: { active?: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              "h-auto rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent " +
              (active ? "bg-accent text-foreground" : "text-muted-foreground")
            }
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[260px] gap-1 p-2">
              <li>
                <a
                  href="/services"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  <div className="font-medium">All Services</div>
                  <div className="text-xs text-muted-foreground">
                    Overview and packages
                  </div>
                </a>
              </li>
              {items.map((it) => (
                <li key={it.href}>
                  <a
                    href={it.href}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
