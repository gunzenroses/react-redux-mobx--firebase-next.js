import { FC } from "react";
import { IMaskInput, IMask } from "react-imask";

import styles from "./MaskInput.module.scss";

type Props = {
  from?: number;
  to?: number;
  onChange?: (value: string) => void;
  name?: string;
}

const MaskInput: FC<Props> = ({
  from = new Date().getFullYear() - 120,
  to = new Date().getFullYear(),
  onChange,
  name = ''
}) => {
  const handleInputAccept = (value: unknown): void => {
    if (onChange) onChange(String(value));
  }

  return (
    <IMaskInput
      className={styles.inputMask}
      mask={Date}
      blocks={{
        Y: {
          mask: IMask.MaskedRange,
          from,
          to,
        }
      }}
      placeholder='ДД.ММ.ГГГГ'
      onAccept={handleInputAccept}
      name={name}
    />
  );
}

export { MaskInput };
