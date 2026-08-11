import Link from "next/link";
import { FaGamepad, FaTwitter, FaYoutube, FaTwitch, FaDiscord } from "react-icons/fa";

export default function GamingFooter() {
  return (
    <footer className="w-full mt-12 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Section: 3 Columns Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaGamepad className="h-8 w-8 text-purple-500" />
              <h3 className="text-2xl font-bold text-white">
                Arius <span className="text-purple-500">Store</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              The ultimate destination for gamers. Consoles, games, accessories, and everything you need!
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              <SocialLink href="#" icon={<FaTwitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<FaYoutube size={18} />} label="Youtube" />
              <SocialLink href="#" icon={<FaTwitch size={18} />} label="Twitch" />
              <SocialLink href="#" icon={<FaDiscord size={18} />} label="Discord" />
            </div>
          </div>

          {/* Column 2: Store */}
          <div className="ml-90">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Store
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/games">Games</FooterLink>
              <FooterLink href="/coming-soon">Consoles</FooterLink>
              <FooterLink href="/coming-soon">Accessories</FooterLink>
              <FooterLink href="/coming-soon">Gift Cards</FooterLink>
              <FooterLink href="/coming-soon">Deals</FooterLink>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="ml-60">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/coming-soon">Contact Us</FooterLink>
              <FooterLink href="/coming-soon">FAQ</FooterLink>
              <FooterLink href="/coming-soon">Shipping & Delivery</FooterLink>
              <FooterLink href="/coming-soon">Returns</FooterLink>
              <FooterLink href="/aboutus">About Us</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 md:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Game Store. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-zinc-500 transition-colors hover:text-purple-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-500 transition-colors hover:text-purple-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm text-zinc-400 transition-colors hover:text-purple-400"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-all hover:bg-purple-600 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
    >
      {icon}
    </a>
  );
}