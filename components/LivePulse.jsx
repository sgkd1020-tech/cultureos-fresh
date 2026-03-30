'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Built by stargirl | CAA | March 2026

const PALETTE = {
  bg: '#060404',
  nodePrimary: '#D4845A',
  nodeAmbient: '#8B4010',
  edge: '#6B3010',
  particle: '#FFB085',
};

const LABELED_NODES = [
  'Quiet Luxury',
  'The Algorithm',
  'Hype Cycle',
  'Creator Class',
  'Fan Economy',
  'Gen Z Rage',
  'Soft Life',
  'Main Character Energy',
  'Nostalgia Loop',
  'AI Anxiety',
  'Post-Streaming Era',
  'Sports Betting Wave',
  'Attention Economy',
  'Viral Grief',
  'Collective Joy',
  'Cancel Spiral',
  'Comeback Arc',
  'Cultural Velocity',
  'The Discourse',
  'Trend Half-Life',
  'Rage Bait',
  'Parasocial Bond',
  'Identity Flux',
  'The Aesthetic',
  'Signal vs Noise',
];

const AMBIENT_COUNT = 55;
const TREND_KEY = 'livepulse_trends';

const DEFAULT_TRENDS = [
  {
    title: 'The Quiet Luxury Shift',
    insight: 'Consumers are rejecting loud branding in favor of understated prestige across all demographics.',
    category: 'Fashion',
  },
  {
    title: 'AI Anxiety Peaks',
    insight: 'Cultural unease around artificial intelligence is reshaping how brands communicate authenticity.',
    category: 'Technology',
  },
  {
    title: 'Sports Betting Normalization',
    insight: 'Gambling culture has entered mainstream entertainment, redefining fan engagement economics.',
    category: 'Sports',
  },
  {
    title: 'Creator Economy Consolidation',
    insight: 'Top creators are signing traditional deals as the independent model shows signs of strain.',
    category: 'Media',
  },
  {
    title: 'Nostalgia as Strategy',
    insight: 'Brands are mining the early 2000s with precision, targeting millennials entering peak spending years.',
    category: 'Marketing',
  },
  {
    title: 'Attention Economy Fracture',
    insight: 'Average content half-life has dropped below 48 hours, forcing a rethink of partnership value.',
    category: 'Culture',
  },
];

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export default function LivePulse({ currentUser, onEnter }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);

  const [trends, setTrends] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState('');

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TREND_KEY);
      setTrends(stored ? JSON.parse(stored) : DEFAULT_TRENDS);
    } catch {
      setTrends(DEFAULT_TRENDS);
    }
  }, []);

  useEffect(() => {
    if (!trends.length) return;

    const showCard = (index) => {
      setCardIndex(index);
      setCardVisible(true);
      setTimeout(() => setCardVisible(false), 5500);
    };

    const initial = setTimeout(() => showCard(0), 2500);

    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % trends.length;
      showCard(current);
    }, 9000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [trends]);

  const refreshTrends = useCallback(async () => {
    if (!isAdmin || isRefreshing) return;
    setIsRefreshing(true);
    setRefreshError('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are a cultural intelligence engine monitoring the pulse of global culture in ${new Date().getFullYear()}. Generate exactly 6 major cultural trends, forces, or shifts active right now across sports, music, fashion, finance, and entertainment. Return ONLY a valid JSON array with no preamble and no markdown formatting. Each object must have exactly three keys: "title" (3 to 5 words), "insight" (one sharp sentence under 25 words), "category" (one word).`,
            },
          ],
        }),
      });

      const data = await response.json();
      const raw = data.content?.find((b) => b.type === 'text')?.text || '[]';
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (Array.isArray(parsed) && parsed.length > 0) {
        setTrends(parsed);
        localStorage.setItem(TREND_KEY, JSON.stringify(parsed));
        setCardIndex(0);
        setCardVisible(true);
        setTimeout(() => setCardVisible(false), 5500);
      }
    } catch {
      setRefreshError('Refresh failed. Try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, [isAdmin, isRefreshing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const initNodes = () => {
      const W = canvas.width;
      const H = canvas.height;
      const nodes = [];

      LABELED_NODES.forEach((label, i) => {
        const angle = (i / LABELED_NODES.length) * Math.PI * 2;
        const rx = W * 0.36;
        const ry = H * 0.34;
        const scatter = 0.55 + Math.random() * 0.55;
        const x = W / 2 + Math.cos(angle) * rx * scatter + (Math.random() - 0.5) * 120;
        const y = H / 2 + Math.sin(angle) * ry * scatter + (Math.random() - 0.5) * 80;
        nodes.push({
          x,
          y,
          r: 3.5 + Math.random() * 2,
          labeled: true,
          label,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.007 + Math.random() * 0.005,
          driftX: (Math.random() - 0.5) * 0.1,
          driftY: (Math.random() - 0.5) * 0.1,
        });
      });

      for (let i = 0; i < AMBIENT_COUNT; i++) {
        nodes.push({
          x: 60 + Math.random() * (W - 120),
          y: 60 + Math.random() * (H - 120),
          r: 1.2 + Math.random() * 2.8,
          labeled: false,
          label: null,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.004 + Math.random() * 0.008,
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
          if (dist < 170) {
            edges.push({ a: i, b: j, dist });
          }
        }
      }
      edgesRef.current = edges;

      const particles = [];
      for (let i = 0; i < 20; i++) {
        if (edges.length) {
          const edge = edges[Math.floor(Math.random() * edges.length)];
          particles.push({
            edge,
            t: Math.random(),
            speed: 0.0012 + Math.random() * 0.0018,
          });
        }
      }
      particlesRef.current = particles;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const frame = frameRef.current;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = PALETTE.bg;
      ctx.fillRect(0, 0, W, H);

      const ec = hexToRgb(PALETTE.edge);
      edges.forEach((e) => {
        const na = nodes[e.a];
        const nb = nodes[e.b];
        if (!na || !nb) return;
        const alpha = Math.max(0, 0.1 - e.dist / 1800);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(${ec.r},${ec.g},${ec.b},${alpha})`;
        ctx.lineWidth = 0.35;
        ctx.stroke();
      });

      const pc = hexToRgb(PALETTE.particle);
      particles.forEach((part) => {
        part.t += part.speed;
        if (part.t > 1) {
          part.t = 0;
          if (edges.length) {
            part.edge = edges[Math.floor(Math.random() * edges.length)];
          }
        }
        const na = nodes[part.edge.a];
        const nb = nodes[part.edge.b];
        if (!na || !nb) return;
        const px = na.x + (nb.x - na.x) * part.t;
        const py = na.y + (nb.y - na.y) * part.t;
        ctx.beginPath();
        ctx.arc(px, py, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pc.r},${pc.g},${pc.b},0.8)`;
        ctx.fill();
      });

      nodes.forEach((n) => {
        n.x += n.driftX;
        n.y += n.driftY;
        if (n.x < 30 || n.x > W - 30) n.driftX *= -1;
        if (n.y < 30 || n.y > H - 30) n.driftY *= -1;

        const pulse = 0.5 + 0.5 * Math.sin(frame * n.pulseSpeed + n.phase);

        if (n.labeled) {
          const col = hexToRgb(PALETTE.nodePrimary);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (0.88 + 0.22 * pulse), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.65 + 0.3 * pulse})`;
          ctx.fill();

          ctx.font = '500 10.5px -apple-system, BlinkMacSystemFont, sans-serif';
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.45 + 0.3 * pulse})`;
          ctx.fillText(n.label, n.x + n.r + 6, n.y + 3.5);
        } else {
          const col = hexToRgb(PALETTE.nodeAmbient);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (0.8 + 0.28 * pulse), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.2 + 0.18 * pulse})`;
          ctx.fill();
        }
      });

      frameRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const activeCard = trends[cardIndex] || null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: PALETTE.bg,
        zIndex: 30,
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(245, 232, 220, 0.18)',
          }}
        >
          CultureOS
        </span>
      </div>

      {/* Admin refresh */}
      {isAdmin && (
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 36,
            zIndex: 10,
            textAlign: 'right',
          }}
        >
          <button
            onClick={refreshTrends}
            disabled={isRefreshing}
            style={{
              background: 'transparent',
              border: '1px solid rgba(212, 132, 90, 0.35)',
              borderRadius: 5,
              padding: '7px 18px',
              color: isRefreshing
                ? 'rgba(212, 132, 90, 0.35)'
                : 'rgba(212, 132, 90, 0.7)',
              fontSize: '10px',
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
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(212, 132, 90, 0.6)',
                marginTop: 6,
              }}
            >
              {refreshError}
            </div>
          )}
        </div>
      )}

      {/* Floating trend card */}
      {activeCard && (
        <div
          style={{
            position: 'absolute',
            bottom: 130,
            right: 52,
            width: 272,
            background: 'rgba(12, 7, 5, 0.9)',
            border: '1px solid rgba(212, 132, 90, 0.28)',
            borderRadius: 9,
            padding: '16px 20px',
            zIndex: 10,
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(212, 132, 90, 0.8)',
              marginBottom: 9,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 500,
            }}
          >
            {activeCard.category}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(245, 232, 220, 0.92)',
              marginBottom: 9,
              lineHeight: 1.45,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            {activeCard.title}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(245, 232, 220, 0.45)',
              lineHeight: 1.65,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            {activeCard.insight}
          </div>
        </div>
      )}

      {/* Enter button */}
      <div
        style={{
          position: 'absolute',
          bottom: 52,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <button
          onClick={onEnter}
          style={{
            background: 'transparent',
            border: '1px solid rgba(245, 232, 220, 0.22)',
            borderRadius: 5,
            padding: '13px 44px',
            color: 'rgba(245, 232, 220, 0.55)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 500,
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 132, 90, 0.55)';
            e.currentTarget.style.color = 'rgba(212, 132, 90, 0.85)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(245, 232, 220, 0.22)';
            e.currentTarget.style.color = 'rgba(245, 232, 220, 0.55)';
          }}
        >
          Enter CultureOS
        </button>
      </div>
    </div>
  );
}
