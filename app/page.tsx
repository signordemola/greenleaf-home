"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import { motion } from "framer-motion";

const heroImg = "/images/hero.jpg";
const detailImg = "/images/detail.jpg";
const kitchenImg = "/images/kitchen.jpg";
const cleaner1 = "/images/cleaner-1.jpg";
const cleaner2 = "/images/cleaner-2.jpg";
const cleaner3 = "/images/cleaner-3.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <PublicShell>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-6 pb-24 pt-16 md:grid-cols-12 md:gap-12 md:pt-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Est. 2023 · Austin, Texas
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-tight">
              A quieter way to{" "}
              <em className="italic text-forest">keep house</em>.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Greenleaf is a small, careful cleaning team for homes in East
              Austin, Mueller, and South Lamar. The same crew, every visit.
              Plant-based products. No chemical aftermath.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="inline-flex h-12 items-center rounded-full bg-forest px-7 text-sm font-medium text-forest-foreground transition-opacity hover:opacity-90"
              >
                See your price in 60 seconds
              </Link>
              <Link
                href="/services"
                className="text-sm text-foreground underline-offset-4 hover:underline"
              >
                Browse services →
              </Link>
            </div>
            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border/60 pt-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Homes
                </dt>
                <dd className="mt-1 font-display text-2xl text-foreground">
                  45
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Rating
                </dt>
                <dd className="mt-1 font-display text-2xl text-foreground">
                  4.96★
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Same crew
                </dt>
                <dd className="mt-1 font-display text-2xl text-foreground">
                  98%
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[0_30px_80px_-40px_rgba(45,55,40,0.4)]">
              <Image
                src={heroImg}
                alt="Sun-drenched Austin living room with plants"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 z-10 hidden w-56 rounded-sm bg-cream p-5 shadow-xl md:block"
              >
                <p className="font-display text-sm italic leading-snug text-forest">
                  &quot;We come back to a home that exhales.&quot;
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  — Priya &amp; Sam, Mueller
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-linen/40">
        <motion.div
          className="mx-auto grid max-w-[88rem] gap-px overflow-hidden bg-border/60 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              title: "Standard clean",
              from: "$130",
              note: "Recurring weekly to monthly",
            },
            {
              title: "Deep clean",
              from: "$220",
              note: "First visit or seasonal reset",
            },
            {
              title: "Move-in / move-out",
              from: "$280",
              note: "Empty home, top to bottom",
            },
          ].map((s) => (
            <motion.div
              key={s.title}
              variants={fadeInUp}
              className="bg-background p-8 text-center"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.title}
              </p>
              <p className="mt-4 font-display text-3xl text-foreground">
                From {s.from}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-[88rem] px-6 py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
              <Image
                src={detailImg}
                alt="Plant-based surface cleaner on marble"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="md:col-span-6 md:col-start-7"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              The Greenleaf method
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              No surprises.{" "}
              <em className="italic text-forest">No aftermath.</em>
            </h2>
            <div className="mt-10 space-y-8 text-base leading-relaxed">
              <Pillar
                index="01"
                title="The same crew, every time"
                body="You'll meet your two cleaners on the first visit and see them every visit after. They learn your home — where the cat hides, which drawer the dish towels live in."
              />
              <Pillar
                index="02"
                title="Plant-based, fragrance-free"
                body="We bring our own supplies. Castile, citric acid, hydrogen peroxide. Nothing you wouldn't want your toddler to lick off a counter."
              />
              <Pillar
                index="03"
                title="A portal that respects your time"
                body="Skip a visit, pause for vacation, change your add-ons — without a phone call. We answer texts in under an hour, but you shouldn't need to send one."
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-linen/40 py-28">
        <div className="mx-auto max-w-[88rem] px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap items-end justify-between gap-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                The crew
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
                Six people.{" "}
                <em className="italic text-forest">All of Austin.</em>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              We hire slowly, pay above market, and train for a full month
              before anyone steps into a client&apos;s home alone.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {[
              {
                name: "Maria Robles",
                role: "Lead — Crew A",
                years: "3 yrs",
                img: cleaner1,
              },
              {
                name: "Janelle Whitmore",
                role: "Lead — Crew B",
                years: "2 yrs",
                img: cleaner2,
              },
              {
                name: "Eli Crane",
                role: "Lead — Crew C",
                years: "2 yrs",
                img: cleaner3,
              },
            ].map((p) => (
              <motion.figure key={p.name} variants={fadeInUp} className="group">
                <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-stone/40">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <div>
                    <p className="font-display text-xl text-foreground">
                      {p.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{p.role}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {p.years}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-6 py-28 text-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Said by clients
          </p>
          <div className="mt-10 grid gap-12 md:grid-cols-2 text-left">
            {[
              {
                quote:
                  "I forgot Thursday was cleaning day, came home, and just sat down on the floor of the kitchen because everything smelled like nothing — in the best way.",
                who: "Devon L., East Austin",
                plan: "Bi-weekly · 8 months",
              },
              {
                quote:
                  "The portal is the unsung hero. I paused for a month abroad, came back, resumed, never thought about it.",
                who: "Priya M., Mueller",
                plan: "Weekly · 1.5 years",
              },
            ].map((t) => (
              <blockquote
                key={t.who}
                className="border-l border-forest/40 pl-6"
              >
                <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                  &quot;{t.quote}&quot;
                </p>
                <footer className="mt-6 text-sm text-muted-foreground">
                  <span className="text-foreground">{t.who}</span> · {t.plan}
                </footer>
              </blockquote>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative isolate overflow-hidden bg-forest text-forest-foreground">
        <Image
          src={kitchenImg}
          alt=""
          fill
          className="absolute inset-0 -z-10 object-cover opacity-25"
          sizes="100vw"
        />
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl px-6 py-28 text-center"
        >
          <h2 className="font-display text-5xl leading-tight tracking-tight md:text-6xl text-cream">
            See your price in <em className="italic">60 seconds</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80">
            Five quick questions. No phone tag. We hold your slot the moment you
            book.
          </p>
          <Link
            href="/book"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-cream px-8 text-sm font-medium text-forest transition-opacity hover:opacity-90"
          >
            Start my quote
          </Link>
        </motion.div>
      </section>
    </PublicShell>
  );
}

function Pillar({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div variants={fadeInUp} className="grid grid-cols-[3rem_1fr] gap-5">
      <span className="font-display text-sm text-forest/70">{index}</span>
      <div>
        <h3 className="font-display text-xl text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{body}</p>
      </div>
    </motion.div>
  );
}
