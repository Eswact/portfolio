const FRAMES = 64;
const CELL = 128;
const CELL_RATIO = 5.2 / 4.05;
const TAU = Math.PI * 2;
const MARK_LIFE = 2.6;

type Mode = 'parked' | 'leave' | 'roam' | 'park' | 'gone';
type Kind = 'go' | 'drift' | 'donut' | 'reverse' | 'dash' | 'home';
type Act = { kind: Kind; t: number; dur: number; tx: number; ty: number; v: number; dir: number; stage: number };
type Input = { throttle: number; steer: number; hand: boolean };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const turn = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function roam(parked: HTMLImageElement, sheet: string) {
  const sprite = new Image();
  sprite.src = sheet;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:30';
  const ctx = canvas.getContext('2d')!;
  const car = { x: 0, y: 0, h: 0, vx: 0, vy: 0, steer: 0, L: 40 };
  const marks: { x1: number; y1: number; x2: number; y2: number; t: number }[] = [];
  let wheels: [number, number][] | null = null;
  let mode: Mode = 'parked';
  let act: Act | null = null;
  let raf = 0;
  let prev = 0;
  let clock = 0;
  let roamed = 0;
  let cycles = 0;
  let timer = 0;
  let titleSeen = true;
  let dpr = 1;
  let roamL = 40;
  let script = { t: 0, x0: 0, y0: 0, h0: 0, x1: 0, y1: 0, nx: 0, ny: 0, L0: 0, L1: 0 };

  const io = new IntersectionObserver(
    ([e]) => {
      titleSeen = e.isIntersecting;
      if (titleSeen && mode === 'gone' && !timer) back();
    },
    { threshold: 0.5 },
  );
  io.observe(parked);

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
  }

  function notch() {
    const r = parked.getBoundingClientRect();
    return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY, L: r.width / CELL_RATIO };
  }

  function view() {
    return { x0: scrollX, y0: scrollY, w: innerWidth, h: innerHeight };
  }

  function inside(margin: number) {
    const v = view();
    return car.x > v.x0 - margin && car.x < v.x0 + v.w + margin && car.y > v.y0 - margin && car.y < v.y0 + v.h + margin;
  }

  function spot() {
    const v = view();
    const m = Math.min(roamL * 2, v.w * 0.2);
    return { x: v.x0 + m + Math.random() * (v.w - 2 * m), y: v.y0 + m + Math.random() * (v.h - 2 * m) };
  }

  function start(kind: Kind) {
    const p = spot();
    act = { kind, t: 0, dur: 0, tx: p.x, ty: p.y, v: roamL * rand(3.2, 5.5), dir: Math.random() < 0.5 ? -1 : 1, stage: 0 };
    if (kind === 'drift') act.dur = rand(0.75, 1.05);
    if (kind === 'donut') act.dur = rand(1.6, 2.4);
    if (kind === 'reverse') act.dur = rand(0.9, 1.5);
    if (kind === 'dash') {
      const v = view();
      const side = Math.floor(Math.random() * 4);
      const out = roamL * 5;
      act.tx = side === 0 ? v.x0 - out : side === 1 ? v.x0 + v.w + out : v.x0 + rand(0.1, 0.9) * v.w;
      act.ty = side === 2 ? v.y0 - out : side === 3 ? v.y0 + v.h + out : v.y0 + rand(0.1, 0.9) * v.h;
      act.v = roamL * 11;
    }
    if (kind === 'home') {
      const n = notch();
      act.tx = n.x + roamL * 3.2;
      act.ty = n.y;
      act.v = roamL * 3.4;
    }
  }

  function next() {
    const r = Math.random();
    if (titleSeen && ((roamed > 12 && r < 0.22) || cycles >= 3)) return start('home');
    if (roamed > 26 || r < 0.12) return start('dash');
    if (r < 0.3) return start('drift');
    if (r < 0.42) return start('reverse');
    if (r < 0.5) return start('donut');
    start('go');
  }

  function physics(dt: number, inp: Input) {
    const L = car.L;
    const top = 11 * L;
    let f0 = Math.cos(car.h);
    let f1 = Math.sin(car.h);
    const before = car.vx * f0 + car.vy * f1;
    const sp = Math.abs(before);
    car.steer += clamp(inp.steer - car.steer, -8 * dt, 8 * dt);
    const gain = Math.min(1, sp / (0.8 * L)) * (1 - 0.3 * Math.min(1, sp / top));
    car.h += car.steer * 3.4 * gain * (before < -1 ? -1 : 1) * (inp.hand ? 1.6 : 1) * dt;
    f0 = Math.cos(car.h);
    f1 = Math.sin(car.h);
    let vf = car.vx * f0 + car.vy * f1;
    let vr = -car.vx * f1 + car.vy * f0;
    const hi = Math.min(1, Math.abs(vf) / top);
    if (inp.throttle > 0) vf += 9 * L * inp.throttle * (1 - 0.5 * hi) * dt;
    else if (inp.throttle < 0) vf -= (vf > 0.5 * L ? 14 * L : 5 * L) * -inp.throttle * dt;
    else vf -= Math.sign(vf) * Math.min(Math.abs(vf), 2.5 * L * dt);
    vf = clamp(vf, -3.5 * L, top);
    if (inp.hand) vf -= Math.sign(vf) * Math.min(Math.abs(vf), 1.6 * L * dt);
    vr *= Math.exp(-(inp.hand ? 2 : 12) * dt);
    car.vx = f0 * vf - f1 * vr;
    car.vy = f1 * vf + f0 * vr;
    car.x += car.vx * dt;
    car.y += car.vy * dt;
    const slip = Math.abs(vr) > L * 0.9 || (inp.hand && Math.abs(vf) > L * 1.5);
    skid(slip);
    return vf;
  }

  function skid(on: boolean) {
    const f0 = Math.cos(car.h);
    const f1 = Math.sin(car.h);
    const now: [number, number][] = [
      [-0.32, -0.2],
      [-0.32, 0.2],
    ].map(([a, b]) => [car.x + (f0 * a - f1 * b) * car.L, car.y + (f1 * a + f0 * b) * car.L]);
    if (on && wheels) wheels.forEach((w, i) => marks.push({ x1: w[0], y1: w[1], x2: now[i][0], y2: now[i][1], t: clock }));
    wheels = on ? now : null;
    if (marks.length > 900) marks.splice(0, marks.length - 900);
  }

  function steerTo(x: number, y: number) {
    const d = turn(car.h, Math.atan2(y - car.y, x - car.x));
    return { steer: clamp(d * 2.4, -1, 1), off: Math.abs(d), dist: Math.hypot(x - car.x, y - car.y) };
  }

  function chase(a: Act, dt: number): Input {
    const s = steerTo(a.tx, a.ty);
    const want = a.v * (1 - 0.65 * Math.min(1, s.off / 1.3));
    const vf = car.vx * Math.cos(car.h) + car.vy * Math.sin(car.h);
    a.t += dt;
    return { throttle: clamp((want - vf) / (1.5 * car.L), -1, 1), steer: s.steer, hand: false };
  }

  function roamStep(dt: number) {
    if (!act) next();
    const a = act!;
    const vf = car.vx * Math.cos(car.h) + car.vy * Math.sin(car.h);
    let inp: Input = { throttle: 0, steer: 0, hand: false };
    if (a.kind === 'go' || a.kind === 'home' || a.kind === 'dash') {
      inp = chase(a, dt);
      const d = Math.hypot(a.tx - car.x, a.ty - car.y);
      if (a.kind === 'go' && (d < car.L * 1.3 || a.t > 6)) act = null;
      if (a.kind === 'home') {
        if (!titleSeen) act = null;
        else if (d < car.L * 1.1 || a.t > 9) return park();
      }
      if (a.kind === 'dash' && !inside(car.L * 1.5)) return vanish();
      if (a.kind === 'dash' && a.t > 6) act = null;
    } else if (a.kind === 'drift') {
      if (a.stage === 0) {
        const ahead = { x: car.x + Math.cos(car.h) * 400, y: car.y + Math.sin(car.h) * 400 };
        const c = steerTo(ahead.x, ahead.y);
        inp = { throttle: 1, steer: c.steer, hand: false };
        a.t += dt;
        if (vf > car.L * 4.2 || a.t > 1.4) {
          a.stage = 1;
          a.t = 0;
        }
      } else {
        a.t += dt;
        inp = { throttle: 0.55, steer: a.dir, hand: true };
        if (a.t > a.dur) act = null;
      }
    } else if (a.kind === 'donut') {
      a.t += dt;
      inp = { throttle: 0.85, steer: a.dir, hand: a.t > 0.25 };
      if (a.t > a.dur) act = null;
    } else if (a.kind === 'reverse') {
      if (a.stage === 0) {
        inp = { throttle: -1, steer: 0, hand: false };
        if (Math.abs(vf) < car.L * 0.25) a.stage = 1;
      } else if (a.stage === 1) {
        a.t += dt;
        inp = { throttle: -0.9, steer: a.dir * 0.8, hand: false };
        if (a.t > a.dur) a.stage = 2;
      } else {
        inp = { throttle: 1, steer: 0, hand: false };
        if (vf > -car.L * 0.2) act = null;
      }
    }
    physics(dt, inp);
    roamed += dt;
    if (!inside(innerHeight * 1.5)) vanish();
  }

  function vanish() {
    mode = 'gone';
    act = null;
    cycles++;
    car.vx = 0;
    car.vy = 0;
    wheels = null;
    const wait = rand(4, 9) * 1000;
    if (cycles >= 3 && !titleSeen) return;
    timer = window.setTimeout(back, wait);
  }

  function back() {
    timer = 0;
    if (document.hidden) {
      timer = window.setTimeout(back, 3000);
      return;
    }
    const v = view();
    const side = Math.floor(Math.random() * 4);
    const out = roamL * 2;
    car.x = side === 0 ? v.x0 - out : side === 1 ? v.x0 + v.w + out : v.x0 + rand(0.15, 0.85) * v.w;
    car.y = side === 2 ? v.y0 - out : side === 3 ? v.y0 + v.h + out : v.y0 + rand(0.15, 0.85) * v.h;
    const p = spot();
    car.h = Math.atan2(p.y - car.y, p.x - car.x);
    car.vx = Math.cos(car.h) * roamL * 5;
    car.vy = Math.sin(car.h) * roamL * 5;
    car.steer = 0;
    car.L = roamL;
    roamed = 0;
    mode = 'roam';
    start('go');
    act!.tx = p.x;
    act!.ty = p.y;
    loop();
  }

  function park() {
    const n = notch();
    mode = 'park';
    act = null;
    script = { t: 0, x0: car.x, y0: car.y, h0: car.h, x1: n.x + roamL * 2.6, y1: n.y, nx: n.x, ny: n.y, L0: roamL, L1: n.L };
  }

  function parkStep(dt: number) {
    const s = script;
    s.t += dt;
    if (s.t < 0.75) {
      const e = easeOut(s.t / 0.75);
      const px = car.x;
      const py = car.y;
      car.x = lerp(s.x0, s.x1, e);
      car.y = lerp(s.y0, s.y1, e);
      car.h = s.h0 + turn(s.h0, 0) * e;
      car.vx = (car.x - px) / dt;
      car.vy = (car.y - py) / dt;
      skid(true);
      return;
    }
    const t = clamp((s.t - 0.85) / 1.1, 0, 1);
    skid(false);
    const e = easeInOut(t);
    car.h = 0;
    car.x = lerp(s.x1, s.nx, e);
    car.y = lerp(s.y1, s.ny, e);
    car.L = lerp(s.L0, s.L1, e);
    if (t >= 1) {
      mode = 'parked';
      parked.style.visibility = '';
      schedule(rand(10, 22));
    }
  }

  function leave() {
    if (mode !== 'parked') return;
    if (!titleSeen || document.hidden || !sprite.complete) return schedule(3);
    const n = notch();
    roamL = Math.max(n.L, 30);
    car.x = n.x;
    car.y = n.y;
    car.h = 0;
    car.vx = 0;
    car.vy = 0;
    car.steer = 0;
    car.L = n.L;
    script = { t: 0, x0: n.x, y0: n.y, h0: 0, x1: n.x + roamL * 2.4, y1: n.y, nx: n.x, ny: n.y, L0: n.L, L1: roamL };
    parked.style.visibility = 'hidden';
    mode = 'leave';
    cycles = 0;
    roamed = 0;
    loop();
  }

  function leaveStep(dt: number) {
    const s = script;
    s.t += dt;
    const t = clamp(s.t / 0.9, 0, 1);
    const e = t * t;
    const px = car.x;
    car.x = lerp(s.x0, s.x1, e);
    car.L = lerp(s.L0, s.L1, easeOut(t));
    car.vx = (car.x - px) / dt;
    if (t >= 1) {
      mode = 'roam';
      start('go');
    }
  }

  function schedule(seconds: number) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = 0;
      leave();
    }, seconds * 1000);
  }

  function frameOf(heading: number) {
    const a = ((heading % TAU) + TAU) % TAU;
    const i = Math.round((a / TAU) * FRAMES) % FRAMES;
    return { i, rest: turn((i * TAU) / FRAMES, a) };
  }

  function render() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, -scrollX * dpr, -scrollY * dpr);
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(1.4, car.L * 0.05);
    for (const m of marks) {
      const age = clock - m.t;
      if (age > MARK_LIFE) continue;
      ctx.strokeStyle = `rgba(8,7,6,${(0.42 * (1 - age / MARK_LIFE)).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(m.x1, m.y1);
      ctx.lineTo(m.x2, m.y2);
      ctx.stroke();
    }
    if (mode === 'parked' || mode === 'gone' || !sprite.naturalWidth) return;
    const { i, rest } = frameOf(car.h);
    const s = car.L * CELL_RATIO;
    ctx.translate(car.x, car.y);
    ctx.rotate(rest);
    ctx.drawImage(sprite, (i % 8) * CELL, Math.floor(i / 8) * CELL, CELL, CELL, -s / 2, -s / 2, s, s);
  }

  function frame(now: number) {
    raf = 0;
    const dt = Math.min(1 / 30, (now - prev) / 1000 || 0);
    prev = now;
    clock += dt;
    if (mode === 'leave') leaveStep(dt);
    else if (mode === 'roam') roamStep(dt);
    else if (mode === 'park') parkStep(dt);
    render();
    const fading = marks.length > 0 && clock - marks[marks.length - 1].t < MARK_LIFE;
    if (mode === 'leave' || mode === 'roam' || mode === 'park' || fading) raf = requestAnimationFrame(frame);
    else marks.length = 0;
  }

  function loop() {
    if (raf) return;
    if (!canvas.isConnected) document.body.append(canvas);
    prev = performance.now();
    raf = requestAnimationFrame(frame);
  }

  size();
  addEventListener('resize', size);
  sprite.decode().then(
    () => schedule(1.5),
    () => {},
  );
}
