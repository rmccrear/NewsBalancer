import { FunctionComponent } from "react";
import Nav from 'react-bootstrap/Nav';

interface NewsTabsProps {
    handleSelect: Function
}
 
const NewsTabs: FunctionComponent<NewsTabsProps> = ({handleSelect}) => {
    const newsTypes : Record<string, string> = {
        "U.S.": "US news",
        "World": "world news",
        "Sports": "sports news",
        "Entertainment": "entertainment news",
        "Business": "business news",
        "Tech": "technology news"
    };
    return ( 
    <Nav onSelect={(searchTerm) => handleSelect(searchTerm)} className="justify-content-center">
        {Object.keys(newsTypes).map( (newsTopic) => ( 
          <Nav.Item>
              <Nav.Link eventKey={newsTypes[newsTopic]}>
                {newsTopic}
              </Nav.Link>
          </Nav.Item>
        ))}
    </Nav> );
}
 
export default NewsTabs;