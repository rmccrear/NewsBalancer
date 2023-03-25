import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import HeroContainer from '../components/Splash';
import NewsCard from '../components/NewsCard'
import LinkChoiceDisplay from '../components/LinkChoiceDisplay'
import SearchBar from '../components/SearchBar';
import { getNews } from '../lib/getNews'
import { type Article } from '../lib/models'
import { SP } from 'next/dist/shared/lib/utils';

const NewsRow = ({articles, handleClickArticle}: {articles: Article[], handleClickArticle: Function}) => {
  return (
      <Row className="bg-light">
        {
          articles.map((article, idx) => {
            return (
              <Col key={article.url} sm={6} className="d-flex justify-content-stretch ">
                <NewsCard key={article.url} {...article} handleClickArticle={ ()=>handleClickArticle(article) }/>
                <hr/>
              </Col>
            );
          })
        }
      </Row>
  );
}

const ErrorAlert = ({errorMessage} : {errorMessage: string}) => {
  return (
    <>
        {
          errorMessage !== "" ? (<Row>
            <Alert variant="danger" style={{margin: "1em"}}>{errorMessage}</Alert>
            </Row>) : ""
        }
    </>
  )
}

const LoadingArticles = () => {
  return (
    <Stack direction="horizontal" className="d-flex">
      <Spinner style={{margin: "1em auto"}}/>
    </Stack>
  )
}

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [targetArticle, setTargetArticle] = useState<Article>();
  const [linkChoiceVisible, setLinkChoiceVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const doSearch = (searchTerm: string) => {
    console.log("doSearch: " + searchTerm);
    setSearchTerm(searchTerm);
  }

  const fetchArticleData = async (searchTerm: string) => {
      let articleData = [];
      try{
        articleData = await getNews(searchTerm);
        setIsLoading(false);
        setErrorMessage("");
      } catch (e: any) {
        console.log(e);
        setIsLoading(false);
        setErrorMessage("Sorry, we are unable to connect at the moment. Please try later.");
      }
      return articleData;
  }

  useEffect(() => {
    const effect = async () => {
      // setArticleData(await getNews(searchTerm));
      setArticleData(await fetchArticleData(searchTerm));
    }
    effect();
  }, [searchTerm]);

  useEffect(() => {
    const effect = async () => {
      setArticleData(await fetchArticleData(searchTerm));
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
    <>
    <div>
    <Container>
        <Row>
          <HeroContainer />
        </Row>
        <Row style={style.searchBarRow}>
          <SearchBar doSearch={doSearch}/>
        </Row>
    </Container>
    </div>
    <div className="bg-light pt-2">
    <Container>
        <ErrorAlert errorMessage={errorMessage}/>
        { isLoading && <LoadingArticles /> }
        <div>
        {
          pairs.map((pair, idx) => {
            return (
              <NewsRow key={idx} articles={pair} handleClickArticle={handleClickArticle} />
            );
          })
        }
        </div>
        {
          targetArticle &&
          <LinkChoiceDisplay article={targetArticle} visible={linkChoiceVisible} handleClose={closeLinkChoice}/>
        }
    </Container>
    </div>
    </>
  )
}

const style = {
  searchBarRow: {
    margin: "1.5em 0"
  }
}

export default Home
