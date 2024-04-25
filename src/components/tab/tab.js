const Tab = {
  highlightTab: (tabElement, tabId) => {
    tabElement
      .querySelectorAll(`[data-for-tab="${tabId}"], [data-tab="${tabId}"]`)
      .forEach((elem) => {
        elem.classList.add("c-tab--active");
      });
  },
  clearHighlightTab: (tabElement) => {
    tabElement.querySelectorAll(".c-tab--active").forEach((elem) => {
      elem.classList.remove("c-tab--active");
    });
  },
  showTabContent: (tabElement, tabId) => {
    tabElement
      .querySelectorAll(`[data-tab="${tabId}"]`)
      .forEach((contentElem) => {
        contentElem.style.display = "block";
      });
  },
  hideTabContent: (tabElement) => {
    tabElement
      .querySelectorAll(".c-tab--content > *")
      .forEach((contentElem) => {
        contentElem.style.display = "none";
      });
  },
  onTabBtnClick: (e) => {
    const btn = e.target;
    const tabId = btn.dataset.forTab;
    const tabElement = btn.closest(".c-tab");

    Tab.clearHighlightTab(tabElement);
    Tab.highlightTab(tabElement, tabId);
    Tab.hideTabContent(tabElement);
    Tab.showTabContent(tabElement, tabId);
  },
  init: () => {
    document.querySelectorAll(".c-tab").forEach((elem) => {
      Tab.highlightTab(elem, elem.dataset.defaultTab || 0);
      Tab.showTabContent(elem, elem.dataset.defaultTab || 0);

      elem.querySelectorAll("[data-for-tab]").forEach((btnElem) => {
        btnElem.addEventListener("click", Tab.onTabBtnClick);
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", Tab.init);
