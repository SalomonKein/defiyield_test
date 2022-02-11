import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './app.scss'
import NewsCommentsList from "./pages/NewsCommentsList";
import NewsList from "./pages/NewsList";

const App = () => {

    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<NewsList />} />
                    <Route path="/comments/:id" element={<NewsCommentsList />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App