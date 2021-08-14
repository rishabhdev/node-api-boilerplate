import { Comment } from "@/comment/domain/Comment";
import { makeWithInvariants } from "@/_lib/WithInvariants";

namespace Article {
  type Article = Readonly<{
    id: string;
    title: string;
    content: string;
    state: "DRAFT" | "PUBLISHED" | "DELETED";
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }>;

  const withInvariants = makeWithInvariants<Article>((self, assert) => {
    assert(self.title?.length > 0);
    assert(self.content?.length > 0);
  });

  type ArticleProps = Readonly<{
    id: string;
    title: string;
    content: string;
  }>;

  export const create = withInvariants(
    (props: ArticleProps): Article => ({
      id: props.id,
      title: props.title,
      content: props.content,
      state: "DRAFT",
      publishedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    })
  );

  export const publish = withInvariants(
    (self: Article): Article => ({
      ...self,
      state: "PUBLISHED",
      publishedAt: new Date(),
    })
  );

  export const markAsDeleted = withInvariants(
    (self: Article): Article => ({
      ...self,
      state: "DELETED",
    })
  );

  export const changeTitle = withInvariants(
    (self: Article, title: string): Article => ({
      ...self,
      title,
    })
  );

  export type Type = Article;
}

export { Article };
