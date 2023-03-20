import React, { useState, MouseEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card"
import InputGroup from 'react-bootstrap/InputGroup';

const style = {
    form: {
        margin: "0 1em",
    }
}

function SearchBar({doSearch}: {doSearch: Function}) {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    return (
        <Card className="border-0">
          <Form style={style.form}>
          <InputGroup>
              <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text id="basic-addon1"
                  onClick={(e: MouseEvent) => doSearch(searchTerm)}
              >Search</InputGroup.Text>
          </InputGroup>
          </Form>
        </Card>
    );
}

export default SearchBar;
