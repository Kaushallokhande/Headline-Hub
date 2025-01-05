import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import tempData from '../tempData.json';
import { AppContext } from '../App';

const News = ({ category = 'general', head = '' }) => {
    const { isDark, articles, setArticles, apikey, country, pageSize, setProgress } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const updateNews = async () => {
        try {
            setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
            setLoading(true);
            const response = await fetch(url);
            setProgress(35);
            const data = await response.json();

            if (data && data.articles) {
                setArticles(data.articles);
                setTotalResults(data.totalResults);
            } else {
                throw new Error("Failed to fetch articles");
            }

            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.warn(`Using fallback data for category: ${category}`);
            const fallbackCategory = tempData[category] || { articles: [], totalResults: 0 };
            setArticles(fallbackCategory.articles);
            setTotalResults(fallbackCategory.totalResults);
            setLoading(false);
            setProgress(100);
        }
    };

    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;
            setPage(nextPage);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${nextPage}&pageSize=${pageSize}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.articles) {
                setArticles(prevArticles => prevArticles.concat(data.articles));
                setTotalResults(data.totalResults);
            } else {
                throw new Error("Failed to fetch more articles");
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
            console.warn(`Using fallback data for category: ${category}`);
            const fallbackCategory = tempData[category] || { articles: [] };
            setArticles(prevArticles => prevArticles.concat(fallbackCategory.articles));
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsPaper`;
        updateNews();
        // eslint-disable-next-line
    }, [category]);

    return (
        <div className='container my-3'>
            <h2 className='text-center' id='heading'>Top headlines {head}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length || 0}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((e, index) => (
                            <div className='col-md-4' key={index}>
                                <NewsItem
                                    title={e.title ? e.title.slice(0, 44) : ""}
                                    description={e.description ? e.description.slice(0, 88) : ""}
                                    imageurl={e.urlToImage || 'default-image-url'}
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
