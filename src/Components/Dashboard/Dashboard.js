import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom';
import './Dashboard.css';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            myPost: true,
            posts: []
        }
    }

    componentDidMount(){
        if(!this.props.user.username){
            this.props.history.push('/')
        }
        else{
            this.getPost();
        }
    }
    getPost = () => {
        //testing getPost with all
        // axios.get('/api/posts')
        // .then(res => this.setState ({posts: res.data}))
        // .catch(err => console.log('get request failed'))
        
        const {myPost, search} = this.state;
        axios.get(`/api/posts/${myPost}?search=${search}`)
        .then(res => this.setState({posts: res.data, search: ''}))
        .catch(err => console.log(err))
        

    }

    handleSearch = (val) => {
        this.setState({search: val})
    }

    handleCheckboxChange = (val) => {
        this.setState({ myPost: !this.state.myPost})
        // this.getPost(); cycle is off with this included
    }

    resetSearch = () => {
        this.setState({search: ''})
        this.getPost();
    }

    render(){
        let mappedPosts = this.state.posts.map( el => {
            return (

            <Link to={`/post/${el.post_id}`} key={el.post_id} >
                <div className='dash-post-flex'>
                    <div className='dash-item-flex'>
                        <h3 className='title'>{el.title}</h3>
                        <div className='author-flex'>
                            <p className='username-position'>by {el.username}</p>
                            <img src={el.profile_picture} alt='author' />
                        </div>
                    </div>
                </div>    
            </Link>
            )}
            )
        return(
            <div>
                <div className='search-flex'>
                    <input
                        type='text'
                        name='search'
                        onChange={e => this.handleSearch(e.target.value)}
                        placeholder='Search by Title'
                        ></input>
                    <button onClick={this.getPost} className='search-button'>Search</button>
                    <button onClick={this.resetSearch} className='reset-button'>Reset</button>
                    <p>My Post:</p>
                    <input 
                        checked={this.state.myPost} 
                        onChange={_ => this.handleCheckboxChange()} 
                        type='checkbox' />
                </div>
                <div className='post-table'>
                    {mappedPosts}
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);