const AppLoading = () => (
  <div className="space-y-4">
    <div className="h-8 w-40 animate-pulse rounded-sm bg-muted" />
    <div className="grid gap-4 sm:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-sm bg-muted" />
      ))}
    </div>
    <div className="h-64 w-full animate-pulse rounded-sm bg-muted" />
  </div>
);

export default AppLoading;
