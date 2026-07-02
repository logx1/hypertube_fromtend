import styles from "./PrimaryButton.module.css";

export interface PrimaryButtonProps {
  text?: string;
  padding?: string;
  onClick?: () => void;
  width?: string;
}

const PrimaryButton = ({
  text = "Click!",
  padding = "15px 100px",
  onClick,
  width = "100%",
}: PrimaryButtonProps) => {
  return (
    <button
      className={`${styles.primaryButton}`}
      style={{ padding: padding, width: width }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
