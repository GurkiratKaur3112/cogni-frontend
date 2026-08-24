// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// /* =========================================================
//    STEPS
// ========================================================= */

// const steps = [
//   {
//     number: "01",
//     title: "Paste Video URL",
//     desc: "Drop in any YouTube link and let ContextAds pull the content.",
//   },

//   {
//     number: "02",
//     title: "AI Analysis",
//     desc: "Whisper transcribes audio and OpenCV reads frames to understand the content.",
//   },

//   {
//     number: "03",
//     title: "Context Extraction",
//     desc: "Themes, tone, and topics are distilled into a structured context map.",
//   },

//   {
//     number: "04",
//     title: "Ad Matching",
//     desc: "FAISS retrieval scores relevant ad inventory against the detected context.",
//   },

//   {
//     number: "05",
//     title: "Deliver the Ad",
//     desc: "The right ad reaches the right moment — relevant, contextual and non-intrusive.",
//   },
// ];

// /* =========================================================
//    WAVE NODES
// ========================================================= */

// const nodes = [
//   { x: 65, y: 205 },
//   { x: 300, y: 80 },
//   { x: 550, y: 225 },
//   { x: 800, y: 80 },
//   { x: 1035, y: 205 },
// ];

// /* =========================================================
//    CURVED FLOW PATH
// ========================================================= */

// const pathD = `
//   M ${nodes[0].x} ${nodes[0].y}

//   C
//   145 ${nodes[0].y}
//   215 ${nodes[1].y}
//   ${nodes[1].x} ${nodes[1].y}

//   C
//   390 ${nodes[1].y}
//   460 ${nodes[2].y}
//   ${nodes[2].x} ${nodes[2].y}

//   C
//   640 ${nodes[2].y}
//   710 ${nodes[3].y}
//   ${nodes[3].x} ${nodes[3].y}

//   C
//   875 ${nodes[3].y}
//   950 ${nodes[4].y}
//   ${nodes[4].x} ${nodes[4].y}
// `;

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function HowItWorks() {
//   const sectionRef = useRef(null);

//   const pathRef = useRef(null);
//   const glowPathRef = useRef(null);
//   const dotRef = useRef(null);

//   const nodeRefs = useRef([]);
//   const textRefs = useRef([]);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (!section) return;

//     const ctx = gsap.context(() => {
//       const path = pathRef.current;
//       const glowPath = glowPathRef.current;
//       const dot = dotRef.current;

//       if (!path || !glowPath || !dot) return;

//       /* =====================================================
//          PATH LENGTH
//       ===================================================== */

//       const pathLength = path.getTotalLength();

//       /* =====================================================
//          INITIAL PATH STATE
//       ===================================================== */

//       gsap.set([path, glowPath], {
//         strokeDasharray: pathLength,
//         strokeDashoffset: pathLength,
//       });

//       /* =====================================================
//          INITIAL NODE STATE
//       ===================================================== */

//       gsap.set(nodeRefs.current, {
//         opacity: 0,
//         scale: 0.5,
//         transformOrigin: "center center",
//       });

//       /* =====================================================
//          INITIAL TEXT / CARD STATE
//       ===================================================== */

//       textRefs.current.forEach((text, index) => {
//         if (!text) return;

//         gsap.set(text, {
//           opacity: 0,
//           y: index % 2 === 0 ? -22 : 22,
//         });
//       });

//       /* =====================================================
//          INITIAL DOT
//       ===================================================== */

//       gsap.set(dot, {
//         opacity: 0,
//       });

//       /* =====================================================
//          MASTER SCROLL TIMELINE
//       ===================================================== */

//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "+=2300",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });

//       /* =====================================================
//          LINE DRAW
//       ===================================================== */

//       timeline.to(
//         [path, glowPath],
//         {
//           strokeDashoffset: 0,
//           duration: 5,
//           ease: "none",
//         },
//         0
//       );

//       /* =====================================================
//          TRAVELING DOT APPEAR
//       ===================================================== */

//       timeline.to(
//         dot,
//         {
//           opacity: 1,
//           duration: 0.2,
//         },
//         0
//       );

//       /* =====================================================
//          TRAVELING DOT
//       ===================================================== */

//       timeline.to(
//         dot,
//         {
//           motionPath: {
//             path: path,
//             align: path,
//             alignOrigin: [0.5, 0.5],
//           },

//           duration: 5,
//           ease: "none",
//         },
//         0
//       );

//       /* =====================================================
//          STEP REVEALS
//       ===================================================== */

//       steps.forEach((_, index) => {
//         const stepTime = index * 1.05;

//         /* NUMBER */

//         timeline.to(
//           nodeRefs.current[index],
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.32,
//             ease: "back.out(2.5)",
//           },
//           stepTime
//         );

//         /* CARD / TEXT */

//         timeline.to(
//           textRefs.current[index],
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             ease: "power3.out",
//           },
//           stepTime + 0.08
//         );
//       });

//       /* =====================================================
//          NODE PULSE
//       ===================================================== */

//       nodeRefs.current.forEach((node, index) => {
//         if (!node) return;

//         const pulse = node.querySelector(".node-pulse");

//         if (!pulse) return;

//         gsap.to(pulse, {
//           scale: 1.9,
//           opacity: 0,
//           duration: 1.8,
//           repeat: -1,
//           delay: index * 0.25,
//           ease: "power2.out",
//         });
//       });
//     }, section);

//     return () => {
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="
//         relative
//         h-screen
//         w-full
//         overflow-hidden
//         bg-black
//         text-white
//       "
//     >

//       {/* =====================================================
//           BACKGROUND GLOW
//       ===================================================== */}

//       <div className="pointer-events-none absolute inset-0">

//         <div
//           className="
//             absolute
//             left-1/2
//             top-[30%]
//             h-[500px]
//             w-[850px]
//             -translate-x-1/2
//             rounded-full
//             bg-indigo-600/[0.09]
//             blur-[150px]
//           "
//         />

//         <div
//           className="
//             absolute
//             bottom-[-180px]
//             left-[15%]
//             h-[350px]
//             w-[450px]
//             rounded-full
//             bg-violet-700/[0.08]
//             blur-[130px]
//           "
//         />

//         <div
//           className="
//             absolute
//             right-[-120px]
//             top-[15%]
//             h-[350px]
//             w-[400px]
//             rounded-full
//             bg-purple-600/[0.06]
//             blur-[120px]
//           "
//         />

//       </div>

//       {/* =====================================================
//           MAIN CONTAINER
//       ===================================================== */}

//       <div
//         className="
//           relative
//           mx-auto
//           flex
//           h-full
//           max-w-7xl
//           flex-col
//           px-6
//           py-14
//           sm:px-10
//           lg:px-12
//         "
//       >

//         {/* ===================================================
//             HEADING
//         =================================================== */}

//         <div className="shrink-0 text-center">

//           <div
//             className="
//               mb-4
//               inline-flex
//               items-center
//               gap-2
//               rounded-full
//               border
//               border-white/10
//               bg-white/[0.03]
//               px-4
//               py-1.5
//               text-[11px]
//               font-medium
//               uppercase
//               tracking-[0.16em]
//               text-indigo-300
//               backdrop-blur-md
//             "
//           >
//             <span
//               className="
//                 h-1.5
//                 w-1.5
//                 rounded-full
//                 bg-indigo-400
//                 shadow-[0_0_10px_rgba(129,140,248,0.9)]
//               "
//             />

//             How it works
//           </div>

//           <h2
//             className="
//               text-4xl
//               font-semibold
//               tracking-[-0.045em]
//               text-white
//               md:text-5xl
//               lg:text-[54px]
//             "
//           >
//             From video to{" "}

//             <span
//               className="
//                 font-serif
//                 italic
//                 bg-gradient-to-r
//                 from-indigo-400
//                 via-violet-400
//                 to-purple-400
//                 bg-clip-text
//                 text-transparent
//               "
//             >
//               relevant ad
//             </span>
//           </h2>

//           <p
//             className="
//               mx-auto
//               mt-4
//               max-w-xl
//               text-sm
//               leading-6
//               text-zinc-500
//               md:text-base
//             "
//           >
//             See how ContextAds understands content, extracts context,
//             and finds the right advertisement.
//           </p>

//         </div>

//         {/* ===================================================
//             DESKTOP TIMELINE
//         =================================================== */}

//         <div
//           className="
//             relative
//             mt-8
//             hidden
//             flex-1
//             lg:block
//           "
//         >

//           {/* =================================================
//               SVG FLOW LINE
//           ================================================= */}

//           <svg
//             viewBox="0 0 1100 300"
//             preserveAspectRatio="none"
//             className="
//               absolute
//               left-0
//               top-[90px]
//               h-[300px]
//               w-full
//               overflow-visible
//             "
//             fill="none"
//           >

//             <defs>

//               {/* Gradient */}

//               <linearGradient
//                 id="contextFlowGradient"
//                 x1="0"
//                 y1="0"
//                 x2="1"
//                 y2="0"
//               >
//                 <stop
//                   offset="0%"
//                   stopColor="#6366f1"
//                 />

//                 <stop
//                   offset="50%"
//                   stopColor="#8b5cf6"
//                 />

//                 <stop
//                   offset="100%"
//                   stopColor="#a78bfa"
//                 />
//               </linearGradient>

//               {/* Glow filter */}

//               <filter
//                 id="contextFlowGlow"
//                 x="-100%"
//                 y="-100%"
//                 width="300%"
//                 height="300%"
//               >

//                 <feGaussianBlur
//                   stdDeviation="5"
//                   result="blur"
//                 />

//                 <feMerge>
//                   <feMergeNode in="blur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>

//               </filter>

//             </defs>

//             {/* BASE LINE */}

//             <path
//               d={pathD}
//               stroke="rgba(255,255,255,0.08)"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />

//             {/* GLOW LINE */}

//             <path
//               ref={glowPathRef}
//               d={pathD}
//               stroke="#8b5cf6"
//               strokeWidth="7"
//               strokeLinecap="round"
//               opacity="0.25"
//               filter="url(#contextFlowGlow)"
//             />

//             {/* MAIN LINE */}

//             <path
//               ref={pathRef}
//               d={pathD}
//               stroke="url(#contextFlowGradient)"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//             />

//             {/* MOVING DOT */}

//             <circle
//               ref={dotRef}
//               r="4.5"
//               fill="#e9d5ff"
//               filter="url(#contextFlowGlow)"
//             />

//           </svg>

//           {/* =================================================
//               STEPS
//           ================================================= */}

//           <div className="absolute inset-0">

//             {steps.map((step, index) => {

//               const below = index % 2 === 0;

//               return (
//                 <div
//                   key={step.title}
//                   className="absolute"
//                   style={{
//                     left: `${(nodes[index].x / 1100) * 100}%`,
//                     top: `${nodes[index].y + 90}px`,
//                     transform: "translateX(-50%)",
//                   }}
//                 >

//                   {/* =========================================
//                       NUMBER NODE
//                   ========================================== */}

//                   <div
//                     ref={(element) => {
//                       nodeRefs.current[index] = element;
//                     }}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       z-30
//                       -translate-x-1/2
//                       -translate-y-1/2
//                     "
//                   >

//                     <div
//                       className="
//                         relative
//                         flex
//                         h-12
//                         w-12
//                         items-center
//                         justify-center
//                       "
//                     >

//                       {/* Pulse */}

//                       <span
//                         className="
//                           node-pulse
//                           absolute
//                           inset-0
//                           rounded-full
//                           bg-violet-500/30
//                         "
//                       />

//                       {/* Outer Ring */}

//                       <span
//                         className="
//                           absolute
//                           inset-0
//                           rounded-full
//                           border
//                           border-violet-400/20
//                         "
//                       />

//                       {/* Number */}

//                       <div
//                         className="
//                           relative
//                           flex
//                           h-9
//                           w-9
//                           items-center
//                           justify-center
//                           rounded-full
//                           border
//                           border-violet-300/30
//                           bg-[#07070a]
//                           text-[10px]
//                           font-semibold
//                           tracking-wide
//                           text-violet-200
//                           shadow-[0_0_22px_rgba(139,92,246,0.22)]
//                           ring-4
//                           ring-black
//                         "
//                       >
//                         {step.number}
//                       </div>

//                     </div>

//                   </div>

//                   {/* =========================================
//                       CONNECTOR + GLOWING CARD
//                   ========================================== */}

//                   <div
//                     ref={(element) => {
//                       textRefs.current[index] = element;
//                     }}
//                     className={`
//                       absolute
//                       left-1/2
//                       w-[210px]
//                       -translate-x-1/2
//                       ${
//                         below
//                           ? "top-[52px]"
//                           : "bottom-[52px]"
//                       }
//                     `}
//                   >

//                     {/* CONNECTOR */}

//                     <div
//                       className={`
//                         absolute
//                         left-1/2
//                         h-7
//                         w-px
//                         -translate-x-1/2
//                         bg-gradient-to-b
//                         from-violet-400/50
//                         to-transparent
//                         ${
//                           below
//                             ? "-top-7"
//                             : "-bottom-7 rotate-180"
//                         }
//                       `}
//                     />

//                     {/* =======================================
//                         SOFT GLOW BEHIND CARD
//                     ======================================== */}

//                     <div
//                       className="
//                         pointer-events-none
//                         absolute
//                         -inset-5
//                         rounded-[28px]
//                         bg-violet-600/[0.07]
//                         blur-2xl
//                       "
//                     />

//                     {/* =======================================
//                         CARD
//                     ======================================== */}

//                     <div
//                       className="
//                         group
//                         relative
//                         overflow-hidden
//                         rounded-2xl
//                         border
//                         border-white/[0.10]
//                         bg-[#08080c]/80
//                         px-5
//                         py-4
//                         text-center
//                         backdrop-blur-xl
//                         shadow-[0_0_35px_rgba(99,102,241,0.08)]
//                         transition-all
//                         duration-500
//                         hover:-translate-y-1
//                         hover:border-violet-400/30
//                         hover:bg-[#0b0a10]/90
//                         hover:shadow-[0_0_45px_rgba(139,92,246,0.16)]
//                       "
//                     >

//                       {/* ===================================
//                           TOP SHINE
//                       ==================================== */}

//                       <div
//                         className="
//                           pointer-events-none
//                           absolute
//                           inset-x-0
//                           top-0
//                           h-px
//                           bg-gradient-to-r
//                           from-transparent
//                           via-violet-400/40
//                           to-transparent
//                         "
//                       />

//                       {/* ===================================
//                           CORNER GLOW
//                       ==================================== */}

//                       <div
//                         className="
//                           pointer-events-none
//                           absolute
//                           -right-10
//                           -top-10
//                           h-20
//                           w-20
//                           rounded-full
//                           bg-violet-500/10
//                           blur-2xl
//                           transition-all
//                           duration-500
//                           group-hover:bg-violet-500/20
//                         "
//                       />

//                       {/* ===================================
//                           SMALL STEP LABEL
//                       ==================================== */}

//                       <div
//                         className="
//                           relative
//                           mb-2
//                           text-[9px]
//                           font-semibold
//                           uppercase
//                           tracking-[0.25em]
//                           text-violet-400/70
//                         "
//                       >
//                         STEP {step.number}
//                       </div>

//                       {/* ===================================
//                           TITLE
//                       ==================================== */}

//                       <h3
//                         className="
//                           relative
//                           text-[20px]
//                           font-semibold
//                           tracking-[-0.02em]
//                           text-white
//                         "
//                       >
//                         {step.title}
//                       </h3>

//                       {/* ===================================
//                           DESCRIPTION
//                       ==================================== */}

//                       <p
//                         className="
//                           relative
//                           mx-auto
//                           mt-2
//                           max-w-[175px]
//                           text-[10.5px]
//                           leading-[1.6]
//                           text-zinc-500

//                         "
//                       >
//                         {step.desc}
//                       </p>

//                     </div>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>

//         </div>

//         {/* ===================================================
//             MOBILE VERSION
//         =================================================== */}

//         <div
//           className="
//             relative
//             mt-10
//             flex-1
//             overflow-hidden
//             lg:hidden
//           "
//         >

//           {/* Vertical Line */}

//           <div
//             className="
//               absolute
//               bottom-0
//               left-[18px]
//               top-0
//               w-px
//               bg-white/[0.08]
//             "
//           >

//             <div
//               className="
//                 h-full
//                 w-full
//                 bg-gradient-to-b
//                 from-indigo-500
//                 via-violet-500
//                 to-purple-400
//               "
//             />

//           </div>


//           {/* Mobile Steps */}

//           <div className="flex flex-col gap-8 pl-12">

//             {steps.map((step) => (
//               <div
//                 key={step.title}
//                 className="relative py-1"
//               >

//                 {/* Number */}

//                 <div
//                   className="
//                     absolute
//                     -left-[43px]
//                     top-0
//                     flex
//                     h-9
//                     w-9
//                     items-center
//                     justify-center
//                     rounded-full
//                     border
//                     border-violet-300/25
//                     bg-[#07070a]
//                     text-[9px]
//                     font-semibold
//                     text-violet-200
//                     shadow-[0_0_18px_rgba(139,92,246,0.2)]
//                     ring-4
//                     ring-black
//                   "
//                 >
//                   {step.number}
//                 </div>


//                 {/* Mobile Glow Card */}

//                 <div
//                   className="
//                     relative
//                     overflow-hidden
//                     rounded-2xl
//                     border
//                     border-white/[0.09]
//                     bg-[#08080c]/75
//                     px-5
//                     py-4
//                     backdrop-blur-xl
//                     shadow-[0_0_30px_rgba(99,102,241,0.07)]
//                   "
//                 >

//                   {/* Shine */}

//                   <div
//                     className="
//                       pointer-events-none
//                       absolute
//                       inset-x-0
//                       top-0
//                       h-px
//                       bg-gradient-to-r
//                       from-transparent
//                       via-violet-400/30
//                       to-transparent
//                     "
//                   />

//                   <div
//                     className="
//                       text-[9px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.22em]
//                       text-violet-400/60
//                     "
//                   >
//                     STEP {step.number}
//                   </div>

//                   <h3
//                     className="
//                       mt-2
//                       text-sm
//                       font-semibold
//                       text-white
//                     "
//                   >
//                     {step.title}
//                   </h3>

//                   <p
//                     className="
//                       mt-2
//                       max-w-sm
//                       text-xs
//                       leading-5
//                       text-zinc-500
//                     "
//                   >
//                     {step.desc}
//                   </p>

//                 </div>

//               </div>
//             ))}

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }




import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import {
  Link2,
  BrainCircuit,
  FileSearch,
  Target,
  Send,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* =========================================================
   STEPS
========================================================= */

const steps = [
  {
    number: "01",
    title: "Paste Video URL",
    desc: "Start with any YouTube video and let ContextAds analyze it.",
    icon: Link2,
  },
  {
    number: "02",
    title: "AI Analysis",
    desc: "Audio, visuals and frames come together to understand the video.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Context Extraction",
    desc: "Key topics, themes and tone are distilled into meaningful context.",
    icon: FileSearch,
  },
  {
    number: "04",
    title: "Ad Matching",
    desc: "The detected context is matched with the most relevant ads.",
    icon: Target,
  },
  {
    number: "05",
    title: "Deliver the Ad",
    desc: "The right ad reaches the right context at the right moment.",
    icon: Send,
  },
];

/* =========================================================
   WAVE NODES
========================================================= */

const nodes = [
  { x: 65, y: 205 },
  { x: 300, y: 80 },
  { x: 550, y: 225 },
  { x: 800, y: 80 },
  { x: 1035, y: 205 },
];

/* =========================================================
   WAVE PATH
========================================================= */

const pathD = `
  M ${nodes[0].x} ${nodes[0].y}

  C
  145 ${nodes[0].y}
  215 ${nodes[1].y}
  ${nodes[1].x} ${nodes[1].y}

  C
  390 ${nodes[1].y}
  460 ${nodes[2].y}
  ${nodes[2].x} ${nodes[2].y}

  C
  640 ${nodes[2].y}
  710 ${nodes[3].y}
  ${nodes[3].x} ${nodes[3].y}

  C
  875 ${nodes[3].y}
  950 ${nodes[4].y}
  ${nodes[4].x} ${nodes[4].y}
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function HowItWorks() {
  const sectionRef = useRef(null);

  const pathRef = useRef(null);
  const glowPathRef = useRef(null);
  const dotRef = useRef(null);

  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const glowPath = glowPathRef.current;
      const dot = dotRef.current;

      if (!path || !glowPath || !dot) return;

      /* =====================================================
         PATH LENGTH
      ===================================================== */

      const pathLength = path.getTotalLength();

      /* =====================================================
         INITIAL LINE
      ===================================================== */

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.set(glowPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      /* =====================================================
         INITIAL NUMBERS
      ===================================================== */

      gsap.set(nodeRefs.current, {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
      });

      /* =====================================================
         INITIAL CARDS
      ===================================================== */

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.set(card, {
          opacity: 0,
          y: index % 2 === 0 ? 20 : -20,
        });
      });

      /* =====================================================
         INITIAL MOVING DOT
      ===================================================== */

      gsap.set(dot, {
        opacity: 0,
      });

      /* =====================================================
         MAIN SCROLL TIMELINE
      ===================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "200 top",
          end: "+=2300",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         DRAW LINE
      ===================================================== */

      timeline.to(
        [path, glowPath],
        {
          strokeDashoffset: 0,
          duration: 5,
          ease: "none",
        },
        0
      );

      /* =====================================================
         MOVING DOT APPEAR
      ===================================================== */

      timeline.to(
        dot,
        {
          opacity: 1,
          duration: 0.2,
        },
        0
      );

      /* =====================================================
         MOVING DOT ALONG PATH
      ===================================================== */

      timeline.to(
        dot,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          duration: 5,
          ease: "none",
        },
        0
      );

      /* =====================================================
         REVEAL STEPS
      ===================================================== */

      steps.forEach((step, index) => {
        const time = index * 1.05;

        /* Number */

        timeline.to(
          nodeRefs.current[index],
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          },
          time
        );

        /* Card */

        timeline.to(
          cardRefs.current[index],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          time + 0.08
        );
      });

      /* =====================================================
         NUMBER PULSE
      ===================================================== */

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;

        const pulse = node.querySelector(".node-pulse");

        if (!pulse) return;

        gsap.to(pulse, {
          scale: 1.8,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          delay: index * 0.2,
          ease: "power2.out",
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        w-full
        mt-32
        mb-32

        bg-black
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Main center glow */}

        <div
          className="
            absolute
            left-1/2
            top-[32%]
            h-[520px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.08]
            blur-[150px]
          "
        />

        {/* Left glow */}

        <div
          className="
            absolute
            bottom-[-180px]
            left-[-120px]
            h-[430px]
            w-[480px]
            rounded-full
            bg-indigo-700/[0.10]
            blur-[140px]
          "
        />

        {/* Right glow */}

        <div
          className="
            absolute
            right-[-120px]
            top-[30%]
            h-[420px]
            w-[480px]
            rounded-full
            bg-purple-700/[0.09]
            blur-[140px]
          "
        />

        {/* =================================================
            LEFT DOT FIELD
        ================================================= */}

        <div
          className="
            absolute
            left-8
            top-[45%]
            grid
            grid-cols-3
            gap-3
            opacity-60
          "
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={`left-dot-${index}`}
              className="
                h-[2px]
                w-[2px]
                rounded-full
                bg-violet-400
                shadow-[0_0_8px_rgba(139,92,246,0.95)]
              "
            />
          ))}
        </div>

        {/* =================================================
            RIGHT DOT FIELD
        ================================================= */}

        <div
          className="
            absolute
            right-8
            top-[45%]
            grid
            grid-cols-3
            gap-3
            opacity-60
          "
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={`right-dot-${index}`}
              className="
                h-[2px]
                w-[2px]
                rounded-full
                bg-violet-400
                shadow-[0_0_8px_rgba(139,92,246,0.95)]
              "
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          h-full
          max-w-7xl
          flex-col
          px-6
          py-10
          sm:px-10
          lg:px-12
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="relative z-50 shrink-0 pt-2 text-center">

          {/* Section label */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-3
              text-[11px]
              font-medium
              uppercase
              tracking-[0.24em]
              text-violet-300
            "
          >
            <span
              className="
                h-px
                w-12
                bg-gradient-to-r
                from-transparent
                to-violet-500
              "
            />

            <span>How it works</span>

            <span
              className="
                h-px
                w-12
                bg-gradient-to-l
                from-transparent
                to-violet-500
              "
            />
          </div>

          {/* Heading */}

          <h2
            className="
              text-4xl
              font-semibold
              leading-[1.05]
              tracking-[-0.05em]
              text-white
              md:text-5xl
              lg:text-[54px]
            "
          >
            From video to{" "}

            <span
              className="
                font-serif
                italic
                bg-gradient-to-r
                from-indigo-400
                via-violet-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              relevant ad
            </span>
          </h2>

          {/* Subtitle */}

          <p
            className="
              mx-auto
              mt-4
              max-w-[650px]
              text-sm
              leading-6
              text-zinc-500
              md:text-base
            "
          >
            See how ContextAds understands content, extracts context,
            and finds the right advertisement.
          </p>
        </div>

        {/* ===================================================
            DESKTOP TIMELINE
        =================================================== */}

        <div
          className="
            relative
            mt-2
            hidden
            flex-1
            lg:block
            top-24

          "
        >
          {/* =================================================
              SVG WAVE
          ================================================= */}

          <svg
            viewBox="0 0 1100 300"
            preserveAspectRatio="none"
            className="
              absolute
              left-0
              top-[80px]
              h-[310px]
              w-full
              overflow-visible
            "
            fill="none"
          >
            <defs>

              {/* Line gradient */}

              <linearGradient
                id="contextFlowGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#6366f1"
                />

                <stop
                  offset="50%"
                  stopColor="#8b5cf6"
                />

                <stop
                  offset="100%"
                  stopColor="#a78bfa"
                />
              </linearGradient>

              {/* Glow filter */}

              <filter
                id="contextFlowGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base line */}

            <path
              d={pathD}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Wide glow */}

            <path
              ref={glowPathRef}
              d={pathD}
              stroke="#8b5cf6"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.30"
              filter="url(#contextFlowGlow)"
            />

            {/* Main line */}

            <path
              ref={pathRef}
              d={pathD}
              stroke="url(#contextFlowGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Moving dot */}

            <circle
              ref={dotRef}
              r="4.5"
              fill="#ede9fe"
              filter="url(#contextFlowGlow)"
            />
          </svg>

          {/* =================================================
              STEPS
          ================================================= */}

          <div className="absolute inset-0 ">

            {steps.map((step, index) => {
              const isBelow = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="absolute"
                  style={{
                    left: `${(nodes[index].x / 1100) * 100}%`,
                    top: `${nodes[index].y + 80}px`,
                    width: "1px",
                    height: "1px",
                  }}
                >
                  {/* =========================================
                      NUMBER
                  ========================================== */}

                  <div
                    ref={(element) => {
                      nodeRefs.current[index] = element;
                    }}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      z-40
                      -translate-x-1/2
                      -translate-y-1/2
                    "
                  >
                    <div
                      className="
                        relative
                        flex
                        h-[52px]
                        w-[52px]
                        items-center
                        justify-center
                      "
                    >
                      {/* Pulse */}

                      <span
                        className="
                          node-pulse
                          absolute
                          inset-0
                          rounded-full
                          bg-violet-500/30
                        "
                      />

                      {/* Outer ring */}

                      <span
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-violet-400/30
                          bg-black/70
                          shadow-[0_0_25px_rgba(139,92,246,0.30)]
                        "
                      />

                      {/* Number */}

                      <div
                        className="
                          relative
                          flex
                          h-[38px]
                          w-[38px]
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-violet-300/35
                          bg-[#050509]
                          text-[11px]
                          font-semibold
                          text-violet-100
                          ring-[3px]
                          ring-black
                          shadow-[0_0_12px_rgba(139,92,246,0.18)]
                        "
                      >
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* =========================================
                      CARD
                  ========================================== */}

                  <div
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    className={`
                      absolute
                      left-1/2
                      z-20
                      w-[300px]
                      -translate-x-1/2

                      ${
                        isBelow
                          ? "top-[62px]"
                          : "top-[-202px]"
                      }
                    `}
                  >
                    {/* =====================================
                        CONNECTOR
                    ====================================== */}

                    <div
                      className={`
                        absolute
                        left-1/2
                        z-10
                        h-7
                        w-px
                        -translate-x-1/2
                        bg-gradient-to-b
                        from-violet-300/80
                        via-violet-500/50
                        to-transparent

                        ${
                          isBelow
                            ? "-top-7"
                            : "-bottom-7 rotate-180"
                        }
                      `}
                    />

                    {/* =====================================
                        OUTER CARD AURA
                    ====================================== */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -inset-8
                        rounded-[34px]
                        bg-violet-600/[0.10]
                        blur-3xl
                        opacity-90
                      "
                    />

                    {/* =====================================
                        SECONDARY GLOW
                    ====================================== */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -inset-3
                        rounded-[25px]
                        border
                        border-violet-500/[0.08]
                        shadow-[0_0_45px_rgba(139,92,246,0.10)]
                      "
                    />

                    {/* =====================================
                        MAIN CARD
                    ====================================== */}

                    <div
                      className="
                        group
                        relative
                        flex
                        min-h-[142px]
                        items-center
                        gap-5
                        overflow-hidden
                        rounded-[20px]
                        border
                        border-violet-300/[0.13]
                        bg-[#07070d]/95
                        px-5
                        py-5
                        backdrop-blur-xl
                        shadow-[0_0_30px_rgba(124,58,237,0.08),0_0_70px_rgba(76,29,149,0.06)]
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-violet-400/40
                        hover:bg-[#090812]/95
                        hover:shadow-[0_0_35px_rgba(139,92,246,0.20),0_0_80px_rgba(109,40,217,0.12)]
                      "
                    >
                      {/* =================================
                          TOP EDGE LIGHT
                      ================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-x-7
                          top-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-violet-300/60
                          to-transparent
                        "
                      />

                      {/* =================================
                          BOTTOM EDGE LIGHT
                      ================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-x-16
                          bottom-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-violet-500/20
                          to-transparent
                        "
                      />

                      {/* =================================
                          CORNER GLOW
                      ================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -right-12
                          -top-12
                          h-28
                          w-28
                          rounded-full
                          bg-violet-500/[0.12]
                          blur-3xl
                          transition-all
                          duration-500
                          group-hover:bg-violet-500/[0.20]
                        "
                      />

                      {/* =================================
                          LEFT INNER GLOW
                      ================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -left-8
                          top-1/2
                          h-24
                          w-24
                          -translate-y-1/2
                          rounded-full
                          bg-indigo-500/[0.06]
                          blur-2xl
                        "
                      />

                      {/* =================================
                          ICON CIRCLE
                      ================================== */}

                      <div
                        className="
                          relative
                          flex
                          h-[58px]
                          w-[58px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-violet-400/30
                          bg-violet-500/[0.08]
                          text-violet-300
                          shadow-[0_0_20px_rgba(139,92,246,0.16),inset_0_0_18px_rgba(139,92,246,0.06)]
                          transition-all
                          duration-500
                          group-hover:border-violet-400/60
                          group-hover:bg-violet-500/[0.13]
                          group-hover:text-violet-200
                          group-hover:shadow-[0_0_30px_rgba(139,92,246,0.32),inset_0_0_22px_rgba(139,92,246,0.10)]
                        "
                      >
                        {/* Icon glow */}

                        <span
                          className="
                            absolute
                            inset-1
                            rounded-full
                            bg-violet-500/[0.10]
                            blur-md
                          "
                        />

                        <Icon
                          size={25}
                          strokeWidth={1.6}
                          className="
                            relative
                            z-10
                            drop-shadow-[0_0_8px_rgba(167,139,250,0.65)]
                          "
                        />
                      </div>

                      {/* =================================
                          CONTENT
                      ================================== */}

                      <div className="relative min-w-0 flex-1">

                        {/* Step label */}

                        <div
                          className="
                            mb-1.5
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.24em]
                            text-violet-400/75
                          "
                        >
                          Step {step.number}
                        </div>

                        {/* Title */}

                        <h3
                          className="
                            text-[17px]
                            font-semibold
                            leading-tight
                            tracking-[-0.025em]
                            text-white
                          "
                        >
                          {step.title}
                        </h3>

                        {/* Description */}

                        <p
                          className="
                            mt-2
                            max-w-[185px]
                            text-[11px]
                            leading-[1.55]
                            text-zinc-400
                          "
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================
            MOBILE VERSION
        =================================================== */}

        <div
          className="
            relative
            mt-8
            flex-1
            overflow-hidden
            lg:hidden
          "
        >
          {/* Mobile line */}

          <div
            className="
              absolute
              bottom-0
              left-[18px]
              top-0
              w-px
              bg-gradient-to-b
              from-indigo-500
              via-violet-500
              to-purple-400
            "
          />

          <div className="flex flex-col gap-6 pl-12">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative"
                >
                  {/* Number */}

                  <div
                    className="
                      absolute
                      -left-[43px]
                      top-5
                      z-20
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-violet-300/30
                      bg-[#07070a]
                      text-[9px]
                      font-semibold
                      text-violet-200
                      shadow-[0_0_20px_rgba(139,92,246,0.28)]
                      ring-4
                      ring-black
                    "
                  >
                    {step.number}
                  </div>

                  {/* Mobile card */}

                  <div
                    className="
                      relative
                      flex
                      items-center
                      gap-4
                      overflow-hidden
                      rounded-2xl
                      border
                      border-violet-300/[0.12]
                      bg-[#08080c]/90
                      px-4
                      py-4
                      backdrop-blur-xl
                      shadow-[0_0_30px_rgba(99,102,241,0.10)]
                    "
                  >
                    {/* Icon */}

                    <div
                      className="
                        relative
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-violet-400/30
                        bg-violet-500/[0.08]
                        text-violet-300
                        shadow-[0_0_22px_rgba(139,92,246,0.18)]
                      "
                    >
                      <span
                        className="
                          absolute
                          inset-1
                          rounded-full
                          bg-violet-500/10
                          blur-md
                        "
                      />

                      <Icon
                        size={19}
                        strokeWidth={1.7}
                        className="
                          relative
                          z-10
                          drop-shadow-[0_0_7px_rgba(167,139,250,0.65)]
                        "
                      />
                    </div>

                    {/* Content */}

                    <div className="min-w-0">

                      <div
                        className="
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.22em]
                          text-violet-400/70
                        "
                      >
                        Step {step.number}
                      </div>

                      <h3
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-1.5
                          text-[10px]
                          leading-5
                          text-zinc-500
                        "
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}