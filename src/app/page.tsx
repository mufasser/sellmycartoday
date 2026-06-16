import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Car,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { ValuationForm } from "@/components/valuation-form";
import { benefits, blogPosts, faqs, reviews, steps } from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BenefitStrip />
        <Process />
        <FastestWay />
        <Faqs />
        <Reviews />
        <BlogPreview />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-grid relative overflow-hidden bg-[linear-gradient(115deg,#fff_0%,#fff8d7_48%,#ffe25b_100%)]">
      <div className="absolute inset-0 opacity-60">
        <div className="road-line road-line-one" />
        <div className="road-line road-line-two" />
        <div className="pulse-ring pulse-one" />
        <div className="pulse-ring pulse-two" />
      </div>
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl pt-6">
          <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-normal text-black sm:text-6xl lg:text-7xl">
            Sell Your Car The Easy Way
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
            Get A Real Time Valuation in 30 Seconds
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-700">
            Want to sell your car fast and get the best cash offer? At <strong>Sell My Car Today</strong>,
            we make it effortless with a fair and competitive price, free collection and instant payment.
          </p>
          <div className="mt-8 max-w-4xl">
            <ValuationForm source="home-hero" />
            <p className="mt-3 text-sm font-semibold text-neutral-700">Free quote. No obligation. Secure same-day bank transfer.</p>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="speed-card speed-card-top">
            <span>5.0</span>
            <div>
              <strong>Google reviews</strong>
              <p>Trusted London car buyers</p>
            </div>
          </div>
          <div className="car-visual">
            <Image
              src="/assets/audi-a6.png"
              alt="Black Audi A6 car"
              width={660}
              height={495}
              priority
              className="hero-car-image"
            />
            <div className="valuation-beam">
              <Banknote size={28} />
              <span>Instant payment</span>
            </div>
          </div>
          <div className="speed-card speed-card-bottom">
            <Clock3 size={22} />
            <div>
              <strong>30 seconds</strong>
              <p>real-time valuation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitStrip() {
  const icons = [ShieldCheck, Truck, BadgeCheck, Banknote, Sparkles];

  return (
    <section className="border-y border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:px-6 md:grid-cols-5 lg:px-8">
        {benefits.map((benefit, index) => {
          const Icon = icons[index];
          return (
            <div key={benefit} className="flex min-h-20 items-center gap-3 rounded-lg border border-black/10 bg-neutral-50 px-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-yellow-300 text-black">
                <Icon size={21} aria-hidden="true" />
              </span>
              <strong className="text-sm font-black uppercase tracking-[0.04em] text-neutral-900">{benefit}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section-space bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            <h2 className="section-title">Sell Your Car for the Best Price - Fast & Hassle-Free!</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Become a part of the biggest auto sales in London. We buy every car model, process fast and safe
              transactions, and come to your desired location to purchase your vehicle.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="step-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FastestWay() {
  return (
    <section className="section-space bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div>
          <h2 className="section-title text-white">Unlock The Fastest Way to Sell Your Car</h2>
          <p className="mt-5 text-lg leading-8 text-white/74">
            Do you want to know the real-time valuation of your car? Sell My Car Today offers the quickest and
            most stress-free way. Get a no obligation valuation in 30 seconds and sell your car from the comfort
            of your house on the same day.
          </p>
          <p className="mt-5 text-lg leading-8 text-white/74">
            We process payment instantly at the time of purchase with no hidden charges. Sell your car hassle-free
            at a fair and competitive price.
          </p>
          <Link className="action-button mt-8 inline-flex w-fit" href="/sell-my-car">
            Convert Your Wheels Into Cash Today
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3">
          {["Easy Process", "No Pressure", "Get Paid Instantly", "Satisfaction Guaranteed"].map((item) => (
            <div key={item} className="flex items-center gap-4 rounded-lg border border-white/12 bg-white/6 p-5">
              <CheckCircle2 className="text-yellow-300" size={24} aria-hidden="true" />
              <strong className="text-lg">{item}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section className="section-space bg-[#f7f7f2]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8">
        <div>
          <h2 className="section-title">Have a question? Find the answers fast in our FAQs!</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            Clear answers before you sell, from instant quotes to inspection, paperwork, payment and collection.
          </p>
        </div>
        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="faq-item" open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section-space bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="section-title">What Our Customers Say..</h2>
            <p className="mt-4 text-lg text-neutral-700">5.0 powered by Google. Real people, real same-day sales.</p>
          </div>
          <Link href="/reviews" className="text-link">
            See reviews <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}

function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="section-space bg-[#f7f7f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="section-title">Blog</h2>
          <Link href="/blog" className="text-link">
            Read more guides <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {latest.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="flex h-44 items-center justify-center bg-[linear-gradient(135deg,#111,#333_48%,#ffd21f_49%,#ffd21f)] text-white">
                <Car size={56} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="p-6">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/${post.slug}`} className="text-link mt-5">
                  Read More <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-yellow-300 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-7 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="text-4xl font-black tracking-normal text-black">Get A Real Time Valuation in 30 Seconds</h2>
          <p className="mt-3 text-lg font-semibold text-black/72">
            Selling A Car Has Never Been Easier. Get quote online in just a few clicks, or call us 24/7.
          </p>
        </div>
        <ValuationForm variant="footer" source="home-footer" />
      </div>
    </section>
  );
}
