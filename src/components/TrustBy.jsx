
import { motion } from "motion/react";

const institutions = [
  "MIT Press",
  "Harvard Ext",
  "Stanford Verify",
  "LegalChain",
  "GlobalCert",
  "TrustBridge",
];

export default function TrustedBy() {
  return (
    <section className="w-full lg:mt-20 bg-gray-50 py-10 px-6">
      <div className="md:max-w-6xl mx-auto flex flex-col items-center gap-8">
        <p className="text-xs text-center font-bold tracking-widest text-gray-400 uppercase">
          Trusted by leading institutions worldwide
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 gap-y-4">
          {institutions.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="md:text-lg text-xs xs:text-sm font-bold text-gray-300 hover:text-gray-400 transition-colors cursor-default select-none"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}