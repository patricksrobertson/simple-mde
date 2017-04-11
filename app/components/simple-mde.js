import Ember from 'ember';
import layout from '../templates/components/simple-mde';

const { TextArea, computed, merge, isEmpty } = Ember;

export default TextArea.extend({
  layout,
  currentEditor: null,
  change: null,
  toolbar: ["bold", "italic", "strikethrough", "|", "heading-1", "heading-2", "heading-3", "|", "unordered-list", "ordered-list", "|", "link", "horizontal-rule", {
    name: "guide",
    action: "https://canopy.iorahealth.com/x/5gG7BQ",
    className: "fa fa-question-circle",
    title: "Formatting help"
  }],
  buildSimpleMDEOptions: computed(function() {
    return {
      status: false,
      autofocus: true,
      toolbar: this.get('toolbar')
    };
  }),

  didInsertElement() {
    this.set('currentEditor', new SimpleMDE(
      merge({
        element: document.getElementById(this.elementId)
      }, this.get('buildSimpleMDEOptions')
      )
    ));
    this.get('currentEditor').value(this.get('value'));

    this.get('currentEditor').codemirror.on('change', () => {
      this.sendAction('change', this.get('currentEditor').value());
    });
  },

  didReceiveAttrs() {
    const editor = this.get('currentEditor');
    if (isEmpty(editor)) {
      return;
    }
    const cursor = editor.codemirror.getDoc().getCursor();
    editor.value(this.get('value'));
    editor.codemirror.getDoc().setCursor(cursor);
  }
});
