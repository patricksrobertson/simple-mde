import Ember from 'ember';

const { isEmpty, String: EmberString, Helper } = Ember;

export function simpleMdePreview([plainText]) {
  if (isEmpty(plainText)) {
    return '';
  }
  const rendered = SimpleMDE.prototype.markdown(plainText);
  return EmberString.htmlSafe(rendered);
}

export default Helper.helper(simpleMdePreview);
