(function () {
  "use strict";

  function setFooterYear() {
    var el = document.querySelector("[data-year]");
    if (el) {
      el.textContent = String(new Date().getFullYear());
    }
  }

  function getTrialElements(root) {
    root = root || document;
    return {
      button: root.querySelector("[data-trial-button]"),
      message: root.querySelector("#trial-message"),
    };
  }

  function showTrialStarted(messageEl) {
    if (!messageEl) return;
    messageEl.textContent = "Trial started — check your email.";
    messageEl.hidden = false;
  }

  function setButtonLoading(button, loading) {
    if (!button) return;
    button.disabled = loading;
    button.textContent = loading ? "Starting…" : "Start Trial";
  }

  function simulateStartTrial() {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, 600);
    });
  }

  function attachTrialHandler(button, messageEl) {
    if (!button) return;

    button.addEventListener("click", function () {
      setButtonLoading(button, true);

      simulateStartTrial()
        .then(function () {
          showTrialStarted(messageEl);
        })
        .catch(function () {
          if (messageEl) {
            messageEl.textContent = "Something went wrong. Try again.";
            messageEl.hidden = false;
          }
        })
        .finally(function () {
          setButtonLoading(button, false);
        });
    });
  }

  function initPricingCard() {
    var card = document.querySelector("[data-pricing-card]");
    var els = getTrialElements(card);
    attachTrialHandler(els.button, els.message);
  }

  function init() {
    setFooterYear();
    initPricingCard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
