# simple-mde
This is a slight expansion of the addon [https://github.com/smith-carson/ember-simplemde](https://github.com/smith-carson/ember-simplemde). It gives a basic set of defaults around
the toolbar for editing the texta area and allows passing in of a guide
## Installation
```sh
  ember install simple-mde
  bower install
```

## Usage

Edit things with simpleMDE

```hbs
{{simple-mde value=body change=(action (mut body) ) guide=guideLink}}
```

Here's what the guide should look like:
```js
guide = {
  name: "guide",
  action: "https://i.am.a.link.com",
  className: "fa fa-question-circle",
  title: "Formatting help"
};
```

Preview that guy:
```hbs
{{simple-mde-preview body}}
```

## License
MIT