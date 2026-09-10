import cls from "./Loader.module.scss";

type LoaderSize = "sm" | "md" | "lg";
type LoaderVariant = "block" | "inline" | "overlay";

interface LoaderProps {
  label?: string;
  size?: LoaderSize;
  variant?: LoaderVariant;
  className?: string;
}

export function Loader({ label, size = "md", variant = "block", className = "" }: LoaderProps) {
  const spinner = <div className={`${cls.spinner} ${cls[size]}`} />;

  if (variant === "inline") {
    return <span className={`${cls.inline} ${className}`}>{spinner}</span>;
  }

  const wrapperClass = variant === "overlay" ? cls.overlay : cls.wrapper;
  return (
    <div className={`${wrapperClass} ${className}`}>
      {spinner}
      {label && <span className={cls.label}>{label}</span>}
    </div>
  );
}