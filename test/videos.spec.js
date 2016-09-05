import expect from 'expect'
import reducer from '../client/js/reducers/videos'

describe('videos reducers', () => {
	it('should handle GET_VIDEOS and return 10 videos for initial state', () => {
		expect(
			reducer([], {
				type: 'GET_VIDEOS',
				videos: [1,2,3,4,5,6,7,8,9,10]
			})
		).toEqual(
			[1,2,3,4,5,6,7,8,9,10]
		)
	})

	it('should handle LOGOUT and return 0 videos', () => {
		expect(
			reducer([], {
				type: 'LOGOUT',
				videos: [1,2,3,4,5,6,7,8,9,10]
			})
		).toEqual(
			[]
		)
	})

	it('should handle RATE and return videos with a single video updated at the given index', () => {
		expect(
			reducer([1,2,3,4,5,6,7,8,9,10], {
				type: 'RATE',
				video: 9999,
				index: 2
			})
		).toEqual(
			[1,2,9999,4,5,6,7,8,9,10]
		)
	})
})