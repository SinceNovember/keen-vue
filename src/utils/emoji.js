import data from '@/assets/js/emoji-data'
let emojiData = {}
Object.values(data).forEach(item => {
  emojiData = { ...emojiData, ...item }
})

/**
 *
 *
 * @export
 * @param {string} value
 * @returns {string}
 */

export function getEmoji(value) {
  if (!value) return
  Object.keys(emojiData).forEach(item => {
    value = value.replace(new RegExp(item, 'g'), emojiData[item])
  })
  return value
}
