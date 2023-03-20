import React, { MouseEvent } from 'react';
import Card from "react-bootstrap/Card"
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import NewsThumbnailImage from "./NewsThumbnailImage"
import LinkChoiceDisplay from "./LinkChoiceDisplay";
import { type Article } from "../lib/models"

function Scores ({scores}: {scores: any}) {
  return (
    <>

{/*
      <Badge bg="secondary">Positivity Score: {scores.pos * 100}%</Badge>
      <Badge bg="secondary">Negativity Score: {scores.neg * 100}%</Badge>
      <Badge bg="secondary">Neutrality Score: {scores.neu * 100}%</Badge>
*/}
                {scores.pos > scores.neg ? <Badge bg="success">Positive {(scores.pos * 100).toFixed(1)}%</Badge> : ""}
                {scores.neg > scores.pos ? <Badge bg="danger">Negative {(scores.neg *100).toFixed(1)}%</Badge> : ""}
    </>
  );
}


function NewsCard({ name, description, url, sentiment_score, image, handleClickArticle }: { name: string, description: string, url: string, sentiment_score: any, image: any, handleClickArticle: Function }) {
  const scores = sentiment_score;
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    handleClickArticle();
  }
  return (
    <Card className='border-0'> 
        {/*
      <Card.Header>
        <Card.Title>
          <a href={url}>
            {name}
          </a>
        </Card.Title>
      </Card.Header>
        */}
      <Card.Body onClick={handleClick}>
        <Card.Text>
          <div style={{float: "right", margin: "0 0 0 1em"}}>
          </div>
          <Stack gap={2} direction="horizontal">
            <div>
              <div>
                {name}
              </div>
            </div>
            <Stack gap={1}>
              { image && image.thumbnail &&
                <Image rounded src={image.thumbnail.contentUrl} style={{height: "6em", width: "6em"}} />
              }
                <Scores scores={scores} />
            </Stack>
          </Stack>
        </Card.Text>
      </Card.Body>
    </Card >);
}

export default NewsCard;
