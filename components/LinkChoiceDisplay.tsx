import React, { MouseEvent } from 'react';
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import NewsCard from "./NewsCard";
import { type Article } from "../lib/models";


function LinkChoiceDisplay(props: any) {
    const { article } : {article: Article}= props;
    const articleOpp : Article | undefined = article.opposing_views?.[0];
    const handleClose = props.handleClose || (() => { });
    const visible = props.visible || false;
    const handleClickArticle = () => {
        window.location.href = article.url;
    }
    const handleClickOpposingArticle = () => {
        if(articleOpp)
            window.location.href = articleOpp.url;
    }
    return (
        <Modal show={visible}>
            <Modal.Header>
                <Modal.Title>Opposing Viewpoints<span onClick={handleClose} style={{float: "right"}}>[X]</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3}>
                    <NewsCard {...article} handleClickArticle={handleClickArticle} />
                    <h2>Opposing Viewpoint</h2>
                    {
                        articleOpp && <NewsCard {...articleOpp} handleClickArticle={handleClickOpposingArticle} />
                    }
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default LinkChoiceDisplay;
