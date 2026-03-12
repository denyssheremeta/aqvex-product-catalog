interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return <div style={{ padding: "48px 16px", textAlign: "center" }}>{message}</div>;
};
