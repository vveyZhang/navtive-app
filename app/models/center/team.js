import { request } from '../../utils/request';

import { NavigationActions, delay } from '../../utils/index'


export default {
    namespace: 'team',
    state: {
        index: 'pageOne',
        loading: true,
        stack: {
            pageOne: [],
            pageTwo: []
        },
        agent_id:''
    },
    reducers: {
        loading(state, { payload }) {
            return { ...state, ...payload }
        },
        intoStack(state, { payload }) {
            const { index, loading, agent ,  agent_id} = payload;
            return {
                ...state,
                index: index,
                loading: loading,
                agent_id,
                stack: {
                    ...state.stack,
                    [index]: [...state.stack[index], agent]
                }
            }
        },
        outStack(state, { index }) {
            const length = state.stack[index].length;
            const cuurentStack = state.stack[index].slice(0, length - 1);
            return {
                ...state,
                stack: {
                    ...state.stack,
                    [index]: cuurentStack
                }
            }
        }
    },
    effects: {
        *queryAgent({ team }, { call, put, select }) {
            yield put({
                type: 'loading', payload: {
                    loading: true
                }
            })

            const data = yield call(request, {
                url: '/agent/group',
                data: {
                    agent_id: team.agent_id
                }
            })
            if (data.error.ErrorCode != 0) return 
            const agent = yield select(state => state.agent)

            const payload = {
                index: team.index,
                loading: false,
                agent: {
                    agent: data.agent,
                    agents: data.agents,
                    master: data.master,
                    isMine: agent.agent.id == team.agent_id ? true : false,
                },
                agent_id:agent.agent.id
            }
            yield put({ type: 'intoStack', payload })
        },
        *delayOutStack({ index }, { call, put }) {
            yield call(delay, 500);
            yield put({ type: 'outStack', index: index })
        }
    },
    subscriptions: {},
};
