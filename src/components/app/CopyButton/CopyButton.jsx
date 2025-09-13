import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { concat } from '@/utils/styles';

const CopyButton = ({ value, onClick, className, feedbackDuration = 1500 }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onClick?.();
      setTimeout(() => setCopied(false), feedbackDuration);
    } catch {
      console.error('Copy failed');
    }
  };

  return (
    <button
      className={concat('app-button', className)}
      onClick={handleClick}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      aria-live="polite"
    >
      {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
      <span className="ml-1">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
};

export default CopyButton;
