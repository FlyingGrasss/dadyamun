import Image from "next/image"

const Card = ({ imageUrl, secretariatName }: { imageUrl: string, secretariatName: string }) => {
  return (
    <div className="relative group w-[170px] sm:w-[340px] rounded-3xl overflow-hidden">
      {/* Image with optimized loading */}
      <Image 
        src={`${imageUrl}?auto=format`} // Sanity image optimization
        alt={secretariatName}
        width={340}  // Desktop size (2x for retina)
        height={453} // Desktop size
        sizes="(max-width: 639px) 170px, 340px" // Exact pixel control
        className="object-cover rounded-3xl  border-4 border-[#172D7F] max-sm:border-2 transition-transform"
      />

      <div className="absolute inset-0 flex items-end p-4">
        <h1 className="text-white text-shadow-lg text-2xl max-sm:text-base font-medium w-full text-center">
          {secretariatName}
        </h1>
      </div>

    </div>
  )
}

export default Card