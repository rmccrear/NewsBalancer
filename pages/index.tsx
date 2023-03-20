import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HeroContainer from '../components/Splash';
import NewsCard from '../components/NewsCard'
import LinkChoiceDisplay from '../components/LinkChoiceDisplay'
import SearchBar from '../components/SearchBar';
// import styles from '../styles/Home.module.css'
import { getNews } from '../lib/getNews'
import { type Article } from '../lib/models'

const NewsRow = ({articles, handleClickArticle}: {articles: Article[], handleClickArticle: Function}) => {
  return (
      <Row>
        {
          articles.map((article, idx) => {
            return (
              <Col key={article.url} sm={6} className="d-flex align-items-stretch">
                <NewsCard key={article.url} {...article} handleClickArticle={ ()=>handleClickArticle(article) }/>
              </Col>
            );
          })
        }
      </Row>
  );
}



const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [targetArticle, setTargetArticle] = useState<Article>();
  const [linkChoiceVisible, setLinkChoiceVisible] = useState<boolean>(false);

  const doSearch = (searchTerm: string) => {
    console.log("doSearch: " + searchTerm);
    setSearchTerm(searchTerm);
  }

  useEffect(() => {
    const effect = async () => {
      setArticleData(await getNews(searchTerm));
    }
    effect();
  }, [searchTerm]);

  useEffect(() => {
    const effect = async () => {
      setArticleData(await getNews(searchTerm));
    }
    effect();
  }, []);
  const handleClickArticle = (article: Article) => {
    setTargetArticle(article);
    setLinkChoiceVisible(true);
  }
  const closeLinkChoice = () => {
    setLinkChoiceVisible(false);
  }
  const even = [];
  const odd = [];
  for(let i = 0; i < articleData.length; i++) {
    if(i % 2 === 0) {
      even.push(articleData[i]);
    } else {
      odd.push(articleData[i]);
    }
  }

  const pairs = [];
  for(let i = 0; i < even.length; i++) {
    if(odd.length == even.length) {
      pairs.push([even[i], odd[i]]);
    } else {
      if(i == even.length - 1) {
        pairs.push([even[i]]);
      } else {
        pairs.push([even[i], odd[i]]);
      }
    }
  }


  return (
    <Container>
        <Row>
          <HeroContainer />
        </Row>
        <Row>
          <SearchBar doSearch={doSearch}/>
        </Row>
        {
          pairs.map((pair, idx) => {
            return (
              <NewsRow key={idx} articles={pair} handleClickArticle={handleClickArticle}/>
            );
          })
          /*
          articleData.map((article, idx) => {
            return( 
            <Card>
                <NewsCard key={article.url} {...article} handleClickArticle={()=>handleClickArticle(article)}/>
            </Card>
            );
          })
          */
        }
        {
          targetArticle &&
          <LinkChoiceDisplay article={targetArticle} visible={linkChoiceVisible} handleClose={closeLinkChoice}/>
        }
    </Container>
  )
}

export default Home
