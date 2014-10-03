
        $.fn.inlineCss = (function() {
	    var trim = (function() {
		var re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; // mdn
		var re1 = /[\s\uFEFF\xA0]{2, }/g;
		return function(str) {
			return (str || '').replace(re, '').replace(re1, ' ');
		};
	    })();

	    var cleanStyleAttr = (function() {
		var re = /(:|;)([\s\uFEFF\xA0]?)/g;
		return function(style) {
			return trim(style).replace(re, '$1');
		};
	    })();


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
                        style = cleanStyleAttr(style).replace(new RegExp('(?![^a-z\-])' + property + '[^;]+;?', 'g'), '');
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
                    var k = trim(parts[0]).toLowerCase();
                    parts.shift();
                    var v = trim(parts.join(':'));

                    if (k === property) {
                        return v;
                    }
                }
            };
        })();
