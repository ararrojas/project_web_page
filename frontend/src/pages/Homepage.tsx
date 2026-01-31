type Props = { onLogout: () => void };

export function Homepage({ onLogout }: Props) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Homepage</h1>
      <p>Home básica (después ponemos métricas y charts).</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}