import Image from 'next/image';

export default function TabLeft() {
  const delayClasses = [
    'animation-delay-0',
    'animation-delay-500',
    'animation-delay-1000',
    'animation-delay-1500',
  ];

  return (
    <div className="tab-page left h-[900px] w-[400px] p-6 shadow-lg relative" style={{ backgroundColor: '#fdf8e4' }}>      
      {/* Top corner images */}
      <div className="flex justify-between mb-32">
        <div className={`animate-gentle-rotate ${delayClasses[0]} hover:pause-animation pt-8 w-32`}>
          <Image 
            src="/content_images/book.jpeg"
            alt="Random content image 1"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>
        <div className={`animate-gentle-rotate ${delayClasses[1]} hover:pause-animation pt-8 w-32`}>
          <Image 
            src="/content_images/capybara.jpeg"
            alt="Random content image 2"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Chat notes */}
      <div className="flex flex-col gap-4 px-8 mb-32">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-[70%] self-start transform -rotate-2">
          <p className="text-gray-800 text-sm">Này! Hong được tiêu cực hoài nữa coá được hom? 🌟</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md max-w-[70%] self-end transform rotate-2">
          <p className="text-gray-800 text-sm">Ún nhiều tà tữa là hong tốttt! 💻</p>
        </div>
      </div>

      {/* Bottom corner images */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="flex justify-between">
          <div className={`animate-gentle-rotate ${delayClasses[2]} hover:pause-animation pt-8 w-32`}>
            <Image 
              src="/content_images/evenlope.jpeg"
              alt="Random content image 3"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
          <div className={`animate-gentle-rotate ${delayClasses[3]} hover:pause-animation pt-8 w-32`}>
            <Image 
              src="/content_images/message.jpeg"
              alt="Random content image 4"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 