import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import '../assets/dashboard.css';


export class Feedback extends Component {

	constructor (props) {
        super(props);
        this.state = {
			feedback: [],
			newCategory: '',
            currentFeedback: []
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

        this.toggleFeedback(1);
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

    getFeedbackForCategory = (id) => {
        apiService('feedback', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    if (json.feedback) {
                        for (var i in json.feedback) {
                            if (json.feedback[i]["id"] === id) {
                                this.setState({ currentFeedback: json.feedback[i]["feedback"] });
                            }
                        }
                    }
                }
        })
    }

    deleteFeedbackCategory = (id) => {
        let form = new FormData();
        form.append('id', id);

        apiService('feedback/category/delete', {
            method: 'POST',
            body: form
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.message === 'success') {
                    var newFeedback = this.state.feedback.filter(function(el) {
                        return el.id !== id;
                    });

                    this.setState({feedback: newFeedback})

                }
        })
    }

    toggleFeedback(enabled) {
        let form = new FormData();
        form.append('feature_name', 'feedback_enabled');
        form.append('enabled', enabled);

        apiService('bot/toggleFeature', {
            method: 'POST',
            body: form
        }).then((res) => {
            if (!enabled) this.props.history.push('/dashboard');
        });
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />
                <div id="dashboard">
                    <div className="row">
			         <h3>Feedback</h3>

			    <div className="feedback-form">
			    	<ul className="feedback-buttons">
			    		{this.state.feedback.map(function(feedbackValue, index){
            				return (
                                <li key={feedbackValue.id}><button onClick={() => this.getFeedbackForCategory(feedbackValue.id)}>{feedbackValue.text}</button><span onClick={() => this.deleteFeedbackCategory(feedbackValue.id)}>x</span></li>
                            );
          				}, this)}
                        <div className="clear"></div>
			    	</ul>
                    <ul className={(this.state.currentFeedback.length > 0) ? "current-feedback" : "hidden"}>
                        {this.state.currentFeedback.map(function(feedbackValue, index){
                            return (
                                <li key={feedbackValue.id}>{feedbackValue.message}</li>
                            );
                        }, this)}
                    </ul>
				    <form onSubmit={this.addFeedbackCategory}>
					    <input className="feedback-input" type="text" name="feedback" placeholder="New Feedback Category" ref="feedbackCategory" />
					    <input className="add-button" type="submit" value="+" />
				    </form>
			    </div>

                <button onClick={() => this.toggleFeedback(0)}>Disable Feedback</button><br/>
                <a href="./dashboard">Dashboard</a><br/>

                </div>
                </div>

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