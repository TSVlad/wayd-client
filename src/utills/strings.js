const getTextWithoutTags = (str) => str.replace(/<\/?[^>]+(>|$)/g, "")

export {getTextWithoutTags}