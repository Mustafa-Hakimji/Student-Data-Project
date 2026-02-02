export const ButtonTypes = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  info: "info",
  warning: "warning",
} as const;

export type ButtonTypes = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export interface OptionButtonProps {
  onClick: () => void;
  title: string;
  buttonType?: ButtonTypes;
}
