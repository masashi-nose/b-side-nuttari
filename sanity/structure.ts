import type { StructureResolver } from "sanity/structure";

/** サイドバーの並び。siteSettings は1件だけなので固定のIDで開く */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("B SIDE NUTTARI")
    .items([
      S.documentTypeListItem("spot").title("お店・スポット"),
      S.documentTypeListItem("article").title("読みもの"),
      S.documentTypeListItem("page").title("固定ページ"),
      S.divider(),
      S.listItem()
        .title("サイトの設定")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("サイトの設定"),
        ),
    ]);
