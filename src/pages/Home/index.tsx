import { Link } from 'react-router-dom'
import {
  Container, Header, ListContainer, Card, InputSearchContainer
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:3001/contacts')
    .then(async (response) => {
      const json = await response.json()
      json.foreach((response: any) => {
        console.log(response?.name)
      })
    }).catch((error: any) => {
      console.log('erro: ', error)
    })
  }, [])

  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..."></input>
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
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

        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="edit" />
          </Link>
          <button type="button">
            <img src={trash} alt="edit" />
          </button>
        </div>
      </Card>
    </Container>
  )
}
