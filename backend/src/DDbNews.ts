import { NewsItem, NewsObject, Tag } from './newsObject';


export interface DynamoDbNewsPost extends NewsItem {
    pk: string
    sk: string
}

export interface DynamoDbTag extends Tag {
    pk: string,
    sk: string
}


export class ddBPost {


    public static getWriteObject(entry: NewsObject): (DynamoDbNewsPost) {

        let post = entry.item;
        const postDate = new Date(post.additionalFields.postDateTime);
        // FFS - Another Javascript oddity where months start from 0
        let pk = `POST#${postDate.getFullYear()}#${postDate.getMonth() + 1}`;
        let sk = `${post.id}`;

        return { ...entry.item, pk, sk };


        // need to add the connection between the news item and the tags


    }


}

export class ddBTag {

    public static getWriteObject(tag: Tag): (DynamoDbTag) {
        let tagArray = tag.id.split('#');
        let pk = `TAG#${tagArray.shift()}`;
        let sk = `${tagArray.join('#')}`;
        return { ...tag, pk, sk };

    }


    //TODO: remove this - leaving this here for now
    public static getTagsString(entry: NewsObject): string {

        // TODO: there must be a cleaner way to do this

        let tagsArray = entry.tags.map((tag: Tag) => (tag.id.split('#')));
        let combinedArray: Array<string> = [];
        tagsArray.forEach(tags => {
            combinedArray = [...combinedArray, ...tags]
        })

        const uniqueArray = combinedArray.filter((item, index) => combinedArray.indexOf(item) === index)

        return uniqueArray.join('#')
    }

} 
