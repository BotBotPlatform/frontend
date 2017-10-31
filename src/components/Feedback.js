import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';


export class Feedback extends Component {

	constructor (props) {
        super(props);
        this.state = {
			feedback: [],
			newCategory: ''
		};
    }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

	componentWillMount() {
		apiService('feedback', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                	if (json.feedback) {
                		for (var i in json.feedback) {
                			var fb = {};
                			fb.id = json.feedback[i]["id"];
                			fb.text = json.feedback[i]["name"];
                			this.setState({ feedback: this.state.feedback.concat([fb]) });
                		}
                	}
                }
        })
	}

	addFeedbackCategory = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('name', data.target.feedback.value);
    	return apiService('feedback/category', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			this.refs.feedbackCategory.value = '';
	            var fb = {};
    			fb.id = json.category["id"];
    			fb.text = json.category["name"];

    			this.setState({ feedback: this.state.feedback.concat([fb]) });

    		})
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />
			    Feedback<br/><br/>

			    <div className="feedback-form">
			    	<ul>
			    		{this.state.feedback.map(function(feedbackValue){
            				return <li key={feedbackValue.id}>{feedbackValue.text}</li>;
          				})}
			    	</ul>
				    <form onSubmit={this.addFeedbackCategory}>
					    <input className="feedback-input" type="text" name="feedback" placeholder="Feedback Category" ref="feedbackCategory" /><br/>
					    <input className="add-button" type="submit" value="Add +" />
				    </form>
			    </div>

			    <a href="#" onClick={this.handleLogout}>Logout</a><br/>


			    

			</div>
		);
	}
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	logoutUser: () => {
	        dispatch(logoutUser());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);