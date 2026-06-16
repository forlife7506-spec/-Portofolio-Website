import { Github, Linkedin, MessageSquare, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/forlife7506-spec" },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/muhammad-maulana-malik-ibrahim-2250b7417/",
  },
  { label: "WhatsApp", icon: MessageSquare, href: "https://wa.me/6289528285875" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative mx-auto max-w-7xl px-6 pb-12 pt-32">
      <div className="glass-card relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Let's build something rare
        </p>
        <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Have a project in mind?
          <br />
          <span className="italic font-light text-foreground/70">Write to me directly.</span>
        </h2>

        <a
          href="mailto:nyxius.dev@gmail.com"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
        >
          <Mail size={15} />
          nyxius.dev@gmail.com
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        <div className="mt-14 flex flex-col gap-8 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex items-center gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white hover:text-black"
                >
                  <Icon size={16} className="transition-transform group-hover:scale-110" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground sm:items-end">
            <p>Nyxius — Independent Developer & Design Practice</p>
            <p className="font-mono">© {year} All rights reserved · Crafted with intention</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
