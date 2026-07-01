import unavatar from '@unavatar/core'

export default async function handler(req, res) {
  const { provider, id } = req.query

  try {
    const result = await unavatar.resolve(id, provider)

    if (!result?.url) {
      return res.status(404).json({
        success: false,
        error: 'Avatar not found'
      })
    }

    return res.redirect(result.url)
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
