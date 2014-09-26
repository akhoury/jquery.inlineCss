jquery.inlineCss
================

Read/Write/Remove __ONLY THE INLINE STYLES__ of a jQuery Element

You can write values with  `!important` now, which jquery does not support natively.

demo: http://jsbin.com/veyagikazavi/8/edit

# Usage
Just like the usual `$el.css()` but __only__ applies on inline styles.

### To read:
This will return the exact value though, so for example if it has ` !important` in it, that would be included,

```javascript
$el.inlineCss('z-index'); 
```

### To write:

```javascript
// single property
$el.inlineCss('z-index', '20 !important');

// or using a hash
$el.inlineCss({
    'z-index': '20 !important',
    'background-color': 'red !important'
});
```

### To remove:
Notice the empty string
```javascript
// single property
$el.inlineCss('z-index', '');

// or using a hash
$el.inlineCss({
    'z-index': '',
    'background-color': ''
});
```

### Chain: 
Just like the usual `css()`, when writing or removing, you can chain other jQuery functions.

```javascript
$el.inlineCss('display', 'none !important').parent().width();
```

# Browser support

Down to IE8, as long as you're using jquery 1.x
