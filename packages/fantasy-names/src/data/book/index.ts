// @ts-nocheck
import book from './book.json'
import bookPostfix from './postfix.json'
import bookPrefix from './prefix.json'

const bookPrefixStrings = Object.values(bookPrefix).flat(1)
const bookPostfixStrings = Object.values(bookPostfix).flat(1)

export {
    book,
    bookPostfix,
    bookPrefix,
    bookPrefixStrings,
    bookPostfixStrings
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    book,
    bookPostfix,
    bookPrefix
}