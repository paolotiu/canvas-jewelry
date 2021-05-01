import styled from '@emotion/styled';
import Facebook from '@assets/logos/facebook.svg';
import Instagram from '@assets/logos/instagram.svg';
import Mail from '@assets/logos/mail.svg';

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.9rem 1rem 0.5rem 1rem;
  gap: 0.7rem;
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
        <a href="">
          <Instagram />
        </a>
        <a href="">
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
