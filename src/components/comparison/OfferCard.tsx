import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OfferCardProps {
  plan: any; // Using any for UI scaffolding, later replace with Payload Plan type
  operator: any;
}

export default function OfferCard({ plan, operator }: OfferCardProps) {
  // W realnej aplikacji URL pochodziłby z API (click-tracking)
  const ctaUrl = plan.affiliate_url || `/api/redirect/${plan.id || '123'}`;
  
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-all hover:bg-white/15 border-white/10">
      
      {/* Badge (if applicable) */}
      {plan.display_badge && (
        <div 
          className="absolute top-0 left-0 px-4 py-1.5 text-xs font-bold uppercase rounded-br-xl tracking-wider shadow-md"
          style={{ backgroundColor: plan.display_badgeColor || '#06b6d4', color: '#fff' }}
        >
          {plan.display_badge}
        </div>
      )}
      
      {/* Operator Logo */}
      <div className="w-24 h-24 bg-white rounded-xl flex-shrink-0 flex items-center justify-center p-2 shadow-inner mt-4 md:mt-0">
        {operator.logoUrl ? (
          <Image 
            src={operator.logoUrl} 
            alt={operator.name} 
            width={80} 
            height={80} 
            className="object-contain"
          />
        ) : (
          <span className="text-gray-800 font-bold text-lg">{operator.name}</span>
        )}
      </div>

      {/* Plan Details */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-gray-300 mb-3">Internet {plan.technology?.toUpperCase() || 'Światłowód'}</p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mt-4">
          <div className="flex items-center gap-1 text-cyan-400 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <span className="text-base">{plan.speeds_download} Mbps</span>
          </div>
          {plan.contract_months && (
            <div className="flex items-center gap-1 text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{plan.contract_months} msc</span>
            </div>
          )}
          {plan.contract_freeRouterIncluded && (
             <div className="flex items-center gap-1 text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              <span>Wi-Fi w cenie</span>
             </div>
          )}
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex flex-col items-center md:items-end min-w-[150px] border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto mt-4 md:mt-0">
        <div className="text-3xl font-bold text-white mb-1">
          {plan.pricing_priceMonthly} <span className="text-base text-gray-400 font-normal">zł/mc</span>
        </div>
        {plan.pricing_activationFee > 0 ? (
          <div className="text-xs text-gray-400 mb-4">
            Aktywacja: {plan.pricing_activationFee} zł
          </div>
        ) : (
          <div className="text-xs text-green-400 mb-4 font-medium">
            Aktywacja: 0 zł
          </div>
        )}
        <Link 
          href={ctaUrl}
          target="_blank"
          rel="nofollow noopener"
          className="w-full md:w-auto mt-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-cyan-500/25 text-center whitespace-nowrap"
        >
          {plan.display_customCTA || "Wybierz ofertę"}
        </Link>
      </div>
    </div>
  );
}
