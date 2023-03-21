const apiUrl = "https://newssearcherpyapi.rmccrear.repl.co/news"

const getNews = async (searchString: string) => {
  // const resp = await fetch(apiUrl);
  let resp;
  if(searchString) resp = await fetch(apiUrl + "/" + searchString);
  else resp = await fetch(apiUrl);
  const news = await resp.json();
  console.log(news)
  return news;
}

export {getNews};