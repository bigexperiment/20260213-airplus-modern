export default function Loading() {
  return (
    <div className="container-px py-8">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-muted" />
      <div className="aspect-[2/1] max-h-72 animate-pulse rounded-2xl bg-muted md:max-h-80" />
      <div className="mt-6 h-10 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-8 space-y-6">
        <div className="surface-card h-64 animate-pulse" />
        <div className="surface-card h-96 animate-pulse" />
      </div>
    </div>
  );
}
