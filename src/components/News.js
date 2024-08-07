import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {
    const { isDark, articles, setArticles } = props;
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        try {
            props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

            setLoading(true);
            let response = await fetch(url);
            props.setProgress(35);
            let data = await response.json();
            setArticles(data.articles.filter(article => article.urlToImage));
            setTotalResults(data.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsPaper`;
        updateNews();
        //eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let response = await fetch(url);
        let data = await response.json();
        //if urlImage is not null
        // setArticles(articles.concat(data.articles.filter(article => article.urlToImage)));
        setArticles(data.articles);
        setTotalResults(data.totalResults);
    };

    return (
        <div className='container my-3'>
            <h2 className='text-center' id='heading'>Top headlines{props.head}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((e) => (
                            <div className='col-md-4' key={e.url}>
                                <NewsItem
                                    title={e.title ? e.title.slice(0, 44) : ""}
                                    description={e.description ? e.description.slice(0, 88) : ""}
                                    imageurl={e.urlToImage}
                                    readUrl={e.url}
                                    author={e.author ? e.author : 'Unknown'}
                                    publishedAt={e.publishedAt ? e.publishedAt : 'not available'} 
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
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
    head: ''
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    head: PropTypes.string,
    isDark: PropTypes.bool,
    articles: PropTypes.array,
    setArticles: PropTypes.func,
    apikey: PropTypes.string,
    setProgress: PropTypes.func
};

export default News;
