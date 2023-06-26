export class ArticleInformations {
    constructor(id, informations) {
        this.id = id;
        this.informations = informations;
    }

    static getEmptyArticleInformations() {
        return new ArticleInformations(0, "");
    }

    static toAPIFormat(articleInformations) {
        return {
            ARTICLE_ID: articleInformations.id,
            DESCRIPTION: articleInformations.informations
        }
    }

    static getErrors(articleInformations) {
        const errors = [];
        let { informations } = articleInformations;

        if (informations.length > 1520) {
            errors.push("Informations can't be longer than 1520 characters");
        }
    }
}