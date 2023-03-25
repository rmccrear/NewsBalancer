import React, { useState, MouseEvent, FormEvent, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card"
import InputGroup from 'react-bootstrap/InputGroup';

const style = {
    form: {
        margin: "0 1em",
    }
}

function SearchBar({doSearch, resetSearchTerm}: {doSearch: Function, resetSearchTerm: string}) {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        doSearch(searchTerm);
    } 
    useEffect(()=>{
        setSearchTerm(resetSearchTerm)
    }, [resetSearchTerm])
    return (
        <Card className="border-0">
          <Form style={style.form} onSubmit={handleSubmit}>
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
