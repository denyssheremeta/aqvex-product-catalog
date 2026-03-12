interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return <div style={{ padding: "48px 16px", textAlign: "center" }}>{message}</div>;
};
