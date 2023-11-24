import React from 'react';

const MoreDetails = ({ noticia }) => {
    const { author, content, description, publishedAt, source, title, url, urlToImage } = noticia;

    return (
        <div>
            <h2>{source.name}</h2>
            <h3>{title}</h3>
            <p>By {author}</p>
            <p>Published on: {publishedAt}</p>
            <img src={urlToImage} alt={title} />
            <p>{description}</p>
            <p>Read more at: <a href={url}>{source.name}</a></p>
        </div>
    );
}

export default MoreDetails;
