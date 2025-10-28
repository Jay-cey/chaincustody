import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black text-gray-100">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-500 to-teal-400 flex items-center justify-center ring-1 ring-white/6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 12l4-4 4 4 8-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">ChainCustody</h1>
            <p className="text-xs text-gray-400 -mt-0.5">Secure, auditable evidence management</p>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard/upload" className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-medium shadow-sm">
            Dashboard
          </Link>
          <Link href="/public/verify" className="px-3 py-2 rounded-md text-gray-300 hover:text-white">
            Verify
          </Link>
          <a
            href="https://github.com/your-org/chaincustody"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-md text-gray-300 hover:text-white"
            aria-label="Open source repository"
          >
            GitHub
          </a>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-green-400">
              Immutable chain of custody for digital evidence
            </h2>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              ChainCustody combines secure evidence intake, verifiable on-chain immutability, and a clear audit trail so investigators,
              prosecutors, and the public can trust the integrity of digital evidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <Link
                href="/dashboard/upload"
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-green-500"
                prefetch={false}
              >
                Submit Evidence
              </Link>

              <Link
                href="/public/verify"
                className="inline-flex items-center justify-center rounded-md border border-gray-700 px-5 py-3 text-base font-medium text-gray-200 hover:bg-gray-800"
                prefetch={false}
              >
                Verify a Hash
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-800 text-green-300 ring-1 ring-white/6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 1v22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-semibold text-gray-100">Encrypted uploads</div>
                  <div className="text-sm text-gray-400">Files are stored and transferred using secure channels and content-addressing.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-800 text-green-300 ring-1 ring-white/6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-semibold text-gray-100">On-chain audit trail</div>
                  <div className="text-sm text-gray-400">Every custody action produces an immutable event with timestamp and signer.</div>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-100">1.2K+</div>
                <div className="text-xs text-gray-400">Verified events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-100">320+</div>
                <div className="text-xs text-gray-400">Cases tracked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-100">45</div>
                <div className="text-xs text-gray-400">Labs / agencies</div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-800/60 to-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
            <div className="text-sm text-gray-400">Live preview</div>
            <div className="mt-4 bg-gray-900 border border-gray-800 rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Case ID</div>
                  <div className="text-sm font-medium text-gray-100">CASE-2025-0042</div>
                </div>

                <div className="text-xs text-gray-400">Status</div>
                <div className="ml-2 inline-flex items-center rounded px-2 py-1 text-xs font-semibold bg-green-700 text-green-100">
                  VERIFIED
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-gray-400">Evidence hash</div>
                <div className="font-mono text-sm text-green-200 break-all">0x7a8b9cde...f0123456</div>
              </div>

              <div className="mt-4 border-t border-gray-800 pt-4">
                <div className="text-xs text-gray-400">Recent events</div>
                <ol className="mt-3 space-y-3">
                  <li className="flex items-start justify-between bg-gray-900 border border-gray-800 rounded p-3">
                    <div>
                      <div className="text-sm text-gray-100">Submitted</div>
                      <div className="text-xs text-gray-400">2025-10-20 10:12:34 UTC • Officer_01</div>
                    </div>
                    <div className="text-xs text-green-300 font-semibold">VERIFIED</div>
                  </li>

                  <li className="flex items-start justify-between bg-gray-900 border border-gray-800 rounded p-3">
                    <div>
                      <div className="text-sm text-gray-100">Transferred to lab</div>
                      <div className="text-xs text-gray-400">2025-10-21 14:05:12 UTC • Forensics_Lab_A</div>
                    </div>
                    <div className="text-xs text-yellow-300 font-semibold">PENDING</div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-400">
              Deployed on a public testnet for demonstration. Replace with your mainnet contract and secure storage for production.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900/60 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-xl font-semibold text-gray-100">How it works</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <div className="text-sm text-gray-400">1. Intake</div>
              <div className="mt-2 text-gray-100 font-medium">Secure upload & metadata capture</div>
              <div className="mt-2 text-xs text-gray-400">Capture GPS, officer ID, case ID, and files at intake.</div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <div className="text-sm text-gray-400">2. Record</div>
              <div className="mt-2 text-gray-100 font-medium">Register an immutable event on-chain</div>
              <div className="mt-2 text-xs text-gray-400">Events are time-stamped and signed, creating a verifiable trail.</div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <div className="text-sm text-gray-400">3. Verify</div>
              <div className="mt-2 text-gray-100 font-medium">Public verification portal</div>
              <div className="mt-2 text-xs text-gray-400">Courts and third parties can confirm hash integrity without revealing content.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-400">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-gray-300 font-medium">ChainCustody</div>
            <div className="text-xs mt-1">Copyright © {new Date().getFullYear()} ChainCustody. All rights reserved.</div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-gray-200"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-gray-200"
            >
              Terms
            </a>
            <a
              href="https://github.com/your-org/chaincustody"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
