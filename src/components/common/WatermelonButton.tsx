import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

export interface WatermelonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'solar' | 'glass' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
  to?: string;
  href?: string;
  className?: string;
}

export const WatermelonButton: React.FC<WatermelonButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  isLoading = false,
  fullWidth = false,
  glow = false,
  to,
  href,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-base font-bold rounded-xl gap-2.5 shadow-lg',
    xl: 'px-8 py-4 text-lg font-extrabold rounded-2xl gap-3 shadow-xl',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-varna-coral to-rose-500 text-white hover:from-rose-500 hover:to-varna-coral shadow-md hover:shadow-glow-coral border border-rose-400/30',
    secondary: 'bg-gradient-to-r from-emerald-600 to-varna-mint text-white hover:from-emerald-500 hover:to-mint-400 shadow-md hover:shadow-glow-emerald border border-emerald-400/30',
    solar: 'bg-gradient-to-r from-varna-sun to-amber-500 text-white hover:from-amber-500 hover:to-varna-sun shadow-md hover:shadow-glow-sun border border-amber-400/30',
    glass: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-lg border border-white/20 shadow-glass-sm hover:border-white/40',
    outline: 'bg-transparent text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/10 hover:border-emerald-400',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md',
  };

  const glowStyles = glow ? {
    primary: 'shadow-glow-coral',
    secondary: 'shadow-glow-emerald',
    solar: 'shadow-glow-sun',
    glass: 'shadow-glass-md',
    outline: '',
    ghost: '',
    danger: '',
  }[variant] : '';

  const buttonClasses = cn(
    'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed group relative overflow-hidden',
    sizeStyles[size],
    variantStyles[variant],
    glowStyles,
    fullWidth ? 'w-full' : '',
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        </>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};
