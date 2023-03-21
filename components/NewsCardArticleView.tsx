import React, { MouseEvent } from 'react';
import Card from "react-bootstrap/Card"
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import NewsThumbnailImage from "./NewsThumbnailImage"
import LinkChoiceDisplay from "./LinkChoiceDisplay";
import { type Article } from "../lib/models"

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


function NewsCardArticleView({ name, description, url, sentiment_score, image, handleClickArticle }: { name: string, description: string, url: string, sentiment_score: any, image: any, handleClickArticle: Function }) {
  const scores = sentiment_score;
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    handleClickArticle();
  }
  return (
    <Card className='border-0'> 
      <Card.Body onClick={handleClick}>
        <Card.Text>
          <div style={{float: "right", margin: "0 0 0 1em"}}>
          </div>
          <Stack gap={2} direction="horizontal">
            <div>
              <h4>{name}</h4>
              <div style={style.cardText}>
                {description}…
              </div>
              <Stack direction="horizontal">
                <div className="ms-auto">
                  <a href="{url}">[more…]</a> 
                </div>
              </Stack>
            </div>
            <Stack gap={1}>
              { image && image.thumbnail &&
                <Image rounded src={image.thumbnail.contentUrl} style={style.image} />
              }
                <Scores scores={scores} />
            </Stack>
          </Stack>
        </Card.Text>
      </Card.Body>
    </Card >);
}

const style = {
  cardText: {
    cursor: "pointer"
  },
  image: {
    height: "6em",
    width: "6em",
    cursor: "pointer",
  }
}

export default NewsCardArticleView;