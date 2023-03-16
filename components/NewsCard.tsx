import Card from "react-bootstrap/Card"
import Badge from 'react-bootstrap/Badge';
import NewsThumbnailImage from "./NewsThumbnailImage"

function NewsCard({ name, description, url, sentiment_score, image }: { name: string, description: string, url: string, sentiment_score: any, image: any }) {
  const scores = sentiment_score;
  return (
    <Card>
      <NewsThumbnailImage {...image} />
      <Card.Header>
        <Card.Title>
          <a href={url}>
            {name}
          </a>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <footer>
          <div>

          </div>
          {scores ?
            <>
              <Badge bg="secondary">Positivity Score: {scores.pos * 100}%</Badge>
              <Badge bg="secondary">Negativity Score: {scores.neg * 100}%</Badge>
              <Badge bg="secondary">Neutrality Score: {scores.neu * 100}%</Badge>
            </>
            : ""
          }
        </footer>
      </Card.Body>
    </Card >);
}

export default NewsCard;
