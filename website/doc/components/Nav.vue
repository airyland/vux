<template>
  <div class="doc-nav">
    <ol>
      <li>
        {{ docs.name }}
      </li>
      <ul>
        <li
          :class="{ active: isActive(_package.name) }"
          v-for="_package in docs.packages"
          :key="_package"
        >
          <router-link
            v-if="!_package.isLink"
            :to="_package.name.toLowerCase()"
            >{{ _package.cName }}</router-link
          >
          <a v-else :href="_package.name" target="_blank">{{
            _package.cName
          }}</a>
        </li>
      </ul>
    </ol>
    <ol v-for="_nav in nav" :key="_nav">
      <li>{{ _nav.name }}</li>
      <ul>
        <template
          :class="{ active: isActive(_package.name) }"
          v-for="_package in _nav.packages"
          :key="_package"
        >
          <li v-if="_package.show">
            <router-link :to="_package.name.toLowerCase()">
              {{ _package.name }}&nbsp;&nbsp;<b>{{ _package.cName }}</b>
            </router-link>
          </li>
        </template>
      </ul>
    </ol>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { currentRoute } from '../../assets/util/ref';
import { nav, docs } from '../../../vux-config.json';
export default defineComponent({
  name: 'doc-nav',
  setup() {
    const isActive = computed(() => {
      return function(name: string) {
        return currentRoute.value == name.toLowerCase();
      };
    });
    return {
      isActive,
      nav: reactive(nav),
      docs: reactive(docs),
      currentRoute
    };
  }
});
</script>

<style lang="scss">
.doc {
  &-nav {
    position: fixed;
    top: $doc-header-height + 50;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: #ffffff;
    width: 290px;
    border-right: 1px solid #eee;
    overflow: auto;
    padding-left: 35px;
    ol {
      &.introduce {
        padding-left: 5px;
        li {
          cursor: pointer;
          &:hover {
            color: $doc-default-color;
          }
        }
      }
      li {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: $doc-default-nav-color;
        font-weight: bold;
        position: relative;

        &.active {
          &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 50%;
            width: 22px;
            margin-top: -5px;
            height: 10px;
            transform: rotate(90deg);
            background: url(https://img10.360buyimg.com/imagetools/jfs/t1/136135/19/14659/946/5fa20aa8E33a9aa26/d329fbe669171208.png)
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      > ul {
        li {
          padding-left: 29px;
          cursor: pointer;
          &:hover {
            a {
              color: $doc-default-color;
            }
          }
          a {
            &.router-link-active {
              color: $doc-default-color !important;
            }

            &:hover {
              color: $doc-default-color;
              &:visited {
                color: $doc-default-color;
              }
            }
            &:link,
            &:visited {
              color: $title-color;
            }

            height: 100%;
            b {
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
