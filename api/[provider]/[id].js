const unavatarCore = require('../../src/index.js')

const unavatar = unavatarCore()

module.exports = async function handler (req, res) {
  const { provider, id } = req.query

  try {
    if (!unavatar[provider]) {
      return res.status(404).json({
        success: false,
        error: `Unknown provider: ${provider}`
      })
    }

    const result = await unavatar[provider](id)

    if (!result?.data) {
      return res.status(404).json({
        success: false,
        error: 'Avatar not found'
      })
    }

    return res.redirect(result.data)
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
