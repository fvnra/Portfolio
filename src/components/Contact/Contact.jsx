import { useState } from 'react';

const socials = [
  {
    label: 'Email',
    value: 'favianrizqi3@gmail.com',
    href: 'mailto:favianrizqi3@gmail.com',
  },
  {
    label: 'Whatsapp',
    value: '+62 838-5255-1726',
    href: 'https://wa.me/6283852551726',
  },
  { label: 'GitHub', value: 'fvnra', href: 'https://github.com/fvnra' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');

    const whatsappMessage = [`Halo Favian, saya ${form.name}.`, `Email: ${form.email}`, '', form.message].join('\n');
    const whatsappUrl = `https://wa.me/6283852551726?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-section px-4 md:px-6 max-w-container mx-auto border-t border-border">
      <div className="flex items-center gap-4 mb-10 md:mb-16">
        <span className="font-mono text-label text-ink-3 uppercase tracking-widest">05</span>
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-label text-ink-3 uppercase tracking-widest">Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <h2 className="font-grotesk text-title text-ink">
            Let's build
            <br />
            something great.
          </h2>

          <p className="text-ink-2 text-sm leading-relaxed max-w-sm">Saya terbuka untuk full-time, freelance, atau sekadar ngobrol soal ide menarik. Respons biasanya dalam 24 jam.</p>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-2 w-fit bg-paper-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-label text-ink-2 uppercase tracking-widest">Available for projects</span>
          </div>

          {/* Contact links */}
          <div className="space-y-0 divide-y divide-border">
            {socials.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex flex-wrap items-center justify-between gap-2 py-4
                  group hover:bg-paper-2 -mx-4 px-4 rounded-xl transition-colors duration-150"
              >
                <span className="font-mono text-label text-ink-3 uppercase tracking-widest">{c.label}</span>
                <span className="min-w-0 break-words text-right text-sm text-ink-2 group-hover:text-ink transition-colors flex items-center gap-1">
                  {c.value}
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_outward</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7">
          {status === 'sent' ? (
            <div className="flex flex-col items-start justify-center gap-5 py-12">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-xl text-ink">Sent.</h3>
                <p className="text-ink-2 mt-1 text-sm">I'll get back to you soon.</p>
              </div>
              <button
                onClick={() => setStatus(null)}
                className="font-mono text-label text-ink-3 hover:text-ink uppercase tracking-widest
                  underline underline-offset-4 transition-colors"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  { id: 'name', label: 'Name', type: 'text', ph: 'Your name' },
                  {
                    id: 'email',
                    label: 'Email',
                    type: 'email',
                    ph: 'your@email.com',
                  },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="font-mono text-label text-ink-3 uppercase tracking-widest flex items-center justify-between">
                      {f.label}
                      {errors[f.id] && <span className="text-red-400 normal-case tracking-normal">{errors[f.id]}</span>}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.id]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      className={`w-full px-0 py-3 bg-transparent text-ink text-sm
                        border-b outline-none transition-colors duration-150
                        placeholder:text-ink-3 focus:border-ink
                        ${errors[f.id] ? 'border-red-300' : 'border-border'}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-label text-ink-3 uppercase tracking-widest flex items-center justify-between">
                  Message
                  {errors.message && <span className="text-red-400 normal-case tracking-normal">{errors.message}</span>}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-0 py-3 bg-transparent text-ink text-sm
                    border-b outline-none resize-none transition-colors duration-150
                    placeholder:text-ink-3 focus:border-ink
                    ${errors.message ? 'border-red-300' : 'border-border'}`}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <span className="font-mono text-label text-ink-3">Response within 24h</span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-ink text-paper rounded-lg
                    hover:bg-ink/80 transition-all duration-150 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-3.5 h-3.5 border border-paper/40 border-t-paper rounded-full animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
