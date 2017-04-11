module.exports = {
  description: 'bower dependencies for simple-mde',

  normalizeEntityName() {},

  afterInstall() {
    return this.addBowerPackageToProject('simplemde', '^1.11.2');
  }
}