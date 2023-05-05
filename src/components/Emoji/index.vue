<template>
  <div class="emoji">
    <ul class="emoji-controller">
      <li
        v-for="(pannel, index) in pannels"
        :key="index"
        :class="{ 'active': index === activeIndex }"
        @click="changeActive(index)"
      >{{ pannel }}</li>
    </ul>
    <ul class="emoji-container">
      <li
        v-for="(emojiGroup, index) in emojis"
        :key="index"
        style="padding: 0"
      >
        <template v-if="index === activeIndex">
          <a
            v-for="(emoji, itemIndex) in emojiGroup"
            :key="itemIndex"
            href="javascript:;"
            @click="selectItem(emoji)"
          >
            <span
              class="emoji-item"
              :title="emoji"
              :class="'sprite-' + getPureName(emoji)"
            />
          </a>
        </template>

      </li>
    </ul>
  </div>
</template>
<script>
import data from '@/assets/js/emoji-data.js'
export default {
  name: 'KeenEmoji',
  data() {
    return {
      emojiData: data,
      pannels: ['表情', '自然', '物品', '地点', '符号'],
      activeIndex: 0
    }
  },
  computed: {
    emojis() {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item])
      })
    }
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index
    },
    getPureName(name) {
      return name.replace(/:/g, '')
    },
    selectItem(emoji) {
      this.$emit('select', emoji)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/emoji-sprite.scss';

.emoji {
    height: 186px;
    bottom: 30px;
    background: var(--bs-dialog-bg);
    z-index: 10;

    ul,
    li {
        padding-left: 0px;
    }

    .emoji-controller {
        height: 36px;
        overflow: hidden;
        margin-bottom: 0;

        li {
            float: left;
            width: 56px;
            font-size: 12px;
            line-height: 36px;
            cursor: pointer;
            text-align: center;
            position: relative;
            list-style: none;

            &.active::after {
                content: '';
                width: 100%;
                height: 1px;
                background: var(--bs-primary);
                left: 0;
                bottom: 4px;
                position: absolute;
            }
        }
    }

    .emoji-container {
        height: 140px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;

        li {
            font-size: 0;
            padding: 5px;

            a {
                float: left;
                overflow: hidden;
                height: 35px;
                transition: all ease-out .2s;
                border-radius: 4px;

                &:hover {
                    background-color: var(--bs-gray-300);
                    border-color: var(--bs-gray-300);
                }

                span {
                    width: 25px;
                    height: 25px;
                    display: inline-block;
                    border: 1px solid transparent;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
