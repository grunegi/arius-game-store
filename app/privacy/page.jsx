import Link from "next/link";
import {
  ShieldCheck,
  User,
  Database,
  Lock,
  Cookie,
  RefreshCcw,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-600/10">
            <ShieldCheck className="text-purple-400" size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
            Your privacy matters to us. This policy explains what information
            Arius may collect and how it is used.
          </p>

          <p className="mt-3 text-sm text-zinc-600">
            Last updated: 2026
          </p>
        </section>

        <div className="mt-14 space-y-5">

          {/* Information */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Database className="text-purple-400" size={22} />

              <h2 className="text-xl font-semibold">
                1. Information We Collect
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              When you use Arius, we may collect information that you provide
              directly, such as your username, email address, profile
              information, and other account-related data.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              We may also collect information related to your interactions
              with the website, such as products added to your shopping cart
              or wishlist.
            </p>
          </section>

          {/* Account */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <User className="text-blue-400" size={22} />

              <h2 className="text-xl font-semibold">
                2. Account Information
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Account information is used to provide features such as
              authentication, profile management, shopping carts, wishlists,
              and other personalized functionality.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              You are responsible for keeping your account credentials secure
              and should notify us if you believe your account has been
              accessed without authorization.
            </p>
          </section>

          {/* Usage */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              3. How We Use Information
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              Information collected through Arius may be used to provide,
              maintain, and improve the website and its features.
            </p>

            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• Manage and authenticate user accounts.</li>
              <li>• Process shopping cart and wishlist functionality.</li>
              <li>• Personalize the user experience.</li>
              <li>• Improve website performance and reliability.</li>
              <li>• Detect and prevent unauthorized activity.</li>
            </ul>
          </section>

          {/* Storage */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Lock className="text-green-400" size={22} />

              <h2 className="text-xl font-semibold">
                4. Data Storage & Security
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Arius takes reasonable measures to protect account information
              and prevent unauthorized access, modification, or disclosure.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              However, no online service can guarantee complete security of
              information transmitted or stored online.
            </p>
          </section>

          {/* Cookies */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Cookie className="text-yellow-400" size={22} />

              <h2 className="text-xl font-semibold">
                5. Cookies & Local Storage
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              Arius may use cookies, local storage, or similar technologies to
              maintain authentication sessions, remember preferences, and
              improve the user experience.
            </p>
          </section>

          {/* Third party */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              6. Third-Party Services
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              Arius may rely on third-party services for functionality such as
              authentication, database storage, file storage, analytics, or
              other website features.
            </p>

            <p className="mt-3 leading-8 text-zinc-400">
              These services may process information according to their own
              privacy policies and terms.
            </p>
          </section>

          {/* User rights */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              7. Your Information
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              Depending on the functionality available on Arius, you may be
              able to review, update, or remove certain information associated
              with your account through your profile settings.
            </p>
          </section>

          {/* Changes */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <RefreshCcw className="text-purple-400" size={22} />

              <h2 className="text-xl font-semibold">
                8. Changes to This Policy
              </h2>
            </div>

            <p className="mt-4 leading-8 text-zinc-400">
              This Privacy Policy may be updated from time to time to reflect
              changes to Arius, its features, or applicable requirements.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              9. Contact Us
            </h2>

            <p className="mt-4 leading-8 text-zinc-400">
              If you have questions about this Privacy Policy or how your
              information is handled, please contact Arius through the
              available contact options on the website.
            </p>
          </section>

        </div>

        {/* Bottom */}
        <div className="mt-10 text-center">
          <p className="text-sm text-zinc-500">
            Thank you for trusting Arius.
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
