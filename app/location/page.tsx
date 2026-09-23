import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import PageIntro from '@/components/PageIntro';
import EnquiryForm from '@/components/EnquiryForm';
import { site } from '@/lib/config';

const details = [
  [MapPin, 'Location', site.location],
  [Phone, 'Phone', `${site.phone} · international format TBD`],
  [Mail, 'Email', site.email],
  [Clock3, 'Restaurant hours', '8:00 AM – 10:00 PM daily'],
] as const;

export default function Location() {
  return (
    <>
      <PageIntro
        eyebrow="Location and contact"
        title="Find us in Sauraha."
        description="Close to the Rapti River, sunset viewpoints and the wildlife landscape around Chitwan National Park."
      />

      <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-sm font-medium text-[#a75536]">A quiet base for days outside</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-forest-950 sm:text-5xl">
              About ten minutes from the Rapti River on foot.
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-600">
              Tiffin Home &amp; Restaurant is in Sauraha, Chitwan, Nepal, with convenient access to the national park and surrounding wildlife area. The exact GPS pin is still to be confirmed.
            </p>

            <div className="mt-10 border-y border-stone-300">
              {details.map(([Icon, label, value]) => (
                <div key={label} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-stone-200 py-5 last:border-b-0">
                  <Icon size={19} className="mt-1 text-[#a75536]" />
                  <div>
                    <p className="text-xs font-semibold text-stone-500">{label}</p>
                    {label === 'Email' ? (
                      <a href={`mailto:${value}`} className="mt-1 block break-all text-base font-medium text-forest-800 hover:text-forest-600">
                        {value}
                      </a>
                    ) : label === 'Phone' ? (
                      <a href={`tel:${site.phone}`} className="mt-1 block text-base font-medium text-forest-800 hover:text-forest-600">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base font-medium leading-7 text-stone-800">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href={`mailto:${site.email}`} className="link-action mt-7 text-sm font-semibold text-forest-800 hover:text-forest-600">
              Prefer email? Write to us directly <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem_5rem_1.5rem_1.5rem] border border-stone-300 bg-white p-6 sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[5rem] bg-[#efe6d7]" aria-hidden="true" />
            <div className="relative">
              <p className="text-sm font-medium text-[#a75536]">Send a message</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-forest-950 sm:text-4xl">
                Ask about a room, a group stay or getting here.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500">
                Share what you need and how we should reach you. We’ll reply personally.
              </p>
              <div className="mt-10 border-t border-stone-200 pt-9">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
