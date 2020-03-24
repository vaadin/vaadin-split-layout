gemini.suite('vaadin-split-layout', rootSuite => {
  function wait(actions, find) {
    return actions.waitForJSCondition(window => {
      return window.webComponentsAreReady;
    }, 80000);
  }

  rootSuite.before(wait);

  ['lumo', 'material'].forEach(theme => {
    gemini.suite(`${theme}-default`, suite => {
      suite
        .setUrl(`default.html?theme=${theme}`)
        .setCaptureElements('#default')
        .capture('default');
    });

    gemini.suite(`${theme}-customized`, suite => {
      suite
        .setUrl(`customized.html?theme=${theme}`)
        .setCaptureElements('#customized')
        .capture('customized');
    });
  });
});
