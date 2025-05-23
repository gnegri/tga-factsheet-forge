
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: 'text' | 'number' | 'percentage';
  placeholder?: string;
  multiline?: boolean;
  readOnly?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  className,
  type = 'text',
  placeholder = 'Click to edit',
  multiline = false,
  readOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (type === 'percentage') {
      // Ensure percentage format
      const numValue = parseFloat(inputValue.replace('%', ''));
      if (!isNaN(numValue)) {
        onChange(`${numValue.toFixed(2)}%`);
      } else {
        setInputValue(value);
      }
    } else if (type === 'number') {
      // Ensure numeric format
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        onChange(numValue.toString());
      } else {
        setInputValue(value);
      }
    } else {
      onChange(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setInputValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing && !readOnly) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full p-2 border rounded editable',
            className
          )}
          rows={3}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={type === 'number' || type === 'percentage' ? 'number' : 'text'}
        value={type === 'percentage' ? inputValue.replace('%', '') : inputValue}
        onChange={(e) => setInputValue(
          type === 'percentage' ? `${e.target.value}%` : e.target.value
        )}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full p-2 border rounded editable',
          className
        )}
        step={type === 'percentage' ? '0.01' : type === 'number' ? '0.01' : undefined}
      />
    );
  }

  return (
    <div
      onClick={readOnly ? undefined : () => setIsEditing(true)}
      className={cn(
        'min-h-[1.5rem]',
        !readOnly && 'editable',
        className
      )}
    >
      {value || placeholder}
    </div>
  );
};

export default EditableField;
