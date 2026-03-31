'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Built by stargirl | CultureOS | March 2026

const BG = '#060404';

const CATEGORIES = {
  DIGITAL: '#E8925A',
  CULTURE: '#C9A87C',
  ECONOMY: '#D4BA5A',
  SOCIAL:  '#B87050',
};

const LABELED_NODES = [
  { label: 'Quiet Luxury',          category: 'ECONOMY', macro: false },
  { label: 'The Algorithm',         category: 'DIGITAL', macro: true  },
  { label: 'Hype Cycle',            category: 'CULTURE', macro: false },
  { label: 'Creator Class',         category: 'ECONOMY', macro: true  },
  { label: 'Fan Economy',           category: 'ECONOMY', macro: true  },
  { label: 'Gen Z Rage',            category: 'SOCIAL',  macro: false },
  { label: 'Soft Life',             category: 'SOCIAL',  macro: false },
  { label: 'Main Character Energy', category: 'SOCIAL',  macro: false },
  { label: 'Nostalgia Loop',        category: 'CULTURE', macro: false },
  { label: 'AI Anxiety',            category: 'DIGITAL', macro: false },
  { label: 'Post-Streaming Era',    category: 'DIGITAL', macro: false },
  { label: 'Sports Betting Wave',   category: 'ECONOMY', macro: false },
  { label: 'Attention Economy',     category: 'DIGITAL', macro: true  },
  { label: 'Viral Grief',           category: 'CULTURE', macro: false },
  { label: 'Collective Joy',        category: 'SOCIAL',  macro: false },
  { label: 'Cancel Spiral',         category: 'CULTURE', macro: false },
  { label: 'Comeback Arc',          category: 'SOCIAL',  macro: false },
  { label: 'Cultural Velocity',     category: 'SOCIAL',  macro: true  },
  { label: 'The Discourse',         category: 'CULTURE', macro: false },
  { label: 'Trend Half-Life',       category: 'DIGITAL', macro: false },
  { label: 'Rage Bait',             category: 'CULTURE', macro: false },
  { label: 'Parasocial Bond',       category: 'ECONOMY', macro: false },
  { label: 'Identity Flux',         category: 'SOCIAL',  macro: false },
  { label: 'The Aesthetic',         category: 'CULTURE', macro: false },
  { label: 'Signal vs Noise',       category: 'DIGITAL', macro: false },
];

const AMBIENT_COUNT = 50;
const TREND_KEY = 'livepulse_trends';

const DEFAULT_TRENDS = [
  { title: 'The Quiet Luxury Shift',       insight: 'Consumers are rejecting loud branding in favor of understated prestige across all demographics.', category: 'Fashion'    },
  { title: 'AI Anxiety Peaks',             insight: 'Cultural unease around artificial intelligence is reshaping how brands communicate authenticity.',  category: 'Technology' },
  { title: 'Sports Betting Normalization', insight: 'Gambling culture has entered mainstream entertainment, redefining fan engagement economics.',        category: 'Sports'     },
  { title: 'Creator Economy Consolidation',insight: 'Top creators are signing traditional deals as the independent model shows signs of strain.',         category: 'Media'      },
  { title: 'Nostalgia as Strategy',        insight: 'Brands are mining the early 2000s with precision, targeting millennials entering peak spending years.',category: 'Marketing' },
  { title: 'Attention Economy Fracture',   insight: 'Average content half-life has dropped below 48 hours, forcing a rethink of partnership value.',      category: 'Culture'    },
];

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function NodePopup({ node, onClose }) {
  const [status, setStatus] = useState('loading');
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 400,
            messages: [{
              role: 'user',
              content: `You are a cultural intelligence engine. Analyze the cultural concept "${node.label}" as it exists in ${new Date().getFullYear()}.

Return ONLY a valid JSON object — no preamble, no markdown, no backticks. Exactly these keys:
- "summary": what this concept is (1-2 sentences, plain and direct)
- "impact": how it is actively shaping culture right now (1-2 sentences, specific and sharp)
- "heat": a number from 1 to 10 — how culturally active this concept is right now (10 = peak cultural moment, 1 = fading signal)
- "direction": exactly one of these three words — "Rising", "Peak", or "Declining"`,
            }],
          }),
        });
        const data = await res.json();
        const raw = data.content?.find(b => b.type === 'text')?.text || '{}';
        const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
        setContent(parsed);
        setStatus('loaded');
      } catch {
        setStatus('error');
      }
    };
    fetch_();
  }, [node.label]);

  const W = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const H = typeof window !== 'undefined' ? window.innerHeight : 800;
  const PW = 292;
  const PH = 230;
  const GAP = 22;

  let left = node.screenX + GAP;
  let top  = node.screenY - PH / 2;
  if (left + PW > W - 16) left = node.screenX - PW - GAP;
  if (top < 80)           top  = 80;
  if (top + PH > H - 16)  top  = H - PH - 16;

  const catColor = CATEGORIES[node.category] || '#D4845A';
  const dirColor = { Rising: '#7EC8A0', Peak: '#D4BA5A', Declining: '#C47070' };

  return (
    <div
      style={{
        position: 'fixed',
        left,
        top,
        width: PW,
        background: 'rgba(8,5,3,0.97)',
        border: `1px solid ${catColor}45`,
        borderRadius: 10,
        padding: '16px 18px',
        zIndex: 100,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: catColor, marginBottom: 5, fontWeight: 500 }}>
            {node.category.charAt(0) + node.category.slice(1).toLowerCase()}{node.macro ? ' · Macro Trend' : ''}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(245,232,220,0.95)', lineHeight: 1.3 }}>
            {node.label}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'rgba(245,232,220,0.28)', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '2px 0 0 10px', flexShrink: 0 }}
        >
          x
        </button>
      </div>

      {status === 'loading' && (
        <div style={{ fontSize: 11, color: 'rgba(245,232,220,0.28)', paddingTop: 6 }}>
          Reading culture...
        </div>
      )}

      {status === 'error' && (
        <div style={{ fontSize: 11, color: 'rgba(196,112,112,0.65)', paddingTop: 6 }}>
          Could not load insight. Try again.
        </div>
      )}

      {status === 'loaded' && content && (
        <>
          <div style={{ fontSize: 11, color: 'rgba(245,232,220,0.5)', lineHeight: 1.65, marginBottom: 10 }}>
            {content.summary}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(245,232,220,0.78)', lineHeight: 1.65, marginBottom: 14, borderLeft: `2px solid ${catColor}55`, paddingLeft: 10 }}>
            {content.impact}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,232,220,0.28)', marginBottom: 5 }}>
                Cultural Heat
              </div>
              <div style={{ height: 3, background: 'rgba(245,232,220,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(content.heat / 10) * 100}%`, background: catColor, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: dirColor[content.direction] || catColor }}>
                {content.direction}
              </div>
              <div style={{ fontSize: 9, color: 'rgba(245,232,220,0.28)' }}>{content.heat}/10</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function LivePulse({ currentUser, onEnter }) {
  const canvasRef   = useRef(null);
  const animRef     = useRef(null);
  const nodesRef    = useRef([]);
  const edgesRef    = useRef([]);
  const particlesRef= useRef([]);
  const frameRef    = useRef(0);

  const [trends,       setTrends]      = useState([]);
  const [cardIndex,    setCardIndex]   = useState(0);
  const [cardVisible,  setCardVisible] = useState(false);
  const [isRefreshing, setIsRefreshing]= useState(false);
  const [refreshError, setRefreshError]= useState('');
  const [activePopup,  setActivePopup] = useState(null);

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TREND_KEY);
      setTrends(stored ? JSON.parse(stored) : DEFAULT_TRENDS);
    } catch { setTrends(DEFAULT_TRENDS); }
  }, []);

  useEffect(() => {
    if (!trends.length) return;
    const show = (i) => { setCardIndex(i); setCardVisible(true); setTimeout(() => setCardVisible(false), 5500); };
    const t0 = setTimeout(() => show(0), 2500);
    let cur = 0;
    const iv = setInterval(() => { cur = (cur + 1) % trends.length; show(cur); }, 9000);
    return () => { clearTimeout(t0); clearInterval(iv); };
  }, [trends]);

  const refreshTrends = useCallback(async () => {
    if (!isAdmin || isRefreshing) return;
    setIsRefreshing(true);
    setRefreshError('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a cultural intelligence engine monitoring the pulse of global culture in ${new Date().getFullYear()}. Generate exactly 6 major cultural trends, forces, or shifts active right now across sports, music, fashion, finance, and entertainment. Return ONLY a valid JSON array with no preamble and no markdown formatting. Each object must have exactly three keys: "title" (3 to 5 words), "insight" (one sharp sentence under 25 words), "category" (one word).`,
          }],
        }),
      });
      const data = await res.json();
      const raw  = data.content?.find(b => b.type === 'text')?.text || '[]';
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTrends(parsed);
        localStorage.setItem(TREND_KEY, JSON.stringify(parsed));
        setCardIndex(0); setCardVisible(true);
        setTimeout(() => setCardVisible(false), 5500);
      }
    } catch { setRefreshError('Refresh failed. Try again.'); }
    finally  { setIsRefreshing(false); }
  }, [isAdmin, isRefreshing]);

  const handleCanvasClick = useCallback((e) => {
    if (activePopup) { setActivePopup(null); return; }
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    let nearest = null;
    let nearestDist = Infinity;
    nodesRef.current.forEach(n => {
      if (!n.labeled) return;
      const d = Math.sqrt((n.x - cx) ** 2 + (n.y - cy) ** 2);
      if (d < 32 && d < nearestDist) { nearestDist = d; nearest = n; }
    });
    if (nearest) {
      setActivePopup({
        label:   nearest.label,
        category:nearest.category,
        macro:   nearest.macro,
        screenX: nearest.x + rect.left,
        screenY: nearest.y + rect.top,
      });
    }
  }, [activePopup]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const getBezierCP = (na, nb, dist) => {
      const mx = (na.x + nb.x) / 2;
      const my = (na.y + nb.y) / 2;
      const dx = nb.x - na.x;
      const dy = nb.y - na.y;
      const len = Math.max(dist, 1);
      const offset = dist * 0.18;
      return { cpX: mx + (-dy / len) * offset, cpY: my + (dx / len) * offset };
    };

    const initNodes = () => {
      const W = canvas.width;
      const H = canvas.height;
      const nodes = [];

      LABELED_NODES.forEach((def, i) => {
        const angle   = (i / LABELED_NODES.length) * Math.PI * 2;
        const scatter = 0.6 + Math.random() * 0.45;
        const x = W / 2 + Math.cos(angle) * W * 0.32 * scatter + (Math.random() - 0.5) * 80;
        const y = H / 2 + Math.sin(angle) * H * 0.30 * scatter + (Math.random() - 0.5) * 60;
        nodes.push({
          x, y,
          r: def.macro ? 10 + Math.random() * 4 : 5 + Math.random() * 3,
          labeled: true,
          label: def.label,
          category: def.category,
          macro: def.macro,
          color: CATEGORIES[def.category],
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: def.macro ? 0.004 + Math.random() * 0.003 : 0.007 + Math.random() * 0.005,
          driftX: (Math.random() - 0.5) * (def.macro ? 0.06 : 0.10),
          driftY: (Math.random() - 0.5) * (def.macro ? 0.06 : 0.10),
        });
      });

      for (let i = 0; i < AMBIENT_COUNT; i++) {
        nodes.push({
          x: 60 + Math.random() * (W - 120),
          y: 60 + Math.random() * (H - 120),
          r: 2 + Math.random() * 3,
          labeled: false, label: null, category: null, macro: false,
          color: '#8B4010',
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.004 + Math.random() * 0.007,
          driftX: (Math.random() - 0.5) * 0.07,
          driftY: (Math.random() - 0.5) * 0.07,
        });
      }

      nodesRef.current = nodes;

      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const bothLabeled   = nodes[i].labeled && nodes[j].labeled;
          const sameCategory  = bothLabeled && nodes[i].category === nodes[j].category;
          const threshold     = bothLabeled ? 230 : 130;
          if (dist < threshold) {
            edges.push({ a: i, b: j, dist, bothLabeled, sameCategory,
              color: sameCategory ? CATEGORIES[nodes[i].category] : null });
          }
        }
      }
      edgesRef.current = edges;

      const primaryEdges = edges.filter(e => e.bothLabeled);
      const particles = [];
      for (let i = 0; i < 28; i++) {
        const pool = i < 20 ? primaryEdges : edges;
        if (pool.length) {
          particles.push({ edge: pool[Math.floor(Math.random() * pool.length)], t: Math.random(), speed: 0.0008 + Math.random() * 0.0014 });
        }
      }
      particlesRef.current = particles;
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const nodes    = nodesRef.current;
      const edges    = edgesRef.current;
      const particles= particlesRef.current;
      const frame    = frameRef.current;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Edges
      edges.forEach(e => {
        const na = nodes[e.a], nb = nodes[e.b];
        if (!na || !nb) return;
        const { cpX, cpY } = getBezierCP(na, nb, e.dist);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.quadraticCurveTo(cpX, cpY, nb.x, nb.y);
        if (e.sameCategory && e.color) {
          const c = hexToRgb(e.color);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.22)`;
          ctx.lineWidth = 0.85;
        } else if (e.bothLabeled) {
          ctx.strokeStyle = 'rgba(180,140,100,0.11)';
          ctx.lineWidth = 0.55;
        } else {
          ctx.strokeStyle = 'rgba(107,48,16,0.09)';
          ctx.lineWidth = 0.35;
        }
        ctx.stroke();
      });

      // Particles — travel along bezier curve
      particles.forEach(part => {
        part.t += part.speed;
        if (part.t > 1) {
          part.t = 0;
          const pool = edgesRef.current.filter(e => e.bothLabeled);
          const src  = pool.length ? pool : edgesRef.current;
          if (src.length) part.edge = src[Math.floor(Math.random() * src.length)];
        }
        const na = nodes[part.edge.a], nb = nodes[part.edge.b];
        if (!na || !nb) return;
        const { cpX, cpY } = getBezierCP(na, nb, part.edge.dist);
        const t = part.t;
        const bx = (1 - t) * (1 - t) * na.x + 2 * (1 - t) * t * cpX + t * t * nb.x;
        const by = (1 - t) * (1 - t) * na.y + 2 * (1 - t) * t * cpY + t * t * nb.y;
        const pc = part.edge.color ? hexToRgb(part.edge.color) : { r: 255, g: 176, b: 133 };
        ctx.beginPath();
        ctx.arc(bx, by, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pc.r},${pc.g},${pc.b},0.88)`;
        ctx.fill();
      });

      // Nodes
      nodes.forEach(n => {
        n.x += n.driftX; n.y += n.driftY;
        if (n.x < 40 || n.x > W - 40) n.driftX *= -1;
        if (n.y < 40 || n.y > H - 40) n.driftY *= -1;

        const pulse = 0.5 + 0.5 * Math.sin(frame * n.pulseSpeed + n.phase);

        if (n.labeled) {
          const col = hexToRgb(n.color);
          const r   = n.r * (0.88 + 0.2 * pulse);

          // Macro nodes: outer glow ring
          if (n.macro) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${0.14 * pulse})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.72 + 0.22 * pulse})`;
          ctx.fill();

          const fs = n.macro ? 14 : 12;
          ctx.font = `${n.macro ? 600 : 500} ${fs}px -apple-system, BlinkMacSystemFont, sans-serif`;
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.52 + 0.34 * pulse})`;
          ctx.fillText(n.label, n.x + r + 9, n.y + fs * 0.38);
        } else {
          const col = hexToRgb('#8B4010');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (0.8 + 0.25 * pulse), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.17 + 0.13 * pulse})`;
          ctx.fill();
        }
      });

      frameRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('click', handleCanvasClick);
    return () => canvas.removeEventListener('click', handleCanvasClick);
  }, [handleCanvasClick]);

  const activeCard = trends[cardIndex] || null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: BG, zIndex: 30, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, cursor: 'crosshair' }} />

      {/* Watermark */}
      <div style={{ position: 'absolute', top: 32, left: 0, right: 0, textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,232,220,0.16)' }}>
          CultureOS
        </span>
      </div>

      {/* Category legend — top left */}
      <div style={{ position: 'absolute', top: 76, left: 36, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {Object.entries(CATEGORIES).map(([key, color]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, opacity: 0.75 }} />
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${color}88` }}>
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Admin refresh — top right */}
      {isAdmin && (
        <div style={{ position: 'absolute', top: 76, right: 36, zIndex: 10, textAlign: 'right' }}>
          <button
            onClick={refreshTrends}
            disabled={isRefreshing}
            style={{
              background: 'transparent',
              border: '1px solid rgba(212,132,90,0.35)',
              borderRadius: 5,
              padding: '7px 18px',
              color: isRefreshing ? 'rgba(212,132,90,0.3)' : 'rgba(212,132,90,0.65)',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: isRefreshing ? 'not-allowed' : 'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              transition: 'all 0.25s ease',
            }}
          >
            {isRefreshing ? 'Reading Culture...' : 'Refresh Trends'}
          </button>
          {refreshError && (
            <div style={{ fontSize: 10, color: 'rgba(212,132,90,0.55)', marginTop: 6, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
              {refreshError}
            </div>
          )}
        </div>
      )}

      {/* Floating trend card — bottom right, hidden while popup open */}
      {activeCard && !activePopup && (
        <div
          style={{
            position: 'absolute', bottom: 130, right: 52, width: 272,
            background: 'rgba(12,7,5,0.9)',
            border: '1px solid rgba(212,132,90,0.26)',
            borderRadius: 9, padding: '16px 20px', zIndex: 10,
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 1s ease, transform 1s ease',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,132,90,0.8)', marginBottom: 9, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 500 }}>
            {activeCard.category}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,232,220,0.92)', marginBottom: 9, lineHeight: 1.45, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            {activeCard.title}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(245,232,220,0.44)', lineHeight: 1.65, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            {activeCard.insight}
          </div>
        </div>
      )}

      {/* Hint — bottom left */}
      {!activePopup && (
        <div style={{ position: 'absolute', bottom: 130, left: 36, zIndex: 10, pointerEvents: 'none' }}>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,232,220,0.16)' }}>
            Click any node to explore
          </span>
        </div>
      )}

      {/* Node popup */}
      {activePopup && <NodePopup node={activePopup} onClose={() => setActivePopup(null)} />}

      {/* Enter button */}
      <div style={{ position: 'absolute', bottom: 52, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <button
          onClick={onEnter}
          style={{
            background: 'transparent',
            border: '1px solid rgba(245,232,220,0.2)',
            borderRadius: 5,
            padding: '13px 44px',
            color: 'rgba(245,232,220,0.5)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 500,
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,132,90,0.52)'; e.currentTarget.style.color = 'rgba(212,132,90,0.82)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,232,220,0.2)';  e.currentTarget.style.color = 'rgba(245,232,220,0.5)';  }}
        >
          Enter CultureOS
        </button>
      </div>
    </div>
  );
}
