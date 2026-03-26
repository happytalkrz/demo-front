import { InputHTMLAttributes } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle = ({
  label,
  description,
  size = 'md',
  className = '',
  checked,
  onChange,
  disabled,
  ...props
}: ToggleProps) => {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: checked ? 'translate-x-4' : 'translate-x-0.5',
    },
    md: {
      container: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0.5',
    },
    lg: {
      container: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: checked ? 'translate-x-7' : 'translate-x-0.5',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        <button
          type="button"
          className={`
            relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2
            ${currentSize.container}
            ${checked ? 'bg-blue-600' : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          role="switch"
          aria-checked={checked}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } } as any)}
          disabled={disabled}
        >
          <span
            className={`
              pointer-events-none inline-block rounded-full bg-white shadow transform ring-0
              transition duration-200 ease-in-out
              ${currentSize.thumb}
              ${currentSize.translate}
            `}
          />
        </button>

        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>

      {(label || description) && (
        <div className="ml-3">
          {label && (
            <label className={`block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
              {label}
            </label>
          )}
          {description && (
            <p className={`text-sm ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Toggle;