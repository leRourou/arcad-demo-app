export class ArticleInfo {

    constructor(articleInfo) {
        this.id = articleInfo.ARTICLE_INFO_ID
        this.content = articleInfo.ARTICLE_INFORMATION
    }

    static reverse(articleInfo) {
        return {
            ARTICLE_INFO_ID: articleInfo.id,
            ARTICLE_INFORMATION: articleInfo.content
        }
    }

}



export function createArticleInfoeModel(articleInfo) {
    return {
        id: articleInfo.ARTICLE_INFO_ID,
        content: articleInfo.ARTICLE_INFORMATION
    }
}

// Reverse ArticleInfo Model
export function reverseArticleInfoModel(articleInfo) {
    return {
        ARTICLE_INFO_ID: articleInfo.id,
        ARTICLE_INFORMATION: articleInfo.content
    }
}