export default function Home() {
  return (
    <iframe
      src="/api/proxy"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
      }}
      title="UptimeRobot Status"
    />
  );
}
