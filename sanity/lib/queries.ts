import { defineQuery } from "next-sanity";

/**
 * GROQ クエリ。ここを変えたら `npm run typegen` を実行して
 * sanity/types.ts の型を作り直す。
 *
 * 画像は asset を展開して、URL・ぼかし用の lqip・縦横比まで取る
 * （next/image に渡すため）。
 */

/** generateStaticParams 用。閉店した店のページも残すので全件返す */
export const spotSlugsQuery = defineQuery(`
  *[_type == "spot" && defined(slug.current)]{ "slug": slug.current }
`);

/** 店舗・スポット詳細 */
export const spotBySlugQuery = defineQuery(`
  *[_type == "spot" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    category,
    genres,
    status,
    summary,
    address,
    hours,
    holidays,
    website,
    instagram,
    lastVerifiedAt,
    location,
    body,
    mainImage{
      alt,
      asset->{
        _id,
        url,
        "lqip": metadata.lqip,
        "aspectRatio": metadata.dimensions.aspectRatio
      }
    },
    gallery[]{
      alt,
      asset->{
        _id,
        url,
        "lqip": metadata.lqip,
        "aspectRatio": metadata.dimensions.aspectRatio
      }
    },
    "articles": *[_type == "article" && references(^._id)]
      | order(publishedAt desc)[0...4]{
        title,
        "slug": slug.current,
        category,
        mainImage{
          alt,
          asset->{
            _id,
            url,
            "lqip": metadata.lqip,
            "aspectRatio": metadata.dimensions.aspectRatio
          }
        }
      },
    seo
  }
`);

/** 近くのお店3件。位置が入っている店だけが対象 */
export const nearbySpotsQuery = defineQuery(`
  *[_type == "spot"
    && _id != $id
    && status != "closed"
    && defined(location)
    && defined(slug.current)]
    | order(geo::distance(location, $location) asc)[0...3]{
      name,
      "slug": slug.current,
      category,
      summary,
      mainImage{
        alt,
        asset->{
          _id,
          url,
          "lqip": metadata.lqip,
          "aspectRatio": metadata.dimensions.aspectRatio
        }
      }
    }
`);

/**
 * 店舗・スポット一覧。閉店は載せない（ページは残す）。
 * 絞り込みはクライアント側でするので、ここでは全件を返す。
 */
export const spotListQuery = defineQuery(`
  *[_type == "spot" && status != "closed" && defined(slug.current)]
    | order(name asc){
      name,
      "slug": slug.current,
      category,
      genres,
      status,
      summary,
      mainImage{
        alt,
        asset->{
          _id,
          url,
          "lqip": metadata.lqip,
          "aspectRatio": metadata.dimensions.aspectRatio
        }
      }
    }
`);
