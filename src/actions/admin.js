export const BOTS_REQUEST = 'BOTS_REQUEST';
export const BOTS_RESPONSE = 'BOTS_RESPONSE';


export function requestBots() {
	return {
    type: BOTS_REQUEST
  }
}

export function responseBots(json) {
	return {
    type: BOTS_RESPONSE,
    json: json,
  }
}
