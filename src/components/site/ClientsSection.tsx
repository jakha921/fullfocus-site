"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const clients = [
  { name: "Uzum", color: "from-purple-500/20 to-pink-500/20" },
  { name: "EPAM", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "IT Park", color: "from-green-500/20 to-teal-500/20" },
  { name: "UZCARD", color: "from-orange-500/20 to-red-500/20" },
  { name: "Click", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Payme", color: "from-teal-500/20 to-green-500/20" },
];

export function ClientsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted uppercase tracking-widest mb-12"
        >
          Нам доверяют
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card rounded-xl py-6 px-4 flex flex-col items-center justify-center gap-3 opacity-50 hover:opacity-100 transition-all duration-300 group cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center`}
              >
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
