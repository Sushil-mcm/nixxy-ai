import { useState } from 'react';
import { useApp } from '../AppContext.jsx';

const HIGHLIGHTS = [
  { title: 'Live in 30 seconds', desc: 'Pick a number, drop your knowledge base, take calls.' },
  { title: 'Per-second billing', desc: 'No contracts, no minute round-ups. Pay only for the seconds you use.' },
  { title: 'Real-time insight',  desc: 'Transcripts, sentiment, spend — all from your dashboard.' },
];

export default function Signin() {
  const { signinUser, authError, setAuthError } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const timedOut = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('timeout') === '1';

  const submit = async (e) => {
    e?.preventDefault?.();
    if (busy) return;
    setBusy(true);
    await signinUser({ identifier, password });
    setBusy(false);
  };

  return (
    <div className="auth-shell animate-fade-up">
      {/* === LEFT: BRAND PANEL ============================================ */}
      <aside className="auth-brand hidden lg:flex">
        <div className="relative z-10 max-w-md">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold bg-black text-white px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            One platform · AI-native
          </span>
          <h2 className="mt-6 text-4xl xl:text-5xl font-display tracking-tight leading-[1.05]">
            The phone system that{' '}
            <span className="italic text-teal-600">answers itself.</span>
          </h2>
          <p className="mt-5 text-base text-slate-700 leading-relaxed">
            Sign in to manage your number, agent personality, knowledge base, and live call insights.
          </p>

          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title} className="flex gap-3">
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-full bg-teal-600 text-white font-bold">
                  ✓
                </span>
                <div>
                  <div className="font-semibold text-slate-900">{h.title}</div>
                  <div className="text-sm text-slate-700">{h.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-xs text-mute">
          © {new Date().getFullYear()} NIXXY · Encrypted · 30-day sessions
        </div>
      </aside>

      {/* === RIGHT: FORM ================================================= */}
      <section className="auth-form-panel">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-7">
            <h1 className="text-3xl md:text-4xl font-display tracking-tight text-slate-900">
              Sign in to your{' '}
              <span className="italic text-teal-600">portal.</span>
            </h1>
            <p className="text-mute mt-2 text-[15px]">
              Sign in to your dashboard.
            </p>
          </div>

          {timedOut && (
            <div className="mb-5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-700">
              ⏱ You were signed out after 30 minutes of inactivity. Please sign in again.
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="field-label">Email or username</label>
              <input
                className="input input-lg"
                placeholder="you@company.com"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); if (authError) setAuthError(''); }}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="field-label !mb-0">Password</label>
                <a
                  href="#"
                  className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  className="input input-lg pr-12"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (authError) setAuthError(''); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-mute hover:text-slate-900 px-2 py-1 rounded"
                >
                  {showPwd ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {authError && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
                <span className="text-red-500">⚠</span>
                <span>{authError}</span>
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-teal-500 w-4 h-4"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="text-sm text-slate-700">Keep me signed in</span>
            </label>

            <button type="submit" className="btn-teal w-full py-3.5 text-[15px]" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <p className="text-center text-xs text-mute mt-8">
            🔒 End-to-end encrypted · sessions expire after 30 minutes of inactivity
          </p>
        </div>
      </section>
    </div>
  );
}
