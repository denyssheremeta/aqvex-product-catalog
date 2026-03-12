interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return <div style={{ textAlign: "center" }}>{message}</div>;
};
