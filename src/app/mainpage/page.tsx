import { SiteConfig } from 'src/app/types';
import { cn } from 's/lib/utils';
import { buttonVariants } from 's/components/ui/button';
import Link from 'next/link';
import { siteConfig } from 'src/utils/siteConfig';

//TODO: add the API method in order to get the statistics of overall biodiversity impact scores
async function getOverAllScores() {}

export default async function HomePage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link href={siteConfig.links.github}>
            Follow progress of the project on github
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An marketplace for impact investing for clients in vetted projects.
          </h1>
          <div className="space-x-4">
            <Link
              href="/login_admin"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Login as Admin
            </Link>
            <Link
              href="/login_user"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Login as investor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
