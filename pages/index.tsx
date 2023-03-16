import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import Stack from 'react-bootstrap/Stack'
import NewsCard from '../components/NewsCard'
// import styles from '../styles/Home.module.css'
import { getNews } from '../lib/getNews'

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const effect = async () => {
      setArticleData(await getNews(searchTerm));
    }
    effect();
  }, []);
  console.log(articleData[0])
  return (
    <Stack gap={3}>
      {
        articleData.map((article, idx) => {
          return <NewsCard key={article.lead} {...article} />
        })
      }
    </Stack>
  )
}

export default Home
