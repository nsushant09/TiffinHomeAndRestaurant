import { ArrowDownRight } from 'lucide-react';
import PageIntro from '@/components/PageIntro';
import EnquiryForm from '@/components/EnquiryForm';
import AssetImage from '@/components/AssetImage';

const groups = [
  {
    title: 'Into the jungle',
    description: 'Jeep safaris, jungle walks and wildlife experiences around Chitwan National Park.',
    items: ['Chitwan National Park jungle safari', 'Jeep safari', 'Jungle walk', 'Wildlife experiences'],
    image: '/images/experiences/jungle-safari.jpg',
    alt: 'A jeep safari moving through the forest in Chitwan',
    shape: 'rounded-[1.5rem_6rem_1.5rem_1.5rem]',
  },
  {
    title: 'Along the river',
    description: 'Canoeing, bird watching and time beside the Rapti River at sunset.',
    items: ['Canoeing', 'Bird watching', 'Rapti River and sunset activities'],
    image: '/images/experiences/rapti-canoe.jpg',
    alt: 'A wooden canoe crossing the Rapti River at sunset',
    shape: 'rounded-[6rem_1.5rem_1.5rem_1.5rem]',
  },
  {
    title: 'Local life',
    description: 'Village tours, Tharu cultural experiences and nature sightseeing around Sauraha.',
    items: ['Tharu cultural experiences', 'Village and cultural tours', 'Nature and sightseeing around Sauraha'],
    image: '/images/experiences/tharu-village.jpg',
    alt: 'Traditional homes and a quiet courtyard in a Tharu village',
    shape: 'rounded-[1.5rem_1.5rem_6rem_1.5rem]',
  },
];

export default function Tours() {
  return (
    <>
      <PageIntro
        eyebrow="Tours and activities"
        title="Let Sauraha set the pace."
        description="Days here can begin in the jungle, drift along the river and end with the sunset. Tell us what interests you and we’ll help with the next step."
      />

      <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-8 border-b border-stone-300 pb-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <h2 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-forest-950 sm:text-5xl">
            Choose a direction, not an itinerary.
          </h2>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-8 text-stone-600">
              Activities are arranged by enquiry rather than booked or paid online. What is available can depend on the day and season.
            </p>
            <a href="#experience-enquiry" className="link-action mt-5 text-sm font-semibold text-forest-800 hover:text-forest-600">
              Tell us what interests you <ArrowDownRight size={17} />
            </a>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {groups.map((group, index) => (
            <article key={group.title} className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className={`overflow-hidden bg-stone-200 lg:col-span-7 ${index % 2 ? 'lg:order-2' : ''} ${group.shape}`}>
                <div className="aspect-[16/10]">
                  <AssetImage src={group.image} alt={group.alt} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className={`${index % 2 ? 'lg:order-1 lg:col-start-2' : 'lg:col-start-9'} lg:col-span-4`}>
                <p className="text-sm font-medium text-[#a75536]">{index === 0 ? 'Forest' : index === 1 ? 'River' : 'Community'}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-forest-950 sm:text-4xl">{group.title}</h3>
                <p className="mt-5 text-base leading-8 text-stone-600">{group.description}</p>
                <div className="mt-7 border-y border-stone-300 py-2">
                  {group.items.map((item) => (
                    <p key={item} className="border-b border-stone-200 py-3 text-sm font-medium text-stone-700 last:border-b-0">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience-enquiry" className="scroll-mt-24 bg-[#efe6d7]">
        <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-28">
          <div>
            <p className="text-sm font-medium text-[#a75536]">Make an enquiry</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-forest-950 sm:text-5xl">What would you like to experience?</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-stone-600">
              Share your dates and interests. We’ll reply with the available options. No payment is collected through this form.
            </p>
          </div>
          <div className="rounded-[1.5rem_4rem_1.5rem_1.5rem] border border-stone-300/80 bg-white p-6 sm:p-9 lg:p-12">
            <EnquiryForm type="tour" />
          </div>
        </div>
      </section>
    </>
  );
}
