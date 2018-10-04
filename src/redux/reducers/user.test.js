import * as actions from './user'
import * as types from './user'

describe('user reducer actions/types', () => {
  const user = {id: 1}
  it('should get the current user', () => {
    const expected = {
      type: types.GET_USER_FULFILLED,
      payload: user
    }
    expect(actions.getCurrentUser()).toEqual(expected);
  })
})