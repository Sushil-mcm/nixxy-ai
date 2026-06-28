// Brand mark — typographic NIXXY wordmark. Clean, corporate look inspired by
// nixxy.com: a teal-gradient rounded glyph + the NIXXY wordmark, with an
// optional tagline beneath. Pure CSS/text so it needs no bitmap asset.
//
// Props are kept identical to the previous logo so existing call-sites work:
//   size         — 'sm' | 'md' | 'lg' or a literal pixel height (e.g. 50)
//   white        — render the wordmark in white (for dark/colored panels)
//   showWordmark — show the small tagline under the wordmark
export default function Logo({ size = 'md', white = false, showWordmark = true }) {
  const h = typeof size === 'number'
    ? size
    : size === 'lg' ? 56 : size === 'sm' ? 30 : 42;
  const wordPx = Math.round(h * 0.52);
  const sub = size === 'lg' ? 'text-[11px]' : size === 'sm' ? 'text-[8px]' : 'text-[10px]';

  return (
    <div className="flex items-center gap-2.5 select-none" style={{ height: h }}>
      {/* Glyph: teal-gradient rounded square with the N monogram. */}
      <span
        className="inline-flex items-center justify-center rounded-xl font-extrabold shrink-0"
        style={{
          height: h,
          width: h,
          fontSize: Math.round(h * 0.5),
          lineHeight: 1,
          color: '#ffffff',
          background: 'linear-gradient(135deg, var(--grad-start), var(--grad-end))',
          boxShadow: '0 10px 24px -12px rgba(13,148,136,0.65)',
        }}
      >
        N
      </span>

      <div className="leading-none">
        <div
          className="font-extrabold tracking-tight"
          style={{
            fontSize: wordPx,
            letterSpacing: '0.02em',
            color: white ? '#ffffff' : 'var(--ink)',
          }}
        >
          NIXXY
        </div>
        {showWordmark && (
          <div
            className={`mt-1 uppercase tracking-[0.22em] font-semibold ${sub} ${white ? 'text-white/80' : 'text-mute'}`}
          >
            AI Voice Agents
          </div>
        )}
      </div>
    </div>
  );
}
