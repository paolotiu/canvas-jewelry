import styled from '@emotion/styled';
import Facebook from '@assets/logos/facebook.svg';
import Instagram from '@assets/logos/instagram.svg';
import Mail from '@assets/logos/mail.svg';
import { breakpoints } from '@styles/breakpoints';

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.9rem 1rem 0.5rem 1rem;
  gap: 0.7rem;

  ${breakpoints.lg} {
    // Because of sidebar
    margin-left: 250px;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  .logos {
    display: flex;
    gap: 1.8rem;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="logos">
        <a
          href="https://www.instagram.com/thecanvasjewelry/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
        <a
          href="https://www.facebook.com/thecanvasjewelry/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </a>
        <p>
          <Mail />
        </p>
      </div>
      <p>thecanvasjewlery</p>
    </StyledFooter>
  );
};

export default Footer;
