import './styles/global.scss';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import Garage from "./components/main/garage/garage";
import Winners from "./components/main/winners/winners";
import ErrorPage from "./components/error/error";
import Store from "./store/store";

export default class App {
  private root: HTMLElement;
  currentPage: Main | Garage | Winners | ErrorPage;
  header: Header;
  footer: Footer;

  constructor() {
    this.root = document.getElementById('root') as HTMLElement;
    this.header = new Header();
    this.footer = new Footer();
    this.currentPage = new Main();
  }

  async init() {
    try {
      await Store.getValues();

      this.root.append(
        this.header.element,
        this.currentPage.element,
        this.footer.element);

      this.initRouter();
    } catch {
      [this.header.navigation.garageLink.element, this.header.navigation.winnersLink.element]
        .forEach(link => link.classList.add('disabled'));
      this.currentPage.element.remove();
      this.currentPage = new ErrorPage();
      this.header.element.after(this.currentPage.element);
    }
  }

  goToURL(path: string) {
    if (location.pathname === path) return;
    history.pushState(null, '', path);
    this.handleCurrentPage(path);
  }

  handleCurrentPage(path: string) {
    this.currentPage.element.remove();
    switch (path) {
      case '/garage':
        this.currentPage = new Garage();
        break;

      case '/winners':
        this.currentPage = new Winners();
        break;

      default:
        this.currentPage = new Main();
    }
    this.header.element.after(this.currentPage.element);
  }

  initRouter() {
    window.addEventListener('popstate', () => {
      this.handleCurrentPage(new URL(window.location.href).pathname);
    });

    document.querySelectorAll('[href^="/"]').forEach(el => {
      el.addEventListener('click', (event) => {
        event.preventDefault();
        const { pathname } = new URL((event.target as HTMLLinkElement).href);
        this.goToURL(pathname);
      });
    });
    this.handleCurrentPage(new URL(window.location.href).pathname);
  }
}