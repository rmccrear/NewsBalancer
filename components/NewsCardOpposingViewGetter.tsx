import React, { MouseEvent, useState, useEffect, useCallback } from 'react';
import Card from "react-bootstrap/Card"
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import { type Article } from "../lib/models"
import { getOpp } from '../lib/getOpp';
import style from "./globalStyles";

function Scores ({scores}: {scores: any}) {
  const toolTip = `Positivity Score: ${(scores.pos * 100).toFixed(1)}%\nNegativity Score: ${(scores.neg * 100).toFixed(1)}%\nNeutrality Score: ${(scores.neu * 100).toFixed(1)}%`;
  return (
    <Stack direction="horizontal" title={toolTip} className={"d-flex flex-row-reverse"}>
              {scores.pos > scores.neg ? <Badge bg="success">{(scores.pos * 100).toFixed(1)}%</Badge> : ""}
              {scores.neg > scores.pos ? <Badge bg="danger">{(scores.neg *100).toFixed(1)}%</Badge> : ""}
      {/**
      <Badge bg="success">{scores.pos * 100}%</Badge>
      <Badge bg="danger">{scores.neg * 100}%</Badge>
      <Badge bg="secondary">{scores.neu * 100}%</Badge>
      */}
{/*
                {scores.pos > scores.neg ? <Badge bg="success">Positive {(scores.pos * 100).toFixed(1)}%</Badge> : ""}
                {scores.neg > scores.pos ? <Badge bg="danger">Negative {(scores.neg *100).toFixed(1)}%</Badge> : ""}
*/}
    </Stack>
  );
}


function NewsCardOpposingViewGetter({ name, description, sentiment, url }: { name: string, description: string,  sentiment: string, url: string}) {
  const [oppArticle, setOppArticle] = useState<Article | null>(null);

  useEffect(() => {
    const effect = async () => {
      const oppArticles = await getOpp(name, description, sentiment, url);
      if(oppArticles && oppArticles.length > 0){
        setOppArticle(oppArticles[0]);
      }
    }
    effect();
  }, [name, description, sentiment]);


  //const scores = sentiment_score;
  //const toolTip = `Positivity Score: ${(scores.pos * 100).toFixed(1)}%\nNegativity Score: ${(scores.neg * 100).toFixed(1)}%\nNeutrality Score: ${(scores.neu * 100).toFixed(1)}%`;
  // const handleClick = (e: MouseEvent) => {
  //   e.preventDefault();
  //   handleClickArticle();
  // }

  const toolTip = (oppArticle: Article) => oppArticle ? `Positivity Score: ${(oppArticle.sentiment_score.pos * 100).toFixed(1)}%\nNegativity Score: ${(oppArticle.sentiment_score.neg * 100).toFixed(1)}%\nNeutrality Score: ${(oppArticle.sentiment_score.neu * 100).toFixed(1)}%` : "";
  return oppArticle ? (
    <Card className='border-1' title={toolTip(oppArticle)}> 
      <Card.Header>
        <h3>Opposing View</h3>
        <div>Try reading an opposing view...</div>
      </Card.Header>
      <Card.Body className="bg-light">
          <div style={{float: "right", margin: "0 0 0 1em"}}>
          </div>
          <Stack gap={2} direction="horizontal">
            <div className="article-text">
              <Card.Title style={style.cardText}>
                <a href={oppArticle.url} target="timio_news">
                  {oppArticle.name}
                </a> 
              </Card.Title>
                {oppArticle.name.length < 200 ? 
                  <>
                  <Card.Text className="mt-3">
                    <a href={oppArticle.url} target="timio_news">
                      {oppArticle.description}
                    </a> 
                  </Card.Text>
                  </> : ""
                } 
              <Stack direction="horizontal">
                <div className="ms-auto">
                  <a href={oppArticle.url}>[more…]</a> 
                </div>
              </Stack>
            </div>
            <Stack gap={1}>
              { oppArticle.image && oppArticle.image.thumbnail &&
                <a href={oppArticle.url}>
                  <Image rounded src={oppArticle.image.thumbnail.contentUrl} style={style.image} />
                </a> 
              }
            </Stack>
          </Stack>
      </Card.Body>
    </Card >) : <span> Loading opposing view... </span>;
}

export default NewsCardOpposingViewGetter;
