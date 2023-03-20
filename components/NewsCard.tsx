import React, { MouseEvent } from 'react';
import Card from "react-bootstrap/Card"
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import NewsThumbnailImage from "./NewsThumbnailImage"
import LinkChoiceDisplay from "./LinkChoiceDisplay";
import { type Article } from "../lib/models"

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
          <Image rounded src={image.thumbnail.contentUrl}  style={{float: "right", margin: "0 0 0 1em"}}/>
          {/*description*/ name}
        </Card.Text>
        <footer>
          <div>

          </div>
          {scores ?
            <>
                {scores.pos > scores.neg ? <Badge bg="success">Positive {scores.pos * 100}%</Badge> : ""}
                {scores.neg > scores.pos ? <Badge bg="danger">Negative {scores.neg *100}%</Badge> : ""}
                {/* 
                <Badge bg="secondary">Positivity Score: {scores.pos * 100}%</Badge>
                <Badge bg="secondary">Negativity Score: {scores.neg * 100}%</Badge>
                <Badge bg="secondary">Neutrality Score: {scores.neu * 100}%</Badge>
                */}
            </>
            : ""
          }
        </footer>
      </Card.Body>
    </Card >);
}

export default NewsCard;
