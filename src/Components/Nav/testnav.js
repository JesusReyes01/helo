import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import './Nav.css';
import {clearUser} from '../../ducks/reducer'
import axios from 'axios'



class Nav extends Component {
    
    componentDidUpdate(){
        if(!this.props.user.username){
            this.props.history.push('/') 
        }
    }

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/')
            
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div className='nav-bar'>
                <div>{this.props.user.username}</div>
                <img 
                    className='profile-picture'
                    src={this.props.user.profile_picture}
                    alt={this.props.user.username}/>
                
                <Link to='/dashboard'>Home</Link>
                <Link to='/new'>New Post</Link>
                <Link onClick={this.handleLogout}>Logout</Link>
                
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Nav);