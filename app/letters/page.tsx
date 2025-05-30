import Image from 'next/image';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Letters",
  description: "Read the official letters related to DADYAMUN'25, including the message from the Secretary General.",
  keywords: [
    "DADYAMUN'25",
    "Letters",
    "Secretary General",
    "MUN conference",
    "Model United Nations",
    "Bodrum MUN"
  ],
  openGraph: {
    title: "Letters",
    description: "Read the official letters related to DADYAMUN'25.",
    url: "https://www.dadyamun.org/letters",
  },
  twitter: {
    title: "Letters",
    description: "Read the official letters related to DADYAMUN'25.",
    card: "summary_large_image",
  },
};

const Letters = () => {
  return (
    <>
      <div className=''>
        <h1 className='text-white text-center text-5xl max-sm:text-3xl max-sm:pt-6 pt-12'>Letter From The <br className='sm:hidden' /> <span className='text-[#172D7F] font-black'> Secretary General </span></h1>


        <p className='text-white mx-auto w-[1000px] max-sm:w-[350px] max-sm:text-sm text-2xl bg-black/60 relative rounded-4xl max-sm:rounded-2xl max-sm:px-8 max-sm:py-4 max-sm:my-6 px-16 py-8 my-12'>
          Hello dear attendants, <br /> <br />

          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure, but
          because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful. Nor again is there
          anyone who loves or pursues or desires to obtain pain of itself, because
          it is pain, but because occasionally circumstances occur in which toil
          and pain can procure him some great pleasure. To take a trivial example,
          which of us ever undertakes laborious physical exercise, except to obtain
          some advantage from it? But who has any right to find fault with a man
          who chooses to enjoy a pleasure that has no annoying consequences, or
          one who avoids a pain that produces no resultant pleasure?

          <Image
            src="/letter.svg"
            alt=''
            width={48}
            height={48}
            className='absolute top-8 right-10 max-sm:w-6 max-sm:h-6 max-sm:top-4 max-sm:right-5'
            unoptimized
            draggable={false}

          />
        </p>


      </div>
    </>
  );
};

export default Letters;