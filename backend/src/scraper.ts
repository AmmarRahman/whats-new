//issues
// https://stackoverflow.com/questions/66275648/aws-javascript-sdk-v3-typescript-doesnt-compile-due-to-error-ts2304-cannot-f
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { NewsItem, NewsObject, Tag } from "./newsObject";
const fetch = require('node-fetch').default;
const dynamoClient = new DynamoDB({});
//nth refactor as found on https://github.com/aws/aws-sdk-js-v3/blob/main/lib/lib-dynamodb/README.md
const docClient = DynamoDBDocument.from(dynamoClient);

// interface DynamoDBNewsObject extends NewsItem {
//   tags: {[id: string]: Tag}
// }


interface DynamoDBNewsItem extends NewsItem {
  tags: string
}

function mergeTags(arrays:Array<Array<string>> ):string {
  let jointArray: Array<string> = []
  arrays.forEach(tags => {
      jointArray = [...jointArray, ...tags]
  })
  const uniqueArray = jointArray.filter((item,index) => jointArray.indexOf(item) === index)

  return uniqueArray.join('#')
}

// function transformEntry(entry: NewsObject): DynamoDBNewsObject {
//   // just moving the tags inside the news item
//   //convert tags to have ids as keys
//   let tagsObject = Object.assign({}, ...entry.tags.map((tag: Tag) => ({[tag.id]: tag})));
//   return { 
//     ...entry.item, 
//     tags: tagsObject
//   }
// }

function transformEntry(entry: NewsObject):(DynamoDBNewsItem) {

  const tagsArray = entry.tags.map((tag: Tag) => (tag.id.split('#'))); 
  const newsItem : DynamoDBNewsItem = {...entry.item, tags: mergeTags(tagsArray) };

  
  // need to add the connection between the news item and the tags
  
  return newsItem;
}
export async function handler(event: any, context: any) {

  console.log('Scraper started');
  let getResults = true;
  let page = 0;
  let searchParameters = [
    `item.directoryId=whats-new`,
    `sort_by=item.additionalFields.postDateTime`,
    `sort_order=desc`,
    `size=25`,
    `item.locale=en_US`,
    `page=${page}`

  ]

  while (getResults) {
    let url = process.env.SEARCH_URL + "?" + searchParameters.join('&');

    const response = await fetch(url);
    const data = await response.json();



    data.items.forEach(async (entry: NewsObject) => {
      const params = {
        TableName: process.env.TABLE_NAME as string,
        conditionExpression: 'attribute_not_exists(id)',
        Item: transformEntry(entry)
      }
      //add to dynamo

      try {
        const response = await docClient.put(params);
        console.log(response)
        return response
      }
      catch (err) {
        console.log(err);
        return err
      }
    });

    page++;
    //TODO: if we need more results then the below statement should not trigger
    getResults = false;
  }



  console.log('Scraper finished');


}
