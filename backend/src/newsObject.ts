
export interface NewsObject {
    item: NewsItem;
    tags: Array<Tag>
}
export interface NewsItem {

    id: string,
    locale: string,
    name: string,
    author: string,
    createdBy: string,
    lastUpdatedBy: string,
    numImpressions: number,
    score: number,
    dateCreated: Date,
    dateUpdated: Date,
    additionalFields: {
        postBody: string,
        directoryId?: string,
        relatedBlog?: string,
        modifiedDate?: Date,
        headlineUrl: string,
        postDateTime: Date,
        postSummary: string,
        headline: string,
        contentType: string

    }

}

export interface Tag {
    id: string,
    locale: string,
    tagNamespaceId: string,
    name: string,
    description: string,
    createdBy: string,
    lastUpdatedBy?: string,
    dateCreated: Date,
    dateUpdated?: Date
}

