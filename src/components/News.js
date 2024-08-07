import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {
    const { isDark, articles, setArticles } = props;
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        try {
            props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

            setLoading(true)
            let response = await fetch(url);
            props.setProgress(35);
            let data = await response.json();
            setArticles(data.articles);
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
    }, [])

    return (
        <div className='container my-3'>
            <h2 className='text-center'>Top headlines {props.head}</h2>
            {loading && <Spinner />}
            <div className='row'>
                {articles.map((e, index) => (
                    <div className='col-md-4' key={index}>
                        <NewsItem
                            title={e.title ? e.title.slice(0, 44) : ""}
                            description={e.description ? e.description.slice(0, 88) : ""}
                            imageurl={e.urlToImage ? e.urlToImage : 'default_image_url'}
                            readUrl={e.url}
                            author={e.author ? e.author : 'Unknown'}
                            publishedAt={e.publishedAt ? e.publishedAt : 'not available'}
                            isDark={isDark}
                        />
                    </div>
                ))}
            </div>
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
    setProgress: PropTypes.func.isRequired,
    apikey: PropTypes.string.isRequired,
    isDark: PropTypes.bool.isRequired,
    articles: PropTypes.array.isRequired,
    setArticles: PropTypes.func.isRequired
};

export default News;
