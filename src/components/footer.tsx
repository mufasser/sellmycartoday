import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { blogPosts, navItems, site } from "@/lib/site";

export function SiteFooter() {
  const latest = blogPosts.slice(0, 5);

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src={site.localLogo}
            alt="Sell My Car Today"
            width={176}
            height={58}
            className="mb-6 h-14 w-auto brightness-110"
          />
          <p className="max-w-sm text-sm leading-7 text-white/72">
            Sell your car quickly with Sell My Car Today. Get an instant car valuation in 30
            seconds, free collection and secure same-day bank transfer anywhere in the UK.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white/80">
            <a className="inline-flex items-center gap-3 hover:text-yellow-300" href={site.phoneHref}>
              <Phone size={17} aria-hidden="true" />
              {site.phone}
            </a>
            <a className="inline-flex items-center gap-3 hover:text-yellow-300" href={`mailto:${site.email}`}>
              <Mail size={17} aria-hidden="true" />
              {site.email}
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin size={17} aria-hidden="true" />
              {site.address}
            </span>
          </div>
        </div>

        <FooterColumn title="Company" items={navItems} />
        <FooterColumn
          title="Useful pages"
          items={[
            { label: "Valuations", href: "/valuations" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms And Conditions", href: "/terms-and-conditions" },
            { label: "Cookie Policy (UK)", href: "/cookie-policy-uk" },
          ]}
        />
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">Latest guides</h2>
          <div className="mt-5 grid gap-3">
            {latest.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`} className="text-sm leading-6 text-white/72 hover:text-yellow-300">
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/55">
        © 2026 - all rights reserved by sellmycartoday.uk
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm text-white/72 hover:text-yellow-300">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
