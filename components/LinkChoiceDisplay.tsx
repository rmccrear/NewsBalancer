import React, { MouseEvent } from 'react';
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import NewsCard from "./NewsCard";
import Logo from './Logo';
import { type Article } from "../lib/models";


function LinkChoiceDisplay(props: any) {
    const { article } : {article: Article}= props;
    const articleOpp : Article | undefined = article.opposing_views?.[0];
    const handleClose = props.handleClose || (() => { });
    const visible = props.visible || false;
    const handleHide = () => {
        handleClose();
    };
    const handleClickArticle = () => {
        window.location.href = article.url;
    }
    const handleClickOpposingArticle = () => {
        if(articleOpp)
            window.location.href = articleOpp.url;
    }
    return (
        <Modal show={visible} onHide={handleHide}>
            <Modal.Header closeButton>
                <Logo />
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3}>
                    <NewsCard {...article} handleClickArticle={handleClickArticle} />
                    <h3>Opposing Viewpoint</h3>
                    {
                        articleOpp && <NewsCard {...articleOpp} handleClickArticle={handleClickOpposingArticle} />
                    }
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default LinkChoiceDisplay;
