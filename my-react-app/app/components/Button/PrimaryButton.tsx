import styles from "./PrimaryButton.module.css";

export interface PrimaryButtonProps {
  text?: string;
  padding?: string;
  onClick?: any;
}

const PrimaryButton = ({
  text = "Click!",
  padding = "15px 100px",
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      className={`${styles.primaryButton}`}
      style={{ padding: padding }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
