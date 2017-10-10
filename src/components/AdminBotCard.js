import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import { apiService, linkBuilder } from '../actions/index.js';
import logo from '../assets/botbot-logo.png';
import { logoutUser } from '../actions/users';
import { requestBots, responseBots } from '../actions/admin.js';

export class AdminBotCard extends Component {

	constructor (props) {
      super(props);
  }


	render () {
    var procStyle = {
      'marginLeft': '20px',
    }
    if(this.props.bot.deploy_status == "failed") {
      var statusWrap = {
        'color': 'red',
        'font-weight': 'bold',
      };
    } else {
      var statusWrap = {
        'color': 'green',
        'font-weight': 'bold',
      };
    }
    let procData = null;
    if(!!this.props.bot.process_data) {
      let outLink = linkBuilder(`bot/admin/${this.props.bot.uuid}/outputlogs`);
      let errLink = linkBuilder(`bot/admin/${this.props.bot.uuid}/errorlogs`);
      let createDate = new Date(this.props.bot.process_data.creation_time).toUTCString();
      let uptimeStamp = new Date(this.props.bot.process_data.uptime).toUTCString();
      let memoryConverted = (this.props.bot.process_data.memory_usage*(1/1048576)).toFixed(2);
      procData = (
        <div style={procStyle}>
          pm2 state: {this.props.bot.process_data.status} <br/>
          creation time: {createDate} <br/>
          uptime: {uptimeStamp} <br/>
          crash count: {this.props.bot.process_data.crash_count} <br/>
          restart count: {this.props.bot.process_data.restart_count} <br/>
          memory: {memoryConverted} MB <br/>
          cpu: {this.props.bot.process_data.cpu_usage} <br/>
          stdout path: <a href={outLink}>{this.props.bot.process_data.output_log_path}</a> <br/>
          stderr path: <a href={errLink}>{this.props.bot.process_data.error_log_path}</a> <br/>
        </div>
      )
    }
		return (
			<div>
        id: {this.props.bot.id} <br/>
        uuid: {this.props.bot.uuid}<br/>
        port: {this.props.bot.port}<br/>
        Current Deploy Status: <span style={statusWrap}>{this.props.bot.deploy_status}</span><br/>
        {procData}
			</div>
		);
	}
}



function mapStateToProps (state) {
    return {
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminBotCard);
