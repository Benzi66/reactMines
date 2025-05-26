// NumberInput.tsx
import React from 'react'; // No need for useState, useCallback, useEffect if only directly passing props

interface NumberInputProps {
  label?: string;
  value: number; // The number displayed in the input
  onChange: (newValue: number) => void; // Function to call when the value changes
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  id?: string;
  className?: string;
  wrapperClassName?: string;
}

const NumberInput = ({
  label,
  value, // <--- Value comes directly from parent prop
  onChange, // <--- Function provided by parent
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  id,
  className,
  wrapperClassName,
}: NumberInputProps) => {

  // Generates a unique ID for accessibility if not provided
  const inputId = id || `num-input-${label ? label.replace(/\s/g, '-') : Math.random().toString(36).substring(2, 9)}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    let parsedValue = Number(rawValue);

    // If input is empty, consider it as `min` for sending to parent.
    // Or you could send `0` or `null` if your parent state can handle it.
    // This example uses `min` to ensure a valid number is always passed.
    if (rawValue === '') {
      parsedValue = min;
    }

    // Ensure the parsedValue is within min/max bounds before sending to parent
    if (parsedValue < min) {
        parsedValue = min;
    }
    if (parsedValue > max) {
        parsedValue = max;
    }

    // THE CRITICAL STEP: Call the onChange function provided by the parent
    // This sends the updated and validated number back up to the parent component.
    onChange(parsedValue);
  };

  return (
    <div className = "number-input-container">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        type="number"
        // Display value directly from prop. If value is NaN (e.g., from an invalid initial prop), display empty string.
        value={isNaN(value) ? '' : value}
        onChange={handleChange} // Attach our handler
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={className}
      />
    </div>
  );
};

export default NumberInput;