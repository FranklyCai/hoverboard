import { html, PolymerElement } from '@polymer/polymer';
import './shared-styles.js';

class ContentLoader extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles flex flex-alignment positioning">
      :host {
        --darkgrey: rgba(250, 250, 250, 0);
        --darkgrey-lighter: rgba(250, 250, 250, 0.8);
        --background-color: #fff;
        --content-color: #e2e2e2;
        --card-padding: 24px;
        --card-height: 340px;
        --card-width: auto;
        --card-border-radius: 0;
        --card-margin: 0;
        --card-box-shadow: none;
        --card-skeleton: linear-gradient(var(--background-color) var(--card-height), transparent 0);
        --horizontal-position: var(--card-padding);

        --avatar-size: 32px;
        --avatar-circle: 16px;
        --avatar-position: var(--horizontal-position) var(--card-padding);
        --avatar-skeleton: radial-gradient(
          circle var(--avatar-circle) at center, var(--content-color) 99%, transparent 0);

        --title-height: 32px;
        --title-width: 200px;
        --title-top-position: 180px;
        --title-position: var(--horizontal-position) var(--title-top-position);
        --title-skeleton: linear-gradient(var(--content-color) var(--title-height), transparent 0);

        --desc-line-height: 16px;
        --desc-line-skeleton: linear-gradient(var(--content-color) var(--desc-line-height), transparent 0);
        --desc-line-1-width: 230px;
        --desc-line-1-position: var(--horizontal-position) calc(var(--title-top-position) + 62px);
        --desc-line-2-width: 180px;
        --desc-line-2-position: var(--horizontal-position) calc(var(--title-top-position) + 85px);

        --footer-height: 0px;
        --footer-position: 0 calc(var(--card-height) - var(--footer-height));
        --footer-skeleton: linear-gradient(var(--background-color) var(--footer-height), transparent 0);

        --blur-width: 200px;
        --blur-size: var(--blur-width) calc(var(--card-height) - var(--footer-height));

        --load-from: -150%;
        --load-to: 350%;

        --animation-time: 1.5s;
      }

      .content {
        width: var(--card-width);
        height: var(--card-height);
        margin: var(--card-margin);
      }

      .content::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        box-shadow: var(--card-box-shadow);
        border-radius: var(--card-border-radius);

        background-image: linear-gradient(90deg, var(--darkgrey) 0,
        var(--darkgrey-lighter) 50%,
        var(--darkgrey) 100%),
        var(--title-skeleton),
        var(--desc-line-skeleton),
        var(--desc-line-skeleton),
        var(--avatar-skeleton),
        var(--footer-skeleton),
        var(--card-skeleton);

        background-size: var(--blur-size),
        var(--title-width) var(--title-height),
        var(--desc-line-1-width) var(--desc-line-height),
        var(--desc-line-2-width) var(--desc-line-height),
        var(--avatar-size) var(--avatar-size),
        100% var(--footer-height),
        100% 100%;

        background-position: var(--load-from) 0,
        var(--title-position),
        var(--desc-line-1-position),
        var(--desc-line-2-position),
        var(--avatar-position),
        var(--footer-position), 0 0;

        background-repeat: no-repeat;
        animation: loading var(--animation-time) infinite;
      }

      @keyframes loading {
        to {
          background-position: var(--load-to) 0,
          var(--title-position),
          var(--desc-line-1-position),
          var(--desc-line-2-position),
          var(--avatar-position),
          var(--footer-position),
          0 0;
        }
      }

    </style>

    <template is="dom-repeat" items="[[_getArray()]]">
      <div class="content"></div>
    </template>
`;
  }

  static get is() {
    return 'content-loader';
  }

  static get properties() {
    return {
      cardPadding: String,
      cardMargin: String,
      cardHeight: String,
      cardWidth: String,
      borderRadius: String,
      horizontalPosition: String,
      avatarSize: {
        type: String,
        value: '0px',
      },
      avatarCircle: {
        type: String,
        value: '0px',
      },
      titleTopPosition: String,
      titleHeight: String,
      titleWidth: String,
      animationTime: String,
      boxShadow: String,
      blurWidth: String,
      loadFrom: String,
      loadTo: String,
      itemsCount: {
        type: Number,
        value: 0,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateStyles({
      '--card-padding': this.cardPadding || '',
      '--card-margin': this.cardMargin || '',
      '--card-height': this.cardHeight || '',
      '--card-width': this.cardWidth || '',
      '--card-border-radius': this.borderRadius || '',
      '--horizontal-position': this.horizontalPosition || '',
      '--avatar-size': this.avatarSize || '',
      '--avatar-circle': this.avatarCircle || '',
      '--title-top-position': this.titleTopPosition || '',
      '--title-height': this.titleHeight || '',
      '--title-width': this.titleWidth || '',
      '--animation-time': this.animationTime || '',
      '--card-box-shadow': this.boxShadow || '',
      '--blur-width': this.blurWidth || '',
      '--load-from': this.loadFrom || '',
      '--load-to': this.loadTo || '',
    });
  }

  _getArray() {
    return new Array(Number(this.itemsCount));
  }
}

window.customElements.define(ContentLoader.is, ContentLoader);
