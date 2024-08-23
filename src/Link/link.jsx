import './link.style.module.jsx'
import { Icon, Container, Title, Description } from './link.style.module'

const Link = ({ url, title, text, serviceIcon }) => {
  return (
    <article>
      <Container >
        <Title>
          <Icon src={serviceIcon} alt="service icon" srcSet="" />
          <a href={url}>{title}</a>
        </Title>
        <Description>
          <p>{text}</p>
        </Description>
      </Container>
    </article>
  );
}

export default Link