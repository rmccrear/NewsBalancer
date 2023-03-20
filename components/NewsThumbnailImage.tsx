import Card from "react-bootstrap/Card"

function NewsThumbnailImage(props: any) {
  const src = props.thumbnail.contentUrl;
  const { height, width } = props.thumbnail;
  return (
    <Card.Img variant="top" src={src} height={height} width={width} />
  );
}

export default NewsThumbnailImage;
