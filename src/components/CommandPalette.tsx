import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type Item = { label: string; href: string; keywords?: string };

const items: Item[] = [
  { label: "Projects", href: "/projects", keywords: "work" },
  { label: "Services", href: "/services", keywords: "wordpress nextjs fullstack" },
  { label: "WordPress Development", href: "/services/wordpress-development", keywords: "wordpress woocommerce acf" },
  { label: "NextJS Development", href: "/services/nextjs-development", keywords: "nextjs react app router" },
  { label: "Full Stack Development", href: "/services/full-stack-development", keywords: "node postgresql docker" },
  { label: "About", href: "/about", keywords: "bio profile resume" },
  { label: "Blog", href: "/blog", keywords: "writing" },
  { label: "Contact", href: "/contact", keywords: "hire email" },
];

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function toggle() {
      setOpen((o) => !o);
    }

    function onKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    // @ts-ignore
    window.addEventListener("open-command-palette", toggle);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // @ts-ignore
      window.removeEventListener("open-command-palette", toggle);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    window.location.href = href;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command>
          <CommandInput placeholder="Search " />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {items.map((it) => (
                <CommandItem
                  key={it.href}
                  value={`${it.label} ${it.keywords ?? ""}`}
                  onSelect={() => go(it.href)}
                >
                  {it.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
