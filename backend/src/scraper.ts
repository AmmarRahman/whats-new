const fetch = require('node-fetch');

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
 
  fetch(url)
  .then((data: any) => {
    console.log(data);
    console.log('Scraper finished');
  })
  
}
