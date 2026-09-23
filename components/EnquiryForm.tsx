'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, ShieldCheck } from 'lucide-react';

const fieldClass =
  'w-full !rounded-none !border-x-0 !border-t-0 !border-stone-300 !bg-transparent !px-0 !py-3 text-[15px] !shadow-none focus:!border-forest-700 focus:!ring-0';

export default function EnquiryForm({ type = 'general' }: { type?: 'tour' | 'general' }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const reduced = useReducedMotion();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    const form = new FormData(event.currentTarget);
    const start = String(form.get('preferredStart') || '');
    const end = String(form.get('preferredEnd') || '');
    const activity = String(form.get('activityInterest') || '');
    const phone = String(form.get('phone') || '');
    const payload = {
      type,
      fullName: form.get('fullName'),
      email: form.get('email'),
      phone: phone || undefined,
      message: form.get('message'),
      activityInterest: activity || undefined,
      preferredDates: start && end ? { start, end } : undefined,
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setState(response.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === 'success' ? (
        <motion.div
          key="success"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid min-h-[420px] place-items-center text-center"
          aria-live="polite"
        >
          <div>
            <motion.span
              initial={reduced ? false : { scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-800"
            >
              <Check size={30} />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em] text-forest-950">Thanks for getting in touch.</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-stone-500">
              Your message has reached Tiffin Home. We’ll get back to you as soon as we can.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          onSubmit={submit}
          className="grid gap-7"
        >
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor={`${type}-fullName`} className="!mb-0 text-xs font-semibold text-stone-500">
                Your name
              </label>
              <input className={fieldClass} id={`${type}-fullName`} name="fullName" autoComplete="name" placeholder="Full name" required />
            </div>
            <div>
              <label htmlFor={`${type}-email`} className="!mb-0 text-xs font-semibold text-stone-500">
                Email address
              </label>
              <input className={fieldClass} id={`${type}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </div>
          </div>

          <div>
            <label htmlFor={`${type}-phone`} className="!mb-0 text-xs font-semibold text-stone-500">
              Phone or WhatsApp <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <input className={fieldClass} id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Include your country code" />
          </div>

          {type === 'tour' && (
            <>
              <div>
                <label htmlFor="activityInterest" className="!mb-0 text-xs font-semibold text-stone-500">
                  What interests you?
                </label>
                <select className={fieldClass} id="activityInterest" name="activityInterest" defaultValue="">
                  <option value="" disabled>Select an experience</option>
                  <option>Jeep or jungle safari</option>
                  <option>Canoeing and bird watching</option>
                  <option>Tharu village and cultural tour</option>
                  <option>Rapti River sunset</option>
                  <option>Something else</option>
                </select>
              </div>
              <fieldset>
                <legend className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                  <CalendarDays size={15} className="text-[#a75536]" /> Preferred dates <span className="font-normal text-stone-400">(optional)</span>
                </legend>
                <div className="mt-2 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="preferredStart" className="sr-only">Preferred start date</label>
                    <input className={fieldClass} id="preferredStart" name="preferredStart" type="date" />
                  </div>
                  <div>
                    <label htmlFor="preferredEnd" className="sr-only">Preferred end date</label>
                    <input className={fieldClass} id="preferredEnd" name="preferredEnd" type="date" />
                  </div>
                </div>
              </fieldset>
            </>
          )}

          <div>
            <label htmlFor={`${type}-message`} className="!mb-2 text-xs font-semibold text-stone-500">
              Tell us a little more
            </label>
            <textarea
              className="w-full resize-none !rounded-[1.25rem] !border-stone-200 !bg-[#fbf8f1] !px-4 !py-4 text-[15px] leading-7 focus:!border-forest-600 focus:!ring-4 focus:!ring-forest-600/10"
              id={`${type}-message`}
              name="message"
              rows={5}
              placeholder={type === 'tour' ? 'Who is travelling, and what kind of day are you hoping for?' : 'How can we help with your visit?'}
              required
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex max-w-xs items-start gap-2 text-xs leading-5 text-stone-500">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-forest-700" />
              This is an enquiry only. No payment is collected here.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={state === 'sending'}
              className="btn-primary shrink-0"
              type="submit"
            >
              {state === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowRight size={17} />
            </motion.button>
          </div>

          {state === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-live="polite"
              className="border-l-2 border-[#bd7c52] bg-[#fbf4ea] p-3 text-sm text-stone-700"
            >
              The form is not connected yet. Please email or call us.
            </motion.p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
