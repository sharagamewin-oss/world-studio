
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Globe2,
  Layers3,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Globe2,
    title: "Build entire worlds",
    description:
      "Create unique universes with their own history, geography, cultures, and rules.",
  },
  {
    icon: Users,
    title: "Bring characters to life",
    description:
      "Develop characters, relationships, personalities, and the stories that connect them.",
  },
  {
    icon: Layers3,
    title: "Organize your ideas",
    description:
      "Keep your locations, timelines, lore, and creative notes together in one studio.",
  },
  {
    icon: BookOpen,
    title: "Tell your stories",
    description:
      "Turn your worldbuilding ideas into stories, chapters, and unforgettable adventures.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="container">
        <nav className="flex h-20 items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
              <Compass size={21} />
            </div>
            <span className="text-lg font-bold tracking-wide">
              WORLD <span className="text-violet-300">STUDIO</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden px-3 py-2 text-sm text-gray-300 transition hover:text-white sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="button button-primary"
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </header>

      <section className="container relative overflow-hidden py-24 text-center md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-16 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs font-medium tracking-wide text-violet-200">
            <Sparkles size={14} />
            YOUR IMAGINATION HAS NO LIMITS
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Every great story
            <br />
            begins with a{" "}
            <span className="text-gradient">world.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
            Create universes, develop characters, design places, and bring
            your stories to life. Everything you imagine deserves a world
            of its own.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="button button-primary px-7 py-3"
            >
              Create your first world <ArrowRight size={17} />
            </Link>

            <a
              href="#features"
              className="button button-secondary px-7 py-3"
            >
              Explore the studio
            </a>
          </div>

          <div className="mt-20 flex items-center justify-center gap-3 text-xs tracking-[0.2em] text-gray-600">
            <span className="h-px w-10 bg-gray-700" />
            IMAGINE · CREATE · DISCOVER
            <span className="h-px w-10 bg-gray-700" />
          </div>
        </div>
      </section>

      <section id="features" className="container section">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-violet-300">
            YOUR CREATIVE UNIVERSE
          </p>
          <h2 className="section-heading">
            Everything your world needs
          </h2>
          <p className="section-description mx-auto">
            One place to imagine, develop, and organize every part of
            your fictional universe.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="card group p-6"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 transition group-hover:bg-violet-400/20">
                  <Icon size={23} />
                </div>

                <h3 className="mb-3 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="about" className="container pb-24 pt-10">
        <div className="card relative overflow-hidden px-7 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />

          <div className="relative">
            <div className="mb-5 flex justify-center text-violet-300">
              <Sparkles size={28} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your next universe starts here.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
              Whether you are creating a fantasy kingdom, a distant
              galaxy, or an entirely new reality, WORLD STUDIO gives
              your imagination a place to grow.
            </p>

            <Link
              href="/signup"
              className="button button-primary mt-8"
            >
              Start creating <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="container border-t border-white/10 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
          <span>© {new Date().getFullYear()} WORLD STUDIO</span>
          <span>Built for worlds yet to be imagined.</span>
        </div>
      </footer>
    </main>
  );
}
