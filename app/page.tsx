import Image from "next/image";
import Link from "next/link";
import HomeLayout from "@/app/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <div>


        <h1 className="text-white text-8xl leading-none tracking-wide font-bold mt-14 text-center max-sm:hidden">DADYAMUN'25</h1>
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
          className="mx-auto my-7 mt-3 max-sm:my-5 max-sm:w-[300px] h-auto" 
          priority
          quality={100}
        />
        <div className="flex justify-center">
          <Link href="/apply" className="w-fit">
            <button className="group max-sm:text-base text-xl hover:text-[#172D7F] cursor-pointer items-center transition-colors justify-center gap-4 max-sm:gap-2 inline-flex bg-[#ffffff] text-[#0c0c0c] rounded-full px-8 max-sm:px-6 max-sm:py-3 py-4">
              Apply Now 
              <Image 
                src="/arrow.svg" 
                width={20} 
                height={16} 
                alt=""
                className="transition-transform duration-400 max-sm:w-[15px] h-auto group-hover:translate-x-2"
              />
              
            </button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}