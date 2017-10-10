import jwtDecode from 'jwt-decode';

import {
    BOTS_REQUEST,
    BOTS_RESPONSE,
} from '../actions/admin';

const INITIAL_STATE = {
    bots: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case BOTS_REQUEST:
            return { ...state,
                bots: null
            };
        case BOTS_RESPONSE:
            return { ...state,
              bots: action.json
            }
        default:
            return state;
    }
}
