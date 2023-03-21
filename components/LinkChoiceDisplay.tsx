import React, { MouseEvent } from 'react';
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import NewsCardArticleView from "./NewsCardArticleView";
import NewsCardOpposingView from "./NewsCardOpposingView";
import Logo from './Logo';
import { type Article } from "../lib/models";


function LinkChoiceDisplay({article, handleClose, visible} : {article: Article, handleClose: Function, visible: boolean}) {
    const articleOpp : Article | undefined = article.opposing_views?.[0];
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
                    <NewsCardArticleView {...article} handleClickArticle={handleClickArticle} />
                    {
                        articleOpp && <NewsCardOpposingView {...articleOpp} handleClickArticle={handleClickOpposingArticle} />
                    }
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default LinkChoiceDisplay;
