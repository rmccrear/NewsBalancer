import { Container } from "react-bootstrap";
import Logo from "./Logo";

const style = {
    blurb: {
        margin: "0em auto 1em",
        color: "#000034"
    }
}

function HeroContainer() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
        {/*
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center">Welcome to the <span className="text-primary">News</span> <span className="text-danger">Sentiment</span> <span className="text-warning">Analyzer</span></h1>
            <p className="text-center">This is a simple web app that uses the Microsoft Azure Cognitive Services Text Analytics API to analyze the sentiment of news articles.</p>
        </div>
        */}
        <div>
            <Logo />
        </div>
        <div style={style.blurb}>
            Find opposing viewpoints in the news.
        </div>
    </Container>
  );
}

export default HeroContainer;