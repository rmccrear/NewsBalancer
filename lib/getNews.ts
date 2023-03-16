const apiUrl = "https://newssearcherpyapi.rmccrear.repl.co/news"

const getNews = async (searchString: string) => {
  console.log("get News")
  const resp = await fetch(apiUrl);
  const news = await resp.json();
  console.log(news)
  return news;
}

export {getNews};