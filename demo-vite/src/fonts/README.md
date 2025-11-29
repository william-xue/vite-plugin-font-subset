# 字体文件目录

请将字体文件放在此目录下。

## 推荐测试字体

### 思源黑体（Source Han Sans）

- 官方仓库：https://github.com/adobe-fonts/source-han-sans
- 下载地址：https://github.com/adobe-fonts/source-han-sans/releases

下载后将 `SourceHanSansCN-Regular.otf` 文件放在此目录即可。

## 其他字体

你也可以使用其他 `.ttf` 或 `.otf` 格式的字体文件。

使用其他字体时，记得修改 `vite.config.js` 中的配置：

```javascript
fonts: [
  {
    src: 'src/fonts/你的字体文件名.ttf',
    family: '你的字体名称',
    weight: 400,
    style: 'normal'
  }
]
```

## 注意事项

1. 字体文件通常较大（几 MB 到几十 MB），不建议提交到 Git
2. 团队成员需要自行下载字体文件到此目录
3. 插件会自动生成 `subset/` 子目录，存放生成的字体子集
