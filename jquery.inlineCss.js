
        $.fn.inlineCss = (function() {
            var whiteSpaceRE = /^[\s\xA0]+|[\s\xA0]+$/g;

            return function(property, value) {
                if (!property)
                    return;
                
                if (typeof property === 'object') {
                    $.each(property, this.inlineCss.bind(this));
                    return this;
                }

                property = (property + '').toLowerCase();

                if (value != null) {
                    this.attr('style', function(i, style) {
                        style = $.trim((style || '').replace(new RegExp('(?![^a-z\-])' + property + '[^;]+;?', 'g'), ''));
                        return value ? style + (style && style[style.length - 1] !== ';' ? ';' : '') + ' ' + property + ': ' + (typeof value === 'function' ? value.call(this, this.index(), this.inlineCss(property)): value) : style;
                    });

                    return this;
                }

                var style = this.attr('style');

                if (!style)
                    return;

                var properties = $.grep(style.split(';'), function (v) {
                    return !!v;
                });

                for (var i = 0; i < properties.length; i++) {
                    var parts = properties[i].split(':');
                    var k = (parts[0] || '').replace(whiteSpaceRE, '').toLowerCase();
                    parts.shift();
                    var v = parts.join(':').replace(whiteSpaceRE, '');

                    if (k === property) {
                        return v;
                    }
                }
            };
        })();
