import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Banknote, CalendarDays, CheckCircle2, Clock3, Phone, ShieldCheck, Star, Truck } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { ValuationForm } from "@/components/valuation-form";
import {
  blogPosts,
  contentPages,
  excerptFromParagraphs,
  getPageBySlug,
  getPostBySlug,
  reviews,
  site,
} from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const pageSlugs = new Set(contentPages.filter((page) => page.slug && page.slug !== "blog").map((page) => page.slug));

  return [
    ...Array.from(pageSlugs).map((slug) => ({ slug })),
    ...blogPosts.filter((post) => !pageSlugs.has(post.slug)).map((post) => ({ slug: post.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  const post = page ? undefined : getPostBySlug(slug);

  if (post) {
    return {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt || excerptFromParagraphs(post.paragraphs, site.description),
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        url: `${site.url}/${slug}/`,
      },
    };
  }

  if (page) {
    return {
      title: `${page.title} | ${site.name}`,
      description: page.excerpt || excerptFromParagraphs(page.paragraphs, site.description),
      alternates: { canonical: `/${slug}` },
    };
  }

  return {};
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  const post = page ? undefined : getPostBySlug(slug);

  if (page) {
    return <ContentPage page={page} slug={slug} />;
  }

  if (post) {
    return <ArticlePage post={post} />;
  }

  notFound();
}

function ArticlePage({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <>
      <SiteHeader />
      <main>
        <article>
          <section className="page-hero">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.88fr)]">
                <div className="max-w-3xl">
                  <div className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-black/64">
                    <CalendarDays size={17} aria-hidden="true" />
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(post.date))}
                  </div>
                  <h1 className="max-w-3xl text-balance text-4xl font-black leading-[1.02] text-black sm:text-5xl lg:text-[3.6rem]">
                    {post.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-black/68 sm:text-xl">
                    {post.excerpt}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-black/10 bg-[linear-gradient(135deg,#101010_0%,#1f1f1f_54%,#ffd21f_55%,#ffe98d_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                  <div className="absolute right-5 top-5 rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/78">
                    Featured guide
                  </div>
                  <div className="relative flex min-h-[280px] items-end justify-between gap-5 sm:min-h-[340px]">
                    <div className="relative z-10 max-w-[14rem] rounded-lg border border-white/12 bg-black/38 p-4 text-white backdrop-blur-sm">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-yellow-300">Sell My Car Today</p>
                      <p className="mt-3 text-sm leading-7 text-white/78">
                        Practical advice, UK market guidance and straightforward tips to help you sell confidently.
                      </p>
                    </div>
                    <Image
                      src="/assets/audi-a6.png"
                      alt={`${post.title} featured image`}
                      width={660}
                      height={495}
                      className="relative z-10 h-auto w-[78%] max-w-[420px] object-contain drop-shadow-[0_28px_34px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-space bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
              <div className="article-body">
                {post.paragraphs.map((paragraph, index) =>
                  index === 0 ? <p key={index} className="lead">{paragraph}</p> : <p key={index}>{paragraph}</p>,
                )}
              </div>
              <aside className="article-aside">
                <h2>Sell your car today</h2>
                <p>Get a free, no-obligation valuation in 30 seconds and speak with a real UK car buyer.</p>
                <ValuationForm variant="sidebar" source="article-sidebar" />
                <a href={site.phoneHref} className="text-link mt-5">
                  <Phone size={17} aria-hidden="true" />
                  {site.phone}
                </a>
              </aside>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

function ContentPage({
  page,
  slug,
}: {
  page: (typeof contentPages)[number];
  slug: string;
}) {
  if (slug === "valuations") {
    return <ValuationsPage />;
  }

  if (slug === "reviews") {
    return <ReviewsPage page={page} />;
  }

  if (slug === "contact-us") {
    return <ContactPage page={page} />;
  }

  if (slug === "sell-my-car") {
    return <SellMyCarPage page={page} />;
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1>{page.title}</h1>
            <p>{page.excerpt || heroCopy(slug)}</p>
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
            <div className="article-body">
              {page.paragraphs.length ? (
                page.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              ) : (
                <p>{heroCopy(slug)}</p>
              )}
            </div>
            <aside className="article-aside">
              <h2>Get A Real Time Valuation in 30 Seconds</h2>
              <p>Value your car online, arrange collection and receive instant payment with no hidden charges.</p>
              <ValuationForm variant="sidebar" source={`${slug}-sidebar`} />
              <Link href="/sell-my-car" className="text-link mt-5">
                Sell My Car <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SellMyCarPage({ page }: { page: (typeof contentPages)[number] }) {
  const heroPoints = [
    { label: "30-second valuation", icon: Clock3 },
    { label: "Free UK collection", icon: Truck },
    { label: "No admin fees", icon: ShieldCheck },
    { label: "Instant bank transfer", icon: Banknote },
  ];

  const featureCards = [
    {
      title: "Incredibly Easy Process",
      text: "Just 3 steps and your work is done. Sell My Car Today values your time, so we make your valuation and appointment booking as painless as possible.",
    },
    {
      title: "Rapid Cash, No Hassle!",
      text: "Get rapid cash without the hassle. Once the amount is agreed, we guarantee a prompt transfer of funds to your bank account.",
    },
    {
      title: "No Hidden Costs",
      text: "Transparency is at the core of our identity. We provide a clear valuation and arrange collection from your location with no hidden fees.",
    },
  ];

  const reasons = [
    "We provide super quick valuations in just 30 seconds and can buy your car in no time.",
    "Fair and competitive prices from a real team, not a faceless platform.",
    "No obligation offers with zero strings attached.",
    "Absolutely no admin fees of any kind.",
    "Instant payment and same-day collection available.",
    "Our team is available to help 24/7.",
  ];

  const sellMyCarFaqs = [
    {
      question: "Why should I sell my car to SellMyCarToday.uk?",
      answer:
        "We make selling your car fast, safe, and stress-free. You get a free online valuation in seconds, a guaranteed price for 7 days, and instant payment when we collect your car. No hidden fees, no waiting around, just a simple and transparent process that puts you in control.",
    },
    {
      question: "How is SellMyCarToday.uk different from other car-buying websites?",
      answer:
        "Unlike many big platforms, we combine the convenience of an instant online quote with the personal service of a local team. You deal directly with our friendly specialists, with no automated lowball offers and no long auctions.",
    },
    {
      question: "Will you buy my car even if it is old or damaged?",
      answer:
        "Yes. We buy cars and vans of any age, mileage, or condition, from nearly new vehicles to those with high mileage or cosmetic damage. Simply enter your registration number and mileage to see your free valuation.",
    },
    {
      question: "How do I get paid when I sell my car to you?",
      answer:
        "Payment is made instantly on collection, usually by secure bank transfer before we drive away. You will see the funds in your account before handing over the keys.",
    },
    {
      question: "Are there any fees or hidden costs?",
      answer:
        "No. Our valuations are 100% free, and collection is included anywhere in the UK. The price we quote is the price we pay, with no admin charges, no listing fees, and no deductions for minor wear and tear.",
    },
  ];

  const concernHeading = page.paragraphs[12] ?? "Are you looking to sell your car quickly and without the hassle?";
  const concernCopyPrimary =
    page.paragraphs[13] ??
    "Selling a car can be tricky, especially when buyers reduce their offer at the last minute or delay payment.";
  const concernCopySecondary =
    page.paragraphs[14] ??
    "We buy cars fast, offer free same-day bank transfer and keep the process straightforward.";
  const concernCopyTertiary =
    page.paragraphs[15] ??
    "You can avoid the uncertainty of private buyers while still receiving a fair price.";

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-grid relative overflow-hidden border-b border-black/10 bg-[radial-gradient(circle_at_84%_28%,rgba(255,210,31,0.72),transparent_24rem),linear-gradient(115deg,#ffffff_0%,#fff9de_62%,#ffd21f_100%)]">
          <div className="absolute inset-0 opacity-60">
            <div className="road-line road-line-one" />
            <div className="road-line road-line-two" />
            <div className="pulse-ring pulse-one" />
            <div className="pulse-ring pulse-two" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10">
              <div className="max-w-3xl">
                <h1 className="max-w-3xl text-balance text-4xl font-black leading-[1.01] tracking-normal text-black sm:text-[2.8rem] lg:text-[3.35rem]">
                  Sell Your Car Today, Instantly and Effortlessly
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-black/72 sm:text-xl">
                  Receive a complimentary valuation within 30 seconds, agree a fair and competitive
                  offer, and get paid instantly when we collect your car.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {heroPoints.map((point) => {
                    const Icon = point.icon;
                    return (
                      <div
                        key={point.label}
                        className="flex items-center gap-3 rounded-lg border border-black/10 bg-white/84 px-4 py-3 font-black text-black shadow-[0_16px_44px_rgba(0,0,0,0.08)] backdrop-blur-sm"
                      >
                        <Icon size={18} aria-hidden="true" />
                        <span>{point.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-1 rounded-lg border border-black/10 bg-white/84 p-4 shadow-[0_16px_44px_rgba(0,0,0,0.08)]">
                    <strong className="text-[1.65rem] leading-none font-black">1000+</strong>
                    <span className="text-sm font-bold text-black/62">cars purchased</span>
                  </div>
                  <div className="grid gap-1 rounded-lg border border-black/10 bg-white/84 p-4 shadow-[0_16px_44px_rgba(0,0,0,0.08)]">
                    <strong className="text-[1.65rem] leading-none font-black">5.0</strong>
                    <span className="text-sm font-bold text-black/62">Google reviews</span>
                  </div>
                  <div className="grid gap-1 rounded-lg border border-black/10 bg-white/84 p-4 shadow-[0_16px_44px_rgba(0,0,0,0.08)]">
                    <strong className="text-[1.65rem] leading-none font-black">24/7</strong>
                    <span className="text-sm font-bold text-black/62">help from our team</span>
                  </div>
                </div>
              </div>

              <div className="min-w-0 rounded-lg border border-black/12 bg-white/94 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.15)] backdrop-blur-md sm:p-6">
                <div>
                  <span className="mb-3 inline-block text-[0.78rem] font-black uppercase tracking-[0.12em] text-black/50">
                    Value my car
                  </span>
                  <h2 className="text-3xl font-black leading-[1.02] text-black sm:text-[2.2rem]">
                    Start your free valuation now
                  </h2>
                  <p className="mb-4 mt-4 max-w-[38rem] text-base leading-7 text-black/66">
                    Enter your registration number and mileage to receive a free, no-obligation
                    valuation and speak with a real UK car buyer.
                  </p>
                </div>
                <ValuationForm variant="sidebar" source="sell-my-car-hero" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {["No admin fees", "Free collection", "Instant payment"].map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full bg-yellow-300/30 px-3 py-2 text-sm font-extrabold text-black"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a href={site.phoneHref} className="text-link mt-5 flex-wrap break-words">
                  <Phone size={17} aria-hidden="true" />
                  Quote over the phone: {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex max-w-3xl flex-col gap-4">
              <h2 className="section-title">Sell your car for the best price, fast and hassle-free</h2>
              <p className="text-lg leading-8 text-black/68">
                Are you looking to sell your car quickly and without the hassle? We keep things simple,
                fair and transparent from your first quote to the moment the payment reaches your bank.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {featureCards.map((card, index) => (
                <article key={card.title} className="step-card h-full">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[#f7f7f2]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:px-8">
            <div className="article-body max-w-none">
              <h2 className="section-title">Why sell your car to us?</h2>
              <p className="mt-5 text-lg leading-8 text-black/68">
                {concernHeading}
              </p>
              <p className="mt-5 text-lg leading-8 text-black/68">
                {concernCopyPrimary}
              </p>
              <p className="mt-5 text-lg leading-8 text-black/68">
                {concernCopySecondary}
              </p>
              <p className="mt-5 text-lg leading-8 text-black/68">
                {concernCopyTertiary}
              </p>
            </div>
            <aside
              className="article-aside text-white"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "linear-gradient(180deg, #0b0b0b 0%, #171717 100%)",
                boxShadow: "none",
                color: "#ffffff",
              }}
            >
              <h2>Why customers choose Sell My Car Today</h2>
              <p style={{ color: "rgba(255, 255, 255, 0.72)" }}>
                Real offers, no pressure, and a straightforward process built around speed and trust.
              </p>
              <div className="grid gap-3">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex items-start gap-3 rounded-lg bg-white/8 px-4 py-3 text-white"
                  >
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span className="leading-6">{reason}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
            <div className="article-body max-w-none">
              <h2 className="section-title">Selling a car has never been easier</h2>
              <p className="lead">
                Get a quote online in just a few clicks or speak with us over the phone. Either way,
                we keep the process quick, clear and convenient.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <article className="step-card">
                  <span>01</span>
                  <h3>Get quote online</h3>
                  <p>Enter your registration and mileage, receive your valuation, and move forward when you are ready.</p>
                  <Link href="/valuations" className="text-link mt-5">
                    Get started <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
                <article className="step-card">
                  <span>02</span>
                  <h3>Quote over the phone</h3>
                  <p>Call us 24/7 for help with valuations, inspections, collection times and the final sale.</p>
                  <a href={site.phoneHref} className="text-link mt-5">
                    {site.phone}
                  </a>
                </article>
              </div>
              <div className="mt-8 rounded-lg border border-black/10 bg-[#fff8d7] p-6">
                <h3 className="text-2xl font-black text-black">Sell My Car Today UK | Sell Your Car Fast &amp; Easy</h3>
                <p className="mt-3 text-base leading-8 text-black/72">
                  We buy cars and vans across the UK, whatever the age, mileage or condition. Our goal
                  is simple: give you a fast and fair way to sell your car without the usual pressure,
                  delays or last-minute surprises.
                </p>
              </div>
            </div>
            <aside className="article-aside">
              <h2>Need another valuation?</h2>
              <p>Value your car online again at any time and speak with our team when you are ready to sell.</p>
              <ValuationForm variant="sidebar" source="sell-my-car-sidebar" />
            </aside>
          </div>
        </section>

        <section className="section-space bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <h2 className="section-title text-white">What our customers say</h2>
                <p className="mt-4 text-lg leading-8 text-white">
                  Simple, straightforward and safe. Real reviews from drivers who sold their cars quickly.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <div className="inline-flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 px-4 py-3">
                  <div className="flex text-[1.45rem] font-black leading-none tracking-normal" aria-label="Google">
                    <span style={{ color: "#4285F4" }}>G</span>
                    <span style={{ color: "#EA4335" }}>o</span>
                    <span style={{ color: "#FBBC05" }}>o</span>
                    <span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#34A853" }}>l</span>
                    <span style={{ color: "#EA4335" }}>e</span>
                  </div>
                  <div className="border-l border-white/12 pl-3">
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-white/72">Reviews</p>
                    <p className="text-base font-black text-white">5.0 rating</p>
                  </div>
                </div>
                <Link href="/reviews" className="text-link text-white decoration-yellow-300">
                  View all reviews <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {reviews.map((review) => (
                <article
                  key={review.name}
                  className="review-card"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.06)",
                    boxShadow: "none",
                  }}
                >
                  <div className="mb-5 flex gap-1 text-yellow-300">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={17} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.76)" }}>“{review.text}”</p>
                  <strong style={{ color: "#ffffff" }}>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1fr] lg:px-8">
            <div>
              <h2 className="section-title">I have a question before I sell my car</h2>
              <p className="mt-5 text-lg leading-8 text-black/68">
                Helpful answers about valuation, condition, payment and what to expect on collection day.
              </p>
            </div>
            <div className="grid gap-3">
              {sellMyCarFaqs.map((faq, index) => (
                <details key={faq.question} className="faq-item" open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ValuationsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <h1>Valuations</h1>
            <p>Get A Real Time Valuation in 30 Seconds with Sell My Car Today.</p>
            <div className="mt-8">
              <ValuationForm source="valuations-page" />
            </div>
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {["Free quote", "No obligation", "Instant payment"].map((item) => (
              <div key={item} className="step-card">
                <CheckCircle2 className="mb-5 text-yellow-400" size={28} aria-hidden="true" />
                <h2>{item}</h2>
                <p>Sell My Car Today keeps the process simple, clear and quick from valuation to collection.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ReviewsPage({ page }: { page: (typeof contentPages)[number] }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1>{page.title}</h1>
            <p>What Our Customers Say.. 5.0 powered by Google.</p>
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {reviews.map((review) => (
              <article key={review.name} className="review-card">
                <div className="mb-5 flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <p>“{review.text}”</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ContactPage({ page }: { page: (typeof contentPages)[number] }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1>{page.title}</h1>
            <p>Need help selling your car? Speak with Sell My Car Today and get a quick valuation.</p>
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div className="article-aside">
              <h2>Contact Sell My Car Today</h2>
              <p>Call us 24/7 for quote over the phone, valuation support and collection questions.</p>
              <a href={site.phoneHref} className="action-button mt-5 inline-flex w-fit">
                <Phone size={18} aria-hidden="true" />
                {site.phone}
              </a>
            </div>
            <div className="article-aside">
              <h2>Value My Car</h2>
              <ValuationForm variant="sidebar" source="contact-page" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function heroCopy(slug: string) {
  const copy: Record<string, string> = {
    "sell-my-car":
      "Sell My Car Today offers a quick, fair and hassle-free way to sell your car online with free collection and instant payment.",
    "why-choose-us":
      "Choose Sell My Car Today for no admin fees, free collection, guaranteed sale, instant payment and a simple process.",
    "about-us":
      "Sell My Car Today helps UK drivers sell their cars quickly, safely and confidently with a real-time valuation process.",
    "terms-and-conditions": "Read the Sell My Car Today terms and conditions for using our valuation and car buying service.",
    "privacy-policy": "Read how Sell My Car Today handles personal data, privacy and website information.",
    "cookie-policy-uk": "Read the Sell My Car Today Cookie Policy for visitors in the United Kingdom.",
    "thanks-for-asking": "Thanks for asking Sellmycartoday.uk to value your car.",
  };

  return copy[slug] || site.description;
}
