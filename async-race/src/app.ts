import './styles/global.scss';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import Store from "./store/store";
import Control from "./utils/control";


export default class App {
  readonly header: Header;
  main?: Main;
  readonly footer: Footer;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
  }

  async init(): Promise<void> {
    try {
      document.body.prepend(
        this.header.element,
        this.footer.element);

      await Store.getValues();

      this.main = new Main();
      this.header.element.after(this.main.element);

      this.switchPagesHandler();
    } catch {
      const error = new Control('p', ['error'], 'No connection to the server!').element;
      this.header.element.after(error);
    }
  }

  switchPagesHandler(): void {
    this.header.navigation.garageBtn.element.addEventListener('click', () => {
      this.header.navigation.garageBtn.element.classList.add('active');
      this.header.navigation.winnersBtn.element.classList.remove('active');
      if (this.main) {
        this.main.winners.element.style.display = 'none';
        this.main.garage.element.style.display = 'flex';
      }
    });

    this.header.navigation.winnersBtn.element.addEventListener('click', () => {
      this.header.navigation.winnersBtn.element.classList.add('active');
      this.header.navigation.garageBtn.element.classList.remove('active');
      if (this.main) {
        this.main.winners.element.style.display = 'flex';
        this.main.garage.element.style.display = 'none';
      }
    });
  }
}