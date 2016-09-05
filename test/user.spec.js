import expect from 'expect'
import reducer from '../client/js/reducers/user'

describe('user reducers', () => {
	it('should handle LOGIN and return username and password', () => {
		expect(
			reducer([], {
				type: 'LOGIN',
				username: 'ali',
				sessionId: 'testsessionid'
			})
		).toEqual(
			{
				username: 'ali',
				sessionId: 'testsessionid'
			}
		)
	})

	it('should handle LOGIN_ERROR and return error message', () => {
		expect(
			reducer([], {
				type: 'LOGIN_ERROR',
				error: 'invalid username or password'
			})
		).toEqual(
			{
				login_error: 'invalid username or password'
			}
		)
	})

	it('should handle LOGOUT and return empty username and sessionId', () => {
		expect(
			reducer([], {
				type: 'LOGOUT'
			})
		).toEqual(
			{
				username: '',
				sessionId: ''
			}
		)
	})
})