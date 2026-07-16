import cloudinaryOptimize from '../../utils/cloudinary-optimize'

describe('cloudinaryOptimize', () => {
  const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'

  test('inserts transformation params into upload URL', () => {
    const result = cloudinaryOptimize(url)
    expect(result).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_400,f_auto,q_auto/sample.jpg',
    )
  })

  test('uses custom width when provided', () => {
    const result = cloudinaryOptimize(url, 800)
    expect(result).toContain('w_800')
  })

  test('returns original url if it does not contain /upload/', () => {
    const nonCloudinary = 'https://example.com/image.jpg'
    expect(cloudinaryOptimize(nonCloudinary)).toBe(nonCloudinary)
  })

  test('returns url unchanged when null is passed', () => {
    expect(cloudinaryOptimize(null)).toBeNull()
  })

  test('returns url unchanged when undefined is passed', () => {
    expect(cloudinaryOptimize(undefined)).toBeUndefined()
  })
})