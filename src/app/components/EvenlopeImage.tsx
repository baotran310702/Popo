import Image from "next/image";

export default function EvenlopeImage() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="animate-float">
        <Image
          src="/content_images/evenlope.jpeg"
          width={480}
          height={320}
          alt="Pixel art letter"
          className="[image-rendering:pixelated] mix-blend-multiply"
          style={{
            backgroundColor: 'transparent',
            objectFit: 'contain',
            color:'white'
          }}
        />
      </div>
      <span className="absolute text-8xl text-red-500 ml-4 mt-20 animate-pulse-float">
        ❤️
      </span>
    </div>
  );
} 