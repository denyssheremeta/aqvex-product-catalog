interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return <div style={{ textAlign: "center" }}>{message}</div>;
};
