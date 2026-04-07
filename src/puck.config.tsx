/**
 * @fileoverview Puck visual editor config — canonical block registry v10.
 * 20 production blocks, all consuming CSS design tokens (--pm-*).
 * Design-token-driven: AI Theme Creator overrides :root vars in real-time.
 */
'use client';

import type { Config } from '@measured/puck';
import type { CSSProperties, ReactNode } from 'react';

// ─── Shared Style Helpers ───────────────────────────────────────────────────
const S = {
  section: (extra?: CSSProperties): CSSProperties => ({
    padding: '80px 24px', background: 'var(--pm-bg)',
    fontFamily: 'var(--pm-font)', ...extra,
  }),
  container: (extra?: CSSProperties): CSSProperties => ({
    maxWidth: 1100, margin: '0 auto', ...extra,
  }),
  card: (extra?: CSSProperties): CSSProperties => ({
    background: 'var(--pm-bg-3)', borderRadius: 'var(--pm-radius)',
    border: '1px solid var(--pm-border)', padding: 32, ...extra,
  }),
  btn: (extra?: CSSProperties): CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '13px 28px', borderRadius: 8, background: 'var(--pm-accent)',
    color: 'var(--pm-accent-fg)', fontWeight: 700, fontSize: 15,
    textDecoration: 'none', cursor: 'pointer', border: 'none',
    letterSpacing: '0.03em', transition: 'opacity 0.15s', ...extra,
  }),
  h2: (extra?: CSSProperties): CSSProperties => ({
    fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800,
    color: 'var(--pm-text)', lineHeight: 1.2, ...extra,
  }),
  h3: (extra?: CSSProperties): CSSProperties => ({
    fontSize: 20, fontWeight: 700, color: 'var(--pm-accent)', ...extra,
  }),
  p: (extra?: CSSProperties): CSSProperties => ({
    color: 'var(--pm-text-muted)', lineHeight: 1.75, fontSize: 16, ...extra,
  }),
  accentLine: (): CSSProperties => ({
    width: 48, height: 4, background: 'var(--pm-accent)',
    borderRadius: 999, margin: '0 auto 32px',
  }),
};

// ────────────────────────────────────────────────────────────────────────────
// BLOCK 1: Hero
// ────────────────────────────────────────────────────────────────────────────
const HeroBlock = ({ heading, subheading, ctaText, ctaHref, ctaSecondaryText, ctaSecondaryHref, backgroundImage, overlayOpacity, minHeight, textAlign }: {
  heading: string; subheading: string; ctaText: string; ctaHref: string;
  ctaSecondaryText?: string; ctaSecondaryHref?: string;
  backgroundImage: string; overlayOpacity: number; minHeight: number;
  textAlign: 'left' | 'center' | 'right';
}) => (
  <section role="banner" style={{
    minHeight: `${minHeight ?? 85}vh`, display: 'flex', alignItems: 'center',
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover', backgroundPosition: 'center',
    backgroundColor: 'var(--pm-bg)', position: 'relative',
    fontFamily: 'var(--pm-font)',
  }}>
    {backgroundImage && (
      <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${(overlayOpacity ?? 50) / 100})` }} />
    )}
    <div style={{
      position: 'relative', zIndex: 1, ...S.container({ padding: '0 32px' }),
      textAlign: textAlign ?? 'center', maxWidth: 800, marginLeft: textAlign === 'left' ? 0 : 'auto',
      marginRight: textAlign === 'right' ? 0 : 'auto',
    }}>
      <h1 style={{ fontSize: 'clamp(2.4rem,6vw,5rem)', fontWeight: 900, color: 'var(--pm-text)', lineHeight: 1.08, marginBottom: 20, letterSpacing: '-0.02em' }}>
        {heading || 'Luxury Living in Malta'}
      </h1>
      <p style={{ ...S.p(), fontSize: 'clamp(1rem,2vw,1.4rem)', marginBottom: 40, maxWidth: 600, marginLeft: textAlign === 'center' ? 'auto' : 0, marginRight: textAlign === 'center' ? 'auto' : 0 }}>
        {subheading}
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start' }}>
        {ctaText && <a href={ctaHref || '/properties'} style={S.btn()}>{ctaText}</a>}
        {ctaSecondaryText && (
          <a href={ctaSecondaryHref || '#'} style={S.btn({ background: 'transparent', border: '2px solid var(--pm-accent)', color: 'var(--pm-accent)' })}>
            {ctaSecondaryText}
          </a>
        )}
      </div>
    </div>
  </section>
);

// BLOCK 2: Columns
const ColumnsBlock = ({ title, subtitle, cols, layout }: {
  title?: string; subtitle?: string; layout: '2' | '3' | '4' | 'auto';
  cols: Array<{ heading: string; body: string; icon?: string; link?: string; linkLabel?: string }>;
}) => {
  const colCount = layout === 'auto' ? Math.min(4, Math.max(1, cols?.length ?? 1)) : parseInt(layout ?? '3');
  return (
    <section style={S.section({ background: 'var(--pm-bg-2)' })}>
      <div style={S.container()}>
        {(title || subtitle) && (
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            {title && <h2 style={S.h2({ marginBottom: 12 })}>{title}</h2>}
            <div style={S.accentLine()} />
            {subtitle && <p style={S.p({ maxWidth: 560, margin: '0 auto' })}>{subtitle}</p>}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 1fr)`, gap: 24 }}>
          {(cols ?? []).map((col, i) => (
            <div key={i} style={S.card()}>
              {col.icon && <div style={{ fontSize: 40, marginBottom: 20 }}>{col.icon}</div>}
              <h3 style={S.h3({ marginBottom: 12 })}>{col.heading}</h3>
              <p style={S.p({ fontSize: 15, marginBottom: col.link ? 20 : 0 })}>{col.body}</p>
              {col.link && <a href={col.link} style={{ color: 'var(--pm-accent)', fontSize: 14, fontWeight: 600 }}>{col.linkLabel ?? 'Learn more →'}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// BLOCK 3: Text / Rich Content
const TextBlock = ({ heading, body, align, size, showAccentLine }: {
  heading?: string; body: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAccentLine?: boolean;
}) => {
  const fs = { sm: 14, md: 16, lg: 18, xl: 20 };
  return (
    <section style={S.section()}>
      <div style={S.container({ maxWidth: 780, textAlign: align ?? 'left' })}>
        {heading && <h2 style={S.h2({ marginBottom: showAccentLine ? 8 : 20 })}>{heading}</h2>}
        {showAccentLine && heading && <div style={{ ...S.accentLine(), margin: align === 'center' ? '12px auto 24px' : '12px 0 24px' }} />}
        <p style={{ ...S.p(), fontSize: fs[size ?? 'md'], whiteSpace: 'pre-wrap' }}>{body}</p>
      </div>
    </section>
  );
};

// BLOCK 4: Image
const ImageBlock = ({ src, alt, caption, rounded, objectFit, maxWidth, shadow }: {
  src: string; alt: string; caption?: string; rounded?: boolean;
  objectFit?: 'cover' | 'contain'; maxWidth?: number; shadow?: boolean;
}) => (
  <section style={S.section({ padding: '40px 24px' })}>
    <div style={S.container({ maxWidth: maxWidth ?? 1100 })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{
        width: '100%', display: 'block', objectFit: objectFit ?? 'cover',
        borderRadius: rounded ? 'var(--pm-radius)' : 0,
        boxShadow: shadow ? '0 24px 80px rgba(0,0,0,0.4)' : 'none',
      }} />
      {caption && <p style={{ textAlign: 'center', ...S.p({ fontSize: 13, marginTop: 10 }) }}>{caption}</p>}
    </div>
  </section>
);

// BLOCK 5: Spacer
const SpacerBlock = ({ height, showLine }: { height: number; showLine?: boolean }) => (
  <div style={{ height: `${height ?? 40}px`, background: 'var(--pm-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {showLine && <hr style={{ width: '100%', maxWidth: 1100, border: 'none', borderTop: '1px solid var(--pm-border)' }} />}
  </div>
);

// BLOCK 6: CTA Section
const CTASection = ({ headline, subtext, buttonLabel, buttonLink, buttonSecondaryLabel, buttonSecondaryLink, variant, align }: {
  headline: string; subtext: string; buttonLabel: string; buttonLink: string;
  buttonSecondaryLabel?: string; buttonSecondaryLink?: string;
  variant: 'dark' | 'accent' | 'glass'; align: 'left' | 'center';
}) => {
  const bgMap = { dark: 'var(--pm-bg-3)', accent: 'var(--pm-accent)', glass: 'rgba(200,169,106,0.07)' };
  const isAccent = variant === 'accent';
  return (
    <section style={{ ...S.section(), background: bgMap[variant], border: variant === 'glass' ? '1px solid var(--pm-border)' : 'none' }}>
      <div style={S.container({ maxWidth: 680, textAlign: align ?? 'center' })}>
        <h2 style={{ ...S.h2({ marginBottom: 16, color: isAccent ? 'var(--pm-accent-fg)' : 'var(--pm-text)' }) }}>{headline}</h2>
        <p style={{ ...S.p({ fontSize: 18, marginBottom: 40, color: isAccent ? 'var(--pm-accent-fg)' : 'var(--pm-text-muted)' }) }}>{subtext}</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <a href={buttonLink} style={S.btn({ background: isAccent ? 'var(--pm-bg)' : 'var(--pm-accent)', color: isAccent ? 'var(--pm-accent)' : 'var(--pm-accent-fg)' })}>{buttonLabel}</a>
          {buttonSecondaryLabel && <a href={buttonSecondaryLink ?? '#'} style={S.btn({ background: 'transparent', border: `2px solid ${isAccent ? 'var(--pm-bg)' : 'var(--pm-accent)'}`, color: isAccent ? 'var(--pm-bg)' : 'var(--pm-accent)' })}>{buttonSecondaryLabel}</a>}
        </div>
      </div>
    </section>
  );
};

// BLOCK 7: Stats Bar
const StatsBar = ({ stats, title, background }: {
  stats: Array<{ label: string; value: string; suffix?: string; icon?: string }>;
  title?: string; background?: string;
}) => (
  <section style={{ ...S.section({ padding: '64px 24px' }), background: background ?? 'var(--pm-bg-2)' }}>
    <div style={S.container()}>
      {title && <h2 style={{ ...S.h2({ textAlign: 'center', marginBottom: 48 }) }}>{title}</h2>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 40 }}>
        {(stats ?? []).map((s, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: 140 }}>
            {s.icon && <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>}
            <p style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 900, color: 'var(--pm-accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {s.value}{s.suffix ?? ''}
            </p>
            <p style={{ fontSize: 13, color: 'var(--pm-text-muted)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 8: Testimonials
const TestimonialsBlock = ({ quotes, title }: {
  quotes: Array<{ quote: string; author: string; role?: string; avatar?: string; rating?: number }>;
  title?: string;
}) => (
  <section style={S.section({ background: 'var(--pm-bg-2)' })}>
    <div style={S.container()}>
      {title && <h2 style={{ ...S.h2({ textAlign: 'center', marginBottom: 16 }) }}>{title}</h2>}
      {title && <div style={{ ...S.accentLine(), marginBottom: 48 }} />}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(3, (quotes ?? []).length)}, 1fr)`, gap: 24 }}>
        {(quotes ?? []).map((q, i) => (
          <div key={i} style={S.card({ padding: 28 })}>
            {q.rating && <div style={{ color: '#f59e0b', fontSize: 14, marginBottom: 12 }}>{'★'.repeat(q.rating)}</div>}
            <p style={{ ...S.p({ fontSize: 15, marginBottom: 24, fontStyle: 'italic' })}}>&#8220;{q.quote}&#8221;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {q.avatar
                ? <img src={q.avatar} alt={q.author} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                : <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--pm-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pm-accent-fg)', fontWeight: 700, fontSize: 16 }}>{q.author[0]}</div>
              }
              <div>
                <p style={{ fontWeight: 700, color: 'var(--pm-accent)', fontSize: 14 }}>{q.author}</p>
                {q.role && <p style={{ fontSize: 12, color: 'var(--pm-text-muted)' }}>{q.role}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 9: Gallery Grid
const GalleryGrid = ({ images, columns, gap, rounded, lightbox }: {
  images: Array<{ src: string; alt: string; caption?: string }>;
  columns: number; gap: number; rounded?: boolean; lightbox?: boolean;
}) => (
  <section style={S.section({ padding: '48px 24px' })}>
    <div style={S.container()}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns ?? 3}, 1fr)`, gap: `${gap ?? 16}px` }}>
        {(images ?? []).map((img, i) => (
          <div key={i} style={{ overflow: 'hidden', borderRadius: rounded ? 'var(--pm-radius)' : 4, position: 'relative', cursor: lightbox ? 'zoom-in' : 'default' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} />
            {img.caption && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '24px 12px 12px' }}>
                <p style={{ color: '#fff', fontSize: 12, margin: 0 }}>{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 10: Feature Grid
const FeatureGrid = ({ title, subtitle, features, columns }: {
  title?: string; subtitle?: string; columns: 2 | 3 | 4;
  features: Array<{ icon: string; title: string; description: string; badge?: string }>;
}) => (
  <section style={S.section()}>
    <div style={S.container()}>
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          {title && <h2 style={S.h2({ marginBottom: 12 })}>{title}</h2>}
          <div style={S.accentLine()} />
          {subtitle && <p style={S.p({ maxWidth: 560, margin: '0 auto' })}>{subtitle}</p>}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns ?? 3}, 1fr)`, gap: 24 }}>
        {(features ?? []).map((f, i) => (
          <div key={i} style={S.card({ position: 'relative', overflow: 'hidden' })}>
            {f.badge && <span style={{ position: 'absolute', top: 16, right: 16, background: 'var(--pm-accent)', color: 'var(--pm-accent-fg)', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, letterSpacing: '0.05em' }}>{f.badge}</span>}
            <span style={{ fontSize: 36, display: 'block', marginBottom: 16 }}>{f.icon}</span>
            <h3 style={S.h3({ marginBottom: 10 })}>{f.title}</h3>
            <p style={S.p({ fontSize: 14 })}>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 11: Accordion / FAQ
const AccordionBlock = ({ title, items }: {
  title?: string;
  items: Array<{ question: string; answer: string }>;
}) => (
  <section style={S.section()}>
    <div style={S.container({ maxWidth: 760 })}>
      {title && <h2 style={{ ...S.h2({ textAlign: 'center', marginBottom: 48 }) }}>{title}</h2>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(items ?? []).map((item, i) => (
          <details key={i} style={S.card({ padding: 0, overflow: 'hidden' })}>
            <summary style={{ padding: '20px 24px', cursor: 'pointer', fontWeight: 600, color: 'var(--pm-text)', fontSize: 16, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {item.question}
              <span style={{ color: 'var(--pm-accent)', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>+</span>
            </summary>
            <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--pm-border)' }}>
              <p style={S.p({ fontSize: 15, paddingTop: 16 })}>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 12: Pricing Table
const PricingTable = ({ title, plans }: {
  title?: string;
  plans: Array<{ name: string; price: string; period: string; description: string; features: string; cta: string; ctaHref: string; featured?: boolean }>;
}) => (
  <section style={S.section({ background: 'var(--pm-bg-2)' })}>
    <div style={S.container()}>
      {title && <h2 style={{ ...S.h2({ textAlign: 'center', marginBottom: 48 }) }}>{title}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${(plans ?? []).length}, 1fr)`, gap: 24, alignItems: 'start' }}>
        {(plans ?? []).map((plan, i) => (
          <div key={i} style={{
            ...S.card({ textAlign: 'center' }),
            ...(plan.featured ? { border: '2px solid var(--pm-accent)', transform: 'scale(1.04)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } : {}),
          }}>
            {plan.featured && <div style={{ background: 'var(--pm-accent)', color: 'var(--pm-accent-fg)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', padding: '4px 0', marginTop: -32, marginLeft: -32, marginRight: -32, marginBottom: 24 }}>MOST POPULAR</div>}
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--pm-text)', marginBottom: 8 }}>{plan.name}</h3>
            <p style={S.p({ fontSize: 14, marginBottom: 20 })}>{plan.description}</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: 'var(--pm-accent)' }}>{plan.price}</span>
              <span style={S.p({ fontSize: 14 })}>/{plan.period}</span>
            </div>
            <ul style={{ textAlign: 'left', marginBottom: 28, listStyle: 'none', padding: 0 }}>
              {(plan.features ?? '').split('\n').filter(Boolean).map((f, fi) => (
                <li key={fi} style={{ padding: '6px 0', color: 'var(--pm-text)', fontSize: 14, display: 'flex', gap: 8, alignItems: 'center', borderBottom: '1px solid var(--pm-border)' }}>
                  <span style={{ color: 'var(--pm-accent)' }}>✓</span> {f.trim()}
                </li>
              ))}
            </ul>
            <a href={plan.ctaHref} style={S.btn({ width: '100%', justifyContent: 'center' })}>{plan.cta}</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 13: Timeline
const TimelineBlock = ({ title, events }: {
  title?: string;
  events: Array<{ year: string; title: string; description: string; icon?: string }>;
}) => (
  <section style={S.section()}>
    <div style={S.container({ maxWidth: 760 })}>
      {title && <h2 style={{ ...S.h2({ textAlign: 'center', marginBottom: 48 }) }}>{title}</h2>}
      <div style={{ position: 'relative', paddingLeft: 48 }}>
        <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, width: 2, background: 'var(--pm-border)' }} />
        {(events ?? []).map((ev, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 40 }}>
            <div style={{ position: 'absolute', left: -40, width: 28, height: 28, borderRadius: '50%', background: 'var(--pm-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--pm-accent-fg)', fontWeight: 700 }}>
              {ev.icon ?? i + 1}
            </div>
            <div style={S.card({ padding: '20px 24px' })}>
              <span style={{ fontSize: 12, color: 'var(--pm-accent)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{ev.year}</span>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--pm-text)', margin: '6px 0 8px' }}>{ev.title}</h3>
              <p style={S.p({ fontSize: 14 })}>{ev.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// BLOCK 14: Logo Cloud
const LogoCloud = ({ title, logos, grayscale }: {
  title?: string;
  logos: Array<{ src: string; alt: string; href?: string }>;
  grayscale?: boolean;
}) => (
  <section style={S.section({ padding: '48px 24px', background: 'var(--pm-bg-2)' })}>
    <div style={S.container()}>
      {title && <p style={{ textAlign: 'center', ...S.p({ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 32 }) }}>{title}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        {(logos ?? []).map((logo, i) => {
          const img = <img key={i} src={logo.src} alt={logo.alt} style={{ height: 40, maxWidth: 140, objectFit: 'contain', opacity: grayscale ? 0.5 : 1, filter: grayscale ? 'grayscale(100%)' : 'none', transition: 'opacity 0.2s' }} />;
          return logo.href ? <a key={i} href={logo.href}>{img}</a> : img;
        })}
      </div>
    </div>
  </section>
);

// BLOCK 15: Video Embed
const VideoEmbed = ({ url, title, aspectRatio, rounded }: {
  url: string; title: string; aspectRatio: '16/9' | '4/3' | '1/1'; rounded?: boolean;
}) => {
  const ytId = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];
  const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
  const embedSrc = ytId ? `https://www.youtube.com/embed/${ytId}` : vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : url;
  return (
    <section style={S.section({ padding: '40px 24px' })}>
      <div style={S.container({ maxWidth: 900 })}>
        <div style={{ position: 'relative', aspectRatio: aspectRatio ?? '16/9', overflow: 'hidden', borderRadius: rounded ? 'var(--pm-radius)' : 0 }}>
          <iframe src={embedSrc} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
        </div>
      </div>
    </section>
  );
};

// BLOCK 16: Divider
const DividerBlock = ({ style: lineStyle, label, color }: {
  style: 'line' | 'dots' | 'wave'; label?: string; color?: string;
}) => (
  <div style={{ padding: '16px 24px', background: 'var(--pm-bg)', display: 'flex', alignItems: 'center', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
    {lineStyle === 'line' && <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${color ?? 'var(--pm-border)'}` }} />}
    {lineStyle === 'dots' && <div style={{ flex: 1, borderTop: `2px dotted ${color ?? 'var(--pm-border)'}` }} />}
    {lineStyle === 'wave' && <div style={{ flex: 1, height: 2, background: `repeating-linear-gradient(90deg, ${color ?? 'var(--pm-accent)'} 0, ${color ?? 'var(--pm-accent)'} 6px, transparent 6px, transparent 12px)` }} />}
    {label && <span style={{ fontSize: 12, color: 'var(--pm-text-muted)', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>{label}</span>}
    {lineStyle === 'line' && label && <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${color ?? 'var(--pm-border)'}` }} />}
  </div>
);

// BLOCK 17: Two-Column Media + Text
const MediaText = ({ heading, body, imageSrc, imageAlt, imagePosition, ctaText, ctaHref }: {
  heading: string; body: string; imageSrc: string; imageAlt: string;
  imagePosition: 'left' | 'right'; ctaText?: string; ctaHref?: string;
}) => (
  <section style={S.section()}>
    <div style={S.container({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' })}>
      {imagePosition === 'right'
        ? (<>
          <div>
            <h2 style={S.h2({ marginBottom: 20 })}>{heading}</h2>
            <p style={S.p({ marginBottom: ctaText ? 32 : 0 })}>{body}</p>
            {ctaText && <a href={ctaHref ?? '#'} style={S.btn()}>{ctaText}</a>}
          </div>
          <img src={imageSrc} alt={imageAlt} style={{ width: '100%', borderRadius: 'var(--pm-radius)', objectFit: 'cover', aspectRatio: '4/3' }} />
        </>)
        : (<>
          <img src={imageSrc} alt={imageAlt} style={{ width: '100%', borderRadius: 'var(--pm-radius)', objectFit: 'cover', aspectRatio: '4/3' }} />
          <div>
            <h2 style={S.h2({ marginBottom: 20 })}>{heading}</h2>
            <p style={S.p({ marginBottom: ctaText ? 32 : 0 })}>{body}</p>
            {ctaText && <a href={ctaHref ?? '#'} style={S.btn()}>{ctaText}</a>}
          </div>
        </>)
      }
    </div>
  </section>
);

// BLOCK 18: Alert / Banner
const AlertBanner = ({ message, type, dismissible, icon }: {
  message: string; type: 'info' | 'success' | 'warning' | 'error'; dismissible?: boolean; icon?: string;
}) => {
  const colors = {
    info: { bg: 'rgba(59,130,246,0.12)', border: '#3b82f6', text: '#93c5fd' },
    success: { bg: 'rgba(34,197,94,0.12)', border: '#22c55e', text: '#86efac' },
    warning: { bg: 'rgba(245,158,11,0.12)', border: '#f59e0b', text: '#fcd34d' },
    error: { bg: 'rgba(239,68,68,0.12)', border: '#ef4444', text: '#fca5a5' },
  };
  const c = colors[type ?? 'info'];
  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
  return (
    <div role="alert" style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '14px 20px', margin: '0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 18 }}>{icon ?? icons[type]}</span>
      <p style={{ flex: 1, margin: 0, color: c.text, fontSize: 15 }}>{message}</p>
      {dismissible && <button style={{ background: 'none', border: 'none', color: c.text, fontSize: 20, cursor: 'pointer', padding: 0, lineHeight: 1 }} aria-label="Dismiss">×</button>}
    </div>
  );
};

// BLOCK 19: Breadcrumbs
const BreadcrumbBlock = ({ items, separator }: {
  items: Array<{ label: string; href?: string }>;
  separator: '/' | '>' | '→' | '·';
}) => (
  <nav aria-label="Breadcrumb" style={{ padding: '16px 24px', background: 'var(--pm-bg-2)', fontFamily: 'var(--pm-font)' }}>
    <div style={S.container()}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
        {(items ?? []).map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: 'var(--pm-text-muted)', fontSize: 13 }}>{separator ?? '/'}</span>}
            {item.href
              ? <a href={item.href} style={{ color: 'var(--pm-accent)', fontSize: 14, fontWeight: i === (items.length - 1) ? 600 : 400 }}>{item.label}</a>
              : <span style={{ color: 'var(--pm-text)', fontSize: 14, fontWeight: 600 }}>{item.label}</span>
            }
          </li>
        ))}
      </ol>
    </div>
  </nav>
);

// BLOCK 20: Contact Card
const ContactCard = ({ heading, subtext, email, phone, address, mapUrl, showSocials, instagram, facebook, whatsapp }: {
  heading: string; subtext?: string; email: string; phone?: string; address?: string;
  mapUrl?: string; showSocials?: boolean; instagram?: string; facebook?: string; whatsapp?: string;
}) => (
  <section style={S.section({ background: 'var(--pm-bg-2)' })}>
    <div style={S.container({ maxWidth: 680, textAlign: 'center' })}>
      <h2 style={S.h2({ marginBottom: 12 })}>{heading}</h2>
      {subtext && <p style={S.p({ marginBottom: 40 })}>{subtext}</p>}
      <div style={S.card({ display: 'inline-flex', flexDirection: 'column', gap: 20, textAlign: 'left', minWidth: 320 })}>
        {email && <a href={`mailto:${email}`} style={{ display: 'flex', gap: 14, alignItems: 'center', color: 'var(--pm-text)', textDecoration: 'none', fontSize: 15 }}>
          <span style={{ fontSize: 20 }}>📧</span> {email}
        </a>}
        {phone && <a href={`tel:${phone}`} style={{ display: 'flex', gap: 14, alignItems: 'center', color: 'var(--pm-text)', textDecoration: 'none', fontSize: 15 }}>
          <span style={{ fontSize: 20 }}>📞</span> {phone}
        </a>}
        {address && <p style={{ display: 'flex', gap: 14, alignItems: 'flex-start', ...S.p({ fontSize: 15, margin: 0 }) }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>📍</span> {address}
        </p>}
        {mapUrl && <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={S.btn({ marginTop: 8 })}>View on Map</a>}
        {showSocials && (instagram || facebook || whatsapp) && (
          <div style={{ display: 'flex', gap: 16, paddingTop: 8, borderTop: '1px solid var(--pm-border)' }}>
            {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pm-accent)', fontSize: 22 }}>📸</a>}
            {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pm-accent)', fontSize: 22 }}>👤</a>}
            {whatsapp && <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pm-accent)', fontSize: 22 }}>💬</a>}
          </div>
        )}
      </div>
    </div>
  </section>
);

// ─── ROOT + PUCK CONFIG ────────────────────────────────────────────────────────────
const config: Config = {
  components: {
    Hero: {
      label: '🏠 Hero',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        subheading: { type: 'textarea', label: 'Subheading' },
        ctaText: { type: 'text', label: 'Primary CTA Label' },
        ctaHref: { type: 'text', label: 'Primary CTA Link' },
        ctaSecondaryText: { type: 'text', label: 'Secondary CTA Label' },
        ctaSecondaryHref: { type: 'text', label: 'Secondary CTA Link' },
        backgroundImage: { type: 'text', label: 'Background Image URL' },
        overlayOpacity: { type: 'number', label: 'Overlay Opacity (0–100)' },
        minHeight: { type: 'number', label: 'Min Height (vh)' },
        textAlign: { type: 'select', label: 'Text Align', options: [
          { label: 'Center', value: 'center' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ]},
      },
      defaultProps: { heading: 'Luxury Living in Malta', subheading: 'Premium property management and holiday rentals.', ctaText: 'View Properties', ctaHref: '/properties', ctaSecondaryText: 'Learn More', ctaSecondaryHref: '#about', backgroundImage: '', overlayOpacity: 50, minHeight: 85, textAlign: 'center' },
      render: HeroBlock,
    },
    Columns: {
      label: '📐 Columns',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        layout: { type: 'select', label: 'Layout', options: [{ label: '2 columns', value: '2' }, { label: '3 columns', value: '3' }, { label: '4 columns', value: '4' }, { label: 'Auto', value: 'auto' }]},
        cols: { type: 'array', label: 'Columns', arrayFields: {
          heading: { type: 'text', label: 'Heading' },
          body: { type: 'textarea', label: 'Body' },
          icon: { type: 'text', label: 'Icon (emoji)' },
          link: { type: 'text', label: 'Link URL' },
          linkLabel: { type: 'text', label: 'Link Label' },
        }, defaultItemProps: { heading: 'Feature', body: 'Description.', icon: '✦', link: '', linkLabel: '' }},
      },
      defaultProps: { title: 'Why Choose Us', subtitle: 'Everything you need for a perfect stay.', layout: '3', cols: [{ heading: 'Premium Rentals', body: 'Curated luxury properties across Malta.', icon: '🏠', link: '', linkLabel: '' }, { heading: 'Full Management', body: 'End-to-end property management service.', icon: '🔑', link: '', linkLabel: '' }, { heading: 'Global Reach', body: 'Listed on all major booking platforms.', icon: '🌍', link: '', linkLabel: '' }]},
      render: ColumnsBlock,
    },
    Text: {
      label: '📝 Text',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        body: { type: 'textarea', label: 'Body' },
        align: { type: 'select', label: 'Align', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }]},
        size: { type: 'select', label: 'Font Size', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }, { label: 'XL', value: 'xl' }]},
        showAccentLine: { type: 'radio', label: 'Show Accent Line', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
      },
      defaultProps: { heading: '', body: 'Your content here.', align: 'left', size: 'md', showAccentLine: false },
      render: TextBlock,
    },
    Image: {
      label: '🖼 Image',
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        caption: { type: 'text', label: 'Caption' },
        rounded: { type: 'radio', label: 'Rounded', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        objectFit: { type: 'select', label: 'Object Fit', options: [{ label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }]},
        maxWidth: { type: 'number', label: 'Max Width (px)' },
        shadow: { type: 'radio', label: 'Drop Shadow', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
      },
      defaultProps: { src: '', alt: '', caption: '', rounded: true, objectFit: 'cover', maxWidth: 1100, shadow: false },
      render: ImageBlock,
    },
    Spacer: {
      label: '↕ Spacer',
      fields: {
        height: { type: 'number', label: 'Height (px)' },
        showLine: { type: 'radio', label: 'Show Divider Line', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
      },
      defaultProps: { height: 48, showLine: false },
      render: SpacerBlock,
    },
    CTASection: {
      label: '🎯 CTA Section',
      fields: {
        headline: { type: 'text', label: 'Headline' },
        subtext: { type: 'textarea', label: 'Subtext' },
        buttonLabel: { type: 'text', label: 'Primary Button' },
        buttonLink: { type: 'text', label: 'Primary Link' },
        buttonSecondaryLabel: { type: 'text', label: 'Secondary Button' },
        buttonSecondaryLink: { type: 'text', label: 'Secondary Link' },
        variant: { type: 'select', label: 'Variant', options: [{ label: 'Dark', value: 'dark' }, { label: 'Accent', value: 'accent' }, { label: 'Glass', value: 'glass' }]},
        align: { type: 'select', label: 'Align', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }]},
      },
      defaultProps: { headline: 'Ready to find your perfect property?', subtext: 'Browse our curated Malta luxury portfolio.', buttonLabel: 'Explore Properties', buttonLink: '/properties', buttonSecondaryLabel: 'Contact Us', buttonSecondaryLink: '/contact', variant: 'dark', align: 'center' },
      render: CTASection,
    },
    StatsBar: {
      label: '📊 Stats',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        background: { type: 'text', label: 'Background CSS' },
        stats: { type: 'array', label: 'Stats', arrayFields: {
          label: { type: 'text', label: 'Label' },
          value: { type: 'text', label: 'Value' },
          suffix: { type: 'text', label: 'Suffix' },
          icon: { type: 'text', label: 'Icon (emoji)' },
        }, defaultItemProps: { label: 'Properties', value: '50', suffix: '+', icon: '' }},
      },
      defaultProps: { title: '', background: '', stats: [{ label: 'Properties', value: '50', suffix: '+', icon: '🏠' }, { label: 'Happy Guests', value: '1,200', suffix: '+', icon: '😊' }, { label: 'Years Experience', value: '10', suffix: '', icon: '🌟' }, { label: 'Avg Rating', value: '4.9', suffix: '★', icon: '' }]},
      render: StatsBar,
    },
    Testimonials: {
      label: '💬 Testimonials',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        quotes: { type: 'array', label: 'Testimonials', arrayFields: {
          quote: { type: 'textarea', label: 'Quote' },
          author: { type: 'text', label: 'Author' },
          role: { type: 'text', label: 'Role / Location' },
          avatar: { type: 'text', label: 'Avatar URL' },
          rating: { type: 'number', label: 'Star Rating (1-5)' },
        }, defaultItemProps: { quote: 'Exceptional service.', author: 'Jane D.', role: 'London, UK', avatar: '', rating: 5 }},
      },
      defaultProps: { title: 'What Our Guests Say', quotes: [{ quote: 'Absolutely stunning property, flawless service.', author: 'Michael T.', role: 'London, UK', avatar: '', rating: 5 }, { quote: 'Best holiday rental we have ever had.', author: 'Sophie R.', role: 'Paris, France', avatar: '', rating: 5 }, { quote: 'Professional management and beautiful apartment.', author: 'Marco B.', role: 'Milan, Italy', avatar: '', rating: 5 }]},
      render: TestimonialsBlock,
    },
    Gallery: {
      label: '🖼 Gallery',
      fields: {
        columns: { type: 'number', label: 'Columns (1-4)' },
        gap: { type: 'number', label: 'Gap (px)' },
        rounded: { type: 'radio', label: 'Rounded', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        lightbox: { type: 'radio', label: 'Lightbox cursor', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        images: { type: 'array', label: 'Images', arrayFields: {
          src: { type: 'text', label: 'Image URL' },
          alt: { type: 'text', label: 'Alt Text' },
          caption: { type: 'text', label: 'Caption' },
        }, defaultItemProps: { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', alt: 'Property', caption: '' }},
      },
      defaultProps: { columns: 3, gap: 16, rounded: true, lightbox: false, images: [] },
      render: GalleryGrid,
    },
    FeatureGrid: {
      label: '✦ Features',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        columns: { type: 'select', label: 'Columns', options: [{ label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }]},
        features: { type: 'array', label: 'Features', arrayFields: {
          icon: { type: 'text', label: 'Icon (emoji)' },
          title: { type: 'text', label: 'Title' },
          description: { type: 'textarea', label: 'Description' },
          badge: { type: 'text', label: 'Badge (optional)' },
        }, defaultItemProps: { icon: '✦', title: 'Feature', description: 'Feature description here.', badge: '' }},
      },
      defaultProps: { title: 'Property Amenities', subtitle: 'Everything you need for a perfect stay', columns: 3, features: [{ icon: '🏊', title: 'Private Pool', description: 'Exclusive pool access.', badge: '' }, { icon: '📡', title: 'Fast WiFi', description: 'High-speed internet.', badge: 'Popular' }, { icon: '🚗', title: 'Free Parking', description: 'Private parking included.', badge: '' }]},
      render: FeatureGrid,
    },
    Accordion: {
      label: '❓ FAQ / Accordion',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        items: { type: 'array', label: 'Items', arrayFields: {
          question: { type: 'text', label: 'Question' },
          answer: { type: 'textarea', label: 'Answer' },
        }, defaultItemProps: { question: 'What is included?', answer: 'All utilities and amenities are included.' }},
      },
      defaultProps: { title: 'Frequently Asked Questions', items: [{ question: 'Is parking included?', answer: 'Yes, private parking is available at all our properties.' }, { question: 'What is the check-in time?', answer: 'Standard check-in is from 3pm. Early check-in can be arranged.' }]},
      render: AccordionBlock,
    },
    PricingTable: {
      label: '💰 Pricing',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        plans: { type: 'array', label: 'Plans', arrayFields: {
          name: { type: 'text', label: 'Plan Name' },
          price: { type: 'text', label: 'Price' },
          period: { type: 'text', label: 'Period' },
          description: { type: 'text', label: 'Description' },
          features: { type: 'textarea', label: 'Features (one per line)' },
          cta: { type: 'text', label: 'CTA Label' },
          ctaHref: { type: 'text', label: 'CTA Link' },
          featured: { type: 'radio', label: 'Featured', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        }, defaultItemProps: { name: 'Standard', price: '€150', period: 'night', description: 'Perfect for couples.', features: 'WiFi\nParking\nAC', cta: 'Book Now', ctaHref: '/book', featured: false }},
      },
      defaultProps: { title: 'Our Rates', plans: [{ name: 'Standard', price: '€150', period: 'night', description: 'Perfect for couples.', features: 'WiFi\nParking\nAC\nBreakfast', cta: 'Book Now', ctaHref: '/book', featured: false }, { name: 'Premium', price: '€280', period: 'night', description: 'Full luxury experience.', features: 'WiFi\nParking\nPool\nConcierge\nBreakfast\nAirport Transfer', cta: 'Book Premium', ctaHref: '/book', featured: true }]},
      render: PricingTable,
    },
    Timeline: {
      label: '📍 Timeline',
      fields: {
        title: { type: 'text', label: 'Section Title' },
        events: { type: 'array', label: 'Events', arrayFields: {
          year: { type: 'text', label: 'Year / Date' },
          title: { type: 'text', label: 'Title' },
          description: { type: 'textarea', label: 'Description' },
          icon: { type: 'text', label: 'Icon / Number' },
        }, defaultItemProps: { year: '2024', title: 'Milestone', description: 'Description here.', icon: '' }},
      },
      defaultProps: { title: 'Our Story', events: [{ year: '2014', title: 'Founded', description: 'Started with 2 properties in Sliema.', icon: '🏠' }, { year: '2018', title: 'Expanded', description: 'Grew to 20+ premium properties across Malta.', icon: '🚀' }, { year: '2024', title: 'Digital Transformation', description: 'Launched AI-powered management platform.', icon: '✨' }]},
      render: TimelineBlock,
    },
    LogoCloud: {
      label: '🤝 Logo Cloud',
      fields: {
        title: { type: 'text', label: 'Label Text' },
        grayscale: { type: 'radio', label: 'Grayscale', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        logos: { type: 'array', label: 'Logos', arrayFields: {
          src: { type: 'text', label: 'Logo URL' },
          alt: { type: 'text', label: 'Alt Text' },
          href: { type: 'text', label: 'Link (optional)' },
        }, defaultItemProps: { src: '', alt: 'Partner logo', href: '' }},
      },
      defaultProps: { title: 'As Seen On', grayscale: true, logos: [] },
      render: LogoCloud,
    },
    VideoEmbed: {
      label: '🎥 Video',
      fields: {
        url: { type: 'text', label: 'YouTube / Vimeo URL' },
        title: { type: 'text', label: 'Video Title (a11y)' },
        aspectRatio: { type: 'select', label: 'Aspect Ratio', options: [{ label: '16:9', value: '16/9' }, { label: '4:3', value: '4/3' }, { label: 'Square', value: '1/1' }]},
        rounded: { type: 'radio', label: 'Rounded', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
      },
      defaultProps: { url: '', title: 'Property Tour Video', aspectRatio: '16/9', rounded: true },
      render: VideoEmbed,
    },
    Divider: {
      label: '— Divider',
      fields: {
        style: { type: 'select', label: 'Style', options: [{ label: 'Line', value: 'line' }, { label: 'Dots', value: 'dots' }, { label: 'Wave', value: 'wave' }]},
        label: { type: 'text', label: 'Center Label (optional)' },
        color: { type: 'text', label: 'Color (CSS)' },
      },
      defaultProps: { style: 'line', label: '', color: '' },
      render: DividerBlock,
    },
    MediaText: {
      label: '🖼 Media + Text',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        body: { type: 'textarea', label: 'Body' },
        imageSrc: { type: 'text', label: 'Image URL' },
        imageAlt: { type: 'text', label: 'Image Alt' },
        imagePosition: { type: 'select', label: 'Image Position', options: [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }]},
        ctaText: { type: 'text', label: 'CTA Label' },
        ctaHref: { type: 'text', label: 'CTA Link' },
      },
      defaultProps: { heading: 'Expert Property Management', body: 'We handle everything from listings to guest communication, cleaning, and maintenance.', imageSrc: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', imageAlt: 'Property management', imagePosition: 'right', ctaText: 'Learn More', ctaHref: '/about' },
      render: MediaText,
    },
    AlertBanner: {
      label: '⚠️ Alert Banner',
      fields: {
        message: { type: 'textarea', label: 'Message' },
        type: { type: 'select', label: 'Type', options: [{ label: 'Info', value: 'info' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }, { label: 'Error', value: 'error' }]},
        dismissible: { type: 'radio', label: 'Dismissible', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        icon: { type: 'text', label: 'Custom Icon (emoji)' },
      },
      defaultProps: { message: 'Summer 2025 bookings are now open! Secure your dates early.', type: 'info', dismissible: true, icon: '' },
      render: AlertBanner,
    },
    Breadcrumb: {
      label: '🗂 Breadcrumb',
      fields: {
        separator: { type: 'select', label: 'Separator', options: [{ label: '/', value: '/' }, { label: '>', value: '>' }, { label: '→', value: '→' }, { label: '·', value: '·' }]},
        items: { type: 'array', label: 'Items', arrayFields: {
          label: { type: 'text', label: 'Label' },
          href: { type: 'text', label: 'Link (empty = current)' },
        }, defaultItemProps: { label: 'Page', href: '' }},
      },
      defaultProps: { separator: '/', items: [{ label: 'Home', href: '/' }, { label: 'Properties', href: '/properties' }, { label: 'Sliema Apartment', href: '' }]},
      render: BreadcrumbBlock,
    },
    ContactCard: {
      label: '📞 Contact',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        subtext: { type: 'textarea', label: 'Subtext' },
        email: { type: 'text', label: 'Email' },
        phone: { type: 'text', label: 'Phone' },
        address: { type: 'textarea', label: 'Address' },
        mapUrl: { type: 'text', label: 'Google Maps Link' },
        showSocials: { type: 'radio', label: 'Show Socials', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }]},
        instagram: { type: 'text', label: 'Instagram URL' },
        facebook: { type: 'text', label: 'Facebook URL' },
        whatsapp: { type: 'text', label: 'WhatsApp Number' },
      },
      defaultProps: { heading: 'Get In Touch', subtext: 'We\'re here to help with your Malta property needs.', email: 'info@maltaproperty.com', phone: '+356 2100 0000', address: 'Sliema, Malta', mapUrl: '', showSocials: true, instagram: '', facebook: '', whatsapp: '' },
      render: ContactCard,
    },
  },
  root: {
    fields: {
      title: { type: 'text', label: 'Page Title' },
      description: { type: 'textarea', label: 'Meta Description' },
      theme: { type: 'select', label: 'Theme Preset', options: [
        { label: '🥇 Malta Gold', value: 'malta-gold' },
        { label: '⚫ Pure Dark', value: 'dark' },
        { label: '☀️ Light Sand', value: 'light' },
        { label: '🌊 Ocean Blue', value: 'ocean' },
        { label: '🧠 AI Custom', value: 'ai-custom' },
      ]},
    },
    defaultProps: { title: 'Malta Gold CMS', description: 'Luxury property management Malta.', theme: 'malta-gold' },
    render: ({ children, title, theme }: { children: ReactNode; title: string; description: string; theme: string }) => (
      <div data-theme={theme} className={`pm-theme-${theme}`}>
        <title>{title}</title>
        {children}
      </div>
    ),
  },
};

export default config;
