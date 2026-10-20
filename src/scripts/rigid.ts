
export type V = [number, number];

export type Shape = { pts: V[]; c: V; area: number; inertia: number; r: number };

export const shapeOf = (raw: V[]): Shape => {
  let pts = raw.slice();
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const cr = x0 * y1 - x1 * y0;
    area += cr;
    cx += (x0 + x1) * cr;
    cy += (y0 + y1) * cr;
  }
  area /= 2;
  cx /= 6 * area;
  cy /= 6 * area;
  if (area < 0) {
    pts = pts.reverse();
    area = -area;
  }
  const rel = pts.map(([x, y]) => [x - cx, y - cy] as V);
  let inertia = 0;
  for (let i = 0; i < rel.length; i++) {
    const [x0, y0] = rel[i];
    const [x1, y1] = rel[(i + 1) % rel.length];
    inertia += (x0 * y1 - x1 * y0) * (x0 * x0 + x0 * x1 + x1 * x1 + y0 * y0 + y0 * y1 + y1 * y1);
  }
  return { pts: rel, c: [cx, cy], area, inertia: inertia / 12, r: Math.max(...rel.map(([x, y]) => Math.hypot(x, y))) };
};

export type Body = {
  s: Shape;
  x: number;
  y: number;
  a: number;
  vx: number;
  vy: number;
  w: number;
  im: number;
  ii: number;
  wv: V[];
  wn: V[];
  rest: number;
  asleep: boolean;
  still: [number, number, number];
};

type Contact = { a: Body | null; b: Body; n: V; p: V; d: number; ra: V; rb: V; mn: number; mt: number; bias: number; pn: number; pt: number };

const G = 2600;
const MU = 0.8;
const BOUNCE = 0.2;
const SLOP = 0.5;
export const DT = 1 / 120;

const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1];

export const createWorld = (shapes: Shape[]) => {
  const bodies: Body[] = shapes.map((s) => ({
    s,
    x: 0,
    y: 0,
    a: 0,
    vx: 0,
    vy: 0,
    w: 0,
    im: 0,
    ii: 0,
    wv: s.pts.map(() => [0, 0] as V),
    wn: s.pts.map(() => [0, 0] as V),
    rest: 0,
    asleep: false,
    still: [0, 0, 0] as [number, number, number],
  }));
  const invM = (b: Body | null) => (b && !b.asleep ? b.im : 0);
  const invI = (b: Body | null) => (b && !b.asleep ? b.ii : 0);
  const wake = (b: Body) => {
    b.asleep = false;
    b.rest = 0;
  };
  const box = { W: 0, H: 0, k: 1 };
  let grab: { b: Body; lx: number; ly: number; tx: number; ty: number } | null = null;

  const size = (W: number, H: number, k: number) => {
    Object.assign(box, { W, H, k });
    for (const b of bodies) {
      b.im = 1 / (b.s.area * k * k);
      b.ii = 1 / (b.s.inertia * k ** 4);
    }
  };

  const pose = (b: Body) => {
    const c = Math.cos(b.a);
    const s = Math.sin(b.a);
    const n = b.s.pts.length;
    for (let i = 0; i < n; i++) {
      const [px, py] = b.s.pts[i];
      b.wv[i][0] = b.x + (px * c - py * s) * box.k;
      b.wv[i][1] = b.y + (px * s + py * c) * box.k;
    }
    for (let i = 0; i < n; i++) {
      const p = b.wv[i];
      const q = b.wv[(i + 1) % n];
      const dx = q[0] - p[0];
      const dy = q[1] - p[1];
      const l = Math.hypot(dx, dy) || 1;
      b.wn[i][0] = dy / l;
      b.wn[i][1] = -dx / l;
    }
  };

  const contact = (a: Body | null, b: Body, n: V, p: V, d: number): Contact => ({ a, b, n, p, d, ra: [0, 0], rb: [0, 0], mn: 0, mt: 0, bias: 0, pn: 0, pt: 0 });

  const walls = (b: Body, out: Contact[]) => {
    if (b.asleep) return;
    const { W, H } = box;
    for (const v of b.wv) {
      if (v[1] > H - SLOP) out.push(contact(null, b, [0, -1], [v[0], v[1]], v[1] - H));
      if (v[1] < SLOP) out.push(contact(null, b, [0, 1], [v[0], v[1]], -v[1]));
      if (v[0] < SLOP) out.push(contact(null, b, [1, 0], [v[0], v[1]], -v[0]));
      if (v[0] > W - SLOP) out.push(contact(null, b, [-1, 0], [v[0], v[1]], v[0] - W));
    }
  };

  const maxSep = (A: Body, B: Body): [number, number] => {
    let best = -Infinity;
    let index = 0;
    for (let i = 0; i < A.wv.length; i++) {
      const n = A.wn[i];
      const v = A.wv[i];
      let min = Infinity;
      for (const w of B.wv) min = Math.min(min, n[0] * (w[0] - v[0]) + n[1] * (w[1] - v[1]));
      if (min > best) {
        best = min;
        index = i;
      }
    }
    return [best, index];
  };

  const clip = (pts: V[], dir: V, o: number): V[] => {
    const out: V[] = [];
    const d0 = dot(dir, pts[0]) - o;
    const d1 = dot(dir, pts[1]) - o;
    if (d0 >= 0) out.push(pts[0]);
    if (d1 >= 0) out.push(pts[1]);
    if (d0 * d1 < 0) {
      const t = d0 / (d0 - d1);
      out.push([pts[0][0] + t * (pts[1][0] - pts[0][0]), pts[0][1] + t * (pts[1][1] - pts[0][1])]);
    }
    return out;
  };

  const pair = (A: Body, B: Body, out: Contact[]) => {
    if (A.asleep && B.asleep) return;
    const [sa, ia] = maxSep(A, B);
    if (sa > 0) return;
    const [sb, ib] = maxSep(B, A);
    if (sb > 0) return;
    const flip = sb > sa + 0.1;
    const ref = flip ? B : A;
    const inc = flip ? A : B;
    const ri = flip ? ib : ia;
    const n = ref.wn[ri];
    let ii = 0;
    let low = Infinity;
    for (let j = 0; j < inc.wn.length; j++) {
      const d = dot(n, inc.wn[j]);
      if (d < low) {
        low = d;
        ii = j;
      }
    }
    const v1 = ref.wv[ri];
    const v2 = ref.wv[(ri + 1) % ref.wv.length];
    const len = Math.hypot(v2[0] - v1[0], v2[1] - v1[1]) || 1;
    const t: V = [(v2[0] - v1[0]) / len, (v2[1] - v1[1]) / len];
    let pts = clip([inc.wv[ii], inc.wv[(ii + 1) % inc.wv.length]], t, dot(t, v1));
    if (pts.length < 2) return;
    pts = clip(pts, [-t[0], -t[1]], -dot(t, v2));
    if (pts.length < 2) return;
    const off = dot(n, v1);
    const normal: V = flip ? [-n[0], -n[1]] : [n[0], n[1]];
    for (const p of pts) {
      const sep = dot(n, p) - off;
      if (sep <= SLOP) out.push(contact(A, B, normal, [p[0], p[1]], -sep));
    }
  };

  const relV = (c: Contact): V => {
    const { a, b } = c;
    const bx = b.vx - b.w * c.rb[1];
    const by = b.vy + b.w * c.rb[0];
    return a ? [bx - (a.vx - a.w * c.ra[1]), by - (a.vy + a.w * c.ra[0])] : [bx, by];
  };
  const push = (c: Contact, px: number, py: number) => {
    const { a, b } = c;
    if (a && !a.asleep) {
      a.vx -= px * a.im;
      a.vy -= py * a.im;
      a.w -= (c.ra[0] * py - c.ra[1] * px) * a.ii;
    }
    if (!b.asleep) {
      b.vx += px * b.im;
      b.vy += py * b.im;
      b.w += (c.rb[0] * py - c.rb[1] * px) * b.ii;
    }
  };
  const prep = (c: Contact) => {
    const { a, b, n } = c;
    if (a) c.ra = [c.p[0] - a.x, c.p[1] - a.y];
    c.rb = [c.p[0] - b.x, c.p[1] - b.y];
    const vn = dot(relV(c), n);
    if (vn < -40) {
      if (a?.asleep) wake(a);
      if (b.asleep) wake(b);
    }
    const ima = invM(a);
    const iia = invI(a);
    const imb = invM(b);
    const iib = invI(b);
    const cna = c.ra[0] * n[1] - c.ra[1] * n[0];
    const cnb = c.rb[0] * n[1] - c.rb[1] * n[0];
    c.mn = 1 / (ima + imb + cna * cna * iia + cnb * cnb * iib);
    const cta = c.ra[0] * n[0] + c.ra[1] * n[1];
    const ctb = c.rb[0] * n[0] + c.rb[1] * n[1];
    c.mt = 1 / (ima + imb + cta * cta * iia + ctb * ctb * iib);
    c.bias = vn < -140 ? -BOUNCE * vn : 0;
  };
  const solve = (c: Contact) => {
    const n = c.n;
    const pn = Math.max(c.pn + c.mn * (c.bias - dot(relV(c), n)), 0);
    const dn = pn - c.pn;
    c.pn = pn;
    push(c, dn * n[0], dn * n[1]);
    const t: V = [-n[1], n[0]];
    const cap = MU * c.pn;
    const pt = Math.max(-cap, Math.min(cap, c.pt - c.mt * dot(relV(c), t)));
    const dt = pt - c.pt;
    c.pt = pt;
    push(c, dt * t[0], dt * t[1]);
  };

  const joint = { rx: 0, ry: 0, bx: 0, by: 0, gamma: 0, k11: 0, k12: 0, k22: 0, jx: 0, jy: 0, max: 0 };
  const holdPrep = () => {
    if (!grab) return;
    const { b } = grab;
    const c = Math.cos(b.a);
    const s = Math.sin(b.a);
    const rx = grab.lx * c - grab.ly * s;
    const ry = grab.lx * s + grab.ly * c;
    pose(b);
    const gx = b.x + rx;
    const gy = b.y + ry;
    let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
    for (const [vx, vy] of b.wv) {
      x0 = Math.min(x0, vx);
      y0 = Math.min(y0, vy);
      x1 = Math.max(x1, vx);
      y1 = Math.max(y1, vy);
    }
    const fit = (t: number, lo: number, hi: number) => (lo > hi ? (lo + hi) / 2 : Math.max(lo, Math.min(hi, t)));
    const tx = fit(grab.tx, gx - x0 + 1, box.W - (x1 - gx) - 1);
    const ty = fit(grab.ty, gy - y0 + 1, box.H - (y1 - gy) - 1);
    const m = 1 / b.im;
    const omega = 2 * Math.PI * 4;
    const stiff = m * omega * omega;
    const damp = 2 * m * 0.9 * omega;
    const gamma = 1 / (DT * (damp + DT * stiff));
    const beta = DT * stiff * gamma;
    const a11 = b.im + b.ii * ry * ry + gamma;
    const a12 = -b.ii * rx * ry;
    const a22 = b.im + b.ii * rx * rx + gamma;
    const det = a11 * a22 - a12 * a12;
    Object.assign(joint, {
      rx,
      ry,
      bx: (gx - tx) * beta,
      by: (gy - ty) * beta,
      gamma,
      k11: a22 / det,
      k12: -a12 / det,
      k22: a11 / det,
      jx: 0,
      jy: 0,
      max: m * G * 5 * DT,
    });
    b.w *= 0.98;
  };
  const holdSolve = () => {
    if (!grab) return;
    const { b } = grab;
    const { rx, ry } = joint;
    const cx = b.vx - b.w * ry + joint.bx + joint.gamma * joint.jx;
    const cy = b.vy + b.w * rx + joint.by + joint.gamma * joint.jy;
    let ix = -(joint.k11 * cx + joint.k12 * cy);
    let iy = -(joint.k12 * cx + joint.k22 * cy);
    const ox = joint.jx;
    const oy = joint.jy;
    joint.jx += ix;
    joint.jy += iy;
    const total = Math.hypot(joint.jx, joint.jy);
    if (total > joint.max) {
      joint.jx *= joint.max / total;
      joint.jy *= joint.max / total;
    }
    ix = joint.jx - ox;
    iy = joint.jy - oy;
    b.vx += ix * b.im;
    b.vy += iy * b.im;
    b.w += (rx * iy - ry * ix) * b.ii;
  };

  const contacts = () => {
    for (const b of bodies) pose(b);
    const cs: Contact[] = [];
    for (const b of bodies) walls(b, cs);
    for (let i = 0; i < bodies.length; i++)
      for (let j = i + 1; j < bodies.length; j++) {
        const A = bodies[i];
        const B = bodies[j];
        if (Math.hypot(A.x - B.x, A.y - B.y) < (A.s.r + B.s.r) * box.k) pair(A, B, cs);
      }
    return cs;
  };

  const step = () => {
    if (grab) wake(grab.b);
    for (const b of bodies) {
      if (b.asleep) continue;
      b.vy += G * DT;
      b.w *= 0.996;
    }
    const cs = contacts();
    for (const c of cs) prep(c);
    holdPrep();
    for (let it = 0; it < 12; it++) {
      for (const c of cs) solve(c);
      holdSolve();
    }
    for (const b of bodies) {
      if (b.asleep) continue;
      const v = Math.hypot(b.vx, b.vy);
      if (v > 2400) {
        b.vx *= 2400 / v;
        b.vy *= 2400 / v;
      }
      b.w = Math.max(-18, Math.min(18, b.w));
      b.x += b.vx * DT;
      b.y += b.vy * DT;
      b.a += b.w * DT;
    }
    for (const c of contacts()) {
      const fix = Math.max(c.d - SLOP, 0) * 0.5;
      const ima = invM(c.a);
      const imb = invM(c.b);
      const sum = ima + imb;
      if (!fix || !sum) continue;
      if (c.a) {
        c.a.x -= (c.n[0] * fix * ima) / sum;
        c.a.y -= (c.n[1] * fix * ima) / sum;
      }
      c.b.x += (c.n[0] * fix * imb) / sum;
      c.b.y += (c.n[1] * fix * imb) / sum;
    }
    for (const b of bodies) {
      if (b.asleep || grab) continue;
      const [sx, sy, sa] = b.still;
      if (Math.hypot(b.x - sx, b.y - sy) > 1.5 || Math.abs(b.a - sa) > 0.02) {
        b.still = [b.x, b.y, b.a];
        b.rest = 0;
      } else if (++b.rest > 60) {
        b.asleep = true;
        b.vx = b.vy = b.w = 0;
      }
    }
  };

  const overlap = () => {
    for (const b of bodies) pose(b);
    let worst = 0;
    for (let i = 0; i < bodies.length; i++)
      for (let j = i + 1; j < bodies.length; j++) {
        const s = Math.max(maxSep(bodies[i], bodies[j])[0], maxSep(bodies[j], bodies[i])[0]);
        if (s < 0) worst = Math.max(worst, -s);
      }
    return worst;
  };

  return {
    bodies,
    size,
    step,
    overlap,
    get still() {
      return !grab && bodies.every((b) => b.asleep);
    },
    wakeAll() {
      bodies.forEach(wake);
    },
    hold(b: Body, px: number, py: number) {
      bodies.forEach(wake);
      const c = Math.cos(b.a);
      const s = Math.sin(b.a);
      const dx = px - b.x;
      const dy = py - b.y;
      grab = { b, lx: dx * c + dy * s, ly: -dx * s + dy * c, tx: px, ty: py };
    },
    move(px: number, py: number) {
      if (grab) [grab.tx, grab.ty] = [px, py];
    },
    drop() {
      grab = null;
    },
    get held() {
      return !!grab;
    },
  };
};
