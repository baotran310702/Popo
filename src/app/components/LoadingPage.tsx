interface LoadingPageProps {
  loadingProgress: number;
}

const GRID_SIZE = 25;

export default function LoadingPage({ loadingProgress }: LoadingPageProps) {
  const heartMatrix = [
    [0,0,1,1,0,0,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];

  // Create an array of all pixel positions and shuffle it
  const heartPixels = heartMatrix.flatMap((row, rowIndex) =>
    row.map((pixel, colIndex) => ({
      rowIndex,
      colIndex,
      pixel,
      random: Math.random(), // Add random value for shuffling
    }))
  )
  .filter(({ pixel }) => pixel === 1)
  .sort((a, b) => a.random - b.random);

  const pixelsToShow = Math.floor((loadingProgress / 100) * heartPixels.length);
  
  // Create a Set of visible pixel coordinates for O(1) lookup
  const visiblePixels = new Set(
    heartPixels
      .slice(0, pixelsToShow)
      .map(({ rowIndex, colIndex }) => `${rowIndex}-${colIndex}`)
  );
  
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="w-[500px] h-[500px] grid grid-cols-10 gap-1">
        {heartMatrix.map((row, rowIndex) => (
          row.map((pixel, colIndex) => {
            const isVisible = pixel === 1 && visiblePixels.has(`${rowIndex}-${colIndex}`);
            
            return pixel === 1 ? (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  aspect-square
                  transition-all
                  duration-150
                  ${isVisible ? 'bg-pink-500 scale-100' : 'bg-pink-100 scale-0'}
                  rounded-sm
                  transform
                `}
                style={{
                  animationDelay: `${Math.random() * 200}ms`,
                }}
              />
            ) : (
              <div key={`${rowIndex}-${colIndex}`} className="aspect-square" />
            );
          })
        ))}
      </div>
      <p className="text-pink-500 font-mono">
        Loading... {Math.round(loadingProgress)}%
      </p>
    </div>
  );
} 