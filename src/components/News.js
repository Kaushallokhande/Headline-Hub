import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import { AppContext } from '../App';

const News = ({ category = 'general', head = '' }) => {
    const { isDark, articles, setArticles, apikey, country, pageSize, setProgress } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        try {
            setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
            setLoading(true);
            const response = await fetch(url);
            setProgress(35);
            const data = await response.json();
            setArticles(data.articles);
            setTotalResults(data.totalResults);
            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsPaper`;
        updateNews();
        // eslint-disable-next-line
    }, [category]);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${nextPage}&pageSize=${pageSize}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(prevArticles => prevArticles.concat(data.articles));
        setTotalResults(data.totalResults);
    };

    return (
        <div className='container my-3'>
            <h2 className='text-center' id='heading'>Top headlines {head}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((e) => (
                            <div className='col-md-4' key={e.url}>
                                <NewsItem
                                    title={e.title ? e.title.slice(0, 44) : ""}
                                    description={e.description ? e.description.slice(0, 88) : ""}
                                    imageurl={e.urlToImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMoAAACUCAMAAADlP0YdAAAAXVBMVEXDw8MAAADKysqGhobHx8dycnJtbW2lpaXOzs4oKCglJSViYmK9vb1qampPT0+wsLCQkJCWlpadnZ0bGxsKCgo8PDxGRkaAgIBcXFwSEhJUVFQ2NjZ5eXkwMDAXFxcUuSY4AAAB60lEQVR4nO3Y226jMBRAUeIcCqGAXXJp0qb9/88ch8skXEY1fZgcS3s9VZEqeQtsbCcJAAAAAAAAAAAAAAAAAAAAAHVMvpYxzx7zsjKtXtZKy2ePeonZbn5hq/G5+JR6u1KtNiWVlVK9Ke0ffoih/6M7RZKssaHjU51i7MeuOLrAAWpOEXu8rUuHwBbVKe/dGvsR9r3QnJJUXcqnDZr6qlOuXcppnmLMvE5zimT7NuU6H/bbSzb7UXNKIq7wJWk5HbX4bc1+1qI6xa9hbtsks5L2aX1OFwPdKbeP/exFEuneuzof/648ZYm8Lm+E40sxbtjTT6ZLdClid3/PJ6fRghBHyn3GSHl8OGudo0sx1g1fybwanRsft2cxpBi/rew3L/nb+Ai8fzgCRJAiZe0HvbuliP2aHOfr+3SJIKXfVVZ+zG3UWBVRSt4vvgcnJl24ZnHDl1J9ipSHfsxfNlso2RyGV0x7iiT3xfe0VLLZHPtNmvqUpXdq4hpFijSXn1O+m7ZFd4qUASXDdFGe8o/pMXVSnzJcufzsXXSnmOw7NOW231ecIrYILfH7Gqv5+tu482uwszOKU4Kv8DuKn8qlWOmiM0WaYrda0ax8kP+HZL+gsqS7AVvr2WMGAAAAAAAAAAAAAAAAAADAs/0B6LcaZlErLnYAAAAASUVORK5CYII='}
                                    readUrl={e.url}
                                    author={e.author || 'Unknown'}
                                    publishedAt={e.publishedAt || 'not available'}
                                    isDark={isDark}
                                />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.propTypes = {
    category: PropTypes.string,
    head: PropTypes.string
};

export default News;
