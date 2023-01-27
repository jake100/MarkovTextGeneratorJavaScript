class MarkovTextGenerator {
    constructor(text, order) {
        this.text = text;
        this.order = order || 2;
        this.ngrams = {};
        this.buildNgrams();
    }

    buildNgrams() {
        const words = this.text.split(" ");
        for (let i = 0; i < words.length - this.order; i++) {
            let ngram = words.slice(i, i + this.order).join(" ");
            if (!this.ngrams[ngram]) {
                this.ngrams[ngram] = [];
            }
            const nextWord = words[i + this.order];
            this.ngrams[ngram].push(nextWord);
        }
    }

    generateText(length) {
        const ngramsArray = Object.keys(this.ngrams);
        let currentNgram = ngramsArray[Math.floor(Math.random() * ngramsArray.length)];
        let generatedText = currentNgram;
        for (let i = 0; i < length - this.order; i++) {
            const nextWord = this.ngrams[currentNgram][Math.floor(Math.random() * this.ngrams[currentNgram].length)];
            generatedText += " " + nextWord;
            currentNgram = generatedText.split(" ").slice(-this.order).join(" ");
        }
        return generatedText;
    }
}

const text = "This is an example of a Markov text generator. It is written in JavaScript.";
const gen = new MarkovTextGenerator(text);
console.log(gen.generateText(10));
