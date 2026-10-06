// NYUMets homepage brain animation. Canvas only, no dependencies.
(function () {
  function init(c, compact, props) {
    const ctx = c.getContext('2d');
      let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const N = props.points || 2600, pts = [];
      const gyri = (u, v) => 0.04 * Math.sin(u * 9 + Math.sin(v * 7) * 1.5) * Math.sin(v * 8 + Math.cos(u * 5));
      for (let i = 0; i < N; i++) {
        const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1);
        let x = Math.sin(v) * Math.cos(u), y = Math.cos(v), z = Math.sin(v) * Math.sin(u);
        const r = 1 + gyri(u, v), f = i / N;
        if (f < 0.84) {
          const side = x >= 0 ? 1 : -1;
          x = side * (0.05 + Math.abs(x) * 0.6) * r; z = z * 1.0 * r; y = y * 0.66 * r;
          if (y < 0) y *= 0.6;
          if (y < -0.12 && z > -0.1 && z < 0.45) y -= 0.16 * Math.sin((z + 0.1) / 0.55 * Math.PI) * Math.min(1, -y * 4);
          if (y < -0.05 && z < -0.35) y = -0.05 + (y + 0.05) * 0.5;
          y += 0.1 * (1 - z * z);
        } else if (f < 0.95) {
          x = x * 0.45; y = -0.4 + y * 0.18; z = -0.62 + z * 0.24;
        } else {
          x = x * 0.11; z = -0.32 + z * 0.11; y = -0.45 - rnd() * 0.45;
        }
        pts.push({ x, y, z });
      }
      const pick = (zr, yr) => { for (let k = 0; k < 4000; k++) { const p = pts[rnd() * N * 0.84 | 0]; if (p.x > 0.35 && p.z > zr[0] && p.z < zr[1] && p.y > yr[0] && p.y < yr[1]) return { x: p.x * 0.9, y: p.y * 0.9, z: p.z * 0.9 }; } return { x: 0.5, y: 0.2, z: 0 }; };
      const lesions = [
        { ...pick([0.35, 0.7], [0.1, 0.45]), k: [[0, .8], [90, .5], [180, .35], [450, 0]] },
        { ...pick([-0.3, 0.1], [0.35, 0.7]), k: [[0, .6], [90, .42], [180, .4], [700, .3], [1100, .3]] },
        { ...pick([-0.7, -0.4], [0.0, 0.3]), k: [[0, .5], [90, .32], [300, .26], [1100, .2]] },
        { ...pick([0.0, 0.4], [-0.3, 0.0]), k: [[0, 0], [260, 0], [300, .55], [320, .6], [450, .35], [700, .2], [1100, .18]] }
      ];
      const size = (l, d) => { const k = l.k; if (d <= k[0][0]) return k[0][1]; for (let i = 1; i < k.length; i++) if (d <= k[i][0]) { const [d0, v0] = k[i - 1], [d1, v1] = k[i]; return v0 + (v1 - v0) * (d - d0) / (d1 - d0); } return k[k.length - 1][1]; };
      const ev = [
        { d: 0, t: 'gk', tg: [0, 1, 2], vc: '2 · Gamma Knife' },
        { d: 88, t: 'mri', vc: '3 · Image' }, { d: 92, t: 'fu', vc: '4 · Follow Up', mac: '2 · Partial response', kps: 90, n: 3 },
        { d: 178, t: 'mri', vc: '3 · Image' }, { d: 182, t: 'fu', vc: '4 · Follow Up', mac: '3 · Stable', kps: 90, n: 3 },
        { d: 296, t: 'mri', vc: '3 · Image' }, { d: 300, t: 'fu', vc: '4 · Follow Up', mac: '4 · Progression', kps: 80, n: 4, nw: 1 },
        { d: 322, t: 'gk', tg: [3], vc: '2 · Gamma Knife' },
        { d: 446, t: 'mri', vc: '3 · Image' }, { d: 450, t: 'fu', vc: '4 · Follow Up', mac: '2 · Partial response', kps: 80, n: 3 },
        { d: 696, t: 'mri', vc: '3 · Image' }, { d: 700, t: 'fu', vc: '4 · Follow Up', mac: '3 · Stable', kps: 80, n: 3 },
        { d: 996, t: 'mri', vc: '3 · Image' }, { d: 1000, t: 'fu', vc: '4 · Follow Up', mac: '3 · Stable', kps: 70, n: 3 }
      ];
      const DAYS = 1100, LOOP = 20;
      let raf, W, H, dpr, fired = new Array(ev.length).fill(-1), lastDay = -1;
      const resize = () => { dpr = window.devicePixelRatio || 1; W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; };
      resize(); const ro = new ResizeObserver(resize); ro.observe(c);
      const mono = sz => sz + 'px ui-monospace, Menlo, monospace';
      const draw = now => {
        const t = now / 1000, day = ((t % LOOP) / LOOP) * DAYS;
        if (day < lastDay) fired.fill(-1);
        lastDay = day;
        ev.forEach((e, i) => { if (fired[i] < 0 && day >= e.d) fired[i] = t; });
        const ry = Math.PI / 2 + 0.55 * Math.sin(t * 0.16), rx = -0.12 + Math.sin(t * 0.1) * 0.08;
        const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
        const trackY = H - (compact ? 4 : 8);
        const S = Math.min(W * 0.95, (trackY - 20) * 1.15) * 0.42, ox = W * 0.5, oy = H * 0.5 + S * 0.3;
        const proj = p => { let x = p.x * cy + p.z * sy, z = -p.x * sy + p.z * cy, y = p.y * cx - z * sx; z = p.y * sx + z * cx; const k = 2.8 / (2.8 + z); return [ox + x * S * k, oy - y * S * k, z, k]; };
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
        let sliceY = null;
        ev.forEach((e, i) => { if (e.t === 'mri' && fired[i] >= 0) { const p = (t - fired[i]) / 1.3; if (p >= 0 && p <= 1) sliceY = 0.75 - p * 1.5; } });
        for (const p of pts) {
          const [X, Y, Z, k] = proj(p), hit = sliceY !== null && Math.abs(p.y - sliceY) < 0.035;
          ctx.globalAlpha = Math.min(1, (0.4 + 0.55 * (1 - (Z + 1) / 2)) * (hit ? 2 : 1));
          ctx.fillStyle = hit ? '#3d0462' : '#702b9d';
          const r = (hit ? 2.2 : 1.6) * k; ctx.fillRect(X - r / 2, Y - r / 2, r, r);
        }
        ev.forEach((e, i) => {
          if (e.t !== 'gk' || fired[i] < 0) return;
          const p = (t - fired[i]) / 1.8; if (p > 1) return;
          e.tg.forEach(li => {
            const [X, Y] = proj(lesions[li]), R0 = S * 1.35;
            for (let j = 0; j < 18; j++) {
              const ang = j / 18 * Math.PI * 2 + li, ca = Math.cos(ang), sa = Math.sin(ang), m = 6;
              let R = R0;
              if (ca > 0) R = Math.min(R, (W - m - X) / ca); else if (ca < 0) R = Math.min(R, (m - X) / ca);
              if (sa > 0) R = Math.min(R, (H - m - Y) / sa); else if (sa < 0) R = Math.min(R, (m - Y) / sa);
              if (R < 12) continue;
              const sxp = X + ca * R, syp = Y + sa * R;
              const g = ctx.createLinearGradient(sxp, syp, X, Y); g.addColorStop(0, '#8a51af00'); g.addColorStop(1, '#3d0462');
              ctx.globalAlpha = (1 - p) * 0.55; ctx.strokeStyle = g; ctx.lineWidth = 0.8;
              ctx.beginPath(); ctx.moveTo(sxp, syp); ctx.lineTo(X + (sxp - X) * p * 0.15, Y + (syp - Y) * p * 0.15); ctx.stroke();
            }
          });
        });
        lesions.forEach((l, i) => {
          const v = size(l, day); if (v <= 0.01 && !(l.k[0][1] > 0 && day < l.k[l.k.length - 1][0] + 200)) return;
          const [X, Y, Z, k] = proj(l), front = 1 - (Z + 1) / 2, r = (2 + v * 13) * k * (compact ? 0.75 : 1);
          let peak = 0; for (let dd = 0; dd <= day; dd += 10) peak = Math.max(peak, size(l, dd));
          if (peak - v > 0.04) {
            const pr = (2 + peak * 13) * k * (compact ? 0.75 : 1) * 0.5;
            ctx.globalAlpha = (0.35 + 0.4 * front) * Math.min(1, (peak - v) * 6); ctx.strokeStyle = '#8a51af'; ctx.lineWidth = 1; ctx.setLineDash([2, 2.5]);
            ctx.beginPath(); ctx.arc(X, Y, pr, 0, 6.29); ctx.stroke(); ctx.setLineDash([]);
            ctx.globalAlpha = (0.12 + 0.15 * front); ctx.fillStyle = '#ab83c6'; ctx.beginPath(); ctx.arc(X, Y, pr, 0, 6.29); ctx.fill();
          }
          ctx.globalAlpha = 0.45 + 0.55 * front; ctx.fillStyle = '#702b9d'; ctx.shadowColor = '#8a51af'; ctx.shadowBlur = 18;
          ctx.beginPath(); ctx.arc(X, Y, r * 0.5, 0, 6.29); ctx.fill(); ctx.shadowBlur = 0;
          ctx.globalAlpha = 0.25 + 0.3 * front; ctx.strokeStyle = '#8a51af'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(X, Y, r * 1.5, 0, 6.29); ctx.stroke();
          ctx.globalAlpha = 0.45 + 0.5 * front; ctx.fillStyle = '#494755'; ctx.font = (compact ? 9 : 10) + 'px ui-monospace, Menlo, monospace'; const treated = ev.some((e, j) => e.t === 'gk' && fired[j] >= 0 && e.tg.includes(i)); const lab = 'T' + (i + 1); ctx.fillText(lab, X + r * 1.5 + 5, Y + 3); if (treated) { const tw = ctx.measureText(lab).width; ctx.fillStyle = '#8a51af'; ctx.fillText('· GK', X + r * 1.5 + 9 + tw, Y + 3); }
          
        });
        ev.forEach((e, i) => {
          if (e.t !== 'gk' || fired[i] < 0) return;
          const age = t - fired[i]; if (age > 3.4) return;
          const fade = age < 0.3 ? age / 0.3 : (age > 2.6 ? 1 - (age - 2.6) / 0.8 : 1);
          const P = e.tg.map(li => proj(lesions[li]));
          const title = e.d === 0 ? 'Gamma Knife radiosurgery' : 'Repeat Gamma Knife';
          ctx.font = '600 ' + (compact ? 10 : 12) + 'px Montserrat, system-ui, sans-serif';
          const tw = Math.max(ctx.measureText(title).width, (compact ? 9 : 10) * 0.62 * ('targets ' + e.tg.map(x => 'T' + (x + 1)).join(' · ')).length);
          const pad = compact ? 10 : 16, minX = Math.min(...P.map(p => p[0])), maxX = Math.max(...P.map(p => p[0]));
          let lx = maxX + (compact ? 22 : 40);
          if (lx + tw > W - pad) lx = minX - (compact ? 22 : 40) - tw;
          lx = Math.max(pad, Math.min(lx, W - pad - tw));
          const ly = Math.max(pad + 12, Math.min(...P.map(p => p[1])) - (compact ? 22 : 36));
          const ax = lx + tw < minX ? lx + tw + 4 : lx - 4;
          ctx.globalAlpha = fade * 0.7; ctx.strokeStyle = '#8a51af'; ctx.lineWidth = 0.75; ctx.setLineDash([2, 3]);
          P.forEach(([X, Y]) => { ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(ax, ly + 4); ctx.stroke(); });
          ctx.setLineDash([]);
          ctx.globalAlpha = fade; ctx.fillStyle = '#3d0462'; ctx.font = '600 ' + (compact ? 10 : 12) + 'px Montserrat, system-ui, sans-serif';
          ctx.fillText(title, lx, ly);
          ctx.fillStyle = '#5f5d68'; ctx.font = (compact ? 9 : 10) + 'px ui-monospace, Menlo, monospace';
          ctx.fillText('targets ' + e.tg.map(x => 'T' + (x + 1)).join(' · '), lx, ly + (compact ? 13 : 16));
        });
        ctx.globalAlpha = 1;
        const x0 = compact ? 12 : 8, x1 = W - (compact ? 12 : 8), tx = d => x0 + (x1 - x0) * d / DAYS;
        let last = null, lastFu = null;
        ev.forEach((e, i) => { if (fired[i] >= 0) { last = e; if (e.t === 'fu') lastFu = e; } });
        const n = lesions.filter(l => size(l, day) > 0.01).length;
        const rows = compact
          ? [['time_from_gk_days', String(Math.round(day))], ['visit_class', last ? last.vc : '—']]
          : [['patient_identifier', '40718263'], ['time_from_gk_days', String(Math.round(day))], ['visit_class', last ? last.vc : '—'], ['gk_count', String(ev.filter((e, i) => e.t === 'gk' && fired[i] >= 0).length)], ['num_tumors_treated', String(n)], ['macdonaldcriteria', lastFu ? lastFu.mac : '—'], ['kps_fu', lastFu ? String(lastFu.kps) : '—']];
        const lh = compact ? 14 : 17, rx0 = compact ? 12 : 8, ry0 = compact ? 16 : 18;
        if (props.showData) rows.forEach(([k, v], i) => {
          ctx.font = mono(compact ? 9 : 11); ctx.fillStyle = '#9b9a97'; ctx.fillText(k, rx0, ry0 + i * lh);
          ctx.fillStyle = (k === 'visit_class' || k === 'macdonaldcriteria') ? '#702b9d' : '#1f1d22'; ctx.fillText(v, rx0 + (compact ? 110 : 140), ry0 + i * lh);
        });

        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      
  }
  function start() {
    var c = document.getElementById('nm-brain'); if (!c) return;
    var compact = window.innerWidth < 860;
    init(c, compact, { compact: compact, points: compact ? 1800 : 3200 });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();