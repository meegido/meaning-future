import './link.style.module.jsx'
import { Icon, Container, Title, Description, LinkIcon } from './link.style.module'

const Link = ({ url, title, text, serviceIcon }) => {
  return (
    <article>
      <Container >
        <Title>
          <Icon src={serviceIcon} alt="service icon" srcSet="" />
          <p>{title}</p>
        </Title>
        <Description>
          <p>{text}</p>
          <LinkIcon href={url}>
            <p>arrow</p>
          </LinkIcon>
        </Description>
      </Container>
    </article>
  );
}

export default Link