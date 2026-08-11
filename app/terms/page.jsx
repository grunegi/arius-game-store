import Link from "next/link";
import {
  FileText,
  ShoppingCart,
  User,
  CreditCard,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-600/10">
            <FileText className="text-purple-400" size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
            Please review the following terms before using Arius and its
            services.
          </p>

          <p className="mt-3 text-sm text-zinc-600">
            Last updated: 2026
          </p>
        </section>

        {/* Content */}
        <div className="mt-14 space-y-5">

          {/* Introduction */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              1. Introduction
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              Welcome to Arius. By accessing or using this website, you agree
              to comply with these Terms & Conditions. If you do not agree with
              any part of these terms, please do not use the website.
            </p>
          </section>

          {/* Account */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <User className="text-purple-400" size={22} />
              <h2 className="text-xl font-semibold">
                2. User Accounts
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Some features of Arius require an account. You are responsible
              for providing accurate information and keeping your account
              credentials secure.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              You are responsible for all activity performed through your
              account.
            </p>
          </section>

          {/* Shopping */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-green-400" size={22} />
              <h2 className="text-xl font-semibold">
                3. Shopping & Orders
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Arius allows users to browse games and add available products to
              their shopping cart. Product availability, pricing, and other
              information may change at any time.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              Adding an item to your cart does not guarantee that the item will
              remain available.
            </p>
          </section>

          {/* Payments */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <CreditCard className="text-yellow-400" size={22} />
              <h2 className="text-xl font-semibold">
                4. Payments
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Any payment functionality displayed on Arius is subject to the
              applicable payment provider&apos;s terms and conditions.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              Arius does not store sensitive payment information unless
              explicitly stated otherwise.
            </p>
          </section>

          {/* Content */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              5. Website Content
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              Game names, images, descriptions, logos, and other related
              content may belong to their respective owners. Arius does not
              claim ownership of third-party intellectual property.
            </p>
          </section>

          {/* Privacy */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-400" size={22} />
              <h2 className="text-xl font-semibold">
                6. Privacy
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Your use of Arius may involve the collection and processing of
              account-related information. Please review our Privacy Policy
              for more information about how user data is handled.
            </p>
          </section>

          {/* Changes */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <RefreshCcw className="text-purple-400" size={22} />
              <h2 className="text-xl font-semibold">
                7. Changes to These Terms
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Arius may update these Terms & Conditions from time to time.
              Any changes will be reflected on this page with an updated
              revision date.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              8. Contact
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              If you have any questions about these terms, please contact us
              through the available contact options on Arius.
            </p>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-zinc-500">
            By using Arius, you acknowledge that you have read and understood
            these terms.
          </p>

          <Link
            href="/"
            className="mt-5 inline-block text-sm font-medium text-purple-400 transition hover:text-purple-300"
          >
            Back to Arius
          </Link>
        </div>

      </div>
    </main>
  );
}
