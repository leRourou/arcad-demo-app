/**
 * Represents an article info.
 * @class
 * @category Models
 * @property {number} id - The article info ID.
 * @property {string} content - The article info content.
 */

export class ArticleInfo {

    /**
     * @constructor
     * @param {Object} articleInfo - The article info data as an object just like it is in the database.
     */
    constructor(articleInfo) {
        this.id = articleInfo.ARTICLE_INFO_ID
        this.content = articleInfo.ARTICLE_INFORMATION
    }

/**
   * @method
   * @param {ArticleInfo} ArticleInfo - The article data.
   * @returns {Object} - The article info data in the format required by the API.
   * @description - This method is used to convert an article object into the format required by the API.
   */
    static reverse(articleInfo) {
        return {
            ARTICLE_INFO_ID: articleInfo.id,
            ARTICLE_INFORMATION: articleInfo.content
        }
    }

}