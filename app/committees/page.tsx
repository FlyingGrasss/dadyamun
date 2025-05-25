export const revalidate = 60; // Revalidate every 60 seconds

import HomeLayout from "@/app/HomeLayout";
import CommitteeCard from "@/components/CommitteeCard";
import { COMMITTEES_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { CommitteeType } from "@/types";

const Committees = async () => {
  const allCommittees = await client.fetch(COMMITTEES_QUERY);


  // Sort Committees by their ID in ascending order
  const sortedCommittees = [...allCommittees].sort((a, b) => (a.id || Infinity) - (b.id || Infinity));



  return (
    <HomeLayout>
      <div className="mx-auto pb-20 max-sm:pb-12">
        <h1 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center text-[#172D7F] font-bold">Committees</h1>

        {/* Combined responsive grid */}
        <div className="grid place-items-center w-full grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-16 px-4 sm:px-0 mt-12 sm:mt-16">
          {sortedCommittees.map((committee: CommitteeType, index) => (
            <a 
              className="w-fit hover:scale-105 transition-transform duration-500" 
              href={`${committee.link || "/"}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={index} // Better to use committee.id instead of index || Nope, not better, stupid ass clients enter the same ids lmao
            >
              <CommitteeCard 
                imageUrl={committee.imageUrl}
                committeeName={committee.name}
              />
            </a>
          ))}
        </div>
      </div>
    </HomeLayout>
  )
}

export default Committees