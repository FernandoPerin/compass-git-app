import React from 'react';

// Importação CSS
import styles from './Input.module.css';

const Input = ({ id, label, setValue, ...props }) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <br />
      <input
        className={styles.inputText}
        id={id}
        name={id}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />
    </>
  );
};

export default Input;
