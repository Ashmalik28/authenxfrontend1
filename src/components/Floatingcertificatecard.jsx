
import { motion } from "motion/react";
import { Shield, Lock, Link2, Copy } from "lucide-react";

function NetworkNodes() {
  const nodes = [
    { x: 40, y: 60 },
    { x: 140, y: 150 },
    { x: 40, y: 300 },
    { x: 100, y: 430 },
    { x: 30, y: 540 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ];

  return (
    <svg
      viewBox="0 0 200 600"
      className="hidden md:block lg:hidden xl:flex absolute -left-16 top-0 h-full w-40 pointer-events-none"
      fill="none"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#C7D2FE"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={5}
          fill="#818CF8"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        />
      ))}
    </svg>
  );
}

function FloatingBadge({ icon: Icon, label, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute flex items-center gap-2 bg-white rounded-xl shadow-xl outline-1 outline-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {Icon && (
        <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
          <Icon size={13} />
        </span>
      )}
      {label}
    </motion.div>
  );
}

function SkeletonShimmer({
  className = "h-2.5 w-full rounded-full",
  style,
  ...rest
}) {
  return (
    <div
      className={`relative overflow-hidden bg-indigo-100 ${className}`}
      style={style}
      {...rest}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default function FloatingCertificateCard() {
  return (
    <div className="relative lg:min-w-full w-[280px] xs:w-[350px] sm:w-[350px] md:w-[400px] lg:w-sm xl:w-md">
      {/* background network graphic */}
      <NetworkNodes />

      {/* the floating card itself */}
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* gradient top edge */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

        <div className="md:p-6 p-4 xs:p-5">
          {/* header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="md:w-8 md:h-8 w-6 h-6 xs:h-7 xs:w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Shield className="w-4 xs:w-5 md:w-5" />
              </span>
              <span className="xs:text-sm text-xs font-bold tracking-wide text-gray-400">
                AUTHENX REGISTRY
              </span>
            </div>
            <div className="xs:w-10 xs:h-10 sm:h-12 sm:w-12 w-8 h-8 border-2 flex justify-center border-[#cad5fe] items-center border-dashed rounded-full bg-[#eff5fd]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="lg:w-37 lg:h-37">

              <path d="M 62 118 L 30 148 L 62 154 L 78 182 L 100 138 Z" fill="#000000"/>
              <path d="M 138 118 L 170 148 L 138 154 L 122 182 L 100 138 Z" fill="#000000"/>
            

              <circle cx="100" cy="90" r="62" fill="#000000"/>
              <circle cx="100" cy="90" r="52" fill="#F5F5F5"/>
            

              <circle cx="100" cy="90" r="44" fill="#000000"/>

              <path d="M 78 91 L 92 104 L 124 76"
                    fill="none"
                    stroke="#F5F5F5"
                    stroke-width="9"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
            </div>
          </div>

          <h3 className="md:text-xl text-md mt-1 md:mt-0 font-extrabold text-gray-900">Bachelor of Engineering</h3>
          <p className="md:text-sm text-[11px] font-bold text-gray-500 mb-2 lg:mb-3 xl:mb-6 md:mb-6">Computer Science &amp; Engineering</p>

          {/* fields */}
          <div className="md:space-y-4 lg:space-y-3 xl:space-y-4 space-y-2 md:mb-4 xl:mb-4 lg:mb-3 mb-1">
            <div>
              <p className="md:text-[11px] text-[10px] font-bold tracking-wide text-gray-400 mb-1.5">
                ISSUED TO
              </p>
              <SkeletonShimmer className="md:h-2.5 h-2 rounded-full" style={{ width: "60%" }} />
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <p className="md:text-[11px] text-[10px] font-semibold tracking-wide text-gray-400 mb-1.5">
                  ISSUE DATE
                </p>
                <SkeletonShimmer className="md:h-2.5 h-2 rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="flex-1">
                <p className="md:text-[11px] text-[10px] font-semibold tracking-wide text-gray-400 mb-1.5">
                  INSTITUTION
                </p>
                <SkeletonShimmer className="md:h-2.5 h-2 rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
            <div>
              <p className="md:text-[11px] text-[10px] font-semibold tracking-wide text-gray-400 mb-1.5">
                CREDENTIAL ID
              </p>
              <SkeletonShimmer className="md:h-2.5 h-2 rounded-full" style={{ width: "50%" }} />
            </div>
          </div>

          <hr className="border-gray-100 mb-2" />

          {/* document hash */}
          <p className="md:text-[11px] text-[10px] font-semibold tracking-wide text-gray-400 mb-2">
            DOCUMENT HASH
          </p>
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 md:px-4 md:py-3 md:mb-5 mb-3">
            <span className="md:text-xs text-[9px] font-mono text-gray-600">
              0x4a3f...c9b2e1d7f438ab90c3e56fe21
            </span>
            <Copy className="text-gray-400 w-2.5 h-2.5 md:w-3 md:h-3 " />
          </div>

          {/* blockchain / block no. */}
          <div className="flex items-center justify-between md:mb-5 lg:mb-3 xl:mb-5 mb-2">
            <div>
              <p className="text-[10px] font-bold tracking-wide text-gray-400 mb-1">
                BLOCKCHAIN
              </p>
              <div className="flex items-center gap-1.5">
                <span className="md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="md:text-sm text-[12px] font-bold text-gray-700">Ethereum Mainnet</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-wide text-gray-400 mb-1">
                BLOCK NO.
              </p>
              <span className="md:text-sm text-[12px] font-bold text-gray-900">#19,482,701</span>
            </div>
          </div>

          {/* verified banner */}
          <motion.div
            className="flex items-center gap-3 rounded-xl px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-500"
            animate={{ boxShadow: ["0 0 0px rgba(79,70,229,0)", "0 0 24px rgba(79,70,229,0.35)", "0 0 0px rgba(79,70,229,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Shield className="ms:w-4 md:h-4 w-3.5 h-3.5"/>
            </span>
            <div>
              <p className="text-white md:text-sm text-[12px] font-bold leading-tight">Verified on Blockchain</p>
              <p className="text-white/80 text-[8px] md:text-xs leading-tight">Tamper-proof · Immutable · Trusted</p>
            </div>
            <Link2 className="text-white/70 ml-auto shrink-0 w-3 h-3 md:w-4 md:h-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* floating badges around the card */}
      <FloatingBadge
        icon={Lock}
        label="End-to-end Encrypted"
        className="lg:top-6 hidden md:flex lg:hidden xl:flex lg:right-17 -right-30 top-1 translate-x-1/4"
        delay={0.4}
      />
      <FloatingBadge
        label="⚡ Instant Verification"
        className="lg:-bottom-6 lg:hidden xl:flex xl:-bottom-1 xl:-left-40 lg:-left-10 md:-bottom-1 md:-left-30 hidden md:flex -translate-x-1/4"
        delay={1.1}
      />
    </div>
  );
}