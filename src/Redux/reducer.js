import * as actions from './actionTypes';
export default function modalReducer (state =0,action){
    switch(action.type)
    {
       
case actions.open__Modal:
return action.movie;

default :
return false;
    }
}