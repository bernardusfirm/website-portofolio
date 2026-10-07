'use client';

import React from 'react';

const clients = [
  'KARANG TARUNA SELO UTOMO',
  'HYPE STEPS FOOTWEAR',
  'SAMBEL OMA',
  'SOP TANGKAR PAK DHE',
  'RUCHI COOKIES',
  'LITTLE TOKYO RESTO',
  'ROTI BANG BOY',
  'AYAM NENEK',
  'SAHABAT SEGO SAMBEL',
  'BEBEK MAS BOLOT',
  'AIRLANGGA GYMNASIUM',
  'CLOVECARE BEAUTY',
  'GRIYA NYUSHI RESTO',
  'AMANAH FROZEN FOOD',
  'ROCKET CHICKEN',
  'BANK BTN',
  'AIR JORDAN',
  'JOOCY BEVERAGE',
];

export default function ClientsTicker() {
  return (
    <div className="py-12 bg-[#0A0A0A] border-y border-white/5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center gap-12 sm:gap-20 px-6">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-12 sm:gap-20 text-zinc-500 font-mono text-sm sm:text-base font-bold tracking-widest hover:text-white transition-colors"
            >
              <span>{client}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3682F6]/60" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-12 sm:gap-20 px-6" aria-hidden="true">
          {clients.map((client, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center gap-12 sm:gap-20 text-zinc-500 font-mono text-sm sm:text-base font-bold tracking-widest hover:text-white transition-colors"
            >
              <span>{client}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3682F6]/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
