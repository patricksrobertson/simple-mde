import Ember from 'ember';
import layout from '../templates/components/simple-mde';
import defaultToolbar from 'simple-mde/utils/default-toolbar';

const { TextArea, computed, merge, isEmpty } = Ember;

export default TextArea.extend({
  init() {
    this._super(...arguments);
    this.set('toolbar', toolbar(this.get('guide')));
  },
  layout,
  currentEditor: null,
  change: null,
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

function toolbar(guide) {
  const newToolbar = defaultToolbar.slice();
  if (!isEmpty(guide)) {
    newToolbar.push(guide);
  }
  return newToolbar;
}
