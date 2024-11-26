import { SiteConfig } from 'src/app/types';
import { cn } from 's/lib/utils';
import { buttonVariants } from 's/components/ui/button';
import Link from 'next/link';
import { siteConfig } from 'src/utils/siteConfig';
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "s/components/ui/carousel";
import { Card, CardContent } from 's/components/ui/card';

//TODO: add the API method in order to get the statistics of overall biodiversity impact scores
async function getOverAllScores() {
  return "";
}

const cardContents = [
  "INVESTORS",
  "Banks"
];

export default async function HomePage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 flex justify-center items-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative">
          <div className="relative z-10 bg-gray-200 rounded-md p-4 center">
            <Link href={siteConfig.links.github} className='bold'>
              checkout the project code on Github
            </Link>
          </div>
          <h1 className="relative z-10 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
            An marketplace for impact investing for clients in vetted projects.
          </h1>
        </div>
      </section>
      <section className='container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 w-full lg:py-24 flex justify-center items-center'>
        <div className='container w-full flex flex-col items-center'>
          <h1 className='text-center font-heading text-2xl'>Features</h1>
              <Carousel>
                <CarouselContent>
                  {cardContents.map((content, index) => (
                    <CarouselItem key={index}>
                      <div className="p-4">
                            <span className="text-4xl font-semibold">{content}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
              </Carousel>
        </div>
      </section>
    </>
  );
}
