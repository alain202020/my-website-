/* 3D-scène (Three.js): een datanetwerk van verbonden punten met een draaiende kern.
   Elke pagina kiest een variant via <canvas id="scene" data-variant="...">. */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("scene");
if (canvas) init(canvas);

function init(canvas) {
  const variant = canvas.dataset.variant || "home";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = innerWidth < 760;

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch { canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06080d, 0.045);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  const MINT = new THREE.Color("#7cffb2"), AMBER = new THREE.Color("#ffb547");
  const world = new THREE.Group(); scene.add(world);

  // --- Datanetwerk: punten op een bol, verbonden met lijnen ---
  const N = mobile ? 150 : 260, R = 3.6, pts = [];
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / N), theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = R * (0.92 + Math.random() * 0.16);
    pts.push(new THREE.Vector3(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)));
  }
  const dotTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 64; const g = c.getContext("2d");
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)"); grd.addColorStop(.3, "rgba(255,255,255,.7)"); grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
  })();
  const pGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const colors = [];
  pts.forEach((p) => { const c = MINT.clone().lerp(AMBER, Math.max(0, p.y / R) * 0.9); colors.push(c.r, c.g, c.b); });
  pGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  world.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.16, map: dotTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));

  const linePos = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    if (pts[i].distanceTo(pts[j]) < 1.05) linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
  }
  const lGeo = new THREE.BufferGeometry(); lGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  world.add(new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color: MINT, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending })));

  // --- Kern: per pagina een andere vorm ---
  const coreGeo = {
    home: new THREE.IcosahedronGeometry(1.5, 1),
    over: new THREE.TorusKnotGeometry(1.05, 0.28, 120, 12),
    projecten: new THREE.BoxGeometry(1.9, 1.9, 1.9, 3, 3, 3),
    vaardigheden: new THREE.DodecahedronGeometry(1.6, 0),
    contact: new THREE.TorusGeometry(1.4, 0.35, 16, 60)
  }[variant] || new THREE.IcosahedronGeometry(1.5, 1);
  const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: AMBER, wireframe: true, transparent: true, opacity: 0.55 }));
  const core2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), new THREE.MeshBasicMaterial({ color: MINT, wireframe: true, transparent: true, opacity: 0.8 }));
  world.add(core, core2);

  // --- Ringen met 'satellieten' ---
  const rings = [];
  [[4.6, 0.3, 0], [5.2, -0.5, 0.7], [5.8, 1.1, -0.4]].forEach(([r, rx, rz], k) => {
    const col = k === 1 ? AMBER : MINT;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 8, 200), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.25 }));
    ring.rotation.set(Math.PI / 2 + rx, 0, rz); world.add(ring);
    const sat = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), new THREE.MeshBasicMaterial({ color: col }));
    ring.add(sat); rings.push({ sat, r, speed: 0.25 + k * 0.12, off: k * 2 });
  });

  // --- Datapakketjes die over de lijnen reizen ---
  const packets = [], packetGeo = new THREE.SphereGeometry(0.045, 8, 8), segCount = linePos.length / 6;
  const a = new THREE.Vector3(), b = new THREE.Vector3();
  for (let i = 0; i < (mobile ? 14 : 28); i++) {
    const m = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: i % 3 ? MINT : AMBER }));
    world.add(m); packets.push({ m, seg: Math.floor(Math.random() * segCount), t: Math.random(), v: 0.006 + Math.random() * 0.012 });
  }

  // --- Sterrenstof ---
  const dust = [];
  for (let i = 0; i < (mobile ? 400 : 900); i++) dust.push((Math.random() - .5) * 60, (Math.random() - .5) * 40, (Math.random() - .5) * 40 - 10);
  const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute("position", new THREE.Float32BufferAttribute(dust, 3));
  const stars = new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.05, color: 0x9fb3c8, transparent: true, opacity: 0.6 }));
  scene.add(stars);

  // --- Interactie: muis-parallax en slepen ---
  let tx = 0, ty = 0, dragX = 0, dragY = 0, velX = 0, velY = 0, dragging = false, px = 0, py = 0;
  addEventListener("mousemove", (e) => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; });
  canvas.addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse") { dragging = true; px = e.clientX; py = e.clientY; } });
  addEventListener("pointermove", (e) => {
    if (!dragging) return;
    velY = (e.clientX - px) * 0.005; velX = (e.clientY - py) * 0.005; px = e.clientX; py = e.clientY;
  });
  addEventListener("pointerup", () => { dragging = false; });
  canvas.style.cursor = "grab";

  // Plaatsing per variant: bol rechts op brede schermen
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight, wide = w > 900;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const center = variant === "contact";
    world.position.set(center ? 0 : wide ? 3.6 : 0, center ? 0 : wide ? 0 : 1.4, 0);
    camera.position.set(0, 0, center ? 15 : wide ? (variant === "home" ? 13 : 14) : 17);
  }
  addEventListener("resize", resize); resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  const clock = new THREE.Clock(), speed = reduced ? 0 : 1;
  (function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;
    const t = clock.getElapsedTime();
    dragX += velX; dragY += velY; velX *= 0.94; velY *= 0.94;
    world.rotation.y = t * 0.08 * speed + dragY + tx * 0.5;
    world.rotation.x = dragX + ty * 0.3;
    core.rotation.set(t * 0.3 * speed, t * 0.4 * speed, 0);
    core2.rotation.set(-t * 0.5 * speed, -t * 0.3 * speed, 0);
    core.scale.setScalar(1 + Math.sin(t * 2) * 0.04 * speed);
    rings.forEach((o) => { const ang = t * o.speed * speed + o.off; o.sat.position.set(Math.cos(ang) * o.r, Math.sin(ang) * o.r, 0); });
    packets.forEach((p) => {
      p.t += p.v * speed; if (p.t > 1) { p.t = 0; p.seg = Math.floor(Math.random() * segCount); }
      const k = p.seg * 6;
      a.set(linePos[k], linePos[k + 1], linePos[k + 2]); b.set(linePos[k + 3], linePos[k + 4], linePos[k + 5]);
      p.m.position.copy(a.lerp(b, p.t));
    });
    stars.rotation.y = t * 0.01;
    // Bij scrollen zakt de scène weg en vervaagt hij
    const s = Math.min(scrollY / innerHeight, 1);
    world.position.z = -s * 6;
    canvas.style.opacity = 1 - s * 0.8;
    renderer.render(scene, camera);
  })();
}
