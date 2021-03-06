import React, {Fragment, Component } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired
    }
    render() {
        const {name, 
            avatar_url, 
            location, 
            bio, 
            blog,
            login,
            html_url,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;
        const {loading, repos} = this.props;
        if(loading) return <Spinner/>
        return (
            <Fragment >
                <Link to='/' className='btn btn-light'>
                    Go back
                </Link>
                Hireable: {''}
        {hireable? <i className="fas fa-check text-success"/>: <i className="fas fa-times-circle text-danger" /> }
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{width:'200px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location} </p>
                </div> 
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>)}
                    <a href={html_url} className="btn btn-dark my-1">
                        See profile
                    </a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                    <strong>Username:</strong>{login}
                                </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                    <strong>Website:</strong>{blog}
                                </Fragment>}
                        </li>
                    </ul>

                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Public Repos: {public_repos}</div>
                <div className='badge badge-success'>Public gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
            </Fragment> 
        ); 
    }
}

export default User;
