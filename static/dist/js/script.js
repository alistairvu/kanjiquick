const isLearning = (x, level) => {
  switch (window.testType) {
    case 'grade': {
      return x.grade === level;
    }

    case 'wk': {
      return x.wk_level === level;
    }

    case 'jlpt': {
      return x.jlpt_new === level;
    }

    default: {
      return true;
    }
  }
};

document.addEventListener('alpine:init', () => {
  Alpine.data('kanji', () => ({
    currentKanji: {
      character: ' ',
    },
    learningKanji: undefined,
    level: window.testType === 'jlpt' ? 5 : 1,
    answer: '',
    wkLevel: 1,
    isIncorrect: false,
    showAnswers: false,

    init() {
      this.learningKanji = window.kanjis
        .filter((x) => isLearning(x, this.level))
        .sort(() => Math.random() - 0.5);
      this.currentKanji = this.learningKanji[0];
    },

    setLevel(level) {
      this.level = level;
      this.learningKanji = window.kanjis
        .filter((x) => isLearning(x, level))
        .sort(() => Math.random() - 0.5);
      this.currentKanji = this.learningKanji[0];
      this.showAnswers = false;
    },

    setWkLevel(e) {
      this.setLevel(this.wkLevel);
    },

    skip(e) {
      this.learningKanji.shift();
      this.learningKanji.push(this.currentKanji);
      this.currentKanji = this.learningKanji[0];
      this.isIncorrect = false;
      this.answer = '';
      this.showAnswers = false;
    },

    checkAnswer(e) {
      e.preventDefault();

      const meanings = this.currentKanji['meanings']
        .concat(this.currentKanji['wk_meanings'])
        .map((x) => x.toLowerCase());

      if (meanings.includes(this.answer.toLowerCase())) {
        this.learningKanji = this.learningKanji.sort(() => Math.random() - 0.5);
        this.currentKanji =
          this.learningKanji[0].character === this.currentKanji.character
            ? this.learningKanji[1]
            : this.learningKanji[0];
        this.isIncorrect = false;
        this.answer = '';
        this.showAnswers = false;
      } else {
        this.isIncorrect = true;
      }
    },
  }));
});
