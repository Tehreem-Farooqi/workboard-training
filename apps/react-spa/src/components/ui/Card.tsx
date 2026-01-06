import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export function Card({ 
  children, 
  title, 
  className = '',
  onClick,
  as: Component = 'div'
}: CardProps) {
  const isInteractive = !!onClick;

  const baseClasses = `bg-white rounded-lg shadow-md overflow-hidden ${
    isInteractive ? 'cursor-pointer transition-transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500' : ''
  } ${className}`;

  const cardContent = (
    <>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </>
  );

  if (isInteractive) {
    return (
      <Component
        className={baseClasses}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={title}
      >
        {cardContent}
      </Component>
    );
  }

  return (
    <Component className={baseClasses}>
      {cardContent}
    </Component>
  );
}