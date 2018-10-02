import React, { Component } from 'react'
import './News.css';
import axios from 'axios'

const news = require('../../assets/news_1.png')

class News extends Component {
    constructor() {
        super();
        this.state = {
            resultsPerPage: 5,
            currentPage: 0,
            newsData: [],
            newsDataThisPage: [],
            category: '',
            noMoreResults: false
        }
    }

    componentDidMount() {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=40`).then(results => {
            this.setState({
                newsData: results.data.articles
            },
                () => {
                    this.nextPage()
                })
        })
    }
    updateNewsCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }
    getNewsByCategory = () => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=40&category=${this.state.category}`).then(result => {
            this.setState({
                newsData: result.data.articles
            }, () => {
                this.loadPage()
            })
        })
    }

    loadPage = () => {
        let results = [];
        let start = ((this.state.currentPage) * this.state.resultsPerPage);
        let end = ((this.state.currentPage + 1) * this.state.resultsPerPage);
        end = (end > this.state.newsData.length ? this.state.newsData.length : end);
        for (let i = start; i < end; i++) {
            results.push(
                this.state.newsData[i]
            )
            this.setState({
                newsDataThisPage: results,
                currentPage: 0
            })
        }
    }

    nextPage = () => {
        if(this.state.currentPage === 4) {
            this.setState({
                noMoreResults: true
            })
        }
        let results = [];
        let start = ((this.state.currentPage) * this.state.resultsPerPage);
        let end = ((this.state.currentPage + 1) * this.state.resultsPerPage);
        end = (end > this.state.newsData.length ? this.state.newsData.length : end);
        for (let i = start; i < end; i++) {
            results.push(
                this.state.newsData[i]
            )
            this.setState({
                newsDataThisPage: results,
                currentPage: this.state.currentPage + 1
            })
        }
    }


    render() {
        return (
            <div className="content-container">
                <div className="news-content">
                    <h1>Top Headlines Today</h1>
                    <p>Category: </p><select onChange={this.updateNewsCategory} placeholder="category">
                        <option value="" disabled selected hidden>select</option>
                        <option value="business">business</option>
                        <option value="entertainment">entertainment</option>
                        <option value="general">general</option>
                        <option value="health">health</option>
                        <option value="science">science</option>
                        <option value="sport">sports</option>
                        <option value="technology">technology</option>
                    </select>
                    <button onClick={this.getNewsByCategory}>Go</button>
                    {this.state.noMoreResults && <p className="news-no-more">That's it! Go focus.</p>}
                    <i className="far fa-arrow-alt-circle-right next-button" onMouseDown={this.nextPage}></i>
                </div>
                <div className="content-container-news-sub">
                    {this.state.newsDataThisPage.map(articles => {
                        return (
                            <div className="article-box">
                                <a href={articles.url} target="_blank"><img className="articles-image" src={articles.urlToImage || news} /></a>
                                <div className="article-title-and-content">
                                    <a href={articles.url} target="_blank" className="articles-title"><h2 className="articles-title">{articles.title}</h2></a>
                                    <p>{articles.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}





export default News