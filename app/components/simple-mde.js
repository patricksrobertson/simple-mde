import Ember from 'ember';
import layout from '../templates/components/simple-mde';
import defaultToolbar from 'simple-mde/utils/default-toolbar';

const { TextArea, computed, merge, isEmpty } = Ember;

export default TextArea.extend({
  layout,
  currentEditor: null,
  change: null,

  toolbar: computed('guide', function() {
    const guide = this.get('guide');
    if (!isEmpty(guide)) {
      return defaultToolbar.addObject(this.get('guide'));
    } else {
      return defaultToolbar;
    }
  }),

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
