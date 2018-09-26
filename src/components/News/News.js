import React,{Component} from 'react'
import './News.css';
import axios from 'axios'

const plus = require('../../assets/plus.png')

class News extends Component{
    constructor(){
        super();
        this.state={
            resultsPerPage: 5,
            currentPage: 0,
            newsData : [],
            newsDataThisPage: [],
        }
    }

    componentDidMount(){
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`).then(results => {
        this.setState({
                newsData: results.data.articles
            },
            () => {
                this.nextPage()
                console.log('hit')
            })
        })
    }

    nextPage=()=>{
        let results = [];
        let start = ((this.state.currentPage) * this.state.resultsPerPage);
        let end = ((this.state.currentPage + 1) * this.state.resultsPerPage);
        end = (end > this.state.newsData.length ? this.state.newsData.length : end);
        for(let i = start; i < end; i++) {
            results.push(
                this.state.newsData[i]
            )
            this.setState({
                newsDataThisPage: results,
                currentPage: this.state.currentPage + 1
            })
        }
    }
    
    
    render(){


        let articlesRender;
        articlesRender = this.state.newsDataThisPage.map(articles => {
            return(
                <div className="article-box">
                        <img className="articles-image" src={articles.urlToImage}/>
                        <div className="article-title-and-content">
                            <a href={articles.url}><h1>{articles.title}</h1></a>
                            <p>{articles.description}</p>
                        </div>
                </div>
            )
        })




        return(
         <div className="content-container">  
            <img onClick={this.nextPage} src={plus} className="next-button"/>
            <div className="content-container-news-sub">
                {articlesRender}
            </div>
         </div> 

        ) 
    }
}





export default News