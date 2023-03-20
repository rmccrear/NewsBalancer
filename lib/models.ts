export interface SentimentScore {
    pos: number,
    neu: number,
    neg: number,
    compound: number
}

export interface Article {
    lead: string,
    name: string,
    description: string,
    url: string,
    image: {thumbnail: {contentUrl: string, width: number, height: number}},
    sentiment_score: SentimentScore,
    opposing_views: Article[] | null,
    related_articles: Article[] | null,
}