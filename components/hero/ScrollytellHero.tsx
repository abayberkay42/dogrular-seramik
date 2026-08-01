'use client'

import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
//  Narrative text shown at specific scroll intervals
// ─────────────────────────────────────────────────────────────────────────────
const NARRATIONS = [
  { from: 0.00, to: 0.14, text: '' },                                          // silent approach
  { from: 0.14, to: 0.32, text: 'Yaşam Alanları' },                            // living room
  { from: 0.40, to: 0.55, text: 'Banyo' },                                     // bathroom
  { from: 0.57, to: 0.70, text: 'Mutfak' },                                    // kitchen
  { from: 0.72, to: 0.86, text: 'Teras' },                                     // terrace
]

// ─────────────────────────────────────────────────────────────────────────────
export function ScrollytellHero() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const narrationRef = useRef<HTMLParagraphElement>(null)
  const cleanupRef  = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return

    let dead = false

    ;(async () => {
      // ── Dynamic imports (browser-only) ────────────────────────────────────
      const [
        THREE,
        { gsap },
        { ScrollTrigger },
        LenisModule,
        { EffectComposer },
        { RenderPass },
        { UnrealBloomPass },
        { ShaderPass },
      ] = await Promise.all([
        import('three'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
        import('three/examples/jsm/postprocessing/EffectComposer.js'),
        import('three/examples/jsm/postprocessing/RenderPass.js'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
        import('three/examples/jsm/postprocessing/ShaderPass.js'),
      ])
      if (dead) return

      const Lenis = (LenisModule as any).default ?? LenisModule

      gsap.registerPlugin(ScrollTrigger)

      // ── Lenis + GSAP ticker ───────────────────────────────────────────────
      const lenis = new Lenis({ smoothWheel: true, lerp: 0.08 })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t: number) => lenis.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)

      // ── Renderer ──────────────────────────────────────────────────────────
      const canvas = canvasRef.current!
      const W = window.innerWidth, H = window.innerHeight
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // ── Camera ────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.05, 200)
      camera.position.set(0, 1.72, -15)

      // ── Scene ─────────────────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x92aec8)

      // Shared fog object (mutate in place each frame — no GC pressure)
      const fog = new THREE.FogExp2(0x92aec8, 0.015)
      scene.fog = fog

      // ── Lights ────────────────────────────────────────────────────────────
      // Sun — golden hour directional
      const sun = new THREE.DirectionalLight(0xffecc0, 3.0)
      sun.position.set(10, 16, -10)
      sun.castShadow = true
      sun.shadow.mapSize.set(2048, 2048)
      sun.shadow.camera.left = -25; sun.shadow.camera.right = 25
      sun.shadow.camera.top  =  25; sun.shadow.camera.bottom = -25
      sun.shadow.camera.far  = 80
      sun.shadow.bias = -0.001
      scene.add(sun)

      scene.add(new THREE.AmbientLight(0xfff0e0, 0.6))

      function ptLight(x: number, y: number, z: number, color: number, i: number) {
        const l = new THREE.PointLight(color, i, 9, 2)
        l.position.set(x, y, z); scene.add(l)
      }
      ptLight(0,   3.0, 6,    0xfff0d8, 1.4)  // living room
      ptLight(0,   3.0, 11,   0xfff0d8, 0.9)  // corridor
      ptLight(-2,  3.0, 20,   0xe8f2ff, 1.8)  // bathroom (cool white)
      ptLight(5,   3.0, 22,   0xfff4e0, 1.4)  // kitchen
      ptLight(6,   3.0, 10,   0xffeebb, 1.0)  // terrace interior edge

      // Mirror glow (bathroom)
      const mirrorGlow = new THREE.PointLight(0xddeeff, 1.2, 2.5, 2)
      mirrorGlow.position.set(-2.8, 1.6, 20.9)
      scene.add(mirrorGlow)

      // ── Procedural tile texture (DataTexture) ─────────────────────────────
      function tileTex(
        tw: number, th: number, grout: number,
        tr: number, tg: number, tb: number,   // tile colour
        gr: number, gg: number, gb: number,   // grout colour
        sz = 512
      ): THREE.DataTexture {
        const buf = new Uint8Array(sz * sz * 4)
        for (let y = 0; y < sz; y++) {
          for (let x = 0; x < sz; x++) {
            const isGrout = (x % tw) < grout || (y % th) < grout
            const i = (y * sz + x) * 4
            buf[i]   = isGrout ? gr : tr
            buf[i+1] = isGrout ? gg : tg
            buf[i+2] = isGrout ? gb : tb
            buf[i+3] = 255
          }
        }
        const tex = new THREE.DataTexture(buf, sz, sz)
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.needsUpdate = true
        return tex
      }

      // ── Materials ─────────────────────────────────────────────────────────
      const M = {
        sky:     new THREE.MeshStandardMaterial({ color: 0x92aec8, roughness: 1 }),
        ground:  new THREE.MeshStandardMaterial({ color: 0x7a7062, roughness: 0.95 }),
        stone:   new THREE.MeshStandardMaterial({ color: 0xd8d0c4, roughness: 0.82, metalness: 0.0 }),
        plaster: new THREE.MeshStandardMaterial({ color: 0xf0ece5, roughness: 0.88, side: THREE.BackSide }),
        ceil:    new THREE.MeshStandardMaterial({ color: 0xf5f3f0, roughness: 0.92, side: THREE.BackSide }),
        glass: new THREE.MeshStandardMaterial({
          color: 0xaac8e0, transparent: true, opacity: 0.18,
          roughness: 0.01, metalness: 0.85, side: THREE.DoubleSide,
        }),

        // Ceramic tiles — programmatic DataTextures
        floorLiv: new THREE.MeshStandardMaterial({
          map: tileTex(90, 90, 4, 243, 241, 239, 188, 184, 178),
          roughness: 0.16, metalness: 0.04,
        }),
        floorBath: new THREE.MeshStandardMaterial({
          map: tileTex(42, 42, 2, 230, 228, 226, 165, 160, 155),
          roughness: 0.14, metalness: 0.05,
        }),
        wallBath: new THREE.MeshStandardMaterial({
          map: tileTex(28, 56, 2, 246, 245, 244, 182, 178, 174),
          roughness: 0.10, metalness: 0.06, side: THREE.BackSide,
        }),
        wallBathFwd: new THREE.MeshStandardMaterial({
          map: tileTex(28, 56, 2, 246, 245, 244, 182, 178, 174),
          roughness: 0.10, metalness: 0.06,
        }),
        backsplash: new THREE.MeshStandardMaterial({
          map: tileTex(58, 29, 2, 250, 249, 247, 192, 188, 183),
          roughness: 0.18, metalness: 0.04,
        }),
        floorKit: new THREE.MeshStandardMaterial({
          map: tileTex(68, 68, 3, 218, 210, 198, 158, 150, 138),
          roughness: 0.55, metalness: 0.0,
        }),
        paver: new THREE.MeshStandardMaterial({
          map: tileTex(58, 58, 5, 202, 192, 178, 140, 130, 118),
          roughness: 0.74, metalness: 0.0,
        }),

        // Surfaces
        counter: new THREE.MeshStandardMaterial({ color: 0x252525, roughness: 0.22, metalness: 0.08 }),
        vanity:  new THREE.MeshStandardMaterial({ color: 0xe8e5e0, roughness: 0.22, metalness: 0.05 }),
        basin:   new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08, metalness: 0.1 }),
        mirror:  new THREE.MeshStandardMaterial({
          color: 0xc0d8f0, roughness: 0.0, metalness: 1.0,
          emissive: new THREE.Color(0x3a5068), emissiveIntensity: 0.6,
        }),
        pool:    new THREE.MeshStandardMaterial({
          color: 0x1a5878, transparent: true, opacity: 0.88,
          roughness: 0.0, metalness: 0.35,
        }),
        poolEdge: new THREE.MeshStandardMaterial({ color: 0xddd4c2, roughness: 0.55 }),
        landscape: new THREE.MeshStandardMaterial({ color: 0x4a5e40, roughness: 0.95 }),
      }

      // ── Geometry helpers ──────────────────────────────────────────────────
      const box  = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d)
      const plane = (w: number, h: number)            => new THREE.PlaneGeometry(w, h)

      function add(
        geo: THREE.BufferGeometry,
        mat: THREE.Material | THREE.Material[],
        x: number, y: number, z: number,
        rx = 0, ry = 0,
        shadow: 'both' | 'cast' | 'recv' | 'none' = 'none'
      ) {
        const m = new THREE.Mesh(geo, mat)
        m.position.set(x, y, z)
        if (rx) m.rotation.x = rx
        if (ry) m.rotation.y = ry
        if (shadow === 'both' || shadow === 'cast') m.castShadow = true
        if (shadow === 'both' || shadow === 'recv') m.receiveShadow = true
        scene.add(m)
        return m
      }

      const CL = 3.2 // ceiling height

      // ── EXTERIOR ──────────────────────────────────────────────────────────
      // Ground
      add(plane(100, 100), M.ground, 0, 0, 0, -Math.PI/2, 0, 'recv')

      // Grass patches
      add(plane(30, 30), M.landscape, -18, 0.01, 0, -Math.PI/2, 0, 'recv')
      add(plane(30, 30), M.landscape,  18, 0.01, 0, -Math.PI/2, 0, 'recv')

      // Stone path to villa
      add(plane(3.5, 18), new THREE.MeshStandardMaterial({ color: 0xb0a898, roughness: 0.78 }),
        0, 0.02, -7, -Math.PI/2, 0, 'recv')

      // Villa facade (left + right stone panels, no window area)
      add(box(3.8, CL+1.2, 0.5), M.stone, -4.1, (CL+1.2)/2, 0, 0, 0, 'both')
      add(box(3.8, CL+1.2, 0.5), M.stone,  4.1, (CL+1.2)/2, 0, 0, 0, 'both')
      // Header beam
      add(box(12, 0.5, 0.5), M.stone, 0, CL + 1.15, 0, 0, 0, 'both')

      // Large pivot window (glass)
      add(plane(4.4, CL), M.glass, 0, CL/2, 0)

      // Building side walls (exterior view)
      const sideMat = new THREE.MeshStandardMaterial({ color: 0xc8c0b4, roughness: 0.80 })
      add(box(0.4, CL+1.2, 26), sideMat, -6,  (CL+1.2)/2, 13, 0, 0, 'both')
      add(box(0.4, CL+1.2, 26), sideMat,  6,  (CL+1.2)/2, 13, 0, 0, 'both')
      // Roof slab
      add(box(12.4, 0.35, 26.4), M.stone, 0, CL + 1.35, 13, 0, 0, 'both')

      // ── ENTRY / LIVING ROOM (z: 0 → 13) ──────────────────────────────────
      // Floor
      const livFloor = add(plane(12, 13), M.floorLiv, 0, 0.01, 6.5, -Math.PI/2, 0, 'recv')
      livFloor.material = M.floorLiv
      ;(M.floorLiv.map as THREE.Texture).repeat.set(4, 4)

      // Ceiling (BackSide so it renders from below)
      add(plane(12, 13), M.ceil, 0, CL, 6.5, -Math.PI/2)

      // Left wall
      add(plane(13, CL), M.plaster, -6, CL/2, 6.5, 0, Math.PI/2)
      // Back wall (connects to corridor)
      add(plane(12, CL), M.plaster, 0, CL/2, 13)
      // Glass wall (right / garden view)
      add(plane(13, CL), M.glass, 6, CL/2, 6.5, 0, -Math.PI/2)

      // Low-profile sofa silhouette (dark box)
      const sofaMat = new THREE.MeshStandardMaterial({ color: 0x2a2520, roughness: 0.85 })
      add(box(3.5, 0.45, 1.0), sofaMat, -3.5, 0.225, 5, 0, 0, 'both')
      add(box(3.5, 0.45, 0.25), sofaMat, -3.5, 0.6, 5.5, 0, 0, 'both') // back

      // Coffee table (dark glass top)
      add(box(1.2, 0.04, 0.7), new THREE.MeshStandardMaterial({ color: 0x101010, roughness: 0.02, metalness: 0.5 }),
        -2, 0.38, 4)
      // Coffee table legs
      for (const [lx, lz] of [[-0.5, -0.3],[0.5,-0.3],[-0.5,0.3],[0.5,0.3]]) {
        add(box(0.04, 0.38, 0.04), new THREE.MeshStandardMaterial({ color: 0x888880, roughness: 0.3, metalness: 0.8 }),
          -2 + lx, 0.19, 4 + lz)
      }

      // ── CORRIDOR (z: 13 → 16) ─────────────────────────────────────────────
      add(plane(4, 3),  M.floorBath, -2, 0.01, 14.5, -Math.PI/2, 0, 'recv')
      add(plane(4, 3),  M.ceil,      -2, CL,   14.5, -Math.PI/2)
      add(plane(3, CL), M.plaster,   -4, CL/2, 14.5, 0, Math.PI/2)  // left
      add(plane(3, CL), M.plaster,    0, CL/2, 14.5, 0, -Math.PI/2) // right

      // ── BATHROOM (centre: x=-2, z=20) ────────────────────────────────────
      const BW = 5, BD = 6
      ;(M.floorBath.map as THREE.Texture).repeat.set(5, 6)
      ;(M.wallBath.map  as THREE.Texture).repeat.set(6, 2)
      ;(M.wallBathFwd.map as THREE.Texture).repeat.set(6, 2)

      add(plane(BW, BD), M.floorBath, -2, 0.01, 20, -Math.PI/2, 0, 'recv')
      add(plane(BW, BD), M.ceil,      -2, CL,   20, -Math.PI/2)

      // Back wall (far from camera entry — camera will approach this)
      add(plane(BW, CL), M.wallBathFwd, -2, CL/2, 23)
      // Left wall
      add(plane(BD, CL), M.wallBath,  -4.5, CL/2, 20, 0, Math.PI/2)
      // Right wall
      add(plane(BD, CL), M.plaster,    0.5, CL/2, 20, 0, -Math.PI/2)

      // Vanity counter (wall-mounted feel)
      add(box(1.6, 0.07, 0.55), M.vanity,  -3.2, 0.85, 20)
      // Basin (vessel)
      add(box(0.5, 0.14, 0.38), M.basin,   -3.2, 0.96, 20)
      // Faucet (thin cylinder)
      add(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8),
        new THREE.MeshStandardMaterial({ color: 0xd4c8b0, roughness: 0.05, metalness: 0.95 }),
        -3.2, 1.22, 20)

      // Round LED mirror on back wall
      add(new THREE.CircleGeometry(0.5, 48), M.mirror, -2.8, 1.65, 22.92)
      // Mirror frame ring
      add(new THREE.TorusGeometry(0.52, 0.025, 8, 48),
        new THREE.MeshStandardMaterial({ color: 0xd4c8b0, roughness: 0.1, metalness: 0.95 }),
        -2.8, 1.65, 22.9)

      // ── KITCHEN (centre: x=5, z=20) ──────────────────────────────────────
      const KW = 7, KD = 7
      ;(M.floorKit.map as THREE.Texture).repeat.set(5, 5)
      ;(M.backsplash.map as THREE.Texture).repeat.set(8, 2)

      add(plane(KW, KD), M.floorKit, 5, 0.01, 20, -Math.PI/2, 0, 'recv')
      add(plane(KW, KD), M.ceil,     5, CL,   20, -Math.PI/2)
      // Back wall
      add(plane(KW, CL), M.plaster,  5, CL/2, 23.5)
      // Left wall (shared with bathroom)
      add(plane(KD, CL), M.plaster,  1.5, CL/2, 20, 0, Math.PI/2)
      // Right wall glass
      add(plane(KD, CL), M.glass, 8.5, CL/2, 20, 0, -Math.PI/2)

      // Counter
      add(box(KW - 0.6, 0.06, 0.72), M.counter, 5, 0.92, 23.15, 0, 0, 'both')
      // Backsplash
      add(plane(KW - 0.6, 0.9), M.backsplash, 5, 1.38, 23.47)
      // Upper cabinets silhouette
      add(box(KW - 0.6, 0.65, 0.35), new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.75 }),
        5, 2.5, 23.3, 0, 0, 'both')

      // Kitchen island
      add(box(1.8, 0.88, 0.9), M.counter, 5, 0.44, 19)
      add(box(1.84, 0.05, 0.94), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.1, metalness: 0.2 }),
        5, 0.91, 19) // island top

      // ── TERRACE (z: 24 → 32) ─────────────────────────────────────────────
      ;(M.paver.map as THREE.Texture).repeat.set(8, 6)

      add(plane(14, 12), M.paver, 3, 0.01, 28, -Math.PI/2, 0, 'recv')

      // Pool
      add(plane(6, 7), M.pool,     3, 0.02, 26)
      // Pool coping (3 sides)
      add(box(6.4, 0.12, 0.2), M.poolEdge, 3,  0.06, 22.5)
      add(box(0.2, 0.12, 7.4), M.poolEdge, 6.1, 0.06, 26)
      add(box(0.2, 0.12, 7.4), M.poolEdge, -0.1, 0.06, 26)

      // Perimeter low wall (terrace boundary)
      add(box(14, 0.8, 0.25), new THREE.MeshStandardMaterial({ color: 0xd4ccc0, roughness: 0.7 }),
        3, 0.4, 34.1)

      // Terrace glass balustrade
      add(plane(14, 0.9), new THREE.MeshStandardMaterial({
        color: 0xaac8e0, transparent: true, opacity: 0.12, roughness: 0.0, metalness: 0.8,
      }), 3, 1.0, 34)

      // Sunloungers (simple boxes)
      const loungeM = new THREE.MeshStandardMaterial({ color: 0xe8e0d0, roughness: 0.8 })
      add(box(1.8, 0.12, 0.65), loungeM, -1, 0.06, 30)
      add(box(1.8, 0.12, 0.65), loungeM,  7, 0.06, 30)

      // Landscape beyond terrace
      add(plane(60, 30), M.landscape, 3, 0.01, 50, -Math.PI/2, 0, 'recv')

      // Sky dome
      const skyGeo = new THREE.SphereGeometry(120, 16, 8)
      const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: { uTop: { value: new THREE.Color(0x4a7aaa) }, uBottom: { value: new THREE.Color(0xa8c4d8) } },
        vertexShader:   `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
        fragmentShader: `varying vec3 vPos; uniform vec3 uTop; uniform vec3 uBottom;
          void main(){
            float t = clamp((normalize(vPos).y + 0.2) / 1.2, 0., 1.);
            gl_FragColor = vec4(mix(uBottom, uTop, t), 1.);
          }`,
      })
      scene.add(new THREE.Mesh(skyGeo, skyMat))

      // ── Camera path (CatmullRomCurve3) ────────────────────────────────────
      // Positions + look-at targets, sampled by scroll progress t ∈ [0,1]

      const posCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0,    1.72, -15),    // far exterior
        new THREE.Vector3(0,    1.72, -8),     // mid approach
        new THREE.Vector3(0,    1.72, -2.8),   // near glass
        new THREE.Vector3(0,    1.72,  0.8),   // entry
        new THREE.Vector3(0,    1.72,  4),     // living room A
        new THREE.Vector3(-0.5, 1.72,  7),     // living room B
        new THREE.Vector3(-1.0, 0.42,  8),     // floor close-up
        new THREE.Vector3(-0.5, 1.72,  9.5),   // pull back, corridor
        new THREE.Vector3(-1.5, 1.72, 14.5),   // corridor → bathroom
        new THREE.Vector3(-2.0, 1.55, 18.5),   // bathroom entry
        new THREE.Vector3(-2.8, 1.15, 22.3),   // bathroom wall
        new THREE.Vector3(-2.8, 1.15, 22.6),   // bathroom wall closer (texture)
        new THREE.Vector3(-0.5, 1.72, 22.0),   // pivot to kitchen
        new THREE.Vector3( 4.0, 1.72, 22.0),   // kitchen A
        new THREE.Vector3( 5.5, 1.72, 19.0),   // kitchen B
        new THREE.Vector3( 5.0, 1.72, 24.5),   // exit to terrace
        new THREE.Vector3( 3.0, 1.72, 28.5),   // terrace A
        new THREE.Vector3( 3.0, 1.72, 24.5),   // pool edge
        new THREE.Vector3( 0,   9.0, -2.0),    // aerial ascent
        new THREE.Vector3( 0,  18.0, -7.0),    // full aerial
      ], false, 'catmullrom', 0.5)

      const lookCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0,    1.5, -6),      // look at facade
        new THREE.Vector3(0,    1.5, -3),
        new THREE.Vector3(0,    1.5,  2),
        new THREE.Vector3(0,    1.4,  6),
        new THREE.Vector3(0,    1.2,  9),
        new THREE.Vector3(-0.5, 1.0, 11),
        new THREE.Vector3(-0.5, 0.0,  9),     // floor
        new THREE.Vector3(-1.5, 1.5, 14),
        new THREE.Vector3(-2.0, 1.5, 18),
        new THREE.Vector3(-2.5, 1.2, 22),
        new THREE.Vector3(-2.8, 1.1, 23.1),   // wall surface
        new THREE.Vector3(-2.8, 1.05, 23.5),  // extreme close
        new THREE.Vector3( 3.0, 1.5, 22),
        new THREE.Vector3( 6.0, 1.3, 22),
        new THREE.Vector3( 7.0, 1.2, 20),
        new THREE.Vector3( 3.0, 1.2, 28),
        new THREE.Vector3( 3.0, 0.6, 26),     // pool
        new THREE.Vector3( 3.0, 0.1, 23),
        new THREE.Vector3( 0,   0.0,  8),     // aerial looks down at villa
        new THREE.Vector3( 0,   0.0,  6),
      ], false, 'catmullrom', 0.5)

      // ── Post-processing ───────────────────────────────────────────────────
      const composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      composer.addPass(new UnrealBloomPass(
        new THREE.Vector2(W, H), 0.28, 0.45, 0.90
      ))

      // Vignette pass (custom shader)
      const vignetteShader = {
        uniforms: { tDiffuse: { value: null }, darkness: { value: 0.52 }, offset: { value: 0.90 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float darkness, offset;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float d = length(vUv - 0.5);
            float vig = smoothstep(offset, offset - darkness, d);
            gl_FragColor = vec4(c.rgb * vig, c.a);
          }`,
      }
      const vigPass = new ShaderPass(vignetteShader)
      composer.addPass(vigPass)

      // ── Fog color palette per segment ─────────────────────────────────────
      type FogKey = 'exterior' | 'interior' | 'bath' | 'terrace' | 'aerial'
      const fogCfg: Record<FogKey, { color: THREE.Color; density: number }> = {
        exterior: { color: new THREE.Color(0x92aec8), density: 0.014 },
        interior: { color: new THREE.Color(0xf2eee6), density: 0.055 },
        bath:     { color: new THREE.Color(0xedf2f8), density: 0.065 },
        terrace:  { color: new THREE.Color(0x8aaec4), density: 0.012 },
        aerial:   { color: new THREE.Color(0x7aaac4), density: 0.006 },
      }
      function fogForT(t: number): FogKey {
        if (t < 0.15) return 'exterior'
        if (t < 0.56) return 'interior'
        if (t < 0.70) return 'interior'
        if (t < 0.88) return 'terrace'
        return 'aerial'
      }

      // ── Scene segment → background color ─────────────────────────────────
      const bgColors: Record<FogKey, THREE.Color> = {
        exterior: new THREE.Color(0x92aec8),
        interior: new THREE.Color(0xf2eee6),
        bath:     new THREE.Color(0xedf2f8),
        terrace:  new THREE.Color(0x8aaec4),
        aerial:   new THREE.Color(0x7aaac4),
      }

      // ── Core update function (called on every scroll event) ───────────────
      const _tmpPos  = new THREE.Vector3()
      const _tmpLook = new THREE.Vector3()

      function updateScene(t: number) {
        posCurve.getPoint(t, _tmpPos)
        lookCurve.getPoint(t, _tmpLook)
        camera.position.copy(_tmpPos)
        camera.lookAt(_tmpLook)

        const key = fogForT(t)
        const cfg = fogCfg[key]
        fog.color.copy(cfg.color)
        fog.density = cfg.density
        scene.background = bgColors[key]

        // Narration overlay
        if (narrationRef.current) {
          const active = NARRATIONS.find(n => t >= n.from && t <= n.to)
          narrationRef.current.textContent = active?.text ?? ''
          narrationRef.current.style.opacity = active?.text ? '1' : '0'
        }

        composer.render()
      }

      // Initial frame
      updateScene(0)

      // ── ScrollTrigger ─────────────────────────────────────────────────────
      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,          // 0.7s smooth lag behind scroll
        onUpdate: self => updateScene(self.progress),
      })

      // ── Resize ────────────────────────────────────────────────────────────
      function onResize() {
        const nw = window.innerWidth, nh = window.innerHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
        composer.setSize(nw, nh)
        updateScene(st.progress)
      }
      window.addEventListener('resize', onResize)

      // ── Cleanup ───────────────────────────────────────────────────────────
      cleanupRef.current = () => {
        dead = true
        st.kill()
        lenis.destroy()
        gsap.ticker.remove((_t: number) => lenis.raf(_t * 1000))
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        composer.dispose()
      }
    })().catch(console.error)

    return () => { cleanupRef.current?.() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: '700vh', position: 'relative' }}
      aria-label="Mimari yolculuk — seramik yüzeyler"
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky', top: 0,
          width: '100%', height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* WebGL canvas */}
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* Top logo / brand during experience */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 68,
            zIndex: 20, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)',
          }}
        />

        {/* Scene narration label (bottom-left) */}
        <p
          ref={narrationRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(28px, 5vh, 44px)',
            left: 'clamp(22px, 3vw, 44px)',
            zIndex: 20, margin: 0,
            fontFamily: 'var(--font-body), system-ui, sans-serif',
            fontSize: 'clamp(0.6rem, 1.1vw, 0.72rem)',
            fontWeight: 400,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            transition: 'opacity 0.7s ease',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Scroll progress indicator (vertical line, right side) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 'clamp(18px, 2vw, 28px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 1,
            height: 80,
            background: 'rgba(255,255,255,0.15)',
            zIndex: 20,
          }}
        />

        {/* Final hero headline — visible only near end of scroll */}
        <div
          style={{
            position: 'absolute', inset: 0,
            zIndex: 21, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
            padding: '0 clamp(24px, 6vw, 80px)',
          }}
          id="hero-headline"
        >
          {/* Controlled by GSAP elsewhere if needed */}
        </div>

        {/* Bottom letterbox (thin) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 'clamp(40px, 7vh, 56px)',
            background: 'linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 100%)',
            zIndex: 19, pointerEvents: 'none',
          }}
        />

        {/* Scroll cue (animated chevron) */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(14px, 2.5vh, 22px)',
            left: '50%', transform: 'translateX(-50%)',
            zIndex: 22,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            opacity: 0.45,
            animation: 'ds-scroll-bounce 1.8s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>
    </section>
  )
}
