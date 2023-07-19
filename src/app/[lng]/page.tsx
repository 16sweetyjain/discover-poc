import { View } from '@/libs/spectrum';
import { Metadata } from 'next';

import { TFunction } from 'i18next';
import { useTranslation } from '../i18n'; // TODO use alias

export const metadata: Metadata = {
  title: 'Photoshop Express Discover',
};

export default async function Page({ params: { lng } }) {
  const { t }: { t: TFunction } = await useTranslation(lng);

  return (
    <>
      <h1>{t('get_inspired')}</h1>
    </>
  );
}
