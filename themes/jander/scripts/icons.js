'use strict';

var tagPlugin = hexo.extend.tag,
    url_for = hexo.extend.helper.get('url_for');

var write = '<i class="fi-pencil"></i>',
    play  = '<i class="fi-music"></i>',
    code  = '<i class="fi-laptop"></i>';

tagPlugin.register('write', function (args) {
    return '<a href="' + url_for('tags/write') + '">' + write + '</a>';
});