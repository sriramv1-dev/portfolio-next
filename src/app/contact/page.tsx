'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './contact.module.css';

const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_API_KEY;
const serviceID       = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID      = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(serviceID!, templateID!, values, emailjsPublicKey).then(
      () => { setStatus('sent'); setValues({ name: '', email: '', subject: '', message: '' }); },
      () => { setStatus('error'); }
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <motion.div
          className={styles.left}
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.intro}>
            <h2>Let's connect</h2>
            <p>Open to new opportunities. Reach out directly or send a message.</p>
          </div>

          <a className={styles.quickLink} href="mailto:voonna.sriram@gmail.com">
            <div className={styles.linkIcon} style={{ background: 'hsl(var(--accent) / 0.12)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div>
              <p className={styles.linkLabel}>Email me</p>
              <p className={styles.linkSub}>voonna.sriram@gmail.com</p>
            </div>
          </a>

          <a className={styles.quickLink} href="https://linkedin.com/in/sriramvoonna/" target="_blank" rel="noreferrer">
            <div className={styles.linkIcon} style={{ background: 'hsl(var(--accent) / 0.12)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--accent))">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <div>
              <p className={styles.linkLabel}>LinkedIn</p>
              <p className={styles.linkSub}>linkedin.com/in/sriramvoonna</p>
            </div>
          </a>

          <a className={styles.quickLink} href="https://github.com/sriramv1-dev" target="_blank" rel="noreferrer">
            <div className={styles.linkIcon} style={{ background: 'hsl(var(--txt) / 0.06)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--txt))">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <div>
              <p className={styles.linkLabel}>GitHub</p>
              <p className={styles.linkSub}>github.com/sriramv1-dev</p>
            </div>
          </a>

          <a className={styles.quickLink} href="/Sriram_Voonna_Resume_.pdf" target="_blank" rel="noreferrer">
            <div className={styles.linkIcon} style={{ background: 'hsl(120 40% 40% / 0.12)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(120 40% 35%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div>
              <p className={styles.linkLabel}>Download resume</p>
              <p className={styles.linkSub}>PDF · Updated 2025</p>
            </div>
          </a>
        </motion.div>

        <motion.div
          className={styles.formCard}
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {status === 'sent' ? (
            <div className={styles.successMsg}>
              <p>Message sent! I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" value={values.name} onChange={onChange} required />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" name="email" placeholder="your@email.com" value={values.email} onChange={onChange} required />
                </div>
              </div>
              <div className={styles.field}>
                <label>Subject</label>
                <input type="text" name="subject" placeholder="What's this about?" value={values.subject} onChange={onChange} required />
              </div>
              <div className={styles.field}>
                <label>Message</label>
                <textarea name="message" placeholder="Tell me about the role or opportunity..." value={values.message} onChange={onChange} maxLength={500} required />
                <span className={styles.charCount}>{values.message.length} / 500</span>
              </div>
              {status === 'error' && <p className={styles.errorMsg}>Something went wrong — please try again.</p>}
              <button className={styles.submitBtn} type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
