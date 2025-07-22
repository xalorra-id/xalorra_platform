import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento-card';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Gradient } from '@/components/gradient';
import { Link } from '@/components/link';
import { LogoCloud } from '@/components/logo-cloud';
import { Navbar } from '@/components/navbar';
import { Screenshot } from '@/components/screenshot';
import { Testimonials } from '@/components/testimonials';
import { Heading, Subheading } from '@/components/text';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

import { Keyboard } from '@/components/keyboard';
import { LogoCluster } from '@/components/logo-cluster';
import { Map } from '@/components/map';
import { LogoTimeline } from '@/components/logo-timeline';
import { LinkedAvatars } from '@/components/linked-avatars';

type Props = {
  params: { locale: string };
};

// Fungsi untuk render graphic bento
function getBentoGraphic(index: number) {
  switch (index) {
    case 0:
      return <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />;
    case 1:
      return <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />;
    case 2:
      return <div className="flex size-full pl-10 pt-10"><Keyboard highlighted={["LeftCommand", "LeftShift", "D"]} /></div>;
    case 3:
      return <LogoCluster />;
    case 4:
      return <Map />;
    default:
      return null;
  }
}

// Fungsi untuk render graphic dark
function getDarkGraphic(index: number) {
  switch (index) {
    case 0:
      return <div className="h-80 bg-[url(/screenshots/networking.png)] bg-[size:851px_344px] bg-no-repeat" />;
    case 1:
      return <LogoTimeline />;
    case 2:
      return <LinkedAvatars />;
    case 3:
      return <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-[size:851px_344px] bg-no-repeat" />;
    default:
      return null;
  }
}

export default async function Home({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const bentoCards = t.raw('bento.cards') as Array<{ title: string; description: string; eyebrow: string }>;
  const darkCards = t.raw('dark.cards') as Array<{ title: string; description: string; eyebrow: string }>;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
        <Container className="relative">
          <Navbar
            banner={
              <Link
                href="/whitepaper"
                className="flex items-center gap-1 rounded-full bg-sky-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-sky-950/30"
              >
                {t('hero.banner')} <ChevronRightIcon className="size-4" />
              </Link>
            }
          />
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              {t('hero.title')}
            </h1>
            <p className="mt-8 max-w-xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              {t('hero.description')}
            </p>
            <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
              <Button href="https://studio.xalorra.com">{t('hero.cta1')}</Button>
              <Button variant="secondary" href="https://collab.xalorra.com">
                {t('hero.cta2')}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <main>
        {/* Logo Cloud */}
        <Container className="mt-10">
          <LogoCloud />
        </Container>

        {/* Features */}
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <Container className="pb-24">
            <Heading as="h2" className="max-w-3xl">
              {t('features.title')}
            </Heading>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">{t('features.subtitle')}</p>
            <Screenshot
              width={1216}
              height={768}
              src="/screenshots/app.png"
              className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
            />
          </Container>

          {/* Bento Section */}
          <Container>
            <Subheading>{t('bento.sectionTitle')}</Subheading>
            <Heading as="h3" className="mt-2 max-w-3xl">
              {t('bento.sectionSubtitle')}
            </Heading>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              {bentoCards.map((card, i) => (
                <BentoCard
                  key={i}
                  eyebrow={card.eyebrow}
                  title={card.title}
                  description={card.description}
                  graphic={getBentoGraphic(i)}
                  className={
                    i === 0 ? 'max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl' :
                    i === 1 ? 'lg:col-span-3 lg:rounded-tr-4xl' :
                    i === 2 ? 'lg:col-span-2 lg:rounded-bl-4xl' :
                    i === 3 ? 'lg:col-span-2' :
                    i === 4 ? 'max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl' : ''
                  }
                />
              ))}
            </div>
          </Container>
        </div>

        {/* Dark Section */}
        <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
          <Container>
            <Subheading dark>{t('dark.sectionTitle')}</Subheading>
            <Heading as="h3" dark className="mt-2 max-w-3xl">
              {t('dark.sectionSubtitle')}
            </Heading>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              {darkCards.map((card, i) => (
                <BentoCard
                  key={i}
                  eyebrow={card.eyebrow}
                  title={card.title}
                  description={card.description}
                  graphic={getDarkGraphic(i)}
                  dark
                  className={
                    i === 0 ? 'max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl' :
                    i === 1 ? 'z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl' :
                    i === 2 ? 'lg:col-span-2 lg:rounded-bl-4xl' :
                    i === 3 ? 'max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl' : ''
                  }
                />
              ))}
            </div>
          </Container>
        </div>

        {/* CTA */}
        <Container className="text-center py-32">
          <Heading as="h2">{t('cta.title')}</Heading>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700">
            {t('cta.description')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
            <Button href="/gitlab">{t('cta.button1')}</Button>
            <Button variant="secondary" href="https://aura.xalorra.com">
              {t('cta.button2')}
            </Button>
          </div>
        </Container>
      </main>

      <Testimonials />
      <Footer />
    </div>
  );
}
