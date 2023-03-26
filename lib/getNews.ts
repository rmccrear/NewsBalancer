const apiUrl: string =  process.env.NEXT_PUBLIC_API_SERVER;

const getNews = async (searchString: string) => {
  // const resp = await fetch(apiUrl);
  let resp;
  if(searchString) resp = await fetch(apiUrl + "/news/" + searchString);
  else resp = await fetch(apiUrl);
  const news = await resp.json();
  console.log(news)
  return news;
}

export {getNews};