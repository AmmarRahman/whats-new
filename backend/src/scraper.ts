//issues
// https://stackoverflow.com/questions/66275648/aws-javascript-sdk-v3-typescript-doesnt-compile-due-to-error-ts2304-cannot-f
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { ddBPost, ddBTag } from "./DDbNews";
import { NewsObject, Tag } from "./newsObject";
const fetch = require("node-fetch").default;
const dynamoClient = new DynamoDB({});
//nth refactor as found on https://github.com/aws/aws-sdk-js-v3/blob/main/lib/lib-dynamodb/README.md
const docClient = DynamoDBDocument.from(dynamoClient);

function serializerHelper(key: string, value: any): any {
  //convert to Date object
  // I think we would leave this as is because most references use ISO 8601 dates with DynamoDB.
  // const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  // if (typeof value === "string" && dateFormat.test(value)) {
  //   return new Date(value).getTime();
  // }

  return value;
}
export async function handler(event: any, context: any) {
  console.log("Scraper started ▶️");
  let getResults = true;
  let page = 0;
  let searchParameters = [
    `item.directoryId=whats-new`,
    `sort_by=item.additionalFields.postDateTime`,
    `sort_order=desc`,
    `size=25`,
    `item.locale=en_US`,
    `page=${page}`,
  ];

  while (getResults) {
    let url = process.env.SEARCH_URL + "?" + searchParameters.join("&");

    const webResponse = await fetch(url);
    const rawData = await webResponse.text();
    const data = JSON.parse(rawData, serializerHelper);

    // TODO - we are adding both the tags and the news items but not the connection between the two. Still need to figure out the best way to do it.
    data.items.forEach(async (entry: NewsObject) => {
      //write the post to the db
      let params = {
        TableName: process.env.TABLE_NAME as string,
        // conditionExpression: "attribute_not_exists(sk)",
        Item: ddBPost.getWriteObject(entry),
      };
      const response = await docClient.put(params);
      console.log("response", response);

      //write the tags to the db
      entry.tags.forEach(async (tag: Tag) => {
        const params = {
          TableName: process.env.TABLE_NAME as string,
          // conditionExpression: "attribute_not_exists(sk)",
          Item: ddBTag.getWriteObject(tag),
        };

        //add to dynamo
        const response = await docClient.put(params);
        console.log(response);
      });

      return { response: "success 🤞" };
    });

    page++;

    //TODO: if we need more results then the below statement should not trigger
    getResults = false;
  }

  console.log("Scraper finished ⏹️");
}
