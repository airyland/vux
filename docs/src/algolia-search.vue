<template>
  <el-autocomplete
    v-model="query"
    size="small"
    :popper-class="`algolia-search${ isEmpty ? ' is-empty' : '' }`"
    :fetch-suggestions="querySearch"
    :placeholder="placeholder"
    :trigger-on-focus="false"
    @select="handleSelect">
    <template scope="props">
      <p class="algolia-search-title" v-if="props.item.category">
        <span v-html="props.item.category" class="algolia-search-category"></span>
        <span class="algolia-search-separator">></span>
        <span v-html="props.item.content"></span>
      </p>
      <!-- <p
        class="algolia-search-content"
        v-if="props.item.content"
        v-html="props.item.content"></p> -->
      <a
        class="algolia-search-link"
        v-if="props.item.img"
        target="_blank"
        href="https://www.algolia.com/docsearch">
        <img
          class="algolia-search-logo"
          src="./algolia.svg"
          alt="algolia-logo">
      </a>
      <a 
        class="algolia-search-link algolia-search-link-ele"
        v-if="props.item.img"
        target="_blank"
        href="https://github.com/ElemeFE/element/blob/dev/examples/components/search.vue">
        Thanks to Element UI.
      </a>
      <p
        class="algolia-search-empty"
        v-if="props.item.isEmpty">{{ emptyText }}</p>
    </template>
  </el-autocomplete>
</template>

<style lang="less">
  .algolia-search {
    width: 450px !important;
    z-index: 10000 !important;
  
    &.is-empty {
      .el-autocomplete-suggestion__list {
        padding-bottom: 0;
      }
    }
    .el-autocomplete-suggestion__list {
      position: static !important;
      padding-bottom: 28px;
    }
    li {
      border-bottom: solid 1px #ebebeb;
      
      &:last-child {
         border-bottom: none;
       }
    }
    
    .algolia-highlight {
      color: green;
      font-weight: bold;
    }
    
    .algolia-search-title {
      font-size: 14px;
      margin: 6px 0;
      line-height: 1.8;
    }

    .algolia-search-category {
      font-weight: 500;
    }
    
    .algolia-search-separator {
      padding: 0 6px;
    }
    
    .algolia-search-content {
      font-size: 12px;
      margin: 6px 0;
      line-height: 2.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .algolia-search-link {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      padding-left: 15px;
      padding-right: 20px;
      background-color: #e4e7ed;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      box-sizing: border-box;
      text-align: left;
      &:hover {
         background-color: #e4e7ed;
       }
    
      img {
        display: inline-block;
        height: 17px;
        margin-top: 10px;
      }

      &.algolia-search-link-ele {
        padding-top: 5px;
        left: 50%;
        right: 0;
        font-size: 12px;
        text-align: right;
        padding-left: 15px;
        text-decoration: none;
        color: #888;
      }

      &.algolia-search-link-ele:hover {
        text-decoration: underline;
      }
    }

  
    .algolia-search-empty {
      margin: 5px 0;
      text-align: center;
      color: #999;
    }
  }
</style>

<script>
  import algoliasearch from 'algoliasearch';
  export default {
    props: {
      placeholder: {
        type: String
      },
      lang: {
        type: String
      },
      emptyText: {
        type: String
      }
    },
    data() {
      return {
        index: null,
        query: '',
        isEmpty: false,
        langs: {
          'zh-CN': {
            search: '搜索文档',
            empty: '无匹配结果',
            index: 'zh'
          },
          'en-US': {
            search: 'Search',
            empty: 'No results',
            index: 'en'
          },
          'es': {
            search: 'Buscar',
            empty: 'No hay datos que coincidan',
            index: 'es'
          }
        }
      };
    },
    computed: {
    },
    watch: {
      lang() {
        this.initIndex();
      }
    },
    methods: {
      initIndex() {
        const client = algoliasearch('NZ3JK4XEDL', 'bfc8efd7f20e6ad6d32b0fd3379fcc86');
        this.index = client.initIndex(this.lang);
      },
      querySearch(query, cb) {
        if (!query) return;
        this.index.search({ query, hitsPerPage: 50 }, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          if (res.hits.length > 0) {
            this.isEmpty = false;
            cb(res.hits.map(hit => {
              let content = hit._highlightResult.title.value.replace(/\s+/g, ' ');
              const highlightStart = content.indexOf('<span class="algolia-highlight">');
              if (highlightStart > -1) {
                const startEllipsis = highlightStart - 15 > 0;
                content = (startEllipsis ? '...' : '') +
                  content.slice(Math.max(0, highlightStart - 15), content.length);
              } else if (content.indexOf('|') > -1) {
                content = '';
              }
              return {
                anchor: hit.anchor,
                url: hit.url,
                component: hit.component,
                highlightedCompo: hit._highlightResult.title.value,
                title: hit._highlightResult.title.value.replace(/<em>/g, '<em class="algolia-highlight">'),
                content: content.replace(/<em>/g, '<em class="algolia-highlight">'),
                category: hit.category
              };
            }).sort((a, b) => {
              if (a.category === '组件' || a.category === 'Component') {
                return -1
              }
              return 1
            }).concat({ img: true }));
          } else {
            this.isEmpty = true;
            cb([{ isEmpty: true }]);
          }
        });
      },
      handleSelect(val) {
        if (!val.url) return;
        this.$router.push(val.url)
      }
    },
    mounted() {
      this.initIndex();
    }
  };
</script>