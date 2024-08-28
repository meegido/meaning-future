import './link.style.module.jsx'
import { Article, Icon, Container, Title, Description } from './link.style.module'

export const Link = ({ url, title, text, serviceIcon, onHover }) => {
  return (
    <Article onMouseEnter={onHover}>
      <Container>
        <Title>
          <Icon src={serviceIcon} alt="service icon" srcSet="" />
          <a href={url}>{title}</a>
        </Title>
        <Description>
          <p>{text}</p>
        </Description>
      </Container>
    </Article>
  );
}
