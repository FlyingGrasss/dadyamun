import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>


        <h1 className="text-white text-8xl leading-none tracking-wide font-bold mt-14 text-center min-[1500px]:text-[110px] min-[1500px]:mt-16 min-[1800px]:text-9xl min-[1800px]:mt-18 max-sm:hidden">DADYAMUN'25</h1>
        <div className="sm:hidden flex justify-center items-center mt-4">
          <h1 className="text-white text-[84px] leading-none tracking-wide font-bold text-right sm:hidden">
            DADYA <br />
            MUN <br />
            '25
          </h1>
        </div>


        <Image
          src={"/dadyamunLogoWhite.png"}
          alt="DADYAMUN'25 Logo"
          width={250}
          height={250}
          className="mx-auto my-7 mt-3 max-sm:my-1 max-sm:-mt-4 max-sm:w-[300px] min-[1500px]:w-[325px] min-[1800px]:w-[450px] h-auto" 
          priority
          quality={100}
        />
        <div className="flex justify-center mb-4 min-[1800px]:mb-12 min-[1500px]:mb-7">
          <Link href="/apply" className="w-fit">
            <button className="group max-sm:text-base text-xl min-[1800px]:text-2xl  hover:text-[#172D7F] cursor-pointer items-center transition-colors justify-center gap-4 min-[1800px]:gap-6 max-sm:gap-2 inline-flex bg-[#ffffff] text-[#0c0c0c] rounded-full min-[1800px]:px-10 px-8 max-sm:px-6 min-[1800px]:py-5 max-sm:py-3 py-4">
              Apply Now 
              <Image 
                src="/arrow.svg" 
                width={20} 
                height={16} 
                alt=""
                className="transition-transform duration-400 max-sm:w-[15px] min-[1800px]:w-[24px] h-auto group-hover:translate-x-2"
              />
              
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}