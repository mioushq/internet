import React from 'react';

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ 
        width: '32px', height: '32px', 
        background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
        borderRadius: '8px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        color: 'white', fontWeight: 'bold', fontSize: '18px' 
      }}>
        P
      </div>
      <div style={{ fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
        <span style={{ fontWeight: 'bold', color: 'currentColor' }}>Porównywarka </span>
        <span style={{ fontWeight: 'normal', color: '#06b6d4' }}>CMS</span>
      </div>
    </div>
  );
}

export function Icon() {
  return (
    <div style={{ 
      width: '32px', height: '32px', 
      background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
      borderRadius: '8px', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      color: 'white', fontWeight: 'bold', fontSize: '18px' 
    }}>
      P
    </div>
  );
}
