<template>
  <section>
    <img class="app-logo" src="@/assets/logo.png" />

    <section class="entries">
      <section
        class="entry-wrap"
        v-for="(entry, index) in conversions"
        :key=index
      >
        <img
          class="delete-icon"
          src="@/assets/delete.png"
          v-if="index !== conversions.length - 1"
          @click="conversions.splice(index, 1)"
        />

        <textarea
          :class="`box-text box-text-${index}`"
          v-model="entry.text"
          @input="handleTextConvert($event.target, $event.target.value, index)"
          placeholder="Text"
          spellcheck="false"
        />

        <textarea
        :class="`box-code-${index}`"
          v-model="entry.code"
          @input="handleCodeConvert($event.target, $event.target.value, index)"
          placeholder="Code"
          spellcheck="false"
        />
      </section>
    </section>

  </section>
</template>

<script>
import { textToMorse, morseToText } from './libs/convertors';

export default {
  name: 'App',

  data: () => ({
    conversions: [{ text: '', code: '' }],
  }),

  methods: {
    manageEmptyBoxes(currentIndex) {
      const { code: currentCode, text: currentText } = this.conversions[currentIndex];
      if (!currentCode && !currentText && currentIndex !== this.conversions.length - 1) {
        this.conversions.splice(currentIndex, 1);
      }

      const reverseIndex = [...this.conversions].reverse().findIndex((entry) => (
        entry.code || entry.text
      ));

      if (reverseIndex === -1) {
        if (this.conversions.length !== 1) this.conversions = [{ text: '', code: '' }];
        return;
      }

      const index = (this.conversions.length - 1) - reverseIndex;

      if (index !== this.conversions.length - 2) {
        this.conversions.splice(index + 1, this.conversions.length, { text: '', code: '' });
      }
    },

    handleTextareaHeight(index) {
      const textBox = document.getElementsByClassName(`box-text-${index}`)[0];
      const codeBox = document.getElementsByClassName(`box-code-${index}`)[0];

      textBox.style.height = '';
      textBox.style.height = `${textBox.scrollHeight}px`;

      codeBox.style.height = '';
      codeBox.style.height = `${codeBox.scrollHeight}px`;
    },

    handleTextConvert(target, text, index) {
      this.handleTextareaHeight(index);
      this.conversions[index].code = textToMorse(text);
      this.manageEmptyBoxes(index);
    },

    handleCodeConvert(target, code, index) {
      this.handleTextareaHeight(index);
      this.conversions[index].text = morseToText(code);
      this.manageEmptyBoxes(index);
    },
  },
};
</script>

<style scoped>
.app-logo {
  position: fixed;
  top: 15px;
  left: 15px;
}

.entries {
  margin: 120px 0;
  padding: 0 24px;
}

.entry-wrap {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ccc;
}
.entry-wrap:last-child {
  border-bottom: 0;
}

textarea {
  display: block;
  width: 100%;
  border: 0;
  outline: 0;
  font: inherit;
  resize: none;
  height: 21px;
  overflow: hidden;
}

.box-text {
  margin-bottom: 12px;
}

.delete-icon {
  cursor: pointer;
}
</style>
