# gwt-osp-devtools

GWT表单开发工具

## Download Page

[Releases](https://github.com/liulei6577/gwt-osp-devtools/releases/latest)

## 插件开发依据

- [ACE Editor 项目源码地址](https://github.com/ajaxorg/ace)
- [ACE Editor Wiki](https://github.com/ajaxorg/ace/wiki)
- [Ace - The High Performance Code Editor for the Web](https://ace.c9.io/)
- [快捷键文档](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)
- [无法开启代码格式化](https://stackoverflow.com/questions/31767051/how-do-i-use-beautify-in-ace-editor)

## 代码模板

| snippet            | 说明                             |
|:-------------------|:-------------------------------|
| fun                | 定义函数                           |
| cf=>               | 箭头定义函数                         |
| if                 | if块                            |
| ifel               | if-else块                       |
| switch             | switch块                        |
| case               | case块                          |
| wh                 | while块                         |
| try                | try块                           |
| do                 | do-while块                      |
| clog               | 控制台输出                          |
| cerr               | 控制台输出error                     |
| ret                | 返回语句                           |
| jsonp              | 解析json串                        |
| jsons              | 对象转json串                       |
| fmbrs              | 获取单据头                          |
| fmids              | 获取单据分录                         |
| fords              | DataSet循环                      |
| mcg                | MC取值                           |
| lmcg               | MC取值                           |
| mcs                | MC放值                           |
| lmcs               | MC放值                           |
| newpo              | 创建PO                           |
| lnewds             | 创建DataSet                      |
| newds              | 创建DataSet                      |
| lnewrs             | 创建RowSet                       |
| newrs              | 创建RowSet                       |
| GUID               | 获取GUID                         |
| UUID               | 获取UUID                         |
| fm                 | FormModel                      |
| fct                | 获取当前时间，格式：yyyyMMdd HH:mm:ss    |
| fctyyyyMMdd        | 获取当前时间，格式：yyyyMMdd             |
| fctyyyyMM          | 获取当前时间，格式：yyyyMM               |
| fctyyyy            | 获取当前时间，格式：yyyy                 |
| alertw             | Alert弹框MESSAGE_WARN            |
| alerte             | Alert弹框MESSAGE_ERROR           |
| alertn             | Alert弹框MESSAGE_NORMAL          |
| alertq             | Alert弹框MESSAGE_QUESTION        |
| confirmw           | Confirm弹框MESSAGE_WARN          |
| confirme           | Confirm弹框MESSAGE_ERROR         |
| confirmn           | Confirm弹框MESSAGE_NORMAL        |
| confirmq           | Confirm弹框MESSAGE_QUESTION      |
| rt0                | 返回0                            |
| rt1                | 返回1                            |
| SVR                | WebService的SVR调用               |
| IOM                | WebService的IOM调用               |
| WSCB               | WebService的回调                  |
| rocode             | 服务调用返回的ro取code                 |
| romsg              | 服务调用返回的ro取msg                  |
| MDMSETPO           | MDModel设置PO                    |
| order              | 给PO设置orderBy                   |
| where              | 给PO设置where                     |
| lang               | 多语言取菜单变量                       |
| langget            | 多语言取菜单变量                       |
| MDMGDS             | MDModel取dataSet                |
| CMFori             | ColumnModel循环取Column           |
| CMForid            | ColumnModel循环取Column           |
| getDouble          | EFRowSet的getDouble操作           |
| getString          | EFRowSet的getString操作           |
| putDouble          | EFRowSet的putDouble操作           |
| putString          | EFRowSet的putString操作           |
| downloadS          | 静态资源下载                         |
| downloadD          | 动态资源下载                         |
| gwtCall            | 调用未暴露的对象函数                     |
| gwtGet             | 获取对象私有属性值                      |
| gwtSet             | 设置对象私有属性值                      |
| MDMGetComps        | 获取MDModel关联的组件                 |
| FMGetComps         | 获取FormModel关联的组件               |
| forMap             | 遍历map                          |
| forMapK            | 遍历map的key                      |
| forMapV            | 遍历map的value                    |
| forSet             | 遍历set                          |
| forArray           | 遍历array                        |
| MetaDataDS         | 获取元数据DataSet                   |
