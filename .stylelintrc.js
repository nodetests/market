module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
    rules: {
        "no-unused-vars": "off",
      // at-rule-no-unknown: 屏蔽一些scss等语法检查
      // 禁止使用未知的 at 规则
      'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }],
      'rule-empty-line-before': [
        // 要求或禁止在规则声明之前有空行
        'always-multi-line',
        {
          except: ['first-nested'],
          ignore: ['after-comment'],
        },
      ],
      'at-rule-empty-line-before': [
        // 要求或禁止在 at 规则之前有空行
        'always',
        {
          except: ['blockless-after-same-name-blockless', 'first-nested'],
          ignore: ['after-comment'],
        },
      ],
      'comment-empty-line-before': [
        // 要求或禁止在注释之前有空行
        'always',
        {
          except: ['first-nested'],
          ignore: ['stylelint-commands'],
        },
      ],
      'selector-pseudo-class-no-unknown': [
        true,
        {
          ignorePseudoClasses: ['global'],
        },
      ],
      // 禁止出现空块
      'block-no-empty': true,
      // 要求或禁止在声明语句之前有空行
      'declaration-empty-line-before': 'never',
      // 在声明的块中中禁止出现重复的属性
      'declaration-block-no-duplicate-properties': true,
      // 禁止使用可以缩写却不缩写的属性
      'declaration-block-no-redundant-longhand-properties': true,
      // 禁止在简写属性中使用冗余值
      'shorthand-property-no-redundant-values': true,
      // 要求或禁止 url 使用引号
      'function-url-quotes': 'always',
      // 指定十六进制颜色是否使用缩写
      'color-hex-length': 'short',
      // 要求 (可能的情况下) 或 禁止使用命名的颜色
      'color-named': 'never',
      // 禁止空注释
      'comment-no-empty': true,
      // 指定字体名称是否需要使用引号引起来 | 期待每一个不是关键字的字体名都使用引号引起来
      'font-family-name-quotes': 'always-unless-keyword',
      // 要求使用数字或命名的 (可能的情况下) font-weight 值
      'font-weight-notation': 'numeric',
      // 禁止属性使用浏览器引擎前缀
      'property-no-vendor-prefix': true,
      // 禁止给值添加浏览器引擎前缀
      'value-no-vendor-prefix': true,
      // 禁止使用浏览器引擎前缀
      'selector-no-vendor-prefix': true,
      // 禁止低优先级的选择器出现在高优先级的选择器之后
      'no-descending-specificity': null,
    },
    ignoreFiles: ['node_modules/**/*', 'build/**/*', 'dist/**/*'],
  }
  