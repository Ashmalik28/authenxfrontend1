import { motion } from "motion/react";

const ConnectingWallet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="w-[420px] rounded-2xl bg-white px-10 py-10 shadow-2xl">
        <div className="flex flex-col items-center">
          {/* Loader */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-8 w-8 rounded-full border-[3px] border-white border-t-transparent"
            />
          </div>

          {/* Title */}
          <h2 className="mt-5 text-xl font-semibold text-slate-700">
            Connecting to MetaMask...
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-center text-sm text-slate-400">
            Check your wallet app to approve the connection
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectingWallet;