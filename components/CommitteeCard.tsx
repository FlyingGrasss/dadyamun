import Image from "next/image"

const Card = ({ imageUrl, committeeName }: { imageUrl: string, committeeName: string }) => {
  return (
    <div className="relative group w-[170px] sm:w-[340px] rounded-3xl overflow-hidden">
      {/* Image with optimized loading */}
      <Image 
        src={`${imageUrl}?auto=format`} // Sanity image optimization
        alt={committeeName}
        width={340}  // Desktop size (2x for retina)
        height={453} // Desktop size
        sizes="(max-width: 639px) 170px, 340px" // Exact pixel control
        className="object-cover rounded-3xl transition-transform"
      />
            
    </div>
  )
}

export default Card