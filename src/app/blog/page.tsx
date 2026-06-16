import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description:
    "Car selling guides from Sell My Car Today, including online car valuation, DVLA paperwork, MOT, tax, finance and selling your car online in the UK.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1>Blog</h1>
            <p>
              Practical UK car selling advice, valuation tips and market guides from Sell My Car Today.
            </p>
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="flex h-36 items-center justify-center bg-[linear-gradient(135deg,#111,#333_52%,#ffd21f_53%,#ffd21f)] text-white">
                  <Car size={46} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="p-6">
                  <time className="text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(post.date))}
                  </time>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <Link href={`/${post.slug}`} className="text-link mt-5">
                    Read More <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
