// light icon https://iconscout.com/icon/night-mode
// night icon https://iconscout.com/icon/night-mode-3
// Icon Author: https://iconscout.com/contributors/jemismali

class SwitchTheme extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        .switch-theme-btn {
            background-color: #fff4c9;
            border: none;
            border-radius: 5px;
            box-shadow: 0 2px 3px rgba(0,0,0,0.1);
            cursor: pointer;
            padding: 2px 10px;
            transition: transform 0.2s;
        }
        .switch-theme-btn:active {
            transform: translateY(3px)
        }
    </style>
     <button id="switch-theme" class="switch-theme-btn">
        <svg id="dark-icon" style="height: 30px; display: none;" xmlns="http://www.w3.org/2000/svg" id="night-mode" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="M19.282 17.038c-4.15-.513-7.691-3.379-9.245-7.261a11.042 11.042 0 0 1-.748-5.355.5.5 0 0 0-.772-.468C5.09 6.156 2.905 10.121 3.261 14.573c.442 5.524 4.959 10.056 10.482 10.513 5.646.468 10.522-3.148 12.01-8.213.118-.402-.274-.774-.661-.614a11.43 11.43 0 0 1-5.81.779z"/></svg>
        <svg id="light-icon" style="height: 30px; display: none;" xmlns="http://www.w3.org/2000/svg" id="night-mode" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="M14.608 26.354c-6.893 0-12.5-5.607-12.5-12.5 0-4.682 2.589-8.934 6.757-11.095a.998.998 0 0 1 1.442 1.078 10.595 10.595 0 0 0-.198 2.017c0 5.79 4.71 10.5 10.5 10.5 1.691 0 3.313-.396 4.822-1.18a1 1 0 0 1 1.443 1.079c-1.14 5.852-6.298 10.101-12.266 10.101zM8.111 5.612a10.45 10.45 0 0 0-4.003 8.241c0 5.79 4.71 10.5 10.5 10.5 4.336 0 8.163-2.669 9.736-6.571-1.202.38-2.453.571-3.736.571-6.893 0-12.5-5.607-12.5-12.5 0-.08.001-.161.003-.241z"></path></svg>
     </button>
    `;
    this.switchThemeEl = this.shadowRoot.querySelector("#switch-theme");
    this.bodyEl;
  }

  get isDark() {
    return this.bodyEl.classList.contains("dark");
  }

  connectedCallback() {
    this.bodyEl = document.querySelector("body");
    // trigger it once
    this.handleToggleTheme();
    this.switchThemeEl.addEventListener(
      "click",
      this.handleToggleTheme.bind(this)
    );
  }

  handleToggleTheme() {
    if (this.isDark) {
      this.addLight();
    } else {
      this.addDark();
    }
    this.toggleIcon();
  }

  get lightColor() {
    return this.getAttribute("light");
  }

  get darkColor() {
    return this.getAttribute("dark");
  }

  addLight() {
    // this is intentionally i added dark/light to body tag
    this.bodyEl.classList.remove("dark");
    this.bodyEl.classList.add("light");

    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }

  addDark() {
    // this is intentionally i added dark/light to body tag
    this.bodyEl.classList.remove("light");
    this.bodyEl.classList.add("dark");

    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }

  toggleIcon() {
    const darkiconEl = this.shadowRoot.querySelector("#dark-icon");
    const lighticonEl = this.shadowRoot.querySelector("#light-icon");
    if (this.isDark) {
      darkiconEl.style.display = "none";
      lighticonEl.style.display = "block";
    } else {
      lighticonEl.style.display = "none";
      darkiconEl.style.display = "block";
    }
  }
}

customElements.define("iy-ui-switch-theme", SwitchTheme);
