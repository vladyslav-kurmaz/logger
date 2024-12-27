import { atom } from 'jotai';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  preferences: string[];
}

export const contactFormAtom = atom<ContactFormData>({
  name: '',
  email: '',
  message: '',
});

export const newsletterFormAtom = atom<NewsletterFormData>({
  email: '',
  preferences: [],
});