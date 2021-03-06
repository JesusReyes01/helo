import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import './Nav.css';
import {clearUser} from '../../ducks/reducer'




class Nav extends Component {
    
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
                <Link to='/' onClick={this.props.clearUser}>Logout</Link>
                
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Nav);