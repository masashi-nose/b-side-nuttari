import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { InfoTable } from "@/components/InfoTable";
import { KubunTag } from "@/components/KubunTag";
import { GenreTag } from "@/components/GenreTag";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotCard } from "@/components/SpotCard";
import { VerifiedNote } from "@/components/VerifiedNote";
import {
  InstagramIcon,
  SnsIconButton,
  WebsiteIcon,
} from "@/components/SnsIconButton";
import { ClosedNotice } from "@/components/spot/ClosedNotice";
import { SpotGallery } from "@/components/spot/SpotGallery";
import { StatusDot } from "@/components/StatusDot";
import { client } from "@/sanity/lib/client";
import {
  nearbySpotsQuery,
  spotBySlugQuery,
  spotSlugsQuery,
} from "@/sanity/lib/queries";
import { formatDate, instagramUrl, knownGenres, mapAppUrl } from "@/lib/spot";

export async function generateStaticParams() {
  const slugs = await client.fetch(spotSlugsQuery);
  return slugs
    .map(({ slug }) => slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

async function getSpot(slug: string) {
  return client.fetch(spotBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: PageProps<"/spots/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const spot = await getSpot(slug);
  if (!spot) return {};
  return {
    title: spot.seo?.title ?? spot.name ?? undefined,
    description: spot.seo?.description ?? spot.summary ?? undefined,
  };
}

export default async function SpotDetailPage({
  params,
}: PageProps<"/spots/[slug]">) {
  const { slug } = await params;
  const spot = await getSpot(slug);
  if (!spot) notFound();

  const name = spot.name ?? "";
  const genres = knownGenres(spot.genres);
  const photos = [spot.mainImage, ...(spot.gallery ?? [])].filter(
    (image) => image !== null,
  );
  const mapUrl = mapAppUrl(spot.location);
  const website = spot.website ?? undefined;
  const instagram = instagramUrl(spot.instagram);
  const verifiedAt = formatDate(spot.lastVerifiedAt);

  // 位置が入っていない店では「近くのお店」を出さない
  const nearby = spot.location
    ? await client.fetch(nearbySpotsQuery, {
        id: spot._id,
        location: spot.location,
      })
    : [];

  return (
    <div className="page-gutter pb-10 lg:pb-24">
      <Breadcrumb
        items={[{ label: "お店・スポット", href: "/spots/" }, { label: name }]}
      />

      {spot.status === "closed" ? (
        <div className="mb-6 lg:mb-10">
          <ClosedNotice spotName={name} />
        </div>
      ) : null}

      <section className="grid gap-8 pb-10 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        <div className="lg:col-span-7">
          <SpotGallery images={photos} spotName={name} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:gap-6">
          <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
            {spot.category ? <KubunTag category={spot.category} /> : null}
            {genres.map((genre) => (
              <GenreTag key={genre} genre={genre} />
            ))}
            {spot.status ? (
              <span className="ml-auto">
                <StatusDot status={spot.status} />
              </span>
            ) : null}
          </div>

          <h1 className="font-display text-[34px] leading-[1.25] font-normal lg:text-[64px] lg:leading-[1.2]">
            {name}
          </h1>

          {spot.summary ? (
            <p className="text-base leading-[1.8] font-medium lg:text-[19px]">
              {spot.summary}
            </p>
          ) : null}

          <InfoTable
            rows={[
              { label: "住所", value: spot.address ?? "[住所を記入]" },
              { label: "営業時間", value: spot.hours ?? "[営業時間を記入]" },
              { label: "定休日", value: spot.holidays ?? "[定休日を記入]" },
            ]}
          />

          {mapUrl || website || instagram ? (
            <div className="flex items-center gap-2.5 lg:gap-3">
              {mapUrl ? (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-13 grow items-center justify-center rounded-full bg-indigo font-bold text-cream no-underline transition-colors hover:bg-ink lg:h-14"
                >
                  地図アプリで開く
                </a>
              ) : null}
              {website ? (
                <SnsIconButton href={website} label="公式サイト">
                  <WebsiteIcon />
                </SnsIconButton>
              ) : null}
              {instagram ? (
                <SnsIconButton href={instagram} label="Instagram">
                  <InstagramIcon />
                </SnsIconButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {spot.body || verifiedAt ? (
        <section className="grid gap-8 pb-10 lg:grid-cols-12 lg:gap-12 lg:pb-24">
          <div className="flex flex-col gap-6 lg:col-span-7">
            {spot.body ? (
              <>
                <h2 className="font-display text-[22px] font-normal lg:text-[36px]">
                  {name}について
                </h2>
                <RichText value={spot.body} />
              </>
            ) : null}
            {verifiedAt ? <VerifiedNote date={verifiedAt} /> : null}
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* 地図は Step 7 で入れる */}
            <Link href="/spots/" className="font-bold">
              エリアマップで周辺を見る →
            </Link>
          </div>
        </section>
      ) : null}

      {spot.articles.length > 0 ? (
        <section className="mb-10 flex flex-col gap-6 rounded-[32px] bg-indigo px-5 py-10 text-cream lg:mb-24 lg:gap-8 lg:px-16 lg:py-14">
          <h2 className="font-display text-[22px] font-normal lg:text-[36px]">
            {name}が登場する読みもの
          </h2>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {spot.articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}/`}
                className="flex items-center gap-4 rounded-[20px] bg-cream p-4 text-ink no-underline transition-transform duration-150 hover:-translate-y-1 hover:text-ink lg:gap-5 lg:p-5"
              >
                <span className="text-lg leading-[1.5] font-bold lg:text-xl">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {nearby.length > 0 ? (
        <section className="flex flex-col gap-6 lg:gap-8">
          <SectionHeading title="近くのお店とスポット" level="sub" />
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
            {nearby.map((item) => (
              <SpotCard key={item.slug} spot={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
