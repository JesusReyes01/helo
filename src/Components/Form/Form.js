import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img: '',
            content: '',

        }
    }

    componentDidMount(){
        if(!this.props.user.username){
            this.props.history.push('/')
        }
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        const {title, img, content} = this.state;
        const {user_id} = this.props.user;
        
        axios
            .post('/api/posts/create', {title, img, content, user_id})
            .then(() => this.props.history.push('/dashboard'))
            .catch(err => console.log(err))
    }

    render(){

        let {title, img, content} = this.state
        
        return(
            <div>
                <h1>New Post</h1>

                <section>
                    <p>Title:</p>
                    <input
                        name='title'
                        value={title}
                        onChange={this.handleInputChange}/>
                </section>

                <img src={img} alt='Post-img' />

                <section>
                <input
                    name='img'
                    value={img}
                    onChange={this.handleInputChange}/>
                </section>

                <section>
                    <input
                        name='content'
                        value={content}
                        onChange={this.handleInputChange}/>
                </section>
                <button onClick={this.handleSubmit}>POST</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Form);