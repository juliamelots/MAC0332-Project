import {useState} from 'react';

import './Checkbox.css';

interface CheckboxProps {
  label: string;
  value?: unknown;
  onChange?: (isChecked: boolean, value: unknown, ...args: unknown[]) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const onCheckChanged = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    if (props.onChange) {
      props.onChange(newIsChecked, props.value ?? props.label);
    }
  };

  return (
    <label id="checkbox-container">
      <input type="checkbox" checked={isChecked} onChange={onCheckChanged} />
      <span id="checkbox-text">{props.label}</span>
    </label>
  );
}

export default Checkbox;