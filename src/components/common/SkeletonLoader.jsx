import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1, style = {} }) => {
  const skeletons = Array(count).fill(0);

  const getSkeletonMarkup = () => {
    switch (type) {
      case 'card':
        return (
          <div style={{ padding: '1.5rem', ...style }} className="skeleton-container">
            <div className="skeleton-box" style={{ width: '40px', height: '40px', borderRadius: '50%', marginBottom: '1rem' }} />
            <div className="skeleton-box" style={{ width: '60%', height: '1.2rem', borderRadius: '4px', marginBottom: '0.5rem' }} />
            <div className="skeleton-box" style={{ width: '85%', height: '0.85rem', borderRadius: '4px', marginBottom: '1.25rem' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div className="skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '12px' }} />
              <div className="skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '12px' }} />
            </div>
          </div>
        );
      
      case 'list-item':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--border-color)', ...style }} className="skeleton-container">
            <div className="skeleton-box" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton-box" style={{ width: '40%', height: '1rem', borderRadius: '4px', marginBottom: '0.4rem' }} />
              <div className="skeleton-box" style={{ width: '25%', height: '0.75rem', borderRadius: '4px' }} />
            </div>
            <div className="skeleton-box" style={{ width: '60px', height: '24px', borderRadius: '12px' }} />
          </div>
        );

      case 'table-row':
        return (
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)', ...style }} className="skeleton-container">
            <div className="skeleton-box" style={{ width: '25%', height: '1rem', borderRadius: '4px', marginRight: '5%' }} />
            <div className="skeleton-box" style={{ width: '15%', height: '1rem', borderRadius: '4px', marginRight: '5%' }} />
            <div className="skeleton-box" style={{ width: '30%', height: '1rem', borderRadius: '4px', marginRight: '5%' }} />
            <div className="skeleton-box" style={{ width: '15%', height: '1rem', borderRadius: '4px' }} />
          </div>
        );

      case 'stat':
        return (
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', ...style }} className="skeleton-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="skeleton-box" style={{ width: '40%', height: '0.85rem', borderRadius: '4px' }} />
              <div className="skeleton-box" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
            </div>
            <div className="skeleton-box" style={{ width: '60%', height: '2rem', borderRadius: '4px', margin: '0.25rem 0' }} />
            <div className="skeleton-box" style={{ width: '30%', height: '0.75rem', borderRadius: '4px' }} />
          </div>
        );
        
      default:
        return (
          <div className="skeleton-box" style={{ width: '100%', height: '100px', borderRadius: 'var(--radius-md)', ...style }} />
        );
    }
  };

  return (
    <>
      {skeletons.map((_, idx) => (
        <div key={idx} className="card-glass" style={{ marginBottom: type === 'card' || type === 'stat' ? '0' : '0' }}>
          {getSkeletonMarkup()}
        </div>
      ))}
    </>
  );
};
