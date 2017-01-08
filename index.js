// HtmlWebpackRandomExtendPlugin.js

function HtmlWebpackRandomExtendPlugin(options) {
    this.cdnlist = options.cdnPrefix instanceof Array
        ? options.cdnPrefix
        : [options.cdnPrefix]
}

function formatStr(domain,resource) {
    if(resource[0] == '/')
        resource = resource.substr(1);
    if(domain[domain.length-1] != '/')
        domain = domain + '/';
    return domain + resource
}

HtmlWebpackRandomExtendPlugin.prototype.randomPrefix = function(list) {
    var cdnlist = this.cdnlist,
        cdnlength = cdnlist.length - 1;
    return list.map(function(item,index) {
        var _domain = cdnlist[Math.round(Math.random()*cdnlength)];
        if(item.tagName == 'script') {
            item.attributes.src = formatStr(_domain,item.attributes.src);
        } else {
            item.attributes.href = formatStr(_domain,item.attributes.href);
        }
        return item
    })
}

HtmlWebpackRandomExtendPlugin.prototype.apply = function(compiler) {
    var that = this;
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
            htmlPluginData.body = that.randomPrefix(htmlPluginData.body);
            htmlPluginData.head = that.randomPrefix(htmlPluginData.head);
            callback(null, htmlPluginData);
        });
    });
};

module.exports = HtmlWebpackRandomExtendPlugin;