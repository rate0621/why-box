import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  views: number;
  imageUrl?: string;
  imageQuery?: string;
  publishedAt?: string;
  tags: ArticleTag[];
};

export type ArticleTag = {
  id: string;
  name: string;
};

export type ArticleDetailSection = {
  heading: string;
  content: string;
  isHtml: boolean;
};

export type ArticleDetail = Article & {
  sections: ArticleDetailSection[];
  keywords: string[];
};

type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
};

type MicroCMSBlog = {
  id: string;
  title?: string;
  description?: string;
  eyecatch?: MicroCMSImage;
  imageQuery?: string;
  image_query?: string;
  readTime?: string;
  read_time?: string;
  views?: number;
  publishedAt?: string;
  body?: string;
  content?: string;
  highlights?: string[];
  points?: string[];
  keywords?: string[] | string;
  tags?: string[] | string;
  tag?: string[] | string;
};

function normalizeServiceDomainInput(input?: string | null) {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  const sanitize = (value: string) =>
    value
      .replace(/^https?:\/\//, "")
      .replace(/\.microcms\.io$/, "")
      .replace(/\/$/, "")
      .split("/")[0]
      .trim();

  if (trimmed.includes("://")) {
    try {
      const url = new URL(trimmed);
      return sanitize(url.hostname);
    } catch {
      return sanitize(trimmed);
    }
  }

  if (trimmed.includes("/")) {
    try {
      const url = new URL(`https://${trimmed}`);
      return sanitize(url.hostname);
    } catch {
      return sanitize(trimmed);
    }
  }

  return sanitize(trimmed);
}

const serviceDomain = normalizeServiceDomainInput(process.env.MICROCMS_SERVICE_DOMAIN);
const apiKey = process.env.MICROCMS_API_KEY;

const isCmsConfigured = Boolean(serviceDomain && apiKey);

if (!isCmsConfigured) {
  console.warn(
    "[microCMS] MICROCMS_SERVICE_DOMAIN または MICROCMS_API_KEY が設定されていないためフォールバックデータを使用します。"
  );
}

const cmsClient =
  isCmsConfigured
    ? createClient({ serviceDomain: serviceDomain!, apiKey: apiKey!, retry: true })
    : null;

type FallbackArticleSeed = Article & {
  body: string;
  highlights: string[];
  keywords: string[];
};

const FALLBACK_ARTICLE_DETAIL_SEEDS: FallbackArticleSeed[] = [
  {
    id: "1",
    title: "なぜ空は青いの？",
    excerpt:
      "空が青く見えるのは、太陽の光が空気の分子にぶつかって散乱するからです。青い光は他の色よりも散乱しやすいため、空全体が青く見えます。",
    tags: [{ id: "science", name: "科学" }],
    readTime: "3分",
    views: 1234,
    imageQuery: "blue sky clouds",
    publishedAt: "2025-01-05T09:00:00.000Z",
    body: `太陽の光は虹のようにさまざまな色の光でできています。地球に届くとまず大気中の小さな分子にぶつかり、青い光が特に大きくはね返されます。この現象をレイリー散乱と呼び、空のどこを見ても青い光が飛んでくるので空が青く感じられます。
    
ほんのり赤い夕焼けになるのは、太陽の光が地平線近くを通るときに長い距離を進み、青い光がほとんど散らばってしまうためです。残った赤やオレンジの光が私たちの目に届き、空の色が変化します。`,
    highlights: [
      "青い光は波長が短く、空気中で特に散らばりやすい",
      "レイリー散乱のおかげで昼の空は青く、夕方は赤く見える",
      "大気の状態によって空の色合いは少しずつ変わる"
    ],
    keywords: ["光", "散乱", "空色"]
  },
  {
    id: "2",
    title: "恐竜はどうして絶滅したの？",
    excerpt:
      "約6600万年前、大きな隕石が地球に衝突し、地球の環境が大きく変わりました。その結果、恐竜たちは生きていけなくなったと考えられています。",
    tags: [{ id: "nature", name: "自然" }],
    readTime: "4分",
    views: 2156,
    imageQuery: "dinosaur fossil",
    publishedAt: "2024-12-18T03:00:00.000Z",
    body: `巨大隕石が現在のメキシコ付近に衝突し、空には厚いちりが舞い上がりました。太陽の光が遮られ、植物が光合成できなくなり、食物連鎖が次々と崩れていきました。
    
一部の動物は子育ての仕方や体の大きさの違いで生き延び、それが後の鳥類へとつながりました。地球の環境が急激に変わると、生き物はその変化に合わせて素早く適応する必要があるのです。`,
    highlights: [
      "巨大隕石の衝突で世界規模の寒冷化が起きた",
      "植物が枯れ、食べ物がなくなったことで大型恐竜が倒れた",
      "小型で適応力の高い生き物が生き残り、鳥へと進化した"
    ],
    keywords: ["恐竜", "隕石", "絶滅"]
  },
  {
    id: "3",
    title: "星はどうやって光るの？",
    excerpt:
      "星の中では水素がヘリウムに変わる核融合反応が起こっています。この時に大きなエネルギーが生まれ、それが光となって私たちに届きます。",
    tags: [{ id: "space", name: "宇宙" }],
    readTime: "3分",
    views: 1876,
    imageQuery: "starry night sky",
    publishedAt: "2024-11-02T10:30:00.000Z",
    body: `星の中心ではとても高い温度と圧力が保たれていて、水素同士がぎゅっとくっついてヘリウムに変わります。これが核融合で、莫大なエネルギーが一瞬で生まれます。
    
生まれたエネルギーは光や熱となり、星の表面から宇宙へ飛び出していきます。遠く離れた地球でも夜空を見上げれば、小さな光として感じ取ることができます。`,
    highlights: [
      "星の中心では核融合が続いている",
      "エネルギーが光となり何年もかけて地球へ届く",
      "星の質量によって明るさや寿命が変わる"
    ],
    keywords: ["核融合", "恒星", "エネルギー"]
  },
  {
    id: "4",
    title: "どうして夢を見るの？",
    excerpt:
      "夢は脳が休んでいる時に見られます。脳は日中の出来事を整理したり、記憶を定着させたりするために夢を見せていると考えられています。",
    tags: [{ id: "body", name: "からだ" }],
    readTime: "4分",
    views: 1543,
    imageQuery: "child sleeping peacefully",
    publishedAt: "2025-02-10T01:00:00.000Z",
    body: `眠っている間も脳は完全には止まらず、必要な情報を整理しています。特にレム睡眠という軽い眠りの時間には脳が活発に働き、記憶の仕分けや学んだことの復習をしています。
    
夢はその作業の副産物と言われ、印象に残った出来事や感情が組み合わさって不思議な物語になります。夢を見ることで、感情の整理や心の安定にもつながると考えられています。`,
    highlights: [
      "レム睡眠中は脳が活発で夢を見やすい",
      "夢は記憶の整理や気持ちの整理にも役立つ",
      "眠りのリズムが崩れると夢の見方も変わる"
    ],
    keywords: ["睡眠", "記憶", "レム睡眠"]
  },
  {
    id: "5",
    title: "キリンの首はなぜ長いの？",
    excerpt:
      "キリンの首が長いのは、高い木の葉っぱを食べるために進化したからです。長い首のおかげで、他の動物が食べられない場所の葉を食べることができます。",
    tags: [{ id: "animals", name: "動物" }],
    readTime: "3分",
    views: 1998,
    imageQuery: "giraffe eating tree",
    publishedAt: "2024-10-28T07:00:00.000Z",
    body: `昔のアフリカでは乾季になると地上の草が少なくなり、大きな木の葉だけが残りました。そこで少しでも高いところに届く首を持つキリンが生き残り、世代を重ねてさらに長い首へ進化したと考えられています。
    
長い首は葉を食べるだけでなく、遠くの敵を見つけたり、体温を逃したりする役目もあります。首の骨は人間と同じ7本ですが、一本一本がとても長く発達しています。`,
    highlights: [
      "高い木の葉を食べるための進化",
      "首の骨は本数ではなく長さが違う",
      "長い首は視野の確保や体温調節にも役立つ"
    ],
    keywords: ["進化", "アフリカ", "首"]
  },
  {
    id: "6",
    title: "雨はどうやってできるの？",
    excerpt:
      "太陽の熱で地上の水が蒸発して空に上がり、冷やされて雲になります。雲の中の水滴が集まって重くなると、雨となって地上に降ってきます。",
    tags: [{ id: "nature", name: "自然" }],
    readTime: "3分",
    views: 2301,
    imageQuery: "rain drops nature",
    publishedAt: "2025-03-12T05:00:00.000Z",
    body: `水は太陽の光で温められると水蒸気になり、空の高い場所へ上昇します。高い場所は気温が低いため、水蒸気は小さな水滴や雪の粒になって雲を作ります。
    
雲の中で水滴同士がくっつき、重さに耐えられなくなると雨となって落ちてきます。気温が低いと雪やあられに変わり、季節や場所によって降り方が変化します。`,
    highlights: [
      "水蒸気が冷えて雲になり、さらに集まると雨になる",
      "気温によって雨・雪・みぞれに変化する",
      "雨は川や海に戻り、水の循環を作っている"
    ],
    keywords: ["水循環", "雲", "天気"]
  },
  {
    id: "7",
    title: "どうして虹は7色なの？",
    excerpt:
      "太陽の光には様々な色が混ざっています。雨上がりに光が水滴を通ると、色ごとに分かれて見えます。主に見える色が7色なので虹は7色と言われています。",
    tags: [{ id: "science", name: "科学" }],
    readTime: "4分",
    views: 1765,
    imageQuery: "rainbow sky",
    publishedAt: "2024-09-14T08:30:00.000Z",
    body: `太陽の光が空気中の水滴に入ると、光の進む向きが曲がります。色によって曲がり方が少しずつ違うので、赤・橙・黄・緑・青・藍・紫と順番に広がって並びます。
    
実際は無数の色が混ざっていますが、人の目がはっきり区別しやすい7色が昔からよく使われています。見る角度や水滴の大きさによって色の並びが変わることもあります。`,
    highlights: [
      "光の屈折と反射で色が分かれる",
      "人の目が区別しやすい7色が代表になった",
      "虹は見る人と太陽の位置によって見え方が変わる"
    ],
    keywords: ["虹", "屈折", "光"]
  },
  {
    id: "8",
    title: "地球はどうやってできたの？",
    excerpt:
      "約46億年前、宇宙にある塵やガスが集まって地球が生まれました。最初は熱くてドロドロでしたが、長い時間をかけて冷えて今の形になりました。",
    tags: [{ id: "space", name: "宇宙" }],
    readTime: "5分",
    views: 1432,
    imageQuery: "planet earth space",
    publishedAt: "2024-08-01T12:00:00.000Z",
    body: `太陽が生まれた直後、周りにはガスやちりが渦を巻いていました。少しずつ粒が集まり、岩のかたまりができ、その衝突と合体を繰り返して地球の原型が生まれました。
    
初めの地球は溶けた岩だらけでしたが、時間がたつと表面が冷えて固まり、火山や海ができました。水や空気がそろい、生命が誕生するための舞台が整ったのです。`,
    highlights: [
      "ガスやちりが集まって原始地球が誕生",
      "激しい衝突で地表は一度ドロドロに溶けた",
      "冷えて海と大気ができ、生命の基盤になった"
    ],
    keywords: ["地球誕生", "原始太陽系", "生命"]
  },
  {
    id: "9",
    title: "どうしてお腹が鳴るの？",
    excerpt:
      "お腹が空くと、胃や腸が次の食べ物を受け入れる準備をします。その時に胃や腸が動き、中の空気や液体が移動する音がお腹の鳴る音です。",
    tags: [{ id: "body", name: "からだ" }],
    readTime: "3分",
    views: 1234,
    imageQuery: "child eating healthy food",
    publishedAt: "2025-01-20T02:30:00.000Z",
    body: `胃や腸は食べ物がなくても波のように動き、次のごはんの準備をしています。空気や胃液が押し流されるときに、ゴロゴロという音が鳴ります。
    
緊張している時や空腹が長く続いている時は、動きが少し激しくなり音が大きくなることもあります。ゆっくり噛んで食べると空気の飲み込みが減り、音も静かになります。`,
    highlights: [
      "胃腸は空腹時も波打つように動いている",
      "空気や液体が押し出される音がゴロゴロの正体",
      "よく噛むと空気が減り、お腹の音も静かになる"
    ],
    keywords: ["胃腸", "消化", "空腹"]
  }
];

const FALLBACK_ARTICLE_DETAILS: ArticleDetail[] = FALLBACK_ARTICLE_DETAIL_SEEDS.map(
  ({ body, highlights, keywords, ...article }) => ({
    ...article,
    sections: extractSectionsFromBody(body, highlights),
    keywords
  })
);

const FALLBACK_ARTICLE_DETAIL_MAP = new Map(
  FALLBACK_ARTICLE_DETAILS.map((detail) => [detail.id, detail])
);

const FALLBACK_ARTICLES: Article[] = FALLBACK_ARTICLE_DETAILS.map(
  ({ sections: _sections, keywords: _k, ...article }) => article
);

function estimateReadTime(text?: string): string {
  if (!text) return "3分";
  const charsPerMinute = 400;
  const minutes = Math.max(1, Math.round(text.length / charsPerMinute));
  return `${minutes}分`;
}

function normalizeKeywords(input?: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((item) => `${item}`.trim()).filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(/[、,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeTagValue(value: unknown): ArticleTag[] {
  if (!value) return [];
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    return [{ id: trimmed.toLowerCase(), name: trimmed }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((entry) => normalizeTagValue(entry));
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj.tag || obj.tags) {
      return normalizeTagValue(obj.tag ?? obj.tags);
    }
    if (obj.value) {
      return normalizeTagValue(obj.value);
    }
    const id = typeof obj.id === "string" ? obj.id : undefined;
    const name = typeof obj.name === "string" ? obj.name : undefined;
    if (id || name) {
      const resolvedId = (id ?? name)?.toString();
      if (resolvedId) {
        const resolvedName = (name ?? id ?? resolvedId).toString();
        return [{ id: resolvedId, name: resolvedName }];
      }
    }
  }
  return [];
}

function normalizeTagsField(input?: unknown): ArticleTag[] {
  return normalizeTagValue(input).filter((tag, index, self) =>
    tag && index === self.findIndex((other) => other.id === tag.id)
  );
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function hasHeadingStructure(html: string): boolean {
  return /<h2[^>]*>/i.test(html);
}

function extractSectionsFromBody(body: string, fallbackList?: string[]): ArticleDetailSection[] {
  if (!body) {
    return fallbackList?.map((text, index) => ({
      heading: `ポイント${index + 1}`,
      content: text,
      isHtml: false
    })) ?? [];
  }

  const sections: ArticleDetailSection[] = [];
  if (hasHeadingStructure(body)) {
    const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gis;
    const matches: { headingHtml: string; start: number; end: number }[] = [];
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(body)) !== null) {
      matches.push({ headingHtml: match[1], start: match.index, end: headingRegex.lastIndex });
    }

    matches.forEach((headingMatch, index) => {
      const heading = stripHtmlTags(headingMatch.headingHtml).trim() || `トピック${index + 1}`;
      const contentStart = headingMatch.end;
      const contentEnd = index + 1 < matches.length ? matches[index + 1].start : body.length;
      const content = body.slice(contentStart, contentEnd).trim();
      if (content) {
        sections.push({ heading, content, isHtml: true });
      }
    });

    if (sections.length) {
      return sections;
    }
  }

  if (fallbackList?.length) {
    return fallbackList.map((text, index) => ({
      heading: `ポイント${index + 1}`,
      content: text,
      isHtml: false
    }));
  }

  const normalized = body.trim();
  if (!normalized) {
    return [];
  }

  return [
    {
      heading: "トピック",
      content: normalized,
      isHtml: /<[^>]+>/.test(normalized)
    }
  ];
}

function mapArticleFromCms(record: MicroCMSBlog): Article {
  const excerpt = record.description ?? "";
  const normalizedTags = normalizeTagsField(record.tags ?? record.tag);
  const tags = normalizedTags.length ? normalizedTags : [{ id: "general", name: "ナレッジ" }];

  if (!normalizedTags.length && process.env.NODE_ENV === "development") {
    console.warn("[microCMS] Article has no tags", {
      id: record.id,
      rawTags: record.tags,
      rawTag: record.tag
    });
  }

  return {
    id: record.id,
    title: record.title ?? "タイトル未設定",
    excerpt,
    readTime: record.readTime ?? record.read_time ?? estimateReadTime(excerpt),
    views: typeof record.views === "number" ? record.views : 0,
    imageUrl: record.eyecatch?.url,
    imageQuery: record.imageQuery ?? record.image_query,
    publishedAt: record.publishedAt,
    tags
  };
}

function mapArticleDetailFromCms(record: MicroCMSBlog): ArticleDetail {
  const base = mapArticleFromCms(record);
  const body = record.content ?? record.body ?? record.description ?? base.excerpt;
  const highlightsSource = Array.isArray(record.highlights)
    ? record.highlights.map((item) => `${item}`)
    : Array.isArray(record.points)
      ? record.points.map((item) => `${item}`)
      : undefined;
  const sections = extractSectionsFromBody(body, highlightsSource);
  const keywords = normalizeKeywords(record.keywords ?? record.tags);

  return {
    ...base,
    sections,
    keywords
  };
}

export async function getArticles(queries?: MicroCMSQueries): Promise<Article[]> {
  if (!cmsClient) {
    return FALLBACK_ARTICLES;
  }

  try {
    const response = await cmsClient.get<{ contents: MicroCMSBlog[] }>({
      endpoint: "blogs",
      queries: { limit: 100, orders: "-publishedAt", depth: 1, ...queries }
    });

    if (!response.contents?.length) {
      return FALLBACK_ARTICLES;
    }

    return response.contents.map(mapArticleFromCms);
  } catch (error) {
    console.error("Failed to load microCMS articles", error);
    return FALLBACK_ARTICLES;
  }
}

export async function getArticleById(contentId: string): Promise<ArticleDetail | null> {
  if (!contentId) {
    return null;
  }

  if (!cmsClient) {
    return FALLBACK_ARTICLE_DETAIL_MAP.get(contentId) ?? null;
  }

  try {
    const response = await cmsClient.get<MicroCMSBlog>({
      endpoint: "blogs",
      contentId,
      queries: { depth: 1 }
    });

    return mapArticleDetailFromCms(response);
  } catch (error) {
    console.error(`Failed to load microCMS article detail (${contentId})`, error);
    return FALLBACK_ARTICLE_DETAIL_MAP.get(contentId) ?? null;
  }
}
