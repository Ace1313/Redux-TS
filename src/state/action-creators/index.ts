import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Dispatch } from 'redux';

const URL = 'https://registry.npmjs.org/-/v1/search';

export const searchRepositories = (term: string) => {
   return async (dispatch: Dispatch<Action>) => {
      dispatch({ type: ActionType.SEARCH_REPOSITORIES });

      try {
         const { data } = await axios.get(URL, {
            params: {
               text: term,
            },
         });

         const names = data.objects.map((result: any) => {
            return result.package.name;
         });

         dispatch({
            type: ActionType.SEARCH_REPOSITORIES_SUCCES,
            payload: names,
         });
      } catch (err) {
         dispatch({
            type: ActionType.SEARCH_REPOSITORIES_ERROR,
            payload: err.message,
         });
      }
   };
};
