import {
  Container, Header, ListContainer, Card
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>
        <a href="/">Novo contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Lucas Korz</strong>
            <small>instagram</small>
          </div>
          <span>lucaskorz10@gmail.com</span>
          <span>(47) 98867-1028</span>
        </div>

        <div>
          <a href="/">
            <img src={edit} alt="edit" />
          </a>
          <button type="button">
            <img src={trash} alt="edit" />
          </button>
        </div>
      </Card>
    </Container>
  );
}
