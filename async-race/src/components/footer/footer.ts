import './footer.scss';
import Control from "../../utils/control";

export default class Footer extends Control{
  constructor() {
    super('div', ['footer']);

    const githubLink = new Control('a', ['footer__link-github']).element;
    githubLink.setAttribute('href', 'https://github.com/godtyze');
    githubLink.setAttribute('target', '_blank');

    const year = new Control('span', [], '2022').element;

    const schoolLink = new Control('a', ['footer__link-rs']).element;
    schoolLink.setAttribute('href', 'https://rs.school/');
    schoolLink.setAttribute('target', '_blank');

    this.element.append(
      githubLink,
      year,
      schoolLink
    );
  }
}