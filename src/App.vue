<template>
  <section
    :class="{
      app: true,
      'dark-ui': isDark,
    }"
  >
    <img class="app-logo" :src="isDark ? logoLight : logo" />

    <img
      class="icon theme-icon"
      :src="isDark ? sunIcon : moonIcon"
      @click="toggleDarkMode"
    />

    <section class="entries">
      <section
        class="entry-wrap"
        v-for="(entry, index) in conversions"
        :key=index
      >
        <img
          class="icon"
          :src="isDark ? deleteIconLight : deleteIcon"
          v-if="index !== conversions.length - 1"
          @click="handleDelete(index)"
        />

        <div class="box-wrap">
          <textarea
            :class="`box-text box-text-${index}`"
            v-model="entry.text"
            @input="handleTextConvert($event.target.value, index)"
            placeholder="Text"
            spellcheck="false"
          />

          <img
            :src="isDark ? copyIconLight : copyIcon"
            class="icon copy-icon"
            v-if="conversions[index].text"
            @click="copyText(index)"
          />
        </div>

        <div class="code-buttons-wrap">
          <div
            class="icon"
            @click="handleCodeButtonInput(index, '.')"
          >.</div>

          <div
            class="icon"
            @click="handleCodeButtonInput(index, '-')"
          >-</div>

          <div
            class="icon"
            @click="handleCodeButtonInput(index, '\\')"
          >\</div>

          <div
            class="icon"
            @click="handleCodeButtonInput(index, ' ')"
          >space</div>

          <img
            src="@/assets/backspace.png"
            class="icon"
            @click="handleCodeButtonInput(index, '<')"
          />
        </div>
        <div class="box-wrap">
          <textarea
          :class="`box-code-${index}`"
            v-model="entry.code"
            @input="handleCodeConvert($event.target.value, index)"
            placeholder="Code"
            spellcheck="false"
          />

          <img
            :src="isDark ? copyIconLight : copyIcon"
            class="icon copy-icon"
            v-if="conversions[index].code"
            @click="copyCode(index)"
          />
        </div>
      </section>
    </section>

  </section>
</template>

<script>
import { textToMorse, morseToText } from './libs/convertors';

import logo from './assets/logo.png';
import logoLight from './assets/logo-light.png';
import sunIcon from './assets/sun.png';
import moonIcon from './assets/moon.png';
import deleteIcon from './assets/delete.png';
import deleteIconLight from './assets/delete-light.png';
import copyIcon from './assets/copy.png';
import copyIconLight from './assets/copy-light.png';

export default {
  name: 'App',

  data: () => ({
    conversions: [{ text: '', code: '' }],

    isDark: false,

    logo,
    logoLight,
    sunIcon,
    moonIcon,
    deleteIcon,
    deleteIconLight,
    copyIcon,
    copyIconLight,
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

    saveProgress() {
      localStorage.conversions = JSON.stringify(this.conversions);
    },

    handleTextConvert(text, index) {
      this.conversions[index].code = textToMorse(text);
      setTimeout(() => {
        this.handleTextareaHeight(index);
      }, 0);
      this.manageEmptyBoxes(index);
      this.saveProgress();
    },

    handleCodeConvert(code, index) {
      this.conversions[index].text = morseToText(code);
      setTimeout(() => {
        this.handleTextareaHeight(index);
      }, 0);
      this.manageEmptyBoxes(index);
      this.saveProgress();
    },

    resizeAllTextAreas() {
      this.conversions.forEach((entry, index) => {
        this.handleTextareaHeight(index);
      });
    },

    handleDelete(index) {
      this.conversions.splice(index, 1);
      setTimeout(() => {
        this.resizeAllTextAreas();
      }, 0);
      this.saveProgress();
    },

    copyText(index) {
      navigator.clipboard.writeText(this.conversions[index].text);
    },

    copyCode(index) {
      navigator.clipboard.writeText(this.conversions[index].code);
    },

    handleCodeButtonInput(index, input) {
      if (input === '<') {
        this.conversions[index].code = this.conversions[index].code.slice(0, -1);
      } else {
        this.conversions[index].code += input;
      }
      this.handleCodeConvert(this.conversions[index].code, index);
    },

    toggleDarkMode() {
      this.isDark = !this.isDark;
      localStorage.isDark = this.isDark;
    },
  },

  created() {
    if (localStorage.isDark) {
      this.isDark = localStorage.isDark;
    }

    if (localStorage.conversions) {
      try {
        this.conversions = JSON.parse(localStorage.conversions);
        setTimeout(() => {
          this.resizeAllTextAreas();
        }, 0);
      } catch (e) { /* ignore */ }
    }
  },
};
</script>

<style scoped>
.app.dark-ui {
  min-height: 100%;
  background-color: black;
  color: white;
}

.app-logo {
  position: fixed;
  top: 15px;
  left: 15px;
}

.entries {
  padding: 120px 24px;
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
.dark-ui .entry-wrap {
  border-bottom-color: #333333;
}

.box-wrap {
  display: flex;
  align-items: flex-start;
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
  background-color: inherit;
  color: inherit;
}

.box-text {
  margin-bottom: 12px;
}

.icon {
  cursor: pointer;
}
.icon:active {
  transform: scale(0.8);
}

.copy-icon {
  margin-top: 6px;
  margin-left: 6px;
}

.code-buttons-wrap {
  display: flex;
  margin-bottom: 3px;
  align-items: center;
}
.code-buttons-wrap div {
  color: white;
  background-color: black;
  margin-right: 12px;
  padding: 3px 6px;
  font-size: 14px;
  border-radius: 6px;
}
.dark-ui .code-buttons-wrap div {
  color: black;
  background-color: white;
}

.theme-icon {
  position: fixed;
  top: 24px;
  left: 60px;
  width: 16px;
  height: 16px;
}
</style>
