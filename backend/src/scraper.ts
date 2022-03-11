const fetch = require('node-fetch').default;


interface NewsItem {
  id: string,
  relatedBlog: string,
  postBody: string,
  modifiedDate: Date,
  headlineUrl: string,
  postDateTime: Date,
  postSummary: string,
  headline: string,
  contentType: string
}

export async function handler(event: any, context: any) {

  let page = 0;
  let url = process.env.NEWS_URL + '&page=' + page;

  console.log('Scraper started');
  console.log(url);
  let more = false;

  const response = await fetch(url);
  const data = await response.json()
  data.items.array.forEach((item: any) => {
    console.log(item);
  });
  
  console.log('Scraper finished');


}
